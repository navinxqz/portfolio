// NAV SCROLL
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

// HAMBURGER
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobile-nav');
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileNav.classList.toggle('open');
});
document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileNav.classList.remove('open');
  });
});

// SCROLL ANIMATIONS
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.08 });

document.querySelectorAll('.fade-in, .timeline-item, .edu-card, .project-card, .skill-category, .pub-item, .ach-card, .gallery-item, .artwork-card, .cert-card').forEach(el => {
  observer.observe(el);
});

// Staggered delays for grids
document.querySelectorAll('.project-card').forEach((card, i) => {
  card.style.transitionDelay = `${i * 0.07}s`;
});
document.querySelectorAll('.ach-card').forEach((card, i) => {
  card.style.transitionDelay = `${i * 0.06}s`;
});
document.querySelectorAll('.skill-category').forEach((cat, i) => {
  cat.style.transitionDelay = `${i * 0.08}s`;
});
document.querySelectorAll('.pub-item').forEach((item, i) => {
  item.style.transitionDelay = `${i * 0.07}s`;
});
document.querySelectorAll('.gallery-item').forEach((item, i) => {
  item.style.transitionDelay = `${Math.min(i * 0.04, 0.8)}s`;
});
document.querySelectorAll('.artwork-card').forEach((item, i) => {
  item.style.transitionDelay = `${i * 0.08}s`;
});
document.querySelectorAll('.cert-card').forEach((item, i) => {
  item.style.transitionDelay = `${i * 0.06}s`;
});

// HERO AND PAGE INTERACTION
const heroSection = document.getElementById('hero');
const heroPhotoWrapper = document.querySelector('.hero-photo-wrapper');
const pointerBubble = document.createElement('div');
pointerBubble.className = 'pointer-bubble';
document.body.appendChild(pointerBubble);

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const finePointer = window.matchMedia('(pointer: fine)');
let pointerRafId = 0;
let latestPointerEvent = null;

const setHeroDefaults = () => {
  if (heroSection) {
    heroSection.style.setProperty('--hero-spot-x', '38%');
    heroSection.style.setProperty('--hero-spot-y', '28%');
  }
  if (heroPhotoWrapper) {
    heroPhotoWrapper.style.setProperty('--hero-glow-x', '50%');
    heroPhotoWrapper.style.setProperty('--hero-glow-y', '40%');
  }
};

const updatePointerEffects = () => {
  pointerRafId = 0;
  if (!latestPointerEvent) {
    return;
  }

  const event = latestPointerEvent;
  pointerBubble.style.setProperty('--page-pointer-x', `${event.clientX}px`);
  pointerBubble.style.setProperty('--page-pointer-y', `${event.clientY}px`);
  pointerBubble.classList.add('is-active');

  if (heroSection) {
    const heroRect = heroSection.getBoundingClientRect();
    const withinHero = event.clientX >= heroRect.left && event.clientX <= heroRect.right && event.clientY >= heroRect.top && event.clientY <= heroRect.bottom;

    if (withinHero) {
      const heroX = ((event.clientX - heroRect.left) / heroRect.width) * 100;
      const heroY = ((event.clientY - heroRect.top) / heroRect.height) * 100;
      heroSection.style.setProperty('--hero-spot-x', `${Math.max(0, Math.min(100, heroX))}%`);
      heroSection.style.setProperty('--hero-spot-y', `${Math.max(0, Math.min(100, heroY))}%`);

      if (heroPhotoWrapper) {
        const rect = heroPhotoWrapper.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width) * 100;
        const y = ((event.clientY - rect.top) / rect.height) * 100;
        heroPhotoWrapper.style.setProperty('--hero-glow-x', `${Math.max(0, Math.min(100, x))}%`);
        heroPhotoWrapper.style.setProperty('--hero-glow-y', `${Math.max(0, Math.min(100, y))}%`);
      }
    } else {
      setHeroDefaults();
    }
  }
};

const onPointerMove = (event) => {
  if (prefersReducedMotion.matches || !finePointer.matches) {
    return;
  }
  latestPointerEvent = event;
  if (!pointerRafId) {
    pointerRafId = window.requestAnimationFrame(updatePointerEffects);
  }
};

const resetPointerEffects = () => {
  latestPointerEvent = null;
  pointerBubble.classList.remove('is-active');
  pointerBubble.style.setProperty('--page-pointer-x', '50vw');
  pointerBubble.style.setProperty('--page-pointer-y', '34vh');
  setHeroDefaults();
};

if (!prefersReducedMotion.matches && finePointer.matches) {
  document.addEventListener('pointermove', onPointerMove, { passive: true });
  window.addEventListener('blur', resetPointerEffects);
  document.addEventListener('mouseleave', resetPointerEffects);
  setHeroDefaults();
}

// ASCII ART LOAD
const asciiArtOutput = document.getElementById('ascii-art-output');
if (asciiArtOutput) {
  fetch('./ascii-art.txt')
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to load ascii-art.txt');
      }
      return response.text();
    })
    .then(text => {
      asciiArtOutput.textContent = text;
    })
    .catch(() => {
      asciiArtOutput.textContent = 'ASCII portrait unavailable.';
    });
}

// LIGHTBOX
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxClose = document.getElementById('lightbox-close');

function openLightbox(src) {
  lightboxImg.src = src;
  lightbox.classList.add('active');
  document.body.style.overflow = 'hidden';
}
function closeLightbox() {
  lightbox.classList.remove('active');
  document.body.style.overflow = '';
}

// Attach to gallery items, artwork cards, cert cards
document.querySelectorAll('.gallery-item, .artwork-card').forEach(item => {
  item.addEventListener('click', () => {
    const img = item.querySelector('img');
    if (img) openLightbox(img.src);
  });
});
document.querySelectorAll('.cert-card').forEach(card => {
  const img = card.querySelector('img');
  if (img) {
    card.addEventListener('click', (e) => {
      e.stopPropagation();
      openLightbox(img.src);
    });
  }
});

lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox || e.target === lightboxClose) closeLightbox();
});
lightboxClose.addEventListener('click', closeLightbox);
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeLightbox();
});

// CONTACT FORM
document.getElementById('cf-send').addEventListener('click', () => {
  const name = document.getElementById('cf-name').value.trim();
  const email = document.getElementById('cf-email').value.trim();
  const msg = document.getElementById('cf-message').value.trim();
  if (!name || !email || !msg) {
    alert('Please fill in name, email, and message.');
    return;
  }
  const subject = document.getElementById('cf-subject').value.trim() || 'Portfolio Contact';
  const body = `Hi Navin,\n\n${msg}\n\nFrom: ${name} (${email})`;
  window.location.href = `mailto:navinmdnawshin@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  document.getElementById('form-success').style.display = 'block';
  setTimeout(() => document.getElementById('form-success').style.display = 'none', 5000);
});

// Active nav link highlight
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 100) current = sec.getAttribute('id');
  });
  navLinks.forEach(link => {
    link.style.color = link.getAttribute('href') === `#${current}` ? 'var(--sage)' : '';
  });
});
