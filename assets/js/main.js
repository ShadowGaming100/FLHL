/* FLHL — shared sidebar + theme JS */
(function () {
  var nav = document.getElementById('mainNav');
  var overlay = document.getElementById('navOverlay');
  var ham = document.getElementById('hamburgerBtn');
  var close = document.getElementById('navCloseBtn');
  var themeBtns = document.querySelectorAll('.theme-btn, .theme-btn-mobile');

  function openNav() {
    nav.classList.add('open');
    overlay.classList.add('open');
    overlay.removeAttribute('aria-hidden');
    ham.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeNav() {
    nav.classList.remove('open');
    overlay.classList.remove('open');
    overlay.setAttribute('aria-hidden', 'true');
    ham.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    ham.focus();
  }

  function toggleNav() {
    nav.classList.contains('open') ? closeNav() : openNav();
  }

  function toggleTheme() {
    var t = document.documentElement.getAttribute('data-theme');
    var n = t === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', n);
    localStorage.setItem('theme', n);
  }

  if (ham) ham.addEventListener('click', toggleNav);
  if (close) close.addEventListener('click', closeNav);
  if (overlay) overlay.addEventListener('click', closeNav);
  for (var i = 0; i < themeBtns.length; i++)
    themeBtns[i].addEventListener('click', function (e) {
      e.stopPropagation();
      toggleTheme();
    });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && nav && nav.classList.contains('open')) closeNav();
  });

  if (nav)
    nav.addEventListener('keydown', function (e) {
      if (e.key === 'Tab') {
        var f = nav.querySelectorAll('a, button, [tabindex]');
        var fi = Array.prototype.indexOf.call(f, document.activeElement);
        if (e.shiftKey && fi === 0) {
          e.preventDefault();
          f[f.length - 1].focus();
        } else if (!e.shiftKey && fi === f.length - 1) {
          e.preventDefault();
          f[0].focus();
        }
      }
    });
})();
