/* =========================================================
   PORTAFOLIO PROFESIONAL — Santiago Pabón Molina
   JavaScript Modular & Nativo (Vanilla ES6+)
   Módulos:
   1. Barra de Progreso de Lectura (Scroll Progress)
   2. Menú Móvil Accesible
   3. Scroll Suave con Offset de Navbar
   4. Animaciones Scroll Reveal (Intersection Observer)
   5. Spotlight Hover Effect (Luz que sigue el cursor en Cards)
   6. Tilt 3D Interactivo en Avatar de Perfil
   7. Filtrado Interactivo de Proyectos
   8. Copiado de Comandos Git y Enlaces de Repositorios
   9. Modo Oscuro con LocalStorage & Meta Theme Color
   10. Copiado de Correo con Tooltip Visual
   11. Botón Compartir Portafolio
   12. Formulario Directo (Conversión a WhatsApp)
   13. Botón Volver Arriba & Año Dinámico
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- 1. BARRA DE PROGRESO DE LECTURA (SCROLL PROGRESS) ---------- */
  const scrollProgressBar = document.getElementById('scrollProgressBar');

  const updateScrollProgress = () => {
    if (!scrollProgressBar) return;
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    scrollProgressBar.style.width = `${Math.min(scrollPercent, 100)}%`;
  };

  window.addEventListener('scroll', updateScrollProgress, { passive: true });
  updateScrollProgress();

  /* ---------- 2. MENÚ MÓVIL ACCESIBLE ---------- */
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  if (hamburger && navLinks) {
    const toggleMenu = () => {
      const isOpen = navLinks.classList.toggle('is-open');
      hamburger.classList.toggle('is-active');
      hamburger.setAttribute('aria-expanded', String(isOpen));
    };

    const closeMenu = () => {
      navLinks.classList.remove('is-open');
      hamburger.classList.remove('is-active');
      hamburger.setAttribute('aria-expanded', 'false');
    };

    hamburger.addEventListener('click', toggleMenu);

    // Cierra el menú al hacer clic en cualquier enlace
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', closeMenu);
    });

    // Cierra el menú al hacer clic fuera del header
    document.addEventListener('click', (e) => {
      if (!navLinks.contains(e.target) && !hamburger.contains(e.target) && navLinks.classList.contains('is-open')) {
        closeMenu();
      }
    });
  }

  /* ---------- 3. SCROLL SUAVE CON OFFSET ---------- */
  const navbar = document.getElementById('navbar');
  const getNavOffset = () => (navbar ? navbar.offsetHeight : 72);

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
        const offsetPosition = elementPosition - getNavOffset() + 2;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  /* ---------- 4. ANIMACIONES SCROLL REVEAL (INTERSECTION OBSERVER) ---------- */
  const animatedItems = document.querySelectorAll('.fade-up');

  if ('IntersectionObserver' in window && animatedItems.length > 0) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    });

    animatedItems.forEach(item => revealObserver.observe(item));
  } else {
    animatedItems.forEach(item => item.classList.add('is-visible'));
  }

  /* ---------- 5. SPOTLIGHT HOVER EFFECT (Luz interactiva en tarjetas) ---------- */
  const spotlightCards = document.querySelectorAll('.interactive-spotlight');

  spotlightCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });

  /* ---------- 6. TILT 3D INTERACTIVO EN AVATAR CARD ---------- */
  const avatarCard = document.getElementById('avatarCard');

  if (avatarCard && window.matchMedia('(hover: hover)').matches) {
    avatarCard.addEventListener('mousemove', (e) => {
      const rect = avatarCard.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const rotateX = ((e.clientY - centerY) / (rect.height / 2)) * -9;
      const rotateY = ((e.clientX - centerX) / (rect.width / 2)) * 9;

      avatarCard.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px) scale(1.02)`;
    });

    avatarCard.addEventListener('mouseleave', () => {
      avatarCard.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) translateY(0) scale(1)';
    });
  }

  /* ---------- 7. FILTRADO INTERACTIVO DE PROYECTOS ---------- */
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('#projectsContainer .project-card');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const selectedFilter = btn.getAttribute('data-filter');

      // Actualizar estado de los botones
      filterButtons.forEach(b => {
        b.classList.remove('is-active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('is-active');
      btn.setAttribute('aria-selected', 'true');

      // Filtrar las tarjetas de proyectos con microanimación
      projectCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');

        if (selectedFilter === 'all' || cardCategory === selectedFilter) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0) scale(1)';
          }, 40);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(12px) scale(0.97)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 240);
        }
      });
    });
  });

  /* ---------- 8. COPIADO DE COMANDOS GIT CLONE EN PROYECTOS ---------- */
  const copyRepoButtons = document.querySelectorAll('.copy-repo-btn');

  copyRepoButtons.forEach(btn => {
    btn.addEventListener('click', async () => {
      const repoUrl = btn.getAttribute('data-repo');
      const gitCommand = `git clone ${repoUrl}`;

      try {
        await navigator.clipboard.writeText(gitCommand);
        const originalHtml = btn.innerHTML;
        btn.innerHTML = `<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg><span>¡Copiado!</span>`;
        btn.style.color = '#2563EB';
        btn.style.borderColor = '#2563EB';

        setTimeout(() => {
          btn.innerHTML = originalHtml;
          btn.style.color = '';
          btn.style.borderColor = '';
        }, 2200);
      } catch (err) {
        // Fallback
        window.open(repoUrl, '_blank');
      }
    });
  });

  /* ---------- 9. MODO OSCURO CON LOCALSTORAGE & META THEME COLOR ---------- */
  const themeToggle = document.getElementById('themeToggle');
  const THEME_STORAGE_KEY = 'santiago-portfolio-theme';

  const applyTheme = (theme) => {
    const isDark = theme === 'dark';
    document.body.classList.toggle('dark-mode', isDark);
    if (themeToggle) {
      themeToggle.setAttribute('aria-label', isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro');
    }
    const metaThemeColor = document.getElementById('metaThemeColor');
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', isDark ? '#0E1114' : '#FAF8F5');
    }
  };

  // Inicializar según preferencia guardada o sistema operativo
  const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  applyTheme(savedTheme || (systemPrefersDark ? 'dark' : 'light'));

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentDark = document.body.classList.contains('dark-mode');
      const newTheme = currentDark ? 'light' : 'dark';
      applyTheme(newTheme);
      localStorage.setItem(THEME_STORAGE_KEY, newTheme);
    });
  }

  // Escuchar cambios en la preferencia del sistema operativo en tiempo real
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem(THEME_STORAGE_KEY)) {
      applyTheme(e.matches ? 'dark' : 'light');
    }
  });

  /* ---------- 10. COPIADO DE CORREO CON FEEDBACK VISUAL ---------- */
  const copyEmailBtn = document.getElementById('copyEmailBtn');
  const copyTooltip = document.getElementById('copyTooltip');
  const emailAddress = 'santy122324@gmail.com';

  if (copyEmailBtn && copyTooltip) {
    copyEmailBtn.addEventListener('click', async (e) => {
      e.preventDefault();
      try {
        await navigator.clipboard.writeText(emailAddress);
        copyTooltip.classList.add('is-active');
        copyTooltip.textContent = '¡Copiado!';

        setTimeout(() => {
          copyTooltip.classList.remove('is-active');
        }, 2200);
      } catch (err) {
        window.location.href = `mailto:${emailAddress}`;
      }
    });
  }

  /* ---------- 11. BOTÓN COMPARTIR PORTAFOLIO ---------- */
  const sharePortfolioBtn = document.getElementById('sharePortfolioBtn');
  const shareBtnText = document.getElementById('shareBtnText');

  if (sharePortfolioBtn) {
    sharePortfolioBtn.addEventListener('click', async () => {
      const shareData = {
        title: 'Santiago Pabón Molina · Portafolio',
        text: 'Echa un vistazo al portafolio profesional de Santiago Pabón Molina, desarrollador Full Stack especializado en backend y automatización.',
        url: window.location.href
      };

      if (navigator.share && window.matchMedia('(max-width: 768px)').matches) {
        try {
          await navigator.share(shareData);
        } catch (err) {
          // usuario canceló
        }
      } else {
        try {
          await navigator.clipboard.writeText(window.location.href);
          if (shareBtnText) {
            const original = shareBtnText.textContent;
            shareBtnText.textContent = '¡Enlace Copiado!';
            setTimeout(() => {
              shareBtnText.textContent = original;
            }, 2400);
          }
        } catch (err) {
          // ignore
        }
      }
    });
  }

  /* ---------- 12. FORMULARIO DIRECTO (CONVERSIÓN A WHATSAPP) ---------- */
  const quickContactForm = document.getElementById('quickContactForm');

  if (quickContactForm) {
    quickContactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('contactName');
      const emailInput = document.getElementById('contactEmail');
      const messageInput = document.getElementById('contactMessage');

      const name = nameInput ? nameInput.value.trim() : '';
      const email = emailInput ? emailInput.value.trim() : '';
      const message = messageInput ? messageInput.value.trim() : '';

      if (!name || !message) return;

      // Mensaje estructurado para WhatsApp
      const whatsappText = `Hola Santiago, mi nombre es ${name} (${email}). Te contacto desde tu portafolio web:%0A%0A"${message}"`;
      const whatsappUrl = `https://wa.me/573154189394?text=${whatsappText}`;

      // Abrir WhatsApp en nueva pestaña
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');

      // Retroalimentación visual
      const submitBtn = document.getElementById('submitContactBtn');
      if (submitBtn) {
        const originalHtml = submitBtn.innerHTML;
        submitBtn.innerHTML = `<span>¡Abriendo WhatsApp...!</span>`;
        submitBtn.style.backgroundColor = '#128C7E';

        setTimeout(() => {
          submitBtn.innerHTML = originalHtml;
          submitBtn.style.backgroundColor = '';
          quickContactForm.reset();
        }, 3000);
      }
    });
  }

  /* ---------- 13. BOTÓN VOLVER ARRIBA & AÑO DINÁMICO ---------- */
  const backToTopBtn = document.getElementById('backToTop');

  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 420) {
        backToTopBtn.classList.add('is-visible');
      } else {
        backToTopBtn.classList.remove('is-visible');
      }
    }, { passive: true });

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  const yearElement = document.getElementById('year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

});
