/* Progressive motion and navigation polish; the existing routers stay in charge. */
(() => {
  'use strict';

  const app = document.querySelector('#app');
  const nav = document.querySelector('#nav');
  const menu = document.querySelector('#menu');
  if (!app) return;

  const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
  const revealed = new WeakSet();
  const entered = new WeakSet();
  const pendingRoots = new Set();
  const revealSelector = [
    '[data-reveal]', '.hero-grid > div', '.chile-intro-grid > div',
    '.card', '.guide-block', '.guide-card', '.info-card', '.panel',
    '.planner-panel', '.suite-card', '.suite-kpi', '.passport-panel',
    '.passport-gallery-card', '.passport-stamp', '.service-card', '.shop-card'
  ].join(',');
  let intersectionObserver = null;
  let frame = 0;

  function show(element) {
    element.classList.add('is-visible');
    intersectionObserver?.unobserve(element);
  }

  function updateMotionPreference() {
    const reduced = motionPreference.matches;
    document.documentElement.dataset.motion = reduced ? 'reduced' : 'full';
    if (reduced) {
      intersectionObserver?.disconnect();
      app.querySelectorAll('.reveal-ready').forEach(show);
      app.querySelectorAll('.route-enter').forEach(element => {
        element.classList.remove('route-enter');
      });
      return;
    }
    if (!intersectionObserver && 'IntersectionObserver' in window) {
      try {
        intersectionObserver = new IntersectionObserver(entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting) show(entry.target);
          });
        }, { threshold: 0, rootMargin: '0px 0px -24px 0px' });
      } catch (_) {
        // Without an observer, leave all content in its normal visible state.
      }
    }
  }

  function revealContent(root) {
    if (motionPreference.matches || !intersectionObserver) return;
    const candidates = [...root.querySelectorAll(revealSelector)];
    if (root.matches(revealSelector)) candidates.unshift(root);
    candidates.forEach((element, index) => {
      if (revealed.has(element)) return;
      revealed.add(element);
      // A block and its children must never fade independently at the same time.
      if (element.parentElement?.closest(revealSelector)) return;
      try {
        intersectionObserver.observe(element);
        element.style.setProperty('--reveal-delay', `${Math.min(index % 4, 3) * 45}ms`);
        element.classList.add('reveal-ready');
      } catch (_) {
        element.classList.remove('reveal-ready');
      }
    });
  }

  function queueRoot(root) {
    if (!(root instanceof HTMLElement)) return;
    pendingRoots.add(root);
    if (frame) cancelAnimationFrame(frame);
    // Coalesce the independent routers' synchronous and deferred DOM updates.
    frame = requestAnimationFrame(() => {
      frame = requestAnimationFrame(() => {
        frame = 0;
        pendingRoots.forEach(element => {
          if (element.parentElement !== app) return;
          if (!motionPreference.matches && !entered.has(element) &&
              !element.classList.contains('guide-loading')) {
            entered.add(element);
            element.classList.add('route-enter');
          }
          revealContent(element);
        });
        pendingRoots.clear();
        syncNavigation();
      });
    });
  }

  function routePath(hash) {
    return (hash || '#/').split('?')[0].replace(/\/$/, '') || '#';
  }

  function syncMenu() {
    if (!menu || !nav) return;
    menu.setAttribute('aria-controls', nav.id);
    menu.setAttribute('aria-expanded', String(nav.classList.contains('open')));
  }

  function closeMenu(returnFocus = false) {
    if (!nav?.classList.contains('open')) return;
    nav.classList.remove('open');
    syncMenu();
    if (returnFocus) menu?.focus();
  }

  function syncNavigation() {
    const current = routePath(location.hash);
    const parent = current.startsWith('#/volcan/') ? '#/volcanes' :
      current.startsWith('#/lugar/') ? '#/explorar' : null;
    document.querySelectorAll('header a[href^="#/"]').forEach(link => {
      const target = routePath(link.getAttribute('href'));
      const state = target === current ? 'page' : target === parent ? 'location' : null;
      if (state) link.setAttribute('aria-current', state);
      else link.removeAttribute('aria-current');
    });
    syncMenu();
  }

  updateMotionPreference();
  if (motionPreference.addEventListener) {
    motionPreference.addEventListener('change', updateMotionPreference);
  } else {
    motionPreference.addListener(updateMotionPreference);
  }

  // Watch only route-level replacements. Filtering cards cannot replay the page.
  new MutationObserver(records => {
    records.forEach(record => record.addedNodes.forEach(queueRoot));
  }).observe(app, { childList: true });
  [...app.children].forEach(queueRoot);

  if (nav) {
    new MutationObserver(syncNavigation).observe(nav, {
      childList: true, subtree: true, attributes: true, attributeFilter: ['class']
    });
  }
  menu?.addEventListener('click', () => queueMicrotask(syncMenu));
  window.addEventListener('hashchange', () => {
    closeMenu();
    syncNavigation();
  });
  document.addEventListener('click', event => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    if (event.target instanceof Element && event.target.closest('a[href^="#/"]')) {
      closeMenu();
    }
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') closeMenu(true);
  });
  app.addEventListener('focusin', event => {
    // Keyboard users can reach content before its scroll reveal has fired.
    let element = event.target instanceof Element ? event.target : null;
    while (element && element !== app) {
      if (element.classList.contains('reveal-ready')) show(element);
      element = element.parentElement;
    }
  });
  app.addEventListener('animationend', event => {
    if (event.target instanceof Element && event.target.classList.contains('route-enter')) {
      event.target.classList.remove('route-enter');
    }
  });
  syncNavigation();
})();
