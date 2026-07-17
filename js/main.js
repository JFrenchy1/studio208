// Reveal-on-scroll. Fail-safe by design: content is only hidden once JS confirms
// it is running (html.js), a single observer covers every .reveal, and a timeout
// force-shows anything the observer misses.
document.documentElement.classList.add('js');

(function () {
  var items = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    items.forEach(function (el) { el.classList.add('visible'); });
    return;
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  items.forEach(function (el) { io.observe(el); });

  setTimeout(function () {
    items.forEach(function (el) { el.classList.add('visible'); });
  }, 2500);
})();
