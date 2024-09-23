'use strict';

document.addEventListener('DOMContentLoaded', function () {
  /* ------------ Tabs ------------ */
  var tabs = document.querySelectorAll('.js-tabs');
  tabs.forEach(function (item) {
    item.querySelectorAll('.js-tabs-trigger').forEach(function (item, i) {
      item.addEventListener('click', function (e) {
        e.preventDefault();
        var target = e.target.closest('.js-tabs-trigger');
        if (target.classList.contains('is-active')) return;
        var hash = target.getAttribute('href');
        if (hash && hash !== '#') {
          window.location.hash = hash;
        }
        var root = target.closest('.js-tabs');
        root.querySelector('.js-tabs-trigger.is-active').classList.remove('is-active');
        root.querySelector('.js-tabs-pane.is-active').classList.remove('is-active');
        root.querySelectorAll('.js-tabs-trigger')[i].classList.add('is-active');
        root.querySelectorAll('.js-tabs-pane')[i].classList.add('is-active');
      });
    });
  });
  var currentHash = window.location.hash;
  var hashTab = document.querySelector('.js-tabs-trigger[href="' + currentHash + '"]');
  if (hashTab) {
    // hashTab.click();
    var ev = new Event('click');
    hashTab.dispatchEvent(ev);
  }
  /* ------------ Tabs ------------ */

  /* ========================= Navbar ========================= */
  var toggleNavbar = document.querySelector('.navbar-trigger');

  /* Toggler Navbar */
  if (toggleNavbar) {
    toggleNavbar.addEventListener('click', function () {
      var body = document.body;
      if (!body.classList.contains('is-navbar-opened')) {
        body.classList.add('is-navbar-opened');
        body.style.paddingRight = scrollWidth() + 'px';
        toggleNavbar.classList.add('is-active');
      } else {
        body.classList.remove('is-navbar-opened');
        body.style.paddingRight = '';
        toggleNavbar.classList.remove('is-active');
      }
    });
    /* Toggler Navbar */

    /* Toggles Deep Levels Inside */
    // create toggles
    var navbarLinks = document.querySelectorAll('.navbar a');
    // let navbarLinks = document.querySelectorAll('.navbar .icon');

    navbarLinks.forEach(function (item) {
      if (item.closest('li').querySelector('ul')) {
        item.classList.add('has-dropdown');
      }
    });
    var dropdownToggles = document.querySelectorAll('.navbar .has-dropdown');
    dropdownToggles.forEach(function (item) {
      item.addEventListener('click', function (e) {
        item.closest('li').classList.toggle('is-opened');
        e.preventDefault();
      });
    });
    /* Toggles Deep Levels Inside */
  }
  /* ========================= Navbar ========================= */

  /* ------------ Modal Wins ------------ */
  var modalInstance = null;
  document.addEventListener('click', function (e) {
    var target = e.target.closest('[data-modal-win-trigger]');
    if (!target) return;
    var winId = target.dataset.modalWinTrigger;
    if (modalInstance) {
      modalInstance.close();
    }
    modalInstance = new Modal({
      content: document.querySelector('[data-modal-win="' + winId + '"]'),
      className: "modal-win__main--".concat(winId),
      // closeOutside: false,
      afterOpen: function afterOpen() {
        document.body.style.paddingRight = scrollWidth() + 'px';
      },
      beforeClose: function beforeClose() {
        document.body.style.paddingRight = '';
      }
    });
    modalInstance.open();
    e.preventDefault();
  });

  /* close btn */
  document.addEventListener('click', function (e) {
    var trigger = e.target.closest('.js-modal-close');
    if (!trigger) return;
    var closeBtn = trigger.closest('.modal-win').querySelector('.modal-win__close');
    if (closeBtn) {
      closeBtn.click();
    }
  });
  /* /close btn */
  /* ------------ Modal Wins ------------ */

  /* ------------ Is Element Visible ------------ */
  var isElemVisible = function isElemVisible(elem) {
    return !!elem && !!(elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length);
  };
  /* ------------ Is Element Visible ------------ */

  /* ------------ is touch helper ------------ */
  if ('ontouchstart' in window || navigator.msMaxTouchPoints) {
    document.documentElement.classList.add('is-touch');
  }
  /* ------------ is touch helper ------------ */

  /* ------------ iOS vh bug ------------ */
  var appHeight = function appHeight() {
    var doc = document.documentElement;
    var vh = window.innerHeight * 0.01;
    doc.style.setProperty('--vh', "".concat(vh, "px"));
  };
  window.addEventListener('resize', appHeight);
  appHeight();

  //height: calc(var(--vh, 1vh) * 100);
  /* ------------ iOS vh bug ------------ */

  /* -------- Accordions --------- */
  // init accordions
  if (document.querySelector('.js-accordion')) {
    var accordions = document.querySelectorAll('.js-accordion');
    accordions.forEach(function (accordion) {
      if (!accordion.classList.contains('is-active')) {
        var body = accordion.querySelector('.js-accordion-body');
        body.hidden = true;
      }
    });
  }
  document.body.addEventListener('click', function (e) {
    var accordionTrigger = e.target.closest('.js-accordion-trigger');
    if (!accordionTrigger) return;
    var parent = accordionTrigger.closest('.js-accordion');
    var body = parent.querySelector('.js-accordion-body');
    if (parent.classList.contains('is-active')) {
      slideUp(body, 300, function () {
        parent.classList.remove('is-active');
      });
    } else {
      slideDown(body, 300, function () {
        parent.classList.add('is-active');
      });
    }
  });
  /* -------- Accordions --------- */

  /**
   * Password Visibility Toggle
   */
  document.addEventListener('click', function (_ref) {
    var target = _ref.target;
    var passwordVisibilityToggle = target.closest('.js-password-visibility-trigger');
    if (!passwordVisibilityToggle) return;
    var input = passwordVisibilityToggle.parentNode.querySelector('.input');
    if (input) {
      input.type = input.type === 'password' ? 'text' : 'password';
    }
  });
});

/* ------------ Lazy Load Video From YouTube ------------ */
function init() {
  var vidDefer = document.getElementsByTagName('iframe');
  for (var i = 0; i < vidDefer.length; i++) {
    if (vidDefer[i].getAttribute('data-src')) {
      vidDefer[i].setAttribute('src', vidDefer[i].getAttribute('data-src'));
    }
  }
}
window.onload = init;
/* ------------ Lazy Load Video From YouTube ------------ */

/* ------------ Helpers ------------ */
function scrollWidth() {
  var div = document.createElement('div');
  div.style.overflowY = 'scroll';
  div.style.width = '50px';
  div.style.height = '50px';
  div.style.visibility = 'hidden';
  document.body.appendChild(div);
  var scrollWidth = div.offsetWidth - div.clientWidth;
  document.body.removeChild(div);
  return scrollWidth;
}
function addOverlay() {
  var overlay = document.createElement('div');
  overlay.className = 'overlay';
  document.body.appendChild(overlay);
}
function removeOverlay() {
  var overlay = document.querySelector('.overlay');
  if (overlay) overlay.remove();
}
function debounce(func, wait, immediate) {
  var timeout;
  return function () {
    var context = this,
      args = arguments;
    var later = function later() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}
;
function throttle(callback, limit) {
  var waiting = false; // Initially, we're not waiting

  return function () {
    // We return a throttled function
    if (!waiting) {
      // If we're not waiting
      callback.apply(this, arguments); // Execute users function
      waiting = true; // Prevent future invocations
      setTimeout(function () {
        // After a period of time
        waiting = false; // And allow future invocations
      }, limit);
    }
  };
}
function slideUp(target) {
  var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;
  var callback = arguments.length > 2 ? arguments[2] : undefined;
  if (!target.classList.contains('in-progress')) {
    target.classList.add('in-progress');
    target.style.transitionProperty = 'height, margin, padding';
    target.style.transitionDuration = duration + 'ms';
    target.style.height = "".concat(target.offsetHeight, "px");
    target.offsetHeight;
    target.style.overflow = 'hidden';
    target.style.height = 0;
    target.style.paddingTop = 0;
    target.style.paddingBottom = 0;
    target.style.marginTop = 0;
    target.style.marginBottom = 0;
    window.setTimeout(function () {
      target.hidden = true;
      target.style.removeProperty('height');
      target.style.removeProperty('padding-top');
      target.style.removeProperty('padding-bottom');
      target.style.removeProperty('margin-top');
      target.style.removeProperty('margin-bottom');
      target.style.removeProperty('overflow');
      target.style.removeProperty('transition-duration');
      target.style.removeProperty('transition-property');
      target.classList.remove('in-progress');
      callback();
    }, duration);
  }
}
function slideDown(target) {
  var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;
  var callback = arguments.length > 2 ? arguments[2] : undefined;
  if (!target.classList.contains('in-progress')) {
    target.classList.add('in-progress');
    target.hidden = target.hidden ? false : null;
    var height = target.offsetHeight;
    target.style.overflow = 'hidden';
    target.style.height = 0;
    target.style.paddingTop = 0;
    target.style.paddingBottom = 0;
    target.style.marginTop = 0;
    target.style.marginBottom = 0;
    target.offsetHeight;
    target.style.transitionProperty = 'height, margin, padding';
    target.style.transitionDuration = duration + 'ms';
    target.style.height = height + 'px';
    target.style.removeProperty('padding-top');
    target.style.removeProperty('padding-bottom');
    target.style.removeProperty('margin-top');
    target.style.removeProperty('margin-bottom');
    window.setTimeout(function () {
      target.style.removeProperty('height');
      target.style.removeProperty('overflow');
      target.style.removeProperty('transition-duration');
      target.style.removeProperty('transition-property');
      target.classList.remove('in-progress');
      callback();
    }, duration);
  }
}
function slideToggle(target) {
  var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;
  if (target.hidden) {
    return slideDown(target, duration);
  } else {
    return slideUp(target, duration);
  }
}