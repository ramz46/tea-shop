/**
 * CHAI & CO. — Main JavaScript (main.js)
 * Navigation, Preloader, Modals, Toasts, Back-to-Top, Cookie Banner, Scroll Reveal
 */

(function () {
  'use strict';

  // --------------------------------------------------------------------------
  // 1. PRELOADER
  // --------------------------------------------------------------------------
  function initPreloader() {
    const preloader = document.querySelector('.preloader');
    if (!preloader) return;

    const hidePreloader = () => {
      preloader.classList.add('fade-out');
      setTimeout(() => {
        preloader.style.display = 'none';
      }, 500);
    };

    if (document.readyState === 'complete') {
      setTimeout(hidePreloader, 350);
    } else {
      window.addEventListener('load', () => {
        setTimeout(hidePreloader, 350);
      });
      // Safety fallback
      setTimeout(hidePreloader, 1800);
    }
  }

  // --------------------------------------------------------------------------
  // 2. STICKY HEADER & SCROLL BEHAVIOR
  // --------------------------------------------------------------------------
  function initStickyHeader() {
    const header = document.querySelector('.site-header');
    if (!header) return;

    const onScroll = () => {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // initial check
  }

  // --------------------------------------------------------------------------
  // 3. MOBILE NAVIGATION DRAWER
  // --------------------------------------------------------------------------
  function initMobileNav() {
    const hamburger = document.querySelector('.hamburger');
    const drawer = document.querySelector('.mobile-nav-drawer');
    if (!hamburger || !drawer) return;

    let backdrop = document.querySelector('.drawer-backdrop');
    if (!backdrop) {
      backdrop = document.createElement('div');
      backdrop.className = 'drawer-backdrop';
      document.body.appendChild(backdrop);
    }

    const closeBtn = document.querySelector('.drawer-close-btn');

    const openDrawer = () => {
      hamburger.classList.add('active');
      drawer.classList.add('open');
      backdrop.classList.add('active');
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    };

    const closeDrawer = () => {
      hamburger.classList.remove('active');
      drawer.classList.remove('open');
      backdrop.classList.remove('active');
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };

    hamburger.addEventListener('click', (e) => {
      e.stopPropagation();
      if (drawer.classList.contains('open')) {
        closeDrawer();
      } else {
        openDrawer();
      }
    });

    if (closeBtn) {
      closeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        closeDrawer();
      });
    }

    backdrop.addEventListener('click', (e) => {
      e.stopPropagation();
      closeDrawer();
    });

    // Close on navigation link click
    drawer.querySelectorAll('.drawer-nav-link').forEach(link => {
      link.addEventListener('click', closeDrawer);
    });

    // ESC key support
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && drawer.classList.contains('open')) {
        closeDrawer();
      }
    });
  }

  // --------------------------------------------------------------------------
  // 4. BACK TO TOP BUTTON
  // --------------------------------------------------------------------------
  function initBackToTop() {
    const btn = document.querySelector('.back-to-top');
    if (!btn) return;

    window.addEventListener('scroll', () => {
      if (window.scrollY > 350) {
        btn.classList.add('visible');
      } else {
        btn.classList.remove('visible');
      }
    }, { passive: true });

    btn.addEventListener('click', e => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // --------------------------------------------------------------------------
  // 5. TOAST NOTIFICATION SYSTEM
  // --------------------------------------------------------------------------
  function showToast(message, type = 'success', duration = 3500) {
    let container = document.querySelector('.toast-container');
    if (!container) {
      container = document.createElement('div');
      container.className = 'toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;

    let iconClass = 'fa-solid fa-circle-check';
    let title = 'Success';
    if (type === 'error') {
      iconClass = 'fa-solid fa-circle-exclamation';
      title = 'Notice';
    } else if (type === 'info') {
      iconClass = 'fa-solid fa-circle-info';
      title = 'Information';
    }

    toast.innerHTML = `
      <div class="toast-icon"><i class="${iconClass}"></i></div>
      <div class="toast-content">
        <div class="toast-title">${title}</div>
        <div class="toast-message">${message}</div>
      </div>
      <button class="toast-close-btn" style="color:var(--text-light);font-size:0.85rem;" aria-label="Close Notification">
        <i class="fa-solid fa-xmark"></i>
      </button>
    `;

    container.appendChild(toast);

    // Trigger animation
    requestAnimationFrame(() => {
      toast.classList.add('show');
    });

    const removeToast = () => {
      toast.classList.remove('show');
      setTimeout(() => {
        if (toast.parentElement) toast.remove();
      }, 300);
    };

    const closeBtn = toast.querySelector('.toast-close-btn');
    if (closeBtn) closeBtn.addEventListener('click', removeToast);

    setTimeout(removeToast, duration);
  }
  window.showToast = showToast;

  // --------------------------------------------------------------------------
  // 6. GLOBAL MODAL CONTROLLER
  // --------------------------------------------------------------------------
  function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal(modalId) {
    if (modalId) {
      const modal = document.getElementById(modalId);
      if (modal) modal.classList.remove('active');
    } else {
      document.querySelectorAll('.modal-overlay.active').forEach(m => m.classList.remove('active'));
    }
    document.body.style.overflow = '';
  }

  window.openModal = openModal;
  window.closeModal = closeModal;

  function initModals() {
    // Backdrop click and close buttons
    document.addEventListener('click', e => {
      if (e.target.classList.contains('modal-overlay')) {
        closeModal();
      }
      if (e.target.closest('.modal-close-btn') || e.target.closest('[data-modal-close]')) {
        closeModal();
      }
    });

    // ESC key closes any open modal
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') {
        closeModal();
      }
    });
  }

  // --------------------------------------------------------------------------
  // 7. COOKIE CONSENT BANNER
  // --------------------------------------------------------------------------
  function initCookieBanner() {
    const banner = document.querySelector('.cookie-banner');
    if (!banner) return;

    const accepted = localStorage.getItem('chai_cookies_accepted');
    if (accepted) {
      banner.style.display = 'none';
      banner.remove();
      return;
    }

    // Smoothly reveal after user lands
    setTimeout(() => {
      if (document.body.contains(banner)) {
        banner.classList.add('show');
      }
    }, 1200);

    const dismiss = (storageVal, toastMsg = '') => {
      localStorage.setItem('chai_cookies_accepted', storageVal);
      banner.classList.remove('show');
      banner.classList.add('dismissing');
      setTimeout(() => {
        banner.style.display = 'none';
        banner.remove();
      }, 400);
      if (toastMsg && window.showToast) {
        window.showToast(toastMsg, 'success');
      }
    };

    const acceptBtn = banner.querySelector('#cookie-accept');
    const declineBtn = banner.querySelector('#cookie-decline');
    const closeBtn = banner.querySelector('#cookie-close');

    if (acceptBtn) {
      acceptBtn.addEventListener('click', () => {
        dismiss('true', 'Cookie preferences saved. Enjoy your brew! ☕');
      });
    }

    if (declineBtn) {
      declineBtn.addEventListener('click', () => {
        dismiss('declined');
      });
    }

    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        dismiss('dismissed');
      });
    }
  }

  // --------------------------------------------------------------------------
  // 8. SCROLL REVEAL (IntersectionObserver with Inspect Mode & Resize Support)
  // --------------------------------------------------------------------------
  function initScrollReveal() {
    const elements = document.querySelectorAll('.reveal:not(.revealed)');
    if (!elements.length) return;

    // Check if an element is currently in or near viewport
    const isElementInView = (el) => {
      const rect = el.getBoundingClientRect();
      const windowHeight = window.innerHeight || document.documentElement.clientHeight;
      return rect.top <= windowHeight + 100 && rect.bottom >= -50;
    };

    const revealElement = (el, delay = 0) => {
      if (el.classList.contains('revealed')) return;
      if (delay > 0) {
        setTimeout(() => el.classList.add('revealed'), delay);
      } else {
        el.classList.add('revealed');
      }
    };

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        (entries, obs) => {
          let batchIndex = 0;
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const el = entry.target;
              // Add slight sequential stagger for elements entering together
              const staggerDelay = Math.min(batchIndex * 60, 240);
              revealElement(el, staggerDelay);
              obs.unobserve(el);
              batchIndex++;
            }
          });
        },
        { threshold: 0.01, rootMargin: '0px 0px 80px 0px' }
      );

      elements.forEach(el => {
        if (isElementInView(el)) {
          revealElement(el);
        } else {
          observer.observe(el);
        }
      });

      // Handle inspect mode resize / orientation change
      let resizeTimer;
      window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
          const remaining = document.querySelectorAll('.reveal:not(.revealed)');
          remaining.forEach(el => {
            if (isElementInView(el)) {
              revealElement(el);
              observer.unobserve(el);
            }
          });
        }, 150);
      }, { passive: true });

      window.addEventListener('orientationchange', () => {
        setTimeout(() => {
          const remaining = document.querySelectorAll('.reveal:not(.revealed)');
          remaining.forEach(el => {
            if (isElementInView(el)) {
              revealElement(el);
              observer.unobserve(el);
            }
          });
        }, 200);
      });
    } else {
      // Fallback: reveal immediately
      elements.forEach(el => el.classList.add('revealed'));
    }

    // Safety fallback: guarantee no element remains hidden after 1.5s
    setTimeout(() => {
      document.querySelectorAll('.reveal:not(.revealed)').forEach(el => {
        el.classList.add('revealed');
      });
    }, 1500);
  }

  window.initScrollReveal = initScrollReveal;

  // --------------------------------------------------------------------------
  // 9. BUTTON CLICK RIPPLE & TACTILE ANIMATION
  // --------------------------------------------------------------------------
  function initButtonFeedback() {
    document.addEventListener('click', e => {
      const btn = e.target.closest('.btn, .btn-primary, .btn-secondary, .btn-accent, .btn-outline, .btn-add-cart, .header-order-btn, .filter-btn, .header-tool-btn, .header-icon-btn, .back-to-top, .auth-submit-btn, .newsletter-submit');
      if (!btn) return;
      btn.classList.remove('ripple-animating');
      void btn.offsetWidth; // force reflow
      btn.classList.add('ripple-animating');
      setTimeout(() => {
        btn.classList.remove('ripple-animating');
      }, 500);
    });
  }

  // --------------------------------------------------------------------------
  // DOM READY INITIALIZATION
  // --------------------------------------------------------------------------
  document.addEventListener('DOMContentLoaded', () => {
    initPreloader();
    initStickyHeader();
    initMobileNav();
    initBackToTop();
    initModals();
    initCookieBanner();
    initScrollReveal();
    initButtonFeedback();
  });
})();
