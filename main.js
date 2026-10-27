document.addEventListener('DOMContentLoaded', function () {
  var toggle = document.querySelector('[data-menu-toggle]');
  var menu = document.querySelector('[data-mobile-menu]');
  if (toggle && menu) {
    toggle.addEventListener('click', function () {
      var open = menu.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    });
    menu.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        menu.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-label', 'Open menu');
      });
    });
  }
  var links = document.querySelectorAll('.mainnav a[href^="#"]');
  var map = {};
  links.forEach(function (a) { map[a.getAttribute('href').slice(1)] = a; });
  var spy = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        links.forEach(function (a) { a.classList.remove('active'); });
        var a = map[e.target.id];
        if (a) a.classList.add('active');
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });
  ['menu', 'about', 'range', 'gallery', 'visit'].forEach(function (id) {
    var el = document.getElementById(id);
    if (el) spy.observe(el);
  });
  var form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = document.getElementById('ct-name').value;
      var topic = document.getElementById('ct-topic').value;
      var note = document.getElementById('ct-note').value;
      var subject = encodeURIComponent('Enquiry: ' + topic);
      var body = encodeURIComponent('Hi Coral Resort Bakery,\n\nTopic: ' + topic + '\nName: ' + name + '\nMessage: ' + note + '\n\nThank you!');
      window.location.href = 'mailto:coralbaybakery@iinet.net.au?subject=' + subject + '&body=' + body;
    });
  }
});
