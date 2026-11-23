import { useCallback, useState } from 'react';
import { readStore, writeStore } from '../utils/storage.js';

// Catatan: `key` dianggap tetap selama komponen hidup. Provider data pengguna
// diberi `key={userId}` agar seluruh state di-reset saat berganti akun.
export function useStoredState(key, schema, fallback) {
  const [value, setValue] = useState(() => readStore(key, schema, fallback));
  const update = useCallback(
    (next) => {
      setValue((prev) => {
        const resolved = typeof next === 'function' ? next(prev) : next;
        writeStore(key, resolved, schema);
        return resolved;
      });
    },
    [key, schema],
  );
  return [value, update];
}
