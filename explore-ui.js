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
 app.innerHTML=`<section class="pagehero finder-hero"><div class="wrap"><span class="tag">Explora Chile a tu manera</span><h1>Encuentra tu próximo destino.</h1><p>Combina región, intereses y búsqueda libre para descubrir lugares y volcanes que encajen con tu viaje.</p></div></section><section class="section finder-section"><div class="wrap"><div class="finder-box"><div class="finder-control finder-search"><label>Buscar</label><input id="fq" placeholder="Ej. kayak, Chiloé, termas, Patagonia..."></div><div class="finder-control"><label>Región</label><select id="fr"><option value="">Todo Chile</option>${regions}</select></div><div class="finder-control"><label>Interés</label><select id="fi"><option value="">Todos los intereses</option>${interests}</select></div><div class="finder-control"><label>Tipo</label><select id="ft"><option value="">Todo</option><option value="place">Destinos</option><option value="volcano">Volcanes</option></select></div></div><div class="finder-summary"><b id="fcount"></b><button id="fclear">Limpiar filtros</button></div><div class="grid finder-grid" id="fresults"></div></div></section>`;
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
home=function(){previousHome();const target=document.querySelector('.chile-intro')||document.querySelector('.section');if(target&&!document.querySelector('.quick-finder')){target.insertAdjacentHTML('beforebegin',`<section class="quick-finder"><div class="wrap quick-finder-inner"><div><span class="eyebrow">Buscador ORIGEN</span><h2>Encuentra el viaje que calza contigo.</h2><p>Elige una región, un interés o escribe directamente lo que quieres hacer.</p></div><a class="quick-finder-button" href="#/explorar">Buscar destinos →</a></div></section>`);}};
const highlightText=(tag,name)=>{const t=norm(tag);if(t.includes('trek')||t.includes('sender'))return`Recorre senderos y miradores para conocer ${name} a ritmo de caminata.`;if(t.includes('gastr'))return`Prueba sabores locales y productos que forman parte de la identidad del destino.`;if(t.includes('cultura')||t.includes('patrimonio')||t.includes('historia'))return`Conecta el paisaje con su historia, comunidades y patrimonio local.`;if(t.includes('foto'))return`Busca miradores y cambios de luz que muestran otra cara del territorio.`;if(t.includes('terma'))return`Combina el recorrido con aguas termales y experiencias de descanso.`;if(t.includes('surf')||t.includes('kayak')||t.includes('rafting')||t.includes('escalada'))return`Incorpora actividad outdoor con servicios y operadores adecuados a tu nivel.`;if(t.includes('bosque')||t.includes('naturaleza')||t.includes('fauna'))return`Dedica tiempo a observar el ecosistema y recorrerlo con bajo impacto.`;if(t.includes('roadtrip'))return`Conviértelo en una parada de ruta y deja margen para desvíos, miradores y pueblos cercanos.`;return`Una forma distinta de vivir ${name} y complementar la visita principal.`;};
basicGuide=function(x){const unique=[...new Set(x.interests||[])].slice(0,3);return{story:[x.story],highlights:unique.map(t=>({title:t.charAt(0).toUpperCase()+t.slice(1),text:highlightText(t,x.name)})),facts:(x.facts||[]).map((v,i)=>({label:['Imperdible','Dato útil','Para considerar'][i]||`Dato ${i+1}`,value:v})),planning:{bestSeason:x.bestSeason||'Revisa la temporada más conveniente según la experiencia que quieras realizar.',access:x.access||'Consulta la ruta y condiciones de acceso antes de salir.',transport:'Define transporte y tiempos según la distancia y el nivel de conectividad del destino.',difficulty:x.difficulty||'La exigencia cambia según la actividad.',services:'Comprueba alojamiento, alimentación, combustible y reservas cuando el destino sea remoto.'},tips:['Revisa clima, accesos y reservas antes de salir.','Lleva equipamiento acorde al territorio y evita improvisar en zonas remotas.'],idealFor:x.idealFor||x.interests||[],sources:x.source?[{label:'Información oficial del destino',url:x.source}]:[]};};
const showExplorer=()=>{if(location.hash==='#/explorar'||location.hash.startsWith('#/explorar?'))renderExplorer();};
addEventListener('hashchange',()=>setTimeout(showExplorer,0));
if(location.hash==='#/explorar')setTimeout(showExplorer,0);else if(!location.hash||location.hash==='#/'||location.hash==='#')home();
})();