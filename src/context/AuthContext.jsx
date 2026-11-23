import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { registerUser, verifyLogin } from '../utils/auth.js';
import { readStore, writeStore } from '../utils/storage.js';
import { sessionSchema, usersSchema } from '../data/schemas.js';

const AuthContext = createContext(null);

function restoreSession() {
  const session = readStore('session', sessionSchema, { userId: null });
  if (!session.userId) return null;
  const account = readStore('users', usersSchema, []).find(item => item.id === session.userId);
  return account ? { id: account.id, email: account.email } : null;
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(restoreSession);

  const establishSession = useCallback(account => {
    const ok = writeStore('session', { userId: account.id }, sessionSchema);
    if (!ok) throw new Error('Sesi tidak dapat disimpan di browser ini. Periksa ruang penyimpanan.');
    setUser({ id: account.id, email: account.email });
    return account;
  }, []);

  const register = useCallback(async (email, password) => {
    const account = await registerUser(email, password);
    return establishSession(account);
  }, [establishSession]);

  const login = useCallback(async (email, password) => {
    const account = await verifyLogin(email, password);
    return establishSession(account);
  }, [establishSession]);

  const logout = useCallback(() => {
    writeStore('session', { userId: null }, sessionSchema);
    setUser(null);
  }, []);

  const value = useMemo(() => ({ user, register, login, logout }), [user, register, login, logout]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth harus digunakan di dalam AuthProvider.');
  return context;
}
