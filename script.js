/*
  Four small things, hand written, no framework and no build step.

  The page is meant to work if this file never loads: every image is in the
  markup, the lightbox is in the markup and simply stays hidden, and nothing is
  made invisible by CSS that only JavaScript can bring back.
*/

(function () {
  'use strict';

  /* ── 1. Hide any image that is missing ─────────────────────────────────
     A broken image icon looks worse than no image, so the whole figure goes
     and the layout closes over it. */
  document.querySelectorAll('.portrait img, .tile img').forEach(function (img) {
    function drop() {
      var host = img.closest('figure') || img.closest('li');
      if (host) host.hidden = true;
    }
    img.addEventListener('error', drop);
    // A cached failure fires before this script runs, so check the ones that
    // have already finished.
    if (img.complete && img.naturalWidth === 0) drop();
  });

  /* ── 2. Mark the section being read ────────────────────────────────────
     rootMargin pulls the trigger line about a third down the viewport, so the
     highlight changes when a section is actually being looked at rather than
     when its first pixel appears. */
  var links = Array.prototype.slice.call(document.querySelectorAll('.nav a[href^="#"]'));
  var sections = links
    .map(function (a) { return document.querySelector(a.getAttribute('href')); })
    .filter(Boolean);

  if ('IntersectionObserver' in window && sections.length) {
    var spy = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          links.forEach(function (a) {
            a.classList.toggle('is-current', a.getAttribute('href') === '#' + entry.target.id);
          });
        });
      },
      { rootMargin: '-33% 0px -60% 0px' }
    );
    sections.forEach(function (s) { spy.observe(s); });
  }

  /* ── 3. Reveal on scroll ───────────────────────────────────────────────
     The class is added here rather than in the HTML, so with JavaScript off
     nothing is ever left invisible. Skipped when less motion is asked for. */
  var still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!still && 'IntersectionObserver' in window) {
    var targets = document.querySelectorAll('.project, .stack > div, .sec-title, .big, .gallery li');
    targets.forEach(function (el) { el.classList.add('reveal'); });

    var shower = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-in');
          shower.unobserve(entry.target);
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.05 }
    );
    targets.forEach(function (el) { shower.observe(el); });

    /* Belt and braces. Anything still hidden after three seconds gets shown.
       An observer that never fires, because the tab was in the background or
       the page was captured rather than scrolled, would otherwise leave real
       content permanently invisible. A late fade beats an unreadable section. */
    window.setTimeout(function () {
      targets.forEach(function (el) { el.classList.add('is-in'); });
    }, 3000);
  }

  /* ── 4. Lightbox ───────────────────────────────────────────────────────
     Written by hand rather than pulled in, since the whole point of this page
     is the HTML, CSS and JavaScript.

     The tiles are real buttons in the markup, so keyboard and screen reader
     support comes from the browser rather than from ARIA bolted on afterwards.
     What is left is the part a library would do: remember what had focus,
     trap Tab inside the dialog while it is open, and give it back on close. */
  var box = document.getElementById('lightbox');
  var tiles = Array.prototype.slice.call(document.querySelectorAll('.tile'));

  if (box && tiles.length) {
    var img = document.getElementById('lb-img');
    var cap = document.getElementById('lb-cap');
    var btnClose = box.querySelector('.lb-close');
    var btnPrev = box.querySelector('.lb-prev');
    var btnNext = box.querySelector('.lb-next');
    var index = 0;
    var opener = null;

    function show(i) {
      index = (i + tiles.length) % tiles.length;
      var tile = tiles[index];
      img.src = tile.getAttribute('data-full');
      // Reuse the alt already written for the thumbnail rather than inventing
      // a second description that can drift away from it.
      img.alt = tile.querySelector('img').alt;
      cap.textContent = tile.getAttribute('data-caption') || '';
    }

    function open(i) {
      opener = document.activeElement;
      show(i);
      box.hidden = false;
      // Stops the page scrolling behind the overlay on touch devices.
      document.body.style.overflow = 'hidden';
      btnClose.focus();
    }

    function close() {
      box.hidden = true;
      document.body.style.overflow = '';
      img.src = '';
      if (opener && opener.focus) opener.focus();
    }

    tiles.forEach(function (tile, i) {
      tile.addEventListener('click', function () { open(i); });
    });

    btnClose.addEventListener('click', close);
    btnPrev.addEventListener('click', function () { show(index - 1); });
    btnNext.addEventListener('click', function () { show(index + 1); });

    // Clicking the backdrop closes. Clicking the picture does not.
    box.addEventListener('click', function (e) {
      if (e.target === box) close();
    });

    document.addEventListener('keydown', function (e) {
      if (box.hidden) return;
      if (e.key === 'Escape') { close(); return; }
      if (e.key === 'ArrowLeft') { show(index - 1); return; }
      if (e.key === 'ArrowRight') { show(index + 1); return; }

      // Focus trap. Without it, tabbing walks out of the dialog and into the
      // page underneath, which is still there and still scrollable.
      if (e.key === 'Tab') {
        var stops = [btnClose, btnPrev, btnNext];
        var at = stops.indexOf(document.activeElement);
        e.preventDefault();
        var next = e.shiftKey ? at - 1 : at + 1;
        stops[(next + stops.length) % stops.length].focus();
      }
    });
  }
})();
