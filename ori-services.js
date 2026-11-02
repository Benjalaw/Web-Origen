(()=>{
const boot=()=>{
 const H=window.ORI_SERVICE_HELPER,form=document.querySelector('#ori-form'),input=document.querySelector('#ori-input'),messages=document.querySelector('#ori-messages');if(!H||!form||!input||!messages)return;
 const baseSubmit=form.onsubmit,last={city:''};
 const norm=s=>(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().trim();
 const esc=s=>String(s||'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
 const add=(html,type='bot')=>{const d=document.createElement('div');d.className=`ori-msg ${type}`;d.innerHTML=html;messages.appendChild(d);messages.scrollTop=messages.scrollHeight;};
 const trustLabel=t=>({'sernatur':'SERNATUR vigente','sernatur-listed':'Listado en SERNATUR','local-official':'Fuente turística local','recommended':'Recomendado por reputación'}[t]||'Recomendado');
 const typeName=t=>({hotel:'dónde dormir',restaurant:'dónde comer',bar:'bares y vida nocturna',cafe:'cafés',experience:'experiencias'}[t]||'servicios turísticos');
 const mini=(x)=>`<div class="ori-trip-sub"><b>${esc(x.name)}</b><span>${esc(x.why)} · ${trustLabel(x.trust)}</span>${x.source?`<a href="${x.source}" target="_blank" rel="noopener">Ver fuente ↗</a>`:`<a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(x.name+' '+last.city+' Chile')}" target="_blank" rel="noopener">Ver en Maps ↗</a>`}</div>`;
 const serviceIntent=q=>{const n=norm(q);return H.typeFromText(q)||/\b(servicio|servicios|prestador|prestadores|donde salir|dónde salir|vida nocturna|recomendame un lugar|recomiéndame un lugar)\b/.test(n);};
 const respond=q=>{let city=H.findCity(q),type=H.typeFromText(q);if(city)last.city=city;else if(last.city&&/\b(y|tambien|también|ahora|otro|otra|bares|hoteles|restaurantes|cafes|cafés)\b/.test(norm(q)))city=last.city;
   if(!city){return `Puedo buscar <b>${typeName(type)}</b>, pero dime la ciudad. Tengo selección curada para: ${H.cities().slice(0,11).map(esc).join(', ')}.`;}
   const list=H.find(city,type).slice(0,5),label=typeName(type);if(!list.length)return `Todavía no tengo una selección curada de <b>${label}</b> para <b>${esc(city)}</b>. <a class="ori-suggest" href="${H.sernaturCity(city)}" target="_blank" rel="noopener">Buscar en SERNATUR ↗</a>`;
   return `<div class="ori-trip"><span class="ori-trip-kicker">Servicios en ${esc(city)}</span><h4>${esc(label.charAt(0).toUpperCase()+label.slice(1))}</h4>${list.map(mini).join('')}<a class="ori-suggest" href="#/servicios?city=${encodeURIComponent(city)}${type?`&type=${encodeURIComponent(type)}`:''}">Ver directorio completo →</a><div class="ori-trip-note">SERNATUR es prioritario cuando existe verificación. Las recomendaciones por reputación no equivalen a registro oficial.</div></div>`;};
 form.onsubmit=e=>{const q=input.value;if(serviceIntent(q)){e.preventDefault();if(!q.trim())return;add(esc(q),'user');input.value='';setTimeout(()=>add(respond(q),'bot'),70);return;}if(typeof baseSubmit==='function')return baseSubmit.call(form,e);};
 const quick=document.querySelector('.ori-quick');if(quick&&!quick.querySelector('[data-services]')){const b=document.createElement('button');b.type='button';b.dataset.services='1';b.textContent='Comer y dormir';b.onclick=()=>{input.value='Hoteles y restaurantes en Pucón';form.requestSubmit();};quick.prepend(b);}
};
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else setTimeout(boot,0);
})();