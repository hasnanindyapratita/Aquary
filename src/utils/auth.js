import { hashPassword, safeEqual, uid, cryptoAvailable } from './crypto.js';
import { readStore, writeStore } from './storage.js';
import { usersSchema } from '../data/schemas.js';

export class AuthError extends Error {
  constructor(code, message) { super(message); this.code = code; }
}

export const normalizeEmail = (email) => email.trim().toLowerCase();
export const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim());

const requireCrypto = () => {
  if (!cryptoAvailable()) {
    throw new AuthError('CRYPTO', 'Browser Anda tidak mendukung enkripsi yang dibutuhkan. Buka AQUARY lewat https atau localhost.');
  }
};

export async function registerUser(email, password) {
  requireCrypto();
  const e = normalizeEmail(email);
  if (readStore('users', usersSchema, []).some((u) => u.email === e)) {
    throw new AuthError('EMAIL_TAKEN', 'Email ini sudah terdaftar. Silakan masuk.');
  }
  const { salt, hash, iterations } = await hashPassword(password);
  const record = { id: uid(), email: e, salt, hash, iterations, createdAt: new Date().toISOString() };
  const latest = readStore('users', usersSchema, []); // baca ulang setelah proses async
  if (latest.some((u) => u.email === e)) throw new AuthError('EMAIL_TAKEN', 'Email ini sudah terdaftar. Silakan masuk.');
  if (!writeStore('users', [...latest, record], usersSchema)) {
    throw new AuthError('STORAGE', 'Penyimpanan browser tidak tersedia atau penuh, sehingga akun tidak dapat dibuat.');
  }
  return { id: record.id, email: record.email };
}

export async function verifyLogin(email, password) {
  requireCrypto();
  const e = normalizeEmail(email);
  const user = readStore('users', usersSchema, []).find((u) => u.email === e);
  const invalid = new AuthError('INVALID', 'Email atau kata sandi salah.');
  if (!user) {
    await hashPassword(password); // menyamakan waktu respons
    throw invalid;
  }
  const { hash } = await hashPassword(password, user.salt, user.iterations);
  if (!safeEqual(hash, user.hash)) throw invalid;
  return { id: user.id, email: user.email };
}
