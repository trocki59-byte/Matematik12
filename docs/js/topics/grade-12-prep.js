import {fraction, pm} from '../steps.js';

// Üniversiteye hazırlık: 12. sınıf konularının daha zor, sınav tarzı soruları.
export default [
  {
    id: '12-hazirlik-teget', grade: 12, unit: 'Üniversiteye hazırlık', name: 'Teğet ve eğim', symbol: 'f′',
    summary: 'Bir noktadaki teğetin eğimini bul',
    lesson: {
      intro: 'Bir eğrinin bir noktasındaki teğetinin eğimi, o noktadaki türevine eşittir. Bu, sınav sorularında en sık karşılaşılan türev uygulamalarından biridir.',
      sections: [
        {
          title: 'Eğim = türev',
          paras: ['x = x₀ noktasındaki teğetin eğimi f′(x₀)\'dır.', 'Önce türevi al, sonra x₀ değerini yerine yaz.'],
          formula: 'm = f′(x₀)',
          examples: [
            {problem: 'f(x) = x³ + 2x için x = 1 noktasındaki teğetin eğimi kaçtır?', steps: ['f′(x) = 3x² + 2', 'f′(1) = 3 + 2 = 5'], answer: '5'},
            {problem: 'f(x) = 2x² − 5x için x = 3 noktasındaki teğetin eğimi kaçtır?', steps: ['f′(x) = 4x − 5', 'f′(3) = 12 − 5 = 7'], answer: '7'},
            {problem: 'f(x) = x³ − 3x için teğet eğimi 0 olan x değerlerinin pozitif olanı kaçtır?', steps: ['f′(x) = 3x² − 3 = 0', 'x² = 1 → x = ±1', 'Pozitif olan: 1'], answer: '1'},
          ],
          tip: 'Eğim sorularında önce türev, sonra değer: iki adımı karıştırma.',
        },
      ],
    },
    gen(rnd) {
      const a = rnd(1, 3), b = rnd(-4, 4), x0 = rnd(-2, 3);
      const slope = 3 * a * x0 * x0 + b;
      return {
        text: `f(x) = ${a === 1 ? '' : a}x³ ${pm(b)}x için x = ${x0} noktasındaki teğetin eğimi kaçtır?`, answer: slope,
        steps: [`f′(x) = ${3 * a}x² ${pm(b)}`, `f′(${x0}) = ${3 * a}·${x0 * x0} ${pm(b)} = ${slope}`],
      };
    },
  },
  {
    id: '12-hazirlik-alan', grade: 12, unit: 'Üniversiteye hazırlık', name: 'Eğri altı alan', symbol: '∫',
    summary: 'Sınırlar arasında alanı integralle hesapla',
    lesson: {
      intro: 'Bir fonksiyonun grafiği ile x ekseni arasında kalan alan, belirli integralle bulunur. Sınır değerleri integralin alt ve üst sınırlarıdır.',
      sections: [
        {
          title: 'Belirli integralle alan',
          paras: ['Sınırları 0 ile k olan integral, [0, k] aralığındaki alanı verir (fonksiyon bu aralıkta pozitifse).', 'Terim terim integral al, sonra sınırları yerine yaz: F(k) − F(0).'],
          formula: '∫₀ᵏ (3x² + n) dx = k³ + nk',
          examples: [
            {problem: '∫₀² 3x² dx kaçtır?', steps: ['F(x) = x³', 'F(2) − F(0) = 8 − 0 = 8'], answer: '8'},
            {problem: '∫₀¹ (3x² + 2) dx kaçtır?', steps: ['F(x) = x³ + 2x', 'F(1) − F(0) = (1 + 2) − 0 = 3'], answer: '3'},
            {problem: '∫₁² 2x dx kaçtır?', steps: ['F(x) = x²', 'F(2) − F(1) = 4 − 1 = 3'], answer: '3'},
          ],
        },
      ],
    },
    gen(rnd) {
      const k = rnd(1, 4), n = rnd(-3, 5);
      return {
        text: `∫₀^${k} (3x² ${pm(n)}) dx = ?`, answer: k ** 3 + n * k,
        steps: [`F(x) = x³ ${pm(n)}x`, `F(${k}) − F(0) = ${k ** 3} ${pm(n * k)} = ${k ** 3 + n * k}`],
      };
    },
  },
  {
    id: '12-hazirlik-kosullu', grade: 12, unit: 'Üniversiteye hazırlık', name: 'Koşullu olasılık', symbol: 'P',
    summary: 'Bir olay gerçekleşmişken diğerinin olasılığı',
    lesson: {
      intro: 'Koşullu olasılık, bir olayın gerçekleştiği bilindiğinde diğer olayın olasılığıdır. Örneklem uzayı, koşulu sağlayanlarla sınırlanır.',
      sections: [
        {
          title: 'Koşul ile örneklem uzayını daralt',
          paras: ['P(A | B) = (A ∩ B) sayısı / B sayısı.', 'Koşul verildiğinde yalnızca koşulu sağlayanlara bakarsın.'],
          formula: 'P(A | B) = n(A ∩ B) / n(B)',
          examples: [
            {problem: 'Bir sınıfta 12 kız ve 8 erkek var. Kızların 3\'ü gözlüklü. Seçilen kişi kız iken gözlüklü olma olasılığı kaçtır?', steps: ['Koşul: kız → 12 kişi', 'Gözlüklü kız: 3', 'Olasılık: 3/12 = 1/4'], answer: '1/4', answerText: '1/4', mustSimplify: true},
            {problem: '30 öğrenciden 18\'i matematik, 12\'si fizik seviyor; ikisini de sevenler 6 kişi. Matematik seven birinin fizik de sevme olasılığı kaçtır?', steps: ['Matematik seven: 18', 'İkisini de seven: 6', 'Olasılık: 6/18 = 1/3'], answer: '1/3', answerText: '1/3', mustSimplify: true},
          ],
        },
      ],
    },
    gen(rnd) {
      const girls = rnd(6, 14), glasses = rnd(1, Math.min(girls - 1, 7));
      const num = glasses, den = girls;
      return {
        text: `Bir sınıfta ${girls} kız var ve bunların ${glasses} tanesi gözlüklü. Seçilen kişi kız iken gözlüklü olma olasılığı kaçtır? (Sadeleştirerek yaz.)`,
        answer: num / den, answerText: fraction(num, den), mustSimplify: true,
        steps: [`Koşul: kız → ${girls} kişi`, `Gözlüklü kız: ${glasses}`, `Olasılık: ${glasses}/${girls} = ${fraction(num, den)}`],
      };
    },
  },
  {
    id: '12-hazirlik-log', grade: 12, unit: 'Üniversiteye hazırlık', name: 'Logaritma denklemi', symbol: 'log',
    summary: 'log denklemini üsle çöz',
    lesson: {
      intro: 'Logaritma denklemlerinde logaritmanın tanımını kullanırsın: logₐ(x) = k ise x = aᵏ. Sınav sorularında en hızlı çözüm bu dönüşümdür.',
      sections: [
        {
          title: 'Tanımı kullan',
          paras: ['logₐ(x) = k ise x = aᵏ.', 'Taban 2 ve 3 gibi küçük sayılarla kuvvetleri hesaplamak yeterlidir.'],
          formula: 'logₐ(x) = k  ⇔  x = aᵏ',
          examples: [
            {problem: 'log₂(x) = 4 ise x kaçtır?', steps: ['x = 2⁴', '= 16'], answer: '16'},
            {problem: 'log₃(x) = 2 ise x kaçtır?', steps: ['x = 3²', '= 9'], answer: '9'},
            {problem: 'log₅(x) = 1 ise x kaçtır?', steps: ['x = 5¹', '= 5'], answer: '5'},
          ],
        },
      ],
    },
    gen(rnd) {
      const base = [2, 3, 5][rnd(0, 2)], k = rnd(2, 4);
      return {
        text: `log${base === 2 ? '₂' : base === 3 ? '₃' : '₅'}(x) = ${k} ise x kaçtır?`, answer: base ** k,
        steps: [`x = ${base}^${k}`, `= ${base ** k}`],
      };
    },
  },
  {
    id: '12-hazirlik-karmasik', grade: 12, unit: 'Üniversiteye hazırlık', name: 'Karmaşık sayılar', symbol: 'i',
    summary: 'Çarpımın reel kısmını bul (i² = −1)',
    lesson: {
      intro: 'Karmaşık sayılar a + bi biçimindedir ve i² = −1. Çarpım yaparken i² yerine −1 yazılır.',
      sections: [
        {
          title: 'Çarpım ve reel kısım',
          paras: ['(a + bi)(c + di) = (ac − bd) + (ad + bc)i.', 'Reel kısım ac − bd\'dir.'],
          formula: '(a + bi)(c + di) = (ac − bd) + (ad + bc)i',
          examples: [
            {problem: '(2 + 3i)(4 − i) çarpımının reel kısmı kaçtır?', steps: ['ac − bd = 2·4 − 3·(−1)', '= 8 + 3 = 11'], answer: '11'},
            {problem: '(1 + i)(1 − i) çarpımının reel kısmı kaçtır?', steps: ['ac − bd = 1·1 − 1·(−1)', '= 1 + 1 = 2'], answer: '2'},
            {problem: '(3 − 2i)(2 + 5i) çarpımının sanal kısmının katsayısı kaçtır?', steps: ['ad + bc = 3·5 + (−2)·2', '= 15 − 4 = 11'], answer: '11'},
          ],
        },
      ],
    },
    gen(rnd) {
      const a = rnd(-4, 4), b = rnd(-4, 4), c = rnd(-4, 4), d = rnd(-4, 4);
      const re = a * c - b * d;
      return {
        text: `(${a} ${pm(b)}i)(${c} ${pm(d)}i) çarpımının reel kısmı kaçtır?`, answer: re,
        steps: [`ac − bd = ${a}·${c} − (${b})·(${d})`, `= ${a * c} − (${b * d}) = ${re}`],
      };
    },
  },
  {
    id: '12-hazirlik-kalan', grade: 12, unit: 'Üniversiteye hazırlık', name: 'Polinom değeri ve kalan', symbol: 'P(x)',
    summary: 'Kalan teoremi ile P(r) değerini bul',
    lesson: {
      intro: 'Bir P(x) polinomunu (x − r) ile böldüğünde kalan P(r)\'dir. Bu yüzden kalanı bulmak için bölme işlemi yapmaya gerek yoktur.',
      sections: [
        {
          title: 'Kalan teoremi',
          paras: ['P(x) ÷ (x − r) işleminde kalan P(r)\'dir.', 'Polinomu x yerine r yazarak değerlendir.'],
          formula: 'P(x) = (x − r)·Q(x) + P(r)',
          examples: [
            {problem: 'P(x) = x² + 3x + 1 polinomunun (x − 2) ile bölümünden kalan kaçtır?', steps: ['P(2) = 4 + 6 + 1', '= 11'], answer: '11'},
            {problem: 'P(x) = x³ − x polinomunun (x + 1) ile bölümünden kalan kaçtır?', steps: ['r = −1', 'P(−1) = −1 − (−1) = 0'], answer: '0'},
            {problem: 'P(x) = 2x² − 4x + 5 polinomunun (x − 1) ile bölümünden kalan kaçtır?', steps: ['P(1) = 2 − 4 + 5', '= 3'], answer: '3'},
          ],
        },
      ],
    },
    gen(rnd) {
      const a = rnd(1, 3), b = rnd(-4, 4), c = rnd(-5, 5), r = rnd(-3, 3);
      const value = a * r * r + b * r + c;
      return {
        text: `P(x) = ${a === 1 ? '' : a}x² ${pm(b)}x ${pm(c)} polinomunun (x ${pm(-r)}) ile bölümünden kalan kaçtır?`, answer: value,
        steps: [`r = ${r}`, `P(${r}) = ${a * r * r} ${pm(b * r)} ${pm(c)} = ${value}`],
      };
    },
  },
];
