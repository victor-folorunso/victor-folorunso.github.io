# Folorunso Victor Wonderful, personal website

A single page personal site, built from my CV. Plain HTML, CSS and JavaScript,
with no template, no framework, no build step and no dependencies.

Open `index.html` in a browser. That is the whole setup.

## Files

```
index.html    Structure and content
style.css     All styling
script.js     All behaviour
images/       Five photographs, each at two sizes
favicon-32.png, favicon-180.png
```

## What is hand written

Everything. The parts worth pointing at:

**The photo lightbox.** Opens on click, navigates with the arrow keys, closes on
Escape or a click outside. Focus moves into the dialog when it opens, is trapped
inside it while it is open so Tab cannot wander into the page behind, and
returns to the tile you came from when it closes. Page scroll is locked while it
is open, which matters most on a phone.

The gallery tiles are real `<button>` elements rather than divs with click
handlers, so keyboard and screen reader support comes from the browser instead
of being reconstructed with ARIA.

**Layout.** CSS Grid for the page, and CSS multi column for the gallery, because
the photographs mix portrait and landscape and a fixed grid would either crop
them badly or leave holes.

**Responsive images.** Each photograph exists at two widths and is served with
`srcset`, so a phone never downloads the large one. The five originals came to
6.4MB; these come to about 1.1MB.

**Scroll behaviour.** An IntersectionObserver marks the section being read in
the navigation, and a second one fades content in as it arrives. Both degrade
safely: the reveal class is added by script rather than sitting in the HTML, so
with JavaScript disabled nothing is ever left invisible, and anything still
hidden after three seconds is shown regardless.

**Accessibility.** One `h1`, headings in order, a skip link, visible focus rings,
alt text on every image, and `prefers-reduced-motion` respected.

**Dark mode.** A second palette rather than an inversion. The green accent is
lifted, because the deep green used on the light background is close to
unreadable on a dark one.

**Print.** The page prints to PDF cleanly, which matters when someone forwards
it. The navigation, buttons and lightbox are dropped, and anything mid animation
is forced visible, because print never scrolls and would otherwise lose whole
sections.
