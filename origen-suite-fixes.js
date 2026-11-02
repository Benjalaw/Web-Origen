(()=>{
'use strict';
const KEY='origen_profile_v1';
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
})();
