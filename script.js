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
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
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

document.addEventListener('DOMContentLoaded', () => {
  initCategoryTabs();
  initMobileNav();
  initCartBadge();
});
