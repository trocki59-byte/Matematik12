import {fraction, minus, pm} from '../steps.js';

// Üniversiteye hazırlık: ek konular (dizi, limit, trigonometri, sayma, analitik geometri, fonksiyonlar).
const UNIT = 'Üniversiteye hazırlık';

function binom(n, r) {
  let v = 1;
  for (let i = 1; i <= r; i++) v = (v * (n - r + i)) / i;
  return v;
}

export default [
  {
    id: '12-hazirlik-limit-oran', grade: 12, unit: UNIT, name: 'Sonsuzda limit (oran)', symbol: 'lim',
    summary: 'Pay ve paydanın en büyük dereceli terimlerinin oranı',
    lesson: {
      intro: 'x sonsuza giderken rasyonel ifadelerin limiti, pay ve paydadaki en büyük dereceli terimlerin katsayılarının oranına eşittir.',
      sections: [{
        title: 'En büyük dereceli terimlere bak',
        paras: ['Pay ve paydada x² terimi en büyük derecedir; küçük dereceli terimler limite etki etmez.', 'Limit, x² katsayılarının oranıdır.'],
        formula: 'lim(x→∞) (a x² + …)/(c x² + …) = a/c',
        examples: [
          {problem: 'lim(x→∞) (4x² − 7x)/(2x² + 9) kaçtır?', steps: ['x² katsayıları: 4 ve 2', 'Limit = 4/2 = 2'], answer: '2'},
          {problem: 'lim(x→∞) (3x² − x + 1)/(6x² + 5) kaçtır?', steps: ['x² katsayıları: 3 ve 6', 'Limit = 3/6 = 1/2'], answer: '1/2'},
          {problem: 'lim(x→∞) (x² + 4)/(5x² − 2x) kaçtır?', steps: ['x² katsayıları: 1 ve 5', 'Limit = 1/5'], answer: '1/5'},
        ],
      }],
    },
    gen(rnd) {
      const a = rnd(1, 6), c = rnd(1, 6), b = rnd(-5, 5), d = rnd(-5, 5);
      return {
        text: `lim(x→∞) (${a}x² ${pm(b)}x) / (${c}x² ${pm(d)}) = ?`, answer: a / c, answerText: fraction(a, c), mustSimplify: true,
        steps: ['Pay ve paydada x² en büyük derece', `Katsayılar: ${a} ve ${c}`, `Limit = ${a}/${c} = ${fraction(a, c)}`],
      };
    },
  },
  {
    id: '12-hazirlik-aritmetik-terim', grade: 12, unit: UNIT, name: 'Aritmetik dizi: n. terim', symbol: 'aₙ',
    summary: 'aₙ = a₁ + (n − 1)d formülüyle terim bul',
    lesson: {
      intro: 'Aritmetik dizide her terim bir öncekine sabit bir fark (ortak fark) eklenerek bulunur.',
      sections: [{
        title: 'n. terim formülü',
        paras: ['aₙ = a₁ + (n − 1)·d.', 'n − 1 kadar ortak fark eklenir; ilk terimin üzerine ekleme yapılır.'],
        formula: 'aₙ = a₁ + (n − 1)d',
        examples: [
          {problem: 'a₁ = 3, d = 4 olan dizinin 10. terimi kaçtır?', steps: ['a₁₀ = 3 + 9·4', '= 3 + 36 = 39'], answer: '39'},
          {problem: 'a₁ = −2, d = 5 olan dizinin 4. terimi kaçtır?', steps: ['a₄ = −2 + 3·5', '= −2 + 15 = 13'], answer: '13'},
          {problem: 'a₁ = 7, d = −3 olan dizinin 6. terimi kaçtır?', steps: ['a₆ = 7 + 5·(−3)', '= 7 − 15 = −8'], answer: '-8'},
        ],
      }],
    },
    gen(rnd) {
      const a1 = rnd(-5, 10), d = rnd(-4, 6), n = rnd(5, 20);
      const value = a1 + (n - 1) * d;
      return {
        text: `İlk terimi ${minus(a1)}, ortak farkı ${minus(d)} olan aritmetik dizinin ${n}. terimi kaçtır?`, answer: value,
        steps: [`a${n} = ${a1} + ${n - 1}·(${d})`, `= ${a1} + (${(n - 1) * d}) = ${value}`],
      };
    },
  },
  {
    id: '12-hazirlik-geometrik-toplam', grade: 12, unit: UNIT, name: 'Geometrik dizi toplamı', symbol: 'Sₙ',
    summary: 'Oranı 2 olan dizinin ilk n terimi',
    lesson: {
      intro: 'Geometrik dizide her terim bir öncekinin oran (r) ile çarpılmasıyla bulunur. Toplam formülü ilk n terimin toplamını verir.',
      sections: [{
        title: 'İlk n terimin toplamı (r = 2)',
        paras: ['Oran r = 2 ise Sₙ = a₁·(2ⁿ − 1).', 'Bu formül, ilk terim ve n değerinden toplamı hemen verir.'],
        formula: 'Sₙ = a₁ (rⁿ − 1)/(r − 1)',
        examples: [
          {problem: 'a₁ = 3, r = 2 için ilk 4 terimin toplamı kaçtır?', steps: ['S₄ = 3(2⁴ − 1)', '= 3·15 = 45'], answer: '45'},
          {problem: 'a₁ = 1, r = 2 için ilk 5 terimin toplamı kaçtır?', steps: ['S₅ = 1(2⁵ − 1)', '= 31'], answer: '31'},
          {problem: 'a₁ = 2, r = 2 için ilk 3 terimin toplamı kaçtır?', steps: ['S₃ = 2(2³ − 1)', '= 2·7 = 14'], answer: '14'},
        ],
      }],
    },
    gen(rnd) {
      const a1 = rnd(1, 5), n = rnd(2, 6);
      const value = a1 * (2 ** n - 1);
      return {
        text: `İlk terimi ${a1}, oranı 2 olan geometrik dizinin ilk ${n} teriminin toplamı kaçtır?`, answer: value,
        steps: [`S${n} = ${a1}(2^${n} − 1)`, `= ${a1}·${2 ** n - 1} = ${value}`],
      };
    },
  },
  {
    id: '12-hazirlik-kombinasyon', grade: 12, unit: UNIT, name: 'Kombinasyon C(n, r)', symbol: 'C',
    summary: 'Sırasız seçim sayısı',
    lesson: {
      intro: 'Kombinasyon, n elemandan r tanesini sırasız seçme sayısıdır. Sıra önemli değilse permütasyon yerine kombinasyon kullanılır.',
      sections: [{
        title: 'C(n, r) = n! / (r!(n − r)!)',
        paras: ['Kısa yol: C(n, r) için payda r! ile çarpılır; büyük faktöriyelleri açmak yerine çarpım ve bölüm yazılır.', 'C(n, r) = C(n, n − r) özelliği hesabı kolaylaştırır.'],
        formula: 'C(n, r) = n·(n−1)·…·(n−r+1) / r!',
        examples: [
          {problem: 'C(5, 2) kaçtır?', steps: ['= 5·4 / 2·1', '= 10'], answer: '10'},
          {problem: 'C(6, 3) kaçtır?', steps: ['= 6·5·4 / 3·2·1', '= 20'], answer: '20'},
          {problem: 'C(7, 2) kaçtır?', steps: ['= 7·6 / 2·1', '= 21'], answer: '21'},
        ],
      }],
    },
    gen(rnd) {
      const n = rnd(5, 9), r = rnd(2, 3);
      const value = binom(n, r);
      return {
        text: `C(${n}, ${r}) kaçtır?`, answer: value,
        steps: [`C(${n}, ${r}) = ${Array.from({length: r}, (_, i) => n - i).join('·')} / ${Array.from({length: r}, (_, i) => r - i).join('·')}`, `= ${value}`],
      };
    },
  },
  {
    id: '12-hazirlik-parabol-tepe', grade: 12, unit: UNIT, name: 'Parabolün tepe noktası', symbol: 'T',
    summary: 'x = −b/(2a) ile tepe noktasının apsisi',
    lesson: {
      intro: 'y = ax² + bx + c parabolünün tepe noktasının x koordinatı (apsisi) −b/(2a) ile bulunur.',
      sections: [{
        title: 'Apsis formülü',
        paras: ['Parabolün simetri ekseni x = −b/(2a) doğrusudur.', 'Tepe noktasının y koordinatı için bu x değerini fonksiyonda yerine koyarsın.'],
        formula: 'xₜ = −b / (2a)',
        examples: [
          {problem: 'y = x² − 4x + 1 parabolünün tepe noktasının x koordinatı kaçtır?', steps: ['a = 1, b = −4', 'x = −(−4)/(2·1) = 2'], answer: '2'},
          {problem: 'y = 2x² + 8x − 3 parabolünün tepe noktasının x koordinatı kaçtır?', steps: ['a = 2, b = 8', 'x = −8/(2·2) = −2'], answer: '-2'},
          {problem: 'y = −x² + 6x parabolünün tepe noktasının x koordinatı kaçtır?', steps: ['a = −1, b = 6', 'x = −6/(2·(−1)) = 3'], answer: '3'},
        ],
      }],
    },
    gen(rnd) {
      const a = rnd(1, 3), xt = rnd(-3, 3), c = rnd(-4, 4);
      const b = -2 * a * xt;
      return {
        text: `y = ${a === 1 ? '' : a}x² ${pm(b)}x ${pm(c)} parabolünün tepe noktasının x koordinatı kaçtır?`, answer: xt,
        steps: [`a = ${a}, b = ${b}`, `x = −(${b})/(2·${a}) = ${xt}`],
      };
    },
  },
  {
    id: '12-hazirlik-ters-fonksiyon', grade: 12, unit: UNIT, name: 'Ters fonksiyon', symbol: 'f⁻¹',
    summary: 'f(x) = ax + b için f⁻¹(y) bul',
    lesson: {
      intro: 'Ters fonksiyon, f(x) = y eşitliğini x için çözerek bulunur. f⁻¹(y), f(x) = y olan x değeridir.',
      sections: [{
        title: 'Denklemi x için çöz',
        paras: ['f(x) = ax + b ise ax + b = y yazılır.', 'x = (y − b)/a bulunur ve f⁻¹(y) budur.'],
        formula: 'f⁻¹(y) = (y − b) / a',
        examples: [
          {problem: 'f(x) = 2x + 3 ise f⁻¹(7) kaçtır?', steps: ['f⁻¹(y) = (y − 3)/2', 'f⁻¹(7) = (7 − 3)/2 = 2'], answer: '2'},
          {problem: 'f(x) = 3x − 6 ise f⁻¹(0) kaçtır?', steps: ['f⁻¹(y) = (y + 6)/3', 'f⁻¹(0) = 6/3 = 2'], answer: '2'},
          {problem: 'f(x) = 4x + 1 ise f⁻¹(−3) kaçtır?', steps: ['f⁻¹(y) = (y − 1)/4', 'f⁻¹(−3) = (−4)/4 = −1'], answer: '-1'},
        ],
      }],
    },
    gen(rnd) {
      const a = rnd(2, 5), b = rnd(-6, 6), y = rnd(-8, 8);
      const num = y - b;
      return {
        text: `f(x) = ${a}x ${pm(b)} ise f⁻¹(${minus(y)}) kaçtır?`, answer: num / a, answerText: fraction(num, a), mustSimplify: true,
        steps: [`f⁻¹(y) = (y ${pm(-b)}) / ${a}`, `f⁻¹(${minus(y)}) = (${minus(num)}) / ${a} = ${fraction(num, a)}`],
      };
    },
  },
  {
    id: '12-hazirlik-bilesske', grade: 12, unit: UNIT, name: 'Fonksiyonların bileşkesi', symbol: 'f∘g',
    summary: '(f∘g)(x) = f(g(x)) değerini bul',
    lesson: {
      intro: '(f∘g)(x) = f(g(x)) bileşkesinde önce g uygulanır, çıkan sonuç f\'ye verilir.',
      sections: [{
        title: 'İçten dışa uygula',
        paras: ['Önce g(x0) hesaplanır, sonra bu değer f\'nin içine yazılır.', 'Sırayı değiştirmek (g∘f) genellikle farklı sonuç verir.'],
        formula: '(f∘g)(x) = f(g(x))',
        examples: [
          {problem: 'f(x) = x + 1, g(x) = 2x² ise (f∘g)(2) kaçtır?', steps: ['g(2) = 2·4 = 8', 'f(8) = 8 + 1 = 9'], answer: '9'},
          {problem: 'f(x) = 3x − 2, g(x) = x² ise (f∘g)(1) kaçtır?', steps: ['g(1) = 1', 'f(1) = 3 − 2 = 1'], answer: '1'},
          {problem: 'f(x) = 2x, g(x) = x + 3 ise (f∘g)(1) kaçtır?', steps: ['g(1) = 4', 'f(4) = 8'], answer: '8'},
        ],
      }],
    },
    gen(rnd) {
      const a = rnd(1, 4), b = rnd(-4, 4), c = rnd(1, 3), x0 = rnd(-2, 3);
      const value = a * (c * x0 * x0) + b;
      return {
        text: `f(x) = ${a}x ${pm(b)}, g(x) = ${c}x² ise (f∘g)(${minus(x0)}) kaçtır?`, answer: value,
        steps: [`g(${x0}) = ${c}·${x0 * x0} = ${c * x0 * x0}`, `f(${c * x0 * x0}) = ${a}·${c * x0 * x0} ${pm(b)} = ${value}`],
      };
    },
  },
  {
    id: '12-hazirlik-mutlak-tamsayi', grade: 12, unit: UNIT, name: 'Mutlak değerli eşitsizlik: tam sayılar', symbol: '|x|',
    summary: '|x − a| < k için tam sayı çözüm sayısı',
    lesson: {
      intro: '|x − a| < k eşitsizliği, a − k < x < a + k aralığına eşdeğerdir. Tam sayı çözümlerini sayarken uç noktalar dahil edilmez.',
      sections: [{
        title: 'Aralığı yaz, tam sayıları say',
        paras: ['|x − a| < k ⇔ a − k < x < a + k.', 'Bu aralıktaki tam sayı sayısı 2k − 1\'dir.'],
        formula: '|x − a| < k  →  2k − 1 tam sayı',
        examples: [
          {problem: '|x − 2| < 3 eşitsizliğini sağlayan tam sayı sayısı kaçtır?', steps: ['−1 < x < 5', 'x = 0, 1, 2, 3, 4 → 5 tane', '2·3 − 1 = 5'], answer: '5'},
          {problem: '|x + 1| < 2 eşitsizliğini sağlayan tam sayı sayısı kaçtır?', steps: ['−3 < x < 1', 'x = −2, −1, 0 → 3 tane', '2·2 − 1 = 3'], answer: '3'},
          {problem: '|x| < 4 eşitsizliğini sağlayan tam sayı sayısı kaçtır?', steps: ['−4 < x < 4', 'x = −3…3 → 7 tane'], answer: '7'},
        ],
      }],
    },
    gen(rnd) {
      const a = rnd(-4, 4), k = rnd(1, 5);
      return {
        text: `|x ${pm(-a)}| < ${k} eşitsizliğini sağlayan tam sayı sayısı kaçtır?`, answer: 2 * k - 1,
        steps: [`${a - k} < x < ${a + k}`, `Tam sayılar: ${a - k + 1} … ${a + k - 1}`, `Sayı: 2·${k} − 1 = ${2 * k - 1}`],
      };
    },
  },
  {
    id: '12-hazirlik-dogru-egim', grade: 12, unit: UNIT, name: 'Doğru denklemi: y eksenini kesme', symbol: 'y=mx+n',
    summary: 'Eğim ve bir noktadan y eksenindeki kesişim',
    lesson: {
      intro: 'Eğimi m ve bir noktası (x₁, y₁) bilinen doğrunun denklemi y − y₁ = m(x − x₁) biçimindedir. x = 0 yazılırsa y eksenini kestiği nokta bulunur.',
      sections: [{
        title: 'Nokta-eğim biçimi',
        paras: ['y = m·x + n yazarak n = y₁ − m·x₁ bulunur.', 'n, doğrunun y eksenini kestiği ordinattır.'],
        formula: 'n = y₁ − m·x₁',
        examples: [
          {problem: 'Eğimi 2 olan ve (1, 5) noktasından geçen doğrunun y eksenini kestiği nokta kaçtır?', steps: ['n = 5 − 2·1', '= 3'], answer: '3'},
          {problem: 'Eğimi −3 olan ve (2, 1) noktasından geçen doğrunun n değeri kaçtır?', steps: ['n = 1 − (−3)·2', '= 1 + 6 = 7'], answer: '7'},
          {problem: 'Eğimi 4 olan ve (−1, 2) noktasından geçen doğrunun n değeri kaçtır?', steps: ['n = 2 − 4·(−1)', '= 2 + 4 = 6'], answer: '6'},
        ],
      }],
    },
    gen(rnd) {
      const m = rnd(-4, 4), x1 = rnd(-3, 3), y1 = rnd(-5, 5);
      const n = y1 - m * x1;
      return {
        text: `Eğimi ${minus(m)} olan ve (${minus(x1)}, ${minus(y1)}) noktasından geçen doğrunun y eksenini kestiği nokta kaçtır?`, answer: n,
        steps: [`n = ${y1} − (${m})·(${x1})`, `= ${y1} ${pm(-m * x1)} = ${n}`],
      };
    },
  },
  {
    id: '12-hazirlik-cember-merkez', grade: 12, unit: UNIT, name: 'Çemberin merkezi', symbol: 'O',
    summary: 'Genel çember denkleminden merkezin apsisi',
    lesson: {
      intro: '(x − a)² + (y − b)² = r² çemberinin merkezi (a, b)\'dir. Genel biçimde x ve y\'nin katsayılarından merkez bulunur.',
      sections: [{
        title: 'Genel biçimden merkez',
        paras: ['x² + y² + Dx + Ey + F = 0 çemberinin merkezi (−D/2, −E/2)\'dir.', 'Yani x\'in katsayısının yarısının eksisi merkezin apsisidir.'],
        formula: 'Merkez = (−D/2, −E/2)',
        examples: [
          {problem: 'x² + y² − 4x + 2y − 4 = 0 çemberinin merkezinin x koordinatı kaçtır?', steps: ['D = −4 → −D/2 = 2'], answer: '2'},
          {problem: 'x² + y² + 6x − 1 = 0 çemberinin merkezinin x koordinatı kaçtır?', steps: ['D = 6 → −D/2 = −3'], answer: '-3'},
          {problem: 'x² + y² − 8x + 10y + 9 = 0 çemberinin merkezi kaçıncı koordinattır? (x koordinatı)', steps: ['D = −8 → −D/2 = 4'], answer: '4'},
        ],
      }],
    },
    gen(rnd) {
      const a = rnd(-4, 4), b = rnd(-4, 4), r = rnd(1, 5);
      return {
        text: `x² + y² ${pm(-2 * a)}x ${pm(-2 * b)}y ${pm(a * a + b * b - r * r)} = 0 çemberinin merkezinin x koordinatı kaçtır?`, answer: a,
        steps: [`D = ${-2 * a}, −D/2 = ${a}`, `Merkezin x koordinatı: ${a}`],
      };
    },
  },
  {
    id: '12-hazirlik-trig-deger', grade: 12, unit: UNIT, name: 'Özel açıların trigonometrik değerleri', symbol: 'sin',
    summary: 'sin ve cos değerlerini topla',
    lesson: {
      intro: '0°, 30°, 60°, 90° ve 180° gibi özel açıların sinüs ve kosinüs değerleri ezberlenmesi gereken temel bilgilerdir.',
      sections: [{
        title: 'Değer tablosu',
        paras: ['sin 0° = 0, sin 30° = 1/2, sin 90° = 1.', 'cos 0° = 1, cos 60° = 1/2, cos 90° = 0, cos 180° = −1.'],
        formula: 'sin 30° = 1/2,  cos 60° = 1/2',
        examples: [
          {problem: 'sin 30° + cos 60° kaçtır?', steps: ['1/2 + 1/2', '= 1'], answer: '1'},
          {problem: 'sin 90° + cos 180° kaçtır?', steps: ['1 + (−1)', '= 0'], answer: '0'},
          {problem: 'sin 0° + cos 60° kaçtır?', steps: ['0 + 1/2', '= 1/2'], answer: '1/2'},
        ],
      }],
    },
    gen(rnd) {
      // Değerler ikiyle çarpılmış olarak tutulur (1/2 → 1).
      const sinTable = [{deg: 0, v: 0}, {deg: 30, v: 1}, {deg: 90, v: 2}];
      const cosTable = [{deg: 0, v: 2}, {deg: 60, v: 1}, {deg: 90, v: 0}, {deg: 180, v: -2}];
      const s = sinTable[rnd(0, sinTable.length - 1)], c = cosTable[rnd(0, cosTable.length - 1)];
      const num = s.v + c.v;
      return {
        text: `sin ${s.deg}° + cos ${c.deg}° kaçtır?`, answer: num / 2, answerText: fraction(num, 2), mustSimplify: true,
        steps: [`sin ${s.deg}° = ${fraction(s.v, 2)}`, `cos ${c.deg}° = ${fraction(c.v, 2)}`, `Toplam = ${fraction(num, 2)}`],
      };
    },
  },
  {
    id: '12-hazirlik-permutasyon', grade: 12, unit: UNIT, name: 'Permütasyon P(n, r)', symbol: 'P',
    summary: 'Sıralı seçim sayısı',
    lesson: {
      intro: 'Permütasyon, n elemandan r tanesini sıralı seçme sayısıdır. Sıra önemliyse kullanılır.',
      sections: [{
        title: 'P(n, r) = n·(n−1)·…·(n−r+1)',
        paras: ['r tane boş kutu düşün: ilk kutuya n seçenek, ikinciye n − 1 seçenek gelir ve böyle devam eder.', 'Kombinasyondan farkı: sıra önemlidir, bu yüzden bölme yoktur.'],
        formula: 'P(n, r) = n·(n−1)·…·(n−r+1)',
        examples: [
          {problem: 'P(5, 2) kaçtır?', steps: ['5·4', '= 20'], answer: '20'},
          {problem: 'P(4, 3) kaçtır?', steps: ['4·3·2', '= 24'], answer: '24'},
          {problem: 'P(6, 2) kaçtır?', steps: ['6·5', '= 30'], answer: '30'},
        ],
      }],
    },
    gen(rnd) {
      const n = rnd(4, 7), r = rnd(2, 3);
      let value = 1;
      for (let i = 0; i < r; i++) value *= n - i;
      return {
        text: `P(${n}, ${r}) kaçtır?`, answer: value,
        steps: [`P(${n}, ${r}) = ${Array.from({length: r}, (_, i) => n - i).join('·')}`, `= ${value}`],
      };
    },
  },
];
