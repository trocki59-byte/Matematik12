// Öğrenci hesapları bu tarayıcıda (yerel depoda) tutulur. PIN düz metin olarak saklanmaz:
// rastgele tuz ile SHA-256 özeti tutulur. Bu, bir sunucu tabanlı kimlik doğrulama değildir.
const KEY = 'matematik12.users.v1';
export const PIN_PATTERN = /^\d{4}$/;

// Ad karşılaştırması için: boşlukları sadeleştirir, Türkçe büyük/küçük harfi doğru çevirir.
export function normalizeName(name) {
  return String(name ?? '').trim().replace(/\s+/g, ' ').toLocaleLowerCase('tr-TR');
}

export function validateSignup({name, grade, pin}) {
  const clean = String(name ?? '').trim().replace(/\s+/g, ' ');
  if (clean.length < 2 || clean.length > 30) return 'Ad soyadın 2 ile 30 karakter arasında olmalı.';
  if (!Number.isInteger(grade) || grade < 1 || grade > 12) return 'Bir sınıf seç.';
  if (!PIN_PATTERN.test(String(pin ?? ''))) return 'Şifre 4 rakamdan oluşmalı.';
  return null;
}

const bytesToHex = buf => [...new Uint8Array(buf)].map(b => b.toString(16).padStart(2, '0')).join('');

export async function hashPin(pin, salt) {
  const data = new TextEncoder().encode(`${salt}:${pin}`);
  return bytesToHex(await crypto.subtle.digest('SHA-256', data));
}

export function createAuthStore(storage) {
  let state = {users: [], current: null};
  try {
    const raw = storage?.getItem(KEY);
    if (raw) {
      const data = JSON.parse(raw);
      if (data?.version === 1 && Array.isArray(data.users)) {
        state = {
          users: data.users.filter(u => u && typeof u.id === 'string' && typeof u.name === 'string'
            && Number.isInteger(u.grade) && typeof u.salt === 'string' && typeof u.hash === 'string'),
          current: typeof data.current === 'string' ? data.current : null,
        };
      }
    }
  } catch { state = {users: [], current: null}; }

  function save() {
    try { storage?.setItem(KEY, JSON.stringify({version: 1, ...state})); } catch { /* yalnızca oturum boyunca */ }
  }

  const publicUser = u => (u ? {id: u.id, name: u.name, grade: u.grade} : null);

  return {
    current() { return publicUser(state.users.find(u => u.id === state.current)); },
    async signup({name, grade, pin}) {
      const problem = validateSignup({name, grade, pin});
      if (problem) throw new Error(problem);
      const key = normalizeName(name);
      if (state.users.some(u => normalizeName(u.name) === key)) throw new Error('Bu adla bir hesap zaten var. Giriş yap.');
      const salt = bytesToHex(crypto.getRandomValues(new Uint8Array(12)));
      const user = {
        id: bytesToHex(crypto.getRandomValues(new Uint8Array(8))),
        name: String(name).trim().replace(/\s+/g, ' '), grade, salt,
        hash: await hashPin(pin, salt), created: new Date().toISOString(),
      };
      state = {users: [...state.users, user], current: user.id};
      save();
      return publicUser(user);
    },
    async login({name, pin}) {
      const key = normalizeName(name);
      const user = state.users.find(u => normalizeName(u.name) === key);
      if (!user || (await hashPin(pin, user.salt)) !== user.hash) throw new Error('Ad veya şifre yanlış.');
      state = {...state, current: user.id};
      save();
      return publicUser(user);
    },
    logout() { state = {...state, current: null}; save(); },
  };
}
