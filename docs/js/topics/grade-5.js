import {factorize, fraction, gcd, lcm, reduce, tr, pm} from '../steps.js';

// 5. sınıf: doğal sayılar, kesirler, ondalık gösterim, geometri.
const PLACES = {1: 'birler', 10: 'onlar', 100: 'yüzler', 1000: 'binler', 10000: 'on binler', 100000: 'yüz binler'};
const fmtThousands = n => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

export default [
  {
    id: '5-basamak', grade: 5, unit: 'Doğal sayılar', name: 'Basamak değeri', symbol: '#',
    summary: 'Rakamların bulunduğu basamağa göre değerini bul',
    lesson: {
      intro: 'Bir sayının rakamı, bulunduğu basamağa göre farklı bir değer taşır.',
      sections: [{
        title: 'Basamak değeri',
        paras: ['5 327 sayısında 5 rakamı binler basamağındadır; değeri 5 000\'dir. Her basamağın değeri, sağa doğru 10 kat küçülür.'],
        formula: '5 327 = 5 000 + 300 + 20 + 7',
        examples: [{problem: '84 360 sayısının on binler basamağındaki rakam kaçtır?', steps: ['Basamaklar: 8 (on binler), 4 (binler), 3 (yüzler), 6 (onlar), 0 (birler)', 'On binler basamağındaki rakam 8\'dir.'], answer: '8'}],
        tip: 'Sayıyı basamak basamak yazarak ilerlemek her zaman işe yarar.',
      }],
    },
    gen(rnd) {
      const n = rnd(10000, 999999), len = String(n).length;
      const i = rnd(0, len - 1), place = 10 ** (len - 1 - i), name = PLACES[place];
      const digit = Math.floor(n / place) % 10;
      const expanded = String(n).split('').map((d, k) => Number(d) * 10 ** (len - 1 - k)).filter(v => v).join(' + ');
      return {
        text: `${fmtThousands(n)} sayısının ${name} basamağındaki rakam kaçtır?`,
        answer: digit,
        steps: [`${fmtThousands(n)} = ${expanded}`, `${name[0].toLocaleUpperCase('tr') + name.slice(1)} basamağındaki rakam: ${digit}`],
      };
    },
  },
  {
    id: '5-islem', grade: 5, unit: 'Doğal sayılar', name: 'İşlem önceliği', symbol: '≡',
    summary: 'Parantez, çarpma ve bölme önce gelir',
    lesson: {
      intro: 'Birden fazla işlem içeren ifadelerde işlemlerin sırası önemlidir.',
      sections: [{
        title: 'İşlem sırası',
        paras: ['Önce parantez içi, sonra çarpma ve bölme yapılır. En son soldan sağa toplama ve çıkarma yapılır.'],
        formula: '12 + 3 × 4 − 6 = 12 + 12 − 6 = 18',
        examples: [{problem: '(7 + 5) × 2 − 4 = ?', steps: ['Parantez: 7 + 5 = 12', '12 × 2 = 24', '24 − 4 = 20'], answer: '20'}],
      }],
    },
    gen(rnd) {
      if (rnd(0, 1)) {
        const a = rnd(1, 30), b = rnd(2, 12), c = rnd(2, 9), total = a + b * c;
        const dd = rnd(1, Math.min(20, total - 1)), res = total - dd;
        return {
          text: `${a} + ${b} × ${c} − ${dd} = ?`, answer: res,
          steps: [`Önce çarpma: ${b} × ${c} = ${b * c}`, `Sonra toplama: ${a} + ${b * c} = ${total}`, `Son olarak çıkarma: ${total} − ${dd} = ${res}`],
        };
      }
      const a = rnd(1, 9), b = rnd(1, 9), c = rnd(2, 9), total = (a + b) * c;
      const dd = rnd(1, Math.min(20, total - 1)), res = total - dd;
      return {
        text: `(${a} + ${b}) × ${c} − ${dd} = ?`, answer: res,
        steps: [`Parantez önce: ${a} + ${b} = ${a + b}`, `Çarpma: ${a + b} × ${c} = ${(a + b) * c}`, `Çıkarma: ${(a + b) * c} − ${dd} = ${res}`],
      };
    },
  },
  {
    id: '5-bolunebilme', grade: 5, unit: 'Doğal sayılar', name: 'Bölünebilme ve kalan', symbol: '÷',
    summary: 'Bir sayının kalanını bulmayı öğren',
    lesson: {
      intro: 'Bir sayıyı bölerken arta kalan miktarı (kalanı) bulabilmek için bölünebilme kurallarını bilmek işini kolaylaştırır.',
      sections: [{
        title: 'Bölünebilme kuralları',
        paras: ['2 ile bölünebilmek için son rakam çift olmalıdır. 5 ile için son rakam 0 ya da 5, 10 ile için son rakam 0 olmalıdır.', '3 ve 9 ile bölünebilmek için rakamların toplamına bakılır; rakamlar toplamının kalanı, sayının kalanıyla aynıdır.'],
        examples: [{problem: '357 sayısını 9\'a böldüğünde kalan kaçtır?', steps: ['Rakamların toplamı: 3 + 5 + 7 = 15', '15 − 9 = 6 → kalan 6 (357 = 9 × 39 + 6)'], answer: '6'}],
      }],
    },
    gen(rnd) {
      const n = rnd(100, 999), d = rnd(2, 10), q = Math.floor(n / d), r = n % d;
      const steps = [`${n} = ${d} × ${q} + ${r}`];
      if (d === 3 || d === 9) steps.unshift(`Rakamların toplamı: ${String(n).split('').join(' + ')} = ${String(n).split('').reduce((s, x) => s + Number(x), 0)}`);
      steps.push(`Kalan: ${r}`);
      return {text: `${n} sayısını ${d}'e böldüğümüzde kalan kaçtır?`, answer: r, steps};
    },
  },
  {
    id: '5-ebob', grade: 5, unit: 'Doğal sayılar', name: 'EBOB ve EKOK', symbol: '∩',
    summary: 'Ortak bölen ve ortak katları bul',
    lesson: {
      intro: 'EBOB, iki sayının ortak bölenlerinin en büyüğüdür. EKOK ise ortak katlarının en küçüğüdür.',
      sections: [{
        title: 'EBOB ve EKOK',
        paras: ['Sayıları asal çarpanlarına ayır. EBOB için ortak çarpanların en küçük üslerini, EKOK için tüm çarpanların en büyük üslerini alırsın.'],
        formula: '12 = 2² × 3, 18 = 2 × 3² → EBOB = 6, EKOK = 36',
        examples: [{problem: '12 ve 18 için EBOB ve EKOK kaçtır? (EBOB için yazın)', steps: ['12 = 2² × 3, 18 = 2 × 3²', 'EBOB: ortak çarpanların en küçük üslüsü: 2 × 3 = 6'], answer: '6'}],
      }],
    },
    gen(rnd) {
      const a = rnd(4, 60), b = rnd(4, 60), g = gcd(a, b), l = (a / g) * b;
      const wantEbob = rnd(0, 1) === 1;
      const steps = [`${a} = ${factorize(a).map(([p, e]) => (e > 1 ? `${p}^${e}` : p)).join(' × ')}`, `${b} = ${factorize(b).map(([p, e]) => (e > 1 ? `${p}^${e}` : p)).join(' × ')}`];
      if (wantEbob) {
        steps.push(`EBOB(${a}, ${b}) = ${g}`);
        return {text: `${a} ve ${b} sayılarının EBOB'u kaçtır?`, answer: g, steps};
      }
      steps.push(`EKOK(${a}, ${b}) = ${a} × ${b} ÷ ${g} = ${l}`);
      return {text: `${a} ve ${b} sayılarının EKOK'u kaçtır?`, answer: l, steps};
    },
  },

  {
    id: '5-sadelestirme', grade: 5, unit: 'Kesirler', name: 'Kesri sadeleştirme', symbol: '½',
    summary: 'Pay ve paydayı ortak bölenle böl',
    lesson: {
      intro: 'Pay ve paydası aynı sayıya bölünebilen kesirler sadeleştirilebilir.',
      sections: [{
        title: 'Sadeleştirme',
        paras: ['Pay ve paydayı aynı sayıya bölersen kesrin değeri değişmez. En sade hâlde pay ve paydanın ortak böleni yalnızca 1\'dir.'],
        formula: '12/18 = 2/3',
        examples: [{problem: '12/18 kesrini en sade hâline getirin.', steps: ['Ortak bölen: 6', '12 ÷ 6 = 2, 18 ÷ 6 = 3', 'Sonuç: 2/3'], answer: '2/3'}],
        tip: 'En büyük ortak böleni bulmak için EBOB\'u kullanabilirsin.',
      }],
    },
    gen(rnd) {
      const g = rnd(2, 6);
      let p, q;
      do {
        p = rnd(1, 9);
        q = rnd(2, 11);
      } while (gcd(p, q) !== 1);
      return {
        text: `${p * g}/${q * g} kesrini en sade hâline getirin.`, answer: p / q, answerText: `${p}/${q}`, mustSimplify: true,
        steps: [`Ortak bölen: ${g}`, `${p * g} ÷ ${g} = ${p}`, `${q * g} ÷ ${g} = ${q}`, `Sonuç: ${p}/${q}`],
      };
    },
  },
  {
    id: '5-kesir-islem', grade: 5, unit: 'Kesirler', name: 'Kesirlerde toplama ve çıkarma', symbol: '⅔',
    summary: 'Paydaları eşitleyip işlem yap',
    lesson: {
      intro: 'Paydaları farklı kesirleri toplamak ya da çıkarmak için önce paydaları eşitlemen gerekir.',
      sections: [{
        title: 'Paydaları eşitleme',
        paras: ['Paydaların EKOK\'unu bulup her kesri bu sayıya genişletirsin. Sonra pay kısmını işlemi yaparsın.'],
        formula: '1/2 + 1/3 = 3/6 + 2/6 = 5/6',
        examples: [{problem: '3/4 − 1/6 = ?', steps: ['EKOK(4, 6) = 12', '3/4 = 9/12, 1/6 = 2/12', '9/12 − 2/12 = 7/12'], answer: '7/12'}],
      }],
    },
    gen(rnd) {
      const dens = [2, 3, 4, 5, 6, 8, 10, 12];
      let b = dens[rnd(0, dens.length - 1)], d = dens[rnd(0, dens.length - 1)];
      let a = rnd(1, b - 1), c = rnd(1, d - 1);
      let sign = rnd(0, 1) ? '+' : '−';
      if (sign === '−' && a * d < c * b) {
        [a, c] = [c, a];
        [b, d] = [d, b];
      }
      if (sign === '−' && a * d === c * b) sign = '+';
      const L = lcm(b, d), n1 = a * (L / b), n2 = c * (L / d);
      const num = sign === '+' ? n1 + n2 : n1 - n2;
      const [rn, rd] = reduce(num, L);
      return {
        text: `${a}/${b} ${sign} ${c}/${d} = ?`, answer: rn / rd, answerText: fraction(rn, rd), mustSimplify: true,
        steps: [`EKOK(${b}, ${d}) = ${L}`, `${a}/${b} = ${n1}/${L}, ${c}/${d} = ${n2}/${L}`, `${n1}/${L} ${sign} ${n2}/${L} = ${num}/${L} = ${fraction(num, L)}`],
      };
    },
  },
  {
    id: '5-ondalik-toplama', grade: 5, unit: 'Ondalık gösterim', name: 'Ondalık sayılarla toplama ve çıkarma', symbol: '0,5',
    summary: 'Virgülleri alt alta hizala',
    lesson: {
      intro: 'Ondalık sayılarda işlem yaparken virgüller alt alta gelmelidir.',
      sections: [{
        title: 'Virgül hizası',
        paras: ['Virgüllü sayılar alt alta yazılır. Eksik basamaklara 0 yazabilirsin; böylece iki sayının basamakları eşleşir.'],
        formula: '2,35 + 1,8 = 2,35 + 1,80 = 4,15',
        examples: [{problem: '5,4 − 2,75 = ?', steps: ['5,40 − 2,75 (5,4\'ü 5,40 yazdık)', '40 < 75: 140 − 75 = 65 (1 ödünç)', 'Tam kısım: 4 − 2 − 1 = 1', 'Sonuç: 2,65'], answer: '2,65'}],
      }],
    },
    gen(rnd) {
      let X = rnd(100, 999), Y = rnd(100, 999), op = rnd(0, 1) ? '+' : '−';
      if (op === '−' && X < Y) [X, Y] = [Y, X];
      const res = op === '+' ? X + Y : X - Y;
      return {
        text: `${tr(X)} ${op} ${tr(Y)} = ?`, answer: res / 100, answerText: tr(res),
        steps: ['Virgüller alt alta yazılır.', `${tr(X)} ${op} ${tr(Y)} = ${tr(res)}`],
      };
    },
  },
  {
    id: '5-aci', grade: 5, unit: 'Geometri', name: 'Tümler ve bütünler açılar', symbol: '∠',
    summary: 'Açıların tümlerini ve bütünlerini hesapla',
    lesson: {
      intro: 'Toplamları 90° olan açılar tümler, 180° olan açılar bütünler açılardır.',
      sections: [{
        title: 'Tümler ve bütünler',
        paras: ['İki açının toplamı 90° ise bu açılar birbirinin tümleridir. Toplamı 180° ise birbirinin bütünleridir.'],
        formula: '35° + 55° = 90° (tümler)',
        examples: [{problem: '38° açının tümü kaç derecedir?', steps: ['Tümler açıların toplamı 90°dir.', '90 − 38 = 52'], answer: '52'}],
      }],
    },
    gen(rnd) {
      if (rnd(0, 1)) {
        const a = rnd(1, 89);
        return {text: `${a}° açının tümü kaç derecedir?`, answer: 90 - a, steps: [`Tümler açıların toplamı 90°dir: 90 − ${a} = ${90 - a}`]};
      }
      const a = rnd(1, 179);
      return {text: `${a}° açının bütünü kaç derecedir?`, answer: 180 - a, steps: [`Bütünler açıların toplamı 180°dir: 180 − ${a} = ${180 - a}`]};
    },
  },
  {
    id: '5-alan', grade: 5, unit: 'Geometri', name: 'Dikdörtgen ve karenin alanı', symbol: '▭',
    summary: 'Kenar uzunluklarından alan bul',
    lesson: {
      intro: 'Alan, bir şeklin kapladığı yüzeyin büyüklüğüdür. Birimi kare birimdir (cm²).',
      sections: [{
        title: 'Alan formülleri',
        paras: ['Dikdörtgenin alanı, uzun kenar ile kısa kenarın çarpımıdır. Karenin alanı ise bir kenarın karesidir.'],
        formula: 'Dikdörtgen: a × b · Kare: a × a',
        examples: [{problem: 'Kenarları 7 cm ve 12 cm olan dikdörtgenin alanı kaç cm²dir?', steps: ['Alan = 7 × 12', '= 84 cm²'], answer: '84'}],
      }],
    },
    gen(rnd) {
      if (rnd(0, 1)) {
        const a = rnd(2, 20), b = rnd(2, 20);
        return {text: `Kenarları ${a} cm ve ${b} cm olan dikdörtgenin alanı kaç cm²dir?`, answer: a * b, steps: [`Alan = ${a} × ${b} = ${a * b} cm²`]};
      }
      const a = rnd(2, 20);
      return {text: `Bir kenarı ${a} cm olan karenin alanı kaç cm²dir?`, answer: a * a, steps: [`Alan = ${a} × ${a} = ${a * a} cm²`]};
    },
  },
];
