const WM=(file)=>`https://commons.wikimedia.org/wiki/Special:Redirect/file/${encodeURIComponent(file)}?width=1400`;
window.VIMG={
"Villarrica":WM("Volcan Villarrica desde el lago 2025 Chile.jpg"),
"Osorno":WM("Aerosillas en el volcán Osorno.jpg"),
"Nevados de Chillán":WM("Volcán Chillán.jpg"),
"Llaima":WM("Araucarias-Volcan-Llaima.jpg"),
"Antuco":WM("Volcan-Antuco-y-Sierra-Velluda.jpg"),
"Puyehue - Cordón Caulle":WM("Volcán Puyehue Parque Nacional Puyehue 13.jpg"),
"Calbuco":WM("Calbuco Volcano seen from Llanquihue National Reserve, Chile January 2026.jpg"),
"Chaitén":WM("Chaiten Volcano Chile.jpg"),
"Lonquimay":WM("Volcan Lonquimay despues de una caida de nieve (2024).jpg"),
"Copahue":WM("Copahue Volcano view.jpg"),
"Láscar":WM("Volcan Lascar (5600m) (5519843521).jpg"),
"Licancabur":WM("Licancabur and Laguna Verde (9466138491).jpg"),
"Ojos del Salado":WM("Majestic Ojos del Salado volcano (4320230217).jpg"),
"Llullaillaco":WM("A volcanic sunrise (potw2519a).jpg"),
"Isla de Pascua":WM("Rano Kau Volcano.jpg"),
"Sollipulli":WM("Ice-filled summit caldera, Sollipulli volcano, Chile.jpg"),
"Quetrupillán":WM("Volcán Quetrupillán.jpg"),
"Lanín":WM("LaninVolcano.jpg"),
"Antillanca":WM("Antillanca.jpg"),
"Mocho - Choshuenco":WM("J28 002 Choshuenco y Mocho.jpg"),
"Parinacota":WM("Lago Chungará y Volcán Parinacota.JPG"),
"Guallatiri":WM("Volcán Guallatiri desde A-235.jpg"),
"Isluga":WM("Volcán Isluga.jpg"),
"Taapaca":WM("Nevados de Putre Taapaca.jpg"),
"Tupungatito":WM("Volcanes Tupungatito y Tupungato.jpg"),
"San José":WM("Atardecer Volcán San José.JPG"),
"Laguna del Maule":WM("Laguna del Maule (34337827641).jpg"),
"Planchón - Peteroa":WM("Planchon Peteroa.jpg"),
"Nevado de Longaví":WM("Nevado de Longavi.jpg"),
"Pali-Aike":WM("Volcán de Pali Aike.jpg")
};
(()=>{
const CACHE_KEY='origen_commons_volcano_photos_v2';
const NEGATIVE=/\b(map|mapa|logo|escudo|bandera|flag|diagram|diagrama|location|ubicacion|portrait|retrato|document)\b/i;
const clean=s=>String(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();
const tokens=s=>clean(s).split(/\s+/).filter(x=>x.length>=4&&!['volcan','volcano','chile','complejo','complex'].includes(x));
let cache={};try{cache=JSON.parse(localStorage.getItem(CACHE_KEY)||'{}')||{}}catch{}
const persist=()=>{try{localStorage.setItem(CACHE_KEY,JSON.stringify(cache))}catch{}};
for(const [name,url] of Object.entries(cache))if(!window.VIMG[name])window.VIMG[name]=url;
window.getVolcanoImage=(name)=>window.VIMG[name]||VOLCANO_IMG;
const updateDom=(name,url)=>{
  document.querySelectorAll('img').forEach(img=>{if(img.alt===name){img.style.display='';img.parentElement?.classList.remove('media-fallback');img.src=url}});
  if(typeof V!=='undefined'){
    const v=V.find(x=>x.name===name);
    if(v&&location.hash===`#/volcan/${v.rank}`){const hero=document.querySelector('.guide-hero,.pagehero-photo');if(hero)hero.style.setProperty('--heroimg',`url("${url}")`)}
  }
};
const rank=(name,page)=>{
  const title=clean(page.title||''),info=page.imageinfo?.[0];
  if(!info||!/^image\/(jpeg|png|webp)$/i.test(info.mime||'')||NEGATIVE.test(title))return -999;
  let score=0;if(title.includes(clean(name)))score+=14;
  tokens(name).forEach(t=>{if(title.includes(t))score+=5});
  if(title.includes('chile'))score+=2;if(title.includes('volcan'))score+=2;
  if((info.width||0)>=(info.height||0))score+=3;if((info.width||0)>=1200)score+=2;
  return score;
};
async function findPhoto(v){
  const queries=[`${v.name} volcano Chile`,`${v.name} volcán ${v.region}`,`${v.name} Chile`];
  let best=null,bestScore=-999;
  for(const q of queries){
    const api='https://commons.wikimedia.org/w/api.php?origin=*&action=query&format=json&generator=search&gsrnamespace=6&gsrlimit=12&gsrsearch='+encodeURIComponent(q)+'&prop=imageinfo&iiprop=url%7Csize%7Cmime&iiurlwidth=1400';
    try{const r=await fetch(api,{mode:'cors'});if(!r.ok)continue;const data=await r.json();for(const page of Object.values(data.query?.pages||{})){const s=rank(v.name,page);if(s>bestScore){bestScore=s;best=page}}if(bestScore>=12)break}catch{}
  }
  const info=best?.imageinfo?.[0];return bestScore>=5?(info?.thumburl||info?.url||null):null;
}
document.addEventListener('error',e=>{
  const img=e.target;if(!(img instanceof HTMLImageElement)||typeof V==='undefined')return;
  const v=V.find(x=>x.name===img.alt);if(!v)return;
  e.stopImmediatePropagation();
  if(img.getAttribute('src')!==VOLCANO_IMG){img.style.display='';img.src=VOLCANO_IMG;return}
  img.style.display='none';img.parentElement?.classList.add('media-fallback');
},true);
if(typeof V!=='undefined'){
  const pending=V.filter(v=>!window.VIMG[v.name]);let cursor=0;
  async function worker(){while(cursor<pending.length){const v=pending[cursor++],url=await findPhoto(v);if(url){window.VIMG[v.name]=url;cache[v.name]=url;persist();updateDom(v.name,url)}await new Promise(r=>setTimeout(r,140))}}
  Promise.all(Array.from({length:3},worker));
}
})();