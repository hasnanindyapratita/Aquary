// Efek kecil yang playful: tetesan air, bintang, hati, koin (SVG, tanpa emoji). Mati otomatis jika perangkat meminta animasi dikurangi.
const reduced = () => typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const C = { blue: '#3e9be0', sky: '#9fd4f7', pink: '#ff8fbd', yellow: '#ffc83d' };
const SHAPES = {
  drop: c => `<svg viewBox="0 0 24 24"><path d="M12 2.5c3.6 4.5 6 7.7 6 11a6 6 0 0 1-12 0c0-3.3 2.4-6.5 6-11z" fill="${c}"/></svg>`,
  star: c => `<svg viewBox="0 0 24 24"><path d="M12 2l2.9 6.3 6.9.8-5.1 4.7 1.4 6.8L12 17.2l-6.1 3.4 1.4-6.8-5.1-4.7 6.9-.8z" fill="${c}"/></svg>`,
  heart: c => `<svg viewBox="0 0 24 24"><path d="M12 21s-8-5.2-8-11a4.6 4.6 0 0 1 8-3 4.6 4.6 0 0 1 8 3c0 5.8-8 11-8 11z" fill="${c}"/></svg>`,
  coin: c => `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" fill="${c}"/><circle cx="12" cy="12" r="5.5" fill="none" stroke="#fff" stroke-opacity=".6" stroke-width="2"/></svg>`,
  dot: c => `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="6" fill="${c}"/></svg>`,
};
const SETS = {
  goal: [['drop', C.blue], ['star', C.yellow], ['heart', C.pink], ['drop', C.sky], ['dot', C.pink], ['star', C.blue]],
  drops: [['drop', C.blue], ['drop', C.sky], ['dot', C.sky]],
  hearts: [['heart', C.pink], ['heart', '#ffb3d1'], ['star', C.yellow]],
  coins: [['coin', C.yellow], ['star', C.yellow], ['coin', '#ffd966']],
};
export function burst(kind = 'goal', x, y) {
  if (reduced() || typeof document === 'undefined') return;
  const set = SETS[kind] || SETS.goal;
  const n = kind === 'goal' ? 30 : 10;
  const ox = x ?? window.innerWidth / 2, oy = y ?? window.innerHeight * 0.4;
  for (let i = 0; i < n; i++) {
    const [shape, color] = set[Math.floor(Math.random() * set.length)];
    const el = document.createElement('span');
    el.className = 'fun-bit';
    el.innerHTML = SHAPES[shape](color);
    const ang = Math.random() * Math.PI * 2, dist = 70 + Math.random() * (kind === 'goal' ? 190 : 90);
    el.style.left = ox + 'px'; el.style.top = oy + 'px';
    el.style.setProperty('--dx', Math.cos(ang) * dist + 'px');
    el.style.setProperty('--dy', Math.sin(ang) * dist - 50 + 'px');
    el.style.setProperty('--rot', (Math.random() * 90 - 45) + 'deg');
    const s = 14 + Math.random() * 14;
    el.style.width = s + 'px'; el.style.height = s + 'px';
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 1300);
  }
}
