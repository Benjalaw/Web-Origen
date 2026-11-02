(()=>{
  const PLAN_LABELS={bestSeason:'Mejor época',access:'Cómo llegar',transport:'Cómo moverse',difficulty:'Nivel de exigencia',services:'Servicios'};
  const PLAN_ICONS={bestSeason:'☀',access:'↗',transport:'⌁',difficulty:'△',services:'＋'};
  const clean=(v='')=>String(v).trim();
  const short=(v,max=96)=>{v=clean(v);return v.length>max?v.slice(0,max).trim().replace(/[.,;:]?$/,'')+'…':v};
  const fallback=(x)=>({
    story:[x.story].filter(Boolean),
    highlights:[],
    facts:(x.facts||[]).map((v,i)=>({label:['Imperdible','Dato útil','Para considerar'][i]||`Dato ${i+1}`,value:v})),
    planning:{
      bestSeason:x.bestSeason||'La mejor época depende de la experiencia que quieras realizar.',
      access:x.access||'Confirma la ruta y las condiciones de acceso antes de salir.',
      transport:'Define transporte y tiempos de traslado según la conectividad del destino.',
      difficulty:x.difficulty||'La exigencia cambia según la actividad elegida.',
      services:'Comprueba alojamiento, alimentación, combustible y reservas cuando corresponda.'
    },
    tips:['Revisa clima, accesos, horarios y reservas antes de salir.','Lleva equipamiento acorde al territorio y evita improvisar en zonas remotas.'],
    idealFor:x.idealFor||x.interests||[],
    sources:x.source?[{label:'Información oficial del destino',url:x.source}]:[]
  });
  const valueFromFacts=(facts,matcher)=>{const f=(facts||[]).find(x=>matcher.test(clean(x.label)));return f?clean(f.value):''};
  const planPreview=(planning,key,fallbackText)=>short(planning?.[key]||fallbackText,78);
  const sourceLinks=(sources)=>sources.map(s=>`<a class="pro-source" href="${s.url}" target="_blank" rel="noopener"><span>${s.label}</span><b>↗</b></a>`).join('');

  place=async function(id){
    const x=P.find(p=>p.id==id);if(!x)return home();
    app.innerHTML=`<section class="pagehero guide-loading"><div class="wrap"><span class="tag">${x.region}</span><h1>${x.name}</h1><p>Preparando guía ORIGEN…</p></div></section>`;
    let g;
    try{const r=await fetch(`guides/${id}.json?v=20261102pro`);if(!r.ok)throw new Error('guide');g=await r.json()}catch(e){g=fallback(x)}
    g={...fallback(x),...g,planning:{...fallback(x).planning,...(g.planning||{})}};

    const history=(g.story||[]).map(p=>`<p>${p}</p>`).join('');
    const highlights=(g.highlights||[]).map((h,i)=>`<article class="pro-highlight"><div class="pro-highlight-number">${String(i+1).padStart(2,'0')}</div><div><h3>${h.title}</h3><p>${h.text}</p></div></article>`).join('');
    const facts=(g.facts||[]).map(f=>`<div class="pro-fact"><small>${f.label}</small><strong>${f.value}</strong></div>`).join('');
    const plans=Object.entries(g.planning||{}).map(([k,v])=>`<div class="pro-plan-row"><div class="pro-plan-icon">${PLAN_ICONS[k]||'•'}</div><div><small>${PLAN_LABELS[k]||k}</small><p>${v}</p></div></div>`).join('');
    const tips=(g.tips||[]).map((t,i)=>`<li><span>${i+1}</span><p>${t}</p></li>`).join('');
    const ideal=(g.idealFor||[]).map(t=>`<span>${t}</span>`).join('');
    const sources=g.sources||[];
    const time=valueFromFacts(g.facts||[],/tiempo|duraci[oó]n|estad[ií]a/i)||'Según itinerario';
    const quick=[
      ['⌖','Zona',x.region],
      ['◷','Tiempo sugerido',time],
      ['☀','Mejor época',planPreview(g.planning,'bestSeason','Según temporada')],
      ['△','Exigencia',planPreview(g.planning,'difficulty','Variable')]
    ];
    const summary=clean(g.summary||x.lead||g.story?.[0]);
    const categoryName=cats[x.cat]?.[0]||'destinos';

    app.innerHTML=`
      <section class="pagehero pagehero-photo guide-hero pro-guide-hero" style="--heroimg:url('${x.image}')">
        <div class="wrap">
          <a class="back-link" href="#/${x.cat}">← Volver a ${categoryName}</a>
          <div class="pro-hero-kicker"><span class="tag">${x.region}</span><span class="pro-editorial-badge">Guía ORIGEN · Chile</span></div>
          <h1>${x.name}</h1>
          <p>${summary}</p>
          <div class="pro-hero-actions"><a href="#planifica">Planificar visita</a>${sources[0]?`<a class="secondary" href="${sources[0].url}" target="_blank" rel="noopener">Fuente oficial ↗</a>`:''}</div>
        </div>
      </section>

      <section class="pro-quick-strip"><div class="wrap pro-quick-grid">${quick.map(q=>`<div class="pro-quick-item"><span>${q[0]}</span><div><small>${q[1]}</small><strong>${q[2]}</strong></div></div>`).join('')}</div></section>

      <section class="section pro-guide-section">
        <div class="wrap pro-guide-layout">
          <main class="pro-guide-main">
            <nav class="pro-section-nav" aria-label="Secciones de la guía">
              <a href="#contexto">Contexto</a>${highlights?'<a href="#imperdibles">Imperdibles</a>':''}<a href="#datos">Datos</a><a href="#planifica">Planifica</a><a href="#consejos">Antes de ir</a><a href="#fuentes">Fuentes</a>
            </nav>

            <section class="pro-intro-card"><span class="eyebrow">En pocas palabras</span><p>${summary}</p></section>

            <section class="guide-block pro-block" id="contexto">
              <div class="pro-section-heading"><div><span class="eyebrow">Conoce el destino</span><h2>Historia e identidad</h2></div><span class="pro-section-index">01</span></div>
              <div class="prose pro-prose">${history}</div>
            </section>

            ${highlights?`<section class="guide-block pro-block" id="imperdibles"><div class="pro-section-heading"><div><span class="eyebrow">Qué ver y hacer</span><h2>Experiencias imperdibles</h2></div><span class="pro-section-index">02</span></div><div class="pro-highlight-list">${highlights}</div></section>`:''}

            <section class="guide-block pro-block" id="datos">
              <div class="pro-section-heading"><div><span class="eyebrow">De un vistazo</span><h2>Datos útiles</h2></div><span class="pro-section-index">${highlights?'03':'02'}</span></div>
              <div class="pro-facts-grid">${facts||'<div class="pro-fact"><small>Información</small><strong>Consulta la planificación y fuentes oficiales antes de viajar.</strong></div>'}</div>
            </section>

            <section class="guide-block pro-block" id="planifica">
              <div class="pro-section-heading"><div><span class="eyebrow">Organiza tu viaje</span><h2>Planifica tu visita</h2></div><span class="pro-section-index">${highlights?'04':'03'}</span></div>
              <div class="pro-plan-list">${plans}</div>
            </section>

            <section class="guide-block pro-block" id="consejos">
              <div class="pro-tips-box"><div><span class="eyebrow">Consejos ORIGEN</span><h2>Antes de ir</h2><p>Pequeñas decisiones que pueden cambiar completamente la experiencia.</p></div><ol>${tips}</ol></div>
            </section>

            <section class="guide-block pro-block pro-sources-section" id="fuentes">
              <div class="pro-section-heading"><div><span class="eyebrow">Información responsable</span><h2>Fuentes y vigencia</h2></div><span class="pro-section-index">✓</span></div>
              <p>ORIGEN resume información turística para ayudarte a planificar, pero accesos, tarifas, horarios, cierres y condiciones pueden cambiar. Verifica los datos variables en fuentes oficiales antes de viajar.</p>
              <div class="pro-source-grid">${sourceLinks(sources)||'<span class="pro-no-source">Esta ficha utiliza la información base disponible en ORIGEN. Recomendamos complementar con fuentes oficiales del destino.</span>'}</div>
              <div class="pro-reviewed"><span>Última revisión editorial</span><b>Noviembre 2026</b></div>
            </section>
          </main>

          <aside class="pro-guide-aside">
            <div class="panel pro-sticky-card">
              <span class="eyebrow">Tu visita</span><h3>¿Para quién es este destino?</h3><div class="chip-list pro-chip-list">${ideal||'<span>Explorar Chile</span>'}</div>
              <hr>
              <span class="eyebrow">Tip ORIGEN</span><p class="pro-aside-tip">${g.tips?.[0]||'Confirma las condiciones del destino antes de salir.'}</p>
              ${sources[0]?`<a class="pro-official-cta" href="${sources[0].url}" target="_blank" rel="noopener">Revisar información oficial <span>↗</span></a>`:''}
            </div>
          </aside>
        </div>
      </section>`;
  };

  if(location.hash.startsWith('#/lugar/')) route();
})();
