(()=>{
'use strict';
const KEY='origen_profile_v1';
let installPrompt=null;
window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();installPrompt=e;setTimeout(enhanceCenter,50)});
document.addEventListener('submit',e=>{
  const f=e.target;
  if(!(f instanceof HTMLFormElement)||f.id!=='profile-form')return;
  e.preventDefault();
  e.stopImmediatePropagation();
  const el=f.elements;
  const data={
    name:(el.namedItem('name')?.value||'').trim(),
    homeCity:(el.namedItem('homeCity')?.value||'').trim(),
    traveler:el.namedItem('traveler')?.value||'solo',
    budget:el.namedItem('budget')?.value||'medio',
    pets:!!el.namedItem('pets')?.checked,
    accessibility:!!el.namedItem('accessibility')?.checked,
    interests:[...f.querySelectorAll('[name="interests"]:checked')].map(x=>x.value),
    language:JSON.parse(localStorage.getItem('origen_lang_v1')||'"es"')
  };
  try{localStorage.setItem(KEY,JSON.stringify(data))}catch{}
  const msg=document.querySelector('#profile-msg');
  if(msg)msg.innerHTML='<div class="suite-note"><strong>Guardado.</strong> Tus próximas recomendaciones pueden usar estas preferencias.</div>';
},true);
function enhanceCenter(){
  if(!location.hash.startsWith('#/centro'))return;
  const grid=document.querySelector('.suite-grid');
  if(grid&&!grid.querySelector('[href="#/sorprendeme"]')){
    const a=document.createElement('a');a.className='suite-card';a.href='#/sorprendeme';a.innerHTML='<span class="suite-icon">🎲</span><h3>Sorpréndeme</h3><p>Genera un viaje según ciudad de salida, días, presupuesto e intereses.</p><span class="go">Generar →</span>';grid.prepend(a);
  }
  if(installPrompt&&!document.querySelector('#install-origen')){
    const note=document.createElement('div');note.className='suite-note';note.style.marginTop='14px';note.innerHTML='<strong>Instalar ORIGEN:</strong> puedes añadir la web como app en este dispositivo. <button id="install-origen" class="suite-btn light" style="margin-left:8px">Instalar</button>';
    grid?.after(note);note.querySelector('#install-origen').onclick=async()=>{if(!installPrompt)return;installPrompt.prompt();await installPrompt.userChoice;installPrompt=null;note.remove()};
  }
}
document.addEventListener('click',e=>{const a=e.target.closest('#nav a[href^="#/"]');if(a)document.querySelector('#nav')?.classList.remove('open')});
window.addEventListener('hashchange',()=>setTimeout(enhanceCenter,70));
setTimeout(enhanceCenter,150);
})();
