/* ============================================
   script.js — Ignatius Portfolio
   ============================================

  Content:
   1. Active nav link highlighting as you scroll
   2. Fade-in animation for project cards on scroll
   ============================================ */


/* ── 1. ACTIVE NAV LINK ON SCROLL ───────────
   Adds an "active" class to the nav link that
   matches the section currently in view.
   You can style .active in style.css if you want
   e.g. a different color for the current section. */

const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let currentSection = '';

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 80; // offset for fixed nav height
    if (window.scrollY >= sectionTop) {
      currentSection = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${currentSection}`) {
      link.classList.add('active');
    }
  });
});


/* ── 2. FADE-IN PROJECT CARDS ON SCROLL ─────
   Each project card fades in when it enters
   the viewport, instead of all at once.
   Uses the IntersectionObserver API — no extra
   libraries needed. */

const cards = document.querySelectorAll('.project-card');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // only animate once
      }
    });
  },
  { threshold: 0.1 } // trigger when 10% of card is visible
);

cards.forEach(card => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(20px)';
  card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  observer.observe(card);
});

// When .visible is added, animate the card in
document.addEventListener('DOMContentLoaded', () => {
  const style = document.createElement('style');
  style.textContent = `.project-card.visible { opacity: 1 !important; transform: translateY(0) !important; }`;
  document.head.appendChild(style);
});
