// Marks the current page's nav link as active. Nav markup is static HTML in each page
// (not JS-included) so it stays visible to crawlers that don't execute JavaScript.
(function () {
  function markActiveNavLink() {
    const current = location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-button').forEach((link) => {
      const href = link.getAttribute('href');
      link.classList.toggle('active', href === current);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', markActiveNavLink);
  } else {
    markActiveNavLink();
  }
})();
