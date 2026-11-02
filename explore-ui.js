(()=>{
const REGIONS=['Arica y Parinacota','Tarapacá','Antofagasta','Atacama','Coquimbo','Valparaíso','Metropolitana','O’Higgins','Maule','Ñuble','Biobío','La Araucanía','Los Ríos','Los Lagos','Aysén','Magallanes'];
const INTERESTS={
'Aventura':['aventura','trekking','senderismo','rafting','kayak','escalada','surf','montaña','snowboard','ski','ascenso','montañismo'],
'Naturaleza':['naturaleza','bosques','fauna','lagos','ríos','glaciares','patagonia','desierto','volcanes','paisaje'],
'Cultura y patrimonio':['cultura','patrimonio','historia','arte','arqueología','turismo indígena','aymara','pehuenche','rapa nui'],
'Gastronomía':['gastronomía','cerveza','pisco','cocina'],
'Nieve':['nieve','snowboard','ski'],
'Termas y bienestar':['termas','bienestar'],
'Costa e islas':['costa','playa','surf','buceo','islas','náutica'],
'Astronomía':['astronomía','estrellas','observatorios'],
'Fotografía':['fotografía','miradores'],
'Roadtrip':['roadtrip','ruta escénica'],
'Familia':['familia','familias'],
'Trekking':['trekking','senderismo','ascenso','montañismo']
};
const norm=s=>(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
const regionMatches=(txt,r)=>!r||norm(txt).includes(norm(r).replace('o’higgins',"o'higgins"));
const interestMatches=(tags,label)=>{if(!label)return true;const t=norm((tags||[]).join(' '));return INTERESTS[label].some(k=>t.includes(norm(k)));};
const placeCard=x=>`<a class="card place-card finder-card" href="#/lugar/${x.id}">${media(x.image,x.name)}<div class="card-body"><div class="finder-type">Destino · ${x.region}</div><h3>${x.name}</h3><p>${x.lead}</p><div class="chip-list">${(x.interests||[]).slice(0,4).map(t=>`<span>${t}</span>`).join('')}</div><span class="go">Abrir guía →</span></div></a>`;
const volcanoCard=v=>{const m=getVolcanoTourism(v),img=getVolcanoImage(v.name);return `<a class="card place-card finder-card" href="#/volcan/${v.rank}">${media(img,v.name)}<div class="card-body"><div class="finder-type">Volcán · ${v.region}</div><h3>${v.name}</h3><p>${m.summary}</p><div class="chip-list">${m.tags.slice(0,4).map(t=>`<span>${t}</span>`).join('')}</div><span class="go">Abrir guía →</span></div></a>`};
function renderExplorer(){
 const regions=REGIONS.map(r=>`<option>${r}</option>`).join('');
 const interests=Object.keys(INTERESTS).map(i=>`<option>${i}</option>`).join('');
 app.innerHTML=`<section class="pagehero finder-hero"><div class="wrap"><span class="tag">Explora Chile a tu manera</span><h1>¿Qué quieres encontrar?</h1><p>Filtra destinos y volcanes según la región que quieras visitar y el tipo de experiencia que buscas.</p></div></section><section class="section finder-section"><div class="wrap"><div class="finder-box"><div class="finder-control finder-search"><label>Buscar</label><input id="fq" placeholder="Ej. kayak, Chiloé, termas, Patagonia..."></div><div class="finder-control"><label>Región</label><select id="fr"><option value="">Todo Chile</option>${regions}</select></div><div class="finder-control"><label>Interés</label><select id="fi"><option value="">Todos los intereses</option>${interests}</select></div><div class="finder-control"><label>Tipo</label><select id="ft"><option value="">Todo</option><option value="place">Destinos</option><option value="volcano">Volcanes</option></select></div></div><div class="finder-summary"><b id="fcount"></b><button id="fclear">Limpiar filtros</button></div><div class="grid finder-grid" id="fresults"></div></div></section>`;
 const draw=()=>{
  const q=norm(document.querySelector('#fq').value),r=document.querySelector('#fr').value,i=document.querySelector('#fi').value,t=document.querySelector('#ft').value;
  let results=[];
  if(t!=='volcano') P.forEach(x=>{const hay=norm([x.name,x.region,x.lead,x.story,(x.interests||[]).join(' ')].join(' '));if((!q||hay.includes(q))&&regionMatches(x.region,r)&&interestMatches(x.interests,i))results.push({kind:'place',name:x.name,html:placeCard(x)});});
  if(t!=='place') V.forEach(v=>{const m=getVolcanoTourism(v),tags=[...(m.tags||[]),m.experience,'volcanes','montaña'];const hay=norm([v.name,v.region,m.summary,tags.join(' ')].join(' '));if((!q||hay.includes(q))&&regionMatches(v.region,r)&&interestMatches(tags,i))results.push({kind:'volcano',name:v.name,html:volcanoCard(v),priority:m.priority});});
  results.sort((a,b)=>a.kind===b.kind?(a.priority||100)-(b.priority||100)||a.name.localeCompare(b.name):a.kind==='place'?-1:1);
  document.querySelector('#fcount').textContent=`${results.length} ${results.length===1?'resultado':'resultados'}`;
  document.querySelector('#fresults').innerHTML=results.slice(0,60).map(x=>x.html).join('')||'<div class="finder-empty"><h3>No encontramos coincidencias</h3><p>Prueba otra región, interés o una búsqueda más amplia.</p></div>';
 };
 ['fq','fr','fi','ft'].forEach(id=>document.querySelector('#'+id).oninput=draw);
 document.querySelector('#fclear').onclick=()=>{['fq','fr','fi','ft'].forEach(id=>document.querySelector('#'+id).value='');draw();};draw();scrollTo(0,0);
}
const previousHome=home;
home=function(){previousHome();const target=document.querySelector('.chile-intro')||document.querySelector('.section');if(target){target.insertAdjacentHTML('beforebegin',`<section class="quick-finder"><div class="wrap quick-finder-inner"><div><span class="eyebrow">Encuentra tu viaje</span><h2>¿Ya sabes lo que te gusta?</h2><p>Busca por región e intereses y deja que ORIGEN te muestre destinos que calcen contigo.</p></div><a class="quick-finder-button" href="#/explorar">Explorar por región e intereses →</a></div></section>`);}};
const oldBasic=basicGuide;
basicGuide=function(x){return{story:[x.story],highlights:(x.interests||[]).slice(0,4).map(t=>({title:t.charAt(0).toUpperCase()+t.slice(1),text:`Una experiencia que puedes incorporar a tu visita a ${x.name}.`})),facts:(x.facts||[]).map((v,i)=>({label:['Imperdible','Dato de interés','Para considerar'][i]||`Dato ${i+1}`,value:v})),planning:{bestSeason:x.bestSeason||'Consulta condiciones según temporada.',access:x.access||'Revisa la fuente oficial para planificar el acceso.',transport:'Planifica transporte, tiempos y reservas antes de salir.',difficulty:x.difficulty||'Variable según actividad.',services:'Verifica alojamiento, alimentación y servicios según el sector que visites.'},tips:['Revisa clima y condiciones de acceso antes de salir.','Reserva con anticipación cuando el destino tenga cupos o accesos regulados.','Prefiere operadores registrados para actividades guiadas o de aventura.'],idealFor:x.idealFor||x.interests||[],sources:x.source?[{label:'Información oficial del destino',url:x.source}]:[]};};
const showExplorer=()=>{if(location.hash==='#/explorar'||location.hash.startsWith('#/explorar?'))renderExplorer();};
addEventListener('hashchange',()=>setTimeout(showExplorer,0));
if(location.hash==='#/explorar')setTimeout(showExplorer,0);
})();