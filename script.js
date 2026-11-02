
function toggleMenu(){document.getElementById('links')?.classList.toggle('open')}
document.querySelectorAll('#links a').forEach(a=>a.addEventListener('click',()=>document.getElementById('links')?.classList.remove('open')));
function filterVolcanoes(){
 const q=(document.getElementById('q')?.value||'').toLowerCase();
 const r=document.getElementById('region')?.value||'';
 const c=document.getElementById('cat')?.value||'';
 let n=0;
 document.querySelectorAll('.vcard').forEach(el=>{
   const ok=(!q||el.dataset.name.includes(q))&&(!r||el.dataset.region===r)&&(!c||el.dataset.cat===c);
   el.style.display=ok?'flex':'none'; if(ok)n++;
 });
 const out=document.getElementById('resultCount'); if(out) out.textContent=n+' resultados';
}
