/**
 * JGremodelar — Main JavaScript
 * Site Institucional | Portugal
 */

document.addEventListener('DOMContentLoaded', function () {

  // =============================================
  // 1. NAVBAR — Scroll Effect
  // =============================================
  const navbar = document.querySelector('.navbar');
  let lastScroll = 0;

  if (navbar) {
    window.addEventListener('scroll', function () {
      const currentScroll = window.pageYOffset;

      if (currentScroll > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }

      lastScroll = currentScroll;
    });

    // Trigger no load caso já tenha scroll
    if (window.pageYOffset > 50) {
      navbar.classList.add('scrolled');
    }
  }

  // =============================================
  // 2. NAVBAR — Mobile Toggle
  // =============================================
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  const navOverlay = document.querySelector('.nav-overlay');

  function closeMenu() {
    navToggle.classList.remove('active');
    navLinks.classList.remove('open');
    if (navOverlay) navOverlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  function openMenu() {
    navToggle.classList.add('active');
    navLinks.classList.add('open');
    if (navOverlay) navOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  if (navToggle) {
    navToggle.addEventListener('click', function () {
      const isOpen = navLinks.classList.contains('open');
      if (isOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    });
  }

  // Fechar menu ao clicar no overlay
  if (navOverlay) {
    navOverlay.addEventListener('click', closeMenu);
  }

  // Fechar menu ao clicar num link
  if (navLinks) {
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });
  }

  // Fechar menu com a tecla Escape
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && navLinks && navLinks.classList.contains('open')) {
      closeMenu();
    }
  });

  // =============================================
  // 3. SCROLL REVEAL — Animações ao fazer scroll
  // =============================================
  const revealElements = document.querySelectorAll('.reveal');

  if (revealElements.length > 0) {
    const revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(function (el) {
      revealObserver.observe(el);
    });
  }

  // =============================================
  // 4. COUNTER ANIMATION — Hero Stats
  // =============================================
  const statNumbers = document.querySelectorAll('.hero-stat-number');

  if (statNumbers.length > 0) {
    const counterObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          const target = entry.target;
          const finalValue = parseInt(target.getAttribute('data-target'), 10);
          if (isNaN(finalValue)) return;

          let current = 0;
          const duration = 2000;
          const step = Math.ceil(finalValue / 60);

          const counter = setInterval(function () {
            current += step;
            if (current >= finalValue) {
              current = finalValue;
              clearInterval(counter);
            }
            target.textContent = current + (target.getAttribute('data-suffix') || '');
          }, duration / 60);

          counterObserver.unobserve(target);
        }
      });
    }, { threshold: 0.5 });

    statNumbers.forEach(function (el) {
      counterObserver.observe(el);
    });
  }

  // =============================================
  // 5. FORMULÁRIO DE CONTACTO — Validação simples
  // =============================================
  const contactForm = document.querySelector('.contact-form');

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const nome = document.getElementById('nome');
      const email = document.getElementById('email');
      const telefone = document.getElementById('telefone');
      const mensagem = document.getElementById('mensagem');

      // Validação básica
      let valid = true;

      if (nome && nome.value.trim() === '') {
        highlightError(nome);
        valid = false;
      }

      if (email && email.value.trim() === '') {
        highlightError(email);
        valid = false;
      }

      if (mensagem && mensagem.value.trim() === '') {
        highlightError(mensagem);
        valid = false;
      }

      if (!valid) {
        showFormFeedback('Por favor, preencha todos os campos obrigatórios.', 'error');
        return;
      }

      // Se passar na validação, redireciona para WhatsApp com os dados
      const phone = '351912345678'; // Substituir pelo número real
      const text = encodeURIComponent(
        'Olá, JGremodelar! Gostaria de solicitar um orçamento.\n\n' +
        'Nome: ' + nome.value.trim() + '\n' +
        'Email: ' + (email ? email.value.trim() : '') + '\n' +
        'Telefone: ' + (telefone ? telefone.value.trim() : '') + '\n' +
        'Mensagem: ' + (mensagem ? mensagem.value.trim() : '')
      );

      window.open('https://wa.me/' + phone + '?text=' + text, '_blank');
      showFormFeedback('Obrigado pelo seu pedido! Será redirecionado para o WhatsApp.', 'success');
      contactForm.reset();
    });

    function highlightError(input) {
      input.style.borderColor = '#dc2626';
      input.addEventListener('input', function onFix() {
        input.style.borderColor = '';
        input.removeEventListener('input', onFix);
      });
    }

    function showFormFeedback(message, type) {
      const existing = document.querySelector('.form-feedback');
      if (existing) existing.remove();

      const feedback = document.createElement('div');
      feedback.className = 'form-feedback';
      feedback.style.cssText =
        'padding: 0.85rem 1.25rem; border-radius: 6px; margin-bottom: 1.25rem; ' +
        'font-size: 0.92rem; font-weight: 500; ' +
        (type === 'error'
          ? 'background: #fef2f2; color: #dc2626; border: 1px solid #fecaca;'
          : 'background: #f0fdf4; color: #16a34a; border: 1px solid #bbf7d0;');

      feedback.textContent = message;
      contactForm.insertBefore(feedback, contactForm.firstChild);

      setTimeout(function () {
        feedback.style.opacity = '0';
        feedback.style.transition = 'opacity 0.3s ease';
        setTimeout(function () { feedback.remove(); }, 300);
      }, 5000);
    }
  }

  // =============================================
  // 6. ACTIVE NAV LINK — Destacar página atual
  // =============================================
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navAnchors = document.querySelectorAll('.nav-links a');

  navAnchors.forEach(function (link) {
    const href = link.getAttribute('href');
    if (href === currentPage) {
      link.classList.add('active');
    } else if (currentPage === '' || currentPage === 'index.html') {
      if (href === 'index.html' || href === '/') {
        link.classList.add('active');
      }
    }
  });

});