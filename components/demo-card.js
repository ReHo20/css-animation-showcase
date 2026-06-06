const COPY_SVG = `<svg class="btn__icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><rect x="5" y="5" width="9" height="9" rx="1.5"/><path d="M11 5V3.5A1.5 1.5 0 0 0 9.5 2h-6A1.5 1.5 0 0 0 2 3.5v6A1.5 1.5 0 0 0 3.5 11H5"/></svg>`;
const PAUSE_SVG = `<svg class="btn__icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><rect x="4" y="3" width="3" height="10" rx="1"/><rect x="9" y="3" width="3" height="10" rx="1"/></svg>`;
const PLAY_SVG = `<svg class="btn__icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M5 3.5l8 4.5-8 4.5V3.5z"/></svg>`;

function escapeHtml(string) {
  return string.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

export function createDemoCard(demo) {
  const article = document.createElement('article');
  article.className = 'demo-card';

  const badgeClass = `demo-card__badge--${demo.category}`;
  const previewClass = `demo-card__preview${demo.tall ? ' is-tall' : ''}`;

  article.innerHTML = `
    <header class="demo-card__header">
      <div class="demo-card__meta">
        <h3 class="demo-card__title">${demo.title}</h3>
        <p class="demo-card__description">${demo.description}</p>
      </div>
      <span class="demo-card__badge ${badgeClass}" aria-label="Category: ${demo.category}">${demo.category}</span>
    </header>
    <div class="${previewClass}"></div>
    <footer class="demo-card__footer">
      <code class="demo-card__technique">${demo.technique}</code>
      <div class="demo-card__actions">
        <div class="css-snippet-anchor">
          <button class="btn btn--ghost btn--copy" type="button" aria-label="Show CSS for ${demo.title}">
            ${COPY_SVG} Copy CSS
          </button>
        </div>
        <button class="btn btn--toggle" type="button" aria-pressed="true" aria-label="Toggle animation on/off">
          ${PAUSE_SVG} Animate
        </button>
      </div>
    </footer>
  `;

  const preview = article.querySelector('.demo-card__preview');
  const toggleButton = article.querySelector('.btn--toggle');
  const copyButton = article.querySelector('.btn--copy');
  const snippetAnchor = article.querySelector('.css-snippet-anchor');

  if (typeof demo.render === 'function') demo.render(preview);

  let animationsOn = true;
  toggleButton.addEventListener('click', () => {
    animationsOn = !animationsOn;
    toggleButton.setAttribute('aria-pressed', String(animationsOn));
    preview.classList.toggle('is-paused', !animationsOn);
    toggleButton.innerHTML = animationsOn ? `${PAUSE_SVG} Animate` : `${PLAY_SVG} Animate`;
    if (typeof demo.onToggle === 'function') demo.onToggle(preview, animationsOn);
  });

  let snippetEl = null;

  function closeSnippet() {
    if (snippetEl) { snippetEl.remove(); snippetEl = null; }
  }

  copyButton.addEventListener('click', () => {
    if (snippetEl) { closeSnippet(); return; }
    navigator.clipboard.writeText(demo.cssSnippet).then(() => {
      copyButton.dataset.copied = 'true';
      copyButton.innerHTML = `${COPY_SVG} Copied!`;
      setTimeout(() => { delete copyButton.dataset.copied; copyButton.innerHTML = `${COPY_SVG} Copy CSS`; }, 2000);
    }).catch(() => showSnippetPopover());
  });

  function showSnippetPopover() {
    snippetEl = document.createElement('div');
    snippetEl.className = 'css-snippet';
    snippetEl.setAttribute('role', 'dialog');
    snippetEl.setAttribute('aria-label', `CSS for ${demo.title}`);
    snippetEl.innerHTML = `
      <div class="css-snippet__toolbar">
        <span class="css-snippet__label">CSS · ${demo.title}</span>
        <button class="css-snippet__close" type="button" aria-label="Close snippet">×</button>
      </div>
      <pre><code>${escapeHtml(demo.cssSnippet)}</code></pre>
    `;
    snippetEl.querySelector('.css-snippet__close').addEventListener('click', closeSnippet);
    snippetAnchor.appendChild(snippetEl);
    const onOutsideClick = (event) => {
      if (!snippetEl.contains(event.target) && event.target !== copyButton) {
        closeSnippet();
        document.removeEventListener('click', onOutsideClick);
      }
    };
    setTimeout(() => document.addEventListener('click', onOutsideClick), 0);
  }

  return article;
}
