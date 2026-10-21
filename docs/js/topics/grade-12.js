import {minus, pm} from '../steps.js';

// 12. sınıf: limit, türev, türevin uygulamaları, belirli integral, analitik geometri, determinant.
export default [
  {
    id: '12-limit', grade: 12, unit: 'Limit', name: 'Limit ve sadeleştirme', symbol: 'lim',
    summary: 'Belirsizliği sadeleştirerek limiti bul',
    lesson: {
      intro: 'Limit, x bir değere yaklaşırken fonksiyonun yaklaştığı değerdir. Pay ve paydası 0 çıkan ifadelerde önce sadeleştirme yapılır.',
      sections: [
        {
          title: 'Belirsizlik ve sadeleştirme',
          paras: ['Doğrudan yerine koyunca 0/0 çıkıyorsa, pay ve paydayı çarpanlarına ayırıp ortak çarpanı sadeleştirirsin.', 'Sadeleştirdikten sonra kalan ifadede x yerine değeri yazmak limiti verir.'],
          formula: 'lim(x→2) (x² − 4)/(x − 2) = lim(x→2) (x + 2) = 4',
          examples: [
            {problem: 'lim(x→2) (x² − 4)/(x − 2) kaçtır?', steps: ['x² − 4 = (x − 2)(x + 2)', 'Sadeleştir: x + 2', 'x = 2 yazılırsa 4'], answer: '4'},
            {problem: 'lim(x→3) (x² − 9)/(x − 3) kaçtır?', steps: ['x² − 9 = (x − 3)(x + 3)', 'Sadeleştir: x + 3', 'x = 3 için 6'], answer: '6'},
            {problem: 'lim(x→1) (x² + x − 2)/(x − 1) kaçtır?', steps: ['x² + x − 2 = (x − 1)(x + 2)', 'Sadeleştir: x + 2', 'x = 1 için 3'], answer: '3'},
          ],
        },
      ],
    },
    gen(rnd) {
      const a = rnd(-4, 4), b = rnd(-4, 4);
      if (rnd(0, 1)) {
        return {
          text: `lim(x→${a}) (x ${pm(-a)})(x ${pm(b)}) / (x ${pm(-a)}) = ?`, answer: a + b,
          steps: [`Pay ve paydadaki (x ${pm(-a)}) sadeleşir`, `Kalan: x ${pm(b)}`, `x = ${a} için: ${a} ${pm(b)} = ${a + b}`],
        };
      }
      return {
        text: `lim(x→${a}) (x² − ${a * a}) / (x ${pm(-a)}) = ?`, answer: 2 * a,
        steps: [`x² − ${a * a} = (x − ${a})(x + ${a})`, `Sadeleşince kalan: x + ${a}`, `x = ${a} için: ${2 * a}`],
      };
    },
  },
  {
    id: '12-turev', grade: 12, unit: 'Türev', name: 'Türev alma kuralları', symbol: "f′",
    summary: 'Kuvvet kuralıyla türev ve değer bulma',
    lesson: {
      intro: 'Türev, bir fonksiyonun anlık değişim hızıdır. Polinomlarda kuvvet kuralı ile hızlıca alınır.',
      sections: [
        {
          title: 'Kuvvet kuralı',
          paras: ['(xⁿ)′ = n · xⁿ⁻¹. Sabitin türevi 0\'dır. Toplam ve farkın türevi, terimlerin türevlerinin toplamı ve farkıdır.', 'Bir katsayı türevde aynen kalır: (c · f)′ = c · f′.'],
          formula: '(xⁿ)′ = n · xⁿ⁻¹',
          examples: [
            {problem: 'f(x) = x³ − 2x² + 5x − 7 ise f′(x) nedir?', steps: ['(x³)′ = 3x²', '(−2x²)′ = −4x', '(5x)′ = 5', '(−7)′ = 0', 'f′(x) = 3x² − 4x + 5'], answer: '3x² − 4x + 5'},
            {problem: 'f(x) = 3x² + 2x + 1 ise f′(1) kaçtır?', steps: ['f′(x) = 6x + 2', 'f′(1) = 6 · 1 + 2 = 8'], answer: '8'},
            {problem: 'f(x) = 4x³ ise f′(2) kaçtır?', steps: ['f′(x) = 12x²', 'f′(2) = 12 · 4 = 48'], answer: '48'},
          ],
          tip: 'Türev almadan önce parantezleri aç ve benzer terimleri topla.',
        },
      ],
    },
    gen(rnd) {
      const a = rnd(1, 4), b = rnd(-4, 4), c = rnd(-6, 6), x0 = rnd(-3, 3);
      const d1 = 3 * a * x0 * x0 + 2 * b * x0 + c;
      const aText = a === 1 ? '' : `${a}`;
      return {
        text: `f(x) = ${aText}x³ ${pm(b)}x² ${pm(c)}x ise f′(${x0}) kaçtır?`, answer: d1,
        steps: [`f′(x) = ${3 * a}x² ${pm(2 * b)}x ${pm(c)}`, `f′(${x0}) = ${3 * a}(${x0})² ${pm(2 * b * x0)} ${pm(c)} = ${d1}`],
      };
    },
  },
  {
    id: '12-ekstremum', grade: 12, unit: 'Türevin uygulamaları', name: 'Kritik noktalar', symbol: 'max',
    summary: 'f′(x) = 0 denkleminden ekstremum noktaları',
    lesson: {
      intro: 'Türevin sıfır olduğu noktalar kritik noktalardır. Bu noktalarda fonksiyonun artış-azalış yönü değişebilir.',
      sections: [
        {
          title: 'Kritik noktaları bulma',
          paras: ['f′(x) = 0 denklemini çözerek kritik noktaları bulursun.', 'Kritik noktada f′ işaret değiştiriyorsa bu nokta yerel maksimum ya da minimumdur.'],
          formula: 'f′(x) = 0  →  kritik noktalar',
          examples: [
            {problem: 'f(x) = x³ − 12x için kritik noktalar nelerdir?', steps: ['f′(x) = 3x² − 12', '3x² − 12 = 0 → x² = 4', 'x = 2 veya x = −2'], answer: '2 ve −2'},
            {problem: 'f(x) = x³ − 27x için f′(x) = 0 denkleminin pozitif kökü kaçtır?', steps: ['f′(x) = 3x² − 27 = 0', 'x² = 9 → x = ±3', 'Pozitif kök: 3'], answer: '3'},
            {problem: 'f(x) = 2x³ − 6x ise kritik noktaların toplamı kaçtır?', steps: ['f′(x) = 6x² − 6 = 0', 'x² = 1 → x = ±1', 'Toplam: 1 + (−1) = 0'], answer: '0'},
          ],
        },
      ],
    },
    gen(rnd) {
      const k = rnd(1, 6);
      return {
        text: `f(x) = x³ − ${3 * k * k}x ise f′(x) = 0 denkleminin pozitif kökü kaçtır?`, answer: k,
        steps: [`f′(x) = 3x² − ${3 * k * k} = 0`, `x² = ${k * k} → x = ±${k}`, `Pozitif kök: ${k}`],
      };
    },
  },
  {
    id: '12-integral', grade: 12, unit: 'İntegral', name: 'Belirli integral', symbol: '∫',
    summary: 'Sınırlar arasında alan ve değişim',
    lesson: {
      intro: 'Belirli integral, bir fonksiyonun iki sınır arasındaki toplam değişimini ya da grafiğin altındaki alanı verir.',
      sections: [
        {
          title: 'Newton–Leibniz formülü',
          paras: ['∫ₐᵇ f(x) dx = F(b) − F(a), burada F, f\'nin bir ilkelidir.', 'Ters kuvvet kuralı: ∫ xⁿ dx = xⁿ⁺¹ / (n + 1) + C.'],
          formula: '∫ₐᵇ f(x) dx = F(b) − F(a)',
          examples: [
            {problem: '∫₀² (2x + 1) dx kaçtır?', steps: ['F(x) = x² + x', 'F(2) − F(0) = (4 + 2) − 0 = 6'], answer: '6'},
            {problem: '∫₁³ 3x² dx kaçtır?', steps: ['F(x) = x³', 'F(3) − F(1) = 27 − 1 = 26'], answer: '26'},
            {problem: '∫₀¹ 4x³ dx kaçtır?', steps: ['F(x) = x⁴', 'F(1) − F(0) = 1 − 0 = 1'], answer: '1'},
          ],
        },
      ],
    },
    gen(rnd) {
      const m = rnd(1, 4), b = rnd(-5, 5), k = rnd(1, 4);
      return {
        text: `∫₀^${k} (${2 * m}x ${pm(b)}) dx = ?`, answer: m * k * k + b * k,
        steps: [`F(x) = ${m}x² ${pm(b)}x`, `F(${k}) − F(0) = ${m * k * k} ${pm(b * k)} = ${m * k * k + b * k}`],
      };
    },
  },
  {
    id: '12-analitik', grade: 12, unit: 'Analitik geometri', name: 'Uzaklık ve orta nokta', symbol: 'xy',
    summary: 'İki nokta arası uzaklığın karesi ve orta nokta',
    lesson: {
      intro: 'Koordinat düzleminde iki nokta arasındaki uzaklık ve orta nokta, koordinatlardan doğrudan hesaplanır.',
      sections: [
        {
          title: 'Formüller',
          paras: ['A(x₁, y₁) ile B(x₂, y₂) arasındaki uzaklık: |AB|² = (x₂ − x₁)² + (y₂ − y₁)².', 'Orta nokta: M = ((x₁ + x₂)/2, (y₁ + y₂)/2).'],
          formula: '|AB|² = (x₂ − x₁)² + (y₂ − y₁)²',
          examples: [
            {problem: 'A(1, 2) ve B(4, 6) noktaları arasındaki uzaklığın karesi kaçtır?', steps: ['(4 − 1)² + (6 − 2)²', '= 9 + 16 = 25'], answer: '25'},
            {problem: 'A(−2, 3) ve B(4, −1) noktalarının orta noktasının x koordinatı kaçtır?', steps: ['(−2 + 4) / 2 = 1'], answer: '1'},
            {problem: 'A(0, 0) ve B(3, 4) arasındaki uzaklık kaçtır?', steps: ['|AB|² = 3² + 4² = 25', '|AB| = √25 = 5'], answer: '5'},
          ],
        },
      ],
    },
    gen(rnd) {
      const x1 = rnd(-5, 5), y1 = rnd(-5, 5);
      if (rnd(0, 1)) {
        const x2 = rnd(-5, 5), y2 = rnd(-5, 5), dx = x2 - x1, dy = y2 - y1;
        return {
          text: `A(${minus(x1)}, ${minus(y1)}) ve B(${minus(x2)}, ${minus(y2)}) noktaları arasındaki uzaklığın karesi kaçtır?`, answer: dx * dx + dy * dy,
          steps: [`(${x2} − (${x1}))² + (${y2} − (${y1}))²`, `= ${dx * dx} + ${dy * dy} = ${dx * dx + dy * dy}`],
        };
      }
      const x2 = x1 + 2 * rnd(-4, 4), y2 = rnd(-5, 5);
      return {
        text: `A(${minus(x1)}, ${minus(y1)}) ve B(${minus(x2)}, ${minus(y2)}) noktalarının orta noktasının x koordinatı kaçtır?`, answer: (x1 + x2) / 2,
        steps: [`(${x1} + (${x2})) / 2 = ${(x1 + x2) / 2}`],
      };
    },
  },
  {
    id: '12-determinant', grade: 12, unit: 'Matrisler', name: '2×2 determinant', symbol: 'det',
    summary: 'ad − bc ile determinant hesabı',
    lesson: {
      intro: 'Determinant, kare bir matrise atanan tek bir sayıdır. 2×2 matrislerde köşegen çarpımlarının farkı alınır.',
      sections: [
        {
          title: 'Hesaplama',
          paras: ['[[a, b], [c, d]] matrisinin determinantı ad − bc\'dir.', 'Determinant sıfır ise matris tersinir değildir.'],
          formula: 'det [[a, b], [c, d]] = ad − bc',
          examples: [
            {problem: 'det [[3, 2], [1, 4]] kaçtır?', steps: ['3 · 4 − 2 · 1', '= 12 − 2 = 10'], answer: '10'},
            {problem: 'det [[2, 4], [1, 2]] kaçtır?', steps: ['2 · 2 − 4 · 1', '= 4 − 4 = 0', 'Determinant 0: matris tersinir değil'], answer: '0'},
            {problem: 'det [[−1, 5], [3, −2]] kaçtır?', steps: ['(−1)(−2) − 5 · 3', '= 2 − 15 = −13'], answer: '-13'},
          ],
        },
      ],
    },
    gen(rnd) {
      const a = rnd(-6, 6), b = rnd(-6, 6), c = rnd(-6, 6), d = rnd(-6, 6);
      return {
        text: `det [[${minus(a)}, ${minus(b)}], [${minus(c)}, ${minus(d)}]] = ?`, answer: a * d - b * c,
        steps: [`${minus(a)} · ${minus(d)} − ${minus(b)} · ${minus(c)}`, `= ${a * d} − (${b * c}) = ${a * d - b * c}`],
      };
    },
  },
];
