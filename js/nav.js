// Switches the header between the side-label layout and the narrow top-bar layout.
// Side labels are used only while each one fits in its gutter with MARGIN px on both sides.
(() => {
  const MARGIN = 20;
  const root = document.documentElement;
  const header = document.querySelector('.site-header');
  const title = header.querySelector('.site-title');
  const nav = header.querySelector('.site-nav');
  const images = document.querySelectorAll('.slide img');

  const update = () => {
    // Measure in the side layout, then decide (no paint happens in between).
    root.classList.remove('nav-top');

    // Home page: size the header's middle column to the widest carousel image,
    // so the gutters are the real space between the screen edge and the picture.
    if (images.length) {
      const widest = Math.max(...Array.from(images, (img) => img.getBoundingClientRect().width));
      if (widest > 0) root.style.setProperty('--frame-w', `${widest}px`);
    }

    const cols = getComputedStyle(header).gridTemplateColumns.split(' ').map(parseFloat);
    const leftGutter = cols[0];
    const rightGutter = cols[cols.length - 1];
    const fits =
      title.getBoundingClientRect().width + 2 * MARGIN <= leftGutter &&
      nav.getBoundingClientRect().width + 2 * MARGIN <= rightGutter;
    root.classList.toggle('nav-top', !fits);
  };

  update();
  window.addEventListener('resize', update);
  window.addEventListener('load', update); // images now have their real sizes
  document.fonts?.ready.then(update);
})();
