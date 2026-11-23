export function toMinutes(hhmm) {
  const m = /^(\d{2}):(\d{2})$/.exec(hhmm || '');
  if (!m) return null;
  const h = Number(m[1]); const min = Number(m[2]);
  if (h > 23 || min > 59) return null;
  return h * 60 + min;
}

// Lama waktu terjaga (menit); tidur setelah tengah malam ditangani otomatis.
export function awakeMinutes(wake, sleep) {
  const w = toMinutes(wake); const s = toMinutes(sleep);
  if (w == null || s == null || w === s) return null;
  return (s - w + 1440) % 1440;
}

export function formatDuration(minutes) {
  const h = Math.floor(minutes / 60); const m = minutes % 60;
  if (h && m) return `${h} jam ${m} menit`;
  return h ? `${h} jam` : `${m} menit`;
}

export function greetingFor(hour) {
  if (hour < 11) return 'Selamat pagi';
  if (hour < 15) return 'Selamat siang';
  if (hour < 18) return 'Selamat sore';
  return 'Selamat malam';
}
