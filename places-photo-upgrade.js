(()=>{
const clean=s=>String(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,',').replace(/^,+|,+$/g,'');
const lock=id=>{let h=0;for(const c of String(id))h=(h*31+c.charCodeAt(0))>>>0;return h%100000};
const photo=p=>`https://loremflickr.com/1200/720/${clean(p.name)},${clean(p.region)},chile,travel?lock=${lock(p.id)}`;
const extras=new Set((window.ORIGEN_EXTRA_PLACES||[]).map(x=>x.id));
(window.P||[]).forEach(p=>{
  if(!extras.has(p.id))return;
  if(!p.imageFallback&&String(p.image||'').startsWith('data:image/'))p.imageFallback=p.image;
  p.imageQuery=p.imageQuery||`${p.name}, ${p.region}, Chile`;
  p.image=photo(p);
});
document.addEventListener('error',e=>{
  const img=e.target;
  if(!(img instanceof HTMLImageElement))return;
  const p=(window.P||[]).find(x=>x.image===img.src||x.image===img.getAttribute('src'));
  if(p?.imageFallback&&img.getAttribute('src')!==p.imageFallback){img.onerror=null;img.src=p.imageFallback;}
},true);
})();