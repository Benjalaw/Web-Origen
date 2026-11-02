(()=>{
'use strict';
const KEY='origen_lang_v1';
const VALID=['es','en','pt'];
const readLang=()=>{try{const v=JSON.parse(localStorage.getItem(KEY));return VALID.includes(v)?v:'es'}catch{return'es'}};
const saveLang=v=>{try{localStorage.setItem(KEY,JSON.stringify(v))}catch{}};
let lang=readLang();

const EN={
'Inicio':'Home','Explorar':'Explore','Servicios':'Services','Mi Viaje':'My Trip','Tienda':'Shop','Volcanes':'Volcanoes','Más':'More',
'Descubre tu destino desde su ORIGEN.':'Discover your destination from its ORIGIN.','Chile · guía editorial':'Chile · editorial guide','Conoce el territorio chileno con contexto: volcanes, rutas, costa, bosques, parques y aventura.':'Discover Chile with context: volcanoes, routes, coast, forests, parks and adventure.','sistemas volcánicos':'volcanic systems','categorías':'categories','Fuentes':'Sources','oficiales':'official','Chile se recorre con contexto.':'Chile is best explored with context.','Una guía para entender el lugar antes de llegar.':'A guide to understand a place before you arrive.','Explora':'Explore','Chile, capa por capa.':'Chile, layer by layer.','Rutas de Chile':'Routes of Chile','Recorridos que conectan paisajes, pueblos, cultura y naturaleza.':'Journeys connecting landscapes, towns, culture and nature.','Costa chilena':'Chilean coast','Destinos donde el Pacífico define paisaje, cultura y aventura.':'Destinations where the Pacific shapes landscape, culture and adventure.','Bosques & parques':'Forests & parks','Selva valdiviana, araucarias, alerces y áreas protegidas.':'Valdivian rainforest, araucarias, alerces and protected areas.','Aventura':'Adventure','Montaña, ríos, olas y senderos para vivir Chile de forma activa.':'Mountains, rivers, waves and trails for an active way to experience Chile.','Abrir guía →':'Open guide →','Explorar →':'Explore →','Abrir ficha →':'Open profile →',
'Cordillera & volcanes':'Mountains & volcanoes','Volcanes activos de Chile.':'Active volcanoes of Chile.','Todas las regiones':'All regions','Todas las categorías':'All categories','Buscar volcán...':'Search volcano...','El ranking mide riesgo específico, no la probabilidad inmediata de una erupción.':'The ranking measures specific risk, not the immediate probability of an eruption.','Historia y contexto':'History and context','Dato clave':'Key fact','Antes de visitar':'Before visiting','Datos':'Facts','Ranking':'Ranking','Categoría':'Category','Región':'Region','Puntaje':'Score','Red Nacional de Vigilancia Volcánica ↗':'National Volcanic Monitoring Network ↗',
'Preparando guía ORIGEN…':'Preparing ORIGEN guide…','Guía ORIGEN · Chile':'ORIGEN Guide · Chile','Planificar visita':'Plan your visit','Fuente oficial ↗':'Official source ↗','Zona':'Area','Tiempo sugerido':'Suggested time','Mejor época':'Best time','Exigencia':'Difficulty','Según itinerario':'Depends on itinerary','Contexto':'Context','Imperdibles':'Highlights','Planifica':'Plan','Antes de ir':'Before you go','Fuentes':'Sources','En pocas palabras':'In short','Conoce el destino':'Discover the destination','Historia e identidad':'History and identity','Qué ver y hacer':'What to see and do','Experiencias imperdibles':'Must-do experiences','De un vistazo':'At a glance','Datos útiles':'Useful facts','Organiza tu viaje':'Plan your trip','Planifica tu visita':'Plan your visit','Consejos ORIGEN':'ORIGEN tips','Pequeñas decisiones que pueden cambiar completamente la experiencia.':'Small decisions can completely change the experience.','Información responsable':'Responsible information','Fuentes y vigencia':'Sources and currency','ORIGEN resume información turística para ayudarte a planificar, pero accesos, tarifas, horarios, cierres y condiciones pueden cambiar. Verifica los datos variables en fuentes oficiales antes de viajar.':'ORIGEN summarizes travel information to help you plan, but access, prices, schedules, closures and conditions can change. Check variable information with official sources before traveling.','Última revisión editorial':'Last editorial review','Noviembre 2026':'November 2026','Tu visita':'Your visit','¿Para quién es este destino?':'Who is this destination for?','Tip ORIGEN':'ORIGEN tip','Revisar información oficial':'Check official information','Explorar Chile':'Explore Chile',
'Mejor época':'Best time','Cómo llegar':'How to get there','Cómo moverse':'Getting around','Nivel de exigencia':'Difficulty level','Servicios':'Services','Imperdible':'Highlight','Dato útil':'Useful fact','Para considerar':'Keep in mind','Información':'Information',
'Centro ORIGEN':'ORIGEN Hub','Herramientas para viajar mejor.':'Tools to travel better.','Pasaporte ORIGEN':'ORIGEN Passport','Fin de semana':'Weekend','Cerca de mí':'Near me','Alertas':'Alerts','Perfil':'Profile','Checklist':'Checklist','Prestadores':'Providers','Newsletter':'Newsletter','Estadísticas':'Stats','Abrir →':'Open →','Planificar →':'Plan →','Ver todo →':'View all →','Sorpréndeme':'Surprise me','Planificador':'Planner','Privacidad':'Privacy','Novedades':'Updates','Panoramas':'Things to do',
'Ciudad base':'Base city','Tiempo disponible':'Available time','Interés':'Interest','Presupuesto':'Budget','Viajas':'Traveling','Necesidades':'Needs','Cualquier plan':'Any plan','1 día':'1 day','1 noche':'1 night','Fin de semana completo':'Full weekend','Bajo':'Low','Medio':'Medium','Cómodo':'Comfortable','Solo/a':'Solo','En pareja':'As a couple','Con amigos':'With friends','En familia':'With family','Mochilero/a':'Backpacker','Sin filtro':'No filter','Con mascota':'With a pet','Accesibilidad':'Accessibility','Crear plan ✦':'Create plan ✦','Buscar eventos actuales ↗':'Search current events ↗','Ver servicios turísticos':'View tourism services',
'Añadir propuesta a Mi Viaje':'Add proposal to My Trip','Días':'Days','Salgo desde':'Starting from','Generar viaje ✦':'Generate trip ✦','Guardar preferencias':'Save preferences','Guardar nota':'Save note','Imprimir / PDF':'Print / PDF','Marcar visitado':'Mark as visited','✓ Visitado':'✓ Visited','Visitados':'Visited','Regiones':'Regions','Logros':'Achievements','Siguiente sello':'Next stamp','Quitar':'Remove','Ver →':'View →',
'Información turística de referencia. Verifica condiciones oficiales antes de viajar.':'Travel information for reference. Check official conditions before traveling.'
};
const PT={
'Inicio':'Início','Explorar':'Explorar','Servicios':'Serviços','Mi Viaje':'Minha Viagem','Tienda':'Loja','Volcanes':'Vulcões','Más':'Mais',
'Descubre tu destino desde su ORIGEN.':'Descubra seu destino desde a sua ORIGEM.','Chile · guía editorial':'Chile · guia editorial','Conoce el territorio chileno con contexto: volcanes, rutas, costa, bosques, parques y aventura.':'Conheça o território chileno com contexto: vulcões, rotas, costa, florestas, parques e aventura.','sistemas volcánicos':'sistemas vulcânicos','categorías':'categorias','Fuentes':'Fontes','oficiales':'oficiais','Chile se recorre con contexto.':'O Chile se conhece com contexto.','Una guía para entender el lugar antes de llegar.':'Um guia para entender o lugar antes de chegar.','Explora':'Explorar','Chile, capa por capa.':'Chile, camada por camada.','Rutas de Chile':'Rotas do Chile','Recorridos que conectan paisajes, pueblos, cultura y naturaleza.':'Percursos que conectam paisagens, povoados, cultura e natureza.','Costa chilena':'Costa chilena','Destinos donde el Pacífico define paisaje, cultura y aventura.':'Destinos onde o Pacífico define paisagem, cultura e aventura.','Bosques & parques':'Florestas e parques','Selva valdiviana, araucarias, alerces y áreas protegidas.':'Floresta valdiviana, araucárias, alerces e áreas protegidas.','Aventura':'Aventura','Montaña, ríos, olas y senderos para vivir Chile de forma activa.':'Montanhas, rios, ondas e trilhas para viver o Chile de forma ativa.','Abrir guía →':'Abrir guia →','Explorar →':'Explorar →','Abrir ficha →':'Abrir ficha →',
'Cordillera & volcanes':'Cordilheira e vulcões','Volcanes activos de Chile.':'Vulcões ativos do Chile.','Todas las regiones':'Todas as regiões','Todas las categorías':'Todas as categorias','Buscar volcán...':'Buscar vulcão...','El ranking mide riesgo específico, no la probabilidad inmediata de una erupción.':'O ranking mede risco específico, não a probabilidade imediata de uma erupção.','Historia y contexto':'História e contexto','Dato clave':'Dado principal','Antes de visitar':'Antes de visitar','Datos':'Dados','Ranking':'Ranking','Categoría':'Categoria','Región':'Região','Puntaje':'Pontuação','Red Nacional de Vigilancia Volcánica ↗':'Rede Nacional de Monitoramento Vulcânico ↗',
'Preparando guía ORIGEN…':'Preparando guia ORIGEN…','Guía ORIGEN · Chile':'Guia ORIGEN · Chile','Planificar visita':'Planejar visita','Fuente oficial ↗':'Fonte oficial ↗','Zona':'Área','Tiempo sugerido':'Tempo sugerido','Mejor época':'Melhor época','Exigencia':'Exigência','Según itinerario':'Conforme o roteiro','Contexto':'Contexto','Imperdibles':'Imperdíveis','Planifica':'Planeje','Antes de ir':'Antes de ir','Fuentes':'Fontes','En pocas palabras':'Em poucas palavras','Conoce el destino':'Conheça o destino','Historia e identidad':'História e identidade','Qué ver y hacer':'O que ver e fazer','Experiencias imperdibles':'Experiências imperdíveis','De un vistazo':'Visão geral','Datos útiles':'Dados úteis','Organiza tu viaje':'Organize sua viagem','Planifica tu visita':'Planeje sua visita','Consejos ORIGEN':'Dicas ORIGEN','Pequeñas decisiones que pueden cambiar completamente la experiencia.':'Pequenas decisões podem mudar completamente a experiência.','Información responsable':'Informação responsável','Fuentes y vigencia':'Fontes e atualização','ORIGEN resume información turística para ayudarte a planificar, pero accesos, tarifas, horarios, cierres y condiciones pueden cambiar. Verifica los datos variables en fuentes oficiales antes de viajar.':'A ORIGEN resume informações turísticas para ajudar no planejamento, mas acessos, preços, horários, fechamentos e condições podem mudar. Confira os dados variáveis em fontes oficiais antes de viajar.','Última revisión editorial':'Última revisão editorial','Noviembre 2026':'Novembro de 2026','Tu visita':'Sua visita','¿Para quién es este destino?':'Para quem é este destino?','Tip ORIGEN':'Dica ORIGEN','Revisar información oficial':'Ver informação oficial','Explorar Chile':'Explorar o Chile',
'Mejor época':'Melhor época','Cómo llegar':'Como chegar','Cómo moverse':'Como se locomover','Nivel de exigencia':'Nível de exigência','Servicios':'Serviços','Imperdible':'Imperdível','Dato útil':'Dado útil','Para considerar':'A considerar','Información':'Informação',
'Centro ORIGEN':'Central ORIGEN','Herramientas para viajar mejor.':'Ferramentas para viajar melhor.','Pasaporte ORIGEN':'Passaporte ORIGEN','Fin de semana':'Fim de semana','Cerca de mí':'Perto de mim','Alertas':'Alertas','Perfil':'Perfil','Checklist':'Checklist','Prestadores':'Prestadores','Newsletter':'Newsletter','Estadísticas':'Estatísticas','Abrir →':'Abrir →','Planificar →':'Planejar →','Ver todo →':'Ver tudo →','Sorpréndeme':'Surpreenda-me','Planificador':'Planejador','Privacidad':'Privacidade','Novedades':'Novidades','Panoramas':'Passeios',
'Ciudad base':'Cidade base','Tiempo disponible':'Tempo disponível','Interés':'Interesse','Presupuesto':'Orçamento','Viajas':'Você viaja','Necesidades':'Necessidades','Cualquier plan':'Qualquer plano','1 día':'1 dia','1 noche':'1 noite','Fin de semana completo':'Fim de semana completo','Bajo':'Baixo','Medio':'Médio','Cómodo':'Confortável','Solo/a':'Sozinho/a','En pareja':'Em casal','Con amigos':'Com amigos','En familia':'Em família','Mochilero/a':'Mochileiro/a','Sin filtro':'Sem filtro','Con mascota':'Com pet','Accesibilidad':'Acessibilidade','Crear plan ✦':'Criar plano ✦','Buscar eventos actuales ↗':'Buscar eventos atuais ↗','Ver servicios turísticos':'Ver serviços turísticos',
'Añadir propuesta a Mi Viaje':'Adicionar proposta à Minha Viagem','Días':'Dias','Salgo desde':'Saio de','Generar viaje ✦':'Gerar viagem ✦','Guardar preferencias':'Salvar preferências','Guardar nota':'Salvar nota','Imprimir / PDF':'Imprimir / PDF','Marcar visitado':'Marcar como visitado','✓ Visitado':'✓ Visitado','Visitados':'Visitados','Regiones':'Regiões','Logros':'Conquistas','Siguiente sello':'Próximo selo','Quitar':'Remover','Ver →':'Ver →',
'Información turística de referencia. Verifica condiciones oficiales antes de viajar.':'Informação turística de referência. Verifique as condições oficiais antes de viajar.'
};

const dict={en:EN,pt:PT};
const originals=new WeakMap();
const attrOriginals=new WeakMap();
const reverse={en:{},pt:{}};
for(const l of ['en','pt'])for(const [es,v] of Object.entries(dict[l]))reverse[l][v]=es;

function canonicalText(value){
  if(lang==='es')return value;
  return reverse[lang]?.[value]||value;
}
function translateExact(es){return lang==='es'?es:(dict[lang]?.[es]||es)}
function translateNode(node){
  if(!node||!node.nodeValue)return;
  const parent=node.parentElement;
  if(!parent||/^(SCRIPT|STYLE|TEXTAREA|CODE|PRE)$/.test(parent.tagName))return;
  let original=originals.get(node);
  if(original==null){original=canonicalText(node.nodeValue);originals.set(node,original)}
  const lead=original.match(/^\s*/)?.[0]||'', tail=original.match(/\s*$/)?.[0]||'', core=original.trim();
  if(!core)return;
  const translated=translateExact(core);
  node.nodeValue=lead+translated+tail;
}
function translateAttrs(el){
  if(!(el instanceof Element))return;
  const attrs=['placeholder','aria-label','title'];
  let store=attrOriginals.get(el);if(!store){store={};attrOriginals.set(el,store)}
  for(const a of attrs){if(!el.hasAttribute(a))continue;if(store[a]==null)store[a]=canonicalText(el.getAttribute(a));el.setAttribute(a,translateExact(store[a]))}
}
function walk(root=document.body){
  if(!root)return;
  if(root.nodeType===Node.TEXT_NODE){translateNode(root);return}
  if(root.nodeType===Node.ELEMENT_NODE)translateAttrs(root);
  const w=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);let n;while(n=w.nextNode())translateNode(n);
  if(root.querySelectorAll)root.querySelectorAll('[placeholder],[aria-label],[title]').forEach(translateAttrs);
}
function applyNav(){
  const map={
    '#/':{es:'Inicio',en:'Home',pt:'Início'},
    '#/explorar':{es:'Explorar',en:'Explore',pt:'Explorar'},
    '#/servicios':{es:'Servicios',en:'Services',pt:'Serviços'},
    '#/mi-viaje':{es:'Mi Viaje',en:'My Trip',pt:'Minha Viagem'},
    '#/tienda':{es:'Tienda',en:'Shop',pt:'Loja'},
    '#/volcanes':{es:'Volcanes',en:'Volcanoes',pt:'Vulcões'}
  };
  document.querySelectorAll('#nav a[href^="#/"]').forEach(a=>{const m=map[a.getAttribute('href')];if(m)a.textContent=m[lang]||m.es});
  const sel=document.getElementById('origen-lang');if(sel&&sel.value!==lang)sel.value=lang;
}
function apply(){
  document.documentElement.lang=lang==='pt'?'pt-BR':lang==='en'?'en':'es';
  document.documentElement.dataset.lang=lang;
  applyNav();walk(document.getElementById('app'));walk(document.querySelector('footer'));walk(document.getElementById('nav'));
  const h=document.querySelector('#app h1');if(h){const title=h.textContent.trim();if(title)document.title=`${title} | ORIGEN`}
}
function setLanguage(next){
  if(!VALID.includes(next))next='es';
  lang=next;saveLang(lang);apply();
  setTimeout(apply,40);setTimeout(apply,160);
  window.dispatchEvent(new CustomEvent('origen:languagechange',{detail:{language:lang}}));
}

const obs=new MutationObserver(ms=>{for(const m of ms){for(const n of m.addedNodes)walk(n)}applyNav()});
const start=()=>{const target=document.body;if(target)obs.observe(target,{childList:true,subtree:true});apply()};
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();

document.addEventListener('change',e=>{if(e.target?.id==='origen-lang')setLanguage(e.target.value)},true);
window.addEventListener('hashchange',()=>setTimeout(apply,80));
window.ORIGEN_I18N={getLanguage:()=>lang,setLanguage,apply,t:(es)=>translateExact(es)};
})();
