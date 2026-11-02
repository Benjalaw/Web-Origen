(()=>{
const KEY='origen_ori_memory_v1';
const N=s=>(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9ñ$]+/gi,' ').replace(/\s+/g,' ').trim();
const E=s=>String(s||'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
const defaults=()=>({version:1,createdAt:new Date().toISOString(),updatedAt:new Date().toISOString(),homeCity:'',preferredRegions:[],interests:[],travelStyle:[],lodging:[],budget:'',transport:[],companions:'',notes:[],signals:{interests:{},cities:{}},enabled:true});
function load(){try{const raw=localStorage.getItem(KEY);if(!raw)return defaults();return {...defaults(),...JSON.parse(raw)};}catch(e){return defaults();}}
let M=load();
function save(){M.updatedAt=new Date().toISOString();try{localStorage.setItem(KEY,JSON.stringify(M));}catch(e){}}
function uniq(a){return[...new Set((a||[]).filter(Boolean))];}
function add(arr,val){if(val&&!arr.includes(val)){arr.push(val);save();return true;}return false;}
function cityFrom(text){const n=N(text),cities=window.ORI_TRAVEL?.cities||{};let best='';for(const [name,d] of Object.entries(cities)){for(const a of [name,...(d.aliases||[])]){const x=N(a);if(x&&(` ${n} `).includes(` ${x} `)&&x.length>N(best).length)best=name;}}return best;}
const INTERESTS={
 trekking:['trekking','senderismo','caminar','caminata','cerros','montañismo','montanismo'],
 aventura:['aventura','rafting','kayak','escalada','parapente','adrenalina','outdoor'],
 naturaleza:['naturaleza','bosque','bosques','fauna','parques','lagos','paisajes'],
 nieve:['nieve','ski','esqui','snowboard'],
 termas:['termas','termal','spa','bienestar'],
 costa:['playa','playas','costa','mar','surf','buceo'],
 gastronomía:['gastronomia','comida','restaurantes','cocina','cerveza','vino','mariscos'],
 cultura:['cultura','patrimonio','historia','museos','arqueologia'],
 astronomía:['astronomia','estrellas','observatorio','cielo'],
 fotografía:['fotografia','fotos','miradores'],
 roadtrip:['roadtrip','carretera','ruta en auto','viajar en auto']
};
function interestsFrom(text){const n=N(text),out=[];for(const [k,words] of Object.entries(INTERESTS))if(words.some(w=>n.includes(N(w))))out.push(k);return out;}
function trackSignals(text){if(!M.enabled)return;const n=N(text),explicitMemory=/\b(recuerda|acuerdate|acuérdate|guarda|memoriza|ten en cuenta)\b/.test(n);const prefs=/\b(me gusta|me gustan|prefiero|amo|me encanta|suelo|quiero normalmente)\b/.test(n);const ints=interestsFrom(text);if(explicitMemory||prefs){ints.forEach(i=>add(M.interests,i));}
 if(ints.length){ints.forEach(i=>M.signals.interests[i]=(M.signals.interests[i]||0)+1);save();}
 const c=cityFrom(text);if(c){M.signals.cities[c]=(M.signals.cities[c]||0)+1;save();}
}
function parseExplicit(text){if(!M.enabled)return[];const n=N(text),changes=[];const c=cityFrom(text);
 if(c&&/\b(vivo en|soy de|mi ciudad es|salgo desde|viajo desde|mi base es|recuerda que soy de|recuerda que vivo en)\b/.test(n)){M.homeCity=c;changes.push(`tu ciudad/base: ${c}`);}
 const ints=interestsFrom(text);if(/\b(me gusta|me gustan|prefiero|me encanta|amo|recuerda que me gusta|mis intereses)\b/.test(n)){ints.forEach(i=>{if(add(M.interests,i))changes.push(`interés: ${i}`);});}
 if(/\b(hotel barato|hoteles baratos|hostal|hostales|alojamiento economico|alojamiento barato)\b/.test(n)){if(add(M.lodging,'económico'))changes.push('alojamiento económico');}
 if(/\b(hotel boutique|hoteles boutique|boutique)\b/.test(n)){if(add(M.lodging,'boutique'))changes.push('hotel boutique');}
 if(/\b(hotel de lujo|hoteles de lujo|lujo|cinco estrellas|5 estrellas)\b/.test(n)){if(add(M.lodging,'alta gama'))changes.push('alojamiento de alta gama');}
 if(/\b(mochilero|mochilera|backpacker)\b/.test(n)){if(add(M.travelStyle,'mochilero'))changes.push('estilo mochilero');}
 if(/\b(relajado|tranquilo|sin apuro|lento)\b/.test(n)){if(add(M.travelStyle,'relajado'))changes.push('ritmo relajado');}
 if(/\b(intenso|aprovechar al maximo|muchas actividades)\b/.test(n)){if(add(M.travelStyle,'intenso'))changes.push('ritmo intenso');}
 if(/\b(en auto|manejo|conduzco|vehiculo propio|auto propio)\b/.test(n)){if(add(M.transport,'auto'))changes.push('transporte preferido: auto');}
 if(/\b(en bus|prefiero bus|viajo en bus)\b/.test(n)){if(add(M.transport,'bus'))changes.push('transporte preferido: bus');}
 if(/\b(viajo solo|viajo sola|voy solo|voy sola)\b/.test(n)){M.companions='solo/a';changes.push('viajas solo/a');}
 if(/\b(en pareja|con mi pareja)\b/.test(n)){M.companions='pareja';changes.push('viajas en pareja');}
 if(/\b(con amigos|con mis amigos)\b/.test(n)){M.companions='amigos';changes.push('viajas con amigos');}
 if(/\b(con niños|con ninos|con hijos|en familia)\b/.test(n)){M.companions='familia';changes.push('viajas en familia');}
 const budget=text.match(/(?:presupuesto|gastar|cuento con|tengo)\s*(?:de|con)?\s*\$?\s*([\d\.]{4,})/i);if(budget){M.budget=budget[1];changes.push(`presupuesto aproximado: $${budget[1]}`);}
 if(changes.length)save();return changes;
}
function learnedInterests(){return Object.entries(M.signals.interests||{}).sort((a,b)=>b[1]-a[1]).filter(x=>x[1]>=2).slice(0,3).map(x=>x[0]);}
function learnedCities(){return Object.entries(M.signals.cities||{}).sort((a,b)=>b[1]-a[1]).filter(x=>x[1]>=2).slice(0,3).map(x=>x[0]);}
function summary(){const rows=[];if(M.homeCity)rows.push(`<b>Ciudad/base:</b> ${E(M.homeCity)}`);if(M.interests.length)rows.push(`<b>Intereses:</b> ${M.interests.map(E).join(', ')}`);if(M.travelStyle.length)rows.push(`<b>Estilo:</b> ${M.travelStyle.map(E).join(', ')}`);if(M.lodging.length)rows.push(`<b>Alojamiento:</b> ${M.lodging.map(E).join(', ')}`);if(M.transport.length)rows.push(`<b>Transporte:</b> ${M.transport.map(E).join(', ')}`);if(M.companions)rows.push(`<b>Sueles viajar:</b> ${E(M.companions)}`);if(M.budget)rows.push(`<b>Presupuesto:</b> $${E(M.budget)}`);const li=learnedInterests().filter(x=>!M.interests.includes(x));if(li.length)rows.push(`<b>He notado que preguntas seguido por:</b> ${li.map(E).join(', ')}`);const lc=learnedCities().filter(x=>x!==M.homeCity);if(lc.length)rows.push(`<b>Ciudades que has consultado varias veces:</b> ${lc.map(E).join(', ')}`);return rows;}
function forgetAll(){M=defaults();try{localStorage.removeItem(KEY);}catch(e){};}
function forgetTopic(text){const n=N(text);let changed=false;if(n.includes('ciudad')||n.includes('donde vivo')||n.includes('base')){M.homeCity='';changed=true;}if(n.includes('interes')||n.includes('gusto')){M.interests=[];M.signals.interests={};changed=true;}if(n.includes('alojamiento')||n.includes('hotel')){M.lodging=[];changed=true;}if(n.includes('transporte')){M.transport=[];changed=true;}if(n.includes('presupuesto')){M.budget='';changed=true;}if(n.includes('compan')||n.includes('viajo con')){M.companions='';changed=true;}if(changed)save();return changed;}
function preferenceHint(){const bits=[];if(M.homeCity)bits.push(`sales normalmente desde ${M.homeCity}`);const ints=uniq([...M.interests,...learnedInterests()]).slice(0,2);if(ints.length)bits.push(`te interesa ${ints.join(' y ')}`);if(M.lodging.length)bits.push(`prefieres alojamiento ${M.lodging[0]}`);if(M.transport.length)bits.push(`sueles moverte en ${M.transport[0]}`);return bits;}
function boot(){const form=document.querySelector('#ori-form'),input=document.querySelector('#ori-input'),messages=document.querySelector('#ori-messages');if(!form||!input||!messages||form.dataset.memoryReady)return;form.dataset.memoryReady='1';const base=form.onsubmit;const addMsg=(html,type='bot')=>{const d=document.createElement('div');d.className=`ori-msg ${type}`;d.innerHTML=html;messages.appendChild(d);messages.scrollTop=messages.scrollHeight;};
 form.onsubmit=e=>{const q=input.value,n=N(q);if(!q.trim())return typeof base==='function'?base.call(form,e):undefined;
   if(/\b(que recuerdas de mi|que sabes de mi|muestra mi memoria|ver mi memoria|que has aprendido de mi)\b/.test(n)){e.preventDefault();addMsg(E(q),'user');input.value='';const rows=summary();setTimeout(()=>addMsg(rows.length?`Esto es lo que recuerdo <b>solo en este navegador</b>:<br><br>${rows.join('<br>')}<br><br><span style="font-size:.82em">Puedes corregirme diciendo “recuerda que…” o borrar todo con “olvida todo sobre mí”.</span>`:'Todavía no recuerdo preferencias tuyas. Puedes decirme, por ejemplo, <b>“recuerda que soy de Concepción y me gusta el trekking”</b>.','bot'),60);return;}
   if(/\b(olvida todo|borra mi memoria|borrar mi memoria|olvida todo sobre mi|elimina lo que sabes de mi)\b/.test(n)){e.preventDefault();addMsg(E(q),'user');input.value='';forgetAll();setTimeout(()=>addMsg('Listo: borré la memoria local de ORI en este navegador. 🌿','bot'),60);return;}
   if(/\b(olvida|borra|elimina)\b/.test(n)&&forgetTopic(q)){e.preventDefault();addMsg(E(q),'user');input.value='';setTimeout(()=>addMsg('He borrado esa preferencia de mi memoria local.','bot'),60);return;}
   if(/\b(desactiva la memoria|no recuerdes nada|apaga la memoria)\b/.test(n)){e.preventDefault();addMsg(E(q),'user');input.value='';M.enabled=false;save();setTimeout(()=>addMsg('Memoria local desactivada. No guardaré nuevas preferencias hasta que me digas “activa la memoria”.','bot'),60);return;}
   if(/\b(activa la memoria|puedes recordar|enciende la memoria)\b/.test(n)){e.preventDefault();addMsg(E(q),'user');input.value='';M.enabled=true;save();setTimeout(()=>addMsg('Memoria local activada 🌿. Puedo volver a recordar preferencias en este navegador.','bot'),60);return;}
   const changes=parseExplicit(q);trackSignals(q);
   if(changes.length&&/\b(recuerda|acuerdate|acuérdate|guarda|memoriza|ten en cuenta)\b/.test(n)){e.preventDefault();addMsg(E(q),'user');input.value='';setTimeout(()=>addMsg(`Lo tendré en cuenta en este navegador: <b>${changes.map(E).join(', ')}</b>. Puedes preguntarme “¿qué recuerdas de mí?” cuando quieras.`,'bot'),60);return;}
   const genericRec=/\b(recomiendame|recomienda|que me recomiendas|a donde voy|donde podria ir|donde puedo ir|arma un viaje|planifica un viaje)\b/.test(n);const hint=preferenceHint();if(genericRec&&hint.length){addMsg(`Tomaré en cuenta que ${E(hint.join(', '))}.`,'bot');}
   if(typeof base==='function')return base.call(form,e);
 };
}
window.ORI_MEMORY={get:()=>JSON.parse(JSON.stringify(M)),summary,clear:forgetAll,enabled:()=>M.enabled};
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>setTimeout(boot,80));else setTimeout(boot,80);
})();