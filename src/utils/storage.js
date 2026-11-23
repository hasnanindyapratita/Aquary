// Lapisan penyimpanan lokal AQUARY (localStorage) dengan validasi skema ringan + nilai default.
// Data prototipe ini hanya tersimpan di browser/perangkat ini.

export const NS = 'aquary:v1:';
export const userKey = (userId, name) => `u:${userId}:${name}`;

const clone = (v) => (v === undefined ? v : JSON.parse(JSON.stringify(v)));

/** Skema: { type: 'string'|'number'|'boolean'|'array'|'object', nullable, enum, min, max, of, shape } */
export function check(schema, v) {
  if (v === null || v === undefined) return !!schema.nullable;
  switch (schema.type) {
    case 'string':
      return typeof v === 'string' && (!schema.enum || schema.enum.includes(v)) && (schema.max == null || v.length <= schema.max);
    case 'number':
      return typeof v === 'number' && Number.isFinite(v) && (schema.min == null || v >= schema.min) && (schema.max == null || v <= schema.max);
    case 'boolean':
      return typeof v === 'boolean';
    case 'array':
      return Array.isArray(v) && v.every((item) => check(schema.of, item));
    case 'object':
      return (
        typeof v === 'object' && !Array.isArray(v) &&
        Object.entries(schema.shape).every(([k, s]) => check(s, v[k]))
      );
    default:
      return false;
  }
}

// Mengisi properti yang hilang dengan nilai default (kompatibel saat skema bertambah).
function fill(schema, v, fallback) {
  if (schema.type === 'object' && v && typeof v === 'object' && !Array.isArray(v)) {
    const out = {};
    for (const [k, s] of Object.entries(schema.shape)) out[k] = fill(s, v[k], fallback?.[k]);
    return out;
  }
  return v === undefined ? clone(fallback) : v;
}

export function storageAvailable() {
  try {
    const k = `${NS}__test`;
    localStorage.setItem(k, '1');
    localStorage.removeItem(k);
    return true;
  } catch {
    return false;
  }
}

export function readStore(key, schema, fallback) {
  try {
    const raw = localStorage.getItem(NS + key);
    if (raw == null) return clone(fallback);
    const merged = fill(schema, JSON.parse(raw), fallback);
    return check(schema, merged) ? merged : clone(fallback);
  } catch {
    return clone(fallback);
  }
}

export function writeStore(key, value, schema) {
  try {
    if (schema && !check(schema, value)) {
      console.warn(`[AQUARY] Data "${key}" tidak sesuai skema dan tidak disimpan.`);
      return false;
    }
    localStorage.setItem(NS + key, JSON.stringify(value));
    return true;
  } catch (err) {
    console.warn('[AQUARY] Gagal menyimpan data:', err);
    return false;
  }
}

export function removeStore(key) {
  try { localStorage.removeItem(NS + key); } catch { /* diabaikan */ }
}
