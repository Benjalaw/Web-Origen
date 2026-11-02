(()=>{
const norm=s=>(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().trim();
const escapeHtml=s=>String(s||'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
const originalCategory=typeof category==='function'?category:null;
if(!originalCategory)return;
category=function(c){
 const meta=cats[c];if(!meta)return home();
 const items=P.filter(x=>x.cat===c),hero=items[0]?.image||P[0]?.image;
 const regions=[...new Set(items.map(x=>x.region).filter(Boolean))].sort((a,b)=>a.localeCompare(b,'es'));
 app.innerHTML=`<section class="pagehero pagehero-photo" style="--heroimg:url('${hero}')"><div class="wrap"><span class="tag">${meta[1]} ORIGEN</span><h1>${escapeHtml(meta[0])}.</h1><p>${escapeHtml(meta[2])}</p></div></section><section class="section compact-category"><div class="wrap"><div class="compact-toolbar"><div class="compact-search"><label>Buscar</label><input id="cq" placeholder="Escribe un destino, actividad o palabra clave..."></div><div><label>Región</label><select id="cr"><option value="">Todas</option>${regions.map(r=>`<option>${escapeHtml(r)}</option>`).join('')}</select></div><button id="cclear">Limpiar</button></div><div class="compact-summary"><b id="ccount"></b><a href="#/explorar">Usar buscador completo →</a></div><div class="grid compact-grid" id="cresults"></div></div></section>`;
 const q=document.querySelector('#cq'),r=document.querySelector('#cr'),out=document.querySelector('#cresults'),count=document.querySelector('#ccount');
 const draw=()=>{const nq=norm(q.value),region=r.value;const list=items.filter(x=>{const hay=norm([x.name,x.region,x.lead,x.story,(x.interests||[]).join(' '),(x.facts||[]).join(' ')].join(' '));return(!nq||hay.includes(nq))&&(!region||x.region===region);});count.textContent=`${list.length} ${list.length===1?'destino':'destinos'}`;out.innerHTML=list.map(x=>`<a class="card place-card" href="#/lugar/${x.id}">${media(x.image,x.name)}<div class="card-body"><span class="tag">${escapeHtml(x.region)}</span><h3>${escapeHtml(x.name)}</h3><p>${escapeHtml(x.lead)}</p><span class="go">Abrir guía →</span></div></a>`).join('')||'<div class="finder-empty"><h3>No hay coincidencias</h3><p>Prueba una búsqueda más amplia o revisa Explorar.</p></div>';};
 q.oninput=draw;r.oninput=draw;document.querySelector('#cclear').onclick=()=>{q.value='';r.value='';draw();};draw();scrollTo(0,0);
};
})();