/* =========================================================
   PORTFOLIO — Santiago Pabón
   JavaScript puro (sin librerías).
   Módulos: menú móvil, scroll suave, volver arriba,
   animaciones on-scroll (Intersection Observer) y modo oscuro.
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- 1. MENÚ HAMBURGUESA ---------- */
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  const closeMenu = () => {
    navLinks.classList.remove('is-open');
    hamburger.classList.remove('is-active');
    hamburger.setAttribute('aria-expanded', 'false');
  };

  hamburger.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('is-open');
    hamburger.classList.toggle('is-active');
    hamburger.setAttribute('aria-expanded', String(isOpen));
  });

  // Cierra el menú al elegir una sección (mejora la UX en móvil)
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  /* ---------- 2. SCROLL SUAVE ---------- */
  // El CSS (scroll-behavior: smooth) ya cubre la navegación básica.
  // Aquí compensamos el alto del navbar fijo para que el título
  // de la sección no quede tapado.
  const navbarHeight = document.getElementById('navbar').offsetHeight;

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - navbarHeight + 1;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  /* ---------- 3. BOTÓN VOLVER ARRIBA ---------- */
  const backToTop = document.getElementById('backToTop');

  window.addEventListener('scroll', () => {
    backToTop.classList.toggle('is-visible', window.scrollY > 480);
  });

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ---------- 4. ANIMACIONES AL HACER SCROLL ---------- */
  // Cada elemento con la clase .fade-up se revela cuando entra al viewport.
  const animatedItems = document.querySelectorAll('.fade-up');

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target); // se anima una sola vez
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  animatedItems.forEach(item => revealObserver.observe(item));

  /* ---------- 5. MODO OSCURO CON LOCALSTORAGE ---------- */
  const themeToggle = document.getElementById('themeToggle');
  const STORAGE_KEY = 'santiago-portfolio-theme';

  const applyTheme = (theme) => {
    document.body.classList.toggle('dark-mode', theme === 'dark');
  };

  // Carga la preferencia guardada, o respeta el sistema si no hay ninguna.
  const savedTheme = localStorage.getItem(STORAGE_KEY);
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  applyTheme(savedTheme || (prefersDark ? 'dark' : 'light'));

  themeToggle.addEventListener('click', () => {
    const isDark = document.body.classList.contains('dark-mode');
    const nextTheme = isDark ? 'light' : 'dark';
    applyTheme(nextTheme);
    localStorage.setItem(STORAGE_KEY, nextTheme);
  });

  /* ---------- 6. AÑO DINÁMICO EN EL FOOTER ---------- */
  document.getElementById('year').textContent = new Date().getFullYear();

});
