const WM=(file)=>`https://commons.wikimedia.org/wiki/Special:Redirect/file/${encodeURIComponent(file)}?width=1400`;
window.VIMG={
"Villarrica":WM("Volcan Villarrica desde el lago 2025 Chile.jpg"),"Osorno":WM("Aerosillas en el volcán Osorno.jpg"),"Nevados de Chillán":WM("Volcán Chillán.jpg"),"Llaima":WM("Araucarias-Volcan-Llaima.jpg"),"Antuco":WM("Volcan-Antuco-y-Sierra-Velluda.jpg"),"Puyehue - Cordón Caulle":WM("Volcán Puyehue Parque Nacional Puyehue 13.jpg"),"Calbuco":WM("Calbuco Volcano seen from Llanquihue National Reserve, Chile January 2026.jpg"),"Chaitén":WM("Chaiten Volcano Chile.jpg"),"Lonquimay":WM("Volcan Lonquimay despues de una caida de nieve (2024).jpg"),"Copahue":WM("Copahue Volcano view.jpg"),"Láscar":WM("Volcan Lascar (5600m) (5519843521).jpg"),"Licancabur":WM("Licancabur and Laguna Verde (9466138491).jpg"),"Ojos del Salado":WM("Majestic Ojos del Salado volcano (4320230217).jpg"),"Llullaillaco":WM("A volcanic sunrise (potw2519a).jpg"),"Isla de Pascua":WM("Rano Kau Volcano.jpg"),"Sollipulli":WM("Ice-filled summit caldera, Sollipulli volcano, Chile.jpg"),"Quetrupillán":WM("Volcán Quetrupillán.jpg"),"Lanín":WM("LaninVolcano.jpg"),"Antillanca":WM("Antillanca.jpg"),"Mocho - Choshuenco":WM("J28 002 Choshuenco y Mocho.jpg"),"Parinacota":WM("Lago Chungará y Volcán Parinacota.JPG"),"Guallatiri":WM("Volcán Guallatiri desde A-235.jpg"),"Isluga":WM("Volcán Isluga.jpg"),"Taapaca":WM("Nevados de Putre Taapaca.jpg"),"Tupungatito":WM("Volcanes Tupungatito y Tupungato.jpg"),"San José":WM("Atardecer Volcán San José.JPG"),"Laguna del Maule":WM("Laguna del Maule (34337827641).jpg"),"Planchón - Peteroa":WM("Planchon Peteroa.jpg"),"Nevado de Longaví":WM("Nevado de Longavi.jpg"),"Pali-Aike":WM("Volcán de Pali Aike.jpg")
};
(()=>{
const CACHE_KEY='origen_verified_volcano_photos_v3';
const WIKI={
 'Puyehue - Cordón Caulle':'Complejo volcánico Puyehue-Cordón Caulle','Laguna del Maule':'Complejo volcánico Laguna del Maule','Planchón - Peteroa':'Planchón-Peteroa','Nevados de Chillán':'Complejo volcánico Nevados de Chillán','Mocho - Choshuenco':'Mocho-Choshuenco','Pali-Aike':'Pali Aike','Isla de Pascua':'Rano Kau','Antillanca':'Complejo volcánico Antillanca'
};
const NEGATIVE=/\b(map|mapa|logo|escudo|bandera|flag|diagram|diagrama|location|ubicacion|portrait|retrato|document|satellite map|locator map)\b/i;
const clean=s=>String(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();
const tokens=s=>clean(s).split(/\s+/).filter(x=>x.length>=4&&!['volcan','volcano','chile','complejo','complex','cerro'].includes(x));
const badUrl=url=>{try{return NEGATIVE.test(decodeURIComponent(String(url||'')))}catch{return NEGATIVE.test(String(url||''))}};
let cache={};try{cache=JSON.parse(localStorage.getItem(CACHE_KEY)||'{}')||{}}catch{}
const failed=new Set();const audit=window.ORIGEN_VOLCANO_IMAGE_AUDIT={};
const persist=()=>{try{localStorage.setItem(CACHE_KEY,JSON.stringify(cache))}catch{}};
for(const [name,row] of Object.entries(cache)){const url=typeof row==='string'?row:row?.url;if(url&&!window.VIMG[name])window.VIMG[name]=url;}
window.getVolcanoImage=(name)=>window.VIMG[name]||VOLCANO_IMG;
const setAudit=(name,status,source,url='')=>{audit[name]={status,source,url};};
const updateDom=(name,url)=>{
  document.querySelectorAll('img').forEach(img=>{if(img.alt===name){img.style.display='';img.parentElement?.classList.remove('media-fallback');img.src=url;}});
  if(typeof V!=='undefined'){
    const v=V.find(x=>x.name===name);if(v&&location.hash===`#/volcan/${v.rank}`){const hero=document.querySelector('.guide-hero,.pagehero-photo');if(hero)hero.style.setProperty('--heroimg',`url("${url}")`);}
  }
};
async function wikiThumb(title){
  if(!title)return null;const api='https://es.wikipedia.org/w/api.php?origin=*&action=query&format=json&redirects=1&prop=pageimages&piprop=thumbnail%7Coriginal&pithumbsize=1400&titles='+encodeURIComponent(title);
  try{const r=await fetch(api,{mode:'cors'});if(!r.ok)return null;const d=await r.json(),p=Object.values(d.query?.pages||{})[0];if(!p||p.missing!==undefined)return null;const img=p.thumbnail||p.original,url=img?.source||null;if(!url||badUrl(url)||(img.width&&img.width<500)||(img.height&&img.height<300))return null;return{url,title:p.title||title}}catch{return null}
}
const titleScore=(v,title,snippet='')=>{const t=clean(title),base=clean(WIKI[v.name]||v.name),tt=tokens(v.name);let s=0;if(t===base)s+=30;else if(t.includes(base)||base.includes(t))s+=14;const m=tt.filter(x=>t.includes(x));s+=m.length*8;if(clean(snippet).includes('volcan'))s+=3;if(clean(snippet).includes('chile'))s+=2;if(tt.length>1&&m.length<Math.min(2,tt.length))s-=10;return s;};
async function wikipediaSearch(v){
  const direct=[WIKI[v.name],`Volcán ${v.name}`,`${v.name} (volcán)`,v.name].filter(Boolean);
  for(const title of [...new Set(direct)]){const hit=await wikiThumb(title);if(hit)return hit;}
  const api='https://es.wikipedia.org/w/api.php?origin=*&action=query&format=json&list=search&srnamespace=0&srlimit=6&srsearch='+encodeURIComponent(`${v.name} volcán Chile`);
  try{const r=await fetch(api,{mode:'cors'});if(!r.ok)return null;const d=await r.json();const rows=(d.query?.search||[]).map(x=>({...x,_score:titleScore(v,x.title,x.snippet)})).sort((a,b)=>b._score-a._score);for(const row of rows.slice(0,3)){if(row._score<8)continue;const hit=await wikiThumb(row.title);if(hit)return hit;}}catch{}
  return null;
}
const commonsScore=(v,page)=>{const title=clean(page.title||''),info=page.imageinfo?.[0];if(!info||!/^image\/(jpeg|png|webp)$/i.test(info.mime||'')||NEGATIVE.test(title))return-999;const tt=[...new Set([...tokens(v.name),...tokens(WIKI[v.name]||'')])],matched=tt.filter(x=>title.includes(x));let s=0;if(title.includes(clean(v.name)))s+=24;if(WIKI[v.name]&&title.includes(clean(WIKI[v.name])))s+=22;s+=matched.length*7;if(title.includes('chile'))s+=2;if(title.includes('volcan'))s+=3;if((info.width||0)>=(info.height||0))s+=3;if((info.width||0)>=1200)s+=2;const need=tt.length>=2?2:1;if(matched.length<need&&!title.includes(clean(v.name)))s-=18;return s;};
async function commonsSearch(v){
  const queries=[`${WIKI[v.name]||v.name} volcano Chile`,`${v.name} volcán ${v.region}`,`${v.name} Chile`];let best=null,bestScore=-999;
  for(const q of [...new Set(queries)]){const api='https://commons.wikimedia.org/w/api.php?origin=*&action=query&format=json&generator=search&gsrnamespace=6&gsrlimit=18&gsrsearch='+encodeURIComponent(q)+'&prop=imageinfo&iiprop=url%7Csize%7Cmime&iiurlwidth=1400';try{const r=await fetch(api,{mode:'cors'});if(!r.ok)continue;const d=await r.json();for(const page of Object.values(d.query?.pages||{})){const s=commonsScore(v,page);if(s>bestScore){bestScore=s;best=page}}if(bestScore>=20)break}catch{}}
  const info=best?.imageinfo?.[0],url=info?.thumburl||info?.url||null;return bestScore>=12&&url&&!badUrl(url)?{url,title:best.title||''}:null;
}
const resolving=new Map();
async function resolveVolcano(v,{force=false}={}){
  if(!v)return null;if(resolving.has(v.name))return resolving.get(v.name);
  const task=(async()=>{
    const cached=cache[v.name],cachedUrl=typeof cached==='string'?cached:cached?.url;if(!force&&cachedUrl&&!failed.has(cachedUrl)){window.VIMG[v.name]=cachedUrl;updateDom(v.name,cachedUrl);setAudit(v.name,'resolved',cached?.source||'cache',cachedUrl);return cachedUrl;}
    if(window.VIMG[v.name]&&!failed.has(window.VIMG[v.name])&&!force){setAudit(v.name,'resolved','manual',window.VIMG[v.name]);return window.VIMG[v.name];}
    setAudit(v.name,'searching','wikipedia');const wiki=await wikipediaSearch(v);if(wiki?.url&&!failed.has(wiki.url)){window.VIMG[v.name]=wiki.url;cache[v.name]={url:wiki.url,source:'wikipedia',title:wiki.title};persist();updateDom(v.name,wiki.url);setAudit(v.name,'resolved','wikipedia',wiki.url);return wiki.url;}
    setAudit(v.name,'searching','commons');const common=await commonsSearch(v);if(common?.url&&!failed.has(common.url)){window.VIMG[v.name]=common.url;cache[v.name]={url:common.url,source:'commons',title:common.title};persist();updateDom(v.name,common.url);setAudit(v.name,'resolved','commons',common.url);return common.url;}
    setAudit(v.name,'fallback','generic',VOLCANO_IMG);return null;
  })().finally(()=>resolving.delete(v.name));resolving.set(v.name,task);return task;
}
document.addEventListener('error',e=>{const img=e.target;if(!(img instanceof HTMLImageElement)||typeof V==='undefined')return;const v=V.find(x=>x.name===img.alt);if(!v)return;e.stopImmediatePropagation();const src=img.currentSrc||img.getAttribute('src')||'';if(src)failed.add(src);const cached=cache[v.name],cachedUrl=typeof cached==='string'?cached:cached?.url;if(cachedUrl===src){delete cache[v.name];persist();}img.style.display='';img.parentElement?.classList.remove('media-fallback');img.src=VOLCANO_IMG;resolveVolcano(v,{force:true});},true);
if(typeof V!=='undefined'){
  V.forEach(v=>{if(window.VIMG[v.name])setAudit(v.name,'resolved','manual',window.VIMG[v.name]);});
  const pending=V.filter(v=>!window.VIMG[v.name]);let cursor=0;
  async function worker(){while(cursor<pending.length){const v=pending[cursor++];await resolveVolcano(v);await new Promise(r=>setTimeout(r,110));}}
  Promise.all(Array.from({length:3},worker)).then(()=>window.dispatchEvent(new CustomEvent('origen:volcanoimageauditcomplete',{detail:audit})));
}
window.ORIGEN_VOLCANO_IMAGE_AUDIT_SUMMARY=()=>{const rows=Object.entries(audit);return{total:typeof V!=='undefined'?V.length:rows.length,resolved:rows.filter(([,x])=>x.status==='resolved').length,fallback:rows.filter(([,x])=>x.status==='fallback').map(([name])=>name),searching:rows.filter(([,x])=>x.status==='searching').length};};
})();