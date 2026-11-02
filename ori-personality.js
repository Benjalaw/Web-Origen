(()=>{
const boot=()=>{
 const form=document.querySelector('#ori-form'),input=document.querySelector('#ori-input'),messages=document.querySelector('#ori-messages'),quick=document.querySelector('.ori-quick'),launcher=document.querySelector('#ori-launcher');
 if(!form||!input||!messages||form.dataset.personalityV4)return;
 form.dataset.personalityV4='1';
 const subtitle=document.querySelector('.ori-chat-title span');if(subtitle)subtitle.textContent='Guía de viaje y compañero de ORIGEN';
 const baseSubmit=form.onsubmit;
 const N=s=>(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9ñ@.]+/gi,' ').replace(/\s+/g,' ').trim();
 const E=s=>String(s||'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
 const toks=s=>new Set(N(s).split(' ').filter(Boolean));
 const add=(html,type='bot')=>{const d=document.createElement('div');d.className=`ori-msg ${type}`;d.innerHTML=html;messages.appendChild(d);messages.scrollTop=messages.scrollHeight;};
 const has=(n,...words)=>words.every(w=>N(n).includes(N(w)));
 const any=(n,words)=>words.some(w=>N(n).includes(N(w)));
 const score=(n,words)=>{const t=toks(n);return words.reduce((s,w)=>{const nw=N(w);if(n.includes(nw))s+=nw.includes(' ')?4:2;if(t.has(nw))s+=2;return s;},0)};
 const link=(href,label)=>`<a href="${href}" target="_blank" rel="noopener"><b>${label}</b></a>`;
 const today=()=>new Intl.DateTimeFormat('es-CL',{weekday:'long',year:'numeric',month:'long',day:'numeric'}).format(new Date());
 const now=()=>new Intl.DateTimeFormat('es-CL',{hour:'2-digit',minute:'2-digit'}).format(new Date());

 const FAQ=[
  {id:'instagram',words:['instagram','insta','ig','red social','redes sociales','pagina de instagram','cuenta de instagram','usuario de instagram','perfil de instagram','tuorigen'],min:2,reply:()=>`El Instagram de ORIGEN es ${link('https://instagram.com/tuorigen.cl','@tuorigen.cl')} 📸. Ahí publicamos destinos, historias, rutas y contenido turístico de Chile.`},
  {id:'other-socials',words:['facebook','tiktok','linkedin','youtube','twitter','x de origen','otras redes'],min:2,reply:()=>`La red social pública enlazada actualmente desde ORIGEN es <b>Instagram: @tuorigen.cl</b>. Si se incorporan otras redes, aparecerán directamente en la página.`},
  {id:'web',words:['pagina web','sitio web','web de origen','link de origen','url','direccion web','pagina de origen'],min:2,reply:()=>`La web de ORIGEN es ${link('https://benjalaw.github.io/Web-Origen/','ORIGEN')}. Desde ahí puedes usar Explorar, Servicios, Volcanes y hablar conmigo.`},
  {id:'what-origin',words:['que es origen','que es esta pagina','de que trata','para que sirve origen','proyecto origen','origen turismo'],min:3,reply:()=>`<b>ORIGEN</b> es una guía turística digital de Chile. Reúne destinos, volcanes, rutas, servicios turísticos y herramientas de planificación. La idea es mostrar no solo dónde ir, sino <b>qué hace especial a cada lugar y cómo vivirlo mejor</b>.`},
  {id:'what-can-do',words:['que puedes hacer','que sabes hacer','como me puedes ayudar','en que ayudas','para que sirves','funciones de ori'],min:2,reply:()=>`Puedo ayudarte a <b>descubrir destinos, comparar zonas, planificar rutas, armar itinerarios, buscar hoteles/restaurantes/bares, explicar ORIGEN</b> y responder preguntas sobre mí. También puedo conversar de forma básica aunque no estés planificando un viaje.`},
  {id:'how-page',words:['como funciona','como usar','como uso','navegar','que puedo hacer en la pagina','donde busco','como buscar'],min:2,reply:()=>`Puedes usar <a href="#/explorar"><b>Explorar</b></a> para buscar destinos por región e intereses, <a href="#/servicios"><b>Servicios</b></a> para hoteles, restaurantes, bares y experiencias, y <a href="#/volcanes"><b>Volcanes</b></a> para turismo volcánico. También puedes escribirme directamente lo que necesitas.`},
  {id:'services',words:['servicios','hoteles','hotel','restaurantes','restaurante','bares','bar','cafes','cafeterias','donde dormir','donde comer','donde salir'],min:2,reply:(n)=>{if(any(n,['donde','seccion','pagina','buscar','encuentro']))return`En <a href="#/servicios"><b>Servicios</b></a> puedes escribir una ciudad y filtrar alojamiento, restaurantes, bares, cafés y experiencias. Cuando hay respaldo SERNATUR lo indicamos claramente.`;return'';}},
  {id:'sernatur',words:['sernatur','registro turistico','prestador','prestadores','registro de turismo'],min:2,reply:()=>`ORIGEN usa el registro de prestadores de <b>SERNATUR</b> como una de sus fuentes para servicios turísticos. Cuando un negocio está verificado o listado lo marcamos; una recomendación por reputación no se presenta como registro oficial.`},
  {id:'booking',words:['puedes reservar','puedo reservar','hacer reserva','reservar hotel','reservar restaurante','comprar entrada','comprar ticket'],min:2,reply:()=>`Por ahora ORI <b>no realiza reservas ni compras directamente</b>. Sí puedo ayudarte a elegir una opción y llevarte a su fuente, ficha o mapa para continuar la reserva por el canal correspondiente.`},
  {id:'live-data',words:['tiempo real','clima en vivo','precios en vivo','precio actual','disponibilidad actual','horarios actuales','trafico en vivo','cierres actuales'],min:2,reply:()=>`No consulto en vivo tráfico, clima, precios, horarios, cupos ni cierres desde esta versión de la web. Cuando un dato puede cambiar, te lo marco como orientativo y conviene confirmarlo en la fuente oficial.`},
  {id:'contact',words:['contacto','correo','email','mail','como contacto','como contactar','hablar con origen'],min:2,reply:()=>`El canal público visible actualmente para contactar o seguir ORIGEN es Instagram: ${link('https://instagram.com/tuorigen.cl','@tuorigen.cl')}.`},
  {id:'slogan',words:['slogan','lema','frase de origen','frase de la pagina'],min:2,reply:()=>`El lema de ORIGEN es <b>“Descubre tu destino desde su ORIGEN”</b>.`},
  {id:'meaning-origin',words:['que significa origen','por que se llama origen','significado de origen','nombre origen'],min:3,reply:()=>`El nombre <b>ORIGEN</b> representa conocer un destino desde su esencia: paisaje, historia, cultura, personas y territorio. De ahí nace el lema “Descubre tu destino desde su ORIGEN”.`},
  {id:'colors',words:['colores','paleta','color de origen','colores de origen','verde azul blanco'],min:2,reply:()=>`La identidad visual de ORIGEN usa principalmente <b>blanco</b>, <b>verde oscuro</b> y <b>azul</b>. El verde representa naturaleza y territorio; el azul conecta con agua, cielo y Pacífico.`},
  {id:'sources',words:['fuentes','de donde sacan','informacion oficial','datos oficiales','confiable','confiabilidad'],min:2,reply:()=>`ORIGEN intenta priorizar fuentes oficiales y turísticas como <b>SERNATUR, Chile Travel, CONAF, SERNAGEOMIN</b> y organismos locales. Los datos variables —horarios, cierres, clima, precios o disponibilidad— siempre conviene verificarlos antes de viajar.`},
  {id:'creator-origin',words:['quien creo origen','quien hizo origen','quien hizo la pagina','quien esta detras','creador de origen'],min:3,reply:()=>`ORIGEN es un <b>proyecto turístico chileno independiente</b>. Yo soy su mascota y asistente digital, creado para acompañar la experiencia dentro de la página. 🌿`},
  {id:'who-ori',words:['quien eres','que eres','presentate','como te llamas','tu nombre','quien es ori'],min:2,reply:()=>`Soy <b>ORI</b> 🌿, el pequeño guardián y guía viajero de <b>ORIGEN</b>. Puedo ayudarte con destinos, rutas, servicios y también conversar contigo sobre la página o sobre mí.`},
  {id:'born',words:['donde naciste','donde nacio ori','de donde eres','lugar de nacimiento','donde naciste ori'],min:2,reply:()=>`Mi historia dice que nací <b>entre roca, bosque y cordillera chilena</b> 🏔️🌿. No tengo una ciudad natal real: soy un personaje de ORIGEN pensado para representar el territorio chileno.`},
  {id:'meaning-ori',words:['que significa ori','por que te llamas ori','nombre ori'],min:2,reply:()=>`<b>ORI</b> viene de <b>ORIGEN</b>. Es corto, fácil de recordar y representa mi papel como compañero de viaje de la marca.`},
  {id:'creator-ori',words:['quien te creo','quien creo ori','quien hizo ori','como fuiste creado'],min:2,reply:()=>`Fui creado como la mascota y guía de ORIGEN. Mi diseño mezcla roca y cordillera, contornos verdes, mochila de explorador y un pañuelo azul.`},
  {id:'story',words:['tu historia','historia de ori','cuentame tu historia','origen de ori'],min:2,reply:()=>`Cuenta la historia que aparecí recorriendo un sendero entre cordillera y bosque, con una mochila demasiado grande y muchas ganas de saber qué había detrás de cada cerro. Desde entonces soy el guardián viajero de ORIGEN. 🌿🏔️`},
  {id:'mission',words:['tu mision','para que existes','para que fuiste creado','tu objetivo'],min:2,reply:()=>`Mi misión es hacer que descubrir Chile sea más fácil y entretenido: encontrar destinos, explicar su historia, organizar rutas y ayudarte a ubicar servicios confiables durante el viaje.`},
  {id:'backpack',words:['mochila','que llevas','que hay en tu mochila'],min:2,reply:()=>`En mi mochila llevo lo básico para explorar 🎒: agua, abrigo, algo para comer, botiquín, mapa, batería extra y espacio para guardar historias del camino. Y probablemente alguna cosa de más 😅.`},
  {id:'scarf',words:['pañuelo','panuelo','pañuelo azul','panuelo azul'],min:2,reply:()=>`Mi <b>pañuelo azul</b> representa el agua y el Pacífico; el verde de la mochila conecta con bosques y naturaleza, y mi cuerpo claro recuerda roca y cordillera.`},
  {id:'age',words:['edad','cuantos años','cuantos anos','que edad tienes'],min:2,reply:()=>`No tengo edad humana 😄. Nací como personaje de ORIGEN, así que prefiero contar rutas recorridas antes que cumpleaños.`},
  {id:'human',words:['eres humano','eres persona','eres real','eres ia','inteligencia artificial','robot'],min:2,reply:()=>`Soy el <b>asistente digital de ORIGEN</b> representado por ORI. No soy una persona real, pero intento conversar de forma cercana y útil.`},
  {id:'likes',words:['que te gusta','lugar favorito','destino favorito','favorito','hobbies','pasatiempos'],min:2,reply:()=>`Me gustan especialmente los lugares donde se mezclan <b>montaña, bosque y agua</b>. La Araucanía, Los Lagos, Aysén y Patagonia van muy bien conmigo, aunque Atacama también me encanta por el contraste.`},
  {id:'food',words:['comida favorita','que comes','que te gusta comer','comerias'],min:2,reply:()=>`Si pudiera sentarme a la mesa, elegiría empanadas, mariscos del sur, pastel de choclo y algo caliente después de un día de montaña 😄.`},
  {id:'chile',words:['te gusta chile','que opinas de chile','como es chile','por que chile'],min:2,reply:()=>`Chile me encanta 🌿. En un solo país tienes desierto, costa, valles, volcanes, bosques, islas y Patagonia. Esa diversidad es justamente lo que ORIGEN quiere mostrar.`},
  {id:'today',words:['que dia es hoy','fecha de hoy','hoy que dia','dia de hoy'],min:2,reply:()=>`Hoy es <b>${today()}</b>.`},
  {id:'time',words:['que hora es','hora actual','hora ahora'],min:2,reply:()=>`Según tu navegador, son aproximadamente las <b>${now()}</b>.`},
  {id:'thanks',words:['gracias','muchas gracias','te pasaste','bacan','genial'],min:2,reply:()=>`¡De nada! 🌿 Cuando quieras seguimos viajando, buscando algo o simplemente conversando.`},
  {id:'bye',words:['chao','adios','hasta luego','nos vemos','hasta pronto'],min:2,reply:()=>`¡Nos vemos! 👋🌿 Que tengas buen camino. Cuando vuelvas, acá estaré con la mochila lista.`},
  {id:'mood',words:['como estas','como te sientes','todo bien','como va'],min:2,reply:()=>`¡Todo bien! 😄🌿 Con la mochila lista, como siempre. ¿Quieres planear algo o viniste a conversar un rato?`},
  {id:'hello',words:['hola','holi','buenas','hey','ola','hola ori'],min:2,reply:()=>`¡Hola! 👋🌿 Soy <b>ORI</b>. Puedes preguntarme por viajes, ORIGEN, servicios, mi historia o simplemente conversar conmigo.`}
 ];

 const generalChile=n=>{
  if(has(n,'capital','chile'))return'La capital de Chile es <b>Santiago</b>.';
  if(any(n,['moneda de chile','que moneda usan en chile','moneda chilena']))return'La moneda oficial de Chile es el <b>peso chileno (CLP)</b>.';
  if(any(n,['idioma de chile','que idioma hablan en chile']))return'El idioma predominante en Chile es el <b>español</b>, además de diversas lenguas originarias presentes en distintos territorios.';
  if(any(n,['cuantas regiones','regiones tiene chile']))return'Chile está dividido administrativamente en <b>16 regiones</b>.';
  return'';
 };

 function personality(q){
  const n=N(q);if(!n)return'';
  let best=null,bestScore=0;
  for(const f of FAQ){const s=score(n,f.words);if(s>=f.min&&s>bestScore){best=f;bestScore=s;}}
  if(best){const r=best.reply(n);if(r)return r;}
  const chile=generalChile(n);if(chile)return chile;
  const question=/^(que|quien|quienes|cual|cuales|como|cuando|donde|por que|porque|puedes|sabes|tienes|eres|te|hay)\b/.test(n)||n.includes('?');
  const clearlyTravel=any(n,['viaje','viajar','ruta','destino','trekking','hotel','restaurante','bar','volcan','playa','termas','region','dias','desde','hasta','pucon','santiago','concepcion','chile']);
  if(question&&!clearlyTravel)return`No tengo una respuesta específica guardada para eso todavía 😅. Puedo conversar sobre <b>ORIGEN, mi historia, Chile, viajes y servicios turísticos</b>. Si es algo sobre la página, pregúntamelo de otra forma y trataré de entenderlo.`;
  return'';
 }

 form.onsubmit=e=>{const q=input.value,reply=personality(q);if(reply){e.preventDefault();if(!q.trim())return;add(E(q),'user');input.value='';setTimeout(()=>add(reply,'bot'),60);return;}if(typeof baseSubmit==='function')return baseSubmit.call(form,e);};
 if(quick&&!quick.querySelector('[data-about-ori]')){const b=document.createElement('button');b.type='button';b.dataset.aboutOri='1';b.textContent='Conoce a ORI';b.onclick=()=>{input.value='¿Quién eres?';form.requestSubmit();};quick.appendChild(b);}
 if(launcher)launcher.addEventListener('click',()=>setTimeout(()=>{if(messages.children.length===1)messages.firstElementChild.innerHTML='¡Hola! Soy <b>ORI</b> 🌿 Tu compañero dentro de ORIGEN. Pregúntame por un viaje, por la página, por mis redes, por mi historia o simplemente conversemos 😄.';},25));
};
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>setTimeout(boot,40));else setTimeout(boot,40);
})();