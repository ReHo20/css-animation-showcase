import { demos } from './demos/demos.js';
import { createDemoCard } from './components/demo-card.js';

const CATEGORIES = {
  'scroll-driven': {
    name: 'Scroll-Driven',
    trigger: 'animation-timeline: view() / scroll()',
  },
  'hover': {
    name: 'Hover',
    trigger: ':hover',
  },
  'load-enter': {
    name: 'Load & Enter',
    trigger: '@starting-style / load',
  },
  'state-change': {
    name: 'State Change',
    trigger: 'class toggle / :checked',
  },
};

function initReducedMotionBanner() {
  const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  const banner = document.getElementById('reduced-motion-banner');

  function syncBanner(query) {
    banner.hidden = !query.matches;
  }

  syncBanner(mediaQuery);
  mediaQuery.addEventListener('change', syncBanner);
}

function loadDemoStylesheet(cssFile) {
  if (!cssFile) return;
  if (document.querySelector(`link[href="${cssFile}"]`)) return;

  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = cssFile;
  document.head.appendChild(link);
}

function groupDemosByCategory(demoList) {
  return demoList.reduce((grouped, demo) => {
    if (!grouped[demo.category]) grouped[demo.category] = [];
    grouped[demo.category].push(demo);
    return grouped;
  }, {});
}

function renderDemos() {
  const main = document.getElementById('main');
  main.innerHTML = '';

  const byCategory = groupDemosByCategory(demos);
  let categoryIndex = 0;

  for (const [categoryKey, categoryDemos] of Object.entries(byCategory)) {
    const category = CATEGORIES[categoryKey];
    if (!category) continue;

    categoryDemos.forEach((demo) => loadDemoStylesheet(demo.cssFile));

    categoryIndex += 1;
    const indexLabel = String(categoryIndex).padStart(2, '0');

    const section = document.createElement('section');
    section.className = 'category-section';
    section.setAttribute('aria-labelledby', `category-heading-${categoryKey}`);

    section.innerHTML = `
      <header class="category-section__header">
        <span class="category-section__index" aria-hidden="true">${indexLabel}</span>
        <h2 class="category-section__name" id="category-heading-${categoryKey}">${category.name}</h2>
        <code class="category-section__trigger">${category.trigger}</code>
      </header>
      <div class="demos-grid"></div>
    `;

    const grid = section.querySelector('.demos-grid');
    categoryDemos.forEach((demo) => {
      const card = createDemoCard(demo);
      grid.appendChild(card);
    });

    main.appendChild(section);
  }
}

initReducedMotionBanner();
renderDemos();
