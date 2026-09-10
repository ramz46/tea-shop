/**
 * CHAI & CO. — Interactive Authentication & State Engine (auth.js)
 * Real-time Validation, LocalStorage Persistence, Strength Meter, OTP Wizard & Celebrations
 */

(function () {
  'use strict';

  const STORAGE_USERS = 'chai_users';
  const STORAGE_SESSION = 'chai_current_user';
  const STORAGE_REMEMBER = 'chai_remember_email';

  // Seed default demo user if not present
  function initStorage() {
    let users = [];
    try {
      users = JSON.parse(localStorage.getItem(STORAGE_USERS)) || [];
    } catch (e) {
      users = [];
    }

    const demoEmail = 'member@chaiandco.in';
    const exists = users.some(u => u.email.toLowerCase() === demoEmail.toLowerCase());
    if (!exists) {
      users.push({
        id: 'user-01',
        name: 'Aarav Mehta',
        email: demoEmail,
        phone: '+91 98290 12345',
        password: 'ChaiLover2026',
        points: 280,
        tier: 'Gold Reserve',
        joinedDate: '2025-11-12'
      });
      localStorage.setItem(STORAGE_USERS, JSON.stringify(users));
    }
  }

  function getUsers() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_USERS)) || [];
    } catch (e) {
      return [];
    }
  }

  function saveUsers(users) {
    localStorage.setItem(STORAGE_USERS, JSON.stringify(users));
  }

  function getCurrentUser() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_SESSION));
    } catch (e) {
      return null;
    }
  }

  function setCurrentUser(user) {
    if (user) {
      localStorage.setItem(STORAGE_SESSION, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_SESSION);
    }
    syncHeaderAuth();
  }

  // Email & Phone regex
  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function isValidPhone(phone) {
    return /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(phone.replace(/\s+/g, ''));
  }

  // Form error helpers with shake animation
  function setFieldError(fieldId, errorMsg) {
    const input = document.getElementById(fieldId);
    if (!input) return;
    const group = input.closest('.auth-form-group') || input.closest('.form-group');
    if (!group) return;

    group.classList.add('has-error');
    let msgEl = group.querySelector('.auth-error-feedback') || group.querySelector('.form-error-msg');
    if (!msgEl) {
      msgEl = document.createElement('div');
      msgEl.className = 'auth-error-feedback';
      group.appendChild(msgEl);
    }
    msgEl.innerHTML = `<i class="fa-solid fa-circle-exclamation"></i> ${errorMsg}`;

    // Trigger restart of shake animation
    input.classList.remove('anim-shake');
    void input.offsetWidth;
    input.classList.add('anim-shake');
  }

  function clearFieldError(fieldId) {
    const input = document.getElementById(fieldId);
    if (!input) return;
    const group = input.closest('.auth-form-group') || input.closest('.form-group');
    if (!group) return;

    group.classList.remove('has-error');
    const msgEl = group.querySelector('.auth-error-feedback') || group.querySelector('.form-error-msg');
    if (msgEl) msgEl.innerHTML = '';
  }

  // --------------------------------------------------------------------------
  // 1. PASSWORD VISIBILITY TOGGLE
  // --------------------------------------------------------------------------
  function initPasswordToggles() {
    document.querySelectorAll('.auth-pwd-toggle, .password-toggle-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const wrapper = btn.closest('.input-icon-box') || btn.closest('.password-toggle-wrapper');
        if (!wrapper) return;
        const input = wrapper.querySelector('input');
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
  // 2. REAL-TIME PASSWORD STRENGTH CHECKER & CHECKLIST
  // --------------------------------------------------------------------------
  function initPasswordStrength() {
    const pwdInput = document.getElementById('reg-password');
    const container = document.getElementById('pwd-strength-box');
    const fillBar = document.getElementById('pwd-strength-bar-fill');
    const reqLength = document.getElementById('req-len');
    const reqUpper = document.getElementById('req-upper');
    const reqNumber = document.getElementById('req-num');
    const reqSymbol = document.getElementById('req-sym');

    if (!pwdInput) return;

    pwdInput.addEventListener('input', () => {
      const val = pwdInput.value;
      if (container) {
        if (val.length > 0) container.classList.add('active');
        else container.classList.remove('active');
      }

      const hasLen = val.length >= 8;
      const hasUpper = /[A-Z]/.test(val);
      const hasNum = /[0-9]/.test(val);
      const hasSym = /[^A-Za-z0-9]/.test(val);

      let score = 0;
      if (hasLen) score++;
      if (hasUpper) score++;
      if (hasNum) score++;
      if (hasSym) score++;

      if (reqLength) updateReq(reqLength, hasLen);
      if (reqUpper) updateReq(reqUpper, hasUpper);
      if (reqNumber) updateReq(reqNumber, hasNum);
      if (reqSymbol) updateReq(reqSymbol, hasSym);

      if (fillBar) {
        fillBar.className = 'pwd-strength-fill';
        if (score > 0) fillBar.classList.add(`strength-${score}`);
      }

      checkPasswordMatch();
    });

    function updateReq(el, met) {
      if (met) {
        el.classList.add('met');
        el.querySelector('i').className = 'fa-solid fa-circle-check';
      } else {
        el.classList.remove('met');
        el.querySelector('i').className = 'fa-regular fa-circle';
      }
    }
  }

  // Check password match indicator
  function checkPasswordMatch() {
    const pwd = document.getElementById('reg-password');
    const confirm = document.getElementById('reg-confirm-password');
    const matchBadge = document.getElementById('pwd-match-status');
    if (!pwd || !confirm || !matchBadge) return;

    if (confirm.value.length === 0) {
      matchBadge.innerHTML = '';
      matchBadge.className = 'pwd-match-badge';
      return;
    }

    if (pwd.value === confirm.value) {
      matchBadge.className = 'pwd-match-badge matched';
      matchBadge.innerHTML = '<i class="fa-solid fa-circle-check"></i> Passwords match perfectly';
    } else {
      matchBadge.className = 'pwd-match-badge mismatched';
      matchBadge.innerHTML = '<i class="fa-solid fa-circle-xmark"></i> Passwords do not match';
    }
  }

  // --------------------------------------------------------------------------
  // 3. ONE-CLICK DEMO CREDENTIALS AUTOFILL
  // --------------------------------------------------------------------------
  function initDemoAutofill() {
    const btn = document.getElementById('btn-autofill-demo');
    if (!btn) return;

    btn.addEventListener('click', () => {
      const emailInput = document.getElementById('login-email');
      const pwdInput = document.getElementById('login-password');
      if (!emailInput || !pwdInput) return;

      btn.disabled = true;
      btn.innerHTML = '<i class="fa-solid fa-magic fa-spin"></i> Filling...';

      const demoEmail = 'member@chaiandco.in';
      const demoPwd = 'ChaiLover2026';

      emailInput.value = '';
      pwdInput.value = '';

      let i = 0;
      const typeEmail = setInterval(() => {
        if (i < demoEmail.length) {
          emailInput.value += demoEmail.charAt(i);
          i++;
        } else {
          clearInterval(typeEmail);
          pwdInput.value = demoPwd;
          btn.disabled = false;
          btn.innerHTML = '<i class="fa-solid fa-check"></i> Filled!';
          clearFieldError('login-email');
          clearFieldError('login-password');

          setTimeout(() => {
            btn.innerHTML = '<i class="fa-solid fa-bolt"></i> Auto Fill';
          }, 2000);
        }
      }, 25);
    });
  }

  // --------------------------------------------------------------------------
  // 4. LOGIN FORM SUBMISSION
  // --------------------------------------------------------------------------
  function initLoginForm() {
    const form = document.getElementById('auth-login-form') || document.getElementById('login-form');
    if (!form) return;

    // Load remembered email
    const remembered = localStorage.getItem(STORAGE_REMEMBER);
    const emailInput = document.getElementById('login-email');
    const rememberCheckbox = document.getElementById('login-remember');
    if (remembered && emailInput) {
      emailInput.value = remembered;
      if (rememberCheckbox) rememberCheckbox.checked = true;
    }

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      clearFieldError('login-email');
      clearFieldError('login-password');

      const email = (document.getElementById('login-email')?.value || '').trim();
      const password = (document.getElementById('login-password')?.value || '');
      const remember = document.getElementById('login-remember')?.checked;

      let valid = true;

      if (!email) {
        setFieldError('login-email', 'Please enter your registered email address.');
        valid = false;
      } else if (!isValidEmail(email)) {
        setFieldError('login-email', 'Please enter a valid email address (e.g. member@chaiandco.in).');
        valid = false;
      }

      if (!password) {
        setFieldError('login-password', 'Please enter your password.');
        valid = false;
      } else if (password.length < 6) {
        setFieldError('login-password', 'Password must be at least 6 characters.');
        valid = false;
      }

      if (!valid) return;

      const submitBtn = form.querySelector('.btn-auth-submit') || form.querySelector('button[type="submit"]');
      const origText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fa-solid fa-mug-hot fa-spin"></i> Authenticating...';

      setTimeout(() => {
        const users = getUsers();
        const found = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);

        if (found) {
          if (remember) {
            localStorage.setItem(STORAGE_REMEMBER, email);
          } else {
            localStorage.removeItem(STORAGE_REMEMBER);
          }

          setCurrentUser(found);

          submitBtn.innerHTML = '<i class="fa-solid fa-circle-check"></i> Welcome Back!';
          submitBtn.style.background = 'linear-gradient(135deg, #2d8a4e 0%, #1e6b37 100%)';

          if (window.showToast) {
            window.showToast(`☕ Welcome back, ${found.name}! You have ${found.points} Chai Points.`, 'success', 4000);
          }

          setTimeout(() => {
            const redirectUrl = new URLSearchParams(window.location.search).get('redirect') || 'order.html';
            window.location.href = redirectUrl;
          }, 1000);
        } else {
          submitBtn.disabled = false;
          submitBtn.innerHTML = origText;
          setFieldError('login-password', 'Incorrect email or password. Use demo credentials or click Auto Fill.');
          if (window.showToast) {
            window.showToast('Invalid credentials. Please verify and try again.', 'error', 4000);
          }
        }
      }, 750);
    });
  }

  // --------------------------------------------------------------------------
  // 5. REGISTRATION FORM SUBMISSION
  // --------------------------------------------------------------------------
  function initRegisterForm() {
    const form = document.getElementById('auth-register-form') || document.getElementById('register-form');
    if (!form) return;

    const confirmInput = document.getElementById('reg-confirm-password');
    if (confirmInput) {
      confirmInput.addEventListener('input', checkPasswordMatch);
    }

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      clearFieldError('reg-name');
      clearFieldError('reg-email');
      clearFieldError('reg-phone');
      clearFieldError('reg-password');
      clearFieldError('reg-confirm-password');
      clearFieldError('reg-terms');

      const name = (document.getElementById('reg-name')?.value || '').trim();
      const email = (document.getElementById('reg-email')?.value || '').trim();
      const phone = (document.getElementById('reg-phone')?.value || '').trim();
      const password = (document.getElementById('reg-password')?.value || '');
      const confirmPassword = (document.getElementById('reg-confirm-password')?.value || '');
      const terms = document.getElementById('reg-terms')?.checked;

      let valid = true;

      if (!name || name.length < 2) {
        setFieldError('reg-name', 'Please enter your full name (minimum 2 characters).');
        valid = false;
      }

      if (!email || !isValidEmail(email)) {
        setFieldError('reg-email', 'Please enter a valid email address.');
        valid = false;
      } else {
        const users = getUsers();
        if (users.some(u => u.email.toLowerCase() === email.toLowerCase())) {
          setFieldError('reg-email', 'This email is already registered. Please sign in instead.');
          valid = false;
        }
      }

      if (!phone || !isValidPhone(phone)) {
        setFieldError('reg-phone', 'Please enter a valid 10-digit mobile number.');
        valid = false;
      }

      if (!password || password.length < 8) {
        setFieldError('reg-password', 'Password must be at least 8 characters long.');
        valid = false;
      }

      if (password !== confirmPassword) {
        setFieldError('reg-confirm-password', 'Passwords do not match. Please verify.');
        valid = false;
      }

      if (!terms) {
        setFieldError('reg-terms', 'You must agree to the Terms of Service & Privacy Policy.');
        valid = false;
      }

      if (!valid) return;

      const submitBtn = form.querySelector('.btn-auth-submit') || form.querySelector('button[type="submit"]');
      const origText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fa-solid fa-crown fa-spin"></i> Creating Membership...';

      setTimeout(() => {
        const users = getUsers();
        const newUser = {
          id: 'user-' + Date.now(),
          name,
          email,
          phone,
          password,
          points: 50, // 50 Welcome bonus points
          tier: 'Silver Spiced',
          joinedDate: new Date().toISOString().split('T')[0]
        };

        users.push(newUser);
        saveUsers(users);
        setCurrentUser(newUser);

        // Celebratory confetti animation
        triggerConfetti();

        submitBtn.innerHTML = '<i class="fa-solid fa-award"></i> Welcome to Chai Rewards!';
        submitBtn.style.background = 'linear-gradient(135deg, #2d8a4e 0%, #1e6b37 100%)';

        if (window.showToast) {
          window.showToast('🎉 Account created! 50 bonus points added to your balance.', 'success', 5000);
        }

        setTimeout(() => {
          window.location.href = 'order.html';
        }, 1500);
      }, 900);
    });
  }

  // --------------------------------------------------------------------------
  // 6. FORGOT PASSWORD 3-STEP OTP MODAL
  // --------------------------------------------------------------------------
  let otpTimerInterval = null;
  let activeResetEmail = '';

  function initForgotModal() {
    const modal = document.getElementById('forgot-modal');
    const openBtns = document.querySelectorAll('.trigger-forgot-pwd');
    const closeBtn = document.getElementById('close-forgot-modal');

    if (!modal) return;

    openBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        openModalStep(1);
        modal.classList.add('active');
      });
    });

    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        modal.classList.remove('active');
        clearInterval(otpTimerInterval);
      });
    }

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
        clearInterval(otpTimerInterval);
      }
    });

    // Step 1: Send OTP
    const step1Form = document.getElementById('forgot-step1-form');
    if (step1Form) {
      step1Form.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = (document.getElementById('forgot-email')?.value || '').trim();
        const errEl = document.getElementById('forgot-step1-err');
        if (!email || !isValidEmail(email)) {
          if (errEl) errEl.textContent = 'Please enter a valid email address.';
          return;
        }

        const users = getUsers();
        const exists = users.find(u => u.email.toLowerCase() === email.toLowerCase());
        if (!exists) {
          if (errEl) errEl.textContent = 'No account found with this email. Please register.';
          return;
        }

        activeResetEmail = email;
        if (errEl) errEl.textContent = '';

        const btn = step1Form.querySelector('button[type="submit"]');
        btn.disabled = true;
        btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending Code...';

        setTimeout(() => {
          btn.disabled = false;
          btn.innerHTML = 'Send Verification Code';
          openModalStep(2);
          startOtpCountdown();

          if (window.showToast) {
            window.showToast('✉️ Verification code sent! (Demo OTP: 1234)', 'info', 6000);
          }
        }, 700);
      });
    }

    // Step 2: Verify OTP
    initOtpBoxes();
    const step2Form = document.getElementById('forgot-step2-form');
    if (step2Form) {
      step2Form.addEventListener('submit', (e) => {
        e.preventDefault();
        const otp = getEnteredOtp();
        const errEl = document.getElementById('forgot-step2-err');

        if (otp.length < 4) {
          if (errEl) errEl.textContent = 'Please enter the complete 4-digit code.';
          return;
        }

        if (otp !== '1234') {
          if (errEl) errEl.textContent = 'Invalid code. Use demo code 1234.';
          return;
        }

        if (errEl) errEl.textContent = '';
        clearInterval(otpTimerInterval);
        openModalStep(3);
      });
    }

    // Step 3: New Password
    const step3Form = document.getElementById('forgot-step3-form');
    if (step3Form) {
      step3Form.addEventListener('submit', (e) => {
        e.preventDefault();
        const newPwd = (document.getElementById('forgot-new-pwd')?.value || '');
        const confirmPwd = (document.getElementById('forgot-confirm-pwd')?.value || '');
        const errEl = document.getElementById('forgot-step3-err');

        if (newPwd.length < 8) {
          if (errEl) errEl.textContent = 'New password must be at least 8 characters.';
          return;
        }

        if (newPwd !== confirmPwd) {
          if (errEl) errEl.textContent = 'Passwords do not match.';
          return;
        }

        const users = getUsers();
        const target = users.find(u => u.email.toLowerCase() === activeResetEmail.toLowerCase());
        if (target) {
          target.password = newPwd;
          saveUsers(users);
        }

        modal.classList.remove('active');
        if (window.showToast) {
          window.showToast('✅ Password updated successfully! Please sign in.', 'success', 5000);
        }

        const pwdField = document.getElementById('login-password');
        if (pwdField) pwdField.value = newPwd;
      });
    }
  }

  function openModalStep(stepNum) {
    document.querySelectorAll('.forgot-step-pane').forEach(el => el.style.display = 'none');
    const target = document.getElementById(`forgot-step-${stepNum}`);
    if (target) target.style.display = 'block';

    if (stepNum === 2) {
      const firstOtp = document.querySelector('.otp-box');
      if (firstOtp) firstOtp.focus();
    }
  }

  function initOtpBoxes() {
    const boxes = document.querySelectorAll('.otp-box');
    boxes.forEach((box, idx) => {
      box.addEventListener('input', (e) => {
        const val = e.target.value.replace(/\D/g, '');
        e.target.value = val ? val.slice(-1) : '';
        if (val && idx < boxes.length - 1) {
          boxes[idx + 1].focus();
        }
      });

      box.addEventListener('keydown', (e) => {
        if (e.key === 'Backspace' && !box.value && idx > 0) {
          boxes[idx - 1].focus();
        }
      });
    });
  }

  function getEnteredOtp() {
    let code = '';
    document.querySelectorAll('.otp-box').forEach(b => code += b.value);
    return code;
  }

  function startOtpCountdown() {
    let timeLeft = 30;
    const timerEl = document.getElementById('otp-timer');
    const resendBtn = document.getElementById('btn-resend-otp');
    if (!timerEl) return;

    if (resendBtn) resendBtn.disabled = true;
    timerEl.textContent = `(00:${timeLeft < 10 ? '0' : ''}${timeLeft})`;

    clearInterval(otpTimerInterval);
    otpTimerInterval = setInterval(() => {
      timeLeft--;
      if (timeLeft <= 0) {
        clearInterval(otpTimerInterval);
        timerEl.textContent = '';
        if (resendBtn) resendBtn.disabled = false;
      } else {
        timerEl.textContent = `(00:${timeLeft < 10 ? '0' : ''}${timeLeft})`;
      }
    }, 1000);
  }

  // --------------------------------------------------------------------------
  // 7. SOCIAL LOGINS INTERACTIVE SIMULATION
  // --------------------------------------------------------------------------
  function initSocialLogins() {
    document.querySelectorAll('.btn-social-auth').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const provider = btn.dataset.provider || 'Social Account';

        if (provider === 'phone') {
          // Open phone OTP modal or prompt
          const phone = prompt('Enter your 10-digit mobile number for instant Chai OTP:');
          if (phone && phone.trim().length >= 10) {
            if (window.showToast) {
              window.showToast(`📱 OTP code 1234 sent to ${phone}. Verified!`, 'success');
            }
            const users = getUsers();
            const demo = users[0];
            setCurrentUser(demo);
            setTimeout(() => { window.location.href = 'order.html'; }, 1000);
          }
        } else {
          if (window.showToast) {
            window.showToast(`Connecting with ${provider}... Authenticated!`, 'success');
          }
          const users = getUsers();
          const demo = users[0];
          setCurrentUser(demo);
          setTimeout(() => { window.location.href = 'order.html'; }, 1000);
        }
      });
    });
  }

  // --------------------------------------------------------------------------
  // 8. HEADER AUTH STATE SYNCHRONIZATION
  // --------------------------------------------------------------------------
  function syncHeaderAuth() {
    const user = getCurrentUser();
    const actionsContainers = document.querySelectorAll('.header-actions');
    const currentPath = (window.location.pathname || '').toLowerCase();
    const isAuthPage = currentPath.endsWith('login.html') || currentPath.endsWith('login') ||
                       currentPath.endsWith('register.html') || currentPath.endsWith('register');

    actionsContainers.forEach(container => {
      let memberPill = container.querySelector('.header-member-pill');
      let authLink = container.querySelector('.header-auth-link');

      if (user) {
        if (authLink) authLink.remove();

        if (!memberPill) {
          memberPill = document.createElement('div');
          memberPill.className = 'header-member-pill';
          memberPill.style.cssText = `
            display: inline-flex;
            align-items: center;
            gap: 8px;
            background: var(--bg-surface-soft);
            border: 1px solid var(--border);
            padding: 5px 12px;
            border-radius: var(--radius-pill);
            font-size: 0.82rem;
            font-weight: 700;
            color: var(--text-main);
          `;
          container.prepend(memberPill);
        }

        memberPill.innerHTML = `
          <i class="fa-solid fa-crown" style="color:var(--accent);"></i>
          <span>${user.name.split(' ')[0]}</span>
          <span style="background:var(--primary);color:#fff;font-size:0.7rem;padding:2px 7px;border-radius:var(--radius-pill);">${user.points} pts</span>
          <button type="button" id="btn-header-signout" title="Sign Out" style="background:none;border:none;color:var(--text-light);cursor:pointer;padding:2px 4px;">
            <i class="fa-solid fa-arrow-right-from-bracket"></i>
          </button>
        `;

        const signoutBtn = memberPill.querySelector('#btn-header-signout');
        if (signoutBtn) {
          signoutBtn.addEventListener('click', () => {
            setCurrentUser(null);
            if (window.showToast) {
              window.showToast('You have signed out.', 'info');
            }
            setTimeout(() => window.location.reload(), 500);
          });
        }
      } else {
        if (memberPill) memberPill.remove();

        if (!isAuthPage) {
          if (!authLink) {
            authLink = document.createElement('a');
            authLink.href = 'login.html';
            authLink.className = 'header-tool-btn header-auth-link';
            authLink.setAttribute('aria-label', 'Member Sign In');
            authLink.setAttribute('title', 'Sign In to Chai Rewards');
            authLink.innerHTML = '<i class="fa-regular fa-user"></i>';

            const cartBtn = container.querySelector('.cart-toggle-btn');
            if (cartBtn) {
              container.insertBefore(authLink, cartBtn);
            } else {
              container.prepend(authLink);
            }
          }
        } else if (authLink) {
          authLink.remove();
        }
      }
    });
  }

  // --------------------------------------------------------------------------
  // 9. CELEBRATION CONFETTI CANNON
  // --------------------------------------------------------------------------
  function triggerConfetti() {
    const colors = ['#a34e1c', '#c9822d', '#d49539', '#2d8a4e', '#ffffff'];
    for (let i = 0; i < 40; i++) {
      const p = document.createElement('div');
      p.className = 'confetti-particle';
      p.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      p.style.left = (Math.random() * 90 + 5) + 'vw';
      p.style.top = '-20px';
      p.style.transform = `rotate(${Math.random() * 360}deg)`;
      p.style.animationDuration = (Math.random() * 1.5 + 1.8) + 's';
      p.style.animationDelay = (Math.random() * 0.4) + 's';
      document.body.appendChild(p);
      setTimeout(() => p.remove(), 3500);
    }
  }

  // Expose global methods
  window.ChaiAuth = {
    getUsers,
    getCurrentUser,
    setCurrentUser,
    triggerConfetti
  };

  document.addEventListener('DOMContentLoaded', () => {
    initStorage();
    initPasswordToggles();
    initPasswordStrength();
    initDemoAutofill();
    initLoginForm();
    initRegisterForm();
    initForgotModal();
    initSocialLogins();
    syncHeaderAuth();
  });
})();
