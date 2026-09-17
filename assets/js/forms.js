/**
 * CHAI & CO. — Form Validation & Interaction Engine (forms.js)
 * Validates Contact, Login, Register, Newsletter & Catering inquiry forms
 */

(function () {
  'use strict';

  // Strict RFC-compliant email regex
  function isValidEmail(email) {
    if (!email || typeof email !== 'string') return false;
    const trimmed = email.trim();
    if (trimmed.length < 6 || trimmed.length > 254 || trimmed.includes('..') || /\s/.test(trimmed)) {
      return false;
    }
    const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z]{2,})+$/;
    return regex.test(trimmed);
  }

  // Phone regex (support international and Indian numbers, strict digits 10-15)
  function isValidPhone(phone) {
    if (!phone || typeof phone !== 'string') return false;
    const cleaned = phone.replace(/[\s\-\(\)\+]/g, '');
    if (!/^\d+$/.test(cleaned)) return false;
    return cleaned.length >= 10 && cleaned.length <= 15;
  }

  // Filter out any alphabets and non-phone characters in real-time
  function setupPhoneInputFilter(input) {
    if (!input) return;
    input.addEventListener('input', () => {
      input.value = input.value.replace(/[a-zA-Z]/g, '').replace(/[^\d\s\+\-\(\)]/g, '');
    });
  }

  // Set error state on a field
  function setError(input, message) {
    const group = input.closest('.form-group');
    if (!group) return;
    group.classList.add('has-error');
    let errorEl = group.querySelector('.form-error-msg');
    if (!errorEl) {
      errorEl = document.createElement('div');
      errorEl.className = 'form-error-msg';
      group.appendChild(errorEl);
    }
    errorEl.textContent = message;
    errorEl.style.display = 'block';
  }

  // Clear error state
  function clearError(input) {
    const group = input.closest('.form-group');
    if (!group) return;
    group.classList.remove('has-error');
    const errorEl = group.querySelector('.form-error-msg');
    if (errorEl) {
      errorEl.textContent = '';
      errorEl.style.display = 'none';
    }
  }

  // --------------------------------------------------------------------------
  // 1. PASSWORD VISIBILITY TOGGLE
  // --------------------------------------------------------------------------
  function initPasswordToggles() {
    document.querySelectorAll('.password-toggle-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const input = btn.previousElementSibling || btn.parentElement.querySelector('input[type="password"], input[type="text"]');
        if (!input) return;

        const isPassword = input.getAttribute('type') === 'password';
        input.setAttribute('type', isPassword ? 'text' : 'password');

        const icon = btn.querySelector('i');
        if (icon) {
          icon.className = isPassword ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye';
        }
      });
    });
  }

  // --------------------------------------------------------------------------
  // 2. PASSWORD STRENGTH METER
  // --------------------------------------------------------------------------
  function initPasswordStrength() {
    const pwdInput = document.getElementById('reg-password');
    const meterBar = document.getElementById('strength-bar');
    const strengthText = document.getElementById('strength-text');

    if (!pwdInput || !meterBar) return;

    pwdInput.addEventListener('input', () => {
      const val = pwdInput.value;
      let score = 0;

      if (val.length >= 8) score++;
      if (/[A-Z]/.test(val)) score++;
      if (/[0-9]/.test(val)) score++;
      if (/[^A-Za-z0-9]/.test(val)) score++;

      meterBar.className = 'strength-bar';

      if (val.length === 0) {
        if (strengthText) strengthText.textContent = '';
      } else if (score <= 1) {
        meterBar.classList.add('weak');
        if (strengthText) strengthText.textContent = 'Weak (add numbers & symbols)';
      } else if (score <= 3) {
        meterBar.classList.add('medium');
        if (strengthText) strengthText.textContent = 'Medium password';
      } else {
        meterBar.classList.add('strong');
        if (strengthText) strengthText.textContent = 'Strong password ✨';
      }
    });
  }

  // --------------------------------------------------------------------------
  // 3. CONTACT FORM
  // --------------------------------------------------------------------------
  function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    const emailInput = form.querySelector('#contact-email');
    const phoneInput = form.querySelector('#contact-phone');

    if (phoneInput) {
      setupPhoneInputFilter(phoneInput);
    }

    if (emailInput) {
      emailInput.addEventListener('blur', () => {
        const val = emailInput.value.trim();
        if (val && !isValidEmail(val)) {
          setError(emailInput, 'Please enter a valid email address (e.g. name@example.com).');
        } else {
          clearError(emailInput);
        }
      });
    }

    form.addEventListener('submit', e => {
      e.preventDefault();
      let isValid = true;

      const name = form.querySelector('#contact-name');
      const email = form.querySelector('#contact-email');
      const phone = form.querySelector('#contact-phone');
      const message = form.querySelector('#contact-message');

      if (name) {
        if (name.value.trim().length < 2) {
          setError(name, 'Please enter your full name (at least 2 characters).');
          isValid = false;
        } else {
          clearError(name);
        }
      }

      if (email) {
        if (!isValidEmail(email.value.trim())) {
          setError(email, 'Please enter a valid email address (e.g. name@example.com).');
          isValid = false;
        } else {
          clearError(email);
        }
      }

      if (phone && phone.value.trim() !== '') {
        if (!isValidPhone(phone.value.trim())) {
          setError(phone, 'Please enter a valid 10-digit phone number (numbers only).');
          isValid = false;
        } else {
          clearError(phone);
        }
      }

      if (message) {
        if (message.value.trim().length < 10) {
          setError(message, 'Please provide more details (minimum 10 characters).');
          isValid = false;
        } else {
          clearError(message);
        }
      }

      if (isValid) {
        const submitBtn = form.querySelector('button[type="submit"]');
        const origText = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending message...';

        setTimeout(() => {
          submitBtn.disabled = false;
          submitBtn.innerHTML = origText;
          form.reset();

          if (window.showToast) {
            window.showToast('☕ Thank you! Your message has been received. We will get back to you shortly.', 'success', 5000);
          }

          const alertBox = form.querySelector('.form-success-alert');
          if (alertBox) alertBox.style.display = 'block';
        }, 1000);
      }
    });
  }

  // --------------------------------------------------------------------------
  // 4. LOGIN FORM
  // --------------------------------------------------------------------------
  function initLoginForm() {
    const form = document.getElementById('login-form');
    if (!form) return;

    form.addEventListener('submit', e => {
      e.preventDefault();
      let isValid = true;

      const email = form.querySelector('#login-email');
      const pwd = form.querySelector('#login-password');

      if (email) {
        if (!isValidEmail(email.value.trim())) {
          setError(email, 'Please enter a valid email address.');
          isValid = false;
        } else {
          clearError(email);
        }
      }

      if (pwd) {
        if (pwd.value.length < 6) {
          setError(pwd, 'Password must be at least 6 characters.');
          isValid = false;
        } else {
          clearError(pwd);
        }
      }

      if (isValid) {
        const btn = form.querySelector('button[type="submit"]');
        const origText = btn.innerHTML;
        btn.disabled = true;
        btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Authenticating...';

        setTimeout(() => {
          btn.disabled = false;
          btn.innerHTML = origText;
          if (window.showToast) {
            window.showToast('Welcome back, Chai Lover! Redirecting...', 'success');
          }
          setTimeout(() => {
            window.location.href = 'index.html';
          }, 1200);
        }, 900);
      }
    });
  }

  // --------------------------------------------------------------------------
  // 5. REGISTRATION FORM
  // --------------------------------------------------------------------------
  function initRegisterForm() {
    const form = document.getElementById('register-form');
    if (!form) return;

    const emailInput = form.querySelector('#reg-email');
    const phoneInput = form.querySelector('#reg-phone');

    if (phoneInput) {
      setupPhoneInputFilter(phoneInput);
    }

    if (emailInput) {
      emailInput.addEventListener('blur', () => {
        const val = emailInput.value.trim();
        if (val && !isValidEmail(val)) {
          setError(emailInput, 'Please enter a valid email address (e.g. name@example.com).');
        } else {
          clearError(emailInput);
        }
      });
    }

    form.addEventListener('submit', e => {
      e.preventDefault();
      let isValid = true;

      const name = form.querySelector('#reg-name');
      const email = form.querySelector('#reg-email');
      const phone = form.querySelector('#reg-phone');
      const pwd = form.querySelector('#reg-password');
      const confirmPwd = form.querySelector('#reg-confirm-password');
      const terms = form.querySelector('#reg-terms');

      if (name && name.value.trim().length < 2) {
        setError(name, 'Please enter your full name.');
        isValid = false;
      } else if (name) clearError(name);

      if (email && !isValidEmail(email.value.trim())) {
        setError(email, 'Please enter a valid email address (e.g. name@example.com).');
        isValid = false;
      } else if (email) clearError(email);

      if (phone && !isValidPhone(phone.value.trim())) {
        setError(phone, 'Please enter a valid 10-digit mobile number (numbers only).');
        isValid = false;
      } else if (phone) clearError(phone);

      if (pwd && pwd.value.length < 8) {
        setError(pwd, 'Password must contain at least 8 characters.');
        isValid = false;
      } else if (pwd) clearError(pwd);

      if (confirmPwd && pwd && confirmPwd.value !== pwd.value) {
        setError(confirmPwd, 'Passwords do not match.');
        isValid = false;
      } else if (confirmPwd) clearError(confirmPwd);

      if (terms && !terms.checked) {
        setError(terms, 'You must accept the Terms & Conditions to join.');
        isValid = false;
      } else if (terms) clearError(terms);

      if (isValid) {
        const btn = form.querySelector('button[type="submit"]');
        const origText = btn.innerHTML;
        btn.disabled = true;
        btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Creating Membership...';

        setTimeout(() => {
          btn.disabled = false;
          btn.innerHTML = origText;
          form.reset();
          if (window.showToast) {
            window.showToast('🎉 Account created! Welcome to Chai Rewards. 50 bonus points added!', 'success', 5000);
          }
          setTimeout(() => {
            window.location.href = 'login.html';
          }, 1500);
        }, 1000);
      }
    });
  }

  // --------------------------------------------------------------------------
  // 6. NEWSLETTER FORMS
  // --------------------------------------------------------------------------
  function initNewsletterForms() {
    document.querySelectorAll('.newsletter-form, .footer-newsletter-form').forEach(form => {
      form.addEventListener('submit', e => {
        e.preventDefault();
        const input = form.querySelector('input[type="email"]');
        if (!input || !isValidEmail(input.value.trim())) {
          if (window.showToast) {
            window.showToast('Please enter a valid email address (e.g. name@example.com).', 'error');
          }
          return;
        }

        const email = input.value.trim();
        input.value = '';
        if (window.showToast) {
          window.showToast(`Thank you! Stories and special offers will be sent to ${email}`, 'success');
        }
      });
    });
  }

  // --------------------------------------------------------------------------
  // 7. CATERING INQUIRY FORM
  // --------------------------------------------------------------------------
  function initCateringForm() {
    const form = document.getElementById('catering-inquiry-form');
    if (!form) return;

    const phoneInput = form.querySelector('#cater-phone');
    const emailInput = form.querySelector('#cater-email');

    if (phoneInput) {
      setupPhoneInputFilter(phoneInput);
    }

    if (emailInput) {
      emailInput.addEventListener('blur', () => {
        const val = emailInput.value.trim();
        if (val && !isValidEmail(val)) {
          setError(emailInput, 'Please enter a valid email address (e.g. name@example.com).');
        } else {
          clearError(emailInput);
        }
      });
    }

    form.addEventListener('submit', e => {
      e.preventDefault();
      let isValid = true;

      const name = form.querySelector('#cater-name');
      const email = form.querySelector('#cater-email');
      const phone = form.querySelector('#cater-phone');
      const guests = form.querySelector('#cater-guests');

      if (!name || name.value.trim().length < 2) {
        if (name) setError(name, 'Please enter your full name (at least 2 characters).');
        isValid = false;
      } else if (name) {
        clearError(name);
      }

      if (!email || !isValidEmail(email.value.trim())) {
        if (email) setError(email, 'Please enter a valid email address (e.g. name@example.com).');
        isValid = false;
      } else if (email) {
        clearError(email);
      }

      if (phone && phone.value.trim() !== '') {
        if (!isValidPhone(phone.value.trim())) {
          setError(phone, 'Please enter a valid 10-digit phone number (numbers only).');
          isValid = false;
        } else {
          clearError(phone);
        }
      }

      if (guests && guests.value) {
        const val = parseInt(guests.value, 10);
        if (isNaN(val) || val < 5) {
          setError(guests, 'Please enter an estimated guest count (minimum 5).');
          isValid = false;
        } else {
          clearError(guests);
        }
      }

      if (!isValid) return;

      const btn = form.querySelector('button[type="submit"]');
      const orig = btn.innerHTML;
      btn.disabled = true;
      btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Submitting Request...';

      setTimeout(() => {
        btn.disabled = false;
        btn.innerHTML = orig;
        form.reset();
        if (window.showToast) {
          window.showToast('☕ Catering inquiry sent! Our team will contact you within 24 hours.', 'success', 5000);
        }
        const successBox = form.querySelector('.form-success-alert');
        if (successBox) successBox.style.display = 'block';
      }, 1000);
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    initPasswordToggles();
    initPasswordStrength();
    initContactForm();
    initLoginForm();
    initRegisterForm();
    initNewsletterForms();
    initCateringForm();
  });
})();
