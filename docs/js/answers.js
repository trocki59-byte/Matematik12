// Öğrencinin yazdığı cevabı anlar: tam sayı, ondalık (virgül ya da nokta),
// kesir (3/4), negatif sayı ve karışık kesir (2 1/2) kabul edilir.

import {gcd} from './steps.js';

const MAX = 1e12;

function accept(value, fraction) {
  if (!Number.isFinite(value) || Math.abs(value) > MAX) return {ok: false};
  return {ok: true, value, fraction};
}

export function parseAnswer(input) {
  const text = String(input ?? '')
    .trim()
    .replace(/−/g, '-')
    .replace(/\s+/g, ' ');
  let m;

  // Binlik ayraçlı sayı: 1.000 → 1000 (üç haneli gruplar)
  if ((m = text.match(/^([+-]?)(\d{1,3}(?:\.\d{3})+)$/))) {
    return accept(Number(`${m[1]}${m[2].replace(/\./g, '')}`), null);
  }
  // Tam sayı ya da ondalık: 4, -4, 4,5, 4.5
  if ((m = text.match(/^([+-]?)(\d+)(?:[.,](\d+))?$/))) {
    return accept(Number(`${m[1]}${m[2]}${m[3] ? `.${m[3]}` : ''}`), null);
  }
  // Kesir: 3/4, -3/4
  if ((m = text.match(/^([+-]?)(\d+)\s*\/\s*(\d+)$/))) {
    const den = Number(m[3]);
    if (den === 0) return {ok: false};
    const num = Number(m[2]) * (m[1] === '-' ? -1 : 1);
    return accept(num / den, {num, den});
  }
  // Karışık kesir: 2 1/2
  if ((m = text.match(/^([+-]?)(\d+) (\d+)\s*\/\s*(\d+)$/))) {
    const den = Number(m[4]);
    if (den === 0) return {ok: false};
    const sign = m[1] === '-' ? -1 : 1;
    const whole = Number(m[2]), num = whole * den + Number(m[3]);
    return accept(sign * num / den, {num: sign * num, den});
  }
  return {ok: false};
}

export function isSameAnswer(value, expected) {
  return Math.abs(value - expected) <= 1e-9 * Math.max(1, Math.abs(expected));
}

export function isSimplest(fraction) {
  return gcd(fraction.num, fraction.den) === 1;
}
