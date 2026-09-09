/**
 * CHAI & CO. — Theme & Direction Engine
 * Manages Dark Mode, RTL layout, Language Demo & localStorage persistence
 */

(function () {
  'use strict';

  const THEME_KEY = 'chai_and_co_theme';
  const DIR_KEY = 'chai_and_co_dir';
  const LANG_KEY = 'chai_and_co_lang';

  // Detect and apply saved theme on initial script execution
  function applyTheme(theme) {
    if (theme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
    updateThemeToggleIcons(theme);
  }

  function getPreferredTheme() {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved) return saved;
    // Default to the signature Lite Yellow & White sunlit saffron theme
    return 'light';
  }

  function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
    const next = current === 'dark' ? 'light' : 'dark';
    localStorage.setItem(THEME_KEY, next);
    applyTheme(next);
    if (window.showToast) {
      window.showToast(next === 'dark' ? '🌙 Dark Mode Activated' : '☀️ Light Mode Activated', 'info');
    }
  }

  function updateThemeToggleIcons(theme) {
    const btns = document.querySelectorAll('.theme-toggle-btn');
    btns.forEach(btn => {
      const icon = btn.querySelector('i');
      if (icon) {
        if (theme === 'dark') {
          icon.className = 'fa-solid fa-sun';
          btn.setAttribute('aria-label', 'Switch to Light Mode');
          btn.setAttribute('title', 'Switch to Light Mode');
        } else {
          icon.className = 'fa-solid fa-moon';
          btn.setAttribute('aria-label', 'Switch to Dark Mode');
          btn.setAttribute('title', 'Switch to Dark Mode');
        }
      }
    });
  }

  // Direction & RTL
  function applyDirection(dir) {
    const isRtl = dir === 'rtl';
    if (isRtl) {
      document.documentElement.setAttribute('dir', 'rtl');
    } else {
      document.documentElement.setAttribute('dir', 'ltr');
    }
    updateRTLToggleBtns(isRtl ? 'rtl' : 'ltr');
  }

  function toggleRTL() {
    const current = document.documentElement.getAttribute('dir') === 'rtl' ? 'rtl' : 'ltr';
    const next = current === 'rtl' ? 'ltr' : 'rtl';
    localStorage.setItem(DIR_KEY, next);
    applyDirection(next);
    if (window.showToast) {
      window.showToast(next === 'rtl' ? 'RTL Layout Activated (Right-to-Left)' : 'LTR Layout Activated (Left-to-Right)', 'info');
    }
  }

  function updateRTLToggleBtns(dir) {
    const isRtl = dir === 'rtl';
    const btns = document.querySelectorAll('.rtl-toggle-btn');
    btns.forEach(btn => {
      btn.setAttribute('aria-label', isRtl ? 'Current: RTL Mode. Click to switch to LTR' : 'Current: LTR Mode. Click to switch to RTL');
      btn.setAttribute('title', isRtl ? 'Current: RTL Mode. Click to switch to LTR' : 'Current: LTR Mode. Click to switch to RTL');
      btn.classList.toggle('active', isRtl);
      const label = btn.querySelector('.btn-label');
      if (label) {
        label.textContent = isRtl ? 'RTL' : 'LTR';
      }
    });
  }

  // Language Demo
  function setLanguage(lang) {
    localStorage.setItem(LANG_KEY, lang);
    if (lang === 'ar') {
      applyDirection('rtl');
      localStorage.setItem(DIR_KEY, 'rtl');
    } else if (lang === 'en') {
      applyDirection('ltr');
      localStorage.setItem(DIR_KEY, 'ltr');
    }
    if (window.showToast) {
      window.showToast(`Language switched to: ${lang.toUpperCase()}`, 'info');
    }
  }

  // Initial immediate application (prevents flash of wrong theme/dir)
  const initialTheme = getPreferredTheme();
  applyTheme(initialTheme);

  const initialDir = localStorage.getItem(DIR_KEY) || 'ltr';
  applyDirection(initialDir);

  // DOM ready bindings
  document.addEventListener('DOMContentLoaded', () => {
    // Synchronize buttons to the active direction and theme immediately upon DOM readiness
    const currentTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
    updateThemeToggleIcons(currentTheme);
    const currentDir = document.documentElement.getAttribute('dir') === 'rtl' ? 'rtl' : 'ltr';
    updateRTLToggleBtns(currentDir);

    // Bind all theme toggles
    document.querySelectorAll('.theme-toggle-btn').forEach(btn => {
      btn.addEventListener('click', e => {
        e.preventDefault();
        toggleTheme();
      });
    });

    // Bind RTL toggles
    document.querySelectorAll('.rtl-toggle-btn').forEach(btn => {
      btn.addEventListener('click', e => {
        e.preventDefault();
        toggleRTL();
      });
    });

    // Bind Language selectors
    document.querySelectorAll('.lang-select').forEach(select => {
      const savedLang = localStorage.getItem(LANG_KEY) || 'en';
      select.value = savedLang;
      select.addEventListener('change', e => {
        setLanguage(e.target.value);
      });
    });
  });

  // Expose global methods
  window.chaiTheme = {
    toggleTheme,
    toggleRTL,
    setLanguage
  };
})();
