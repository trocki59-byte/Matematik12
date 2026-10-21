import {fraction, pm} from '../steps.js';

// 10. sınıf: fonksiyonlar, ikinci dereceden denklemler, sayma, çember, olasılık.
const factorial = n => (n <= 1 ? 1 : n * factorial(n - 1));

export default [
  {
    id: '10-fonksiyon', grade: 10, unit: 'Fonksiyonlar', name: 'Fonksiyonlarda değer ve bileşke', symbol: 'f',
    summary: 'Değer bulma ve iki fonksiyonun bileşkesi',
    lesson: {
      intro: 'Fonksiyon, her girdiye tek bir çıktı eşleyen kuraldır. f(x) yazımı, x girdisinin f kuralıyla çıktısını gösterir.',
      sections: [
        {
          title: 'Değer bulma ve bileşke',
          paras: ['f(a), x yerine a yazılarak bulunur.', '(f ∘ g)(x) = f(g(x)) bileşkesinde önce g uygulanır, sonra çıkan değere f uygulanır.'],
          formula: '(f ∘ g)(x) = f(g(x))',
          examples: [
            {problem: 'f(x) = 2x + 3 ise f(4) kaçtır?', steps: ['x yerine 4 yaz: f(4) = 2 · 4 + 3', '= 8 + 3 = 11'], answer: '11'},
            {problem: 'f(x) = 2x + 3 ve g(x) = x² ise (f ∘ g)(2) kaçtır?', steps: ['g(2) = 2² = 4', 'f(4) = 2 · 4 + 3 = 11'], answer: '11'},
            {problem: 'f(x) = x + 1 ve g(x) = 3x ise (g ∘ f)(x) ifadesi nedir?', steps: ['(g ∘ f)(x) = g(f(x)) = g(x + 1)', '= 3(x + 1) = 3x + 3'], answer: '3x + 3'},
          ],
          tip: '(f ∘ g) ve (g ∘ f) genellikle farklı sonuç verir; sıra önemlidir.',
        },
      ],
    },
    gen(rnd) {
      const a = rnd(1, 5), b = rnd(-6, 6), c = rnd(1, 4), d = rnd(-6, 6), x0 = rnd(-3, 3);
      const inner = c * x0 + d, ans = a * inner + b;
      return {
        text: `f(x) = ${a}x ${pm(b)}, g(x) = ${c}x ${pm(d)} ise (f ∘ g)(${x0}) kaçtır?`, answer: ans,
        steps: [`g(${x0}) = ${c} · (${x0}) ${pm(d)} = ${inner}`, `f(${inner}) = ${a} · (${inner}) ${pm(b)} = ${ans}`],
      };
    },
  },
  {
    id: '10-ikinci', grade: 10, unit: 'İkinci dereceden denklemler', name: 'Kökler toplamı ve çarpımı', symbol: 'ax²',
    summary: 'Vieta bağıntılarıyla kökleri yorumla',
    lesson: {
      intro: 'ax² + bx + c = 0 denkleminin kökleri x₁ ve x₂ ise, kökler toplamı ve çarpımı katsayılardan doğrudan bulunur.',
      sections: [
        {
          title: 'Vieta bağıntıları',
          paras: ['Kökler toplamı: x₁ + x₂ = −b/a.', 'Kökler çarpımı: x₁ · x₂ = c/a.', 'Kökleri tek tek bulmadan bu bağıntılarla işlem yapabilirsin.'],
          formula: 'x₁ + x₂ = −b/a,   x₁ · x₂ = c/a',
          examples: [
            {problem: 'x² − 5x + 6 = 0 denkleminin kökler toplamı ve çarpımı kaçtır?', steps: ['a = 1, b = −5, c = 6', 'Toplam: −b/a = 5', 'Çarpım: c/a = 6', 'Kökler 2 ve 3 olduğundan bu bağıntılar doğrudur.'], answer: '5 ve 6'},
            {problem: '2x² + 4x − 6 = 0 denkleminin kökler toplamı kaçtır?', steps: ['a = 2, b = 4', 'Toplam: −4/2 = −2'], answer: '-2'},
            {problem: 'x² − 7x + 12 = 0 denkleminin köklerinin farkı kaçtır? (Büyük kök − küçük kök)', steps: ['Kökler 3 ve 4 (çarpanlara ayırarak)', 'Fark: 4 − 3 = 1'], answer: '1'},
          ],
        },
      ],
    },
    gen(rnd) {
      const r1 = rnd(-9, 9), r2 = rnd(-9, 9), a = rnd(1, 3);
      const b = -a * (r1 + r2), c = a * r1 * r2;
      const eq = `${a === 1 ? '' : a}x² ${pm(b)}x ${pm(c)} = 0`;
      if (rnd(0, 1)) {
        return {
          text: `${eq} denkleminin kökler toplamı kaçtır?`, answer: r1 + r2,
          steps: [`a = ${a}, b = ${b}, c = ${c}`, `x₁ + x₂ = −b/a = −(${b})/${a} = ${r1 + r2}`],
        };
      }
      return {
        text: `${eq} denkleminin kökler çarpımı kaçtır?`, answer: r1 * r2,
        steps: [`a = ${a}, c = ${c}`, `x₁ · x₂ = c/a = ${c}/${a} = ${r1 * r2}`],
      };
    },
  },
  {
    id: '10-permutasyon', grade: 10, unit: 'Sayma ve olasılık', name: 'Permütasyon', symbol: 'P',
    summary: 'Sıralı seçimlerin sayısı',
    lesson: {
      intro: 'Permütasyon, n farklı elemandan r tanesinin sıra gözeterek seçilmesidir. Sıra önemliyse permütasyon kullanılır.',
      sections: [
        {
          title: 'Formül',
          paras: ['P(n, r) = n! / (n − r)! = n · (n − 1) · … · (n − r + 1).'],
          formula: 'P(n, r) = n! / (n − r)!',
          examples: [
            {problem: '5 kişiden başkan ve başkan yardımcısı seçilecek. Kaç farklı seçim yapılabilir?', steps: ['Sıra önemli: P(5, 2)', '= 5 · 4 = 20'], answer: '20'},
            {problem: 'Bir yarışmada ilk üç dereceye 8 yarışmacı arasından kaç farklı sıralama ile girilir?', steps: ['P(8, 3) = 8 · 7 · 6', '= 336'], answer: '336'},
            {problem: '4 harfli bir kod, A, B, C, D harflerinin her biri en fazla bir kez kullanılarak yazılacaktır. Kaç farklı kod vardır?', steps: ['P(4, 4) = 4!', '= 4 · 3 · 2 · 1 = 24'], answer: '24'},
          ],
        },
      ],
    },
    gen(rnd) {
      const n = rnd(4, 9), r = rnd(2, Math.min(4, n));
      let prod = 1, terms = [];
      for (let i = 0; i < r; i++) {
        prod *= n - i;
        terms.push(n - i);
      }
      return {
        text: `${n} farklı elemanın ${r} tanesi sıralı olarak seçilirse kaç farklı dizilim oluşur? (P(${n}, ${r}))`, answer: prod,
        steps: [`P(${n}, ${r}) = ${n}! / (${n} − ${r})!`, `= ${terms.join(' · ')} = ${prod}`],
      };
    },
  },
  {
    id: '10-kombinasyon', grade: 10, unit: 'Sayma ve olasılık', name: 'Kombinasyon', symbol: 'C',
    summary: 'Sırasız seçimlerin sayısı',
    lesson: {
      intro: 'Kombinasyon, sıra gözetmeden yapılan seçimdir. Aynı elemanlardan oluşan farklı sıralamalar tek sayılır.',
      sections: [
        {
          title: 'Formül',
          paras: ['C(n, r) = n! / (r! · (n − r)!). Permütasyondan farkı, r! kadar bölmektir.'],
          formula: 'C(n, r) = P(n, r) / r!',
          examples: [
            {problem: '5 kişilik gruptan 2 kişilik bir komite kaç farklı biçimde seçilir?', steps: ['Sıra önemsiz: C(5, 2)', '= (5 · 4) / (2 · 1) = 10'], answer: '10'},
            {problem: '8 öğrenciden 3 kişilik bir ekip kaç farklı biçimde kurulabilir?', steps: ['C(8, 3) = (8 · 7 · 6) / (3 · 2 · 1)', '= 336 / 6 = 56'], answer: '56'},
            {problem: 'C(10, 8) değeri kaçtır?', steps: ['C(10, 8) = C(10, 2) (simetri)', '= (10 · 9) / (2 · 1) = 45'], answer: '45'},
          ],
          tip: 'C(n, r) = C(n, n − r) simetrisi hesabı kolaylaştırır.',
        },
      ],
    },
    gen(rnd) {
      const n = rnd(4, 10), r = rnd(2, Math.min(4, n - 1));
      let num = 1;
      for (let i = 0; i < r; i++) num *= n - i;
      const ans = num / factorial(r);
      const numTerms = Array.from({length: r}, (_, i) => n - i).join(' · ');
      return {
        text: `${n} farklı elemandan ${r} tanesi sırasız olarak seçilirse kaç farklı seçim yapılır? (C(${n}, ${r}))`, answer: ans,
        steps: [`C(${n}, ${r}) = (${numTerms}) / ${r}!`, `= ${num} / ${factorial(r)} = ${ans}`],
      };
    },
  },
  {
    id: '10-cember', grade: 10, unit: 'Analitik geometri', name: 'Çemberin denklemi', symbol: 'O',
    summary: 'Merkez ve yarıçapı denklemden oku',
    lesson: {
      intro: 'Merkezi (h, k) ve yarıçapı r olan çemberin denklemi (x − h)² + (y − k)² = r² biçimindedir.',
      sections: [
        {
          title: 'Denklemden merkez ve yarıçap',
          paras: ['Denklemdeki sabit sayının karekökü yarıçapı verir; (x − h) içindeki h sayısı merkezin x koordinatını verir. Değişken işaretinin tersi alınır.'],
          formula: '(x − 3)² + (y + 2)² = 16  →  merkez (3, −2), r = 4',
          examples: [
            {problem: '(x − 3)² + (y + 2)² = 16 çemberinin yarıçapı kaçtır?', steps: ['r² = 16', 'r = 4'], answer: '4'},
            {problem: '(x + 1)² + (y − 5)² = 9 çemberinin merkezi nedir?', steps: ['x + 1 = x − (−1) → h = −1', 'y − 5 → k = 5', 'Merkez: (−1, 5)'], answer: '(-1, 5)'},
            {problem: 'Merkezi (0, 0), yarıçapı 6 olan çemberin denklemi nedir?', steps: ['x² + y² = 36'], answer: 'x² + y² = 36'},
          ],
        },
      ],
    },
    gen(rnd) {
      const h = rnd(-5, 5), k = rnd(-5, 5), r = rnd(1, 9), what = rnd(0, 2);
      const eq = `(x ${pm(-h)})² + (y ${pm(-k)})² = ${r * r}`;
      const asks = [
        ['yarıçapı', r],
        ['merkezinin x koordinatı', h],
        ['merkezinin y koordinatı', k],
      ];
      const [label, ans] = asks[what];
      return {
        text: `${eq} çemberinin ${label} kaçtır?`, answer: ans,
        steps: [`Merkez (${h}, ${k}), r² = ${r * r}`, `r = √${r * r} = ${r}`],
      };
    },
  },
  {
    id: '10-olasilik-zar', grade: 10, unit: 'Sayma ve olasılık', name: 'İki zarla olasılık', symbol: 'Ω',
    summary: 'Örnek uzay ve olay sayısı',
    lesson: {
      intro: 'Bir deneyde mümkün tüm sonuçların kümesine örnek uzay denir. Olasılık, istenen olayın sayısının örnek uzaydaki sayıya oranıdır.',
      sections: [
        {
          title: 'Örnek uzay',
          paras: ['İki zar atıldığında 6 · 6 = 36 eşit olası sonuç vardır.', 'Toplamın 7 olduğu durumlar: (1,6), (2,5), (3,4), (4,3), (5,2), (6,1). Yani 6 durum vardır.'],
          formula: 'P(olay) = istenen durum sayısı / 36',
          examples: [
            {problem: 'İki zar atıldığında toplamın 7 olma olasılığı kaçtır?', steps: ['İstenen durum: 6', 'P = 6/36 = 1/6'], answer: '1/6'},
            {problem: 'İki zar atıldığında toplamın çift olma olasılığı kaçtır?', steps: ['Toplam çiftse hem iki zar çift ya da hem iki zar tek olmalı', 'Çift sayı sonuç: 18 durum', 'P = 18/36 = 1/2'], answer: '1/2'},
          ],
        },
      ],
    },
    gen(rnd) {
      const s = rnd(2, 12), count = 6 - Math.abs(s - 7);
      return {
        text: `İki zar birlikte atıldığında üst yüzlerin toplamının ${s} olma olasılığı kaçtır? (Kesir olarak yazın, örn. 3/8)`,
        answer: count / 36, answerText: fraction(count, 36), mustSimplify: true,
        steps: [`Toplamı ${s} yapan ${count} durum vardır.`, `P = ${count}/36 = ${fraction(count, 36)}`],
      };
    },
  },
];
