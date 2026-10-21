import {fraction, minus, pm} from '../steps.js';

// 7. sınıf: denklemler, yüzde artış-azalış, dağılma, çember, prizma hacmi, olasılık, ortalama.
export default [
  {
    id: '7-denklem', grade: 7, unit: 'Denklemler', name: 'Birinci dereceden denklemler', symbol: '=',
    summary: 'Bilinmeyeni tek başına bırak',
    lesson: {
      intro: 'Denklem, iki tarafı eşit olan bir eşitliktir. Amaç, bilinmeyeni (x) tek başına bırakmaktır.',
      sections: [{
        title: 'Denklem çözme adımları',
        paras: ['Sabit terimi karşı tarafa geçirirken işaretini değiştirirsin. Sonra x\'in katsayısına bölerek x\'i bulursun.', 'Yaptığın işlemi her iki tarafa da uygulamayı unutma.'],
        formula: '2x + 3 = 11 → 2x = 8 → x = 4',
        examples: [{problem: '3x − 5 = 16 denkleminde x kaçtır?', steps: ['−5\'i karşıya at: 3x = 16 + 5 = 21', 'Her iki tarafı 3\'e böl: x = 7'], answer: '7'}],
        tip: 'Cevabını kontrol et: x yerine koyduğunda iki taraf eşit mi?',
      }],
    },
    gen(rnd) {
      const a = rnd(2, 9), x = rnd(-10, 20), b = rnd(-15, 15), c = a * x + b;
      return {
        text: `${a}x ${pm(b)} = ${c}`, answer: x,
        steps: [`Sabit terimi karşıya geçir: ${a}x = ${c} ${b >= 0 ? '−' : '+'} ${Math.abs(b)} = ${c - b}`, `Her iki tarafı ${a}'e böl: x = ${x}`],
      };
    },
  },
  {
    id: '7-yuzde-artis', grade: 7, unit: 'Yüzde ve oran', name: 'Yüzde artış ve azalış', symbol: '%',
    summary: 'Zam ve indirim hesapla',
    lesson: {
      intro: 'Bir miktar yüzde kadar artabilir ya da azalabilir. Bu tür sorular alışverişte çok sık karşımıza çıkar.',
      sections: [{
        title: 'Zam ve indirim',
        paras: ['Zam için miktarın yüzde kadarını bulup miktara eklersin. İndirim için ise yüzde kadarını miktardan çıkarırsın.'],
        formula: '400 TL + %25 = 400 + 100 = 500 TL',
        examples: [{problem: '400 TL\'lik bir ürüne %25 zam yapılırsa yeni fiyat kaç TL olur?', steps: ['%25 zam: 400 × 25 ÷ 100 = 100 TL', '400 + 100 = 500 TL'], answer: '500'}],
      }],
    },
    gen(rnd) {
      const p = rnd(1, 20) * 100, y = [5, 10, 20, 25, 50][rnd(0, 4)], inc = rnd(0, 1) === 1;
      const change = (p * y) / 100, ans = inc ? p + change : p - change;
      return {
        text: inc ? `${p} TL olan bir ürüne %${y} zam yapılıyor. Yeni fiyat kaç TL olur?` : `${p} TL olan bir ürünün fiyatı %${y} indiriliyor. Yeni fiyat kaç TL olur?`,
        answer: ans,
        steps: [`%${y} = ${change} TL`, inc ? `${p} + ${change} = ${ans} TL` : `${p} − ${change} = ${ans} TL`],
      };
    },
  },
  {
    id: '7-cebir-carpim', grade: 7, unit: 'Cebir', name: 'Dağılma özelliği', symbol: '( )',
    summary: 'Parantezi dağıt, katsayıyı bul',
    lesson: {
      intro: 'Bir sayı, parantezin içindeki her terimle tek tek çarpılır. Buna dağılma özelliği denir.',
      sections: [{
        title: 'Dağılma',
        paras: ['a(bx + c) = abx + ac. Parantez içindeki her terim a ile çarpılır.'],
        formula: '3(2x + 5) = 6x + 15',
        examples: [{problem: '4(3x − 2) ifadesinde x\'in katsayısı kaçtır?', steps: ['4 · 3x = 12x', '4 · (−2) = −8', 'Sonuç: 12x − 8; x\'in katsayısı 12'], answer: '12'}],
      }],
    },
    gen(rnd) {
      const a = rnd(2, 9) * (rnd(0, 1) ? 1 : -1), b = rnd(1, 9), c = rnd(-9, 9);
      return {
        text: `${minus(a)}(${b}x ${pm(c)}) ifadesinde x'in katsayısı kaçtır?`, answer: a * b,
        steps: [`${minus(a)} · ${b}x = ${a * b}x`, `${minus(a)} · (${minus(c)}) = ${a * c}`, `Sonuç: ${a * b}x ${pm(a * c)}`, `x'in katsayısı: ${a * b}`],
      };
    },
  },
  {
    id: '7-cember', grade: 7, unit: 'Geometri', name: 'Çemberin çevresi', symbol: 'O',
    summary: 'Yarıçaptan çevre hesapla (π = 3)',
    lesson: {
      intro: 'Çemberin çevresi, çevrenin uzunluğudur. Formülü çap ya da yarıçap ile yazabilirsin.',
      sections: [{
        title: 'Çevre formülü',
        paras: ['Çevre = 2 · π · r. Bu sorularda π yerine 3 alınacaktır.'],
        formula: 'r = 5 için Ç = 2 · 3 · 5 = 30 cm',
        examples: [{problem: 'Yarıçapı 4 cm olan çemberin çevresi kaç cm\'dir? (π = 3)', steps: ['Ç = 2 · π · r', 'Ç = 2 · 3 · 4 = 24 cm'], answer: '24'}],
      }],
    },
    gen(rnd) {
      const r = rnd(1, 20);
      return {text: `Yarıçapı ${r} cm olan çemberin çevresi kaç cm'dir? (π = 3 alınız)`, answer: 6 * r, steps: [`Ç = 2 · π · r = 2 · 3 · ${r} = ${6 * r} cm`]};
    },
  },
  {
    id: '7-hacim', grade: 7, unit: 'Geometri', name: 'Prizmanın hacmi', symbol: '▣',
    summary: 'Taban alanı ve yükseklikle hacim',
    lesson: {
      intro: 'Hacim, bir cismin kapladığı yere denir. Birimi cm³ gibi küp birimdir.',
      sections: [{
        title: 'Dik prizmanın hacmi',
        paras: ['Dik prizmanın hacmi, taban alanı ile yüksekliğin çarpımıdır.'],
        formula: 'V = Taban alanı × yükseklik',
        examples: [{problem: 'Taban alanı 12 cm², yüksekliği 5 cm olan prizmanın hacmi kaç cm³tür?', steps: ['V = 12 × 5 = 60 cm³'], answer: '60'}],
      }],
    },
    gen(rnd) {
      const A = rnd(4, 60), h = rnd(2, 15);
      return {text: `Taban alanı ${A} cm², yüksekliği ${h} cm olan prizmanın hacmi kaç cm³tür?`, answer: A * h, steps: [`V = ${A} × ${h} = ${A * h} cm³`]};
    },
  },
  {
    id: '7-olasilik', grade: 7, unit: 'Olasılık ve veri', name: 'Basit olay olasılığı', symbol: 'P',
    summary: 'İstenen durumun tüm durumlara oranı',
    lesson: {
      intro: 'Olasılık, istenen durumların sayısının tüm durumların sayısına oranıdır. Değeri 0 ile 1 arasındadır.',
      sections: [{
        title: 'Olasılık nasıl hesaplanır?',
        paras: ['P(istenen durum) = istenen durumların sayısı ÷ tüm durumların sayısı.'],
        formula: 'P(kırmızı) = kırmızı sayısı / toplam sayı',
        examples: [{problem: 'Torbada 3 kırmızı, 5 mavi bilye var. Rastgele çekilen bilyenin kırmızı olma olasılığı?', steps: ['Toplam bilye: 3 + 5 = 8', 'Kırmızı bilye: 3', 'P = 3/8'], answer: '3/8'}],
      }],
    },
    gen(rnd) {
      const r = rnd(1, 9), b = rnd(1, 9), total = r + b;
      return {
        text: `Bir torbada ${r} kırmızı ve ${b} mavi bilye var. Rastgele bir bilye çekildiğinde kırmızı olma olasılığı kaçtır? (Kesir olarak yazın, örn. 3/8)`,
        answer: r / total, answerText: fraction(r, total), mustSimplify: true,
        steps: [`Toplam: ${r} + ${b} = ${total}`, `Kırmızı: ${r}`, `Olasılık: ${fraction(r, total)}`],
      };
    },
  },
  {
    id: '7-ortalama', grade: 7, unit: 'Olasılık ve veri', name: 'Aritmetik ortalama', symbol: 'μ',
    summary: 'Verilerin ortalamasını hesapla',
    lesson: {
      intro: 'Aritmetik ortalama, verilerin toplamının veri sayısına bölünmesiyle bulunur.',
      sections: [{
        title: 'Ortalama formülü',
        paras: ['Aritmetik ortalama = tüm verilerin toplamı ÷ veri sayısı.'],
        formula: '(4 + 6 + 8) ÷ 3 = 6',
        examples: [{problem: 'Verilen sayılar: 10, 14, 6. Aritmetik ortalama kaçtır?', steps: ['Toplam: 10 + 14 + 6 = 30', '30 ÷ 3 = 10'], answer: '10'}],
      }],
    },
    gen(rnd) {
      // Beş sayının ortalaması tam sayı olacak şekilde veri üretir.
      let m, four, x;
      for (let tries = 0; ; tries++) {
        m = rnd(5, 25);
        four = tries < 50 ? [rnd(1, 30), rnd(1, 30), rnd(1, 30), rnd(1, 30)] : [m, m, m, m];
        x = 5 * m - four.reduce((t, v) => t + v, 0);
        if (x >= 1 && x <= 40) break;
      }
      const nums = [...four, x];
      return {text: `Verilen sayılar: ${nums.join(', ')}. Bu sayıların aritmetik ortalaması kaçtır?`, answer: m, steps: [`Toplam: ${5 * m}`, `${5 * m} ÷ 5 = ${m}`]};
    },
  },
];
