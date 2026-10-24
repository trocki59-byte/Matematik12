// 2. sınıf: Türkçe, Hayat Bilgisi, Müzik, Görsel Sanatlar, Beden Eğitimi.
// Metin tabanlı konular: her madde {q, a, w}; w tam 4 yanlış seçenek içerir.

function textTopic({id, unit, name, symbol, summary, intro, paras, tip, items}) {
  return {
    id, grade: 2, unit, name, symbol, summary, kind: 'text',
    lesson: {intro, sections: [
      {title: name, paras, tip},
      {
        title: 'Örneklerle',
        paras: ['Aşağıdaki örnekler konuyu pekiştirmek için hazırlanmıştır. Her birini kendin çözmeye çalış, sonra cevaba bak.'],
        examples: items.slice(0, 3).map(it => ({problem: it.q, steps: ['Soruyu dikkatlice oku.', 'Seçenekleri tek tek değerlendir.', `Doğru cevap: ${it.a}`], answer: it.a})),
      },
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
    items: [
      {q: 'Spor sonrası ne yapmak sağlık açısından iyidir?', a: 'Temizlenmek', w: ['Hemen yatmak', 'Sıcak yemek yemek', 'Hiç su içmemek', 'Kirli kalmak']},
      {q: 'Spor sonrası hangi içecek vücudu destekler?', a: 'Su', w: ['Kola', 'Gazlı içecek', 'Kahve', 'Enerji içeceği']},
    ],
  }),
];
