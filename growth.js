/* WishingASR growth helpers: copy-ready messages and low-friction sharing. */
(() => {
  const toast = (message) => {
    const node = document.getElementById('growthToast') || document.getElementById('toast');
    if (!node) return;
    node.textContent = message;
    node.classList.add('show');
    window.clearTimeout(toast.timer);
    toast.timer = window.setTimeout(() => node.classList.remove('show'), 2600);
  };
  async function copyText(value) {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(value);
      return;
    }
    const field = document.createElement('textarea');
    field.value = value; field.setAttribute('readonly','');
    field.style.position='fixed'; field.style.opacity='0'; field.style.pointerEvents='none';
    document.body.appendChild(field); field.select();
    const ok = document.execCommand('copy'); field.remove();
    if (!ok) throw new Error('Clipboard unavailable');
  }
  document.addEventListener('click', async (event) => {
    const sample = event.target.closest('[data-copy-text]');
    const link = event.target.closest('.copy-page-link');
    if (!sample && !link) return;
    const button = sample || link;
    const old = button.textContent;
    button.disabled = true;
    try {
      let value = sample ? sample.dataset.copyText : `${location.origin}${location.pathname}`;
      await copyText(value);
      button.textContent = sample ? 'Copied ✓' : 'Link copied ✓';
      toast(sample ? 'Message copied. Make it yours before sending.' : 'WishingASR link copied. Share it with someone.');
    } catch (error) {
      toast('Copy is not available in this browser. Select the text and copy it manually.');
    } finally {
      window.setTimeout(() => { button.textContent = old; button.disabled = false; }, 1800);
    }
  });

  // Live search and language filter for quotes.html
  const quoteSearch = document.getElementById('quoteSearch');
  const quoteLangButtons = typeof document.querySelectorAll === 'function' ? Array.from(document.querySelectorAll('[data-quote-lang]')) : [];
  const quoteCards = typeof document.querySelectorAll === 'function' ? Array.from(document.querySelectorAll('.quote-card')) : [];
  const quoteStatus = document.getElementById('quoteFilterStatus');
  if (quoteCards.length && (quoteSearch || quoteLangButtons.length)) {
    let activeLang = 'all';
    const applyQuoteFilters = () => {
      const q = (quoteSearch ? quoteSearch.value : '').trim().toLocaleLowerCase();
      let visible = 0;
      quoteCards.forEach((card) => {
        const lang = (card.dataset.lang || 'en').toLowerCase();
        const text = card.textContent.toLocaleLowerCase();
        const langMatch = activeLang === 'all' || lang === activeLang;
        const textMatch = !q || text.includes(q);
        const show = langMatch && textMatch;
        card.hidden = !show;
        if (show) visible += 1;
      });
      if (quoteStatus) {
        quoteStatus.textContent = visible
          ? `Showing ${visible} of ${quoteCards.length} original wishes.`
          : 'No wishes match that filter. Try clearing your search or switching to All languages.';
      }
    };
    quoteLangButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        activeLang = btn.dataset.quoteLang || 'all';
        quoteLangButtons.forEach((b) => {
          const isCurrent = b === btn;
          b.classList.toggle('active', isCurrent);
          b.setAttribute('aria-pressed', String(isCurrent));
        });
        applyQuoteFilters();
      });
    });
    if (quoteSearch) {
      quoteSearch.addEventListener('input', applyQuoteFilters);
      quoteSearch.addEventListener('search', applyQuoteFilters);
    }
  }
})();
