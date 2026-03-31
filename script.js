/* ============================================
   script.js — Ignatius Portfolio

   What's in here:
   1. Modal open / close for project writeups
   2. Active nav link highlighting on scroll
   3. Fade-in animation for project cards on scroll

   You generally won't need to edit this file.
   ============================================ */


/* ── 1. MODAL OPEN / CLOSE ───────────────────

   HOW IT WORKS:
   - Each project card has data-project="N"
   - Clicking the card opens the modal with id="modal-N"
   - The modal closes when you:
       • click the ✕ button
       • click the dark backdrop outside the modal
       • press the Escape key                          */

document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('click', () => {
    const id = card.getAttribute('data-project');
    const modal = document.getElementById(`modal-${id}`);
    if (!modal) return;

    modal.classList.add('is-open');
    document.body.style.overflow = 'hidden'; // prevent page scroll while modal is open
  });
});

// Close when clicking the ✕ button
document.querySelectorAll('.modal-close').forEach(btn => {
  btn.addEventListener('click', () => closeModal(btn.closest('.modal-overlay')));
});

// Close when clicking the dark backdrop (outside the modal box)
document.querySelectorAll('.modal-overlay').forEach(overlay => {
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeModal(overlay); // only if clicking the overlay itself, not the modal
  });
});

// Close with the Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    const open = document.querySelector('.modal-overlay.is-open');
    if (open) closeModal(open);
  }
});

function closeModal(overlay) {
  overlay.classList.remove('is-open');
  document.body.style.overflow = ''; // restore page scroll
}


/* ── 2. ACTIVE NAV LINK ON SCROLL ───────────
   Adds .active class to the nav link for the
   section currently in view.
   Style .nav-links a.active in style.css if you
   want to highlight the current section. */

const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';

  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 80) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});


/* ── 3. FADE-IN PROJECT CARDS ON SCROLL ─────
   Cards animate in when they enter the viewport. */

const cards = document.querySelectorAll('.project-card');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 }
);

cards.forEach(card => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(20px)';
  card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  observer.observe(card);
});

const visibleStyle = document.createElement('style');
visibleStyle.textContent = `.project-card.visible { opacity: 1 !important; transform: translateY(0) !important; }`;
document.head.appendChild(visibleStyle);
