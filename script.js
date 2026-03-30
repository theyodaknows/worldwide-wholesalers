'use strict';

// Tab switching for collections section
function initCategoryTabs() {
  const tabs = Array.from(document.querySelectorAll('.cat-tab'));
  const grids = document.querySelectorAll('.cat-grid');

  function activateTab(tab) {
    tabs.forEach(t => {
      t.classList.remove('active');
      t.setAttribute('aria-selected', 'false');
      t.setAttribute('tabindex', '-1');
    });
    tab.classList.add('active');
    tab.setAttribute('aria-selected', 'true');
    tab.setAttribute('tabindex', '0');

    grids.forEach(grid => {
      grid.hidden = grid.dataset.category !== tab.dataset.category;
    });

    var productRows = document.querySelectorAll('.product-row');
    productRows.forEach(function (row) {
      row.hidden = row.dataset.category !== tab.dataset.category;
    });
  }

  tabs.forEach((tab, i) => {
    tab.addEventListener('click', () => activateTab(tab));

    tab.addEventListener('keydown', e => {
      let nextIndex = null;
      if (e.key === 'ArrowRight') nextIndex = (i + 1) % tabs.length;
      if (e.key === 'ArrowLeft') nextIndex = (i - 1 + tabs.length) % tabs.length;
      if (e.key === 'Home') nextIndex = 0;
      if (e.key === 'End') nextIndex = tabs.length - 1;

      if (nextIndex !== null) {
        e.preventDefault();
        activateTab(tabs[nextIndex]);
        tabs[nextIndex].focus();
      }
    });
  });

  // Set initial tabindex state: active tab is 0, others are -1
  tabs.forEach((tab, i) => {
    tab.setAttribute('tabindex', i === 0 ? '0' : '-1');
  });
}

// Mobile nav toggle
function initMobileNav() {
  const toggle = document.getElementById('nav-toggle');
  const menu = document.getElementById('nav-menu');
  if (!toggle || !menu) return;

  toggle.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });

  // Close on outside click
  document.addEventListener('click', e => {
    if (!toggle.contains(e.target) && !menu.contains(e.target)) {
      menu.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });

  // Close on Escape key
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && menu.classList.contains('open')) {
      menu.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.focus();
    }
  });
}

// =====================
// CART (localStorage)
// =====================
window.Cart = (function () {
  var STORAGE_KEY = 'ww_cart';

  function getItems() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    } catch (e) {
      return [];
    }
  }

  function getCount() {
    return getItems().reduce(function (sum, item) { return sum + item.qty; }, 0);
  }

  function _save(items) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      // Storage full or disabled — cart changes won't persist
    }
  }

  function _notify() {
    document.dispatchEvent(new CustomEvent('cart-updated'));
  }

  function add(productId, qty) {
    var items = getItems();
    var existing = items.find(function (i) { return i.id === productId; });
    if (existing) {
      existing.qty += qty;
    } else {
      items.push({ id: productId, qty: qty });
    }
    _save(items);
    _notify();
  }

  function update(productId, qty) {
    var items = getItems();
    if (qty <= 0) {
      items = items.filter(function (i) { return i.id !== productId; });
    } else {
      var existing = items.find(function (i) { return i.id === productId; });
      if (existing) { existing.qty = qty; }
    }
    _save(items);
    _notify();
  }

  function remove(productId) {
    var items = getItems().filter(function (i) { return i.id !== productId; });
    _save(items);
    _notify();
  }

  function clear() {
    _save([]);
    _notify();
  }

  return { getItems: getItems, getCount: getCount, add: add, update: update, remove: remove, clear: clear };
}());

// =====================
// CART BADGE
// =====================
function initCartBadge() {
  var badge = document.getElementById('nav-cart-badge');
  var btn = document.getElementById('nav-cart-btn');
  if (!badge) return;

  function update() {
    var count = Cart.getCount();
    badge.textContent = count;
    badge.hidden = count === 0;
    if (btn) {
      btn.setAttribute('aria-label', 'Open shopping cart (' + count + ' item' + (count === 1 ? '' : 's') + ')');
    }
  }

  update();
  document.addEventListener('cart-updated', update);
}

// =====================
// PRODUCT ROWS (index.html)
// =====================
function initProductRows() {
  var categories = ['beauty', 'women', 'children'];
  categories.forEach(function (cat) {
    var container = document.getElementById('products-' + cat);
    if (!container) return;
    var catProducts = PRODUCTS.filter(function (p) { return p.category === cat; });
    catProducts.forEach(function (product) {
      var card = document.createElement('a');
      card.href = 'product.html?id=' + product.id;
      card.className = 'product-card';
      var badgeHtml = product.badge
        ? '<span class="cat-card-badge' + (product.badge === 'Hot' ? ' cat-card-badge--hot' : '') + '">' + product.badge + '</span>'
        : '';
      card.innerHTML =
        '<div class="product-card-img">' +
          '<img src="' + product.image + '" alt="' + product.name + '" loading="lazy" />' +
          badgeHtml +
        '</div>' +
        '<div class="product-card-info">' +
          '<span class="product-card-cat">' + product.subcategory + '</span>' +
          '<h3 class="product-card-name">' + product.name + '</h3>' +
          '<span class="product-card-price">' + product.price + '</span>' +
          '<span class="product-card-moq">MOQ: ' + product.moq + ' units</span>' +
        '</div>';
      container.appendChild(card);
    });
  });
}

// =====================
// CART SIDEBAR
// =====================
function initCartSidebar() {
  // Inject sidebar HTML once
  if (document.getElementById('cart-sidebar')) return;

  var overlay = document.createElement('div');
  overlay.className = 'cart-overlay';
  overlay.id = 'cart-overlay';
  overlay.hidden = true;

  var sidebar = document.createElement('aside');
  sidebar.className = 'cart-sidebar';
  sidebar.id = 'cart-sidebar';
  sidebar.setAttribute('role', 'dialog');
  sidebar.setAttribute('aria-label', 'Shopping cart');
  sidebar.setAttribute('aria-hidden', 'true');
  sidebar.innerHTML =
    '<div class="cart-header">' +
      '<h2 class="cart-title">Your Cart</h2>' +
      '<button class="cart-close" id="cart-close" type="button" aria-label="Close cart">✕</button>' +
    '</div>' +
    '<div class="cart-body" id="cart-body"></div>' +
    '<div class="cart-footer" id="cart-footer">' +
      '<a href="checkout.html" class="cart-checkout-btn">Request Quote</a>' +
    '</div>';

  document.body.appendChild(overlay);
  document.body.appendChild(sidebar);

  var cartBtn = document.getElementById('nav-cart-btn');
  var closeBtn = document.getElementById('cart-close');

  // Event delegation for cart item controls (attached once, not per render)
  var cartBody = document.getElementById('cart-body');
  cartBody.addEventListener('click', function (e) {
    var qtyBtn = e.target.closest('.cart-item-qty-btn');
    var removeBtn = e.target.closest('.cart-item-remove');
    if (qtyBtn) {
      var id = qtyBtn.dataset.id;
      var currentItem = Cart.getItems().find(function (i) { return i.id === id; });
      if (!currentItem) return;
      if (qtyBtn.dataset.action === 'minus') {
        Cart.update(id, currentItem.qty - 1);
      } else {
        Cart.update(id, currentItem.qty + 1);
      }
    }
    if (removeBtn) {
      Cart.remove(removeBtn.dataset.id);
    }
  });

  function openSidebar() {
    overlay.hidden = false;
    // Force reflow so CSS transition plays
    overlay.offsetHeight;
    overlay.classList.add('open');
    sidebar.classList.add('open');
    sidebar.setAttribute('aria-hidden', 'false');
    renderCartSidebar();
    if (closeBtn) closeBtn.focus();
    document.body.style.overflow = 'hidden';
  }

  function closeSidebar() {
    overlay.classList.remove('open');
    sidebar.classList.remove('open');
    sidebar.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    // Hide overlay after transition
    setTimeout(function () { overlay.hidden = true; }, 300);
    if (cartBtn) cartBtn.focus();
  }

  if (cartBtn) cartBtn.addEventListener('click', openSidebar);
  if (closeBtn) closeBtn.addEventListener('click', closeSidebar);
  overlay.addEventListener('click', closeSidebar);
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && sidebar.classList.contains('open')) {
      closeSidebar();
    }
  });

  // Re-render sidebar when cart changes (if open)
  document.addEventListener('cart-updated', function () {
    if (sidebar.classList.contains('open')) renderCartSidebar();
  });
}

function renderCartSidebar() {
  var body = document.getElementById('cart-body');
  var footer = document.getElementById('cart-footer');
  if (!body) return;

  var items = Cart.getItems();

  if (items.length === 0) {
    body.innerHTML =
      '<div class="cart-empty">' +
        '<p>Your cart is empty.</p>' +
        '<a href="index.html#collections" class="cart-empty-link">Browse Collections →</a>' +
      '</div>';
    if (footer) footer.hidden = true;
    return;
  }

  if (footer) footer.hidden = false;

  var html = '';
  items.forEach(function (item) {
    var product = PRODUCTS.find(function (p) { return p.id === item.id; });
    if (!product) return;
    html +=
      '<div class="cart-item" data-id="' + item.id + '">' +
        '<img src="' + product.image + '" alt="' + product.name + '" class="cart-item-img" />' +
        '<div class="cart-item-info">' +
          '<span class="cart-item-name">' + product.name + '</span>' +
          '<span class="cart-item-price">' + product.price + '</span>' +
          '<div class="cart-item-qty">' +
            '<button class="cart-item-qty-btn" data-action="minus" data-id="' + item.id + '" type="button" aria-label="Decrease quantity of ' + product.name + '">−</button>' +
            '<span class="cart-item-qty-val">' + item.qty + '</span>' +
            '<button class="cart-item-qty-btn" data-action="plus" data-id="' + item.id + '" type="button" aria-label="Increase quantity of ' + product.name + '">+</button>' +
          '</div>' +
        '</div>' +
        '<button class="cart-item-remove" data-id="' + item.id + '" type="button" aria-label="Remove ' + product.name + ' from cart">✕</button>' +
      '</div>';
  });
  body.innerHTML = html;
}

// =====================
// PRODUCT DETAIL (product.html)
// =====================
function initProductDetail() {
  var container = document.getElementById('product-detail');
  if (!container) return;

  var params = new URLSearchParams(window.location.search);
  var id = params.get('id');
  var product = PRODUCTS.find(function (p) { return p.id === id; });

  if (!product) {
    container.innerHTML =
      '<div class="pd-not-found">' +
        '<p>Product not found.</p>' +
        '<a href="index.html#collections" class="pd-back">← Back to Collections</a>' +
      '</div>';
    return;
  }

  // Set page title
  document.title = product.name + ' | Worldwide Wholesalers';

  var badgeHtml = product.badge
    ? '<span class="cat-card-badge' + (product.badge === 'Hot' ? ' cat-card-badge--hot' : '') + '">' + product.badge + '</span>'
    : '';

  container.innerHTML =
    '<div class="pd-layout">' +
      '<div class="pd-image">' +
        '<img src="' + product.image + '" alt="' + product.name + '" />' +
        badgeHtml +
      '</div>' +
      '<div class="pd-info">' +
        '<a href="index.html#collections" class="pd-back">← Back to Collections</a>' +
        '<span class="pd-cat">' + product.category.charAt(0).toUpperCase() + product.category.slice(1) + ' · ' + product.subcategory + '</span>' +
        '<h1 class="pd-name">' + product.name + '</h1>' +
        '<span class="pd-price">' + product.price + '</span>' +
        '<p class="pd-desc">' + product.description + '</p>' +
        '<div class="pd-moq">Minimum Order: <strong>' + product.moq + ' units</strong></div>' +
        '<div class="pd-qty">' +
          '<label for="pd-qty-input" class="pd-qty-label">Quantity:</label>' +
          '<button class="pd-qty-btn" id="pd-qty-minus" type="button" aria-label="Decrease quantity">−</button>' +
          '<input type="number" id="pd-qty-input" class="pd-qty-input" value="' + product.moq + '" min="1" step="1" aria-label="Order quantity" />' +
          '<button class="pd-qty-btn" id="pd-qty-plus" type="button" aria-label="Increase quantity">+</button>' +
        '</div>' +
        '<button class="pd-add-btn" id="pd-add-btn" type="button">Add to Cart</button>' +
      '</div>' +
    '</div>';

  // Quantity controls
  var qtyInput = document.getElementById('pd-qty-input');
  document.getElementById('pd-qty-minus').addEventListener('click', function () {
    var val = parseInt(qtyInput.value, 10) || 1;
    if (val > 1) qtyInput.value = val - 1;
  });
  document.getElementById('pd-qty-plus').addEventListener('click', function () {
    var val = parseInt(qtyInput.value, 10) || 1;
    qtyInput.value = val + 1;
  });

  // Add to cart
  var addBtn = document.getElementById('pd-add-btn');
  addBtn.addEventListener('click', function () {
    var qty = parseInt(qtyInput.value, 10) || product.moq;
    if (qty < 1) qty = 1;
    Cart.add(product.id, qty);
    addBtn.textContent = 'Added!';
    addBtn.classList.add('pd-add-btn--added');
    setTimeout(function () {
      addBtn.textContent = 'Add to Cart';
      addBtn.classList.remove('pd-add-btn--added');
    }, 1500);
  });
}

// =====================
// CHECKOUT (checkout.html)
// =====================
function initCheckout() {
  var form = document.getElementById('checkout-form');
  var summaryEl = document.getElementById('checkout-summary');
  var errorEl = document.getElementById('checkout-error');
  if (!form) return;

  // Render order summary
  function renderSummary() {
    var items = Cart.getItems();
    if (!summaryEl) return;
    if (items.length === 0) {
      summaryEl.innerHTML =
        '<div class="checkout-empty">' +
          '<p>Your cart is empty.</p>' +
          '<a href="index.html#collections" class="pd-back">← Browse Collections</a>' +
        '</div>';
      return;
    }
    var html = '<h2 class="checkout-summary-title">Order Summary</h2>';
    items.forEach(function (item) {
      var product = PRODUCTS.find(function (p) { return p.id === item.id; });
      if (!product) return;
      html +=
        '<div class="checkout-line">' +
          '<span class="checkout-line-name">' + product.name + '</span>' +
          '<span class="checkout-line-detail">× ' + item.qty + ' &nbsp;·&nbsp; ' + product.price + '</span>' +
        '</div>';
    });
    summaryEl.innerHTML = html;
  }

  renderSummary();

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (errorEl) errorEl.hidden = true;

    var items = Cart.getItems();
    if (items.length === 0) {
      if (errorEl) {
        errorEl.textContent = 'Your cart is empty. Add products before submitting a quote.';
        errorEl.hidden = false;
      }
      return;
    }

    var bizName = form.bizName.value.trim();
    var contactName = form.contactName.value.trim();
    var email = form.email.value.trim();
    var whatsapp = form.whatsapp.value.trim();
    var notes = form.notes.value.trim();

    if (!bizName || !contactName || !email || !whatsapp) {
      if (errorEl) {
        errorEl.textContent = 'Please fill in all required fields.';
        errorEl.hidden = false;
      }
      return;
    }

    // Build order lines
    var orderLines = items.map(function (item) {
      var product = PRODUCTS.find(function (p) { return p.id === item.id; });
      return product
        ? '• ' + product.name + ' × ' + item.qty + ' (' + product.price + ')'
        : '• Unknown product × ' + item.qty;
    }).join('\n');

    var message =
      '*NEW WHOLESALE INQUIRY*\n' +
      'From: ' + bizName + '\n' +
      'Contact: ' + contactName + '\n' +
      'Email: ' + email + '\n' +
      'WhatsApp: ' + whatsapp + '\n\n' +
      '*ORDER DETAILS:*\n' +
      orderLines + '\n\n' +
      '*Notes:* ' + (notes || 'None');

    // TODO: replace 15551234567 with real WhatsApp number in E.164 format (no + or spaces)
    var waUrl = 'https://wa.me/15551234567?text=' + encodeURIComponent(message);
    window.open(waUrl, '_blank', 'noopener,noreferrer');

    Cart.clear();
    renderSummary();

    // Show confirmation
    form.innerHTML =
      '<div class="checkout-confirm">' +
        '<p class="checkout-confirm-title">Quote request sent!</p>' +
        '<p class="checkout-confirm-sub">WhatsApp has opened with your order details. We\'ll be in touch within 24 hours.</p>' +
        '<a href="index.html" class="checkout-submit" style="text-align:center;display:block;text-decoration:none;">Back to Collections</a>' +
      '</div>';
  });
}

document.addEventListener('DOMContentLoaded', function () {
  initMobileNav();
  initCartBadge();
  initCartSidebar();
  if (document.querySelector('.cat-tab')) {
    initCategoryTabs();
    initProductRows();
  }
  if (document.getElementById('product-detail')) {
    initProductDetail();
  }
  if (document.getElementById('checkout-form')) {
    initCheckout();
  }
});
