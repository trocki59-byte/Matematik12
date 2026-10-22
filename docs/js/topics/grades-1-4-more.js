// 1–4. sınıf: grades-1-4.js dosyasındaki konulara ek olarak kalan matematik konuları.
// Her konu: konu anlatımı (lesson) ve soru üreticisi (gen). Cevaplar sayısal olmalıdır (seçenekler sayılardan üretilir).
const fmt = n => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

export default [
  // ---------- 1. sınıf ----------
  {
    id: '1-say-100', grade: 1, unit: 'Doğal sayılar', name: "Onluk ve birlik (100'e kadar)", symbol: '10',
    summary: 'Sayıları on luk ve birlik olarak ayır',
    lesson: {
      intro: "100'e kadar olan sayılarda her 10 birlik bir onluk yapar.",
      sections: [{
        title: 'Onluk ve birlik',
        paras: ['47 sayısında 4 onluk ve 7 birlik vardır. 10 tane birlik bir araya gelince 1 onluk olur.'],
        formula: '47 = 4 · 10 + 7',
        examples: [{problem: '63 sayısında kaç onluk vardır?', steps: ['63 = 6 onluk + 3 birlik'], answer: '6'}],
        tip: 'Sayının ilk rakamı onluk, son rakamı birlik sayısıdır.',
      }],
    },
    gen(rnd) {
      const n = rnd(10, 99), tens = Math.floor(n / 10);
      return {text: `${n} sayısında kaç onluk vardır?`, answer: tens, steps: [`${n} = ${tens} onluk + ${n % 10} birlik`]};
    },
  },
  {
    id: '1-karsilastir', grade: 1, unit: 'Doğal sayılar', name: "Sayıları karşılaştırma (20'ye kadar)", symbol: '<',
    summary: 'Hangi sayının daha büyük olduğunu bul',
    lesson: {
      intro: 'İki sayıdan hangisinin daha büyük olduğunu bulmak için sayı doğrusunda sağda olana bakarız.',
      sections: [{
        title: 'Büyük, küçük',
        paras: ['13 ve 17 sayılarından 17 daha büyüktür, çünkü sayı doğrusunda daha sağdadır.'],
        formula: '13 < 17',
        examples: [{problem: 'Hangisi daha büyüktür: 9 mu, 14 mü?', steps: ['14, 9\'dan büyüktür'], answer: '14'}],
        tip: 'Onluğu fazla olan sayı daha büyüktür.',
      }],
    },
    gen(rnd) {
      const a = rnd(1, 20); let b = rnd(1, 20); if (b === a) b = a === 20 ? 19 : a + 1;
      return {text: `${a} ve ${b} sayılarından hangisi daha büyüktür?`, answer: Math.max(a, b), steps: [`${Math.max(a, b)} > ${Math.min(a, b)}`]};
    },
  },
  {
    id: '1-uzunluk', grade: 1, unit: 'Ölçme', name: 'Uzunluk farkı (santimetre)', symbol: 'cm',
    summary: 'İki uzunluk arasındaki farkı bul',
    lesson: {
      intro: 'Santimetre (cm) uzunluk ölçmek için kullanılır. İki uzunluk arasındaki farkı çıkarma ile buluruz.',
      sections: [{
        title: 'Uzunlukları karşılaştırma',
        paras: ['Kalemin boyu 12 cm, cetvelin boyu 30 cm ise cetvel kalemden 30 − 12 = 18 cm daha uzundur.'],
        formula: '30 − 12 = 18 cm',
        examples: [{problem: 'Bir kurdele 25 cm, diğeri 9 cm ise fark kaç cm?', steps: ['25 − 9 = 16'], answer: '16 cm'}],
        tip: 'Farkı bulmak için büyük uzunluktan küçüğü çıkar.',
      }],
    },
    gen(rnd) {
      const a = rnd(10, 40), b = rnd(3, a - 1);
      return {text: `Bir çubuk ${a} cm, diğeri ${b} cm'dir. İkisi arasındaki fark kaç cm'dir?`, answer: a - b, steps: [`${a} − ${b} = ${a - b} cm`]};
    },
  },
  {
    id: '1-gunler', grade: 1, unit: 'Ölçme', name: 'Hafta ve gün', symbol: '📅',
    summary: 'Hafta ve günleri birbirine çevir',
    lesson: {
      intro: 'Bir hafta 7 gündür. Birkaç haftanın toplam gün sayısını bulmak için haftayı 7 ile çarparız.',
      sections: [{
        title: 'Hafta ve gün',
        paras: ['1 hafta = 7 gün. 3 hafta = 3 · 7 = 21 gün.'],
        formula: '1 hafta = 7 gün',
        examples: [{problem: '4 hafta kaç gündür?', steps: ['4 · 7 = 28'], answer: '28'}],
        tip: 'Haftayı gün sayısına çevirmek için 7 ile çarp.',
      }],
    },
    gen(rnd) {
      const w = rnd(2, 6);
      return {text: `${w} hafta kaç gündür?`, answer: w * 7, steps: [`${w} · 7 = ${w * 7} gün`]};
    },
  },
  {
    id: '1-ornek', grade: 1, unit: 'Doğal sayılar', name: 'Sayı örüntüleri (2\'şer, 5\'er)', symbol: '…',
    summary: 'Sayıların hangi kurala göre arttığını bul',
    lesson: {
      intro: 'Sayı örüntüsünde sayılar hep aynı kurala göre artar ya da azalır.',
      sections: [{
        title: 'Örüntü',
        paras: ['2, 4, 6, 8, … örüntüsünde her sayı bir öncekine 2 eklenerek bulunur.'],
        formula: '2, 4, 6, 8, 10',
        examples: [{problem: '5, 10, 15, ___ boşluğuna gelen sayı?', steps: ['Kural: 5\'er artış', '15 + 5 = 20'], answer: '20'}],
        tip: 'Önce iki komşu sayı arasındaki farkı bul.',
      }],
    },
    gen(rnd) {
      const step = rnd(0, 1) ? 2 : 5, start = rnd(0, 4) * step, k = rnd(3, 5);
      const seq = Array.from({length: 4}, (_, i) => start + step * (i + 1));
      const next = start + step * (k + 1);
      return {text: `${seq.slice(0, 3).join(', ')}, ___ boşluğuna gelen sayı kaçtır?`, answer: seq[3], steps: [`Kural: ${step}'er artış`, `${seq[2]} + ${step} = ${seq[3]}`]};
    },
  },

  // ---------- 2. sınıf ----------
  {
    id: '2-basamak-1000', grade: 2, unit: 'Doğal sayılar', name: "Basamak değeri (1000'e kadar)", symbol: '#',
    summary: 'Üç basamaklı sayılarda rakamların değerini bul',
    lesson: {
      intro: 'Üç basamaklı sayılarda her rakamın bir basamak değeri vardır: yüzler, onlar, birler.',
      sections: [{
        title: 'Basamaklar',
        paras: ['345 sayısında 3 yüzler, 4 onlar, 5 birler basamağındadır. Değeri 300, 40, 5\'tir.'],
        formula: '345 = 300 + 40 + 5',
        examples: [{problem: '762 sayısının onlar basamağındaki rakam?', steps: ['7 yüzler, 6 onlar, 2 birler'], answer: '6'}],
        tip: 'Sayıyı yüzler, onlar, birler diye üç parçaya ayır.',
      }],
    },
    gen(rnd) {
      const n = rnd(100, 999), tens = Math.floor(n / 10) % 10;
      return {text: `${n} sayısının onlar basamağındaki rakam kaçtır?`, answer: tens, steps: [`${n} = ${Math.floor(n / 100) * 100} + ${tens * 10} + ${n % 10}`]};
    },
  },
  {
    id: '2-metre', grade: 2, unit: 'Ölçme', name: 'Metre ve santimetre', symbol: 'm',
    summary: '1 metrenin 100 santimetre olduğunu öğren',
    lesson: {
      intro: '1 metre (m) = 100 santimetre (cm). Metreyi santimetreye çevirmek için 100 ile çarparız.',
      sections: [{
        title: 'Birim çevirme',
        paras: ['3 m = 300 cm. 250 cm ise 2 m 50 cm eder.'],
        formula: '1 m = 100 cm',
        examples: [{problem: '4 m kaç cm eder?', steps: ['4 · 100 = 400'], answer: '400'}],
        tip: 'Metreyi santimetreye çevirirken sayının yanına iki sıfır ekle.',
      }],
    },
    gen(rnd) {
      const m = rnd(2, 9);
      return {text: `${m} m kaç cm eder?`, answer: m * 100, steps: [`${m} · 100 = ${m * 100} cm`]};
    },
  },
  {
    id: '2-kutle', grade: 2, unit: 'Ölçme', name: 'Kilogram ve gram', symbol: 'kg',
    summary: '1 kilogramın 1000 gram olduğunu öğren',
    lesson: {
      intro: '1 kilogram (kg) = 1000 gram (g). Kütleleri toplarken ya da çevirirken bu bilgiyi kullanırız.',
      sections: [{
        title: 'Kütle birimleri',
        paras: ['2 kg 500 g = 2500 g. Bir paket un 1 kg ise yarım paket 500 g\'dır.'],
        formula: '1 kg = 1000 g',
        examples: [{problem: '3 kg kaç gram eder?', steps: ['3 · 1000 = 3000'], answer: '3000'}],
        tip: 'Kilogramı grama çevirmek için 1000 ile çarp.',
      }],
    },
    gen(rnd) {
      const k = rnd(1, 5), g = rnd(1, 9) * 100;
      return {text: `${k} kg ${g} g kaç gramdır?`, answer: k * 1000 + g, steps: [`${k} · 1000 + ${g} = ${k * 1000 + g} g`]};
    },
  },
  {
    id: '2-cevre', grade: 2, unit: 'Geometri', name: 'Çevre (kenarların toplamı)', symbol: '⬚',
    summary: 'Bir şeklin etrafının uzunluğunu bul',
    lesson: {
      intro: 'Bir şeklin çevresi, kenarlarının toplamıdır.',
      sections: [{
        title: 'Çevre',
        paras: ['Kenarları 4 cm, 4 cm, 4 cm ve 4 cm olan karenin çevresi 4 + 4 + 4 + 4 = 16 cm\'dir.'],
        formula: 'Çevre = kenarların toplamı',
        examples: [{problem: 'Kenarları 3, 5, 3, 5 cm olan dikdörtgenin çevresi?', steps: ['3 + 5 + 3 + 5 = 16'], answer: '16'}],
        tip: 'Her kenarı bir kez topla.',
      }],
    },
    gen(rnd) {
      const a = rnd(2, 9), b = rnd(2, 9);
      return {text: `Kenarları ${a} cm ve ${b} cm olan dikdörtgenin çevresi kaç cm'dir?`, answer: 2 * (a + b), steps: [`2 · (${a} + ${b}) = ${2 * (a + b)} cm`]};
    },
  },

  // ---------- 3. sınıf ----------
  {
    id: '3-basamak-10000', grade: 3, unit: 'Doğal sayılar', name: "Basamak değeri (10 000'e kadar)", symbol: '#',
    summary: 'Dört basamaklı sayılarda rakamların değerini bul',
    lesson: {
      intro: 'Dört basamaklı sayılarda binler, yüzler, onlar ve birler basamakları vardır.',
      sections: [{
        title: 'Basamak değeri',
        paras: ['4 285 sayısında 4 binler, 2 yüzler, 8 onlar, 5 birler basamağındadır.'],
        formula: '4 285 = 4000 + 200 + 80 + 5',
        examples: [{problem: '6 390 sayısının yüzler basamağındaki rakam?', steps: ['6 binler, 3 yüzler, 9 onlar, 0 birler'], answer: '3'}],
        tip: 'Basamakları soldan sağa tek tek say.',
      }],
    },
    gen(rnd) {
      const n = rnd(1000, 9999), h = Math.floor(n / 100) % 10;
      return {text: `${fmt(n)} sayısının yüzler basamağındaki rakam kaçtır?`, answer: h, steps: [`${fmt(n)} = ${Math.floor(n / 1000) * 1000} + ${h * 100} + ${Math.floor(n / 10) % 10 * 10} + ${n % 10}`]};
    },
  },
  {
    id: '3-kesir', grade: 3, unit: 'Kesirler', name: 'Bütün ve parça (kesir)', symbol: '½',
    summary: 'Bir bütünün parçasını kesir olarak yaz',
    lesson: {
      intro: 'Bir bütün eşit parçalara bölündüğünde her parça bir kesirdir. Pay alınan parça, payda eşit parça sayısıdır.',
      sections: [{
        title: 'Kesir',
        paras: ['Bir pizza 8 eşit dilime bölündü ve 3 dilim alındı. Alınan kısım 3/8\'dir.'],
        formula: 'Kesir = alınan parça / eşit parça sayısı',
        examples: [{problem: 'Bir çikolata 4 eşit parçaya bölündü, 1 parça alındı. Kesir?', steps: ['1 parça / 4 parça'], answer: '1/4'}],
        tip: 'Paydadaki sayı bütünün kaç parçaya bölündüğünü gösterir.',
      }],
    },
    gen(rnd) {
      const d = rnd(3, 10), p = rnd(1, d - 1);
      return {text: `Bir bütün ${d} eşit parçaya bölünüyor. ${p} parça alınırsa kesrin payı (üstteki sayı) kaçtır?`, answer: p, steps: [`Alınan: ${p} parça, toplam: ${d} parça`, `Kesir: ${p}/${d}, pay: ${p}`]};
    },
  },
  {
    id: '3-dakika', grade: 3, unit: 'Ölçme', name: 'Saat ve dakika', symbol: '⏱',
    summary: 'Saatleri dakikaya çevir',
    lesson: {
      intro: '1 saat = 60 dakika. Saatleri dakikaya çevirmek için 60 ile çarparız; kalan dakikaları ekleriz.',
      sections: [{
        title: 'Zaman birimleri',
        paras: ['2 saat 15 dakika = 2 · 60 + 15 = 135 dakika.'],
        formula: '1 saat = 60 dakika',
        examples: [{problem: '3 saat 10 dakika kaç dakikadır?', steps: ['3 · 60 + 10 = 190'], answer: '190'}],
        tip: 'Saatleri önce 60 ile çarp, sonra dakikaları ekle.',
      }],
    },
    gen(rnd) {
      const h = rnd(1, 5), m = rnd(5, 55);
      return {text: `${h} saat ${m} dakika kaç dakikadır?`, answer: h * 60 + m, steps: [`${h} · 60 + ${m} = ${h * 60 + m} dakika`]};
    },
  },
  {
    id: '3-litre', grade: 3, unit: 'Ölçme', name: 'Litre ve mililitre', symbol: 'L',
    summary: '1 litrenin 1000 mililitre olduğunu öğren',
    lesson: {
      intro: '1 litre (L) = 1000 mililitre (mL). Sıvı miktarlarını bu birimlerle ölçeriz.',
      sections: [{
        title: 'Sıvı ölçüsü',
        paras: ['2 L 250 mL = 2250 mL.'],
        formula: '1 L = 1000 mL',
        examples: [{problem: '5 L kaç mL eder?', steps: ['5 · 1000 = 5000'], answer: '5000'}],
        tip: 'Litreyi mililitreye çevirmek için 1000 ile çarp.',
      }],
    },
    gen(rnd) {
      const l = rnd(1, 6), ml = rnd(1, 9) * 50;
      return {text: `${l} L ${ml} mL kaç mL eder?`, answer: l * 1000 + ml, steps: [`${l} · 1000 + ${ml} = ${l * 1000 + ml} mL`]};
    },
  },
  {
    id: '3-cevre-dikdortgen', grade: 3, unit: 'Geometri', name: 'Dikdörtgen ve karenin çevresi', symbol: '▭',
    summary: 'Dikdörtgen ve karenin çevresini hesapla',
    lesson: {
      intro: 'Dikdörtgenin çevresi iki uzun ve iki kısa kenarın toplamıdır. Karenin çevresi bir kenarın 4 katıdır.',
      sections: [{
        title: 'Çevre formülleri',
        paras: ['Kenarları 5 cm ve 3 cm olan dikdörtgenin çevresi 2 · (5 + 3) = 16 cm. Kenarı 4 cm olan karenin çevresi 4 · 4 = 16 cm.'],
        formula: 'Dikdörtgen: 2 · (a + b), Kare: 4 · a',
        examples: [{problem: 'Kenarı 6 cm olan karenin çevresi?', steps: ['4 · 6 = 24'], answer: '24'}],
        tip: 'Kare için tüm kenarlar eşit olduğundan 4 ile çarpmak yeterlidir.',
      }],
    },
    gen(rnd) {
      if (rnd(0, 1)) {
        const a = rnd(2, 12);
        return {text: `Bir karenin bir kenarı ${a} cm'dir. Çevresi kaç cm'dir?`, answer: 4 * a, steps: [`4 · ${a} = ${4 * a} cm`]};
      }
      const a = rnd(2, 12), b = rnd(2, 12);
      return {text: `Kenarları ${a} cm ve ${b} cm olan dikdörtgenin çevresi kaç cm'dir?`, answer: 2 * (a + b), steps: [`2 · (${a} + ${b}) = ${2 * (a + b)} cm`]};
    },
  },
  {
    id: '3-veri', grade: 3, unit: 'Veri', name: 'Tablo okuma', symbol: '▦',
    summary: 'Bir tablodaki bilgilere göre toplam ve fark bul',
    lesson: {
      intro: 'Tablolar bilgileri düzenli gösterir. Tabloyu okuyarak toplam ve fark bulabiliriz.',
      sections: [{
        title: 'Tablo',
        paras: ['Bir sınıfta 8 kız ve 7 erkek öğrenci varsa toplam öğrenci sayısı 8 + 7 = 15\'tir.'],
        formula: 'Toplam = her sütunun toplamı',
        examples: [{problem: 'Bir tabloda kırmızı 9, mavi 4 top varsa fark kaçtır?', steps: ['9 − 4 = 5'], answer: '5'}],
        tip: 'Tablodaki her değeri tek tek oku, sonra işlemi yap.',
      }],
    },
    gen(rnd) {
      const a = rnd(3, 15), b = rnd(3, 15);
      return {text: `Bir sınıfta ${a} kız ve ${b} erkek öğrenci vardır. Toplam öğrenci sayısı kaçtır?`, answer: a + b, steps: [`${a} + ${b} = ${a + b}`]};
    },
  },

  // ---------- 4. sınıf ----------
  {
    id: '4-buyuk-sayi', grade: 4, unit: 'Doğal sayılar', name: "Büyük sayılar (100 000'e kadar)", symbol: '#',
    summary: 'Beş basamaklı sayılarda basamak değerlerini bul',
    lesson: {
      intro: 'Beş basamaklı sayılarda on binler, binler, yüzler, onlar ve birler basamakları vardır.',
      sections: [{
        title: 'Basamaklar',
        paras: ['54 320 sayısı 50 000 + 4000 + 300 + 20 olarak yazılır. Binler basamağındaki rakam 4\'tür.'],
        formula: '54 320 = 50 000 + 4000 + 300 + 20',
        examples: [{problem: '70 415 sayısının binler basamağındaki rakam?', steps: ['70 415: 0 binler'], answer: '0'}],
        tip: 'Sayıyı binlik gruplar halinde okumak yardımcı olur.',
      }],
    },
    gen(rnd) {
      const n = rnd(10000, 99999), th = Math.floor(n / 1000) % 10;
      return {text: `${fmt(n)} sayısının binler basamağındaki rakam kaçtır?`, answer: th, steps: [`Binler basamağı: ${th}`]};
    },
  },
  {
    id: '4-denk-kesir', grade: 4, unit: 'Kesirler', name: 'Denk kesirler', symbol: '≡',
    summary: 'Aynı değerdeki kesirleri bul',
    lesson: {
      intro: 'Pay ve paydayı aynı sayıyla çarparsak değeri değişmeyen denk kesirler elde ederiz.',
      sections: [{
        title: 'Denk kesir',
        paras: ['1/2 = 2/4 = 3/6. Her kesirde pay ve payda 2, 3 gibi aynı sayıyla çarpılmıştır.'],
        formula: 'a/b = (a·k)/(b·k)',
        examples: [{problem: '1/3 = ?/9', steps: ['3 · 3 = 9', 'Pay: 1 · 3 = 3'], answer: '3'}],
        tip: 'Paydayı kaça çarptıysan payı da o sayıyla çarp.',
      }],
    },
    gen(rnd) {
      const a = rnd(1, 4), b = rnd(a + 1, 8), k = rnd(2, 4);
      return {text: `${a}/${b} = ?/${b * k} eşitliğinde soru işaretinin yerine hangi sayı gelmelidir?`, answer: a * k, steps: [`Payda ${b} · ${k} = ${b * k}`, `Pay: ${a} · ${k} = ${a * k}`]};
    },
  },
  {
    id: '4-kesir-toplama', grade: 4, unit: 'Kesirler', name: 'Paydaları aynı kesirleri toplama', symbol: '+',
    summary: 'Paydası aynı olan kesirleri topla',
    lesson: {
      intro: 'Paydaları aynı olan kesirlerde paylar toplanır, payda aynen kalır.',
      sections: [{
        title: 'Kesir toplama',
        paras: ['2/7 + 3/7 = 5/7. Paydalar aynı olduğu için sadece paylar toplanır.'],
        formula: 'a/c + b/c = (a + b)/c',
        examples: [{problem: '4/9 + 2/9 = ?', steps: ['4 + 2 = 6', 'Sonuç: 6/9'], answer: '6/9'}],
        tip: 'Paydaları toplamayın; yalnızca payları toplayın.',
      }],
    },
    gen(rnd) {
      const c = rnd(3, 10), a = rnd(1, c - 2), b = rnd(1, c - a - 1);
      return {text: `${a}/${c} + ${b}/${c} = ?/${c} işleminde sonucun payı kaçtır?`, answer: a + b, steps: [`${a} + ${b} = ${a + b}`, `Sonuç: ${a + b}/${c}`]};
    },
  },
  {
    id: '4-ondalik', grade: 4, unit: 'Ondalık gösterim', name: 'Onda bir ve yüzde bir', symbol: '0,1',
    summary: 'Ondalık sayıların basamaklarını öğren',
    lesson: {
      intro: 'Virgülden sonraki ilk basamak onda birleri, ikinci basamak yüzde birleri gösterir.',
      sections: [{
        title: 'Ondalık basamaklar',
        paras: ['0,47 sayısında 4 onda bir, 7 yüzde bir basamağındadır. 0,47 = 4/10 + 7/100.'],
        formula: '0,47 = 4/10 + 7/100',
        examples: [{problem: '0,6 sayısı kaç onda birdir?', steps: ['0,6 = 6/10'], answer: '6'}],
        tip: 'Virgülden sonraki rakamları tek tek say.',
      }],
    },
    gen(rnd) {
      const a = rnd(1, 9), b = rnd(0, 9);
      return {text: `0,${a}${b} sayısının onda bir basamağındaki rakam kaçtır?`, answer: a, steps: [`0,${a}${b} = ${a}/10 + ${b}/100`]};
    },
  },
  {
    id: '4-aci', grade: 4, unit: 'Geometri', name: 'Saat yönünde açı (saatte açı)', symbol: '∠',
    summary: 'Saat kadranında iki kol arasındaki açıyı bul',
    lesson: {
      intro: 'Saat kadranında 12 saat bölümü vardır ve her saat arası 30°\'dir. Tam tur 360°\'dir.',
      sections: [{
        title: 'Saat ve açı',
        paras: ['Saat 3:00\'te akrep ile yelkovan arasındaki açı 3 · 30 = 90°\'dir.'],
        formula: 'Saat kadranında açı = saat · 30°',
        examples: [{problem: 'Saat 6:00\'da iki kol arasındaki açı?', steps: ['6 · 30 = 180'], answer: '180'}],
        tip: 'Küçük açıyı bulmak için 360\'tan büyük açıyı çıkar.',
      }],
    },
    gen(rnd) {
      const h = rnd(1, 11), raw = h * 30, ang = Math.min(raw, 360 - raw);
      return {text: `Saat ${h}:00 iken akrep ile yelkovan arasındaki (küçük) açı kaç derecedir?`, answer: ang, steps: [`${h} · 30 = ${raw}°`, `Küçük açı: ${ang}°`]};
    },
  },
  {
    id: '4-alan', grade: 4, unit: 'Geometri', name: 'Dikdörtgen ve karenin alanı', symbol: '▢',
    summary: 'Dikdörtgen ve karenin alanını hesapla',
    lesson: {
      intro: 'Alan, bir yüzeyin kapladığı yerdir. Dikdörtgenin alanı uzun kenar çarpı kısa kenardır.',
      sections: [{
        title: 'Alan formülleri',
        paras: ['Kenarları 8 cm ve 5 cm olan dikdörtgenin alanı 8 · 5 = 40 cm²\'dir. Kenarı 6 cm olan karenin alanı 6 · 6 = 36 cm²\'dir.'],
        formula: 'Dikdörtgen: a · b, Kare: a · a',
        examples: [{problem: 'Kenarı 7 cm olan karenin alanı?', steps: ['7 · 7 = 49'], answer: '49'}],
        tip: 'Alan birimi kare santimetre (cm²) gibi karelerle yazılır.',
      }],
    },
    gen(rnd) {
      const a = rnd(2, 12), b = rnd(2, 12);
      return {text: `Kenarları ${a} cm ve ${b} cm olan dikdörtgenin alanı kaç cm²'dir?`, answer: a * b, steps: [`${a} · ${b} = ${a * b} cm²`]};
    },
  },
  {
    id: '4-dort-islem', grade: 4, unit: 'Doğal sayılar', name: 'İşlem önceliği', symbol: '×',
    summary: 'Çarpma ve bölmeyi toplamadan önce yap',
    lesson: {
      intro: 'İşlemlerde önce çarpma ve bölme, sonra toplama ve çıkarma yapılır.',
      sections: [{
        title: 'İşlem sırası',
        paras: ['3 + 4 · 5 işleminde önce 4 · 5 = 20, sonra 3 + 20 = 23 bulunur.'],
        formula: '3 + 4 · 5 = 3 + 20 = 23',
        examples: [{problem: '10 − 12 : 4 = ?', steps: ['12 : 4 = 3', '10 − 3 = 7'], answer: '7'}],
        tip: 'Önce çarpma ve bölme, sonra toplama ve çıkarma.',
      }],
    },
    gen(rnd) {
      const a = rnd(2, 15), b = rnd(2, 9), c = rnd(2, 9);
      return {text: `${a} + ${b} · ${c} = ?`, answer: a + b * c, steps: [`Önce ${b} · ${c} = ${b * c}`, `Sonra ${a} + ${b * c} = ${a + b * c}`]};
    },
  },
  {
    id: '4-oruntu', grade: 4, unit: 'Doğal sayılar', name: 'Kuralı bulma (örüntü)', symbol: '…',
    summary: 'Sayı örüntüsünün kuralını bulup sonraki sayıyı bul',
    lesson: {
      intro: 'Bir örüntüde ardışık sayılar arasındaki fark ya da çarpan sabit olabilir. Kuralı bulursak sonraki sayıyı hesaplayabiliriz.',
      sections: [{
        title: 'Kural',
        paras: ['3, 7, 11, 15 örüntüsünde her sayı bir öncekine 4 eklenerek bulunur. Sonraki sayı 19 olur.'],
        formula: 'Sonraki = önceki + fark',
        examples: [{problem: '2, 6, 18, 54, ___ ?', steps: ['Her sayı önceki·3', '54 · 3 = 162'], answer: '162'}],
        tip: 'Önce fark bakın; fark sabit değilse çarpana bakın.',
      }],
    },
    gen(rnd) {
      const d = rnd(2, 9), a = rnd(1, 10), seq = Array.from({length: 4}, (_, i) => a + d * i);
      return {text: `${seq.join(', ')}, ___ boşluğuna gelen sayı kaçtır?`, answer: a + 4 * d, steps: [`Kural: ${d} ekleniyor`, `${seq[3]} + ${d} = ${a + 4 * d}`]};
    },
  },
];
