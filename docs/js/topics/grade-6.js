import {fraction, minus, reduce, tr1} from '../steps.js';

// 6. sınıf: tam sayılar, kesir ve ondalık işlemleri, oran-orantı, yüzde, cebir, çokgenler.
const s = n => (n < 0 ? `−${-n}` : `+${n}`);

export default [
  {
    id: '6-tamsayi', grade: 6, unit: 'Tam sayılar', name: 'Tam sayılarla toplama ve çıkarma', symbol: '±',
    summary: 'Negatif sayılarla işlem yapmayı öğren',
    lesson: {
      intro: 'Sayı doğrusunda sıfırın solundaki sayılar negatif, sağındakiler pozitiftir.',
      sections: [{
        title: 'İşaretli sayılarla toplama',
        paras: ['Aynı işaretli iki sayıda mutlak değerler toplanır, işaret korunur. Farklı işaretlilerde mutlak değerler çıkarılır ve büyük mutlak değerli sayının işareti alınır.', 'Çıkarma, toplamanın tersidir: a − b = a + (−b).'],
        formula: '(−8) + 5 = −3',
        examples: [{problem: '(−8) + 5 = ?', steps: ['İşaretler farklı: |−8| − |5| = 3', 'Mutlak değeri büyük olan −8 olduğu için sonuç negatif', 'Sonuç: −3'], answer: '-3'}],
        tip: '4 − (−3) = 4 + 3 = 7: iki eksi işareti artıya döner.',
      }],
    },
    gen(rnd) {
      const a = rnd(-20, 20), b = rnd(-20, 20), op = rnd(0, 1) ? '+' : '−';
      const ans = op === '+' ? a + b : a - b;
      let steps;
      if (op === '−') {
        steps = [`Çıkarmanın tersi toplamadır: (${s(a)}) − (${s(b)}) = (${s(a)}) + (${s(-b)})`, `Sonuç: ${ans}`];
      } else if (a * b >= 0) {
        steps = ['Aynı işaretliler: mutlak değerler toplanır, işaret korunur.', `|${a}| + |${b}| = ${Math.abs(a) + Math.abs(b)}`, `Sonuç: ${ans}`];
      } else {
        const big = Math.abs(a) >= Math.abs(b) ? a : b;
        steps = ['Farklı işaretliler: mutlak değerler çıkarılır.', `${Math.max(Math.abs(a), Math.abs(b))} − ${Math.min(Math.abs(a), Math.abs(b))} = ${Math.abs(Math.abs(a) - Math.abs(b))}`, `Büyük mutlak değerin işareti: ${big < 0 ? 'eksi' : 'artı'}`, `Sonuç: ${ans}`];
      }
      return {text: `(${s(a)}) ${op} (${s(b)}) = ?`, answer: ans, answerText: minus(ans), steps};
    },
  },
  {
    id: '6-kesir-carpma-bolme', grade: 6, unit: 'Kesirler', name: 'Kesirlerle çarpma ve bölme', symbol: '⅔',
    summary: 'Pay ile pay, payda ile payda çarp',
    lesson: {
      intro: 'Kesirleri çarpmak, pay ile pay ve payda ile payda çarpmaktır. Bölmek için ikinci kesri ters çevirip çarparsın.',
      sections: [{
        title: 'Çarpma ve bölme kuralları',
        paras: ['a/b × c/d = (a × c)/(b × d). Bölmede ise a/b ÷ c/d = a/b × d/c olur.'],
        formula: '2/3 ÷ 4/5 = 2/3 × 5/4 = 10/12 = 5/6',
        examples: [{problem: '3/4 × 2/9 = ?', steps: ['Pay: 3 × 2 = 6; payda: 4 × 9 = 36', '6/36 sadeleştirilir: 1/6'], answer: '1/6'}],
      }],
    },
    gen(rnd) {
      const a = rnd(1, 9), b = rnd(2, 12), c = rnd(1, 9), d = rnd(2, 12);
      const mul = rnd(0, 1) === 1;
      if (mul) {
        const [n, dn] = reduce(a * c, b * d);
        return {
          text: `${a}/${b} × ${c}/${d} = ?`, answer: n / dn, answerText: fraction(n, dn), mustSimplify: true,
          steps: [`Pay: ${a} × ${c} = ${a * c}`, `Payda: ${b} × ${d} = ${b * d}`, `Sonuç: ${a * c}/${b * d} = ${fraction(a * c, b * d)}`],
        };
      }
      const [n, dn] = reduce(a * d, b * c);
      return {
        text: `${a}/${b} ÷ ${c}/${d} = ?`, answer: n / dn, answerText: fraction(n, dn), mustSimplify: true,
        steps: [`Ters çevir: ${a}/${b} × ${d}/${c}`, `Pay: ${a} × ${d} = ${a * d}`, `Payda: ${b} × ${c} = ${b * c}`, `Sonuç: ${a * d}/${b * c} = ${fraction(a * d, b * c)}`],
      };
    },
  },
  {
    id: '6-ondalik-carpma', grade: 6, unit: 'Ondalık gösterim', name: 'Ondalık sayılarla çarpma', symbol: '×',
    summary: 'Virgülü yok sayıp sonra yerleştir',
    lesson: {
      intro: 'Ondalık sayıları çarparken önce virgülleri yok sayarsın, sonra virgülü doğru yere koyarsın.',
      sections: [{
        title: 'Virgül nereye konur?',
        paras: ['Çarpılan iki sayıda virgülden sonra toplam kaç basamak varsa, çarpımda da sağdan o kadar basamak sayarak virgül koyarsın.'],
        examples: [{problem: '3,5 × 0,4 = ?', steps: ['35 × 4 = 140', 'Virgülden sonra toplam 1 + 1 = 2 basamak', '1,40 = 1,4'], answer: '1,4'}],
      }],
    },
    gen(rnd) {
      const x = rnd(11, 99), m = rnd(2, 9);
      return {
        text: `${tr1(x)} × ${m} = ?`, answer: (x * m) / 10, answerText: tr1(x * m),
        steps: [`${x} × ${m} = ${x * m}`, `Virgülden sonra 1 basamak var; sonuçta da 1 basamak olur: ${tr1(x * m)}`],
      };
    },
  },
  {
    id: '6-oran', grade: 6, unit: 'Oran ve orantı', name: 'Oran ve orantı', symbol: ':',
    summary: 'Eşit oranlarda eksik sayıyı bul',
    lesson: {
      intro: 'Oran, iki sayının bölümüdür. İki oran eşitse bu bir orantıdır.',
      sections: [{
        title: 'Çapraz çarpım',
        paras: ['a : b = c : d orantısında çapraz çarpımlar eşittir: a × d = b × c.'],
        formula: '4 : 5 = 12 : x → 4x = 60 → x = 15',
        examples: [{problem: '4 : 5 = 12 : x. x kaçtır?', steps: ['Çapraz çarp: 4 × x = 5 × 12', '4x = 60', 'x = 15'], answer: '15'}],
      }],
    },
    gen(rnd) {
      const a = rnd(2, 9), b = rnd(2, 9), m = rnd(2, 9);
      return {text: `${a} : ${b} = ${a * m} : x`, answer: b * m, steps: [`Çapraz çarp: ${a} × x = ${b} × ${a * m}`, `${a}x = ${b * a * m}`, `x = ${b * a * m} ÷ ${a} = ${b * m}`]};
    },
  },
  {
    id: '6-yuzde', grade: 6, unit: 'Oran ve orantı', name: 'Yüzde hesabı', symbol: '%',
    summary: 'Bir sayının yüzde kaçını bul',
    lesson: {
      intro: 'Yüzde, 100 üzerinden verilen orandır. %25, 25/100 demektir ve 1/4 ile aynıdır.',
      sections: [{
        title: 'Yüzde nasıl hesaplanır?',
        paras: ['Bir sayının yüzde y\'sini bulmak için sayıyı y ile çarpıp 100\'e bölersin.'],
        formula: '%20 × 150 = 150 × 20 ÷ 100 = 30',
        examples: [{problem: '240 sayısının %15\'i kaçtır?', steps: ['%15 = 15/100', '240 × 15 = 3600', '3600 ÷ 100 = 36'], answer: '36'}],
      }],
    },
    gen(rnd) {
      const p = rnd(1, 20) * 20, y = [5, 10, 15, 20, 25, 30, 40, 50, 75][rnd(0, 8)];
      return {
        text: `${p} sayısının %${y}'i kaçtır?`, answer: (p * y) / 100,
        steps: [`%${y} = ${y}/100`, `${p} × ${y} = ${p * y}`, `${p * y} ÷ 100 = ${(p * y) / 100}`],
      };
    },
  },
  {
    id: '6-cebir-deger', grade: 6, unit: 'Cebir', name: 'Cebirsel ifadenin değeri', symbol: 'x',
    summary: 'Harfin yerine sayı koyup hesapla',
    lesson: {
      intro: 'Harf, bilinmeyen bir sayıyı temsil eder. "2x" yazımı "2 × x" anlamına gelir.',
      sections: [{
        title: 'Değer bulma',
        paras: ['Bir ifadenin değerini bulmak için harfin yerine verilen sayıyı yazar, sonra işlemleri yaparsın.'],
        formula: 'x = 3 için 2x + 5 = 2 · 3 + 5 = 11',
        examples: [{problem: 'x = 4 için 3x − 7 ifadesinin değeri kaçtır?', steps: ['3 · 4 = 12', '12 − 7 = 5'], answer: '5'}],
      }],
    },
    gen(rnd) {
      const x = rnd(-5, 9), a = rnd(2, 9), b = rnd(-10, 10);
      const val = a * x + b;
      return {
        text: `x = ${minus(x)} için ${a}x ${b < 0 ? `− ${-b}` : `+ ${b}`} ifadesinin değeri kaçtır?`, answer: val,
        steps: [`${a} · (${minus(x)}) = ${a * x}`, `${a * x} ${b < 0 ? `− ${-b}` : `+ ${b}`} = ${val}`],
      };
    },
  },
  {
    id: '6-cokgen-aci', grade: 6, unit: 'Geometri', name: 'Çokgenlerin iç açılar toplamı', symbol: '∠',
    summary: 'Kenar sayısına göre iç açıları hesapla',
    lesson: {
      intro: 'Bir çokgen köşegenlerle üçgenlere ayrılabilir. Üçgenin iç açıları toplamı 180° olduğundan çokgenin de toplamı kolayca bulunur.',
      sections: [{
        title: 'Formül',
        paras: ['n kenarlı bir çokgen (n − 2) üçgene ayrılır. Bu nedenle iç açılar toplamı (n − 2) × 180° olur.'],
        formula: '(n − 2) × 180°',
        examples: [{problem: 'Altıgenin iç açılar toplamı kaç derecedir?', steps: ['Altıgen için n = 6', '(6 − 2) × 180 = 4 × 180 = 720°'], answer: '720'}],
      }],
    },
    gen(rnd) {
      const n = rnd(3, 10);
      return {text: `${n} kenarlı bir çokgenin iç açılar toplamı kaç derecedir?`, answer: (n - 2) * 180, steps: [`(${n} − 2) × 180° = ${n - 2} × 180° = ${(n - 2) * 180}°`]};
    },
  },
];
