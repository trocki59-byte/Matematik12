import {addSteps, subtractionSteps} from '../steps.js';

// 1–4. sınıf konuları. Soru üreticileri önceki sürümle aynıdır.
export default [
  {
    id: '1-top-20', grade: 1, unit: 'Doğal sayılar', name: "Toplama (20'ye kadar)", symbol: '+',
    summary: 'Sayıları bir araya getirmeyi öğren',
    lesson: {
      intro: 'Toplama, iki grubu birleştirip toplam sayıyı bulmaktır. 20\'ye kadar olan sayılarla kolayca yapabilirsin.',
      sections: [{
        title: 'Toplama nasıl yapılır?',
        paras: ['Elinde 6 kalem, arkadaşında 5 kalem var. Kalemleri bir araya getirirsen toplam 11 kalem olur.'],
        formula: '6 + 5 = 11',
        examples: [{problem: '8 + 6 = ?', steps: ['8\'e 2 ekleyerek 10 yap: 8 + 2 = 10', '6\'nın kalanı 4: 10 + 4 = 14'], answer: '14'}],
        tip: 'Önce 10\'a tamamla, sonra kalanı ekle.',
      }],
    },
    gen(rnd) {
      const a = rnd(0, 19), b = rnd(0, 20 - a);
      return {text: `${a} + ${b} = ?`, answer: a + b, steps: [`${a} ile ${b} toplanır: ${a + b}`]};
    },
  },
  {
    id: '1-cik-20', grade: 1, unit: 'Doğal sayılar', name: "Çıkarma (20'ye kadar)", symbol: '−',
    summary: 'Bir sayıdan ne kadar kaldığını bul',
    lesson: {
      intro: 'Çıkarma, bir sayıdan başka bir sayıyı almak demektir. Geriye ne kaldığını bulursun.',
      sections: [{
        title: 'Çıkarma nasıl yapılır?',
        paras: ['12 elmadan 5 tanesini yersen 7 elma kalır.'],
        formula: '12 − 5 = 7',
        examples: [{problem: '15 − 7 = ?', steps: ['15\'ten önce 5 çıkar: 15 − 5 = 10', 'Kalan 2\'yi çıkar: 10 − 2 = 8'], answer: '8'}],
        tip: 'Büyük adımı önce at, kalanı sonra çıkar.',
      }],
    },
    gen(rnd) {
      const a = rnd(0, 20), b = rnd(0, a);
      return {text: `${a} − ${b} = ?`, answer: a - b, steps: [`${a} sayısından ${b} çıkarılır: ${a - b}`]};
    },
  },
  {
    id: '1-sekil', grade: 1, unit: 'Geometri', name: 'Kenar sayısı', symbol: '△',
    summary: 'Şekillerin kaç kenarı olduğunu say',
    lesson: {
      intro: 'Şekillerin kenarlarını sayarak onları tanıyabilirsin.',
      sections: [{
        title: 'Kenar ve köşe',
        paras: ['Kenar, şeklin dış çizgilerinin her birine denir. Üçgenin 3, dörtgenin 4, beşgenin 5, altıgenin 6 kenarı vardır.'],
        examples: [{problem: 'Altıgenin kaç kenarı vardır?', steps: ['Altıgenin 6 köşesi vardır.', 'Her köşe bir kenarla birleşir: 6 kenar.'], answer: '6'}],
      }],
    },
    gen(rnd) {
      const shapes = [['Üçgen', 3], ['Dörtgen', 4], ['Beşgen', 5], ['Altıgen', 6]];
      const [name, k] = shapes[rnd(0, 3)];
      return {text: `${name} şeklinin kaç kenarı vardır?`, answer: k, steps: [`${name} ${k} kenarlıdır.`]};
    },
  },

  {
    id: '2-top-100', grade: 2, unit: 'Doğal sayılar', name: "Toplama (100'e kadar)", symbol: '+',
    summary: 'Onlar ve birlerle toplamayı öğren',
    lesson: {
      intro: 'Sayıyı onlar ve birlere ayırarak toplarsan işlem çok kolaylaşır.',
      sections: [{
        title: 'Onlar ve birler',
        paras: ['23 sayısı 2 onluk ve 3 birliktir. Onlar kendi aralarında, birler kendi aralarında toplanır.'],
        formula: '23 + 15 = 20 + 10 + 3 + 5 = 38',
        examples: [{problem: '34 + 52 = ?', steps: ['Onlar: 30 + 50 = 80', 'Birler: 4 + 2 = 6', 'Toplam: 80 + 6 = 86'], answer: '86'}],
      }],
    },
    gen(rnd) {
      const a = rnd(10, 89), b = rnd(10, 100 - a);
      return {
        text: `${a} + ${b} = ?`, answer: a + b,
        steps: [`Onlar: ${Math.floor(a / 10) * 10} + ${Math.floor(b / 10) * 10} = ${Math.floor(a / 10) * 10 + Math.floor(b / 10) * 10}`, `Birler: ${a % 10} + ${b % 10} = ${a % 10 + b % 10}`, `Sonuç: ${a + b}`],
      };
    },
  },
  {
    id: '2-cik-100', grade: 2, unit: 'Doğal sayılar', name: "Çıkarma (100'e kadar)", symbol: '−',
    summary: 'Ödünç almayı adım adım anla',
    lesson: {
      intro: 'Çıkarırken birler birlerden, onlar onlardan çıkarılır. Yetmezse bir onluk ödünç alınır.',
      sections: [{
        title: 'Ödünç alma',
        paras: ['Birler yetmediğinde bir onluğu 10 birlik olarak alırsın. Böylece çıkarma yapılabilir hâle gelir.'],
        formula: '42 − 17 = 25',
        examples: [{problem: '53 − 28 = ?', steps: ['Birler: 3 < 8 olduğu için bir onluk ödünç alınır: 13 − 8 = 5', 'Onlar: 4 − 2 = 2', 'Sonuç: 25'], answer: '25'}],
        tip: 'Ödünç aldığında onlar basamağından 1 eksiltmeyi unutma.',
      }],
    },
    gen(rnd) {
      const a = rnd(10, 99), b = rnd(1, a);
      return {text: `${a} − ${b} = ?`, answer: a - b, steps: subtractionSteps(a, b)};
    },
  },
  {
    id: '2-carpma-25', grade: 2, unit: 'Doğal sayılar', name: 'Çarpma (2 ve 5 tablosu)', symbol: '×',
    summary: '2 ve 5\'in katlarını öğren',
    lesson: {
      intro: 'Çarpma, aynı sayıyı tekrar tekrar toplamanın kısa yoludur.',
      sections: [{
        title: 'Çarpma nedir?',
        paras: ['2 × 4, 2 sayısını 4 kez toplamaktır: 2 + 2 + 2 + 2 = 8. 5\'in katları 5, 10, 15, 20 diye gider.'],
        formula: '5 × 3 = 5 + 5 + 5 = 15',
        examples: [{problem: '5 × 6 = ?', steps: ['5\'i 6 kez topla: 5 + 5 + 5 + 5 + 5 + 5', 'Ya da 5\'in 6. katını bul: 30'], answer: '30'}],
      }],
    },
    gen(rnd) {
      const a = rnd(0, 1) ? 5 : 2, b = rnd(2, 10);
      return {
        text: `${a} × ${b} = ?`, answer: a * b,
        steps: [`${a} × ${b}, ${b} sayısının ${a} kez toplamıdır: ${Array(a).fill(b).join(' + ')} = ${a * b}`],
      };
    },
  },
  {
    id: '2-para', grade: 2, unit: 'Para ve zaman', name: 'Para (TL, toplama)', symbol: '₺',
    summary: 'Liraları topla ve hesapla',
    lesson: {
      intro: 'Alışverişte paraları toplamak, en sık kullandığın matematik işlemlerinden biridir.',
      sections: [{
        title: 'Para hesapları',
        paras: ['Tam liraları toplarken yalnızca TL değerlerini toplarsın. Sonucun birimi de TL olur.'],
        examples: [{problem: '35 TL + 48 TL = ?', steps: ['35 + 48 = 83', 'Sonuç: 83 TL'], answer: '83'}],
      }],
    },
    gen(rnd) {
      const a = rnd(1, 100), b = rnd(1, 100);
      return {text: `${a} TL + ${b} TL = ? TL`, answer: a + b, steps: [`${a} + ${b} = ${a + b} TL`]};
    },
  },
  {
    id: '2-saat', grade: 2, unit: 'Para ve zaman', name: "Zaman (saat, 12'lik)", symbol: '◷',
    summary: 'Saate ileri sayarak zamanı hesapla',
    lesson: {
      intro: 'Saat 12\'lik sistemde çalışır. 12\'yi geçince yeniden 1\'den sayarız.',
      sections: [{
        title: 'Saatte ileri sayma',
        paras: ['Önce saat sayısına ekleme yaparsın. 12\'yi geçerse 12 çıkarırsın.'],
        formula: '9 + 6 = 15 → 15 − 12 = 3',
        examples: [{problem: 'Saat 9\'da 6 saat sonra saat kaç olur?', steps: ['9 + 6 = 15', '15 − 12 = 3 → saat 3'], answer: '3'}],
      }],
    },
    gen(rnd) {
      const h = rnd(1, 12), k = rnd(1, 12);
      const ans = ((h + k - 1) % 12) + 1;
      return {text: `Saat ${h}'de ${k} saat sonra saat kaç olur?`, answer: ans, steps: [`${h} + ${k} = ${h + k}`, `12'yi geçerse 12 çıkarılır: ${ans}`]};
    },
  },

  {
    id: '3-top-1000', grade: 3, unit: 'Doğal sayılar', name: 'Toplama (1000\'e kadar, elde ile)', symbol: '+',
    summary: 'Elde kavramıyla üç basamaklı toplama',
    lesson: {
      intro: 'Üç basamaklı sayılarda bir basamaktaki toplam 10 veya daha büyükse "elde" kavramını kullanırsın.',
      sections: [{
        title: 'Elde ile toplama',
        paras: ['Bir basamağın toplamı 10 ya da daha büyükse, 10 birimi bir üst basamağa 1 olarak elde edersin.'],
        examples: [{problem: '168 + 275 = ?', steps: ['Birler: 8 + 5 = 13 → 3 yazılır, 1 elde', 'Onlar: 6 + 7 + 1 = 14 → 4 yazılır, 1 elde', 'Yüzler: 1 + 2 + 1 = 4', 'Sonuç: 443'], answer: '443'}],
      }],
    },
    gen(rnd) {
      const a = rnd(100, 499), b = rnd(100, 499);
      return {text: `${a} + ${b} = ?`, answer: a + b, steps: addSteps(a, b)};
    },
  },
  {
    id: '3-cik-1000', grade: 3, unit: 'Doğal sayılar', name: 'Çıkarma (1000\'e kadar, ödünç ile)', symbol: '−',
    summary: 'Ödünç alarak üç basamaklı çıkarma',
    lesson: {
      intro: 'Üç basamaklı sayılarda çıkarma yaparken gerekirse bir üst basamaktan ödünç alırsın.',
      sections: [{
        title: 'Ödünç alma',
        paras: ['Bir basamaktaki sayı çıkarılacak sayıdan küçükse, bir üst basamaktan 1 ödünç alınır ve 10 olarak eklenir.'],
        examples: [{problem: '500 − 237 = ?', steps: ['Yüzlerden 1 ödünç: yüzler 4, onlar 10', 'Onlardan 1 ödünç: onlar 9, birler 10', 'Birler: 10 − 7 = 3', 'Onlar: 9 − 3 = 6', 'Yüzler: 4 − 2 = 2', 'Sonuç: 263'], answer: '263'}],
      }],
    },
    gen(rnd) {
      const a = rnd(100, 999), b = rnd(10, a - 1);
      return {text: `${a} − ${b} = ?`, answer: a - b, steps: subtractionSteps(a, b)};
    },
  },
  {
    id: '3-carpma-10', grade: 3, unit: 'Doğal sayılar', name: 'Çarpma (2–10 tablosu)', symbol: '×',
    summary: 'Çarpım tablosunu pekiştir',
    lesson: {
      intro: 'Çarpım tablosunu bilmek, çarpma ve bölme işlemlerini çok hızlandırır.',
      sections: [{
        title: 'Çarpma değişmelidir',
        paras: ['Çarpmada sayıların yeri değişse de sonuç aynıdır: 4 × 7 ile 7 × 4 aynı sonucu verir.'],
        formula: '6 × 8 = 48',
        examples: [{problem: '7 × 8 = ?', steps: ['Çarpım tablosundan: 7 × 8 = 56', 'Kontrol: 8 × 7 de 56\'dır.'], answer: '56'}],
      }],
    },
    gen(rnd) {
      const a = rnd(2, 10), b = rnd(2, 10);
      return {text: `${a} × ${b} = ?`, answer: a * b, steps: [`${a} × ${b} = ${a * b}`]};
    },
  },
  {
    id: '3-bolme', grade: 3, unit: 'Doğal sayılar', name: 'Bölme (tam bölme)', symbol: '÷',
    summary: 'Bölmeyi çarpmanın tersi olarak gör',
    lesson: {
      intro: 'Bölme, bir sayıyı eşit parçalara ayırmaktır. Çarpma işleminin tersidir.',
      sections: [{
        title: 'Bölme ve çarpma ilişkisi',
        paras: ['4 × 6 = 24 ise 24 ÷ 4 = 6 ve 24 ÷ 6 = 4 olur.'],
        formula: '24 ÷ 4 = 6',
        examples: [{problem: '36 ÷ 9 = ?', steps: ['9 × ? = 36 sorusunu düşün.', '9 × 4 = 36 olduğu için cevap 4'], answer: '4'}],
      }],
    },
    gen(rnd) {
      const b = rnd(2, 10), q = rnd(2, 10), a = b * q;
      return {text: `${a} ÷ ${b} = ?`, answer: q, steps: [`${b} × ${q} = ${a} olduğu için cevap ${q}`]};
    },
  },

  {
    id: '4-carpma-2x1', grade: 4, unit: 'Doğal sayılar', name: 'Çarpma (iki basamaklı × tek basamaklı)', symbol: '×',
    summary: 'Sayıyı parçalara ayırarak çarp',
    lesson: {
      intro: 'İki basamaklı bir sayıyı tek basamaklı bir sayıyla çarparken sayıyı onlar ve birlere ayırabilirsin.',
      sections: [{
        title: 'Parçalara ayırarak çarpma',
        paras: ['23 × 4 işlemini (20 × 4) + (3 × 4) biçiminde yazabilirsin.'],
        formula: '23 × 4 = 80 + 12 = 92',
        examples: [{problem: '36 × 5 = ?', steps: ['36 = 30 + 6', '30 × 5 = 150', '6 × 5 = 30', '150 + 30 = 180'], answer: '180'}],
      }],
    },
    gen(rnd) {
      const a = rnd(10, 99), b = rnd(2, 9), on = Math.floor(a / 10) * 10, bi = a % 10;
      return {
        text: `${a} × ${b} = ?`, answer: a * b,
        steps: [`${a} = ${on} + ${bi}`, `${on} × ${b} = ${on * b}`, `${bi} × ${b} = ${bi * b}`, `Toplam: ${on * b} + ${bi * b} = ${a * b}`],
      };
    },
  },
  {
    id: '4-bolme-2d', grade: 4, unit: 'Doğal sayılar', name: 'Bölme (iki basamaklı bölünen)', symbol: '÷',
    summary: 'İki basamaklı sayıyı böl',
    lesson: {
      intro: 'İki basamaklı bir sayıyı bölerken bölenin kaç katının bölünene yakın olduğunu düşünürsün.',
      sections: [{
        title: 'Bölmeye giriş',
        paras: ['Bölen sayıyı tekrar tekrar ekleyerek bölünene ulaşmaya çalışırsın. Kalan sıfırsa tam bölme yapılmıştır.'],
        examples: [{problem: '84 ÷ 4 = ?', steps: ['4 × 20 = 80', '84 − 80 = 4', '4 × 1 = 4 → 20 + 1 = 21'], answer: '21'}],
      }],
    },
    gen(rnd) {
      const b = rnd(2, 9), q = rnd(Math.ceil(10 / b), Math.floor(99 / b)), a = b * q;
      return {text: `${a} ÷ ${b} = ?`, answer: q, steps: [`${b} × ${q} = ${a} olduğu için cevap ${q}`]};
    },
  },
];
