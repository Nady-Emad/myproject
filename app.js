document.addEventListener('DOMContentLoaded', () => {
  const THEME_KEY = 'nady-theme';
  const root = document.documentElement;
  const themeToggle = document.getElementById('theme-toggle');
  const themeText = themeToggle?.querySelector('.theme-toggle__text');
  const navToggle = document.getElementById('nav-toggle');
  const siteNav = document.getElementById('site-nav');
  const header = document.querySelector('.site-header');
  const navLinks = Array.from(document.querySelectorAll('.nav-link'));
  const internalAnchors = Array.from(document.querySelectorAll('a[href^="#"]'));
  const sections = navLinks
    .map((link) => document.querySelector(link.getAttribute('href')))
    .filter(Boolean)
    .sort((firstSection, secondSection) => firstSection.offsetTop - secondSection.offsetTop);
  const revealItems = Array.from(document.querySelectorAll('.reveal'));
  const filterButtons = Array.from(document.querySelectorAll('.filter-chip'));
  const projectCards = Array.from(document.querySelectorAll('.project-card'));
  const certificateCards = Array.from(document.querySelectorAll('#certificates .certificate-card'));
  const syncedCountItems = Array.from(document.querySelectorAll('[data-countup-source]'));
  const countItems = Array.from(document.querySelectorAll('[data-countup]'));
  const lazyImages = Array.from(document.querySelectorAll('img.lazy-media[data-src]'));
  const lightboxTriggers = Array.from(document.querySelectorAll('[data-lightbox-trigger]'));
  const certificateModal = document.getElementById('certificate-modal');
  const certificateModalImage = document.getElementById('certificate-modal-image');
  const certificateModalTitle = document.getElementById('certificate-modal-title');
  const modalCloseControls = Array.from(document.querySelectorAll('[data-modal-close]'));
  const modalCloseButton = document.getElementById('certificate-modal-close');
  const backToTop = document.getElementById('back-to-top');
  const copyEmailButton = document.getElementById('copy-email');
  const contactLinks = Array.from(document.querySelectorAll('[data-contact-link]'));
  const externalLinkButtons = Array.from(document.querySelectorAll('[data-open-link]'));
  const contactForm = document.getElementById('contact-form');
  const toast = document.getElementById('toast');
  const themeColor = document.querySelector('meta[name="theme-color"]');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const mobileNavMedia = window.matchMedia('(max-width: 768px)');
  let toastTimeoutId = null;
  let modalRestoreFocus = null;

  const countSources = {
    projects: document.querySelectorAll('[data-project-card]').length,
    certificates: certificateCards.length
  };

  syncedCountItems.forEach((item) => {
    const source = item.dataset.countupSource;
    const value = countSources[source];

    if (typeof value === 'number') {
      item.dataset.countup = String(value);
    }
  });

  const updateThemeButton = (theme) => {
    if (!themeToggle) {
      return;
    }

    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    themeToggle.setAttribute('aria-label', `Switch to ${nextTheme} theme`);
    themeToggle.setAttribute('aria-pressed', String(theme === 'dark'));

    if (themeText) {
      themeText.textContent = theme === 'dark' ? 'Dark' : 'Light';
    }
  };

  const updateThemeColor = (theme) => {
    if (themeColor) {
      themeColor.setAttribute('content', theme === 'dark' ? '#07111f' : '#edf7fb');
    }
  };

  const applyTheme = (theme, persist = true) => {
    root.dataset.theme = theme;
    updateThemeButton(theme);
    updateThemeColor(theme);

    if (persist) {
      localStorage.setItem(THEME_KEY, theme);
    }
  };

  const savedTheme = localStorage.getItem(THEME_KEY) || 'dark';
  applyTheme(savedTheme, false);

  const setMobileNavState = (isOpen) => {
    if (!siteNav || !navToggle) {
      return;
    }

    siteNav.classList.toggle('is-open', isOpen);
    navToggle.setAttribute('aria-expanded', String(isOpen));
    navToggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
    document.body.classList.toggle('nav-open', isOpen);
  };

  themeToggle?.addEventListener('click', () => {
    const currentTheme = root.dataset.theme === 'light' ? 'light' : 'dark';
    const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(nextTheme);
  });

  const closeMobileNav = () => {
    if (!siteNav || !navToggle) {
      return;
    }

    setMobileNavState(false);
  };

  navToggle?.addEventListener('click', () => {
    if (!siteNav || !mobileNavMedia.matches) {
      return;
    }

    const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
    setMobileNavState(!isExpanded);
  });

  document.addEventListener('click', (event) => {
    if (!siteNav || !navToggle || !mobileNavMedia.matches || !siteNav.classList.contains('is-open')) {
      return;
    }

    if (!(event.target instanceof Element)) {
      return;
    }

    const clickInsideNavPanel = event.target.closest('.nav-list');
    const clickToggle = navToggle.contains(event.target);

    if (!clickInsideNavPanel && !clickToggle) {
      closeMobileNav();
    }
  });

  window.addEventListener('resize', () => {
    if (!mobileNavMedia.matches) {
      closeMobileNav();
    }
  });

  internalAnchors.forEach((anchor) => {
    anchor.addEventListener('click', (event) => {
      const href = anchor.getAttribute('href');

      if (!href || href === '#') {
        return;
      }

      const target = document.querySelector(href);

      if (!target) {
        return;
      }

      event.preventDefault();
      const headerHeight = header?.offsetHeight || 0;
      const offsetTop = target.getBoundingClientRect().top + window.scrollY - headerHeight - 8;
      window.scrollTo({ top: offsetTop, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
      closeMobileNav();
    });
  });

  const setActiveSection = () => {
    const headerHeight = header?.offsetHeight || 0;
    const scanLine = window.scrollY + headerHeight + 160;
    let activeId = sections[0]?.id || '';

    sections.forEach((section) => {
      if (scanLine >= section.offsetTop) {
        activeId = section.id;
      }
    });

    navLinks.forEach((link) => {
      const isActive = link.getAttribute('href') === `#${activeId}`;
      link.classList.toggle('active', isActive);
    });
  };

  const handleScrollState = () => {
    const scrolled = window.scrollY > 18;
    header?.classList.toggle('is-scrolled', scrolled);
    backToTop?.classList.toggle('is-visible', window.scrollY > 520);
    setActiveSection();
  };

  window.addEventListener('scroll', handleScrollState, { passive: true });
  window.addEventListener('load', handleScrollState);
  handleScrollState();

  if (prefersReducedMotion) {
    revealItems.forEach((item) => item.classList.add('is-visible'));
  } else {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.16, rootMargin: '0px 0px -10% 0px' }
    );

    revealItems.forEach((item) => revealObserver.observe(item));
  }

  const animateCount = (element) => {
    const targetValue = Number(element.dataset.countup || 0);

    if (!targetValue) {
      element.textContent = '0';
      return;
    }

    const duration = 1200;
    const start = performance.now();

    const updateFrame = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      element.textContent = String(Math.round(targetValue * eased));

      if (progress < 1) {
        window.requestAnimationFrame(updateFrame);
      } else {
        element.textContent = String(targetValue);
      }
    };

    window.requestAnimationFrame(updateFrame);
  };

  if (prefersReducedMotion) {
    countItems.forEach((item) => {
      item.textContent = item.dataset.countup || '0';
    });
  } else {
    const countObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          animateCount(entry.target);
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.7 }
    );

    countItems.forEach((item) => countObserver.observe(item));
  }

  const loadImage = (image) => {
    const source = image.dataset.src;

    if (!source) {
      return;
    }

    image.src = source;
    image.addEventListener('load', () => image.classList.add('is-loaded'), { once: true });
    image.removeAttribute('data-src');
  };

  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    lazyImages.forEach(loadImage);
  } else {
    const imageObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          loadImage(entry.target);
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: '120px 0px', threshold: 0.01 }
    );

    lazyImages.forEach((image) => imageObserver.observe(image));
  }

  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const filter = button.dataset.filter || 'all';

      filterButtons.forEach((item) => {
        item.classList.toggle('is-active', item === button);
      });

      projectCards.forEach((card) => {
        const categories = (card.dataset.category || '').split(/\s+/).filter(Boolean);
        const shouldShow = filter === 'all' || categories.includes(filter);
        card.hidden = !shouldShow;
      });
    });
  });

  const closeCertificateModal = () => {
    if (!certificateModal || certificateModal.hidden) {
      return;
    }

    certificateModal.classList.remove('is-open');
    document.body.classList.remove('modal-open');

    const finalizeClose = () => {
      certificateModal.hidden = true;

      if (certificateModalImage) {
        certificateModalImage.removeAttribute('src');
        certificateModalImage.alt = '';
      }

      if (modalRestoreFocus instanceof HTMLElement) {
        modalRestoreFocus.focus();
      }

      modalRestoreFocus = null;
    };

    if (prefersReducedMotion) {
      finalizeClose();
    } else {
      window.setTimeout(finalizeClose, 260);
    }
  };

  const openCertificateModal = (trigger) => {
    if (!certificateModal || !certificateModalImage || !certificateModalTitle) {
      return;
    }

    const src = trigger.dataset.lightboxSrc;
    const title = trigger.dataset.lightboxTitle || 'Certificate';
    const alt = trigger.dataset.lightboxAlt || title;

    if (!src) {
      return;
    }

    modalRestoreFocus = document.activeElement;
    certificateModalImage.src = src;
    certificateModalImage.alt = alt;
    certificateModalTitle.textContent = title;
    certificateModal.hidden = false;
    document.body.classList.add('modal-open');

    window.requestAnimationFrame(() => {
      certificateModal.classList.add('is-open');
      modalCloseButton?.focus();
    });
  };

  lightboxTriggers.forEach((trigger) => {
    trigger.addEventListener('click', () => {
      openCertificateModal(trigger);
    });
  });

  modalCloseControls.forEach((control) => {
    control.addEventListener('click', closeCertificateModal);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && siteNav?.classList.contains('is-open')) {
      closeMobileNav();
    }

    if (event.key === 'Escape' && certificateModal && !certificateModal.hidden) {
      closeCertificateModal();
    }
  });

  const showToast = (message) => {
    if (!toast) {
      return;
    }

    toast.textContent = message;
    toast.classList.add('is-visible');

    if (toastTimeoutId) {
      window.clearTimeout(toastTimeoutId);
    }

    toastTimeoutId = window.setTimeout(() => {
      toast.classList.remove('is-visible');
    }, 2400);
  };

  const openLink = (url, label = 'link') => {
    if (!url) {
      return;
    }

    const isSafeExternalUrl = /^https?:\/\//i.test(url);
    const isSafeMailto = /^mailto:/i.test(url);

    if (!isSafeExternalUrl && !isSafeMailto) {
      showToast('Blocked an unsupported link.');
      return;
    }

    if (isSafeMailto) {
      window.location.href = url;
      showToast(`Opening ${label}.`);
      return;
    }

    const openedWindow = window.open(url, '_blank', 'noopener,noreferrer');

    if (openedWindow) {
      openedWindow.opener = null;
    }

    showToast(`Opening ${label}.`);
  };

  window.openLink = openLink;

  externalLinkButtons.forEach((button) => {
    button.addEventListener('click', () => {
      openLink(button.dataset.openLink, button.dataset.linkLabel || 'link');
    });
  });

  contactLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      const href = link.getAttribute('href');

      if (!href) {
        return;
      }

      event.preventDefault();
      openLink(href, link.querySelector('.contact-label')?.textContent || 'contact link');
    });
  });

  copyEmailButton?.addEventListener('click', async () => {
    const email = copyEmailButton.dataset.email;

    if (!email) {
      return;
    }

    try {
      await navigator.clipboard.writeText(email);
      showToast('Email copied to clipboard.');
    } catch (error) {
      window.location.href = `mailto:${email}`;
      showToast('Clipboard unavailable. Opening your email client.');
    }
  });

  const updateFieldValidity = (field) => {
    if (!field) {
      return true;
    }

    const value = field.value.trim();
    const isEmailField = field.type === 'email';
    const isValidEmail = !isEmailField || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    const isValid = Boolean(value) && isValidEmail;

    field.setAttribute('aria-invalid', String(!isValid));
    return isValid;
  };

  contactForm?.querySelectorAll('input, textarea').forEach((field) => {
    field.addEventListener('input', () => updateFieldValidity(field));
    field.addEventListener('blur', () => updateFieldValidity(field));
  });

  contactForm?.addEventListener('submit', (event) => {
    event.preventDefault();

    const nameField = document.getElementById('contact-name');
    const emailField = document.getElementById('contact-email');
    const subjectField = document.getElementById('contact-subject');
    const messageField = document.getElementById('contact-message');
    const fields = [nameField, emailField, subjectField, messageField];
    const allValid = fields.every((field) => updateFieldValidity(field));

    if (!allValid) {
      showToast('Please complete all fields with a valid email address.');
      const firstInvalidField = fields.find((field) => field?.getAttribute('aria-invalid') === 'true');
      firstInvalidField?.focus();
      return;
    }

    const name = nameField.value.trim();
    const email = emailField.value.trim();
    const subject = subjectField.value.trim();
    const message = messageField.value.trim();
    const body =
      `Name: ${name}\n` +
      `Email: ${email}\n` +
      `Subject: ${subject}\n\n` +
      `${message}`;
    const mailtoUrl =
      `mailto:nady240102590@sut.edu.eg?subject=${encodeURIComponent(subject)}` +
      `&body=${encodeURIComponent(body)}`;

    openLink(mailtoUrl, 'email client');
    contactForm.reset();
    fields.forEach((field) => field?.setAttribute('aria-invalid', 'false'));
  });

  backToTop?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
  });
});
