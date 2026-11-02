(()=>{
  const PLAN_ICONS={bestSeason:'☀',access:'↗',transport:'⌁',difficulty:'△',services:'＋'};
  const UI={
    es:{loading:'Preparando guía ORIGEN…',guide:'Guía ORIGEN · Chile',back:'Volver a',planVisit:'Planificar visita',official:'Fuente oficial ↗',zone:'Zona',time:'Tiempo sugerido',best:'Mejor época',difficulty:'Exigencia',itinerary:'Según itinerario',season:'Según temporada',variable:'Variable',navLabel:'Secciones de la guía',context:'Contexto',highlights:'Imperdibles',facts:'Datos',plan:'Planifica',before:'Antes de ir',sources:'Fuentes',short:'En pocas palabras',know:'Conoce el destino',history:'Historia e identidad',see:'Qué ver y hacer',must:'Experiencias imperdibles',glance:'De un vistazo',useful:'Datos útiles',organize:'Organiza tu viaje',planHeading:'Planifica tu visita',tips:'Consejos ORIGEN',tipsIntro:'Pequeñas decisiones que pueden cambiar completamente la experiencia.',responsible:'Información responsable',sourcesHeading:'Fuentes y vigencia',sourceText:'ORIGEN resume información turística para ayudarte a planificar, pero accesos, tarifas, horarios, cierres y condiciones pueden cambiar. Verifica los datos variables en fuentes oficiales antes de viajar.',info:'Información',infoFallback:'Consulta la planificación y fuentes oficiales antes de viajar.',noSource:'Esta ficha utiliza la información base disponible en ORIGEN. Recomendamos complementar con fuentes oficiales del destino.',review:'Última revisión editorial',reviewDate:'Noviembre 2026',yourVisit:'Tu visita',who:'¿Para quién es este destino?',tip:'Tip ORIGEN',checkOfficial:'Revisar información oficial',explore:'Explorar Chile',genericTip:'Confirma las condiciones del destino antes de salir.',planLabels:{bestSeason:'Mejor época',access:'Cómo llegar',transport:'Cómo moverse',difficulty:'Nivel de exigencia',services:'Servicios'},categories:{rutas:'Rutas de Chile',costa:'Costa chilena',bosques:'Bosques & parques',aventura:'Aventura',destinos:'destinos'},fallbackFacts:['Imperdible','Dato útil','Para considerar']},
    en:{loading:'Preparing ORIGEN guide…',guide:'ORIGEN Guide · Chile',back:'Back to',planVisit:'Plan your visit',official:'Official source ↗',zone:'Area',time:'Suggested time',best:'Best time',difficulty:'Difficulty',itinerary:'Depends on itinerary',season:'Depends on season',variable:'Variable',navLabel:'Guide sections',context:'Context',highlights:'Highlights',facts:'Facts',plan:'Plan',before:'Before you go',sources:'Sources',short:'In short',know:'Discover the destination',history:'History and identity',see:'What to see and do',must:'Must-do experiences',glance:'At a glance',useful:'Useful facts',organize:'Plan your trip',planHeading:'Plan your visit',tips:'ORIGEN tips',tipsIntro:'Small decisions can completely change the experience.',responsible:'Responsible information',sourcesHeading:'Sources and currency',sourceText:'ORIGEN summarizes travel information to help you plan, but access, prices, schedules, closures and conditions can change. Check variable information with official sources before traveling.',info:'Information',infoFallback:'Check planning details and official sources before traveling.',noSource:'This guide uses the base information available in ORIGEN. We recommend checking official destination sources as well.',review:'Last editorial review',reviewDate:'November 2026',yourVisit:'Your visit',who:'Who is this destination for?',tip:'ORIGEN tip',checkOfficial:'Check official information',explore:'Explore Chile',genericTip:'Confirm destination conditions before setting out.',planLabels:{bestSeason:'Best time',access:'How to get there',transport:'Getting around',difficulty:'Difficulty level',services:'Services'},categories:{rutas:'Routes of Chile',costa:'Chilean coast',bosques:'Forests & parks',aventura:'Adventure',destinos:'destinations'},fallbackFacts:['Highlight','Useful fact','Keep in mind']},
    pt:{loading:'Preparando guia ORIGEN…',guide:'Guia ORIGEN · Chile',back:'Voltar para',planVisit:'Planejar visita',official:'Fonte oficial ↗',zone:'Área',time:'Tempo sugerido',best:'Melhor época',difficulty:'Exigência',itinerary:'Conforme o roteiro',season:'Conforme a temporada',variable:'Variável',navLabel:'Seções do guia',context:'Contexto',highlights:'Imperdíveis',facts:'Dados',plan:'Planeje',before:'Antes de ir',sources:'Fontes',short:'Em poucas palavras',know:'Conheça o destino',history:'História e identidade',see:'O que ver e fazer',must:'Experiências imperdíveis',glance:'Visão geral',useful:'Dados úteis',organize:'Organize sua viagem',planHeading:'Planeje sua visita',tips:'Dicas ORIGEN',tipsIntro:'Pequenas decisões podem mudar completamente a experiência.',responsible:'Informação responsável',sourcesHeading:'Fontes e atualização',sourceText:'A ORIGEN resume informações turísticas para ajudar no planejamento, mas acessos, preços, horários, fechamentos e condições podem mudar. Confira os dados variáveis em fontes oficiais antes de viajar.',info:'Informação',infoFallback:'Confira o planejamento e as fontes oficiais antes de viajar.',noSource:'Este guia utiliza as informações básicas disponíveis na ORIGEN. Recomendamos complementar com fontes oficiais do destino.',review:'Última revisão editorial',reviewDate:'Novembro de 2026',yourVisit:'Sua visita',who:'Para quem é este destino?',tip:'Dica ORIGEN',checkOfficial:'Ver informação oficial',explore:'Explorar o Chile',genericTip:'Confirme as condições do destino antes de sair.',planLabels:{bestSeason:'Melhor época',access:'Como chegar',transport:'Como se locomover',difficulty:'Nível de exigência',services:'Serviços'},categories:{rutas:'Rotas do Chile',costa:'Costa chilena',bosques:'Florestas e parques',aventura:'Aventura',destinos:'destinos'},fallbackFacts:['Imperdível','Dado útil','A considerar']}
  };
  const clean=(v='')=>String(v).trim();
  const short=(v,max=96)=>{v=clean(v);return v.length>max?v.slice(0,max).trim().replace(/[.,;:]?$/,'')+'…':v};
  const getLang=()=>{const live=window.ORIGEN_I18N?.getLanguage?.();if(['es','en','pt'].includes(live))return live;try{const v=JSON.parse(localStorage.getItem('origen_lang_v1'));return ['es','en','pt'].includes(v)?v:'es'}catch{return'es'}};
  const fallback=(x,lang='es')=>{const u=UI[lang]||UI.es;return{
    story:[x.story].filter(Boolean),
    highlights:[],
    facts:(x.facts||[]).map((v,i)=>({label:u.fallbackFacts[i]||`${u.info} ${i+1}`,value:v})),
    planning:{
      bestSeason:x.bestSeason||(lang==='en'?'The best season depends on the experience you want.':lang==='pt'?'A melhor época depende da experiência que você busca.':'La mejor época depende de la experiencia que quieras realizar.'),
      access:x.access||(lang==='en'?'Confirm the route and access conditions before setting out.':lang==='pt'?'Confirme a rota e as condições de acesso antes de sair.':'Confirma la ruta y las condiciones de acceso antes de salir.'),
      transport:lang==='en'?'Plan transport and travel times according to destination connectivity.':lang==='pt'?'Planeje o transporte e os tempos de deslocamento conforme a conectividade do destino.':'Define transporte y tiempos de traslado según la conectividad del destino.',
      difficulty:x.difficulty||(lang==='en'?'Difficulty varies by activity.':lang==='pt'?'A exigência varia conforme a atividade.':'La exigencia cambia según la actividad elegida.'),
      services:lang==='en'?'Check accommodation, food, fuel and reservations when relevant.':lang==='pt'?'Confira hospedagem, alimentação, combustível e reservas quando necessário.':'Comprueba alojamiento, alimentación, combustible y reservas cuando corresponda.'
    },
    tips:lang==='en'?['Check weather, access, schedules and reservations before leaving.','Bring equipment suited to the terrain and avoid improvising in remote areas.']:lang==='pt'?['Confira clima, acessos, horários e reservas antes de sair.','Leve equipamento adequado ao terreno e evite improvisar em áreas remotas.']:['Revisa clima, accesos, horarios y reservas antes de salir.','Lleva equipamiento acorde al territorio y evita improvisar en zonas remotas.'],
    idealFor:x.idealFor||x.interests||[],
    sources:x.source?[{label:lang==='en'?'Official destination information':lang==='pt'?'Informação oficial do destino':'Información oficial del destino',url:x.source}]:[]
  }};
  const localizeGuide=(g,id,lang)=>{if(lang==='es')return g;const l=window.ORIGEN_GUIDE_LOCALES?.[lang]?.[id];if(!l)return g;return{
    ...g,
    summary:l.summary||g.summary,
    story:l.story||g.story,
    highlights:l.highlights?l.highlights.map(([title,text])=>({title,text})):g.highlights,
    facts:l.facts?l.facts.map(([label,value])=>({label,value})):g.facts,
    planning:{...(g.planning||{}),...(l.planning||{})},
    tips:l.tips||g.tips,
    idealFor:l.idealFor||g.idealFor,
    sources:(g.sources||[]).map((s,i)=>({...s,label:l.sourceLabels?.[i]||s.label}))
  }};
  const valueFromFacts=(facts,matcher)=>{const f=(facts||[]).find(x=>matcher.test(clean(x.label)));return f?clean(f.value):''};
  const planPreview=(planning,key,fallbackText)=>short(planning?.[key]||fallbackText,78);
  const sourceLinks=(sources)=>sources.map(s=>`<a class="pro-source" href="${s.url}" target="_blank" rel="noopener"><span>${s.label}</span><b>↗</b></a>`).join('');

  place=async function(id){
    const x=P.find(p=>p.id==id);if(!x)return home();
    const lang=getLang(),u=UI[lang]||UI.es;
    app.innerHTML=`<section class="pagehero guide-loading"><div class="wrap"><span class="tag">${x.region}</span><h1>${x.name}</h1><p>${u.loading}</p></div></section>`;
    let g;
    try{const r=await fetch(`guides/${id}.json?v=20261102pro`);if(!r.ok)throw new Error('guide');g=await r.json()}catch(e){g=fallback(x,lang)}
    const base=fallback(x,lang);
    g={...base,...g,planning:{...base.planning,...(g.planning||{})}};
    g=localizeGuide(g,id,lang);

    const history=(g.story||[]).map(p=>`<p>${p}</p>`).join('');
    const highlights=(g.highlights||[]).map((h,i)=>`<article class="pro-highlight"><div class="pro-highlight-number">${String(i+1).padStart(2,'0')}</div><div><h3>${h.title}</h3><p>${h.text}</p></div></article>`).join('');
    const facts=(g.facts||[]).map(f=>`<div class="pro-fact"><small>${f.label}</small><strong>${f.value}</strong></div>`).join('');
    const plans=Object.entries(g.planning||{}).map(([k,v])=>`<div class="pro-plan-row"><div class="pro-plan-icon">${PLAN_ICONS[k]||'•'}</div><div><small>${u.planLabels[k]||k}</small><p>${v}</p></div></div>`).join('');
    const tips=(g.tips||[]).map((t,i)=>`<li><span>${i+1}</span><p>${t}</p></li>`).join('');
    const ideal=(g.idealFor||[]).map(t=>`<span>${t}</span>`).join('');
    const sources=g.sources||[];
    const time=valueFromFacts(g.facts||[],/tiempo|duraci[oó]n|estad[ií]a|suggested time|duration|stay|tempo|dura[cç][aã]o|estadia/i)||u.itinerary;
    const quick=[
      ['⌖',u.zone,x.region],
      ['◷',u.time,time],
      ['☀',u.best,planPreview(g.planning,'bestSeason',u.season)],
      ['△',u.difficulty,planPreview(g.planning,'difficulty',u.variable)]
    ];
    const summary=clean(g.summary||(lang==='es'?x.lead:'')||g.story?.[0]);
    const categoryName=u.categories[x.cat]||u.categories.destinos;

    app.innerHTML=`
      <section class="pagehero pagehero-photo guide-hero pro-guide-hero" style="--heroimg:url('${x.image}')">
        <div class="wrap">
          <a class="back-link" href="#/${x.cat}">← ${u.back} ${categoryName}</a>
          <div class="pro-hero-kicker"><span class="tag">${x.region}</span><span class="pro-editorial-badge">${u.guide}</span></div>
          <h1>${x.name}</h1>
          <p>${summary}</p>
          <div class="pro-hero-actions"><a href="#/lugar/${id}" data-guide-target="planifica">${u.planVisit}</a>${sources[0]?`<a class="secondary" href="${sources[0].url}" target="_blank" rel="noopener">${u.official}</a>`:''}</div>
        </div>
      </section>

      <section class="pro-quick-strip"><div class="wrap pro-quick-grid">${quick.map(q=>`<div class="pro-quick-item"><span>${q[0]}</span><div><small>${q[1]}</small><strong>${q[2]}</strong></div></div>`).join('')}</div></section>

      <section class="section pro-guide-section">
        <div class="wrap pro-guide-layout">
          <main class="pro-guide-main">
            <nav class="pro-section-nav" aria-label="${u.navLabel}">
              <a href="#/lugar/${id}" data-guide-target="contexto">${u.context}</a>${highlights?`<a href="#/lugar/${id}" data-guide-target="imperdibles">${u.highlights}</a>`:''}<a href="#/lugar/${id}" data-guide-target="datos">${u.facts}</a><a href="#/lugar/${id}" data-guide-target="planifica">${u.plan}</a><a href="#/lugar/${id}" data-guide-target="consejos">${u.before}</a><a href="#/lugar/${id}" data-guide-target="fuentes">${u.sources}</a>
            </nav>

            <section class="pro-intro-card"><span class="eyebrow">${u.short}</span><p>${summary}</p></section>

            <section class="guide-block pro-block" id="contexto">
              <div class="pro-section-heading"><div><span class="eyebrow">${u.know}</span><h2>${u.history}</h2></div><span class="pro-section-index">01</span></div>
              <div class="prose pro-prose">${history}</div>
            </section>

            ${highlights?`<section class="guide-block pro-block" id="imperdibles"><div class="pro-section-heading"><div><span class="eyebrow">${u.see}</span><h2>${u.must}</h2></div><span class="pro-section-index">02</span></div><div class="pro-highlight-list">${highlights}</div></section>`:''}

            <section class="guide-block pro-block" id="datos">
              <div class="pro-section-heading"><div><span class="eyebrow">${u.glance}</span><h2>${u.useful}</h2></div><span class="pro-section-index">${highlights?'03':'02'}</span></div>
              <div class="pro-facts-grid">${facts||`<div class="pro-fact"><small>${u.info}</small><strong>${u.infoFallback}</strong></div>`}</div>
            </section>

            <section class="guide-block pro-block" id="planifica">
              <div class="pro-section-heading"><div><span class="eyebrow">${u.organize}</span><h2>${u.planHeading}</h2></div><span class="pro-section-index">${highlights?'04':'03'}</span></div>
              <div class="pro-plan-list">${plans}</div>
            </section>

            <section class="guide-block pro-block" id="consejos">
              <div class="pro-tips-box"><div><span class="eyebrow">${u.tips}</span><h2>${u.before}</h2><p>${u.tipsIntro}</p></div><ol>${tips}</ol></div>
            </section>

            <section class="guide-block pro-block pro-sources-section" id="fuentes">
              <div class="pro-section-heading"><div><span class="eyebrow">${u.responsible}</span><h2>${u.sourcesHeading}</h2></div><span class="pro-section-index">✓</span></div>
              <p>${u.sourceText}</p>
              <div class="pro-source-grid">${sourceLinks(sources)||`<span class="pro-no-source">${u.noSource}</span>`}</div>
              <div class="pro-reviewed"><span>${u.review}</span><b>${u.reviewDate}</b></div>
            </section>
          </main>

          <aside class="pro-guide-aside">
            <div class="panel pro-sticky-card">
              <span class="eyebrow">${u.yourVisit}</span><h3>${u.who}</h3><div class="chip-list pro-chip-list">${ideal||`<span>${u.explore}</span>`}</div>
              <hr>
              <span class="eyebrow">${u.tip}</span><p class="pro-aside-tip">${g.tips?.[0]||u.genericTip}</p>
              ${sources[0]?`<a class="pro-official-cta" href="${sources[0].url}" target="_blank" rel="noopener">${u.checkOfficial} <span>↗</span></a>`:''}
            </div>
          </aside>
        </div>
      </section>`;

    app.querySelectorAll('[data-guide-target]').forEach(btn=>btn.addEventListener('click',e=>{
      e.preventDefault();
      const target=document.getElementById(btn.dataset.guideTarget);
      if(target)target.scrollIntoView({behavior:'smooth',block:'start'});
    }));
  };

  window.addEventListener('origen:languagechange',()=>{
    const m=location.hash.match(/^#\/lugar\/([^?]+)/);
    if(m)place(m[1]);
  });

  if(location.hash.startsWith('#/lugar/')) route();
})();
