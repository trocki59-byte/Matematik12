import {fraction, pm} from '../steps.js';

// 11. sınıf: trigonometri, logaritma, diziler, parabol, kalan teoremi.
const sup = p => ({2: '²', 3: '³'})[p] ?? `^${p}`;

// Polinom katsayıları en yüksek dereceden başlar: [c3, c2, c1, c0]
function polyText(cs) {
  const deg = cs.length - 1;
  let s = '';
  cs.forEach((c, i) => {
    const p = deg - i;
    if (c === 0) return;
    const abs = Math.abs(c);
    const coef = abs === 1 && p > 0 ? '' : `${abs}`;
    const body = p === 0 ? `${abs}` : p === 1 ? `${coef}x` : `${coef}x${sup(p)}`;
    const sign = s === '' ? (c < 0 ? '−' : '') : c < 0 ? ' − ' : ' + ';
    s += sign + body;
  });
  return s || '0';
}

// Özel açı değerleri: [etiket, değer × 2] — değerler yarıya bölünerek kesir olarak yazılır.
const TRIG = [
  ['sin 0°', 0], ['sin 30°', 1], ['sin 90°', 2], ['sin 180°', 0], ['sin 270°', -2],
  ['cos 0°', 2], ['cos 60°', 1], ['cos 90°', 0], ['cos 180°', -2], ['cos 270°', 0],
  ['tan 0°', 0], ['tan 45°', 2], ['tan 135°', -2],
];

export default [
  {
    id: '11-trig', grade: 11, unit: 'Trigonometri', name: 'Özel açıların trigonometrik değerleri', symbol: 'sin',
    summary: '0°, 30°, 45°, 60°, 90° değerleri',
    lesson: {
      intro: 'Sinüs, kosinüs ve tanjant, birim çember üzerindeki noktanın koordinatlarından tanımlanır. Özel açıların değerlerini ezberlemek çözümü hızlandırır.',
      sections: [
        {
          title: 'Birim çember ve temel değerler',
          paras: ['sin θ, noktanın y koordinatı; cos θ, x koordinatıdır. tan θ = sin θ / cos θ.', 'sin 30° = 1/2, cos 60° = 1/2, sin 90° = 1, cos 90° = 0, tan 45° = 1.'],
          formula: 'sin²θ + cos²θ = 1',
          examples: [
            {problem: 'sin 30° + cos 60° kaçtır?', steps: ['sin 30° = 1/2', 'cos 60° = 1/2', 'Toplam: 1/2 + 1/2 = 1'], answer: '1'},
            {problem: 'sin 90° − cos 180° kaçtır?', steps: ['sin 90° = 1', 'cos 180° = −1', '1 − (−1) = 2'], answer: '2'},
            {problem: 'tan 45° · cos 0° kaçtır?', steps: ['tan 45° = 1', 'cos 0° = 1', 'Çarpım: 1 · 1 = 1'], answer: '1'},
          ],
          tip: 'Birim çemberi düşün: x ekseni üzerindeki açılarda sinüs 0, y ekseni üzerindeki açılarda kosinüs 0 olur.',
        },
      ],
    },
    gen(rnd) {
      const i = rnd(0, TRIG.length - 1), j = rnd(0, TRIG.length - 1);
      const [l1, v1] = TRIG[i], [l2, v2] = TRIG[j];
      const twice = v1 + v2;
      return {
        text: `${l1} + ${l2} = ?`, answer: twice / 2, answerText: fraction(twice, 2),
        steps: [`${l1} = ${fraction(v1, 2)}`, `${l2} = ${fraction(v2, 2)}`, `Toplam: ${fraction(twice, 2)}`],
      };
    },
  },
  {
    id: '11-logaritma', grade: 11, unit: 'Logaritma', name: 'Logaritma kuralları', symbol: 'log',
    summary: 'Çarpım ve bölüm kuralıyla logaritma',
    lesson: {
      intro: 'Logaritma, bir sayıyı elde etmek için tabanın kaç kuvvetinin alınması gerektiğini söyler: log_a(b) = c demek a^c = b demektir.',
      sections: [
        {
          title: 'Logaritma kuralları',
          paras: ['log_a(x · y) = log_a x + log_a y', 'log_a(x / y) = log_a x − log_a y', 'log_a(x^k) = k · log_a x'],
          formula: 'log₂(8) = 3 çünkü 2³ = 8',
          examples: [
            {problem: 'log₂(32) kaçtır?', steps: ['2^? = 32', '2⁵ = 32', 'log₂(32) = 5'], answer: '5'},
            {problem: 'log₃(9) + log₃(27) kaçtır?', steps: ['log₃9 = 2 (3² = 9)', 'log₃27 = 3 (3³ = 27)', 'Toplam: 2 + 3 = 5'], answer: '5'},
            {problem: 'log₅(125) − log₅(5) kaçtır?', steps: ['log₅125 = 3, log₅5 = 1', 'Fark: 3 − 1 = 2'], answer: '2'},
          ],
        },
      ],
    },
    gen(rnd) {
      const b = rnd(2, 5), p = rnd(1, 4), q = rnd(1, 4);
      if (rnd(0, 1)) {
        return {
          text: `log_${b}(${b ** p} · ${b ** q}) kaçtır?`, answer: p + q,
          steps: [`log_${b}(${b ** p} · ${b ** q}) = log_${b}(${b ** p}) + log_${b}(${b ** q})`, `= ${p} + ${q} = ${p + q}`],
        };
      }
      return {
        text: `log_${b}(${b ** p}) − log_${b}(${b ** q}) kaçtır?`, answer: p - q,
        steps: [`log_${b}(${b ** p}) = ${p}, log_${b}(${b ** q}) = ${q}`, `Fark: ${p} − ${q} = ${p - q}`],
      };
    },
  },
  {
    id: '11-aritmetik', grade: 11, unit: 'Diziler', name: 'Aritmetik dizi', symbol: 'a_n',
    summary: 'n. terim ve ilk n terimin toplamı',
    lesson: {
      intro: 'Aritmetik dizide ardışık terimler arasındaki fark sabittir. Bu sabit farka ortak fark denir.',
      sections: [
        {
          title: 'Genel terim ve toplam',
          paras: ['n. terim: aₙ = a₁ + (n − 1)d.', 'İlk n terimin toplamı: Sₙ = n(a₁ + aₙ) / 2.'],
          formula: 'aₙ = a₁ + (n − 1)d,   Sₙ = n(a₁ + aₙ) / 2',
          examples: [
            {problem: 'a₁ = 3, d = 4 olan dizinin 10. terimi kaçtır?', steps: ['a₁₀ = 3 + (10 − 1) · 4', '= 3 + 36 = 39'], answer: '39'},
            {problem: '2, 5, 8, 11, … dizisinin ilk 5 teriminin toplamı kaçtır?', steps: ['a₁ = 2, d = 3, a₅ = 2 + 4 · 3 = 14', 'S₅ = 5 · (2 + 14) / 2 = 40'], answer: '40'},
            {problem: 'Aritmetik dizide a₃ = 10 ve a₇ = 22 ise d kaçtır?', steps: ['a₇ − a₃ = 4d', '22 − 10 = 12 → d = 3'], answer: '3'},
          ],
          tip: 'Dizinin farkını bulmak için ardışık iki terimi birbirinden çıkarmak yeterlidir.',
        },
      ],
    },
    gen(rnd) {
      const a1 = rnd(-5, 10), d = rnd(-4, 6), n = rnd(3, 20);
      const an = a1 + (n - 1) * d;
      if (rnd(0, 1)) {
        return {
          text: `a₁ = ${a1}, d = ${d} olan aritmetik dizinin ${n}. terimi kaçtır?`, answer: an,
          steps: [`a${n} = ${a1} + (${n} − 1) · (${d})`, `= ${a1} ${pm((n - 1) * d)} = ${an}`],
        };
      }
      const sum = (n * (a1 + an)) / 2;
      return {
        text: `a₁ = ${a1}, d = ${d} olan aritmetik dizinin ilk ${n} teriminin toplamı kaçtır?`, answer: sum,
        steps: [`a${n} = ${an}`, `S${n} = ${n} · (${a1} + ${an}) / 2 = ${sum}`],
      };
    },
  },
  {
    id: '11-geometrik', grade: 11, unit: 'Diziler', name: 'Geometrik dizi', symbol: 'rⁿ',
    summary: 'Ortak çarpanla büyüyen diziler',
    lesson: {
      intro: 'Geometrik dizide her terim bir öncekinin sabit bir sayıyla (ortak oran r) çarpılmasıyla elde edilir.',
      sections: [
        {
          title: 'Genel terim ve toplam',
          paras: ['n. terim: aₙ = a₁ · rⁿ⁻¹.', 'r ≠ 1 ise ilk n terimin toplamı: Sₙ = a₁ (rⁿ − 1) / (r − 1).'],
          formula: 'aₙ = a₁ · r^(n−1),   Sₙ = a₁ (rⁿ − 1) / (r − 1)',
          examples: [
            {problem: 'a₁ = 2, r = 3 olan dizinin 4. terimi kaçtır?', steps: ['a₄ = 2 · 3³', '= 2 · 27 = 54'], answer: '54'},
            {problem: '1, 2, 4, 8, … dizisinin ilk 6 teriminin toplamı kaçtır?', steps: ['a₁ = 1, r = 2, n = 6', 'S₆ = 1 · (2⁶ − 1) / (2 − 1)', '= 64 − 1 = 63'], answer: '63'},
            {problem: 'Geometrik dizide a₂ = 6 ve a₃ = 18 ise r kaçtır?', steps: ['r = a₃ / a₂ = 18 / 6 = 3'], answer: '3'},
          ],
        },
      ],
    },
    gen(rnd) {
      const a1 = rnd(1, 5), r = rnd(2, 3), n = rnd(2, 5);
      if (rnd(0, 1)) {
        const an = a1 * r ** (n - 1);
        return {
          text: `a₁ = ${a1}, r = ${r} olan geometrik dizinin ${n}. terimi kaçtır?`, answer: an,
          steps: [`a${n} = ${a1} · ${r}^${n - 1}`, `= ${a1} · ${r ** (n - 1)} = ${an}`],
        };
      }
      const sum = (a1 * (r ** n - 1)) / (r - 1);
      return {
        text: `a₁ = ${a1}, r = ${r} olan geometrik dizinin ilk ${n} teriminin toplamı kaçtır?`, answer: sum,
        steps: [`S${n} = ${a1} · (${r}${sup(n)} − 1) / (${r} − 1)`, `= ${a1} · ${r ** n - 1} / ${r - 1} = ${sum}`],
      };
    },
  },
  {
    id: '11-parabol', grade: 11, unit: 'Fonksiyonlar', name: 'Parabolün tepe noktası', symbol: '∪',
    summary: 'y = ax² + bx + c için tepe noktası',
    lesson: {
      intro: 'y = ax² + bx + c parabolünün tepe noktası, simetri ekseninin üzerindedir. Tepe noktasının x koordinatı −b/(2a) ile bulunur.',
      sections: [
        {
          title: 'Tepe noktası',
          paras: ['Tepe x koordinatı: x = −b / (2a).', 'Tepe y koordinatı: f(x) fonksiyonunda bu x değerini yerine yazarak bulunur.', 'a > 0 ise parabol yukarı, a < 0 ise aşağı açılır.'],
          formula: 'Tepe: x = −b/(2a),  y = f(x)',
          examples: [
            {problem: 'y = x² − 6x + 5 parabolünün tepe noktası nedir?', steps: ['x = −(−6) / (2 · 1) = 3', 'y = 3² − 6 · 3 + 5 = 9 − 18 + 5 = −4', 'Tepe: (3, −4)'], answer: '(3, -4)'},
            {problem: 'y = −2x² + 8x − 1 parabolünün tepe noktasının x koordinatı kaçtır?', steps: ['x = −8 / (2 · (−2)) = −8 / (−4) = 2'], answer: '2'},
            {problem: 'y = −2x² + 8x − 1 parabolü yukarı mı, aşağı mı açılır?', steps: ['a = −2 < 0', 'Parabol aşağı açılır'], answer: 'aşağı'},
          ],
        },
      ],
    },
    gen(rnd) {
      const a = [1, 2, -1, -2][rnd(0, 3)], h = rnd(-5, 5), k = rnd(-9, 9);
      const b = -2 * a * h, c = a * h * h + k;
      const coefA = a === 1 ? '' : a === -1 ? '−' : `${a < 0 ? '−' : ''}${Math.abs(a)}`;
      const askY = rnd(0, 1) === 1;
      return {
        text: `y = ${coefA}x² ${pm(b)}x ${pm(c)} parabolünün tepe noktasının ${askY ? 'y' : 'x'} koordinatı kaçtır?`,
        answer: askY ? k : h,
        steps: [`x = −b/(2a) = −(${b})/(2 · ${a}) = ${h}`, `y = f(${h}) = ${k}`, `Tepe: (${h}, ${k})`],
      };
    },
  },
  {
    id: '11-kalan', grade: 11, unit: 'Polinomlar', name: 'Kalan teoremi', symbol: 'P(a)',
    summary: 'P(x) : (x − a) kalanı P(a)\'dır',
    lesson: {
      intro: 'Kalan teoremi: P(x) polinomunun (x − a) ile bölümünden kalan P(a) değeridir. Bölme işlemi yapmadan kalan hesaplanır.',
      sections: [
        {
          title: 'Kalan teoremi',
          paras: ['P(x) polinomunun (x − a) ile bölümünden kalan, x yerine a yazıldığında elde edilen P(a) değerine eşittir.'],
          formula: 'P(x) = (x − a) · B(x) + P(a)',
          examples: [
            {problem: 'P(x) = x³ − 2x² + 3x − 1 polinomunun (x − 2) ile bölümünden kalan kaçtır?', steps: ['P(2) = 2³ − 2 · 2² + 3 · 2 − 1', '= 8 − 8 + 6 − 1 = 5', 'Kalan 5'], answer: '5'},
            {problem: 'P(x) = x² + 4x + 1 polinomunun (x + 1) ile bölümünden kalan kaçtır?', steps: ['(x + 1) = (x − (−1)), a = −1', 'P(−1) = 1 − 4 + 1 = −2'], answer: '-2'},
            {problem: 'P(x) = 2x³ − x + 5 polinomu (x − 1) ile tam bölünüyor mu?', steps: ['P(1) = 2 − 1 + 5 = 6', 'P(1) ≠ 0 olduğu için tam bölünmez'], answer: 'hayır'},
          ],
        },
      ],
    },
    gen(rnd) {
      const cs = [rnd(1, 3), rnd(-3, 3), rnd(-5, 5), rnd(-5, 5)];
      const a = rnd(-3, 3);
      const [c3, c2, c1, c0] = cs;
      const value = c3 * a ** 3 + c2 * a ** 2 + c1 * a + c0;
      return {
        text: `P(x) = ${polyText(cs)} polinomunun (x ${pm(-a)}) ile bölümünden kalan kaçtır?`, answer: value,
        steps: [`Kalan teoremine göre kalan P(${a}) değeridir.`, `P(${a}) = ${c3} · (${a})³ + ${c2} · (${a})² + ${c1} · (${a}) + ${c0} = ${value}`],
      };
    },
  },
];
