// THEME TOGGLE
const themeToggles = document.querySelectorAll('.theme-toggle');

const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
  document.documentElement.setAttribute('data-theme', 'dark');
}

themeToggles.forEach(themeToggle => {
  const sunIcon = themeToggle.querySelector('.sun-icon');
  const moonIcon = themeToggle.querySelector('.moon-icon');

  if (savedTheme === 'dark') {
    sunIcon.style.display = 'block';
    moonIcon.style.display = 'none';
  } else {
    sunIcon.style.display = 'none';
    moonIcon.style.display = 'block';
  }

  themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const isDark = currentTheme === 'dark';
    
    if (isDark) {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('theme', 'light');
    } else {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    }

    // Update all toggles
    themeToggles.forEach(toggle => {
      const sIcon = toggle.querySelector('.sun-icon');
      const mIcon = toggle.querySelector('.moon-icon');
      if (isDark) {
        sIcon.style.display = 'none';
        mIcon.style.display = 'block';
      } else {
        sIcon.style.display = 'block';
        mIcon.style.display = 'none';
      }
    });
  });
});

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
  navbar.classList.toggle('menu-open');
});
document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileNav.classList.remove('open');
    navbar.classList.remove('menu-open');
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

document.querySelectorAll('.fade-in, .timeline-item, .edu-card, .project-card, .skill-category, .pub-item, .ach-card, .gallery-item, .artwork-card, .cert-card, .volunteering-card, .offer-item').forEach(el => {
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
document.querySelectorAll('.volunteering-card').forEach((card, i) => {
  card.style.transitionDelay = `${i * 0.08}s`;
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
document.querySelectorAll('.cert-card, .volunteering-card').forEach(card => {
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
const navLinks = document.querySelectorAll('.nav-links a, .mobile-link');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 100) current = sec.getAttribute('id');
  });
  navLinks.forEach(link => {
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
});

// Typing effect for Hero Role
const typingText = document.querySelector('.typing-text');
if (typingText) {
  const words = ["Data Analyst", "Researcher", "Digital Artist", "Web Developer", "CSE Undergrad", "Dreamer"];
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function typeEffect() {
    const currentWord = words[wordIndex];
    if (isDeleting) {
      typingText.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typingText.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
    }

    let typeSpeed = isDeleting ? 40 : 80;

    if (!isDeleting && charIndex === currentWord.length) {
      typeSpeed = 2000; // Pause at end of word
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      typeSpeed = 500; // Pause before typing next word
    }

    setTimeout(typeEffect, typeSpeed);
  }
  
  setTimeout(typeEffect, 500); // Initial delay
}

// PROJECT FILTERING
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

if (filterBtns.length > 0) {
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      const filterValue = btn.getAttribute('data-filter').toLowerCase();
      let visibleCount = 0;
      
      projectCards.forEach(card => {
        const projectNameEl = card.querySelector('.project-name');
        if (projectNameEl && projectNameEl.textContent.includes('GitHub')) {
          card.classList.remove('hidden-card');
          setTimeout(() => card.classList.add('visible'), 50);
          return;
        }
        
        const techTags = Array.from(card.querySelectorAll('.tech-tag')).map(tag => tag.textContent.toLowerCase());
        
        if (filterValue === 'all' || techTags.includes(filterValue)) {
          card.classList.remove('hidden-card');
          card.style.transitionDelay = `${visibleCount * 0.07}s`;
          visibleCount++;
          setTimeout(() => card.classList.add('visible'), 50);
        } else {
          card.classList.remove('visible');
          setTimeout(() => {
            if(!card.classList.contains('visible')) {
              card.classList.add('hidden-card');
            }
          }, 500);
        }
      });
    });
  });
}

// OFFERS ACCORDION
document.querySelectorAll('.offer-header').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.parentElement;
    const isActive = item.classList.contains('active');
    document.querySelectorAll('.offer-item').forEach(other => {
      other.classList.remove('active');
    });
    if (!isActive) {
      item.classList.add('active');
    }
  });
});

// SKILLS FILTERING
const skillFilterBtns = document.querySelectorAll('.skills-filter-btn');
const skillCategories = document.querySelectorAll('.skill-category');

if (skillFilterBtns.length > 0) {
  skillFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      skillFilterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      const filterValue = btn.getAttribute('data-skill-filter');
      let delay = 0;
      
      skillCategories.forEach(cat => {
        const group = cat.getAttribute('data-skill-group');
        
        if (filterValue === 'all' || group === filterValue) {
          cat.classList.remove('hidden-skill');
          cat.style.transitionDelay = `${delay * 0.08}s`;
          delay++;
          // Re-trigger visible animation
          cat.classList.remove('visible');
          setTimeout(() => cat.classList.add('visible'), 50);
        } else {
          cat.classList.remove('visible');
          setTimeout(() => {
            if (!cat.classList.contains('visible')) {
              cat.classList.add('hidden-skill');
            }
          }, 400);
        }
      });
    });
  });
}
