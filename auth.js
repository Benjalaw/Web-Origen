(()=>{
const app=document.querySelector('#app');
const nav=document.querySelector('#nav');
const cfg=window.ORIGEN_SUPABASE||{};
const configured=()=>Boolean(cfg.url&&cfg.anonKey&&window.supabase?.createClient);
const client=configured()?window.supabase.createClient(cfg.url,cfg.anonKey):null;
let currentUser=null;
const esc=s=>String(s??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
const rootUrl=()=>location.origin+location.pathname;
const initials=name=>String(name||'O').trim().split(/\s+/).slice(0,2).map(x=>x[0]||'').join('').toUpperCase()||'O';
const setStatus=(msg,error=false)=>{const el=document.querySelector('#auth-status');if(!el)return;el.textContent=msg;el.className='auth-status show'+(error?' error':'');};
const clearStatus=()=>{const el=document.querySelector('#auth-status');if(el)el.className='auth-status';};
function ensureNav(){
  if(!nav)return;
  if(!document.querySelector('#auth-nav')){
    const a=document.createElement('a');a.id='auth-nav';a.className='nav-account';a.href='#/cuenta';a.textContent='Cuenta';
    const ig=nav.querySelector(':scope > .ig');if(ig)nav.insertBefore(a,ig);else nav.appendChild(a);
  }
}
function updateNav(){
  ensureNav();const a=document.querySelector('#auth-nav');if(!a)return;
  let favoritesLink=document.querySelector('#favorites-nav');
  if(currentUser&&!favoritesLink){
    favoritesLink=document.createElement('a');favoritesLink.id='favorites-nav';favoritesLink.href='#/favoritos';favoritesLink.textContent='Favoritos';
    nav.insertBefore(favoritesLink,a);
  }else if(!currentUser&&favoritesLink)favoritesLink.remove();
  a.textContent=currentUser?'Mi ORIGEN':'Cuenta';
}
function shell(inner,side){
  app.innerHTML=`<section class="pagehero"><div class="wrap"><span class="tag">Cuenta ORIGEN</span><h1>${currentUser?'Tu cuenta':'Crea tu cuenta ORIGEN'}</h1><p>${currentUser?'Gestiona tu perfil y tus preferencias de correo.':'Guarda tu acceso y recibe novedades, rutas y contenido de ORIGEN por correo.'}</p></div></section><section class="section auth-page"><div class="wrap auth-shell"><div class="auth-card">${inner}<div id="auth-status" class="auth-status"></div></div><aside class="auth-side">${side}</aside></div></section>`;
}
function renderSetup(){
  shell(`<h2>Crear usuario</h2><div class="auth-setup"><b>Falta conectar el sistema de usuarios.</b><p>La interfaz ya está instalada en ORIGEN, pero todavía debes conectar el proyecto de Supabase para activar registros reales.</p></div>`,`<h2>Qué quedará habilitado</h2><ul><li>Registro con correo y contraseña.</li><li>Confirmación de correo.</li><li>Inicio y cierre de sesión.</li><li>Recuperación de contraseña.</li><li>Preferencia para recibir correos de ORIGEN.</li></ul><p class="auth-note">Las claves privadas de correo nunca deben guardarse en GitHub Pages.</p>`);
}
function renderSignedOut(mode='signup'){
  const signup=mode==='signup';
  shell(`<h2>${signup?'Crear cuenta':'Iniciar sesión'}</h2><div class="auth-tabs"><button class="auth-tab ${signup?'active':''}" data-mode="signup">Crear cuenta</button><button class="auth-tab ${!signup?'active':''}" data-mode="login">Iniciar sesión</button></div>${signup?`<form id="auth-signup" class="auth-form"><div class="auth-field"><label for="auth-name">Nombre</label><input id="auth-name" autocomplete="name" required placeholder="Tu nombre"></div><div class="auth-field"><label for="auth-email">Correo</label><input id="auth-email" type="email" autocomplete="email" required placeholder="tu@correo.cl"></div><div class="auth-field"><label for="auth-pass">Contraseña</label><input id="auth-pass" type="password" autocomplete="new-password" minlength="8" required placeholder="Mínimo 8 caracteres"></div><label class="auth-check"><input id="auth-marketing" type="checkbox"><span>Quiero recibir novedades, rutas, panoramas y contenido de ORIGEN por correo.</span></label><button class="auth-submit" type="submit">Crear mi cuenta</button><p class="auth-note">Al registrarte deberás confirmar tu correo antes de iniciar sesión.</p></form>`:`<form id="auth-login" class="auth-form"><div class="auth-field"><label for="auth-email">Correo</label><input id="auth-email" type="email" autocomplete="email" required placeholder="tu@correo.cl"></div><div class="auth-field"><label for="auth-pass">Contraseña</label><input id="auth-pass" type="password" autocomplete="current-password" required></div><button class="auth-submit" type="submit">Entrar</button><button id="auth-reset" class="auth-secondary" type="button">Olvidé mi contraseña</button></form>`}`,`<h2>Tu ORIGEN, más personal</h2><ul><li>Recibe contenido relevante en tu correo.</li><li>Mantén tus preferencias asociadas a tu cuenta.</li><li>Base preparada para favoritos, itinerarios y beneficios de usuario.</li></ul><p class="auth-note">Puedes desactivar los correos cuando quieras desde tu perfil.</p>`);
  document.querySelectorAll('[data-mode]').forEach(b=>b.onclick=()=>renderSignedOut(b.dataset.mode));
  const signupForm=document.querySelector('#auth-signup');
  if(signupForm)signupForm.onsubmit=async e=>{
    e.preventDefault();clearStatus();
    const name=document.querySelector('#auth-name').value.trim();
    const email=document.querySelector('#auth-email').value.trim();
    const password=document.querySelector('#auth-pass').value;
    const marketing=document.querySelector('#auth-marketing').checked;
    setStatus('Creando cuenta…');
    const {data,error}=await client.auth.signUp({email,password,options:{emailRedirectTo:rootUrl()+'#/cuenta',data:{display_name:name,marketing_opt_in:marketing}}});
    if(error)return setStatus(error.message,true);
    if(data.session){currentUser=data.user;updateNav();renderProfile();return}
    setStatus('Cuenta creada. Revisa tu correo para confirmar el registro.');
  };
  const loginForm=document.querySelector('#auth-login');
  if(loginForm)loginForm.onsubmit=async e=>{
    e.preventDefault();clearStatus();
    const email=document.querySelector('#auth-email').value.trim();
    const password=document.querySelector('#auth-pass').value;
    setStatus('Iniciando sesión…');
    const {data,error}=await client.auth.signInWithPassword({email,password});
    if(error)return setStatus(error.message,true);
    currentUser=data.user;updateNav();renderProfile();
  };
  const reset=document.querySelector('#auth-reset');
  if(reset)reset.onclick=async()=>{
    const email=document.querySelector('#auth-email').value.trim();
    if(!email)return setStatus('Escribe tu correo primero.',true);
    setStatus('Enviando enlace…');
    const {error}=await client.auth.resetPasswordForEmail(email,{redirectTo:rootUrl()+'#/cuenta'});
    setStatus(error?error.message:'Te enviamos un enlace para recuperar tu contraseña.',Boolean(error));
  };
}
async function syncProfile(user){
  if(!client||!user)return;
  const meta=user.user_metadata||{};
  try{await client.from('profiles').upsert({id:user.id,email:user.email,display_name:meta.display_name||meta.name||'',marketing_opt_in:Boolean(meta.marketing_opt_in)},{onConflict:'id'});}catch{}
}
function renderProfile(){
  const meta=currentUser?.user_metadata||{};
  const name=meta.display_name||meta.name||'Viajero ORIGEN';
  const marketing=Boolean(meta.marketing_opt_in);
  const favoriteCount=window.ORIGEN_TRIP?.favorites?.().length||0;
  const tripCount=window.ORIGEN_TRIP?.trip?.().length||0;
  shell(`<div class="account-dashboard">
    <section class="account-welcome">
      <div class="auth-profile-head"><div class="auth-avatar">${esc(initials(name))}</div><div><h2>Hola, ${esc(name)}</h2><p>Tu espacio para preparar el próximo viaje.</p></div></div>
      <div class="auth-kpis"><div class="auth-kpi"><small>Cuenta</small><b>Sesión iniciada</b></div><div class="auth-kpi"><small>Correo</small><b>${currentUser?.email_confirmed_at?'Verificado':'Pendiente'}</b></div></div>
    </section>
    <section class="account-shortcuts" aria-label="Accesos de viaje">
      <a class="account-shortcut" href="#/favoritos"><span class="account-shortcut-icon">♡</span><span><b>Mis favoritos</b><small>${favoriteCount} ${favoriteCount===1?'lugar guardado':'lugares guardados'}</small></span><span class="account-shortcut-arrow">→</span></a>
      <a class="account-shortcut" href="#/mi-viaje"><span class="account-shortcut-icon">⌖</span><span><b>Armar una ruta</b><small>${tripCount} ${tripCount===1?'parada':'paradas'} en Mi Viaje</small></span><span class="account-shortcut-arrow">→</span></a>
    </section>
    <p class="account-local-note">Tus favoritos y rutas se guardan en este dispositivo.</p>
    <details class="account-settings"><summary>Editar perfil y preferencias</summary>
      <form id="profile-form" class="auth-form">
        <div class="auth-field"><label for="profile-name">Nombre</label><input id="profile-name" value="${esc(name)}" required></div>
        <label class="auth-check"><input id="profile-marketing" type="checkbox" ${marketing?'checked':''}><span>Quiero recibir novedades, rutas, panoramas y contenido de ORIGEN por correo.</span></label>
        <div class="auth-row"><button class="auth-submit" type="submit">Guardar cambios</button><button id="auth-password" class="auth-secondary" type="button">Cambiar contraseña</button><button id="auth-logout" class="auth-danger" type="button">Cerrar sesión</button></div>
      </form>
    </details>
  </div>`,`<h2>Tu viaje, en pocos pasos</h2><ol class="account-side-steps"><li>Explora un destino y guárdalo en favoritos.</li><li>Elige tus favoritos y agrégalos a Mi Viaje.</li><li>Ordena las paradas y revisa el itinerario.</li></ol><a class="auth-submit account-side-link" href="#/explorar">Explorar destinos →</a>`);
  document.querySelector('#profile-form').onsubmit=async e=>{
    e.preventDefault();clearStatus();
    const display_name=document.querySelector('#profile-name').value.trim();
    const marketing_opt_in=document.querySelector('#profile-marketing').checked;
    const {data,error}=await client.auth.updateUser({data:{display_name,marketing_opt_in}});
    if(error)return setStatus(error.message,true);
    currentUser=data.user;await syncProfile(currentUser);updateNav();setStatus('Preferencias guardadas.');
  };
  document.querySelector('#auth-password').onclick=async()=>{
    setStatus('Enviando enlace…');
    const {error}=await client.auth.resetPasswordForEmail(currentUser.email,{redirectTo:rootUrl()+'#/cuenta'});
    setStatus(error?error.message:'Te enviamos un enlace para cambiar tu contraseña.',Boolean(error));
  };
  document.querySelector('#auth-logout').onclick=async()=>{await client.auth.signOut();currentUser=null;updateNav();renderSignedOut('login');};
}
function render(){
  if(location.hash!=='#/cuenta'&&!location.hash.startsWith('#/cuenta?'))return;
  if(!configured())return renderSetup();
  currentUser?renderProfile():renderSignedOut('signup');
  scrollTo(0,0);
}
async function init(){
  ensureNav();updateNav();
  if(client){
    const {data}=await client.auth.getSession();currentUser=data.session?.user||null;updateNav();
    if(currentUser)syncProfile(currentUser);
    client.auth.onAuthStateChange((_event,session)=>{currentUser=session?.user||null;updateNav();if(location.hash.startsWith('#/cuenta'))setTimeout(render,0);});
  }
  if(location.hash.startsWith('#/cuenta'))setTimeout(render,0);
}
addEventListener('hashchange',()=>setTimeout(render,0));
init();
})();
