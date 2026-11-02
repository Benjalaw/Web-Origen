(()=>{
const D=window.ORI_SERVICES||{cities:{}};
const appNode=()=>document.querySelector('#app');
const esc=s=>String(s||'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
const norm=s=>(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().trim();
const TYPE_LABELS={hotel:'Dormir',restaurant:'Comer',bar:'Bares y noche',cafe:'Cafés',experience:'Experiencias'};
const TRUST={
 'sernatur':{label:'Registro SERNATUR vigente',cls:'trust-sernatur',score:0},
 'sernatur-listed':{label:'Listado en SERNATUR',cls:'trust-listed',score:1},
 'local-official':{label:'Fuente turística local',cls:'trust-local',score:2},
 'recommended':{label:'Recomendado por reputación',cls:'trust-recommended',score:3}
};
function mapsUrl(name,city){return`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent((name||'')+' '+(city||'')+' Chile')}`;}
function sernaturCity(city){return`https://serviciosturisticos.sernatur.cl/resultado.php?comuna_nombre=${encodeURIComponent(city)}&nombre=`;}
function cityNames(){return Object.keys(D.cities||{}).sort((a,b)=>a.localeCompare(b,'es'));}
function allEntries(){let out=[];for(const [city,data] of Object.entries(D.cities||{})){(data.items||[]).forEach(item=>out.push({...item,city,region:data.region}));}return out;}
function serviceCard(x){const trust=TRUST[x.trust]||TRUST.recommended;const m=x.maps||`${x.name} ${x.city}`;return `<article class="service-card"><div class="service-top"><div><span class="service-type">${TYPE_LABELS[x.type]||x.type}</span><h3>${esc(x.name)}</h3><div class="service-city">${esc(x.city)} · ${esc(x.region)}</div></div></div><p>${esc(x.why)}</p><span class="trust-badge ${trust.cls}">${trust.label}</span><div class="service-actions">${x.source?`<a class="service-source" href="${x.source}" target="_blank" rel="noopener">Fuente ↗</a>`:''}<a class="service-map" href="${mapsUrl(m,'')}" target="_blank" rel="noopener">Maps ↗</a></div></article>`;}
function params(){return new URLSearchParams(location.hash.split('?')[1]||'');}
function closestCity(value){const n=norm(value);if(!n)return'';return cityNames().find(c=>norm(c)===n)||cityNames().find(c=>norm(c).includes(n)||n.includes(norm(c)))||'';}
function render(){
 const root=appNode();if(!root)return;const p=params(),presetCity=p.get('city')||'',presetType=p.get('type')||'';
 const cities=cityNames(),cityOptions=cities.map(c=>`<option value="${esc(c)}"></option>`).join('');
 root.innerHTML=`<section class="pagehero services-hero"><div class="wrap"><span class="tag">Servicios turísticos</span><h1>Busca dónde dormir, comer y salir.</h1><p>Escribe una ciudad y encuentra una selección curada de servicios. Priorizamos registros SERNATUR y complementamos con lugares reconocidos por fuentes locales y buena reputación.</p></div></section><section class="section"><div class="wrap"><div class="services-filter compact-filter"><div class="services-control services-city-search"><label>Ciudad</label><input id="svc-city" list="svc-city-list" value="${esc(presetCity)}" placeholder="Escribe una ciudad: Pucón, Arica, Castro..."><datalist id="svc-city-list">${cityOptions}</datalist></div><div class="services-control"><label>Qué buscas</label><input id="svc-q" placeholder="Ej. mariscos, cerveza, spa, mirador..."></div><div class="services-control"><label>Categoría</label><select id="svc-type"><option value="">Todo</option><option value="hotel"${presetType==='hotel'?' selected':''}>Dormir</option><option value="restaurant"${presetType==='restaurant'?' selected':''}>Comer</option><option value="bar"${presetType==='bar'?' selected':''}>Bares y noche</option><option value="cafe"${presetType==='cafe'?' selected':''}>Cafés</option><option value="experience"${presetType==='experience'?' selected':''}>Experiencias</option></select></div><button class="services-clear" id="svc-clear">Limpiar</button></div><div class="services-summary"><div><b id="svc-summary"></b><span class="services-coverage">${cities.length} ciudades/localidades en la guía</span></div><a id="svc-sernatur" class="source" target="_blank" rel="noopener" href="https://serviciosturisticos.sernatur.cl/">Ver registro SERNATUR ↗</a></div><div class="service-grid" id="svc-results"></div><div class="services-note"><b>Cómo leer las etiquetas:</b> “Registro SERNATUR vigente” corresponde a una ficha oficial vigente encontrada durante la revisión; “Listado en SERNATUR” indica presencia en resultados oficiales y conviene revalidar la ficha antes de contratar; “Recomendado por reputación” no equivale a registro oficial. SERNATUR indica que alojamiento y turismo aventura deben estar registrados obligatoriamente.</div></div></section>`;
 const q=document.querySelector('#svc-q'),city=document.querySelector('#svc-city'),type=document.querySelector('#svc-type'),results=document.querySelector('#svc-results'),summary=document.querySelector('#svc-summary'),official=document.querySelector('#svc-sernatur');
 const draw=()=>{const nq=norm(q.value),typed=norm(city.value),selected=closestCity(city.value),t=type.value;let list=allEntries().filter(x=>(!typed||norm(x.city).includes(typed)||norm(x.region).includes(typed))&&(!t||x.type===t)&&(!nq||norm([x.name,x.why,x.city,x.region,TYPE_LABELS[x.type]||x.type].join(' ')).includes(nq)));list.sort((a,b)=>(TRUST[a.trust]?.score??9)-(TRUST[b.trust]?.score??9)||a.city.localeCompare(b.city,'es')||a.name.localeCompare(b.name,'es'));results.innerHTML=list.slice(0,120).map(serviceCard).join('')||'<div class="finder-empty"><h3>No hay coincidencias</h3><p>Prueba otra ciudad o una búsqueda más general. También puedes ampliar la búsqueda directamente en SERNATUR.</p></div>';summary.textContent=`${list.length} ${list.length===1?'resultado':'resultados'}${selected?' · '+selected:''}`;official.href=selected?sernaturCity(selected):'https://serviciosturisticos.sernatur.cl/';};
 [q,city,type].forEach(el=>el.addEventListener('input',draw));document.querySelector('#svc-clear').onclick=()=>{q.value='';city.value='';type.value='';draw();};draw();scrollTo(0,0);
}
function route(){if(location.hash.startsWith('#/servicios'))setTimeout(render,0);}
addEventListener('hashchange',route);route();
window.ORI_SERVICE_HELPER={
 cities:cityNames,
 findCity(text){const n=norm(text);for(const [city,d] of Object.entries(D.cities||{})){const names=[city,...(d.aliases||[])];if(names.some(a=>` ${n} `.includes(` ${norm(a)} `)))return city;}return'';},
 typeFromText(text){const n=norm(text);if(/\b(hotel|hoteles|alojamiento|alojar|dormir|hostal|hostel|cabana|cabaña|lodge)\b/.test(n))return'hotel';if(/\b(restaurante|restaurantes|comer|comida|cenar|almorzar|gastronomia|gastronomía)\b/.test(n))return'restaurant';if(/\b(bar|bares|pub|pubs|cerveza|coctel|cocteleria|coctelería|noche|carrete)\b/.test(n))return'bar';if(/\b(cafe|cafes|cafeteria|cafetería|desayuno|once)\b/.test(n))return'cafe';if(/\b(experiencia|experiencias|panorama|panoramas|museo|mirador|atractivo|atractivos)\b/.test(n))return'experience';return'';},
 find(city,type){const d=D.cities?.[city];return d?(d.items||[]).filter(x=>!type||x.type===type):[];},
 card(x,city){return serviceCard({...x,city,region:D.cities?.[city]?.region||''});},
 sernaturCity
};
})();