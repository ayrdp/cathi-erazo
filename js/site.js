// Barra del reel: cada tramo se llena según avanzas por su sección; tocar un tramo lleva a la sección
(() => {
  const bar = document.querySelector('.reelbar');
  if (!bar) return;
  const segs = [...bar.querySelectorAll('span')].map((el) => ({ el, sec: document.getElementById(el.dataset.s) })).filter((x) => x.sec);
  function update() {
    const mid = scrollY + innerHeight * 0.5;
    segs.forEach(({ el, sec }) => {
      const top = sec.offsetTop, h = sec.offsetHeight;
      const p = Math.max(0, Math.min(1, (mid - top) / h));
      el.querySelector('i').style.setProperty('--p', p);
      el.classList.toggle('on', p > 0 && p < 1);
    });
  }
  bar.setAttribute('aria-hidden', 'false');
  segs.forEach(({ el, sec }) => { el.style.cursor = 'pointer'; el.addEventListener('click', () => sec.scrollIntoView({ behavior: 'smooth' })); });
  addEventListener('scroll', update, { passive: true }); addEventListener('resize', update); update();
})();

// Corazones al pulsar el botón de WhatsApp (como el "super like" de Instagram)
(() => {
  const btn = document.querySelector('.like');
  if (!btn || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const heart = '<svg viewBox="0 0 24 24"><path d="M12 21s-7.5-4.6-9.6-9.2C.9 8.3 3 4.5 6.7 4.5c2.1 0 3.5 1.2 4.3 2.4.8-1.2 2.2-2.4 4.3-2.4 3.7 0 5.8 3.8 4.3 7.3C19.5 16.4 12 21 12 21z"/></svg>';
  btn.addEventListener('pointerenter', () => {
    const r = btn.querySelector('.like__h').getBoundingClientRect();
    for (let k = 0; k < 6; k++) {
      const d = document.createElement('span');
      d.className = 'burst'; d.innerHTML = heart;
      d.style.left = r.left + r.width / 2 - 9 + 'px'; d.style.top = r.top + r.height / 2 - 9 + 'px';
      document.body.appendChild(d);
      const a = (Math.PI * 2 * k) / 6 - Math.PI / 2, dist = 34 + Math.random() * 18;
      d.animate([
        { transform: 'translate(0,0) scale(.4)', opacity: 1 },
        { transform: `translate(${Math.cos(a) * dist}px,${Math.sin(a) * dist}px) scale(1)`, opacity: 0 }
      ], { duration: 650, easing: 'cubic-bezier(.2,.8,.2,1)' }).onfinish = () => d.remove();
    }
  });
})();
