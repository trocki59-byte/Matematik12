import {fraction, minus, pm} from '../steps.js';

// 8. sınıf: üslü ve köklü sayılar, özdeşlikler, doğrunun eğimi, Pisagor, dönüşümler, medyan.
const TRIPLES = [[3, 4, 5], [5, 12, 13], [8, 15, 17], [7, 24, 25], [6, 8, 10], [9, 12, 15]];

export default [
  {
    id: '8-uslu', grade: 8, unit: 'Üslü ve köklü sayılar', name: 'Üslü ifadeler', symbol: '^',
    summary: 'Üs kurallarını uygula',
    lesson: {
      intro: 'a^n, a sayısının n kez kendisiyle çarpılmasıdır. Üslü ifadelerde bazı kurallar işlemi kısaltır.',
      sections: [{
        title: 'Üs kuralları',
        paras: ['Aynı tabanlı çarpımlarda üsler toplanır: a^m · a^n = a^(m+n). Bir üssün üssü alındığında üsler çarpılır: (a^m)^n = a^(m·n).'],
        formula: '2³ · 2⁴ = 2⁷ ve (3²)³ = 3⁶',
        examples: [{problem: '(3²)³ = 3^x ifadesinde x kaçtır?', steps: ['Üsler çarpılır: 2 · 3 = 6', 'Sonuç: 3^6'], answer: '6'}],
      }],
    },
    gen(rnd) {
      const a = rnd(2, 5), m = rnd(2, 5), n = rnd(2, 4);
      if (rnd(0, 1)) {
        return {
          text: `${a}^${m} × ${a}^${n} = ${a}^x → x kaçtır?`, answer: m + n,
          steps: ['Tabanlar aynı: üsler toplanır.', `${m} + ${n} = ${m + n}`, `Sonuç: ${a}^${m + n}`],
        };
      }
      return {
        text: `(${a}^${m})^${n} = ${a}^x → x kaçtır?`, answer: m * n,
        steps: [`Üsler çarpılır: ${m} · ${n} = ${m * n}`, `Sonuç: ${a}^${m * n}`],
      };
    },
  },
  {
    id: '8-kok', grade: 8, unit: 'Üslü ve köklü sayılar', name: 'Tam kare ve karekök', symbol: '√',
    summary: 'Karekökleri hesapla',
    lesson: {
      intro: 'Bir sayının karekökü, karesi kendisine eşit olan pozitif sayıdır.',
      sections: [{
        title: 'Karekök',
        paras: ['√25 = 5, çünkü 5² = 25. Kök altındaki sayı, bir tam sayının karesi ise kökü tam sayı çıkar.'],
        formula: '√81 = 9, çünkü 9² = 81',
        examples: [{problem: '√144 + √49 = ?', steps: ['√144 = 12 (12² = 144)', '√49 = 7 (7² = 49)', '12 + 7 = 19'], answer: '19'}],
      }],
    },
    gen(rnd) {
      if (rnd(0, 1)) {
        const k = rnd(2, 25);
        return {text: `√${k * k} = ?`, answer: k, steps: [`${k} · ${k} = ${k * k}`, `Sonuç: ${k}`]};
      }
      const k = rnd(2, 25), j = rnd(2, 9);
      return {text: `√${k * k} × √${j * j} = ?`, answer: k * j, steps: [`√${k * k} = ${k}, √${j * j} = ${j}`, `${k} × ${j} = ${k * j}`]};
    },
  },
  {
    id: '8-ozdeslik', grade: 8, unit: 'Cebir', name: 'Özdeşlikler', symbol: 'x²',
    summary: 'Tam kare ve iki kare farkı açılımları',
    lesson: {
      intro: 'Özdeşlikler, her değer için doğru olan hazır açılımlardır. Bunları bilmek açılım yaparken zaman kazandırır.',
      sections: [{
        title: 'Temel özdeşlikler',
        paras: ['(a + b)² = a² + 2ab + b² ve (a − b)(a + b) = a² − b² özdeşlikleri en sık kullanılanlardır.'],
        formula: '(x + 4)² = x² + 8x + 16',
        examples: [{problem: '(x + 4)² ifadesinde x\'in katsayısı kaçtır?', steps: ['(x + 4)² = x² + 2 · 4 · x + 16', 'x\'in katsayısı 8'], answer: '8'}],
      }],
    },
    gen(rnd) {
      const a = rnd(2, 9);
      if (rnd(0, 1)) {
        return {text: `(x + ${a})² ifadesinde x'in katsayısı kaçtır?`, answer: 2 * a, steps: [`(x + ${a})² = x² + 2 · ${a} · x + ${a}²`, `x'in katsayısı: ${2 * a}`]};
      }
      return {text: `(x + ${a})(x − ${a}) ifadesinin sabit terimi kaçtır?`, answer: -a * a, steps: [`(x + ${a})(x − ${a}) = x² − ${a}²`, `Sabit terim: ${minus(-a * a)}`]};
    },
  },
  {
    id: '8-dogrusal-egim', grade: 8, unit: 'Doğrusal ilişkiler', name: 'Doğrunun eğimi', symbol: 'm',
    summary: 'İki noktadan eğim bul',
    lesson: {
      intro: 'Eğim, bir doğrunun ne kadar dik olduğunu gösterir. İki noktası bilinen doğrunun eğimi kolayca bulunur.',
      sections: [{
        title: 'Eğim formülü',
        paras: ['A(x₁, y₁) ve B(x₂, y₂) noktalarından geçen doğrunun eğimi m = (y₂ − y₁) / (x₂ − x₁) ile bulunur.'],
        formula: 'm = (y₂ − y₁) / (x₂ − x₁)',
        examples: [{problem: 'A(1, 2) ve B(3, 8) noktalarından geçen doğrunun eğimi kaçtır?', steps: ['Eğim = (8 − 2) / (3 − 1)', '= 6/2 = 3'], answer: '3'}],
      }],
    },
    gen(rnd) {
      let x1, x2;
      do {
        x1 = rnd(-5, 5);
        x2 = rnd(-5, 5);
      } while (x1 === x2);
      const y1 = rnd(-6, 8), y2 = rnd(-6, 8);
      const num = y2 - y1, den = x2 - x1;
      const text = `A(${x1}, ${y1}) ve B(${x2}, ${y2}) noktalarından geçen doğrunun eğimi kaçtır? (Kesir olarak yazın, örn. 3/4)`;
      return {
        text, answer: num / den, answerText: fraction(num, den), mustSimplify: true,
        steps: [`Eğim = (${y2} − (${y1})) / (${x2} − (${x1})) = ${num}/${den}`, `Sonuç: ${fraction(num, den)}`],
      };
    },
  },
  {
    id: '8-pisagor', grade: 8, unit: 'Geometri', name: 'Pisagor bağıntısı', symbol: 'a²',
    summary: 'Dik üçgende kenar uzunluklarını bul',
    lesson: {
      intro: 'Dik üçgende dik kenarların kareleri toplamı, hipotenüsün karesine eşittir.',
      sections: [{
        title: 'Pisagor bağıntısı',
        paras: ['Dik kenarlar a ve b, hipotenüs c ise a² + b² = c² olur.'],
        formula: '3² + 4² = 5²',
        examples: [{problem: 'Dik kenarları 6 cm ve 8 cm olan dik üçgenin hipotenüsü kaç cm\'dir?', steps: ['6² + 8² = 36 + 64 = 100', 'c = √100 = 10 cm'], answer: '10'}],
        tip: '3-4-5, 5-12-13 gibi üçlüleri ezberlemek işlemi hızlandırır.',
      }],
    },
    gen(rnd) {
      const [a, b, c] = TRIPLES[rnd(0, TRIPLES.length - 1)];
      if (rnd(0, 1)) {
        return {text: `Dik kenarları ${a} cm ve ${b} cm olan dik üçgenin hipotenüsü kaç cm'dir?`, answer: c, steps: [`${a}² + ${b}² = ${a * a} + ${b * b} = ${c * c}`, `c = √${c * c} = ${c} cm`]};
      }
      return {text: `Hipotenüsü ${c} cm, bir dik kenarı ${a} cm olan dik üçgenin diğer dik kenarı kaç cm'dir?`, answer: b, steps: [`${b}² = ${c}² − ${a}² = ${c * c} − ${a * a} = ${b * b}`, `${b} cm`]};
    },
  },
  {
    id: '8-donusum', grade: 8, unit: 'Geometri', name: 'Öteleme ve yansıma', symbol: '↗',
    summary: 'Noktaların yeni koordinatlarını bul',
    lesson: {
      intro: 'Öteleme, bir noktayı belirli bir yönde kaydırmaktır. Yansıma ise bir eksene göre ayna görüntüsünü alır.',
      sections: [{
        title: 'Öteleme ve yansıma kuralları',
        paras: ['(x, y) noktası (a, b) kadar ötelenirse yeni nokta (x + a, y + b) olur. x eksenine göre yansımada y işaret değiştirir: (x, y) → (x, −y).'],
        formula: '(2, 3) → (2 + 4, 3 − 1) = (6, 2)',
        examples: [{problem: 'A(2, 3) noktası (4, −1) kadar ötelenirse yeni y koordinatı kaç olur?', steps: ['y\' = 3 + (−1) = 2'], answer: '2'}],
      }],
    },
    gen(rnd) {
      const x = rnd(-6, 6), y = rnd(-6, 6);
      const mode = rnd(0, 2);
      if (mode === 0) {
        const dx = rnd(-5, 5), dy = rnd(-5, 5);
        return {
          text: `A(${minus(x)}, ${minus(y)}) noktası (${minus(dx)}, ${minus(dy)}) kadar ötelenirse yeni x koordinatı kaç olur?`,
          answer: x + dx, steps: [`x' = ${minus(x)} ${pm(dx)} = ${x + dx}`],
        };
      }
      if (mode === 1) {
        const dx = rnd(-5, 5), dy = rnd(-5, 5);
        return {
          text: `A(${minus(x)}, ${minus(y)}) noktası (${minus(dx)}, ${minus(dy)}) kadar ötelenirse yeni y koordinatı kaç olur?`,
          answer: y + dy, steps: [`y' = ${minus(y)} ${pm(dy)} = ${y + dy}`],
        };
      }
      return {
        text: `A(${minus(x)}, ${minus(y)}) noktasının x eksenine göre yansıması olan noktanın y koordinatı kaçtır?`,
        answer: -y, steps: [`x eksenine göre yansımada y işaret değiştirir: y' = −(${minus(y)}) = ${-y}`],
      };
    },
  },
  {
    id: '8-medyan', grade: 8, unit: 'Veri analizi', name: 'Medyan (ortanca)', symbol: 'M',
    summary: 'Sıralı verilerin ortadaki değeri',
    lesson: {
      intro: 'Medyan, verileri küçükten büyüğe sıraladığında tam ortada kalan değerdir.',
      sections: [{
        title: 'Medyan nasıl bulunur?',
        paras: ['Veriler sıralanır. Veri sayısı tekse ortadaki değer medyandır. Veri sayısı çiftse ortadaki iki değerin aritmetik ortalaması alınır.'],
        formula: '2, 5, 7, 9, 12 → medyan 7',
        examples: [{problem: 'Verilen sayılar: 14, 3, 9, 7, 11. Medyan kaçtır?', steps: ['Sırala: 3, 7, 9, 11, 14', 'Ortadaki değer: 9'], answer: '9'}],
      }],
    },
    gen(rnd) {
      const data = [];
      while (data.length < 7) data.push(rnd(1, 50));
      const sorted = [...data].sort((p, q) => p - q);
      const shuffled = [...data];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = rnd(0, i);
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      return {
        text: `Verilen sayılar: ${shuffled.join(', ')}. Medyanı (ortanca değer) kaçtır?`, answer: sorted[3],
        steps: [`Sırala: ${sorted.join(', ')}`, `Ortadaki değer: ${sorted[3]}`],
      };
    },
  },
];
