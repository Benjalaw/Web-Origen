(()=>{
const boot=()=>{
 const form=document.querySelector('#ori-form'),input=document.querySelector('#ori-input'),messages=document.querySelector('#ori-messages');if(!form||!input||!messages||form.dataset.shopReady)return;form.dataset.shopReady='1';
 const baseSubmit=form.onsubmit;
 const N=s=>(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9ñ]+/gi,' ').replace(/\s+/g,' ').trim();
 const E=s=>String(s||'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot',"'":'&#39;'}[m]));
 const add=(html,type='bot')=>{const d=document.createElement('div');d.className=`ori-msg ${type}`;d.innerHTML=html;messages.appendChild(d);messages.scrollTop=messages.scrollHeight;};
 const shopIntent=q=>{const n=N(q);return /\b(tienda|merch|merchandising|productos de origen|comprar productos|comprar merch|stickers|polera origen|gorro origen|postales origen|botella origen|tote bag)\b/.test(n)};
 const reply=q=>{const n=N(q);if(/\b(comprar|precio|cuanto cuesta|cuánto cuesta|stock|envio|envío|despacho|pagar)\b/.test(n))return`La <a href="#/tienda"><b>Tienda ORIGEN</b></a> todavía está en modo <b>Próximamente</b>. Aún no hay precios, stock, pagos ni despachos activos. Cuando se habiliten, aparecerán directamente en esa sección.`;const p=window.ORI_SHOP?.products||[];return`Sí 🌿. ORIGEN ya tiene una sección de <a href="#/tienda"><b>Tienda</b></a> preparada para el futuro. Los primeros conceptos son ${p.slice(0,5).map(x=>`<b>${E(x.name)}</b>`).join(', ')}${p.length>5?' y más':''}. Por ahora es solo una vitrina y no realiza cobros.`;};
 form.onsubmit=e=>{const q=input.value;if(shopIntent(q)){e.preventDefault();if(!q.trim())return;add(E(q),'user');input.value='';setTimeout(()=>add(reply(q),'bot'),70);return;}if(typeof baseSubmit==='function')return baseSubmit.call(form,e);};
};
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>setTimeout(boot,70));else setTimeout(boot,70);
})();