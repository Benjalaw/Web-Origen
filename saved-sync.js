/* Sincronizacion de Favoritos y Mi Viaje para ORIGEN.
   Prioriza la tabla RLS user_saved_items; si aun no existe,
   utiliza metadata autenticada de Supabase sin exponer claves privadas. */
(()=>{
'use strict';
const client=window.ORIGEN_SUPABASE_CLIENT;
if(!client)return;
const F='origen_favorites_v2',T='origen_trip_v2',S='origen_trip_settings_v2';
const KEYS=[F,T,S];
const TYPES={[F]:'favorites',[T]:'trip',[S]:'settings'};
const PREFIX='origen_saved_account_v1:';
const META='origen_saved_v1';
const MIGRATION='origen_saved_migrated_v1:';
let active=null,ready=false,loading=false,epoch=0,backend='metadata';
let dirty=new Set(),writing=false,timer=null,status='Preparando sincronización';
const storage={
  get(k){try{const v=localStorage.getItem(k);return v===null?undefined:JSON.parse(v)}catch{return undefined}},
  set(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch{}},
  remove(k){try{localStorage.removeItem(k)}catch{}},
  text(k){try{return localStorage.getItem(k)}catch{return null}},
  mark(k){try{localStorage.setItem(k,'1')}catch{}}
};
function accountKey(k,id=active){return id?PREFIX+id+':'+k:k}
function dirtyKey(k,id=active){return PREFIX+id+':dirty:'+k}
function empty(k){return k===S?{}:[]}
function valid(k,v){return k===S?v&&typeof v==='object'&&!Array.isArray(v):Array.isArray(v)}
function normalized(k,v){return valid(k,v)?v:empty(k)}
function pack(k,v){
  if(k===S)return normalized(k,v);
  return normalized(k,v).filter(x=>x&&typeof x.key==='string').map(x=>({
    key:x.key,type:x.type,id:x.id,name:x.name,region:x.region,
    city:x.city,href:x.href,serviceType:x.serviceType,
    lat:x.lat,lon:x.lon
  }));
}
function union(a,b){
  const out=new Map();
  for(const x of normalized(F,a).concat(normalized(F,b))){
    if(x&&typeof x.key==='string'&&!out.has(x.key))out.set(x.key,x);
  }
  return [...out.values()];
}
function changeStatus(msg){
  status=msg;
  window.dispatchEvent(new CustomEvent('origen:saved-status',{detail:{userId:active,message:msg,ready,backend}}));
}
function notifyLoaded(){
  for(const e of ['origen:favorites','origen:trip','origen:settings'])window.dispatchEvent(new CustomEvent(e));
  window.dispatchEvent(new CustomEvent('origen:saved-loaded',{detail:{userId:active,ready,backend}}));
}
function markDirty(k){
  if(!active||!KEYS.includes(k))return;
  dirty.add(k);storage.mark(dirtyKey(k));
}
function schedule(){
  if(!active||!ready)return;
  if(timer)clearTimeout(timer);
  timer=setTimeout(()=>{timer=null;void flush()},350);
}
async function flush(){
  if(!active||!ready||writing||dirty.size===0)return;
  const id=active,g=epoch,items=[...dirty];
  const values={};
  for(const k of KEYS)values[k]=storage.get(accountKey(k,id))??empty(k);
  writing=true;
  changeStatus('Guardando en tu cuenta…');
  let error=null;
  try{
    if(backend==='table'){
      const rows=items.map(k=>({user_id:id,kind:TYPES[k],items:values[k]}));
      const result=await client.from('user_saved_items').upsert(rows,{onConflict:'user_id,kind'});
      error=result.error;
      if(error){backend='metadata';error=null;}
    }
    if(backend==='metadata'){
      const saved={version:1,favorites:pack(F,values[F]),trip:pack(T,values[T]),settings:values[S]};
      const result=await client.auth.updateUser({data:{[META]:saved}});
      error=result.error;
    }
  }catch(e){error=e}
  writing=false;
  if(epoch!==g||active!==id)return;
  if(error){
    changeStatus('No se pudo sincronizar. Tus cambios siguen guardados en este dispositivo.');
    return;
  }
  for(const k of items){
    // Si hubo mas cambios durante el envio, ese dato debe enviarse otra vez.
    const current=storage.get(accountKey(k,id))??empty(k);
    if(JSON.stringify(current)===JSON.stringify(values[k])){
      dirty.delete(k);storage.remove(dirtyKey(k));
    }
  }
  changeStatus(dirty.size?'Guardando cambios pendientes…':'Favoritos y rutas sincronizados con tu cuenta');
  if(dirty.size)schedule();
}
async function activate(user){
  const id=user?.id||null;
  if(id===active&&(ready||loading))return;
  epoch++;
  const g=epoch;
  active=id;ready=false;loading=Boolean(id);writing=false;
  if(timer){clearTimeout(timer);timer=null}
  dirty=new Set();
  if(!id){changeStatus('Tus cambios se guardan en este dispositivo hasta iniciar sesión');notifyLoaded();return}
  changeStatus('Recuperando favoritos y rutas de tu cuenta…');
  try{
    const userResult=await client.auth.getUser();
    if(g!==epoch)return;
    const fresh=userResult.data?.user||user;
    const meta=fresh.user_metadata?.[META]||{};
    let cloud={};
    let tableRows=null;
    try{
      const r=await client.from('user_saved_items').select('kind,items').eq('user_id',id);
      if(!r.error)tableRows=r.data||[];
    }catch{}
    if(g!==epoch)return;
    backend=tableRows?'table':'metadata';
    const fromTable={};
    if(tableRows)for(const row of tableRows)fromTable[row.kind]=row.items;
    for(const k of KEYS){
      const kind=TYPES[k];
      cloud[k]=valid(k,fromTable[kind])?fromTable[kind]:valid(k,meta[kind])?meta[kind]:undefined;
    }
    const flag=MIGRATION+id;
    const migrating=KEYS.some(k=>storage.get(k)!==undefined);
    for(const k of KEYS){
      const local=storage.get(accountKey(k,id));
      const legacy=migrating?storage.get(k):undefined;
      const pending=storage.text(dirtyKey(k,id))==='1';
      let value=cloud[k]!==undefined?cloud[k]:local!==undefined?local:empty(k);
      let needsWrite=cloud[k]===undefined&&local!==undefined;
      if(pending&&local!==undefined){value=local;needsWrite=true}
      if(migrating&&valid(k,legacy)){
        const before=JSON.stringify(value);
        if(k===S){
          if(cloud[k]===undefined&&local===undefined)value=legacy;
        }else{
          value=union(value,legacy);
        }
        if(before!==JSON.stringify(value))needsWrite=true;
      }
      if(backend==='table'&&fromTable[TYPES[k]]===undefined&&cloud[k]!==undefined)needsWrite=true;
      storage.set(accountKey(k,id),normalized(k,value));
      if(needsWrite)markDirty(k);
    }
    if(migrating){
      for(const k of KEYS)storage.remove(k);
      storage.mark(flag);
    }
    for(const k of KEYS)if(storage.text(dirtyKey(k,id))==='1')dirty.add(k);
    loading=false;ready=true;
    changeStatus(dirty.size?'Sincronizando tus favoritos anteriores…':'Favoritos y rutas sincronizados con tu cuenta');
    notifyLoaded();
    if(dirty.size)schedule();
  }catch(e){
    if(g!==epoch)return;
    loading=false;ready=true;backend='metadata';
    for(const k of KEYS)if(storage.text(dirtyKey(k,id))==='1')dirty.add(k);
    changeStatus('Sin conexión con la nube; se mostrarán los guardados de este dispositivo.');
    notifyLoaded();
  }
}
window.ORIGEN_SAVED_SYNC={
  keyFor:k=>KEYS.includes(k)?accountKey(k):k,
  changed(k){if(!KEYS.includes(k)||!active)return;markDirty(k);schedule();},
  status:()=>status,
  userId:()=>active,
  ready:()=>ready,
  retry:()=>{if(active){if(ready&&dirty.size)void flush();else if(!ready)void activate({id:active})}}
};
client.auth.onAuthStateChange((event,session)=>{
  if(['INITIAL_SESSION','SIGNED_IN','SIGNED_OUT'].includes(event)){
    setTimeout(()=>{void activate(session?.user||null)},0);
  }
});
client.auth.getSession().then(({data})=>activate(data.session?.user||null)).catch(()=>{});
window.addEventListener('online',()=>{
  if(active&&dirty.size){if(ready)void flush();else void activate({id:active})}
});
window.addEventListener('storage',e=>{
  if(active&&KEYS.some(k=>e.key===accountKey(k))){
    notifyLoaded();
  }
});
})();