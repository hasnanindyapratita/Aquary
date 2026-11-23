// Hash kata sandi memakai PBKDF2-SHA256 (Web Crypto) dengan salt acak. Kata sandi tidak pernah disimpan.
// Web Crypto hanya tersedia pada konteks aman (https atau localhost).
const ITERATIONS = 210000;

export const cryptoAvailable = () => typeof crypto !== 'undefined' && !!crypto.subtle;
const toB64 = (bytes) => btoa(String.fromCharCode(...bytes));
const fromB64 = (s) => Uint8Array.from(atob(s), (c) => c.charCodeAt(0));

export async function hashPassword(password, saltB64, iterations = ITERATIONS) {
  if (!cryptoAvailable()) throw new Error('CRYPTO_UNAVAILABLE');
  const salt = saltB64 ? fromB64(saltB64) : crypto.getRandomValues(new Uint8Array(16));
  const keyMaterial = await crypto.subtle.importKey('raw', new TextEncoder().encode(password), 'PBKDF2', false, ['deriveBits']);
  const bits = await crypto.subtle.deriveBits({ name: 'PBKDF2', salt, iterations, hash: 'SHA-256' }, keyMaterial, 256);
  return { salt: toB64(salt), hash: toB64(new Uint8Array(bits)), iterations };
}

export function safeEqual(a, b) {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i += 1) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

export function uid() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) return crypto.randomUUID();
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}
