(()=>{
const boot=()=>{
 const form=document.querySelector('#ori-form'),input=document.querySelector('#ori-input'),messages=document.querySelector('#ori-messages'),quick=document.querySelector('.ori-quick');
 if(!form||!input||!messages||form.dataset.personalityReady)return;
 form.dataset.personalityReady='1';
 const baseSubmit=form.onsubmit;
 const N=s=>(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9ñ]+/gi,' ').replace(/\s+/g,' ').trim();
 const E=s=>String(s||'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
 const add=(html,type='bot')=>{const d=document.createElement('div');d.className=`ori-msg ${type}`;d.innerHTML=html;messages.appendChild(d);messages.scrollTop=messages.scrollHeight;};
 const hasAny=(n,arr)=>arr.some(x=>n.includes(x));
 function personality(q){
  const n=N(q);
  if(!n)return'';
  if(hasAny(n,['quien eres','quién eres','que eres','qué eres','presentate','preséntate']))return`Soy <b>ORI</b> 🌿, el pequeño guardián y guía viajero de <b>ORIGEN</b>. Estoy inspirado en la cordillera, los bosques y los paisajes de Chile. Mi trabajo es ayudarte a descubrir lugares, planificar viajes y entender mejor el territorio, pero también puedo conversar contigo sobre la página y sobre mí.`;
  if(hasAny(n,['donde naciste','dónde naciste','donde nacio ori','dónde nació ori','de donde eres','de dónde eres']))return`Mi historia dice que nací <b>entre roca, bosque y cordillera chilena</b> 🏔️🌿. No tengo una ciudad natal como una persona: soy un personaje de ORIGEN creado para representar la conexión con el territorio chileno. Si tuviera que elegir una casa, sería algún rincón de montaña mirando hacia el Pacífico.`;
  if(hasAny(n,['que es origen','qué es origen','de que trata la pagina','de qué trata la página','que es esta pagina','qué es esta página','para que sirve origen','para qué sirve origen']))return`<b>ORIGEN</b> es una guía turística de Chile pensada para descubrir destinos con contexto. Reúne lugares, volcanes, rutas, experiencias y servicios turísticos, además de datos para planificar viajes. La idea no es mostrar solo una foto bonita, sino ayudarte a entender <b>qué hace especial a cada lugar y cómo vivirlo mejor</b>.`;
  if(hasAny(n,['que significa origen','qué significa origen','por que se llama origen','por qué se llama origen']))return`El nombre <b>ORIGEN</b> representa la idea de conocer un destino desde su esencia: su paisaje, su historia, su cultura y las personas que le dan identidad. Por eso el lema es <b>“Descubre tu destino desde su ORIGEN”</b>.`;
  if(hasAny(n,['que significa ori','qué significa ori','por que te llamas ori','por qué te llamas ori']))return`Mi nombre, <b>ORI</b>, viene directamente de <b>ORIGEN</b>. Es corto, fácil de recordar y representa mi papel como compañero de viaje de la página.`;
  if(hasAny(n,['quien te creo','quién te creó','quien creo ori','quién creó ori','quien hizo ori','quién hizo ori']))return`Fui creado como la mascota y guía de <b>ORIGEN</b>. Mi diseño mezcla roca y cordillera en el cuerpo, detalles verde oscuro, una mochila de explorador y un pañuelo azul. Todo está pensado para que parezca que siempre estoy listo para salir a descubrir Chile.`;
  if(hasAny(n,['como estas','cómo estás','como te sientes','cómo te sientes']))return`¡Bien y con ganas de salir a recorrer! 😄🌿 Si fuera por mí, tendría la mochila lista todo el año. ¿Tú estás pensando en algún viaje o solo viniste a conversar conmigo?`;
  if(hasAny(n,['que te gusta','qué te gusta','cual es tu lugar favorito','cuál es tu lugar favorito','destino favorito']))return`Me cuesta elegir uno 😅. Me gustan especialmente los lugares donde se mezclan <b>montaña, bosque y agua</b>: la Araucanía, Los Lagos, Aysén y la Patagonia me quedan bastante bien con la mochila. Pero también me encanta el contraste del altiplano y Atacama.`;
  if(hasAny(n,['comida favorita','que comes','qué comes','que te gusta comer','qué te gusta comer']))return`Si pudiera sentarme a la mesa, elegiría cosas bien chilenas: empanadas, mariscos del sur, un buen pastel de choclo y algo calentito después de un día de montaña 😄. En la página también puedo ayudarte a buscar restaurantes por ciudad.`;
  if(hasAny(n,['cuantos anos tienes','cuántos años tienes','que edad tienes','qué edad tienes']))return`No tengo edad humana 😄. Nací como personaje de <b>ORIGEN</b>, así que mi edad se cuenta más en rutas recorridas que en años.`;
  if(hasAny(n,['eres humano','eres una persona','eres real','eres ia','eres inteligencia artificial']))return`Soy el <b>asistente digital de ORIGEN</b> representado por ORI. No soy una persona real, pero intento conversar de forma cercana y ayudarte como lo haría un buen compañero de viaje.`;
  if(hasAny(n,['que llevas en la mochila','qué llevas en la mochila','que hay en tu mochila','qué hay en tu mochila']))return`Lo básico para explorar Chile 🎒: agua, una capa para el frío, algo para comer, botiquín, mapa, batería extra y espacio para guardar historias del camino. Y sí, probablemente llevo más cosas de las necesarias 😅.`;
  if(hasAny(n,['por que tienes un panuelo','por qué tienes un pañuelo','pañuelo azul','panuelo azul']))return`El <b>pañuelo azul</b> representa el agua y el Pacífico, mientras el verde de mi mochila conecta con bosques y naturaleza. Mi cuerpo claro recuerda roca, montaña y cordillera.`;
  if(hasAny(n,['cual es tu mision','cuál es tu misión','para que existes','para qué existes']))return`Mi misión es hacer que descubrir Chile sea más fácil y entretenido: ayudarte a encontrar un destino, entender su historia, organizar la ruta y encontrar servicios confiables cuando ya estás viajando.`;
  if(hasAny(n,['cuentame tu historia','cuéntame tu historia','historia de ori']))return`Cuenta la historia que ORI apareció recorriendo un sendero entre la cordillera y el bosque, con una mochila demasiado grande y muchas ganas de saber qué había detrás de cada cerro. Desde entonces se convirtió en el guardián viajero de <b>ORIGEN</b>: pequeño, curioso y siempre listo para señalar el próximo camino. 🌿🏔️`;
  if(hasAny(n,['gracias','muchas gracias','te pasaste']))return`¡De nada! 🌿 Me gusta ayudar. Cuando quieras seguimos armando la ruta, buscando un lugar para comer o simplemente conversando.`;
  if(hasAny(n,['chao','adios','adiós','nos vemos','hasta luego']))return`¡Nos vemos! 👋🌿 Que tengas buen camino. Cuando vuelvas, acá voy a estar con la mochila lista.`;
  if(hasAny(n,['hola ori','hola','holi','buenas','hey ori']))return`¡Hola! 👋🌿 Soy <b>ORI</b>. Puedes preguntarme por viajes y destinos, pero también por ORIGEN, mi historia o simplemente conversar un rato conmigo.`;
  return'';
 }
 form.onsubmit=e=>{const q=input.value,reply=personality(q);if(reply){e.preventDefault();if(!q.trim())return;add(E(q),'user');input.value='';setTimeout(()=>add(reply,'bot'),70);return;}if(typeof baseSubmit==='function')return baseSubmit.call(form,e);};
 if(quick&&!quick.querySelector('[data-about-ori]')){const b=document.createElement('button');b.type='button';b.dataset.aboutOri='1';b.textContent='Conoce a ORI';b.onclick=()=>{input.value='¿Quién eres?';form.requestSubmit();};quick.appendChild(b);}
};
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>setTimeout(boot,30));else setTimeout(boot,30);
})();