(()=>{
const WM=file=>`https://commons.wikimedia.org/wiki/Special:Redirect/file/${encodeURIComponent(file)}?width=1400`;
const CACHE_KEY='origen_commons_place_photos_v3';
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
  'valle-luna':WM('Valle de la Luna San Pedro de Atacama.jpg')
};
const NEGATIVE=/\b(map|mapa|logo|escudo|bandera|flag|seal|municipalidad|terminal|placa|sign|diagram|diagrama|ubicacion|location map|coat of arms|portrait|retrato|document|documento)\b/i;
const clean=s=>String(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();
const words=s=>clean(s).split(/\s+/).filter(x=>x.length>=4&&!['parque','nacional','reserva','natural','chile','region','valle','lago','laguna'].includes(x));
let cache={};
try{cache=JSON.parse(localStorage.getItem(CACHE_KEY)||'{}')||{}}catch{}
const persist=()=>{try{localStorage.setItem(CACHE_KEY,JSON.stringify(cache))}catch{}};
const extras=new Set((window.ORIGEN_EXTRA_PLACES||[]).map(x=>x.id));
const updateDom=(p,old,url)=>{
  document.querySelectorAll('img').forEach(img=>{
    const src=img.getAttribute('src')||'';
    if(img.dataset.placeId===p.id||img.alt===p.name||src===old){
      img.style.display='';
      img.parentElement?.classList.remove('media-fallback');
      img.src=url;
    }
  });
  if(location.hash===`#/lugar/${p.id}`){
    const hero=document.querySelector('.pro-guide-hero,.guide-hero');
    if(hero)hero.style.setProperty('--heroimg',`url("${url}")`);
  }
};
const apply=(p,url)=>{
  if(!url)return;
  const old=p.image;
  p.image=url;
  updateDom(p,old,url);
};
const rank=(p,page)=>{
  const title=clean(page.title||'');
  const info=page.imageinfo?.[0];
  if(!info||!/^image\/(jpeg|png|webp)$/i.test(info.mime||'')||NEGATIVE.test(title))return -999;
  let score=0;
  const pt=words(p.name),rt=words(p.region);
  if(title.includes(clean(p.name)))score+=14;
  pt.forEach(t=>{if(title.includes(t))score+=5});
  rt.forEach(t=>{if(title.includes(t))score+=1});
  if(title.includes('chile'))score+=2;
  if((info.width||0)>=(info.height||0))score+=3;
  if((info.width||0)>=1200)score+=2;
  if((info.height||0)>=700)score+=1;
  return score;
};
async function commonsSearch(p){
  const queries=[`${p.name} Chile`,`${p.name} ${p.region}`,p.name];
  let best=null,bestScore=-999;
  for(const q of queries){
    const api='https://commons.wikimedia.org/w/api.php?origin=*&action=query&format=json&generator=search&gsrnamespace=6&gsrlimit=12&gsrsearch='+encodeURIComponent(q)+'&prop=imageinfo&iiprop=url%7Csize%7Cmime&iiurlwidth=1400';
    try{
      const r=await fetch(api,{mode:'cors'});if(!r.ok)continue;
      const data=await r.json();
      for(const page of Object.values(data.query?.pages||{})){
        const s=rank(p,page);if(s>bestScore){bestScore=s;best=page}
      }
      if(bestScore>=12)break;
    }catch{}
  }
  const info=best?.imageinfo?.[0];
  return bestScore>=5?(info?.thumburl||info?.url||null):null;
}
window.ORIGEN_IMAGE_ERROR=(img,id)=>{
  const p=(window.P||[]).find(x=>x.id===id)||((window.P||[]).find(x=>x.name===img.alt));
  const tried=(img.dataset.fallbackTried||'').split('|').filter(Boolean);
  const candidates=[p?.imageFallback,p?.imagePlaceholder].filter(Boolean);
  const next=candidates.find(x=>!tried.includes(x)&&x!==img.getAttribute('src'));
  if(next){
    tried.push(next);img.dataset.fallbackTried=tried.join('|');img.style.display='';img.parentElement?.classList.remove('media-fallback');img.src=next;return true;
  }
  img.style.display='none';img.parentElement?.classList.add('media-fallback');return false;
};
document.addEventListener('error',e=>{
  const img=e.target;
  if(!(img instanceof HTMLImageElement))return;
  const p=(window.P||[]).find(x=>x.name===img.alt||x.image===img.getAttribute('src'));
  if(!p)return;
  e.stopImmediatePropagation();
  window.ORIGEN_IMAGE_ERROR(img,p.id);
},true);
const targets=(window.P||[]).filter(p=>extras.has(p.id));
for(const p of targets){
  if(MANUAL[p.id]){cache[p.id]=MANUAL[p.id];apply(p,MANUAL[p.id]);continue}
  if(cache[p.id])apply(p,cache[p.id]);
}
persist();
const unresolved=targets.filter(p=>!MANUAL[p.id]&&!cache[p.id]);
let cursor=0;
async function worker(){
  while(cursor<unresolved.length){
    const p=unresolved[cursor++];
    const url=await commonsSearch(p);
    if(url){cache[p.id]=url;apply(p,url);persist()}
    await new Promise(r=>setTimeout(r,120));
  }
}
Promise.all(Array.from({length:4},worker));
})();