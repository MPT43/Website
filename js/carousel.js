// Fading carousel: each .slide (picture + caption) shows one at a time.
// Click the right half of the picture (or press →) for next, left half (or ←) for previous.
// Swipe works on touch screens. Controls only appear when there are 2+ slides.
document.querySelectorAll('.slideshow').forEach((slideshow) => {
  const track = slideshow.querySelector('.slides');
  const slides = Array.from(track.querySelectorAll('.slide'));
  let index = 0;

  slides[0]?.classList.add('is-active');
  if (slides.length < 2) return;

  // Slide counter ("1 / 5") — uncomment these lines and the one in show() to bring it back.
  // const count = document.createElement('p');
  // count.className = 'slide-count';
  // count.setAttribute('aria-live', 'polite');
  // slideshow.appendChild(count);

  const show = (next) => {
    slides[index].classList.remove('is-active');
    index = (next + slides.length) % slides.length;
    slides[index].classList.add('is-active');
    // count.textContent = `${index + 1} / ${slides.length}`;
  };

  const makeButton = (dir, label) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = `slide-nav slide-nav--${dir}`;
    btn.setAttribute('aria-label', label);
    btn.addEventListener('click', () => show(index + (dir === 'next' ? 1 : -1)));
    slideshow.appendChild(btn);
  };

  makeButton('prev', 'Previous project');
  makeButton('next', 'Next project');

  slideshow.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') show(index + 1);
    if (e.key === 'ArrowLeft') show(index - 1);
  });

  let touchX = null;
  track.addEventListener('touchstart', (e) => { touchX = e.touches[0].clientX; }, { passive: true });
  track.addEventListener('touchend', (e) => {
    if (touchX === null) return;
    const dx = e.changedTouches[0].clientX - touchX;
    if (Math.abs(dx) > 40) show(index + (dx < 0 ? 1 : -1));
    touchX = null;
  });

  show(0);
});
