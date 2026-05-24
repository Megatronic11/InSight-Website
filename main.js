/* ── Navbar active state ─────────────────────────────── */
(function setActiveNav() {
  const links = document.querySelectorAll('.navbar__links a');
  const current = location.pathname.split('/').pop() || 'index.html';
  links.forEach(link => {
    const href = link.getAttribute('href').split('/').pop();
    if (href === current) link.classList.add('active');
  });

  // Highlight "The Project" toggle when on a version or project page
  const projectPages = ['v1.html', 'v2.html', 'v3.html'];
  if (projectPages.includes(current)) {
    const dropdownToggle = document.querySelector('.nav-dropdown__toggle');
    if (dropdownToggle) dropdownToggle.classList.add('active');
  }
})();

/* ── Mobile menu toggle ──────────────────────────────── */
const toggle = document.querySelector('.navbar__toggle');
const navLinks = document.querySelector('.navbar__links');
const navDropdown = document.querySelector('.nav-dropdown');

function closeMobileMenu() {
  if (navLinks) navLinks.classList.remove('open');
  if (navDropdown) navDropdown.classList.remove('open');
  if (toggle) toggle.setAttribute('aria-expanded', false);
}

if (toggle && navLinks) {
  toggle.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open);
  });

  // Close on any regular link click (not the dropdown toggle)
  navLinks.querySelectorAll('a:not(.nav-dropdown__toggle)').forEach(link => {
    link.addEventListener('click', () => closeMobileMenu());
  });

  // Close on outside click
  document.addEventListener('click', e => {
    if (!toggle.contains(e.target) && !navLinks.contains(e.target)) {
      closeMobileMenu();
    }
  });
}

/* ── Nav dropdown toggle (mobile only) ──────────────── */
if (navDropdown) {
  const dropdownToggle = navDropdown.querySelector('.nav-dropdown__toggle');
  if (dropdownToggle) {
    dropdownToggle.addEventListener('click', e => {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        navDropdown.classList.toggle('open');
      }
    });
  }
}

/* ── Scroll-triggered fade-in ────────────────────────── */
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

/* ── Sticky navbar shadow on scroll ──────────────────── */
const navbar = document.querySelector('.navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.style.boxShadow = window.scrollY > 8 ? '0 2px 12px rgba(0,0,0,0.10)' : '';
  }, { passive: true });
}
