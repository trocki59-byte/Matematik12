import test from 'node:test';
import assert from 'node:assert/strict';
import {createAuthStore, validateSignup, normalizeName, hashPin} from '../docs/js/auth.js';

function memoryStorage() {
  const data = new Map();
  return {getItem: k => (data.has(k) ? data.get(k) : null), setItem: (k, v) => data.set(k, String(v)), removeItem: k => data.delete(k)};
}

test('signup validates name, grade and four-digit pin', () => {
  assert.match(validateSignup({name: 'A', grade: 5, pin: '1234'}), /2 ile 30/);
  assert.match(validateSignup({name: 'Ada', grade: 13, pin: '1234'}), /sınıf/);
  assert.match(validateSignup({name: 'Ada', grade: 5, pin: '123'}), /4 rakam/);
  assert.match(validateSignup({name: 'Ada', grade: 5, pin: 'abcd'}), /4 rakam/);
  assert.equal(validateSignup({name: 'Ada Lovelace', grade: 5, pin: '1234'}), null);
});

test('signup then login with the same name and pin', async () => {
  const storage = memoryStorage();
  const auth = createAuthStore(storage);
  const user = await auth.signup({name: '  Ayşe   Yılmaz ', grade: 7, pin: '4821'});
  assert.equal(user.name, 'Ayşe Yılmaz');
  assert.equal(auth.current().grade, 7);
  auth.logout();
  assert.equal(auth.current(), null);
  await assert.rejects(() => auth.login({name: 'Ayşe Yılmaz', pin: '0000'}), /yanlış/);
  const back = await auth.login({name: 'AYŞE yılmaz', pin: '4821'});
  assert.equal(back.grade, 7);
});

test('duplicate names are rejected regardless of case', async () => {
  const auth = createAuthStore(memoryStorage());
  await auth.signup({name: 'Irmak', grade: 2, pin: '1111'});
  await assert.rejects(() => auth.signup({name: 'IRMAK', grade: 3, pin: '2222'}), /zaten/);
});

test('pin is never stored in plain text and session survives reload', async () => {
  const storage = memoryStorage();
  const auth = createAuthStore(storage);
  await auth.signup({name: 'Can', grade: 9, pin: '9876'});
  const raw = storage.getItem('matematik12.users.v1');
  assert.ok(!raw.includes('9876'));
  const reloaded = createAuthStore(storage);
  assert.equal(reloaded.current().name, 'Can');
});

test('hashing is salted', async () => {
  assert.notEqual(await hashPin('1234', 'a'), await hashPin('1234', 'b'));
  assert.equal(normalizeName('  İlkay  '), 'ilkay');
});
