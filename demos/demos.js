/**
 * Demo configuration.
 * To add a new demo: add one object to this array.
 * Required: id, title, category, description, technique, cssFile, cssSnippet, render
 * Optional: tall (makes preview taller), onToggle (called when animation toggled)
 */
export const demos = [
  {
    id: 'scroll-reveal',
    title: 'Scroll-Driven Reveal',
    category: 'scroll-driven',
    description: 'Cards animate into view as they enter the scroll viewport — no scroll listener, no JS.',
    technique: 'animation-timeline: view()',
    cssFile: 'demos/scroll-reveal.css',
    tall: false,
    cssSnippet: `.reveal-card {
  animation: card-reveal linear both;
  animation-timeline: view(block);
  animation-range: entry 0% cover 28%;
}

@keyframes card-reveal {
  from { opacity: 0; transform: translateY(2.5rem) scale(0.96); filter: blur(4px); }
  to   { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); }
}`,
    render(container) {
      const cards = [
        { tag: 'Design',      title: 'Spatial Hierarchy',  text: 'How layout and scale guide the eye through a composition.' },
        { tag: 'Motion',      title: 'Timing & Easing',    text: 'The personality of an animation lives in its easing curve.' },
        { tag: 'Interaction', title: 'Micro-interactions', text: 'Small moments of feedback that make interfaces feel alive.' },
        { tag: 'Visual',      title: 'Depth & Shadow',     text: 'Elevation and shadow communicate affordance and focus.' },
        { tag: 'Typography',  title: 'Fluid Type Scale',   text: 'A scale that adapts gracefully across every viewport.' },
        { tag: 'Layout',      title: 'Adaptive Grids',     text: 'Layouts that reflow intelligently without breakpoint hacks.' },
      ];
      container.innerHTML = `
        <div class="scroll-reveal-demo">
          <div class="scroll-reveal-viewport">
            ${cards.map((c) => `
              <article class="reveal-card">
                <div class="reveal-card__media"></div>
                <div class="reveal-card__body">
                  <span class="reveal-card__tag">${c.tag}</span>
                  <h4 class="reveal-card__title">${c.title}</h4>
                  <p class="reveal-card__text">${c.text}</p>
                </div>
              </article>
            `).join('')}
          </div>
        </div>`;
    },
  },

  {
    id: 'scroll-progress',
    title: 'Reading Progress',
    category: 'scroll-driven',
    description: 'A progress bar that fills as you scroll through content — scroll-timeline drives the animation.',
    technique: 'scroll-timeline + animation-timeline: scroll()',
    cssFile: 'demos/scroll-progress.css',
    tall: false,
    cssSnippet: `.scroll-progress-demo {
  overflow-y: scroll;
  scroll-timeline: --reading-progress block;
}

.scroll-progress-bar {
  transform-origin: left center;
  animation: reading-progress-fill linear;
  animation-timeline: --reading-progress;
}

@keyframes reading-progress-fill {
  from { transform: scaleX(0); }
  to   { transform: scaleX(1); }
}`,
    render(container) {
      const paragraphs = [
        'Modern CSS has evolved far beyond static styling. Today we can create sophisticated, performant animations entirely without JavaScript — animations that respond to scroll position, system preferences, and element state in real time.',
        'Scroll-driven animations represent a paradigm shift. Instead of time-based playback, animations advance proportionally as users scroll — making parallax, reveals, and progress indicators trivial to implement.',
        "The animation-timeline property is the key primitive. Setting it to scroll() or view() links an animation's progress directly to a scroll position, bypassing the main thread entirely.",
        "@starting-style allows us to define an element's appearance before its first render, enabling smooth entry animations from initial insertion into the DOM — no JavaScript needed.",
        'The interpolate-size property finally solves the \"transition to auto height\" problem that developers have wrestled with for years. Height: auto is now a first-class animatable value.',
        'Clip-path morphing creates fluid shape transitions by interpolating between polygon coordinates. Paired with spring easing, this produces physical, organic animations.',
        'The @property at-rule registers custom properties with a type, making them interpolatable by the browser. This unlocks smooth transitions for gradients, which were previously impossible in pure CSS.',
        'prefers-reduced-motion is a user preference, not a nice-to-have. Vestibular disorders affect a significant portion of users. Good animation systems degrade gracefully — always respect it.',
      ];
      container.innerHTML = `
        <div class="scroll-progress-demo">
          <div class="scroll-progress-track"><div class="scroll-progress-bar"></div></div>
          <div class="scroll-progress-header"><span class="scroll-progress-label">Reading progress</span></div>
          <div class="scroll-progress-content">
            ${paragraphs.map((t) => `<p class="scroll-progress-paragraph">${t}</p>`).join('')}
          </div>
        </div>`;
    },
  },

  {
    id: 'clip-morph',
    title: 'Clip-Path Morph',
    category: 'hover',
    description: 'Three different clip-path functions — polygon sweep, circle expand, diagonal triangle — each with spring easing.',
    technique: 'clip-path: polygon() / circle() / triangle()',
    cssFile: 'demos/clip-morph.css',
    tall: true,
    cssSnippet: `/* Card 1 — polygon() sweep */
.morph-card:nth-child(1)::before {
  clip-path: polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%);
  transition: clip-path 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.morph-card:nth-child(1):hover::before {
  clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);
}

/* Card 2 — circle() expand */
.morph-card:nth-child(2)::before {
  clip-path: circle(0% at 50% 85%);
}
.morph-card:nth-child(2):hover::before {
  clip-path: circle(150% at 50% 85%);
}

/* Card 3 — diagonal triangle */
.morph-card:nth-child(3)::before {
  clip-path: polygon(110% -10%, 110% -10%, 110% -10%);
}
.morph-card:nth-child(3):hover::before {
  clip-path: polygon(110% -10%, -10% -10%, 110% 110%);
}`,
    render(container) {
      const cards = [
        { label: 'Brand',  technique: 'polygon()',  title: 'Strategy & Identity',     num: '01', modifier: 'morph-card--1' },
        { label: 'Design', technique: 'circle()',   title: 'Systems & Components',    num: '02', modifier: 'morph-card--2' },
        { label: 'Motion', technique: 'polygon()',  title: 'Animation & Transitions', num: '03', modifier: 'morph-card--3' },
      ];
      container.innerHTML = `
        <div class="clip-morph-demo">
          ${cards.map((c) => `
            <div class="morph-card ${c.modifier}" role="button" tabindex="0" aria-label="${c.label}: ${c.title}">
              <span class="morph-card__number" aria-hidden="true">${c.num}</span>
              <div class="morph-card__body">
                <span class="morph-card__technique">${c.technique}</span>
                <span class="morph-card__label">${c.label}</span>
                <h4 class="morph-card__title">${c.title}</h4>
                <p class="morph-card__desc">Hover to reveal</p>
                <span class="morph-card__arrow" aria-hidden="true">→</span>
              </div>
            </div>
          `).join('')}
        </div>`;
    },
  },

  {
    id: 'aurora',
    title: 'Aurora Gradient',
    category: 'load-enter',
    description: 'Smooth color morphing via @property — custom properties become animatable with a type declaration.',
    technique: '@property + keyframe color interpolation',
    cssFile: 'demos/aurora.css',
    tall: false,
    cssSnippet: `@property --aurora-hue-a {
  syntax: '<number>';
  inherits: false;
  initial-value: 195;
}

.aurora-blob--1 {
  background: radial-gradient(
    circle,
    oklch(68% 0.28 var(--aurora-hue-a) / 0.6),
    transparent 70%
  );
  animation: aurora-shift-hue 10s ease-in-out infinite alternate;
}

@keyframes aurora-shift-hue {
  from { --aurora-hue-a: 195; }
  to   { --aurora-hue-a: 260; }
}`,
    render(container) {
      container.innerHTML = `
        <div class="aurora-demo">
          <div class="aurora-background">
            <div class="aurora-blob aurora-blob--1"></div>
            <div class="aurora-blob aurora-blob--2"></div>
            <div class="aurora-blob aurora-blob--3"></div>
            <div class="aurora-blob aurora-blob--4"></div>
          </div>
          <div class="aurora-content">
            <p class="aurora-eyebrow">Motion Design</p>
            <h2 class="aurora-headline">Design that<br><em>moves</em></h2>
            <p class="aurora-body">Fluid, ambient backgrounds that breathe life into interfaces without competing with content.</p>
            <button class="aurora-cta" type="button">Explore system →</button>
          </div>
        </div>`;
    },
  },

  {
    id: 'stagger-entry',
    title: 'Staggered Entry',
    category: 'load-enter',
    description: 'List items animate in using @starting-style — the browser handles entry transitions from initial insertion.',
    technique: '@starting-style + transition-delay stagger',
    cssFile: 'demos/stagger-entry.css',
    tall: false,
    cssSnippet: `.feature-item {
  opacity: 1;
  transform: translateX(0);
  transition: opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1), transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  transition-delay: calc(var(--item-index) * 80ms);
}

@starting-style {
  .feature-item { opacity: 0; transform: translateX(-1.75rem); }
}`,
    render(container) {
      const features = [
        { icon: '◈', label: 'Scroll-driven animations',            color: 'oklch(74% 0.19 195)' },
        { icon: '◆', label: 'Aurora gradient effects',             color: 'oklch(72% 0.22 308)' },
        { icon: '◉', label: 'Clip-path morphing',                  color: 'oklch(80% 0.17  55)' },
        { icon: '▣', label: 'calc-size() accordion',               color: 'oklch(78% 0.18 142)' },
        { icon: '◎', label: 'Staggered entry with @starting-style', color: 'oklch(74% 0.19 195)' },
        { icon: '◐', label: 'Reading progress bar',                color: 'oklch(72% 0.22 308)' },
        { icon: '●', label: 'View Transitions API',                color: 'oklch(80% 0.17  55)' },
      ];
      function buildList() {
        return `<ul class="feature-list">${features.map((f, i) => `<li class="feature-item" style="--item-index:${i};--item-color:${f.color}"><span class="feature-item__icon" aria-hidden="true">${f.icon}</span><span class="feature-item__label">${f.label}</span><span class="feature-item__check" aria-hidden="true">✓</span></li>`).join('')}</ul>`;
      }
      container.innerHTML = `
        <div class="stagger-demo">
          <div class="stagger-demo__header">
            <h3 class="stagger-demo__title">CSS capabilities</h3>
            <button class="stagger-replay-btn" type="button" aria-label="Replay entry animation">↺ Replay</button>
          </div>
          ${buildList()}
        </div>`;
      container.querySelector('.stagger-replay-btn').addEventListener('click', () => {
        const demo = container.querySelector('.stagger-demo');
        const existing = demo.querySelector('.feature-list');
        if (existing) existing.remove();
        demo.insertAdjacentHTML('beforeend', buildList());
      });
    },
  },

  {
    id: 'accordion',
    title: 'Smooth Accordion',
    category: 'state-change',
    description: 'Height animates to auto using interpolate-size — no max-height hacks, no JavaScript measurements.',
    technique: 'interpolate-size: allow-keywords; height: auto',
    cssFile: 'demos/accordion.css',
    tall: true,
    cssSnippet: `.accordion-demo {
  /* Enables height: auto transitions */
  interpolate-size: allow-keywords;
}

.accordion-body {
  height: 0;
  overflow: hidden;
  transition: height 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.accordion-item.is-open .accordion-body {
  height: auto; /* animates smoothly! */
}`,
    render(container) {
      const items = [
        { question: 'When should we use animation?', answer: 'Animation should serve a purpose: guide attention, provide feedback, or communicate relationships between UI states. Use it when the transition adds meaning — not just polish. Ask yourself: does this help the user understand what just happened?' },
        { question: 'What is prefers-reduced-motion?', answer: 'An OS-level accessibility setting that signals users want less motion. Vestibular disorders affect a significant portion of users — always respect this preference. Provide instant state changes or minimal movement as an alternative. Never make it opt-in.' },
        { question: 'How do scroll-driven animations work?', answer: 'They link animation progress to scroll position instead of time. As users scroll, the animation advances proportionally — creating parallax, reveals, and progress indicators without JavaScript. The browser handles this entirely off the main thread.' },
        { question: 'Can CSS replace JavaScript for animations?', answer: 'For most presentational animations, yes. CSS handles performance-optimised transitions, scroll-linked animations, and state-based changes efficiently. JavaScript is best reserved for logic-driven or highly interactive animations requiring computation.' },
        { question: 'What is @starting-style?', answer: 'A CSS at-rule that defines the style of an element before its very first render. When combined with transitions, this creates smooth entry animations the moment an element is inserted into the DOM — no JavaScript, no class toggling on the next frame.' },
      ];
      container.innerHTML = `
        <div class="accordion-demo">
          <h3 class="accordion-demo__title">Animation FAQ</h3>
          <div class="accordion-list">
            ${items.map((item, i) => `
              <div class="accordion-item" data-index="${i}">
                <button class="accordion-trigger" type="button" aria-expanded="false" aria-controls="accordion-body-${i}">
                  <span class="accordion-trigger__text">${item.question}</span>
                  <svg class="accordion-trigger__icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M4 6l4 4 4-4"/></svg>
                </button>
                <div class="accordion-body" id="accordion-body-${i}" role="region"><p class="accordion-body__text">${item.answer}</p></div>
              </div>`).join('')}
          </div>
        </div>`;
      const accordionItems = container.querySelectorAll('.accordion-item');
      accordionItems.forEach((item) => {
        item.querySelector('.accordion-trigger').addEventListener('click', () => {
          const isOpen = item.classList.contains('is-open');
          accordionItems.forEach((o) => { o.classList.remove('is-open'); o.querySelector('.accordion-trigger').setAttribute('aria-expanded', 'false'); });
          if (!isOpen) { item.classList.add('is-open'); item.querySelector('.accordion-trigger').setAttribute('aria-expanded', 'true'); }
        });
      });
    },
  },
];
