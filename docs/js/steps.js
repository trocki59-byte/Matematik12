// Ortak matematik yardımcıları ve adım adım çözüm üreticileri.

// Verilen rastgele kaynaktan [min, max] aralığında tam sayı üreten fonksiyon.
export function rndFrom(random) {
  return (min, max) => Math.floor(random() * (max - min + 1)) + min;
}

export function gcd(a, b) {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b) [a, b] = [b, a % b];
  return a;
}

export function lcm(a, b) {
  return (a / gcd(a, b)) * b;
}

// Kesri sadeleştirir; paydayı her zaman pozitif tutar.
export function reduce(n, d) {
  if (d < 0) {
    n = -n;
    d = -d;
  }
  const g = gcd(n, d) || 1;
  return [n / g, d / g];
}

// "3/4", tam sayıysa "2" biçiminde yazar.
export function fraction(n, d) {
  const [a, b] = reduce(n, d);
  return b === 1 ? `${a}` : `${a}/${b}`;
}

// Eksi işaretini Türkçe tipografiyle yazar: −5
export function minus(n) {
  return n < 0 ? `−${-n}` : `${n}`;
}

// "+ 4" ya da "− 4" biçiminde işaretli ifade.
export function pm(n) {
  return n < 0 ? `− ${-n}` : `+ ${n}`;
}

// Yüzlüğe göre tutulan sayıyı virgüllü yazar: 245 → "2,45"
export function tr(hundredths) {
  return (hundredths / 100).toFixed(2).replace('.', ',');
}

export function tr1(tenths) {
  return (tenths / 10).toFixed(1).replace('.', ',');
}

// Asal çarpanlar: 12 → [[2,2],[3,1]]
export function factorize(n) {
  const out = [];
  let m = n;
  for (let p = 2; p * p <= m; p++) {
    let e = 0;
    while (m % p === 0) {
      m /= p;
      e++;
    }
    if (e) out.push([p, e]);
  }
  if (m > 1) out.push([m, 1]);
  return out;
}

export function factorText(n) {
  const parts = factorize(n).map(([p, e]) => (e > 1 ? `${p}^${e}` : `${p}`));
  return parts.length ? parts.join(' × ') : '1';
}

// ---------- Toplama ve çıkarma (1–3. sınıf) ----------

export function addSteps(a, b) {
  const s = [];
  const o = a % 10 + b % 10, c1 = o >= 10 ? 1 : 0;
  s.push(`Birler: ${a % 10} + ${b % 10} = ${o}` + (c1 ? ` → ${o - 10} yazılır, 1 elde edilir` : ""));
  const t = Math.floor(a / 10) % 10 + Math.floor(b / 10) % 10 + c1, c2 = t >= 10 ? 1 : 0;
  s.push(`Onlar: ${Math.floor(a / 10) % 10} + ${Math.floor(b / 10) % 10}` + (c1 ? " + 1 (elde)" : "") + ` = ${t}` + (c2 ? ` → ${t - 10} yazılır, 1 elde edilir` : ""));
  s.push(`Yüzler: ${Math.floor(a / 100)} + ${Math.floor(b / 100)}` + (c2 ? " + 1 (elde)" : "") + ` = ${Math.floor(a / 100) + Math.floor(b / 100) + c2}`);
  s.push(`Sonuç: ${a + b}`);
  return s;
}

export function subtractionSteps(a, b) {
  const digits = [a % 10, Math.floor(a / 10) % 10, Math.floor(a / 100)];
  const other = [b % 10, Math.floor(b / 10) % 10, Math.floor(b / 100)];
  const names = ['Birler', 'Onlar', 'Yüzler'];
  const steps = [];
  const count = a >= 100 ? 3 : a >= 10 ? 2 : 1;
  for (let i = 0; i < count; i++) {
    if (digits[i] < other[i]) {
      let donor = i + 1;
      while (digits[donor] === 0) donor++;
      digits[donor]--;
      for (let j = donor - 1; j >= i; j--) {
        digits[j] += 10;
        steps.push(`${names[j + 1]}${j + 1 === 1 ? 'dan' : 'den'} 1 ödünç alınır; ${names[j].toLocaleLowerCase('tr')} ${digits[j]} olur.`);
        if (j > i) digits[j]--;
      }
    }
    steps.push(`${names[i]}: ${digits[i]} − ${other[i]} = ${digits[i] - other[i]}`);
  }
  steps.push(`Sonuç: ${a - b}`);
  return steps;
}
