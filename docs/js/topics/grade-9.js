import {fraction, minus, pm} from '../steps.js';

// 9. sınıf: kümeler, mantık, mutlak değer, eşitsizlik, üçgende açılar, köklü ifadeler, açıklık.
export default [
  {
    id: '9-kumeler', grade: 9, unit: 'Kümeler ve mantık', name: 'Kümelerde işlemler', symbol: '∪',
    summary: 'Birleşim, kesişim ve fark kümeleri',
    lesson: {
      intro: 'Küme, iyi tanımlanmış nesnelerin topluluğudur. Kümeler arasında birleşim, kesişim ve fark işlemleri yapılır.',
      sections: [
        {
          title: 'Temel kavramlar',
          paras: [
            'A ∪ B (birleşim): A ya da B\'de bulunan tüm elemanlar.',
            'A ∩ B (kesişim): hem A hem B\'de bulunan elemanlar.',
            'A − B (fark): A\'da olup B\'de olmayan elemanlar.',
            'Eleman sayısı için |A ∪ B| = |A| + |B| − |A ∩ B| formülü kullanılır.',
          ],
          formula: '|A ∪ B| = |A| + |B| − |A ∩ B|',
        },
        {
          title: 'Örnekler',
          paras: ['Önce kümeleri yaz, sonra işlemi elemanlar üzerinden yap.'],
          examples: [
            {problem: 'A = {1, 2, 3, 4, 5}, B = {4, 5, 6, 7} ise A ∪ B, A ∩ B ve A − B kümelerini bulun.', steps: ['A ∪ B = {1, 2, 3, 4, 5, 6, 7}', 'A ∩ B = {4, 5}', 'A − B = {1, 2, 3}'], answer: 'A ∪ B = {1,…,7}'},
            {problem: '|A| = 20, |B| = 15, |A ∩ B| = 6 ise |A ∪ B| kaçtır?', steps: ['|A ∪ B| = |A| + |B| − |A ∩ B|', '= 20 + 15 − 6 = 29'], answer: '29'},
            {problem: 'Bir sınıfta 30 öğrenci var. 18 öğrenci matematik, 12 öğrenci fen sevmektedir. İkisini de sevenler 7 kişiyse en az bir dersi sevmeyen kaç öğrenci vardır?', steps: ['Bir dersi sevenler: 18 + 12 − 7 = 23', 'Hiçbirini sevmeyen: 30 − 23 = 7'], answer: '7'},
          ],
          tip: 'Kesişimi iki kez saydığın için, birleşim formülünde onu bir kez çıkarırsın.',
        },
      ],
    },
    gen(rnd) {
      const a = rnd(3, 12), b = rnd(3, 12), c = rnd(0, Math.min(a, b));
      if (rnd(0, 1)) {
        return {
          text: `|A| = ${a}, |B| = ${b}, |A ∩ B| = ${c} ise |A ∪ B| kaçtır?`, answer: a + b - c,
          steps: ['|A ∪ B| = |A| + |B| − |A ∩ B|', `= ${a} + ${b} − ${c} = ${a + b - c}`],
        };
      }
      return {
        text: `|A| = ${a}, |A ∩ B| = ${c} ise |A − B| kaçtır?`, answer: a - c,
        steps: ['A − B, A\'da olup B\'de olmayan elemanlardır: |A − B| = |A| − |A ∩ B|', `= ${a} − ${c} = ${a - c}`],
      };
    },
  },
  {
    id: '9-mantik', grade: 9, unit: 'Kümeler ve mantık', name: 'Önermeler ve doğruluk tablosu', symbol: '∨',
    summary: 'Bağlaçlar ve doğruluk tablosu satırları',
    lesson: {
      intro: 'Önerme, doğru ya da yanlış olduğu kesin olarak söylenebilen cümledir. Önermeler ∧ (ve), ∨ (veya) ile bağlanır.',
      sections: [
        {
          title: 'Bağlaçlar',
          paras: [
            'p ∧ q yalnızca p ve q ikisi de doğruyken doğrudur.',
            'p ∨ q, p ya da q en az biri doğruysa doğrudur; yalnızca ikisi de yanlışsa yanlıştır.',
            'n önermeli bir bileşik önermenin doğruluk tablosunda 2ⁿ satır vardır.',
          ],
          formula: 'n önerme → 2ⁿ satır',
        },
        {
          title: 'Örnekler',
          paras: ['Doğruluk tablosunda her önerme için D (doğru) ve Y (yanlış) değerleri yazılır.'],
          examples: [
            {problem: 'p: "2 çift sayıdır" (D), q: "3 asal sayıdır" (D) ise p ∧ q kaçtır?', steps: ['p = D, q = D', 'Ve bağlacında ikisi de D olduğu için sonuç D'], answer: 'D'},
            {problem: 'p: "5 çift sayıdır" (Y), q: "7 asal sayıdır" (D) ise p ∨ q kaçtır?', steps: ['p = Y, q = D', 'Veya bağlacında biri D olduğu için sonuç D'], answer: 'D'},
            {problem: '4 basit önermeden oluşan bileşik önermenin doğruluk tablosunda kaç satır vardır?', steps: ['Her önerme 2 değer alır', '2⁴ = 16 satır'], answer: '16'},
          ],
        },
      ],
    },
    gen(rnd) {
      const n = rnd(2, 6);
      if (rnd(0, 1)) {
        return {
          text: `${n} basit önermeden oluşan bileşik önermenin doğruluk tablosunda kaç satır vardır?`, answer: 2 ** n,
          steps: ['Her önerme D ya da Y olabilir.', `2^${n} = ${2 ** n} satır`],
        };
      }
      return {
        text: `${n} basit önerme ∨ (veya) bağlacıyla birleştirilirse bileşik önerme doğruluk tablosunda kaç satırda doğru olur?`, answer: 2 ** n - 1,
        steps: ['∨ yalnızca tüm önermeler yanlışken yanlıştır; bu tek satırdır.', `Doğru satır sayısı: 2^${n} − 1 = ${2 ** n - 1}`],
      };
    },
  },
  {
    id: '9-mutlak', grade: 9, unit: 'Denklem ve eşitsizlik', name: 'Mutlak değerli denklemler', symbol: '|x|',
    summary: '|x − a| = b denkleminde çözümler',
    lesson: {
      intro: 'Bir sayının mutlak değeri, sayının sayı doğrusundaki sıfıra uzaklığıdır ve hiçbir zaman negatif olmaz.',
      sections: [
        {
          title: 'Mutlak değerli denklem',
          paras: ['|x − a| = b denkleminde b > 0 ise iki çözüm vardır: x − a = b ya da x − a = −b.', 'b = 0 ise tek çözüm vardır; b < 0 ise çözüm yoktur.'],
          formula: '|x − a| = b  ⇒  x = a + b veya x = a − b',
          examples: [
            {problem: '|x − 3| = 5 denkleminin çözümlerini bulun.', steps: ['x − 3 = 5 → x = 8', 'x − 3 = −5 → x = −2', 'Çözümler: 8 ve −2'], answer: '8 ve −2'},
            {problem: '|2x + 1| = 7 denkleminin çözümlerinin toplamı kaçtır?', steps: ['2x + 1 = 7 → x = 3', '2x + 1 = −7 → x = −4', 'Toplam: 3 + (−4) = −1'], answer: '-1'},
            {problem: '|x + 4| = −2 denkleminin kaç çözümü vardır?', steps: ['Mutlak değer negatif olamaz', 'Bu nedenle çözüm yoktur'], answer: '0'},
          ],
          tip: 'Mutlak değerli denklemde her zaman iki durumu ayrı ayrı çöz ve kontrol et.',
        },
      ],
    },
    gen(rnd) {
      const a = rnd(-9, 9), b = rnd(1, 9);
      return {
        text: `|x ${pm(-a)}| = ${b} denkleminin çözümlerinin çarpımı kaçtır?`, answer: a * a - b * b,
        steps: [`x ${pm(-a)} = ${b} → x = ${a + b}`, `x ${pm(-a)} = −${b} → x = ${a - b}`, `Çarpım: (${a + b})(${a - b}) = ${a * a - b * b}`],
      };
    },
  },
  {
    id: '9-esitsizlik', grade: 9, unit: 'Denklem ve eşitsizlik', name: 'Birinci dereceden eşitsizlikler', symbol: '<',
    summary: 'Eşitsizliği çöz, en büyük tam sayıyı bul',
    lesson: {
      intro: 'Eşitsizlikler de denklemler gibi çözülür; fark, bir eşitsizliğin iki tarafını pozitif sayıya bölersen yön değişmez.',
      sections: [
        {
          title: 'Eşitsizlik çözme',
          paras: ['Bilinmeyen terimleri bir tarafa, sabitleri diğer tarafa topla.', 'Her iki tarafı negatif bir sayıya bölersen eşitsizlik yönü değişir.'],
          formula: '2x − 3 < 7 → 2x < 10 → x < 5',
          examples: [
            {problem: '2x − 3 < 7 eşitsizliğini çözüp en büyük tam sayı çözümü bulun.', steps: ['2x < 10', 'x < 5', 'En büyük tam sayı çözüm: 4'], answer: '4'},
            {problem: '−3x + 6 ≥ 0 eşitsizliğini çözün.', steps: ['−3x ≥ −6', 'Her iki tarafı −3\'e bölüyoruz; yön değişir: x ≤ 2', 'Çözüm kümesi: x ≤ 2'], answer: 'x ≤ 2'},
          ],
          tip: 'Negatif sayıyla çarpıp bölerken eşitsizlik işaretini çevirmeyi unutma.',
        },
      ],
    },
    gen(rnd) {
      const a = [2, 3, 4, 5][rnd(0, 3)], b = rnd(-9, 9), c = rnd(-9, 19);
      const t = (c - b) / a, ans = Math.ceil(t) - 1;
      return {
        text: `${a}x ${pm(b)} < ${c} eşitsizliğini sağlayan en büyük tam sayı kaçtır?`, answer: ans,
        steps: [`${a}x < ${c} − (${b}) = ${c - b}`, `x < ${fraction(c - b, a)}`, `En büyük tam sayı çözüm: ${ans}`],
      };
    },
  },
  {
    id: '9-ucgen-aci', grade: 9, unit: 'Geometri', name: 'Üçgende açılar', symbol: '△',
    summary: 'İç açı toplamı ve dış açı teoremi',
    lesson: {
      intro: 'Bir üçgenin iç açılarının toplamı her zaman 180°dir. Dış açılar ise komşu olmayan iç açıların toplamına eşittir.',
      sections: [
        {
          title: 'İç ve dış açılar',
          paras: ['İç açılar toplamı: α + β + γ = 180°.', 'Bir dış açı, kendisine komşu olmayan iki iç açının toplamına eşittir.'],
          formula: 'α + β + γ = 180°  ve  dış açı = β + γ',
          examples: [
            {problem: 'Bir üçgenin iki açısı 40° ve 75° ise üçüncü açı kaç derecedir?', steps: ['40° + 75° = 115°', '180° − 115° = 65°'], answer: '65'},
            {problem: 'Bir üçgende iç açılar 40° ve 75° ise, bu açılara komşu olmayan dış açı kaç derecedir?', steps: ['Dış açı = 40° + 75° = 115°'], answer: '115'},
            {problem: 'Üçgenin açıları x, 2x ve 3x ise x kaç derecedir?', steps: ['x + 2x + 3x = 180°', '6x = 180°', 'x = 30°'], answer: '30'},
          ],
        },
      ],
    },
    gen(rnd) {
      const x = rnd(20, 90), y = rnd(20, 170 - x);
      if (rnd(0, 1)) {
        return {text: `Bir üçgenin iç açılarından ikisi ${x}° ve ${y}° ise üçüncü açı kaç derecedir?`, answer: 180 - x - y, steps: [`${x}° + ${y}° = ${x + y}°`, `180° − ${x + y}° = ${180 - x - y}°`]};
      }
      return {text: `İç açıları ${x}° ve ${y}° olan bir üçgende, bu iki açıya komşu olmayan dış açı kaç derecedir?`, answer: x + y, steps: [`Dış açı = ${x}° + ${y}° = ${x + y}°`]};
    },
  },
  {
    id: '9-koklu', grade: 9, unit: 'Üslü ve köklü sayılar', name: 'Köklü ifadelerde sadeleştirme', symbol: '√',
    summary: 'Kök dışına çıkan katsayıyı bul',
    lesson: {
      intro: 'Kök altındaki tam kare çarpanlar kök dışına çıkarılabilir. Bu işleme sadeleştirme denir.',
      sections: [
        {
          title: 'Kök dışına çıkarma',
          paras: ['√(a²·b) = a√b. Kök altındaki en büyük tam kare çarpanı bulup kök dışına çıkarırsın.'],
          formula: '√72 = √(36 · 2) = 6√2',
          examples: [
            {problem: '√72 ifadesini sadeleştirin.', steps: ['72 = 36 · 2', '√36 = 6', 'Sonuç: 6√2'], answer: '6√2'},
            {problem: '√50 + √18 ifadesini sadeleştirin.', steps: ['√50 = √(25 · 2) = 5√2', '√18 = √(9 · 2) = 3√2', 'Toplam: 5√2 + 3√2 = 8√2'], answer: '8√2'},
          ],
          tip: 'Kök dışındaki sayılar toplanabilir; yalnızca aynı kök ifadeleri birleştirilir.',
        },
      ],
    },
    gen(rnd) {
      const k = rnd(2, 6), m = [2, 3, 5, 6, 7, 10, 11][rnd(0, 6)];
      return {
        text: `√${k * k * m} ifadesi k√${m} biçiminde yazıldığında k kaçtır?`, answer: k,
        steps: [`${k * k * m} = ${k * k} · ${m}`, `√${k * k} = ${k}`, `√${k * k * m} = ${k}√${m}`],
      };
    },
  },
  {
    id: '9-veri', grade: 9, unit: 'Veri', name: 'Açıklık ve dağılım', symbol: 'R',
    summary: 'Verinin en büyük ve en küçük değeri',
    lesson: {
      intro: 'Veri dağılımını anlamak için en büyük ve en küçük değere, yani açıklığa bakarız.',
      sections: [
        {
          title: 'Açıklık',
          paras: ['Açıklık = en büyük değer − en küçük değer. Açıklık büyükse veriler birbirinden çok farklıdır.'],
          formula: 'Açıklık = Max − Min',
          examples: [
            {problem: 'Veriler: 12, 7, 19, 3, 15 ise açıklık kaçtır?', steps: ['En büyük: 19, en küçük: 3', 'Açıklık: 19 − 3 = 16'], answer: '16'},
            {problem: 'Veriler: 45, 52, 48, 50 ise açıklık kaçtır?', steps: ['En büyük: 52, en küçük: 45', 'Açıklık: 52 − 45 = 7'], answer: '7'},
          ],
        },
      ],
    },
    gen(rnd) {
      const list = [];
      while (list.length < 6) list.push(rnd(1, 50));
      const max = Math.max(...list), min = Math.min(...list);
      return {
        text: `Veriler: ${list.join(', ')}. Bu verilerin açıklığı (en büyük − en küçük) kaçtır?`, answer: max - min,
        steps: [`En büyük değer: ${max}`, `En küçük değer: ${min}`, `Açıklık: ${max} − ${min} = ${max - min}`],
      };
    },
  },
];
