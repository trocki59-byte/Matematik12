// 2. sınıf: Türkçe, Hayat Bilgisi, Müzik, Görsel Sanatlar, Beden Eğitimi.
// Metin tabanlı konular: her madde {q, a, w}; w tam 4 yanlış seçenek içerir.

function textTopic({id, unit, name, symbol, summary, intro, paras, tip, items, more}) {
  const extra = more?.sections ?? [];
  const examples = more?.examples ?? items.slice(0, 3).map(it => ({problem: it.q, steps: ['Soruyu dikkatlice oku.', 'Seçenekleri tek tek değerlendir.', `Doğru cevap: ${it.a}`], answer: it.a}));
  return {
    id, grade: 2, unit, name, symbol, summary, kind: 'text',
    lesson: {intro, sections: [
      {title: name, paras, tip},
      ...extra,
      {title: 'Örneklerle', paras: ['Aşağıdaki örnekleri önce kendin çöz, sonra adımlara bak.'], examples},
    ]},
    gen(rnd) {
      const it = items[rnd(0, items.length - 1)];
      return {text: it.q, answerText: it.a, wrong: it.w, steps: [`Doğru cevap: ${it.a}`]};
    },
  };
}

const TR = 'Türkçe';
const HB = 'Hayat Bilgisi';
const MU = 'Müzik';
const GS = 'Görsel Sanatlar';
const BE = 'Beden Eğitimi';

export default [
  // ---------- Türkçe ----------
  textTopic({
    id: '2-tr-kelime', unit: TR, name: 'Eş anlamlı ve zıt anlamlı sözcükler', symbol: '↔', summary: 'Eş ve zıt anlamlı sözcükleri ayır',
    intro: 'Eş anlamlı sözcükler aynı ya da çok yakın anlamı taşır. Zıt anlamlı sözcükler ise birbirinin karşıt anlamını taşır.',
    paras: ['"Büyük" ile "iri" eş anlamlıdır. "Büyük" ile "küçük" zıt anlamlıdır.'],
    tip: 'Zıt anlamlı sözcükleri çiftler halinde ezberlemek kolaylık sağlar.',
    more: {
      sections: [
        {title: 'Eş anlamlı sözcükler', paras: ['Eş anlamlı sözcükler aynı ya da çok yakın anlamı taşır. Büyük ile iri, sevinç ile neşe eş anlamlıdır.', 'Eş anlamlılar cümlede yer değiştirince anlam çok değişmez.']},
        {title: 'Zıt anlamlı sözcükler', paras: ['Zıt anlamlı sözcükler birbirinin karşıtı anlamı taşır. Uzun ile kısa, ağır ile hafif birer zıt anlamlı çifttir.'], tip: 'Zıt anlamlıları çift olarak öğren: sıcak-soğuk, yüksek-alçak gibi.'},
      ],
      examples: [
        {problem: 'Güzel sözcüğünün eş anlamlısı hangisidir?', steps: ['Güzel, beğenilen ve hoşa giden anlamındadır.', 'Hoş sözcüğü de aynı anlamı taşır.'], answer: 'hoş'},
        {problem: 'Ağır sözcüğünün zıt anlamlısı hangisidir?', steps: ['Ağır, çok kilolu anlamındadır.', 'Tersi, az kilolu olan hafif tir.'], answer: 'hafif'},
      ],
    },
    items: [
      {q: '"Güzel" sözcüğünün eş anlamlısı hangisidir?', a: 'hoş', w: ['çirkin', 'kötü', 'uzun', 'soğuk']},
      {q: '"Sıcak" sözcüğünün zıt anlamlısı hangisidir?', a: 'soğuk', w: ['ılık', 'güzel', 'yakın', 'hızlı']},
      {q: '"Hızlı" sözcüğünün zıt anlamlısı hangisidir?', a: 'yavaş', w: ['çabuk', 'güçlü', 'uzak', 'yeni']},
      {q: '"Mutlu" sözcüğünün zıt anlamlısı hangisidir?', a: 'üzgün', w: ['sevinçli', 'neşeli', 'güzel', 'büyük']},
    ],
  }),
  textTopic({
    id: '2-tr-ek', unit: TR, name: 'Ekler ve kök', symbol: '+', summary: 'Sözcüğün kökünü ve ekini bul',
    intro: 'Sözcüğün anlamını taşıyan kısmına kök, sözcüğe eklenen kısımlara ek denir.',
    paras: ['"Kitaplar" sözcüğünde kök "kitap", ek "-lar" çoğul ekidir.'],
    tip: 'Kökü bulmak için sözcükten ekleri çıkar.',
    more: {
      sections: [
        {title: 'Kök ve ek', paras: ['Kök, sözcüğün anlamını taşıyan temel parçadır. Ek ise köke gelerek sözcüğe yeni anlam katan parçadır.', 'Kitap sözcüğünde kök kitap tır. Kitaplar sözcüğünde ise -lar eki çoğul anlam katar.'], tip: 'Sözcüğün sonundan başlayarak ekleri ayırmayı dene.'},
      ],
      examples: [
        {problem: 'kitaplar sözcüğündeki ek hangisidir?', steps: ['Kök kitap tır.', 'Sonundaki -lar eki çoğul anlam katar.'], answer: '-lar'},
        {problem: 'okulda sözcüğündeki ek hangisidir?', steps: ['Kök okul dur.', 'Sonundaki -da eki bulunma anlamı katar.'], answer: '-da'},
      ],
    },
    items: [
      {q: '"Kalemler" sözcüğünün kökü hangisidir?', a: 'kalem', w: ['kalemler', 'lem', 'ler', 'kale']},
      {q: '"Evler" sözcüğündeki ek hangisidir?', a: '-ler', w: ['ev', '-de', '-im', '-ı']},
      {q: '"Okulda" sözcüğündeki ek hangisidir?', a: '-da', w: ['okul', '-lar', '-ım', '-den']},
      {q: '"Öğrenci" sözcüğünün kökü hangisidir?', a: 'öğrenci', w: ['öğren', 'ci', 'öğr', 'enci']},
    ],
  }),
  textTopic({
    id: '2-tr-cumle', unit: TR, name: 'Cümle türleri', symbol: '?', summary: 'Bildirme, soru ve ünlem cümlelerini ayır',
    intro: 'Cümleler amacına göre bildirme, soru ve ünlem cümleleri olarak ayrılır.',
    paras: ['"Ali okula gitti." bildirme, "Okula gittin mi?" soru, "Ne güzel!" ünlem cümlesidir.'],
    tip: 'Soru cümlesinde genellikle "mi" eki bulunur.',
    more: {
      sections: [
        {title: 'Olumlu ve olumsuz cümleler', paras: ['Bir işin yapıldığını anlatan cümle olumludur. Bir işin yapılmadığını anlatan cümle olumsuzdur.', 'Olumsuz cümlelerde fiile -ma ya da -me eki getirilir: gel-me-di gibi.'], tip: 'Cümlede "değil", "-ma", "-me" gibi parçalar varsa cümle olumsuzdur.'},
        {title: 'Emir cümleleri', paras: ['Birine bir işi yaptırmak için söylenen cümle emir cümlesidir. Kapıyı kapat, odanı topla gibi cümleler emir bildirir.']},
      ],
      examples: [
        {problem: 'Ali okula gitmedi cümlesi olumlu mudur, olumsuz mu?', steps: ['Cümlede gitmedi sözcüğü var.', 'Fiile -me eki gelerek olumsuzluk bildirilmiş.'], answer: 'olumsuz'},
        {problem: 'Kapıyı kapat cümlesi hangi cümle türüdür?', steps: ['Cümle birine bir iş yaptırmak istiyor.', 'Bu nedenle emir cümlesidir.'], answer: 'emir'},
      ],
    },
    items: [
      {q: '"Bugün hava çok güzel!" cümlesi hangi türdendir?', a: 'Ünlem cümlesi', w: ['Soru cümlesi', 'Bildirme cümlesi', 'Emir cümlesi', 'Ad cümlesi']},
      {q: '"Yarın pikniğe gider misin?" cümlesi hangi türdendir?', a: 'Soru cümlesi', w: ['Bildirme cümlesi', 'Ünlem cümlesi', 'Emir cümlesi', 'Dilek cümlesi']},
      {q: '"Ali dün kitap okudu." cümlesi hangi türdendir?', a: 'Bildirme cümlesi', w: ['Soru cümlesi', 'Ünlem cümlesi', 'Emir cümlesi', 'Dilek cümlesi']},
    ],
  }),
  textTopic({
    id: '2-tr-paragraf', unit: TR, name: 'Paragraf ve ana fikir', symbol: '¶', summary: 'Paragrafın ana fikrini bul',
    intro: 'Paragraf, tek bir konuyu anlatan cümleler topluluğudur. Paragrafın ana fikri, yazarın en çok anlatmak istediği düşüncedir.',
    paras: ['Paragrafta çoğu zaman bir cümle ana fikri doğrudan söyler.'],
    tip: 'Ana fikri bulmak için "bu paragrafta neden söz ediliyor?" diye sor.',
    more: {
      sections: [
        {title: 'Ana fikir nedir?', paras: ['Paragrafın en önemli düşüncesine ana fikir denir. Paragraftaki bütün cümleler ana fikri destekler.', 'Ana fikri bulmak için paragrafa baştan sona bakılır ve en çok anlatılan konu belirlenir.'], tip: 'Ana fikir genellikle paragrafın ilk ya da son cümlesinde yer alır.'},
      ],
      examples: [
        {problem: 'Metin: "Kedim çok tatlıdır. Her sabah bana gelir ve yanağımı yalar. Onu çok seviyorum." Bu paragrafın ana fikri nedir?', steps: ['Paragrafta kedinin tatlılığından ve sevgiden söz ediliyor.', 'Ana fikir kedinin tatlılığı ve sevgidir.'], answer: 'Kedisinin tatlılığı ve sevgisi'},
        {problem: 'Metin: "Kedim çok tatlıdır. Her sabah bana gelir ve yanağımı yalar. Onu çok seviyorum." Paragrafın ilk cümlesi hangisidir?', steps: ['Paragrafın ilk cümlesine bak.', 'İlk cümle: Kedim çok tatlıdır.'], answer: 'Kedim çok tatlıdır.'},
      ],
    },
    items: [
      {q: 'Paragrafın ana fikri nedir?', a: 'Paragrafta anlatılmak istenen temel düşünce', w: ['Paragrafın ilk kelimesi', 'Paragrafın son cümlesi', 'Paragraftaki en uzun cümle', 'Paragrafın kaç cümleden oluştuğu']},
      {q: 'Bir paragraf neden oluşur?', a: 'Tek bir konuyu anlatan cümlelerden', w: ['Rastgele kelimelerden', 'Sadece sorulardan', 'Yalnızca isimlerden', 'Resimlerden']},
    ],
  }),
  textTopic({
    id: '2-tr-yazim', unit: TR, name: 'Yazım kuralları', symbol: 'ab', summary: 'Büyük harf ve kısaltma yazımını öğren',
    intro: 'Özel isimler büyük harfle yazılır. Kişi adları, şehir adları ve kısaltmalar kendine özgü kurallara göre yazılır.',
    paras: ['"Ankara\'ya gidecek miyiz?" cümlesinde Ankara büyük harfle başlar.'],
    tip: 'Özel isimleri her zaman büyük harfle başlat.',
    more: {
      sections: [
        {title: 'de ve da bağlacı', paras: ['de ve da bağlacı sözcükten ayrı yazılır: Ben de geldim. Ancak bulunma eki bitişik yazılır: okulda, evde.', 'Bir sözcüğe eklenen ek bitişik yazılır: kitaplar, kalemler.'], tip: 'Cümleden çıkarınca anlam bozuluyorsa bağlaç ayrı, ek bitişik yazılır.'},
      ],
      examples: [
        {problem: 'Ben ___ geldim. Boşluğa hangi yazılış doğrudur?', steps: ['Ben de geldim anlamı bağlaç olarak ayrı yazılır.', 'de bağlacı ayrı yazılır.'], answer: 'de'},
        {problem: 'Evde sözcüğü doğru mudur, ev de mi?', steps: ['Evde, ev sözcüğüne -de eki gelerek yazılmış.', 'Ek olduğu için bitişik yazılır.'], answer: 'Evde (bitişik)'},
      ],
    },
    items: [
      {q: 'Hangisi doğru yazılmıştır?', a: 'İstanbul', w: ['istanbul', 'İstanbul ', 'istanbuL', 'ıstanbul']},
      {q: 'Hangi sözcük büyük harfle başlamalıdır?', a: 'Ayşe', w: ['kitap', 'güneş', 'ağaç', 'kalem']},
      {q: '"Türkiye" sözcüğünde hangi harf büyüktür?', a: 'T', w: ['ü', 'r', 'k', 'i']},
    ],
  }),
  textTopic({
    id: '2-tr-dinleme', unit: TR, name: 'Dinleme ve anlama', symbol: '👂', summary: 'Dinlediğini anlayıp özetle',
    intro: 'İyi dinleyen kişi, konuşanın söylediklerini anlar ve önemli noktaları hatırlar.',
    paras: ['Dinlerken konuşmacının anlattığı olayın başını, ortasını ve sonunu takip etmek kolaylaştırır.'],
    tip: 'Dinlerken önemli sözcükleri aklında tutmaya çalış.',
    more: {
      sections: [
        {title: 'Dikkatli dinleme', paras: ['Dinlerken konuşmacının ne anlatmak istediğini, hangi sözcüklerle anlattığını takip ederiz.', 'Anahtar sözcükler, yani önemli bilgiler, dinlediğimiz şeyin en önemli parçasıdır.'], tip: 'Dinlerken kısa notlar almak aklında kalanları artırır.'},
      ],
      examples: [
        {problem: 'Öğretmen "Yarın kırmızı kıyafetle geleceğiz" dedi. Hangi renk kıyafet giyilecek?', steps: ['Anahtar sözcük renktir.', 'Söylenen renk kırmızıdır.'], answer: 'kırmızı'},
        {problem: 'Anne "Market a gidip süt alacağım, sonra dönerim" dedi. Anne nereye gidecek?', steps: ['Cümlede gidilecek yer market olarak geçiyor.', 'Anne markete gidecek.'], answer: 'markete'},
      ],
    },
    items: [
      {q: 'İyi dinlemek için ne yapılmalıdır?', a: 'Konuşanı sözünü kesmeden dinlemek', w: ['Hep konuşmak', 'Başka işle uğraşmak', 'Sözü kesmek', 'Gözünü kapatmak']},
      {q: 'Bir olayı dinlerken neye dikkat edilmelidir?', a: 'Olayın başını, ortasını ve sonunu', w: ['Sadece son cümleyi', 'Yalnızca sayıları', 'Sadece rengi', 'Yalnızca ismi']},
    ],
  }),

  // ---------- Hayat Bilgisi ----------
  textTopic({
    id: '2-hb-mahalle', unit: HB, name: 'Mahallemiz ve yerleşim', symbol: '🏘', summary: 'Mahalle ve köy yaşamını karşılaştır',
    intro: 'İnsanlar şehirde, kasabada ya da köyde yaşar. Her yerleşim biriminin kendine özgü yaşam biçimi vardır.',
    paras: ['Köyde genellikle tarım ve hayvancılık yapılır. Şehirde ise fabrika, okul ve hastane gibi kurumlar daha fazladır.'],
    tip: 'Yaşadığın yerin özelliklerini düşünerek karşılaştırma yapabilirsin.',
    more: {
      sections: [
        {title: 'Mahalle nedir?', paras: ['Mahalle, birbirine yakın evlerin ve yaşam alanlarının bulunduğu yerleşim birimidir. Mahallede okul, cami, park, market ve sağlık ocağı gibi yerler bulunur.']},
        {title: 'Mahallede yaşam', paras: ['Komşularımızla iyi geçinmek, mahallemizi temiz tutmak ve birbirimize yardım etmek önemlidir.'], tip: 'Mahallenizdeki önemli yerleri bir kâğıda çizerek aklında tutabilirsin.'},
      ],
      examples: [
        {problem: 'Mahallede ihtiyaç duyduğumuz yiyecekleri nereden alırız?', steps: ['Yiyecek alışverişi yapılan yer markettir.', 'Yiyecekleri marketten alırız.'], answer: 'Market'},
        {problem: 'Çocukların oyun oynayıp koştuğu açık yer hangisidir?', steps: ['Koşup oynanan açık alanlar parktır.', 'Bu yer parktır.'], answer: 'park'},
      ],
    },
    items: [
      {q: 'Köyde en çok hangi işle uğraşılır?', a: 'Tarım ve hayvancılık', w: ['Gemicilik', 'Madencilik', 'Bankacılık', 'Denizcilik']},
      {q: 'Şehirde hangi kurumlar daha fazladır?', a: 'Fabrika, okul, hastane', w: ['Ağaç ve çiçek', 'Tarla ve bağ', 'Ahır ve samanlık', 'Kayalık ve dere']},
    ],
  }),
  textTopic({
    id: '2-hb-ulasim', unit: HB, name: 'Ulaşım araçları', symbol: '🚌', summary: 'Ulaşım araçlarını ve kullanım yerlerini öğren',
    intro: 'İnsanlar ve eşyalar farklı araçlarla taşınır. Karada, denizde ve havada farklı ulaşım araçları kullanılır.',
    paras: ['Otobüs ve tren karada, vapur denizde, uçak havada kullanılan ulaşım araçlarındandır.'],
    tip: 'Her aracın hangi ortamda hareket ettiğini düşün.',
    more: {
      sections: [
        {title: 'Ulaşım türleri', paras: ['Karada otobüs, araba, tren ve bisiklet gibi araçlar kullanılır. Denizde vapur, gemi ve feribot gibi araçlar hizmet verir.', 'Havada ise uçak ve helikopter insanları taşır.'], tip: 'Bir aracın nerede hareket ettiğini bulunca türünü kolayca anlarsın.'},
      ],
      examples: [
        {problem: 'Denizde yolcu taşıyan araç hangisidir?', steps: ['Deniz üzerinde hareket eden araç gerekir.', 'Yolcu taşıyan deniz aracı vapurdur.'], answer: 'vapur'},
        {problem: 'Havada hareket eden ulaşım aracı hangisidir?', steps: ['Gökyüzünde uçan araçlar havada hareket eder.', 'Uçak havada hareket eden araçtır.'], answer: 'uçak'},
      ],
    },
    items: [
      {q: 'Hangisi denizde kullanılan bir ulaşım aracıdır?', a: 'Vapur', w: ['Otobüs', 'Tren', 'Bisiklet', 'Araba']},
      {q: 'Hangisi havada kullanılan bir ulaşım aracıdır?', a: 'Uçak', w: ['Tren', 'Vapur', 'Otobüs', 'Kamyon']},
      {q: 'Hangisi karada kullanılan bir ulaşım aracıdır?', a: 'Otobüs', w: ['Vapur', 'Uçak', 'Gemi', 'Deniz otobüsü']},
    ],
  }),
  textTopic({
    id: '2-hb-kurallar', unit: HB, name: 'Kurallar ve sorumluluklar', symbol: '📋', summary: 'Evde ve okulda sorumluluklarımızı öğren',
    intro: 'Kurallar, herkesin birlikte düzenli ve huzurlu yaşamasını sağlar. Her birimizin de bir sorumluluğu vardır.',
    paras: ['Evde odamızı toplamak, okulda ödevimizi yapmak birer sorumluluktur.'],
    tip: 'Sorumluluklarını yerine getirmek seni güvenilir kılar.',
    more: {
      sections: [
        {title: 'Kuralların önemi', paras: ['Kurallar bir arada yaşamamızı kolaylaştırır. Okulda, evde ve oyunlarda kurallar herkesin haklarını korur.', 'Kurallara uymak bizim sorumluluğumuzdur.'], tip: 'Bir kuralın neden konduğunu düşünmek, ona uymayı kolaylaştırır.'},
      ],
      examples: [
        {problem: 'Okul kurallarına uymak hangi kavramın parçasıdır?', steps: ['Kurallara uymak bir görevdir.', 'Görevlerini yerine getirmek sorumluluktur.'], answer: 'sorumluluk'},
        {problem: 'Herkesin aynı kurallara uyması neyi sağlar?', steps: ['Kurallar herkesi eşit tutar.', 'Eşitlik ve düzen sağlanır.'], answer: 'Düzen ve eşitlik'},
      ],
    },
    items: [
      {q: 'Evde hangi sorumluluk bize düşer?', a: 'Odamızı toplamak', w: ['Yere çöp atmak', 'Ayakkabıyı salona almak', 'Oyuncakları dağıtmak', 'Eşyaları kırmak']},
      {q: 'Kurallara uymanın amacı nedir?', a: 'Herkesin düzenli ve huzurlu yaşaması', w: ['Kimseyi dinlememek', 'Eşyaları kırmak', 'Oyun oynamamak', 'Yüksek sesle konuşmak']},
    ],
  }),
  textTopic({
    id: '2-hb-doga', unit: HB, name: 'Doğamızı koruyalım', symbol: '🌳', summary: 'Doğayı korumanın yollarını öğren',
    intro: 'Doğa, bize yaşam için gerekli olan her şeyi sağlar. Doğayı korumak hepimizin görevidir.',
    paras: ['Suyu gereksiz yere harcamamak, ağaç dikmek ve çevreyi temiz tutmak doğayı korumanın yollarıdır.'],
    tip: 'Geri dönüşüm kutusunu kullanmak da doğayı korumaya yardım eder.',
    more: {
      sections: [
        {title: 'Doğayı korumak', paras: ['Doğayı korumak için suyu gereksiz yere harcamamalı, çöpü yere atmamalı ve ağaç dikmeliyiz.', 'Geri dönüşüm, kâğıt, cam ve plastik atıkların yeniden kullanılmasını sağlar.'], tip: 'Çöpleri ayırarak doğru kutuya atmak geri dönüşümü kolaylaştırır.'},
      ],
      examples: [
        {problem: 'Geri dönüştürülebilen atıklardan biri hangisidir?', steps: ['Geri dönüşüm, yeniden kullanılabilen atıklarla yapılır.', 'Kâğıt geri dönüştürülebilir.'], answer: 'kâğıt'},
        {problem: 'Musluğu açık bırakmak hangi israfa neden olur?', steps: ['Musluktan akan su boşa gider.', 'Bu durum su israfına neden olur.'], answer: 'su israfı'},
      ],
    },
    items: [
      {q: 'Doğayı korumak için ne yapabiliriz?', a: 'Ağaç dikebiliriz', w: ['Ağaçları kesebiliriz', 'Çöpü yere atabiliriz', 'Suyu boşa akıtabiliriz', 'Hayvanları incitebiliriz']},
      {q: 'Hangisi doğaya zarar verir?', a: 'Çöpleri yere atmak', w: ['Ağaç dikmek', 'Çöpleri ayırmak', 'Suyu tasarruf etmek', 'Geri dönüşüm yapmak']},
    ],
  }),
  textTopic({
    id: '2-hb-meslek', unit: HB, name: 'Meslekler', symbol: '👩‍⚕️', summary: 'Meslekleri ve yaptıkları işleri tanı',
    intro: 'Meslek, insanların toplum için belli bir iş yaparak geçimini sağladığı işlerdir.',
    paras: ['Doktor hastaları tedavi eder, öğretmen öğrencilere ders verir, itfaiyeci yangın söndürür.'],
    tip: 'Bir mesleğin toplumdaki yararını düşünmek onu anlamayı kolaylaştırır.',
    more: {
      sections: [
        {title: 'Meslek nedir?', paras: ['Meslek, bir kişinin toplum için düzenli olarak yaptığı iştir. Öğretmen, doktor, itfaiyeci, çiftçi ve aşçı birer meslektir.'], tip: 'Bir mesleğin ne işe yaradığını düşünerek adını hatırlayabilirsin.'},
      ],
      examples: [
        {problem: 'Yangın söndüren kişinin mesleği nedir?', steps: ['Yangını söndürmek itfaiyecilerin işidir.', 'Bu meslek itfaiyeciliktir.'], answer: 'itfaiyeci'},
        {problem: 'Hastaları muayene eden ve tedavi eden kişinin mesleği nedir?', steps: ['Hastaları muayene etmek ve tedavi etmek doktorun işidir.', 'Bu kişi doktordur.'], answer: 'doktor'},
      ],
    },
    items: [
      {q: 'Hastaları tedavi eden kişi kimdir?', a: 'Doktor', w: ['Öğretmen', 'Aşçı', 'Berber', 'Şoför']},
      {q: 'Yangın söndüren kişi hangi mesleğe sahiptir?', a: 'İtfaiyeci', w: ['Öğretmen', 'Doktor', 'Terzi', 'Çiftçi']},
      {q: 'Öğrencilere ders veren kişi kimdir?', a: 'Öğretmen', w: ['Doktor', 'Pilot', 'Marangoz', 'Kasap']},
    ],
  }),

  // ---------- Müzik ----------
  textTopic({
    id: '2-mu-nota', unit: MU, name: 'Nota ve ses', symbol: '♪', summary: 'Notaları ve seslerin uzunluğunu tanı',
    intro: 'Müzikte sesler nota ile yazılır. Notalar farklı yükseklik ve uzunlukta olabilir.',
    paras: ['Do, re, mi, fa, sol, la, si yedi temel notadır.'],
    tip: 'Notaları sesle birlikte söyleyerek ezberleyebilirsin.',
    more: {
      sections: [
        {title: 'Notalar ve sıra', paras: ['Müzikte yedi nota vardır: do, re, mi, fa, sol, la, si. Notalar bu sırayla dizilir.', 'Sesler yükseldikçe notalar da sırayla ilerler; do ile başlayan dizi yeniden do ile sona erer.'], tip: 'Notaları bir şarkı gibi söyleyerek sırayı ezberleyebilirsin.'},
      ],
      examples: [
        {problem: 'Do notasından sonra hangi nota gelir?', steps: ['Notaların sırası: do, re, mi ...', 'Do dan sonra re gelir.'], answer: 're'},
        {problem: 'Müzikte kaç farklı nota vardır?', steps: ['Notalar do, re, mi, fa, sol, la, si olarak sayılır.', 'Toplam yedi nota vardır.'], answer: '7'},
      ],
    },
    items: [
      {q: 'Temel nota sayısı kaçtır?', a: '7', w: ['5', '6', '8', '9']},
      {q: 'Hangisi temel notalardan biridir?', a: 'Do', w: ['Ka', 'Mo', 'Tu', 'Ze']},
      {q: 'Notalar hangi özelliklerine göre farklılaşır?', a: 'Yükseklik ve uzunluk', w: ['Renk ve boyut', 'Ağırlık ve şekil', 'Yaş ve cinsiyet', 'Kokusu ve tadı']},
    ],
  }),
  textTopic({
    id: '2-mu-halk', unit: MU, name: 'Halk müziği', symbol: '🎶', summary: 'Halk müziğinin özelliklerini öğren',
    intro: 'Halk müziği, bir toplumun yaşamından doğan, kuşaktan kuşağa aktarılan müziktir.',
    paras: ['Türk halk müziğinde bağlama ve kaval gibi geleneksel çalgılar kullanılır.'],
    tip: 'Halk türküleri genellikle yöreye özgü söz ve ezgiler taşır.',
    more: {
      sections: [
        {title: 'Halk müziği', paras: ['Halk müziği, halk arasında yüzyıllardır söylenen ve çalınan müziktir. Türküler, halk müziğinin en bilinen türüdür.', 'Halk müziğinde bağlama, zurna, kaval ve davul gibi çalgılar kullanılır.'], tip: 'Bir türkü dinlerken hangi yörenin olduğunu ve konusunu düşünmeye çalış.'},
      ],
      examples: [
        {problem: 'Halk müziğinde kullanılan telli çalgı hangisidir?', steps: ['Telli çalgılarda ses tellerin titreşmesiyle çıkar.', 'Halk müziğinin telli çalgısı bağlamadır.'], answer: 'bağlama'},
        {problem: 'Halk arasında söylenen şarkılara ne ad verilir?', steps: ['Halkın söylediği, yöreye özgü şarkılar türkülerdir.', 'Bu şarkılara türkü denir.'], answer: 'türkü'},
      ],
    },
    items: [
      {q: 'Halk müziğinde kullanılan geleneksel çalgılardan biri hangisidir?', a: 'Bağlama', w: ['Piyano', 'Org', 'Davul seti', 'Synthesizer']},
      {q: 'Halk müziği nasıl aktarılır?', a: 'Kuşaktan kuşağa', w: ['Sadece kitaplarla', 'Yalnızca radyoda', 'Sadece sinemada', 'Sadece internette']},
    ],
  }),
  textTopic({
    id: '2-mu-dinleme', unit: MU, name: 'Müzik dinleme', symbol: '🎧', summary: 'Müziği dinlerken dikkat edilecekleri öğren',
    intro: 'Müzik dinlerken ritmi, sesin hızını ve enstrümanları fark etmek müziği daha iyi anlamayı sağlar.',
    paras: ['Hızlı bir müzik neşe, yavaş bir müzik sakinlik duygusu verebilir.'],
    tip: 'Dinlediğin müzikte hangi çalgının öne çıktığına dikkat et.',
    more: {
      sections: [
        {title: 'Müzik dinlerken', paras: ['Bir müziği dinlerken hızına, sesine ve çalgılarına dikkat ederiz. Müziğin hangi duyguyu anlattığını düşünürüz.', 'Hızlı ve neşeli müzik sevinç, yavaş ve ağır müzik ise hüzün duygusunu anlatabilir.'], tip: 'Dinlerken gözlerini kapatırsan müziğin anlattığı duyguyu daha kolay hissedersin.'},
      ],
      examples: [
        {problem: 'Hızlı ve neşeli bir müzik hangi duyguyu anlatır?', steps: ['Hızlı ve neşeli müzik canlılık taşır.', 'Bu duygu sevinçtir.'], answer: 'sevinç'},
        {problem: 'Yavaş ve ağır bir müzik hangi duyguyu anlatabilir?', steps: ['Yavaş ve ağır müzik durgunluk taşır.', 'Bu duygu hüzündür.'], answer: 'hüzün'},
      ],
    },
    items: [
      {q: 'Müziği dinlerken neye dikkat edilir?', a: 'Ritim ve hız', w: ['Sadece sesin sertliği', 'Yalnızca renkler', 'Sadece kağıt', 'Hiçbiri']},
      {q: 'Hızlı bir müzik genellikle hangi duyguyu verir?', a: 'Neşe', w: ['Uykusuzluk', 'Yorgunluk', 'Sıkıntı', 'Korku']},
    ],
  }),

  // ---------- Görsel Sanatlar ----------
  textTopic({
    id: '2-gs-doku', unit: GS, name: 'Doku', symbol: '▦', summary: 'Doku türlerini tanı',
    intro: 'Doku, bir yüzeyin dokunulduğunda hissedilen ya da görsel olarak algılanan özelliğidir.',
    paras: ['Pürüzlü, pürüzsüz, yumuşak ve sert birer doku özelliğidir.'],
    tip: 'Doku çalışırken farklı malzemelere dokunup hislerini karşılaştır.',
    more: {
      sections: [
        {title: 'Doku nedir?', paras: ['Doku, bir yüzeyin dokunarak hissedilen özelliğidir. Pürüzlü, pürüzsüz, yumuşak ve sert birer dokudur.', 'Bir yüzeyin dokusunu görmeden de dokunarak anlayabiliriz.'], tip: 'Gözlerini kapatıp farklı yüzeylere dokun ve hissettiklerini kelimelerle anlat.'},
      ],
      examples: [
        {problem: 'Kum kâğıdı dokunulduğunda nasıl hissettirir?', steps: ['Kum kâğıdı elimize tutunmaya çalışan bir yüzeydir.', 'Bu yüzey pürüzlüdür.'], answer: 'pürüzlü'},
        {problem: 'İpek kumaşa dokununca nasıl bir his verir?', steps: ['İpek kumaş çok kaygan ve incedir.', 'Bu doku yumuşaktır.'], answer: 'yumuşak'},
      ],
    },
    items: [
      {q: 'Dokunulduğunda hissedilen yüzey özelliğine ne denir?', a: 'Doku', w: ['Renk', 'Çizgi', 'Nokta', 'Leke']},
      {q: 'Hangisi bir doku özelliğidir?', a: 'Pürüzlü', w: ['Mavi', 'Kırmızı', 'Dairesel', 'Büyük']},
      {q: 'Hangisi yumuşak bir doku örneğidir?', a: 'Pamuk', w: ['Taş', 'Demir', 'Tahta', 'Cam']},
    ],
  }),
  textTopic({
    id: '2-gs-desen', unit: GS, name: 'Desen', symbol: '✿', summary: 'Desen ve tekrarın nasıl yapıldığını öğren',
    intro: 'Desen, belli şekil ya da motiflerin düzenli biçimde tekrarlanmasıyla oluşan görsel düzendir.',
    paras: ['Kumaş ve halı üzerindeki çiçek ya da geometrik şekiller desen örnekleridir.'],
    tip: 'Desende tekrar eden şekli bulmak için dikkatle bak.',
    more: {
      sections: [
        {title: 'Desen nedir?', paras: ['Desen, belirli şekil ya da çizgilerin düzenli olarak tekrarlanmasıyla oluşan süslemedir. Kumaşlar, halılar ve duvar süslemeleri desenlidir.'], tip: 'Bir desenin hangi şekillerin tekrar ettiğine bakarak devamını çizebilirsin.'},
      ],
      examples: [
        {problem: 'Kare, üçgen, kare, üçgen diye giden bir desen nasıl adlandırılır?', steps: ['Şekiller düzenli olarak tekrar ediyor.', 'Bu tekrarlanan desendir.'], answer: 'tekrarlı desen'},
        {problem: 'Desen nedir?', steps: ['Desen düzenli tekrarlardan oluşur.', 'Tekrarlanan şekiller desen oluşturur.'], answer: 'Tekrarlanan şekiller'},
      ],
    },
    items: [
      {q: 'Desen neyle oluşur?', a: 'Şekil ve motiflerin tekrarıyla', w: ['Sadece tek bir renkle', 'Sadece yazı yazarak', 'Sadece boyut değiştirerek', 'Hiçbir şey tekrar etmeden']},
      {q: 'Hangisi bir desen örneğidir?', a: 'Kumaş üzerindeki çiçekler', w: ['Tek bir nokta', 'Boş kağıt', 'Tek bir çizgi', 'Düz beyaz yüzey']},
    ],
  }),
  textTopic({
    id: '2-gs-renk2', unit: GS, name: 'Sıcak ve soğuk renkler', symbol: '🔥', summary: 'Sıcak ve soğuk renkleri ayır',
    intro: 'Kırmızı, turuncu ve sarı sıcak renklerdir. Mavi, yeşil ve mor soğuk renklerdir.',
    paras: ['Sıcak renkler sıcaklık ve enerji, soğuk renkler ise sakinlik duygusu verir.'],
    tip: 'Bir resim yaparken sıcak ve soğuk renkleri dengeli kullanmaya çalış.',
    more: {
      sections: [
        {title: 'Sıcak renkler', paras: ['Kırmızı, turuncu ve sarı sıcak renklerdir. Bu renkler bize sıcaklığı, enerjiyi ve canlılığı hatırlatır.']},
        {title: 'Soğuk renkler', paras: ['Mavi, yeşil ve mor soğuk renklerdir. Bu renkler denizi, gökyüzünü ve serinliği hatırlatır.'], tip: 'Bir resim yaparken sıcak renkleri güneşi, soğuk renkleri suyu anlatmak için kullanabilirsin.'},
      ],
      examples: [
        {problem: 'Aşağıdakilerden hangisi soğuk renktir?', steps: ['Soğuk renkler mavi, yeşil ve mor dur.', 'Bunların içinde mavi soğuk renktir.'], answer: 'mavi'},
        {problem: 'Aşağıdakilerden hangisi sıcak renktir?', steps: ['Sıcak renkler kırmızı, turuncu ve sarı dır.', 'Bunlardan kırmızı sıcak renktir.'], answer: 'kırmızı'},
      ],
    },
    items: [
      {q: 'Hangisi sıcak bir renktir?', a: 'Turuncu', w: ['Mavi', 'Yeşil', 'Mor', 'Lacivert']},
      {q: 'Hangisi soğuk bir renktir?', a: 'Mavi', w: ['Kırmızı', 'Sarı', 'Turuncu', 'Pembe']},
      {q: 'Soğuk renkler hangi duyguyu verir?', a: 'Sakinlik', w: ['Öfke', 'Heyecan', 'Sıcaklık', 'Telaş']},
    ],
  }),

  // ---------- Beden Eğitimi ----------
  textTopic({
    id: '2-be-kosu', unit: BE, name: 'Koşu ve sıçrama', symbol: '🏃‍♀️', summary: 'Koşu ve sıçrama becerilerini geliştir',
    intro: 'Koşu ve sıçrama, vücudumuzun hareket becerilerini geliştiren temel hareketlerdir.',
    paras: ['Koşarken kollarımızı ve bacaklarımızı koordineli kullanırız. Sıçrarken dengemizi korumaya dikkat ederiz.'],
    tip: 'Isınmadan koşmaya ve sıçramaya başlamamak gerekir.',
    more: {
      sections: [
        {title: 'Doğru koşu', paras: ['Koşarken kollarımızı dirseklerimizden bükeriz ve rahat sallarız. Adımlarımızı kısa ve düzenli atarız.', 'Ayak ucumuzla yere basmak koşuyu daha hızlı ve güvenli kılar.'], tip: 'Koşmadan önce ısınma hareketleri yapmak kaslarını korur.'},
        {title: 'Sıçrama', paras: ['Sıçrarken dizlerimizi bükeriz ve kollarımızı ritmik olarak kullanırız. İniş yaparken ayaklarımızı yumuşakça yere koyarız.'], tip: 'Sıçrama sırasında dizlerini bükmek düşmeni önler.'},
      ],
      examples: [
        {problem: 'Koşarken kollarımız nasıl olmalı?', steps: ['Kollar koşu sırasında denge sağlar.', 'Kollar dirseklerden bükülü ve rahat olmalıdır.'], answer: 'dirseklerden bükülü'},
        {problem: 'Sıçrarken dizlerimizle ne yapmalıyız?', steps: ['Dizler sıçrama gücünü ve iniş dengesini sağlar.', 'Dizleri bükerek sıçrarız.'], answer: 'dizleri bükmek'},
      ],
    },
    items: [
      {q: 'Koşmadan önce ne yapmalıyız?', a: 'Isınmalıyız', w: ['Uyumalıyız', 'Yemek yemeliyiz', 'Bağırmalıyız', 'Hemen yatmalıyız']},
      {q: 'Sıçrarken ne korunmalıdır?', a: 'Denge', w: ['Sessizlik', 'Renk', 'Sıcaklık', 'Nefes tutma']},
    ],
  }),
  textTopic({
    id: '2-be-takim', unit: BE, name: 'Takım oyunları', symbol: '🤝', summary: 'Takım halinde oynamanın değerini öğren',
    intro: 'Takım oyunlarında birlikte hareket etmek, iş birliği ve dayanışma becerilerini geliştirir.',
    paras: ['Takımdaki herkes kendi görevini yaptığında oyun daha başarılı olur.'],
    tip: 'Takım arkadaşlarını cesaretlendirmek de önemlidir.',
    more: {
      sections: [
        {title: 'Takım ruhu', paras: ['Takım oyunlarında hedef herkesin birlikte başarılı olmasıdır. Takım arkadaşlarımıza destek olmak ve birbirimizi dinlemek önemlidir.', 'Kazanmak kadar, kaybetmeyi kabul etmek de takım ruhunun bir parçasıdır.'], tip: 'Bir arkadaşın hatası olduğunda onu küçümsemek yerine yardım etmeyi dene.'},
      ],
      examples: [
        {problem: 'Takım oyunlarında en önemli şey nedir?', steps: ['Takım oyunu birlikte oynanır.', 'Birlikte çalışmaya iş birliği denir.'], answer: 'iş birliği'},
        {problem: 'Takım kaybettiğinde ne yapmalıyız?', steps: ['Kaybetmek üzücüdür ama takım arkadaşlarımız da üzülmüştür.', 'Onları teselli edip destek olmalıyız.'], answer: 'Takım arkadaşlarını teselli etmek'},
      ],
    },
    items: [
      {q: 'Takım oyunlarında neyi geliştiririz?', a: 'İş birliği', w: ['Tek başına kalmayı', 'Kavga etmeyi', 'Bağırmayı', 'Kaçmayı']},
      {q: 'Takım oyununda başarılı olmak için ne önemlidir?', a: 'Herkesin görevini yapması', w: ['Tek kişinin oynaması', 'Kuralları bozmak', 'Diğerlerini yermek', 'Sıra beklememek']},
    ],
  }),
  textTopic({
    id: '2-be-temizlik', unit: BE, name: 'Kişisel temizlik', symbol: '🧼', summary: 'Spor sonrası temizliğin önemini öğren',
    intro: 'Spor yaptıktan sonra terlerimizi kurulamak ve temizlenmek sağlığımız için önemlidir.',
    paras: ['Spor sonrası temiz kıyafet giymek ve su içmek vücut sağlığını korur.'],
    tip: 'Spor sonrası temizlenmek hem sağlık hem de hijyen açısından gereklidir.',
    more: {
      sections: [
        {title: 'Kişisel temizlik', paras: ['Düzenli el yıkamak, dişleri fırçalamak ve tırnakları kesik tutmak kişisel temizliğin temelidir.', 'Düzenli duş almak ve temiz giysiler giymek de vücudumuzu sağlıklı tutar.'], tip: 'Temizlik alışkanlıklarını her gün aynı saatte yapmak onları kolaylaştırır.'},
      ],
      examples: [
        {problem: 'Ellerimizi ne zaman yıkamalıyız?', steps: ['Yemek yemeden önce mikroplar ellerimize bulaşmış olabilir.', 'Yemekten önce ellerimizi yıkamalıyız.'], answer: 'Yemekten önce'},
        {problem: 'Tırnaklarımızı nasıl tutmalıyız?', steps: ['Uzun tırnaklarda kir ve mikrop birikir.', 'Tırnakları kısa ve temiz tutmalıyız.'], answer: 'kısa ve temiz'},
      ],
    },
    items: [
      {q: 'Spor sonrası ne yapmak sağlık açısından iyidir?', a: 'Temizlenmek', w: ['Hemen yatmak', 'Sıcak yemek yemek', 'Hiç su içmemek', 'Kirli kalmak']},
      {q: 'Spor sonrası hangi içecek vücudu destekler?', a: 'Su', w: ['Kola', 'Gazlı içecek', 'Kahve', 'Enerji içeceği']},
    ],
  }),
];
