(()=>{
const WM=file=>`https://commons.wikimedia.org/wiki/Special:Redirect/file/${encodeURIComponent(file)}?width=1400`;
const CACHE_KEY='origen_verified_place_photos_v5';
const MANUAL={
  'lauca':WM('Parque Nacional El Lauca - XV Región de Arica y Parinacota.jpg'),
  'lago-chungara':WM('Lago Chungará y Nevados de Payachatas.jpg'),
  'salto-laja':WM('Salto del Laja Chile.jpg'),
  'lago-lanalhue':WM('Lago Lanalhue-Región del Bío Bío.jpg'),
  'contulmo':WM('Contulmo 2018.jpg'),
  'cobquecura':WM('Atardecer en colmuyao - panoramio.jpg'),
  'buchupureo':WM('Puente en Buchupureo.jpg'),
  'laguna-laja':WM('Volcan-Antuco-y-Sierra-Velluda.jpg'),
  'embalse-yeso':WM('Embalse el Yeso.jpg'),
  'volcan-osorno':WM('Aerosillas en el volcán Osorno.jpg'),
  'valle-luna':WM('Valle de la Luna San Pedro de Atacama.jpg'),
  'rapa-nui':WM('Ahu Tongariki (15 Moais).JPG'),
  'petrohue':WM('Chile - Petrohué Waterfall.jpg'),
  'general-carrera':WM('Capilla de Mármol y lago.jpg'),
  'siete-tazas':WM('7 Tazas, Chile - panoramio.jpg'),
  'peninsula-hualpen':WM('Hualpen (12603787025).jpg'),
  'termas-chillan':WM('Termas de Chillán, Chile.jpg'),
  'nonguen':WM('Vista Reserva Nonguén.jpg'),
  'alerce-andino':WM('Alerce Andino National Park.jpg'),
  'parque-chiloe':WM('Abtao desde La Ventana.jpg'),
  'laguna-san-rafael':WM('Glaciar San Rafael.jpg'),
  'caleta-tortel':WM('Pasarelas en Caleta Tortel - panoramio.jpg'),
  'puyuhuapi':WM('Bahia de Puyuhuapi.jpg'),
  'glaciar-grey':WM('View of Grey Glacier in Torres del Paine National Park, Chilean Patagonia.jpg'),
  'hornopiren':WM('Caleta Hornopirén.jpg')
};
const WIKI={
  'lauca':'Parque nacional Lauca','lago-chungara':'Lago Chungará','valle-azapa':'Valle de Azapa','putre-jurasi':'Putre','cuevas-anzota':'Cuevas de Anzota','salar-surire':'Salar de Surire',
  'volcan-isluga':'Parque nacional Volcán Isluga','pica-matilla':'Pica (Chile)','geoglifos-pintados':'Geoglifos de Pintados','humberstone':'Oficinas salitreras de Humberstone y Santa Laura','salar-huasco':'Salar del Huasco','cavancha':'Playa Cavancha','mamina':'Mamiña',
  'valle-luna':'Valle de la Luna (Chile)','tatio':'El Tatio','lagunas-altiplanicas':'Laguna Miscanti','salar-atacama':'Salar de Atacama','mano-desierto':'Mano del Desierto','portada':'La Portada (Antofagasta)','mejillones-angamos':'Mejillones',
  'bahia-inglesa':'Bahía Inglesa','caldera':'Caldera (Chile)','nevado-tres-cruces':'Parque nacional Nevado de Tres Cruces','laguna-verde-atacama':'Laguna Verde (Atacama)','ruta-seismiles':'Ruta de los Seismiles','desierto-florido':'Desierto florido','chanaral-aceituno':'Chañaral de Aceituno',
  'tongoy-guanaqueros':'Tongoy','totoralillo':'Totoralillo (Chile)','pisco-elqui':'Pisco Elqui','fray-jorge':'Parque nacional Bosque Fray Jorge','pinguino-humboldt':'Reserva nacional Pingüino de Humboldt','valle-encanto':'Valle del Encanto','embalse-puclaro':'Embalse Puclaro',
  'zapallar-papudo':'Zapallar','vina-mar':'Viña del Mar','portillo-inca':'Portillo (Chile)','casablanca-vino':'Valle de Casablanca','la-campana':'Parque nacional La Campana','rapa-nui':'Isla de Pascua','robinson-crusoe':'Isla Robinson Crusoe',
  'santiago-capital':'Santiago de Chile','farellones-valle-nevado':'Valle Nevado','yerba-loca':'Santuario de la naturaleza Yerba Loca','embalse-yeso':'Embalse El Yeso','pirque-maipo':'Pirque','pomaire':'Pomaire','cerro-san-cristobal':'Cerro San Cristóbal (Chile)',
  'sewell':'Sewell','rio-cipreses':'Reserva nacional Río de los Cipreses','matanzas':'Matanzas (Chile)','pupuya-navidad':'Navidad (Chile)','colchagua':'Valle de Colchagua','cahuil':'Cáhuil','rancagua-patrimonial':'Rancagua',
  'siete-tazas':'Parque nacional Radal Siete Tazas','altos-lircay':'Reserva nacional Altos de Lircay','lago-colbun':'Lago Colbún','vichuquen':'Lago Vichuquén','constitucion':'Constitución (Chile)','valle-maule-vino':'Valle del Maule','federico-albert':'Reserva nacional Federico Albert',
  'termas-chillan':'Termas de Chillán','reserva-nuble':'Reserva nacional Ñuble','cobquecura':'Cobquecura','buchupureo':'Buchupureo','quillon':'Quillón','chillan-cultura':'Chillán','shangrila':'Las Trancas',
  'laguna-laja':'Parque nacional Laguna del Laja','salto-laja':'Salto del Laja','nonguen':'Reserva nacional Nonguén','peninsula-hualpen':'Península de Hualpén','lota-patrimonial':'Lota','lago-lanalhue':'Lago Lanalhue','contulmo':'Contulmo','alto-biobio-pehuenche':'Alto Biobío',
  'corralco':'Corralco','tolhuaca':'Parque nacional Tolhuaca','malalcahuello':'Reserva nacional Malalcahuello','lago-budi':'Lago Budi','lican-calafquen':'Lican Ray','sollipulli':'Sollipulli','icalma-galletue':'Lago Icalma',
  'niebla-corral':'Niebla (Chile)','siete-lagos':'Panguipulli','lago-ranco':'Lago Ranco','termas-conaripe':'Coñaripe','mocho-choshuenco':'Reserva nacional Mocho-Choshuenco','isla-teja':'Isla Teja','oncol':'Parque Oncol',
  'lago-llanquihue':'Lago Llanquihue','frutillar-octay':'Frutillar','petrohue':'Saltos del Petrohué','alerce-andino':'Parque nacional Alerce Andino','hornopiren':'Hornopirén','dalcahue-achao':'Dalcahue','parque-chiloe':'Parque nacional Chiloé','volcan-osorno':'Volcán Osorno',
  'general-carrera':'Lago General Carrera','laguna-san-rafael':'Parque nacional Laguna San Rafael','parque-patagonia':'Parque nacional Patagonia (Chile)','caleta-tortel':'Caleta Tortel','glaciar-exploradores':'Glaciar Exploradores','jeinimeni':'Reserva nacional Lago Jeinimeni','puyuhuapi':'Puyuhuapi',
  'cueva-milodon':'Monumento natural Cueva del Milodón','glaciar-grey':'Glaciar Grey','pali-aike':'Parque nacional Pali Aike','isla-magdalena':'Monumento natural Los Pingüinos','fuerte-bulnes':'Fuerte Bulnes','cabo-froward':'Cabo Froward','dientes-navarino':'Dientes de Navarino','antartica-chilena':'Territorio Chileno Antártico'
};
const NEGATIVE=/\b(map|mapa|logo|escudo|bandera|flag|seal|municipalidad|terminal|placa|sign|diagram|diagrama|ubicacion|location map|coat of arms|portrait|retrato|document|documento|route map|locator map)\b/i;
const STOP=new Set(['parque','nacional','reserva','natural','chile','region','valle','lago','laguna','monumento','sector','ruta','circuito','termas','playa']);
const clean=s=>String(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();
const tokens=s=>clean(s).split(/\s+/).filter(x=>x.length>=4&&!STOP.has(x));
const badUrl=url=>{try{return NEGATIVE.test(decodeURIComponent(String(url||'')))}catch{return NEGATIVE.test(String(url||''))}};
const xml=s=>String(s).replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&apos;'}[m]));
const placeholder=p=>'data:image/svg+xml;charset=UTF-8,'+encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 720"><rect width="1200" height="720" fill="#F4F1E8"/><path d="M0 540 245 300 430 470 655 180 910 455 1200 260V720H0Z" fill="#DDE8E1"/><path d="M0 615 280 420 455 540 690 310 965 560 1200 390" fill="none" stroke="#123D32" stroke-width="18"/><circle cx="1030" cy="150" r="72" fill="#D7E6F0"/><text x="72" y="105" font-family="Arial,sans-serif" font-size="34" font-weight="700" fill="#2D7198">ORIGEN · ${xml(String(p.cat||'destino').toUpperCase())}</text><text x="72" y="575" font-family="Arial,sans-serif" font-size="52" font-weight="700" fill="#123D32">${xml(p.name)}</text><text x="72" y="630" font-family="Arial,sans-serif" font-size="28" fill="#38594E">${xml(p.region||'Chile')}</text></svg>`);
let cache={};try{cache=JSON.parse(localStorage.getItem(CACHE_KEY)||'{}')||{}}catch{}
const failed=new Set();
const audit=window.ORIGEN_IMAGE_AUDIT={};
const persist=()=>{try{localStorage.setItem(CACHE_KEY,JSON.stringify(cache))}catch{}};
const extras=new Set((window.ORIGEN_EXTRA_PLACES||[]).map(x=>x.id));
const setAudit=(p,status,source,url='')=>{audit[p.id]={name:p.name,status,source,url};};
const replaceStyleUrl=(value,old,url)=>old&&value&&value.includes(old)?value.split(old).join(url):value;
const updateDom=(p,old,url)=>{
  document.querySelectorAll('img').forEach(img=>{
    const src=img.getAttribute('src')||'';
    if(img.dataset.placeId===p.id||img.alt===p.name||src===old){img.style.display='';img.parentElement?.classList.remove('media-fallback');img.src=url;}
  });
  document.querySelectorAll('[style]').forEach(el=>{
    const bg=el.style.backgroundImage;if(bg&&old&&bg.includes(old))el.style.backgroundImage=replaceStyleUrl(bg,old,url);
    const hv=el.style.getPropertyValue('--heroimg');if(hv&&old&&hv.includes(old))el.style.setProperty('--heroimg',replaceStyleUrl(hv,old,url));
  });
  if(location.hash===`#/lugar/${p.id}`){const hero=document.querySelector('.pro-guide-hero,.guide-hero,.pagehero-photo');if(hero)hero.style.setProperty('--heroimg',`url("${url}")`);}
};
const apply=(p,url,source)=>{
  if(!url||failed.has(url)||badUrl(url))return false;
  const old=p.image;p.image=url;p.imageSource=source;updateDom(p,old,url);setAudit(p,'resolved',source,url);return true;
};
async function wikiThumb(title){
  if(!title)return null;
  const api='https://es.wikipedia.org/w/api.php?origin=*&action=query&format=json&redirects=1&prop=pageimages&piprop=thumbnail%7Coriginal&pithumbsize=1400&titles='+encodeURIComponent(title);
  try{
    const r=await fetch(api,{mode:'cors'});if(!r.ok)return null;const d=await r.json();
    const page=Object.values(d.query?.pages||{})[0];if(!page||page.missing!==undefined)return null;
    const img=page.thumbnail||page.original;const url=img?.source||null;
    if(!url||badUrl(url)||(img.width&&img.width<500)||(img.height&&img.height<300))return null;
    return {url,title:page.title||title};
  }catch{return null}
}
const titleScore=(p,title,snippet='')=>{
  const t=clean(title),full=clean(WIKI[p.id]||p.name),pt=tokens(p.name);let score=0;
  if(t===full)score+=30;else if(t.includes(full)||full.includes(t))score+=14;
  const matched=pt.filter(x=>t.includes(x));score+=matched.length*7;
  if(clean(snippet).includes('chile'))score+=2;
  if(pt.length>1&&matched.length<Math.min(2,pt.length))score-=10;
  return score;
};
async function wikipediaSearch(p){
  const direct=[];if(WIKI[p.id])direct.push(WIKI[p.id]);direct.push(p.name);
  for(const title of [...new Set(direct)]){const hit=await wikiThumb(title);if(hit)return hit;}
  const query=`${p.name} ${p.region||''} Chile`;
  const api='https://es.wikipedia.org/w/api.php?origin=*&action=query&format=json&list=search&srnamespace=0&srlimit=6&srsearch='+encodeURIComponent(query);
  try{
    const r=await fetch(api,{mode:'cors'});if(!r.ok)return null;const d=await r.json();
    const ranked=(d.query?.search||[]).map(x=>({...x,_score:titleScore(p,x.title,x.snippet)})).sort((a,b)=>b._score-a._score);
    if(!ranked.length||ranked[0]._score<7)return null;
    for(const row of ranked.slice(0,3)){if(row._score<7)continue;const hit=await wikiThumb(row.title);if(hit)return hit;}
  }catch{}
  return null;
}
const commonsScore=(p,page)=>{
  const title=clean(page.title||''),info=page.imageinfo?.[0];if(!info||!/^image\/(jpeg|png|webp)$/i.test(info.mime||'')||NEGATIVE.test(title))return -999;
  const pt=tokens(p.name),alias=tokens(WIKI[p.id]||''),all=[...new Set([...pt,...alias])];
  const matched=all.filter(x=>title.includes(x));let score=0;
  if(title.includes(clean(p.name)))score+=24;if(WIKI[p.id]&&title.includes(clean(WIKI[p.id])))score+=22;
  score+=matched.length*6;if(title.includes('chile'))score+=2;
  tokens(p.region).forEach(t=>{if(title.includes(t))score+=2});
  if((info.width||0)>=(info.height||0))score+=3;if((info.width||0)>=1200)score+=2;if((info.height||0)>=650)score+=1;
  const needed=all.length>=2?2:1;if(matched.length<needed&&!title.includes(clean(p.name)))score-=18;
  return score;
};
async function commonsSearch(p){
  const names=[WIKI[p.id],p.name].filter(Boolean);const queries=[];
  names.forEach(n=>{queries.push(`${n} Chile`,`${n} ${p.region||''}`)});
  let best=null,bestScore=-999;
  for(const q of [...new Set(queries)]){
    const api='https://commons.wikimedia.org/w/api.php?origin=*&action=query&format=json&generator=search&gsrnamespace=6&gsrlimit=18&gsrsearch='+encodeURIComponent(q)+'&prop=imageinfo&iiprop=url%7Csize%7Cmime&iiurlwidth=1400';
    try{
      const r=await fetch(api,{mode:'cors'});if(!r.ok)continue;const d=await r.json();
      for(const page of Object.values(d.query?.pages||{})){const s=commonsScore(p,page);if(s>bestScore){bestScore=s;best=page}}
      if(bestScore>=20)break;
    }catch{}
  }
  const info=best?.imageinfo?.[0],url=info?.thumburl||info?.url||null;return bestScore>=12&&url&&!badUrl(url)?{url,title:best.title||''}:null;
}
const resolving=new Map();
async function resolvePlace(p,{skipManual=false,force=false}={}){
  if(!p)return null;if(resolving.has(p.id))return resolving.get(p.id);
  const task=(async()=>{
    p.imagePlaceholder=p.imagePlaceholder||placeholder(p);p.imageFallback=p.imageFallback||p.imagePlaceholder;
    if(!force&&cache[p.id]?.url&&!failed.has(cache[p.id].url)){apply(p,cache[p.id].url,cache[p.id].source||'cache');return cache[p.id].url;}
    if(!skipManual&&MANUAL[p.id]&&!failed.has(MANUAL[p.id])){if(apply(p,MANUAL[p.id],'manual')){cache[p.id]={url:MANUAL[p.id],source:'manual'};persist();return MANUAL[p.id];}}
    setAudit(p,'searching','wikipedia');
    const wiki=await wikipediaSearch(p);if(wiki?.url&&!failed.has(wiki.url)){apply(p,wiki.url,'wikipedia');cache[p.id]={url:wiki.url,source:'wikipedia',title:wiki.title};persist();return wiki.url;}
    setAudit(p,'searching','commons');
    const common=await commonsSearch(p);if(common?.url&&!failed.has(common.url)){apply(p,common.url,'commons');cache[p.id]={url:common.url,source:'commons',title:common.title};persist();return common.url;}
    setAudit(p,'placeholder','none',p.imagePlaceholder);if(p.image!==p.imagePlaceholder)apply(p,p.imagePlaceholder,'placeholder');return null;
  })().finally(()=>resolving.delete(p.id));
  resolving.set(p.id,task);return task;
}
window.ORIGEN_IMAGE_ERROR=(img,id)=>{
  const p=(window.P||[]).find(x=>x.id===id)||((window.P||[]).find(x=>x.name===img.alt));if(!p)return false;
  const src=img.currentSrc||img.getAttribute('src')||'';if(src)failed.add(src);
  if(cache[p.id]?.url===src){delete cache[p.id];persist();}
  p.imagePlaceholder=p.imagePlaceholder||placeholder(p);p.imageFallback=p.imagePlaceholder;
  img.style.display='';img.parentElement?.classList.remove('media-fallback');img.src=p.imagePlaceholder;
  setAudit(p,'retrying','error',src);resolvePlace(p,{skipManual:MANUAL[p.id]===src,force:true});return true;
};
document.addEventListener('error',e=>{
  const img=e.target;if(!(img instanceof HTMLImageElement))return;
  const p=(window.P||[]).find(x=>x.name===img.alt||x.image===img.getAttribute('src'));if(!p)return;
  e.stopImmediatePropagation();window.ORIGEN_IMAGE_ERROR(img,p.id);
},true);
const targets=(window.P||[]).filter(p=>extras.has(p.id));
for(const p of targets){p.imagePlaceholder=p.imagePlaceholder||placeholder(p);p.imageFallback=p.imagePlaceholder;
  if(cache[p.id]?.url&&!failed.has(cache[p.id].url))apply(p,cache[p.id].url,cache[p.id].source||'cache');
  else if(MANUAL[p.id])apply(p,MANUAL[p.id],'manual');
  else if(!String(p.image||'').startsWith('data:image'))p.image=p.imagePlaceholder;
}
persist();
let cursor=0;const unresolved=targets.filter(p=>!cache[p.id]?.url&&!MANUAL[p.id]);
async function worker(){while(cursor<unresolved.length){const p=unresolved[cursor++];await resolvePlace(p);await new Promise(r=>setTimeout(r,90));}}
Promise.all(Array.from({length:3},worker)).then(()=>window.dispatchEvent(new CustomEvent('origen:imageauditcomplete',{detail:window.ORIGEN_IMAGE_AUDIT})));
(window.P||[]).filter(p=>!extras.has(p.id)&&p.image&&!String(p.image).startsWith('data:image')).forEach(p=>{
  p.imagePlaceholder=p.imagePlaceholder||placeholder(p);p.imageFallback=p.imagePlaceholder;
  const probe=new Image();probe.onload=()=>setAudit(p,'resolved','curated',p.image);probe.onerror=()=>{failed.add(p.image);resolvePlace(p,{skipManual:true,force:true});};probe.src=p.image;
});
window.ORIGEN_IMAGE_AUDIT_SUMMARY=()=>{
  const rows=Object.values(audit),count=s=>rows.filter(x=>x.status===s).length;
  return {total:(window.P||[]).length,checked:rows.length,resolved:count('resolved'),searching:count('searching'),retrying:count('retrying'),placeholder:count('placeholder'),unresolved:rows.filter(x=>x.status==='placeholder').map(x=>x.name)};
};
})();