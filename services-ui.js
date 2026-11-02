(()=>{
const D=window.ORI_SERVICES||{cities:{}};
const appNode=()=>document.querySelector('#app');
const esc=s=>String(s||'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
const norm=s=>(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().trim();
const TYPE_LABELS={hotel:'Dormir',restaurant:'Comer',bar:'Bares y noche',cafe:'Cafés',experience:'Experiencias'};
const TRUST={
 'sernatur':{label:'Registro SERNATUR vigente',cls:'trust-sernatur'},
 'sernatur-listed':{label:'Listado en SERNATUR',cls:'trust-listed'},
 'local-official':{label:'Fuente turística local',cls:'trust-local'},
 'recommended':{label:'Recomendado por reputación',cls:'trust-recommended'}
};
function mapsUrl(name,city){return`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent((name||'')+' '+(city||'')+' Chile')}`;}
function sernaturCity(city){return`https://serviciosturisticos.sernatur.cl/resultado.php?comuna_nombre=${encodeURIComponent(city)}&nombre=`;}
function cityNames(){return Object.keys(D.cities||{}).sort((a,b)=>a.localeCompare(b,'es'));}
function allEntries(){let out=[];for(const [city,data] of Object.entries(D.cities||{})){(data.items||[]).forEach(item=>out.push({...item,city,region:data.region}));}return out;}
function serviceCard(x){const trust=TRUST[x.trust]||TRUST.recommended;const m=x.maps||`${x.name} ${x.city}`;return `<article class="service-card"><div class="service-top"><div><span class="service-type">${TYPE_LABELS[x.type]||x.type}</span><h3>${esc(x.name)}</h3><div class="service-city">${esc(x.city)} · ${esc(x.region)}</div></div></div><p>${esc(x.why)}</p><span class="trust-badge ${trust.cls}">${trust.label}</span><div class="service-actions">${x.source?`<a class="service-source" href="${x.source}" target="_blank" rel="noopener">Ver fuente ↗</a>`:''}<a class="service-map" href="${mapsUrl(m,'')}" target="_blank" rel="noopener">Ver en Maps ↗</a></div></article>`;}
function params(){const raw=(location.hash.split('?')[1]||'');return new URLSearchParams(raw);}
function render(){
 const root=appNode();if(!root)return;const p=params(),presetCity=p.get('city')||'',presetType=p.get('type')||'';
 const cities=cityNames();
 root.innerHTML=`<section class="pagehero services-hero"><div class="wrap"><span class="tag">Servicios turísticos</span><h1>Come, duerme y disfruta cada ciudad.</h1><p>Una selección curada por ORIGEN. Priorizamos servicios presentes en SERNATUR y complementamos con lugares reconocidos por fuentes locales y buena reputación.</p></div></section><section class="section"><div class="wrap"><div class="city-quick" id="svc-quick">${cities.map(c=>`<button data-city="${esc(c)}">${esc(c)}</button>`).join('')}</div><div class="services-filter"><div class="services-control"><label>Buscar</label><input id="svc-q" placeholder="Ej. hotel, cerveza, cocina patagónica..."></div><div class="services-control"><label>Ciudad</label><select id="svc-city"><option value="">Todas las ciudades</option>${cities.map(c=>`<option${c===presetCity?' selected':''}>${esc(c)}</option>`).join('')}</select></div><div class="services-control"><label>Categoría</label><select id="svc-type"><option value="">Todo</option><option value="hotel"${presetType==='hotel'?' selected':''}>Dormir</option><option value="restaurant"${presetType==='restaurant'?' selected':''}>Comer</option><option value="bar"${presetType==='bar'?' selected':''}>Bares y noche</option><option value="cafe"${presetType==='cafe'?' selected':''}>Cafés</option><option value="experience"${presetType==='experience'?' selected':''}>Experiencias</option></select></div><button class="services-clear" id="svc-clear">Limpiar</button></div><div class="services-summary"><p id="svc-summary"></p><a id="svc-sernatur" class="source" target="_blank" rel="noopener" href="https://serviciosturisticos.sernatur.cl/">Buscar directamente en SERNATUR ↗</a></div><div class="service-grid" id="svc-results"></div><div class="services-note"><b>Cómo leer las etiquetas:</b> “Registro SERNATUR vigente” significa que encontramos una ficha oficial vigente; “Listado en SERNATUR” significa que aparece en resultados actuales y conviene revalidar su ficha; “Fuente turística local” proviene de una guía oficial/local del destino; “Recomendado por reputación” no equivale a certificación oficial. En Chile, alojamiento y turismo aventura deben registrarse obligatoriamente en SERNATUR.</div></div></section>`;
 const q=document.querySelector('#svc-q'),city=document.querySelector('#svc-city'),type=document.querySelector('#svc-type'),results=document.querySelector('#svc-results'),summary=document.querySelector('#svc-summary'),official=document.querySelector('#svc-sernatur');
 const draw=()=>{const nq=norm(q.value),c=city.value,t=type.value;let list=allEntries().filter(x=>(!c||x.city===c)&&(!t||x.type===t)&&(!nq||norm([x.name,x.why,x.city,x.region,TYPE_LABELS[x.type]||x.type].join(' ')).includes(nq)));results.innerHTML=list.map(serviceCard).join('')||'<div class="finder-empty"><h3>No hay servicios curados todavía</h3><p>Usa el enlace de SERNATUR para ampliar la búsqueda en esa ciudad.</p></div>';summary.textContent=`${list.length} ${list.length===1?'servicio':'servicios'} en la selección ORIGEN${c?' · '+c:''}`;official.href=c?sernaturCity(c):'https://serviciosturisticos.sernatur.cl/';document.querySelectorAll('#svc-quick button').forEach(b=>b.classList.toggle('active',b.dataset.city===c));};
 [q,city,type].forEach(el=>el.addEventListener('input',draw));document.querySelector('#svc-clear').onclick=()=>{q.value='';city.value='';type.value='';draw();};document.querySelectorAll('#svc-quick button').forEach(b=>b.onclick=()=>{city.value=city.value===b.dataset.city?'':b.dataset.city;draw();});draw();scrollTo(0,0);
}
function route(){if(location.hash.startsWith('#/servicios'))setTimeout(render,0);}
addEventListener('hashchange',route);route();
window.ORI_SERVICE_HELPER={
 cities:cityNames,
 findCity(text){const n=norm(text);for(const [city,d] of Object.entries(D.cities||{})){const names=[city,...(d.aliases||[])];if(names.some(a=>` ${n} `.includes(` ${norm(a)} `)))return city;}return'';},
 typeFromText(text){const n=norm(text);if(/\b(hotel|hoteles|alojamiento|alojar|dormir|hostal|hostel)\b/.test(n))return'hotel';if(/\b(restaurante|restaurantes|comer|comida|cenar|almorzar|gastronomia)\b/.test(n))return'restaurant';if(/\b(bar|bares|pub|pubs|cerveza|coctel|cocteleria|noche|carrete)\b/.test(n))return'bar';if(/\b(cafe|cafes|cafeteria|desayuno)\b/.test(n))return'cafe';if(/\b(experiencia|experiencias|panorama|panoramas|museo)\b/.test(n))return'experience';return'';},
 find(city,type){const d=D.cities?.[city];return d?(d.items||[]).filter(x=>!type||x.type===type):[];},
 card(x,city){return serviceCard({...x,city,region:D.cities?.[city]?.region||''});},
 sernaturCity
};
})();