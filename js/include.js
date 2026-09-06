// Simple HTML partial include loader
(function () {
  async function includePartials() {
    const nodes = document.querySelectorAll('[data-include]');
    await Promise.all(Array.from(nodes).map(async (node) => {
      const url = node.getAttribute('data-include');
      try {
        const res = await fetch(url, { cache: 'no-cache' });
        if (!res.ok) throw new Error(`Failed to load ${url}: ${res.status}`);
        const html = await res.text();
        node.outerHTML = html; // replace placeholder with included markup
      } catch (e) {
        console.error(e);
      }
    }));
    document.dispatchEvent(new CustomEvent('partialsLoaded'));
    markActiveNavLink();
  }

  function markActiveNavLink() {
    const current = location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-button').forEach((link) => {
      const href = link.getAttribute('href');
      link.classList.toggle('active', href === current);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', includePartials);
  } else {
    includePartials();
  }
})();
