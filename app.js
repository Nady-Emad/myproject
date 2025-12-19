(() => {
  const THEME_KEY = 'theme';
  const root = document.documentElement;

  function applyTheme(theme) {
    if (theme === 'dark') {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    const saved = localStorage.getItem(THEME_KEY);
    const themeToggle = document.getElementById('theme-toggle');
    const darkToggle = document.getElementById('darkToggle');

    if (saved) applyTheme(saved);
    else if (document.body.classList.contains('dark')) localStorage.setItem(THEME_KEY, 'dark');

    if (themeToggle) themeToggle.checked = document.body.classList.contains('dark');

    if (themeToggle) themeToggle.addEventListener('change', (e) => {
      const theme = e.target.checked ? 'dark' : 'light';
      applyTheme(theme);
      localStorage.setItem(THEME_KEY, theme);
      if (darkToggle) darkToggle.textContent = theme === 'dark' ? '☀' : '🌙';
    });

    if (darkToggle) {
      darkToggle.addEventListener('click', () => {
        const isDark = document.body.classList.contains('dark');
        const newTheme = isDark ? 'light' : 'dark';
        applyTheme(newTheme);
        localStorage.setItem(THEME_KEY, newTheme);
        if (themeToggle) themeToggle.checked = newTheme === 'dark';
        darkToggle.textContent = newTheme === 'dark' ? '☀' : '🌙';
      });
    }
  });
})();

document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.querySelectorAll('.l-header .nav a');
  const nav = document.querySelector('.l-header .nav');
  const navToggle = document.getElementById('nav-toggle');
  if (navToggle && nav) {
    navToggle.addEventListener('click', () => {
      const expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!expanded));
      nav.classList.toggle('open');
    });
    navLinks.forEach(a => a.addEventListener('click', () => { if (nav.classList.contains('open')) nav.classList.remove('open'); }));
  }
  const sections = [];
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href && href.startsWith('#')) {
      const target = document.querySelector(href);
      if (target) {
        sections.push({ id: href, el: target, link });

        link.addEventListener('click', (e) => {
          e.preventDefault();
          const t = document.querySelector(href);
          if (!t) return;
          const header = document.querySelector('.l-header');
          const headerHeight = header ? header.getBoundingClientRect().height + 12 : 88;
          const top = t.getBoundingClientRect().top + window.scrollY - headerHeight;
          window.scrollTo({ top, behavior: 'smooth' });
        });
      }
    }
  });

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const id = `#${entry.target.id}`;
      const found = navLinks && Array.from(navLinks).find(a => a.getAttribute('href') === id);
      if (found) {
        if (entry.isIntersecting) {
          found.classList.add('active');
        } else {
          found.classList.remove('active');
        }
      }
    });
  }, { threshold: 0.45 });

  sections.forEach(s => {
    if (!s.el.id) s.el.id = s.id.replace('#','');
    obs.observe(s.el);
  });
});

// Toast Notification Logic
function showToast(message) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.style.display = 'block';
  setTimeout(() => {
    toast.style.display = 'none';
  }, 3000);
}

// Open links with confirmation
function openLink(url, platform) {
  if (confirm(`You will be redirected to ${platform}. Do you want to continue?`)) {
    if (url.startsWith("mailto:") || url.startsWith("tel:") || url.includes("wa.me")) {
      window.location.href = url; 
    } else {
      window.open(url, '_blank', 'noopener,noreferrer'); 
    }
  }
}

// Lazy load images
document.addEventListener('DOMContentLoaded', function() {
  const images = document.querySelectorAll('img');
  images.forEach(img => {
    img.loading = 'lazy';
  });
});

// Vanilla BlurText-like animation (works without React)
(() => {
  const buildKeyframes = (from, steps) => {
    const keys = new Set([...Object.keys(from), ...steps.flatMap(s => Object.keys(s))]);
    const keyframes = [];
    // Build an array of keyframe objects for the Web Animations API
    const stepObjects = [from, ...steps];
    return stepObjects;
  };

  const defaultFrom = (direction) => (direction === 'top' ? { filter: 'blur(10px)', opacity: 0, transform: 'translateY(-50px)' } : { filter: 'blur(10px)', opacity: 0, transform: 'translateY(50px)' });
  const defaultTo = (direction) => [
    { filter: 'blur(5px)', opacity: 0.5, transform: direction === 'top' ? 'translateY(5px)' : 'translateY(-5px)' },
    { filter: 'blur(0px)', opacity: 1, transform: 'translateY(0)' }
  ];

  function animateBlurTextElement(el) {
    const animateBy = el.dataset.animateBy || 'words';
    const delay = Number(el.dataset.delay || 150);
    const direction = el.dataset.direction || 'top';
    const stepDuration = Number(el.dataset.stepDuration || 0.35);
    const easing = el.dataset.easing || 'ease';

    const rawText = el.textContent.trim();
    const segments = animateBy === 'words' ? rawText.split(' ') : rawText.split('');
    el.textContent = '';

    const from = defaultFrom(direction);
    const toSteps = defaultTo(direction);
    const stepCount = toSteps.length + 1;
    const totalDuration = stepDuration * (stepCount - 1) * 1000; // ms

    segments.forEach((seg, idx) => {
      const span = document.createElement('span');
      span.className = 'inline-block blur-segment';
      span.style.display = 'inline-block';
      span.style.willChange = 'transform,filter,opacity';
      span.textContent = seg === ' ' ? '\u00A0' : seg;
      if (animateBy === 'words' && idx < segments.length - 1) span.insertAdjacentText('beforeend', '\u00A0');
      el.appendChild(span);

      const keyframes = [from, ...toSteps];
      const options = {
        duration: totalDuration,
        easing: easing,
        fill: 'forwards',
        delay: (idx * delay)
      };

      // Use the Web Animations API
      const anim = span.animate(keyframes.map(k => {
        // Map transform property to proper CSS
        const frame = Object.assign({}, k);
        if (frame.y !== undefined) {
          frame.transform = `translateY(${frame.y}px)`;
          delete frame.y;
        }
        return frame;
      }), options);

      // When last segment finishes, log completion
      if (idx === segments.length - 1) {
        anim.onfinish = () => {
          // Allow any external handler via data attribute name, otherwise console.log
          const cbName = el.dataset.onComplete;
          if (cbName && typeof window[cbName] === 'function') window[cbName]();
          else console.log('Animation completed!');
        };
      }
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    const els = document.querySelectorAll('.blur-text');
    if (!els.length) return;

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateBlurTextElement(entry.target);
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    els.forEach(el => observer.observe(el));
  });
})();

document.addEventListener('DOMContentLoaded', () => {
  const projectsCount = document.getElementById('projects-count');
  const certificatesCount = document.getElementById('certificates-count');
  const experienceCount = document.getElementById('experience-count');

  const projects = document.querySelectorAll('section[data-aos="fade-up"]#projects .grid .card').length; 
  const certificates = document.querySelectorAll('.cert-marquee img').length / 2;
  const experience = "Beginners";

  let count = 0;
  const interval = setInterval(() => {
    if (count <= projects) projectsCount.textContent = count;
    if (count <= certificates) certificatesCount.textContent = count;

    if (count >= Math.max(projects, certificates)) {
      clearInterval(interval);
      experienceCount.textContent = experience;
    }
    count++;
  }, 100);
});

const backToTop = document.getElementById('back-to-top');
if (backToTop) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      backToTop.style.display = 'block';
    } else {
      backToTop.style.display = 'none';
    }
  });

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}
