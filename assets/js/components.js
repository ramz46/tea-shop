/**
 * CHAI & CO. — Reusable Components (components.js)
 * Shopping Cart Drawer, FAQ Accordion, Counter Animations
 */

(function () {
  'use strict';

  // ==========================================================================
  // 1. SHOPPING CART ENGINE (localStorage + Slide-out Drawer)
  // ==========================================================================
  const CART_STORAGE_KEY = 'chai_cart_items';
  let cart = [];

  function loadCart() {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      cart = saved ? JSON.parse(saved) : [];
    } catch (e) {
      cart = [];
    }
  }

  function getCartTotal() {
    const subtotal = cart.reduce((t, i) => t + (i.price * i.quantity), 0);
    const tax = Math.round(subtotal * 0.05);
    return { subtotal, tax, total: subtotal + tax };
  }

  function getItemQuantity(productId) {
    return cart
      .filter(item => item.id === productId || item.cartItemId === productId || (item.cartItemId && item.cartItemId.startsWith(`${productId}-`)))
      .reduce((total, item) => total + item.quantity, 0);
  }

  function saveCart() {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    updateCartBadges();
    renderCartDrawer();
    try {
      window.dispatchEvent(new CustomEvent('chaiCart:updated', {
        detail: {
          cart: [...cart],
          count: getCartItemCount(),
          totals: getCartTotal()
        }
      }));
    } catch (e) {}
  }

  function getCartItemCount() {
    return cart.reduce((total, item) => total + item.quantity, 0);
  }

  function updateCartBadges() {
    const count = getCartItemCount();
    document.querySelectorAll('.cart-count-badge').forEach(badge => {
      badge.textContent = count;
      badge.style.display = count > 0 ? 'flex' : 'none';
      badge.classList.remove('animate-bounce');
      void badge.offsetWidth;
      badge.classList.add('animate-bounce');
      setTimeout(() => badge.classList.remove('animate-bounce'), 450);
    });
  }

  function addToCart(product, openDrawer = false) {
    const customId = product.customization ? `${product.id}-${product.customization.replace(/\s+/g, '-').toLowerCase()}` : product.id;
    const existing = cart.find(item => item.cartItemId === customId || (item.id === product.id && item.customization === product.customization));
    if (existing) {
      existing.quantity += (product.quantity || 1);
    } else {
      cart.push({
        id: product.id,
        cartItemId: customId,
        name: product.name,
        price: product.price,
        image: product.image,
        category: product.category || 'Specialty Chai',
        quantity: product.quantity || 1,
        customization: product.customization || ''
      });
    }
    saveCart();
    if (window.showToast) {
      const totalItemQty = getItemQuantity(product.id);
      window.showToast(`✓ Added ${product.name} (${totalItemQty} in Order Tray)`, 'success');
    }
    if (openDrawer) {
      openCart();
    }
  }

  function updateQuantity(id, delta) {
    const item = cart.find(i => i.cartItemId === id || i.id === id);
    if (!item) return;
    item.quantity += delta;
    if (item.quantity <= 0) {
      removeFromCart(id);
      return;
    }
    saveCart();
  }

  function removeFromCart(id) {
    cart = cart.filter(i => i.cartItemId !== id && i.id !== id);
    saveCart();
    if (window.showToast) {
      window.showToast('Item removed from cart', 'info');
    }
  }

  function clearCart() {
    cart = [];
    saveCart();
  }

  function formatCurrency(amount) {
    return '₹' + amount.toLocaleString('en-IN');
  }

  function renderCartDrawer() {
    const body = document.querySelector('.cart-body');
    const footer = document.querySelector('.cart-footer');
    if (!body) return;

    if (cart.length === 0) {
      body.innerHTML = `
        <div class="cart-empty-state">
          <div class="cart-empty-icon"><i class="fa-solid fa-mug-hot"></i></div>
          <h4>Your Chai Cart is Empty</h4>
          <p class="text-muted" style="font-size:0.9rem;margin:8px 0 24px;">Discover our freshly brewed blends and artisan snacks to fill your cup.</p>
          <a href="menu.html" class="btn btn-primary btn-sm">Explore Menu</a>
        </div>
      `;
      if (footer) footer.style.display = 'none';
      return;
    }

    if (footer) footer.style.display = 'block';

    let subtotal = 0;
    let itemsHtml = '';

    cart.forEach(item => {
      const itemTotal = item.price * item.quantity;
      subtotal += itemTotal;
      const customTag = item.customization ? `<div style="font-size:0.75rem;color:var(--terracotta);background:var(--primary-light);padding:2px 8px;border-radius:var(--radius-pill);margin-top:2px;display:inline-block;font-weight:600;"><i class="fa-solid fa-sliders" style="font-size:0.65rem;margin-right:4px;"></i>${item.customization}</div>` : '';
      const itemId = item.cartItemId || item.id;

      itemsHtml += `
        <div class="cart-item" data-id="${itemId}">
          <img src="${item.image}" alt="${item.name}" class="cart-item-img" onerror="this.src='https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=150&q=80'">
          <div class="cart-item-info">
            <div class="cart-item-title">${item.name}</div>
            ${customTag}
            <div class="cart-item-price" style="margin-top:4px;">${formatCurrency(item.price)} <span style="font-size:0.75rem;font-weight:normal;color:var(--text-muted);">each</span></div>
            <div style="margin-top:8px;display:flex;align-items:center;gap:10px;">
              <div class="cart-qty-ctrl">
                <button type="button" class="qty-btn btn-minus" data-id="${itemId}" aria-label="Decrease quantity">
                  <i class="fa-solid fa-minus"></i>
                </button>
                <span class="qty-value">${item.quantity}</span>
                <button type="button" class="qty-btn btn-plus" data-id="${itemId}" aria-label="Increase quantity">
                  <i class="fa-solid fa-plus"></i>
                </button>
              </div>
              <button type="button" class="cart-item-remove" data-id="${itemId}" aria-label="Remove item">
                <i class="fa-regular fa-trash-can"></i>
              </button>
            </div>
          </div>
        </div>
      `;
    });

    body.innerHTML = itemsHtml;

    // Attach cart item quantity buttons
    body.querySelectorAll('.btn-minus').forEach(btn => {
      btn.addEventListener('click', () => updateQuantity(btn.dataset.id, -1));
    });
    body.querySelectorAll('.btn-plus').forEach(btn => {
      btn.addEventListener('click', () => updateQuantity(btn.dataset.id, 1));
    });
    body.querySelectorAll('.cart-item-remove').forEach(btn => {
      btn.addEventListener('click', () => removeFromCart(btn.dataset.id));
    });

    // Calculate taxes (5% GST on Restaurant / Food)
    const tax = Math.round(subtotal * 0.05);
    const total = subtotal + tax;

    const subtotalEl = document.querySelector('.cart-subtotal-val');
    const taxEl = document.querySelector('.cart-tax-val');
    const totalEl = document.querySelector('.cart-total-val');

    if (subtotalEl) subtotalEl.textContent = formatCurrency(subtotal);
    if (taxEl) taxEl.textContent = formatCurrency(tax);
    if (totalEl) totalEl.textContent = formatCurrency(total);
  }

  function openCart() {
    const drawer = document.querySelector('.cart-drawer');
    const backdrop = document.querySelector('.drawer-backdrop');
    if (!drawer) return;
    drawer.classList.add('open');
    if (backdrop) backdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeCart() {
    const drawer = document.querySelector('.cart-drawer');
    const backdrop = document.querySelector('.drawer-backdrop');
    if (!drawer) return;
    drawer.classList.remove('open');
    if (backdrop) backdrop.classList.remove('active');
    document.body.style.overflow = '';
  }

  function initCartDrawer() {
    loadCart();
    updateCartBadges();
    renderCartDrawer();

    document.querySelectorAll('.cart-toggle-btn').forEach(btn => {
      btn.addEventListener('click', e => {
        e.preventDefault();
        openCart();
      });
    });

    const closeBtn = document.querySelector('.cart-close-btn');
    if (closeBtn) closeBtn.addEventListener('click', closeCart);

    const backdrop = document.querySelector('.drawer-backdrop');
    if (backdrop) {
      backdrop.addEventListener('click', () => {
        closeCart();
      });
    }

    const checkoutBtns = document.querySelectorAll('.cart-checkout-btn');
    checkoutBtns.forEach(btn => {
      btn.addEventListener('click', e => {
        e.preventDefault();
        if (cart.length === 0) {
          if (window.showToast) window.showToast('Please add items to your cart first!', 'error');
          return;
        }
        closeCart();
        window.location.href = 'order.html';
      });
    });
  }

  // Persistent Orders Management
  const ORDERS_STORAGE_KEY = 'chai_orders';
  function getOrders() {
    try {
      const saved = localStorage.getItem(ORDERS_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  }

  function saveOrder(order) {
    const orders = getOrders();
    orders.unshift(order);
    localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
    return order;
  }

  // Expose global cart & orders methods
  window.chaiCart = {
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    openCart,
    closeCart,
    getCart: () => [...cart],
    getItemQuantity,
    getCount: getCartItemCount,
    getCartTotal,
    formatCurrency
  };

  window.chaiOrders = {
    getOrders,
    saveOrder
  };

  // ==========================================================================
  // 2. FAQ ACCORDION
  // ==========================================================================
  function initAccordion() {
    const accordions = document.querySelectorAll('.accordion-item');
    if (!accordions.length) return;

    accordions.forEach(item => {
      const header = item.querySelector('.accordion-header');
      const collapse = item.querySelector('.accordion-collapse');
      if (!header || !collapse) return;

      header.addEventListener('click', () => {
        const isActive = item.classList.contains('active');

        // Optional: close other accordion items in the same container
        const parent = item.closest('.accordion-wrapper');
        if (parent && !parent.hasAttribute('data-allow-multiple')) {
          parent.querySelectorAll('.accordion-item').forEach(other => {
            if (other !== item) {
              other.classList.remove('active');
              const c = other.querySelector('.accordion-collapse');
              if (c) c.style.maxHeight = null;
            }
          });
        }

        if (isActive) {
          item.classList.remove('active');
          collapse.style.maxHeight = null;
        } else {
          item.classList.add('active');
          collapse.style.maxHeight = collapse.scrollHeight + 'px';
        }
      });
    });
  }

  // ==========================================================================
  // 3. STATS COUNTER TICKER
  // ==========================================================================
  function initCounters() {
    const counters = document.querySelectorAll('.stat-number');
    if (!counters.length) return;

    let animated = false;

    const animateCounters = () => {
      if (animated) return;
      animated = true;

      counters.forEach(counter => {
        const target = parseFloat(counter.getAttribute('data-target') || '0');
        const suffix = counter.getAttribute('data-suffix') || '';
        const prefix = counter.getAttribute('data-prefix') || '';
        const isDecimal = target % 1 !== 0;
        const duration = 1800;
        const start = 0;
        const startTime = performance.now();

        const update = now => {
          const elapsed = now - startTime;
          const progress = Math.min(elapsed / duration, 1);
          // Ease out expo
          const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
          const current = start + (target - start) * easeProgress;

          counter.textContent = prefix + (isDecimal ? current.toFixed(1) : Math.floor(current)) + suffix;

          if (progress < 1) {
            requestAnimationFrame(update);
          } else {
            counter.textContent = prefix + (isDecimal ? target.toFixed(1) : target) + suffix;
          }
        };

        requestAnimationFrame(update);
      });
    };

    if ('IntersectionObserver' in window) {
      const statsSection = document.querySelector('.stats-grid');
      if (statsSection) {
        const observer = new IntersectionObserver((entries, obs) => {
          if (entries[0].isIntersecting) {
            animateCounters();
            obs.unobserve(statsSection);
          }
        }, { threshold: 0.25 });
        observer.observe(statsSection);
      }
    } else {
      animateCounters();
    }
  }

  // DOM ready
  document.addEventListener('DOMContentLoaded', () => {
    initCartDrawer();
    initAccordion();
    initCounters();
  });
})();
