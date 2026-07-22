// ============================================================
// Jiya Dhiman — Portfolio interactions
// ============================================================

document.addEventListener('DOMContentLoaded', () => {

  // Mobile nav toggle
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      links.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', links.classList.contains('is-open'));
    });
    links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      links.classList.remove('is-open');
    }));
  }

  // Scroll reveal
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const revealTargets = document.querySelectorAll('.reveal, .timeline, .tl-item');

  if (reduceMotion) {
    revealTargets.forEach(el => el.classList.add('is-visible'));
  } else if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

    revealTargets.forEach(el => io.observe(el));
  } else {
    revealTargets.forEach(el => el.classList.add('is-visible'));
  }

  // Typewriter role cycle in hero
  const roleEl = document.querySelector('[data-typewriter]');
  if (roleEl && !reduceMotion) {
    const roles = JSON.parse(roleEl.getAttribute('data-typewriter'));
    let roleIndex = 0, charIndex = 0, deleting = false;
    const textSpan = roleEl.querySelector('.type-text');

    const tick = () => {
      const current = roles[roleIndex];
      if (!deleting) {
        charIndex++;
        textSpan.textContent = current.slice(0, charIndex);
        if (charIndex === current.length) {
          deleting = true;
          setTimeout(tick, 1500);
          return;
        }
      } else {
        charIndex--;
        textSpan.textContent = current.slice(0, charIndex);
        if (charIndex === 0) {
          deleting = false;
          roleIndex = (roleIndex + 1) % roles.length;
        }
      }
      setTimeout(tick, deleting ? 35 : 65);
    };
    tick();
  } else if (roleEl) {
    const roles = JSON.parse(roleEl.getAttribute('data-typewriter'));
    roleEl.querySelector('.type-text').textContent = roles[0];
  }

  // Active nav link highlight (index page sections)
  const sections = document.querySelectorAll('main section[id], header[id]');
  const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');
  if (sections.length && navAnchors.length && 'IntersectionObserver' in window) {
    const navIo = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navAnchors.forEach(a => a.classList.remove('is-active'));
          const match = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
          if (match) match.classList.add('is-active');
        }
      });
    }, { threshold: 0.5 });
    sections.forEach(s => navIo.observe(s));
  }
});