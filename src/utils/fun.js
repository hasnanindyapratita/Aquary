// Efek kecil yang playful: konfeti, tetesan air, hati. Mati otomatis jika perangkat meminta animasi dikurangi.
const reduced = () => typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const SETS = {
  goal: ['🎉', '💧', '⭐', '💙', '✨', '🧡'],
  drops: ['💧', '💧', '💦'],
  hearts: ['💙', '💕', '✨'],
  coins: ['🪙', '✨', '🪙', '⭐'],
};
export function burst(kind = 'goal', x, y) {
  if (reduced() || typeof document === 'undefined') return;
  const set = SETS[kind] || SETS.goal;
  const n = kind === 'goal' ? 26 : 10;
  const ox = x ?? window.innerWidth / 2, oy = y ?? window.innerHeight * 0.4;
  for (let i = 0; i < n; i++) {
    const el = document.createElement('span');
    el.className = 'fun-bit';
    el.textContent = set[Math.floor(Math.random() * set.length)];
    const ang = Math.random() * Math.PI * 2, dist = 70 + Math.random() * (kind === 'goal' ? 190 : 90);
    el.style.left = ox + 'px'; el.style.top = oy + 'px';
    el.style.setProperty('--dx', Math.cos(ang) * dist + 'px');
    el.style.setProperty('--dy', Math.sin(ang) * dist - 50 + 'px');
    el.style.setProperty('--rot', (Math.random() * 90 - 45) + 'deg');
    el.style.fontSize = 16 + Math.random() * 14 + 'px';
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 1300);
  }
}
