// 4. sınıf: Türkçe, Hayat Bilgisi, Müzik, Görsel Sanatlar, Beden Eğitimi.
// Metin tabanlı konular: her madde {q, a, w}; w tam 4 yanlış seçenek içerir.

function textTopic({id, unit, name, symbol, summary, intro, paras, tip, items, more}) {
  const extra = more?.sections ?? [];
  const examples = more?.examples ?? items.slice(0, 3).map(it => ({problem: it.q, steps: ['Soruyu dikkatlice oku.', 'Seçenekleri tek tek değerlendir.', `Doğru cevap: ${it.a}`], answer: it.a}));
  return {
    id, grade: 4, unit, name, symbol, summary, kind: 'text',
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
    id: '4-tr-ozne', unit: TR, name: 'Özne ve yüklem', symbol: 'Ö/Y', summary: 'Cümlenin öznesini ve yüklemini bul',
    intro: 'Özne, cümlede işi yapan ya da hakkında bilgi verilen kişi veya nesnedir. Yüklem ise cümlenin fiil ya da fiil görevindeki sözcüğüdür.',
    paras: ['"Ali kitabı okudu." cümlesinde özne "Ali", yüklem "okudu"dur.'],
    tip: 'Yüklemi bulmak için "ne yaptı?" ya da "ne oldu?" diye sor.',
    more: {
      sections: [
        {title: 'Özne', paras: ['Özne, cümlede işi yapan ya da hakkında bilgi verilen kişi, varlık ya da kavramdır. Özneyi bulmak için "kim" ya da "ne" sorusunu sorarız.']},
        {title: 'Yüklem', paras: ['Yüklem, cümlede işi, oluşu ya da durumu bildiren sözcüktür. Genellikle cümlenin sonunda yer alır ve fiil çekimi taşır.'], tip: 'Yüklemi bulmak için cümleye "ne yaptı" diye sor.'},
      ],
      examples: [
        {problem: 'Ali okula gitti cümlesinde özne hangisidir?', steps: ['Cümlede işi yapan kişi kimdir diye sorarız.', 'İşi yapan Ali dir.'], answer: 'Ali'},
        {problem: 'Ali okula gitti cümlesinde yüklem hangisidir?', steps: ['Ne yaptı diye sorarız.', 'Cevap gitti sözcüğüdür.'], answer: 'gitti'},
      ],
    },
    items: [
      {q: '"Kuşlar gökyüzünde uçtu." cümlesinin öznesi nedir?', a: 'Kuşlar', w: ['gökyüzünde', 'uçtu', 'gökyüzü', 'Kuşlar uçtu']},
      {q: '"Annem yemek pişirdi." cümlesinin yüklemi nedir?', a: 'pişirdi', w: ['Annem', 'yemek', 'Annem yemek', 'yemek pişirdi']},
      {q: '"Öğrenciler sınıfa girdi." cümlesinin öznesi hangisidir?', a: 'Öğrenciler', w: ['sınıfa', 'girdi', 'sınıf', 'Sınıfa girdi']},
    ],
  }),
  textTopic({
    id: '4-tr-ad-tamlama', unit: TR, name: 'Tamlamalar', symbol: 'ev-in', summary: 'Ad tamlamasını ve isim tamlamasını ayır',
    intro: 'Tamlama, iki ya da daha fazla sözcüğün birlikte bir anlam oluşturmasıdır. İsim tamlamasında belirtili ve belirtilen isimler bulunur.',
    paras: ['"Okulun bahçesi" tamlamasında "okulun" belirtili, "bahçesi" belirtilendir.'],
    tip: 'Tamlamada ilk sözcük çoğu zaman bir isim ekiyle biter.',
    more: {
      sections: [
        {title: 'Tamlama nedir?', paras: ['Tamlama, iki ya da daha fazla sözcüğün birlikte bir anlam oluşturmasıdır. Tamlamada tamlayan ve tamlanan olmak üzere iki parça bulunur.', 'Tamlayan, tamlanana ait olan ya da onu belirten sözcüktür. Tamlanan ise bu sözcüklerin asıl anlamını taşıyan parçadır.'], tip: 'Tamlayanı bulmak için "kimin" ya da "neyin" sorusunu sor.'},
      ],
      examples: [
        {problem: 'Kapının kolu tamlamasında tamlayan hangisidir?', steps: ['Kolun kime ait olduğunu sorarız: kapının.', 'Tamlayan kapının sözcüğüdür.'], answer: 'kapının'},
        {problem: 'Bahçenin çiçeği tamlamasında tamlanan hangisidir?', steps: ['Asıl anlamı taşıyan sözcük çiçeği dir.', 'Tamlanan çiçeği sözcüğüdür.'], answer: 'çiçeği'},
      ],
    },
    items: [
      {q: '"Ağacın yaprağı" ifadesinde belirtili sözcük hangisidir?', a: 'Ağacın', w: ['yaprağı', 'Ağacın yaprağı', 'ağaç', 'yaprak']},
      {q: '"Kırmızı kalem" ifadesi hangi tamlama türüne girer?', a: 'Sıfat tamlaması', w: ['İsim tamlaması', 'Fiil tamlaması', 'Zarf tamlaması', 'Cümle tamlaması']},
      {q: '"Kapının kolu" ifadesinde belirtilen sözcük hangisidir?', a: 'kolu', w: ['Kapının', 'kapı', 'Kapının kolu', 'kol']},
    ],
  }),
  textTopic({
    id: '4-tr-zit', unit: TR, name: 'Atasözleri ve deyimler', symbol: '“”', summary: 'Atasözü ile deyimi ayırt et',
    intro: 'Atasözleri, toplumun uzun denemelerden çıkardığı öğütler içeren sözlerdir. Deyimler ise bir sözcük grubunun gerçek anlamından farklı bir anlam taşıdığı ifadelerdir.',
    paras: ['"Damlaya damlaya göl olur" bir atasözüdür. "Göz boyamak" ise bir deyimdir.'],
    tip: 'Atasözleri tam bir cümle gibi öğüt verir; deyimler ise tek bir anlam ifadesidir.',
    more: {
      sections: [
        {title: 'Atasözü', paras: ['Atasözü, halkın yüzyıllardır söylediği, bir öğüt ya da bilgi taşıyan tam cümledir. Damlaya damlaya göl olur atasözü küçük çabaların birikerek büyük sonuç verdiğini anlatır.']},
        {title: 'Deyim', paras: ['Deyim, sözcüklerin gerçek anlamından farklı bir anlam kazandığı, cümlenin içinde kullanılan kalıp ifadedir. Gözü kara deyimi korkusuz anlamındadır.'], tip: 'Atasözü tam bir cümledir ve öğüt verir; deyim ise cümlenin bir parçası olarak kullanılır.'},
      ],
      examples: [
        {problem: 'Damlaya damlaya göl olur sözü hangi türdendir?', steps: ['Tam bir cümle ve öğüt taşıyor.', 'Bu nedenle atasözüdür.'], answer: 'atasözü'},
        {problem: 'Gözü kara deyiminin anlamı nedir?', steps: ['Göz kelimesinin gerçek anlamı burada geçerli değildir.', 'Deyim korkusuz, cesur anlamındadır.'], answer: 'korkusuz, cesur'},
      ],
    },
    items: [
      {q: '"Damlaya damlaya göl olur." hangi türdendir?', a: 'Atasözü', w: ['Deyim', 'Tekerleme', 'Bilmece', 'Ninni']},
      {q: '"Göz boyamak" hangi türdendir?', a: 'Deyim', w: ['Atasözü', 'Masal', 'Şiir', 'Fıkra']},
      {q: 'Hangisi bir atasözüdür?', a: 'Sabır acı, meyvesi tatlıdır.', w: ['Burnu büyük', 'Göz atmak', 'Kafa tutmak', 'Ağzı açık kalmak']},
    ],
  }),
  textTopic({
    id: '4-tr-okuma', unit: TR, name: 'Metinde anlam', symbol: '📚', summary: 'Metinden çıkarım yaparak anlamı bul',
    intro: 'Metni okurken yazılmayan ama ima edilen anlamları da bulabiliriz. Bu beceriye çıkarım denir.',
    paras: ['"Ali yağmurluğunu aldı ve dışarı çıktı." cümlesinden dışarıda yağmur yağdığı çıkarılabilir.'],
    tip: 'Metinde doğrudan yazmayan bir sonucu çıkarmak için ipuçlarına bak.',
    more: {
      sections: [
        {title: 'Ana fikir ve yardımcı fikir', paras: ['Metnin en önemli düşüncesine ana fikir denir. Ana fikri destekleyen ve açıklayan düşüncelere yardımcı fikir denir.']},
        {title: 'Çıkarım', paras: ['Metinde açıkça yazmayan ama metinden anlaşılan sonuca çıkarım denir. Çıkarım yaparken metinde verilen ipuçlarını birleştiririz.'], tip: 'Bir çıkarım yaptığında bunu hangi cümleye dayandırdığını gösterebilmelisin.'},
      ],
      examples: [
        {problem: 'Metnin en önemli düşüncesine ne ad verilir?', steps: ['Metnin en önemli düşüncesi metnin temelini oluşturur.', 'Bu düşünceye ana fikir denir.'], answer: 'ana fikir'},
        {problem: 'Metinde açıkça yazmayan ama anlaşılan sonuca ne denir?', steps: ['Metinden yola çıkarak bir sonuca varmak gerekir.', 'Bu sonuca çıkarım denir.'], answer: 'çıkarım'},
      ],
    },
    items: [
      {q: '"Ali şemsiyesini alıp kapıdan çıktı." cümlesinden ne çıkarılabilir?', a: 'Hava yağmurlu olabilir', w: ['Hava çok sıcak', 'Ali uyuyor', 'Kapı kırık', 'Okul tatil']},
      {q: '"Ayşe sınıfa girdiğinde herkes sessizce oturuyordu." cümlesinden ne anlaşılır?', a: 'Öğretmen ya da sınıf düzeni önemli', w: ['Ayşe geç kaldı', 'Sınıf boş', 'Kimse dersi dinlemiyor', 'Ayşe ağlıyordu']},
    ],
  }),
  textTopic({
    id: '4-tr-yazma', unit: TR, name: 'Yazılı anlatım', symbol: '✎', summary: 'Yazılı anlatım türlerini ve özelliklerini öğren',
    intro: 'Yazılı anlatım; kişinin duygu ve düşüncelerini kâğıda aktarmasıdır. Mektup, günlük ve dilekçe yazılı anlatım türlerindendir.',
    paras: ['Mektupta hitap, gövde ve bitiş bölümü bulunur. Günlük ise kişinin o günkü duygularını anlattığı yazıdır.'],
    tip: 'Mektup yazarken sayın ya da sevgili hitabını unutma.',
    more: {
      sections: [
        {title: 'Paragrafın bölümleri', paras: ['Bir paragraf genellikle üç bölümden oluşur: giriş, gelişme ve sonuç. Giriş konuyu tanıtır, gelişme konuyu açıklar, sonuç ise düşünceyi bağlar.', 'Paragrafın ilk cümlesine konu cümlesi denir ve paragrafın ne hakkında olduğunu söyler.'], tip: 'Bir paragraf yazmadan önce konu cümlesini belirlemek yazının düzenli olmasını sağlar.'},
      ],
      examples: [
        {problem: 'Paragrafta konuyu açıklayan bölüme ne ad verilir?', steps: ['Konu girişte tanıtılır, sonra açıklanır.', 'Açıklama yapılan bölüm gelişmedir.'], answer: 'gelişme'},
        {problem: 'Paragrafın son bölümü hangisidir?', steps: ['Paragraf giriş, gelişme ve sonuç bölümünden oluşur.', 'Son bölüm sonuç bölümüdür.'], answer: 'sonuç'},
      ],
    },
    items: [
      {q: 'Hitap, gövde ve bitiş bölümlerinden oluşan yazı türü hangisidir?', a: 'Mektup', w: ['Şiir', 'Fıkra', 'Bilmece', 'Masal']},
      {q: 'Kişinin o günkü duygu ve düşüncelerini anlattığı yazı türü hangisidir?', a: 'Günlük', w: ['Makale', 'Tiyatro', 'Dilekçe', 'Tarif']},
    ],
  }),
  textTopic({
    id: '4-tr-noktalama', unit: TR, name: 'Noktalama ve yazım', symbol: '…', summary: 'Tırnak, kesme ve kısaltma kullanımını öğren',
    intro: 'Tırnak işareti kitap, şiir ya da söz adlarını göstermek için kullanılır. Kesme işareti ise özel isimlere eklenen ekleri ayırır.',
    paras: ['"Küçük Prens" kitabını okudum. Ankara\'ya gittik.'],
    tip: 'Kitap adlarını tırnak içinde yazmak yazımı kolaylaştırır.',
    more: {
      sections: [
        {title: 'Kesme işareti', paras: ['Özel isimlere gelen ekler kesme işaretiyle ayrılır: Ankara’ya, İstanbul’da gibi. Bu kural özel isimlerin doğru okunmasını sağlar.', 'Kesme işareti özel isimlerden sonra kullanılır, cins isimlerden sonra kullanılmaz: kitaplarda gibi.'], tip: 'Özel isimlere ek getirmeden önce yazım kuralını kontrol et.'},
      ],
      examples: [
        {problem: 'Ankara ya gittik cümlesinde yanlış olan nedir? Doğrusunu yaz.', steps: ['Ankara özel isimdir.', 'Ek kesme işaretiyle ayrılır.'], answer: 'Ankara’ya'},
        {problem: 'İstanbul da yağmur yağıyor cümlesinin doğrusu nedir?', steps: ['İstanbul özel isimdir.', 'Ek kesme işaretiyle yazılır.'], answer: 'İstanbul’da'},
      ],
    },
    items: [
      {q: 'Kitap adları hangi işaretle gösterilir?', a: 'Tırnak işareti', w: ['Kesme işareti', 'Virgül', 'Üç nokta', 'Tire']},
      {q: 'Özel isimlere gelen ekler hangi işaretle ayrılır?', a: 'Kesme işareti', w: ['Tırnak işareti', 'Nokta', 'Noktalı virgül', 'Eğik çizgi']},
      {q: '"İstanbul\'a" yazımında hangi işaret kullanılmıştır?', a: 'Kesme işareti', w: ['Tırnak işareti', 'Virgül', 'Tire', 'Nokta']},
    ],
  }),

  // ---------- Hayat Bilgisi ----------
  textTopic({
    id: '4-hb-sehir', unit: HB, name: 'Türkiye\'nin coğrafi bölgeleri', symbol: '🗺', summary: 'Türkiye\'nin bölgelerini ve özelliklerini öğren',
    intro: 'Türkiye yedi coğrafi bölgeye ayrılır: Marmara, Ege, Akdeniz, İç Anadolu, Karadeniz, Doğu Anadolu ve Güneydoğu Anadolu.',
    paras: ['Karadeniz bölgesi bol yağış alır, Akdeniz bölgesinde yazlar sıcak ve kurak geçer.'],
    tip: 'Bölgelerin iklim özelliklerini hatırlamak, bitki örtüsünü anlamayı kolaylaştırır.',
    more: {
      sections: [
        {title: 'Coğrafi bölgeler', paras: ['Türkiye yedi coğrafi bölgeye ayrılır: Marmara, Ege, Akdeniz, İç Anadolu, Karadeniz, Doğu Anadolu ve Güneydoğu Anadolu.', 'Her bölgenin iklimi, bitki örtüsü ve geçim kaynakları birbirinden farklıdır.'], tip: 'Bölgeleri harita üzerinde konumlarına göre ezberlemek kolaylık sağlar.'},
      ],
      examples: [
        {problem: 'Kuzeyde denizle çevrili, yağışı çok olan bölge hangisidir?', steps: ['Kuzeyde yer alan ve yağışı bol olan kıyı bölgesi Karadeniz’dir.', 'Bu bölge Karadeniz bölgesidir.'], answer: 'Karadeniz'},
        {problem: 'Zeytin ağaçlarının yoğun olduğu ve Ege kıyılarında yer alan bölge hangisidir?', steps: ['Zeytin ağaçları Ege kıyılarında yoğundur.', 'Bu bölge Ege bölgesidir.'], answer: 'Ege'},
      ],
    },
    items: [
      {q: 'Türkiye\'de kaç coğrafi bölge vardır?', a: '7', w: ['5', '6', '8', '9']},
      {q: 'Bol yağış alan bölge hangisidir?', a: 'Karadeniz', w: ['Akdeniz', 'Güneydoğu Anadolu', 'İç Anadolu', 'Doğu Anadolu']},
      {q: 'Yazları sıcak ve kurak geçen bölge hangisidir?', a: 'Akdeniz', w: ['Karadeniz', 'Doğu Anadolu', 'Marmara', 'Ege']},
    ],
  }),
  textTopic({
    id: '4-hb-tarim', unit: HB, name: 'Üretim ve tüketim', symbol: '🌾', summary: 'Üretim, tüketim ve tarımın önemini öğren',
    intro: 'Üretim, mal ve hizmet oluşturmaktır. Tüketim ise bu malları ve hizmetleri kullanmaktır.',
    paras: ['Çiftçi buğday üretir; fırın bu buğdayla ekmek üretir; biz ekmeği tüketiriz.'],
    tip: 'Bir ürünün hangi aşamada üretildiğini ve kimin tükettiğini düşün.',
    more: {
      sections: [
        {title: 'Üretim', paras: ['Üretim, doğal kaynakların ya da emeğin kullanılarak mal ve hizmet oluşturulmasıdır. Tarım, hayvancılık ve sanayi üretim türlerine örnektir.']},
        {title: 'Tüketim', paras: ['Tüketim, üretilen malların ve hizmetlerin kullanılmasıdır. Ürünleri satın alıp kullanan kişiler tüketicidir.'], tip: 'Bir ürünü üretenle onu kullanan arasındaki farkı düşün: biri üretici, diğeri tüketicidir.'},
      ],
      examples: [
        {problem: 'Ürün yetiştiren kişiye ne ad verilir?', steps: ['Ürünü üreten kişi üreticidir.', 'Bu kişi üreticidir.'], answer: 'üretici'},
        {problem: 'Satın alıp kullanan kişiye ne ad verilir?', steps: ['Malı kullanan kişi tüketicidir.', 'Bu kişi tüketicidir.'], answer: 'tüketici'},
      ],
    },
    items: [
      {q: 'Mal ya da hizmet oluşturmaya ne denir?', a: 'Üretim', w: ['Tüketim', 'Tasarruf', 'Ticaret', 'Borç']},
      {q: 'Ürünleri kullanmaya ne denir?', a: 'Tüketim', w: ['Üretim', 'Kredi', 'Vergi', 'İhracat']},
      {q: 'Buğdayı üreten kişi hangi meslektedir?', a: 'Çiftçi', w: ['Terzi', 'Pilot', 'Doktor', 'Berber']},
    ],
  }),
  textTopic({
    id: '4-hb-demokrasi', unit: HB, name: 'Demokrasi ve seçim', symbol: '🗳', summary: 'Demokrasinin temel ilkelerini öğren',
    intro: 'Demokrasi, yönetimde son sözün halkın olduğu yönetim biçimidir. Seçim ise halkın temsilcilerini belirlediği süreçtir.',
    paras: ['Türkiye\'de 18 yaşını dolduran vatandaşlar seçimlerde oy kullanabilir.'],
    tip: 'Demokraside herkesin fikrine saygı göstermek esastır.',
    more: {
      sections: [
        {title: 'Demokrasi nedir?', paras: ['Demokrasi, yönetimin halkın seçtiği temsilciler aracılığıyla halka ait olduğu yönetim biçimidir. Halkın yönetime katılması demokrasinin temelidir.']},
        {title: 'Seçim ve oy', paras: ['Seçimlerde oy kullanarak temsilcilerimizi belirleriz. Oy kullanma hakkına seçme hakkı denir. Bu hak her seçmen için eşittir.'], tip: 'Bir seçimde hangi temsilciyi istediğine kendin karar verirsin; bu önemli bir haktır.'},
      ],
      examples: [
        {problem: 'Halkın seçtiği temsilcilerle yönetildiği yönetim biçimi nedir?', steps: ['Yönetimin halka dayandığı sisteme bakarız.', 'Bu yönetim biçimi demokrasidir.'], answer: 'demokrasi'},
        {problem: 'Seçimlerde oy kullanma hakkına ne ad verilir?', steps: ['Oy vermek bir haktır.', 'Bu hakkın adı seçme hakkıdır.'], answer: 'seçme hakkı'},
      ],
    },
    items: [
      {q: 'Yönetimde son sözün halkın olduğu sisteme ne denir?', a: 'Demokrasi', w: ['Monarşi', 'Diktatörlük', 'Oligarşi', 'Krallık']},
      {q: 'Türkiye\'de seçimlerde oy kullanmak için kaç yaş gerekir?', a: '18', w: ['15', '16', '21', '25']},
      {q: 'Halkın temsilcilerini belirlediği sürece ne denir?', a: 'Seçim', w: ['Tatil', 'Yarışma', 'Kampanya', 'Anket']},
    ],
  }),
  textTopic({
    id: '4-hb-kulturel', unit: HB, name: 'Kültürel miras', symbol: '🏺', summary: 'Kültürel mirasın ne olduğunu ve korunmasını öğren',
    intro: 'Kültürel miras, geçmişten bugüne aktarılan tarihî yapılar, sanat eserleri, gelenek ve görenekleri kapsar.',
    paras: ['Efes Antik Kenti, Mevlana Müzesi ve geleneksel bayramlarımız kültürel mirasımızdır.'],
    tip: 'Kültürel mirasımızı korumak için tarihî yerlere zarar vermemeliyiz.',
    more: {
      sections: [
        {title: 'Kültürel miras', paras: ['Kültürel miras, geçmişten bugüne aktarılan ve korunması gereken değerlerdir. Tarihi yapılar, el sanatları ve türküler kültürel mirasın parçalarıdır.', 'Maddi kültürel miras, somut yapılar ve eserlerdir. Maddi olmayan kültürel miras ise türkü, masal ve gelenekler gibi yaşatılan değerlerdir.'], tip: 'Bir mirası korumanın en iyi yolu onu bilmek ve başkalarına anlatmaktır.'},
      ],
      examples: [
        {problem: 'Efes gibi tarihi kalıntılar hangi kültürel miras türüne girer?', steps: ['Efes somut bir tarihi yapıdır.', 'Bu nedenle maddi kültürel miras kapsamındadır.'], answer: 'maddi kültürel miras'},
        {problem: 'Türküler hangi kültürel miras türüne girer?', steps: ['Türküler somut bir yapı değildir.', 'Yaşatılan bir değer olduğu için maddi olmayan kültürel mirastır.'], answer: 'maddi olmayan kültürel miras'},
      ],
    },
    items: [
      {q: 'Geçmişten bugüne aktarılan tarihî ve kültürel değerlere ne denir?', a: 'Kültürel miras', w: ['Ekonomik kaynak', 'Doğal afet', 'Nüfus', 'Sanayi']},
      {q: 'Hangisi kültürel mirasa örnektir?', a: 'Efes Antik Kenti', w: ['Yeni açılan alışveriş merkezi', 'Modern fabrika', 'Yeni bir oyun', 'Otoyol']},
    ],
  }),
  textTopic({
    id: '4-hb-finans', unit: HB, name: 'Para ve tasarruf', symbol: '💰', summary: 'Parayı bilinçli kullanmanın yollarını öğren',
    intro: 'Para, mal ve hizmet alışverişinde kullanılan ödeme aracıdır. Tasarruf, gelirin bir kısmını ileride kullanmak için ayırmaktır.',
    paras: ['Harçlığını biriktiren bir öğrenci tasarruf yapmış olur.'],
    tip: 'İhtiyaç ile isteği ayırt ederek harcama yapmak tasarrufa yardım eder.',
    more: {
      sections: [
        {title: 'Tasarruf', paras: ['Tasarruf, gelirin bir kısmını harcamadan ayırıp biriktirmektir. Gelecekte ihtiyaç duyabileceğimiz şeyler için tasarruf yaparız.']},
        {title: 'Bütçe', paras: ['Bütçe, gelir ve giderlerin bir plan dahilinde düzenlenmesidir. Bütçe yaparak harcamalarımızı kontrol edebiliriz.'], tip: 'Harcamadan önce ihtiyaç mı istek mi olduğunu düşün; bu tasarrufun ilk adımıdır.'},
      ],
      examples: [
        {problem: 'Gelirden harcamadan ayırıp biriktirmeye ne ad verilir?', steps: ['Gelirin bir kısmını ileride kullanmak için ayırırız.', 'Bu davranışa tasarruf denir.'], answer: 'tasarruf'},
        {problem: 'Gelir ve giderleri bir plana göre düzenlemeye ne ad verilir?', steps: ['Harcamaları planlamak için bir düzen kurarız.', 'Bu düzene bütçe denir.'], answer: 'bütçe'},
      ],
    },
    items: [
      {q: 'Gelirin bir kısmını ileride kullanmak için ayırmaya ne denir?', a: 'Tasarruf', w: ['Borçlanma', 'İsraf', 'Harcama', 'Vergi']},
      {q: 'Mal ve hizmet alışverişinde kullanılan ödeme aracına ne denir?', a: 'Para', w: ['Kredi kartı', 'Fatura', 'Kambiyo', 'Çek defteri']},
      {q: 'Tasarruf yapmanın yollarından biri hangisidir?', a: 'İhtiyaçları isteklerden ayırmak', w: ['Her şeyi hemen almak', 'Borçlanmak', 'İsrafa yönelmek', 'Her gün yeni oyuncak almak']},
    ],
  }),

  // ---------- Müzik ----------
  textTopic({
    id: '4-mu-makam', unit: MU, name: 'Makam ve gam', symbol: '♫', summary: 'Makam ve gam kavramlarını öğren',
    intro: 'Gam, belirli sıraya göre dizilmiş notalar topluluğudur. Makam ise bir gamın melodik kurallarla kullanılmasıyla oluşan yapıdır.',
    paras: ['Türk müziğinde en bilinen makamlardan biri Hicaz\'dır.'],
    tip: 'Makamlar farklı duygular verir; dinlerken sesin tonuna dikkat et.',
    more: {
      sections: [
        {title: 'Makam nedir?', paras: ['Makam, Türk müziğinde belirli sesler ve ezgi kurallarından oluşan ses dizisidir. Her makamın kendine özgü bir duygu ve rengi vardır.']},
        {title: 'Gam', paras: ['Gam, bir ses dizisinin sesleri sırayla dizilmiş halidir. Batı müziğinde majör ve minör gamlar kullanılır.'], tip: 'Bir makamı dinlerken hangi duyguyu uyandırdığına dikkat etmek makamı tanımanı kolaylaştırır.'},
      ],
      examples: [
        {problem: 'Türk müziğinde ses dizilerine ne ad verilir?', steps: ['Belirli seslerden oluşan Türk müziği dizisi makamdır.', 'Bu diziye makam denir.'], answer: 'makam'},
        {problem: 'Sesleri sırayla dizilmiş ses dizisi için hangi kavram kullanılır?', steps: ['Sesleri sırayla sıralayan dizi gamdır.', 'Bu kavram gamdır.'], answer: 'gam'},
      ],
    },
    items: [
      {q: 'Belirli sıraya göre dizilmiş notalar topluluğuna ne denir?', a: 'Gam', w: ['Ölçü', 'Ritim', 'Vurgu', 'Tempo']},
      {q: 'Türk müziğinde bilinen makamlardan biri hangisidir?', a: 'Hicaz', w: ['Do majör', 'Fa minör', 'Sol anahtarı', 'Mi bemol']},
      {q: 'Melodik kurallarla oluşan yapıya ne denir?', a: 'Makam', w: ['Gam', 'Nota', 'Ölçü', 'Vuruş']},
    ],
  }),
  textTopic({
    id: '4-mu-nota', unit: MU, name: 'Nota süreleri', symbol: '♩', summary: 'Nota değerlerini ve sürelerini öğren',
    intro: 'Notalar farklı süreye sahiptir. Dörtlük nota bir zaman, sekizlik nota yarım zaman sürer.',
    paras: ['İki sekizlik nota bir dörtlük nota ile aynı süreyi tutar.'],
    tip: 'Nota süresini hatırlamak için notaları alkışla çal.',
    more: {
      sections: [
        {title: 'Nota süreleri', paras: ['Notalar farklı sürelerde çalınır. Yuvarlak nota en uzun, dörtlük nota ise bir vuruş süresindedir. İkilik nota iki vuruş, sekizlik nota yarım vuruş sürer.', 'Onaltılık nota ise çok kısa bir süreyi ifade eder.'], tip: 'Bir notanın süresini, ölçü içinde kaç vuruş aldığını sayarak bulabilirsin.'},
      ],
      examples: [
        {problem: '4/4 ölçüde bir dörtlük nota kaç vuruş alır?', steps: ['Dörtlük nota bir vuruş sürer.', 'Bu nedenle bir vuruş alır.'], answer: '1'},
        {problem: 'İki sekizlik nota bir dörtlük nota ile eşittir. Bu nedenle bir dörtlük nota kaç sekizliğe eşittir?', steps: ['Bir sekizlik yarım vuruştur.', 'İki sekizlik bir vuruş yapar, dörtlük nota da bir vuruştur.'], answer: '2'},
      ],
    },
    items: [
      {q: 'Dörtlük nota kaç zaman sürer?', a: '1', w: ['2', '1/2', '4', '3']},
      {q: 'Sekizlik nota kaç zaman sürer?', a: '1/2', w: ['1', '2', '4', '1/4']},
      {q: 'İki sekizlik nota kaç dörtlük nota ile eşittir?', a: '1', w: ['2', '3', '4', '1/2']},
    ],
  }),
  textTopic({
    id: '4-mu-halkoyun', unit: MU, name: 'Halk oyunları', symbol: '💃', summary: 'Halk oyunlarının özelliklerini öğren',
    intro: 'Halk oyunları, toplumun sevinç ve kutlamalarında yapılan, ritim ve düzen üzerine kurulu topluluk danslarıdır.',
    paras: ['Zeybek, halay ve horon Türkiye\'nin bilinen halk oyunlarındandır.'],
    tip: 'Her halk oyununun kendi bölgesine özgü adımları ve müziği vardır.',
    more: {
      sections: [
        {title: 'Halk oyunları', paras: ['Halk oyunları, her bölgenin kültürünü yansıtan dans türleridir. Horon Karadeniz bölgesinin, zeybek Ege bölgesinin en bilinen halk oyunlarındandır.', 'Halay ise birçok bölgede el ele tutuşarak oynanan bir halk oyunudur.'], tip: 'Bir halk oyununu izlerken adımlarına ve müziğine dikkat et; bölgeyi anlamanın yolu budur.'},
      ],
      examples: [
        {problem: 'Karadeniz bölgesinin halk oyunu hangisidir?', steps: ['Karadeniz bölgesinin en bilinen oyunu horondur.', 'Bu bölgenin halk oyunu horondur.'], answer: 'horon'},
        {problem: 'Ege bölgesinin en bilinen halk oyunu hangisidir?', steps: ['Ege bölgesinde zeybek oynanır.', 'Bu oyun zeybektir.'], answer: 'zeybek'},
      ],
    },
    items: [
      {q: 'Hangisi Türkiye\'nin bilinen halk oyunlarından biridir?', a: 'Horon', w: ['Tango', 'Vals', 'Salsa', 'Flamenko']},
      {q: 'Halk oyunları hangi amaçla oynanır?', a: 'Kutlama ve sevinç için', w: ['Savaş için', 'Sadece sınav için', 'Uyumak için', 'Kavga için']},
      {q: 'Halk oyunlarında en önemli öğe nedir?', a: 'Ritim ve düzen', w: ['Sessizlik', 'Karanlık', 'Yalnız hareket', 'Hızlı koşu']},
    ],
  }),

  // ---------- Görsel Sanatlar ----------
  textTopic({
    id: '4-gs-tasarim', unit: GS, name: 'Tasarım ilkeleri', symbol: '▥', summary: 'Denge, orantı ve vurgu gibi tasarım ilkelerini öğren',
    intro: 'Tasarımda denge, orantı, vurgu ve birlik gibi ilkeler kullanılır. Bu ilkeler estetik bir ürün ortaya çıkarmaya yardım eder.',
    paras: ['Simetrik bir tasarım dengeli görünür. Vurgu ise dikkat çeken bir öğe ile sağlanır.'],
    tip: 'Bir tasarımda hangi öğenin ilk dikkati çektiğine bakarak vurguyu değerlendir.',
    more: {
      sections: [
        {title: 'Tasarım ilkeleri', paras: ['Tasarımda denge, uyum, vurgu ve birlik gibi ilkeler kullanılır. Denge, öğelerin dengeli yerleştirilmesidir. Vurgu ise bir öğenin dikkat çekmesini sağlar.', 'Uyum, öğelerin birbiriyle tutarlı olmasıdır. Birlik ise tasarımın bütün bir parça gibi görünmesidir.'], tip: 'Bir tasarımı değerlendirirken önce neyin ilk dikkat çektiğine bak.'},
      ],
      examples: [
        {problem: 'Öğelerin dengeli yerleşimine ne ad verilir?', steps: ['Öğelerin dengeli yerleştirilmesi bir ilkedir.', 'Bu ilke dengedir.'], answer: 'denge'},
        {problem: 'Tasarımda bir öğenin dikkat çekmesini sağlayan ilke hangisidir?', steps: ['Dikkat çeken öğe bir ilkeyle vurgulanır.', 'Bu ilke vurgudur.'], answer: 'vurgu'},
      ],
    },
    items: [
      {q: 'Tasarımda öğelerin birbirine göre büyüklük ilişkisine ne denir?', a: 'Orantı', w: ['Renk', 'Doku', 'Çizgi', 'Nokta']},
      {q: 'Dikkat çeken öğenin oluşturduğu ilkeye ne denir?', a: 'Vurgu', w: ['Orantı', 'Birlik', 'Denge', 'Desen']},
      {q: 'Simetrik bir tasarım hangi ilkeyi sağlar?', a: 'Denge', w: ['Vurgu', 'Orantı', 'Doku', 'Ritim']},
    ],
  }),
  textTopic({
    id: '4-gs-optik', unit: GS, name: 'Işık ve gölge', symbol: '☀', summary: 'Işık ve gölgenin resimde nasıl kullanıldığını öğren',
    intro: 'Işık ve gölge, nesnelerin üç boyutlu görünmesini sağlar. Işığın geldiği yönde açık, karşı yönde koyu tonlar oluşur.',
    paras: ['Bir küreyi ışığın sağ tarafından aydınlattığımızda, sağ yüzü açık, sol yüzü koyu görünür.'],
    tip: 'Gölgeyi çizerken ışığın geldiği yönü belirle.',
    more: {
      sections: [
        {title: 'Işık ve gölge', paras: ['Işık bir kaynaktan çıkıp nesnelere ulaşır. Işığın bir nesne tarafından engellenmesiyle gölge oluşur.', 'Işığın geldiği yönün tersinde gölge oluşur ve ışık kaynağı değiştikçe gölgenin yönü de değişir.'], tip: 'Bir gölgeyi çizerken ışık kaynağının nerede olduğunu düşünmek gerekir.'},
      ],
      examples: [
        {problem: 'Gölge nasıl oluşur?', steps: ['Işık bir nesneye çarparsa geçemez.', 'Işığın engellenmesiyle gölge oluşur.'], answer: 'ışığın bir nesne tarafından engellenmesiyle'},
        {problem: 'Işık kaynağının karşısında duran bir nesnenin arkasında ne oluşur?', steps: ['Nesne ışığı engeller.', 'Nesnenin arkasında ışık ulaşmaz ve gölge oluşur.'], answer: 'gölge'},
      ],
    },
    items: [
      {q: 'Nesnelerin üç boyutlu görünmesini sağlayan öğeler hangileridir?', a: 'Işık ve gölge', w: ['Renk ve çizgi', 'Doku ve desen', 'Boşluk ve kenar', 'Hiçbiri']},
      {q: 'Işığın geldiği yönde oluşan ton nasıldır?', a: 'Açık', w: ['Koyu', 'Siyah', 'Gri', 'Renksiz']},
    ],
  }),
  textTopic({
    id: '4-gs-sanat', unit: GS, name: 'Sanat akımları', symbol: '🖼', summary: 'Bazı sanat akımlarını ve temel özelliklerini öğren',
    intro: 'Sanat akımları, belirli dönemlerde ortaya çıkan ve benzer özellikler taşıyan sanat anlayışlarıdır.',
    paras: ['İzlenimcilik ışığın değişimini yakalamaya çalışır. Empresyonizm ise izlenimciliğin diğer adıdır.'],
    tip: 'Bir sanat akımını tanımak için ressamın eserindeki renk ve fırça kullanımına bak.',
    more: {
      sections: [
        {title: 'Sanat akımları', paras: ['Sanat akımı, belirli bir dönemde ortak bir anlayışla eserler veren sanatçıların oluşturduğu harekettir. Rönesans, insan ve doğaya ilgiyi öne çıkarmıştır.', 'Empresyonizm ise ışığı ve anlık izlenimleri yakalamaya odaklanmıştır.'], tip: 'Bir tabloya bakarken fırça darbelerine ve renklere dikkat ettiğinde akımını tahmin edebilirsin.'},
      ],
      examples: [
        {problem: 'Mona Lisa tablosunun ressamı kimdir?', steps: ['Mona Lisa Rönesans döneminin ünlü tablosudur.', 'Bu tabloyu Leonardo da Vinci yapmıştır.'], answer: 'Leonardo da Vinci'},
        {problem: 'Işığı ve anlık izlenimleri yakalamaya odaklanan akım hangisidir?', steps: ['Anlık ışık etkilerini yakalamak bu akımın özelliğidir.', 'Bu akım empresyonizmdir.'], answer: 'empresyonizm'},
      ],
    },
    items: [
      {q: 'Işığın değişimini yakalamaya çalışan sanat akımı hangisidir?', a: 'İzlenimcilik', w: ['Kübizm', 'Sürrealizm', 'Dadaizm', 'Art Deco']},
      {q: 'Hangi sanat akımı rüya ve bilinçaltı görüntülerini konu alır?', a: 'Sürrealizm', w: ['İzlenimcilik', 'Klasisizm', 'Romantizm', 'Realizm']},
    ],
  }),

  // ---------- Beden Eğitimi ----------
  textTopic({
    id: '4-be-hiz', unit: BE, name: 'Hız ve çeviklik', symbol: '⚡', summary: 'Hız ve çeviklik becerilerini öğren',
    intro: 'Hız, kısa sürede yer değiştirebilme becerisidir. Çeviklik ise vücudu hızlı ve yönünü değiştirerek hareket ettirebilmektir.',
    paras: ['Zikzak koşu, çeviklik çalışmasına örnektir.'],
    tip: 'Hız ve çeviklik çalışmalarını ısınmadan sonra yapmak daha güvenlidir.',
    more: {
      sections: [
        {title: 'Hız', paras: ['Hız, kısa bir mesafeyi en kısa sürede kat edebilme becerisidir. Kısa mesafe koşularına sprint denir.']},
        {title: 'Çeviklik', paras: ['Çeviklik, vücudun hızlı ve doğru biçimde yön değiştirebilme becerisidir. Çevik bir vücut, ani hareketlere kolayca uyum sağlar.'], tip: 'Hız ve çeviklik çalışmalarını ısınmadan sonra yapmak sakatlanmayı önler.'},
      ],
      examples: [
        {problem: 'Kısa mesafede hızlı koşuya ne ad verilir?', steps: ['Kısa mesafeyi çok hızlı koşmak sprint’tir.', 'Bu koşuya sprint denir.'], answer: 'sprint'},
        {problem: 'Çeviklik neyi ifade eder?', steps: ['Çeviklik hızlı yön değiştirebilmeyi anlatır.', 'Bu beceri hızlı ve doğru yön değiştirmedir.'], answer: 'hızlı ve doğru yön değiştirebilme'},
      ],
    },
    items: [
      {q: 'Kısa sürede yer değiştirme becerisine ne denir?', a: 'Hız', w: ['Esneklik', 'Denge', 'Dayanıklılık', 'Güç']},
      {q: 'Zikzak koşu hangi beceriyi geliştirir?', a: 'Çeviklik', w: ['Esneklik', 'Dayanıklılık', 'Güç', 'Uyku']},
    ],
  }),
  textTopic({
    id: '4-be-takim2', unit: BE, name: 'Fair play', symbol: '🏅', summary: 'Sportmenlik ve adil oyun anlayışını öğren',
    intro: 'Fair play, sporda kurallara uymak, rakibe saygı göstermek ve adil oynamak anlamına gelir.',
    paras: ['Rakibin kazanmasını kabul etmek ve sonucu sportmence karşılamak fair play anlayışının parçasıdır.'],
    tip: 'Kaybettiğinde de rakibini tebrik etmek sporcu olmanın bir gereğidir.',
    more: {
      sections: [
        {title: 'Fair play', paras: ['Fair play, sporda kurallara uymak, rakibe saygı göstermek ve adil oynamak anlayışıdır. Kazanmak kadar, adil kazanmak da önemlidir.']},
        {title: 'Hakem ve rakip', paras: ['Hakemin kararlarını saygıyla kabul ederiz. Rakibimizi küçümsemeden ve kötü davranmadan mücadele ederiz.'], tip: 'Rakibini kutlamak, fair play anlayışının en güzel örneğidir.'},
      ],
      examples: [
        {problem: 'Kurallara uyma ve rakibe saygı ilkesine ne ad verilir?', steps: ['Sporda adil oynamayı anlatan ilke fair play dir.', 'Bu ilkenin adı fair play’dir.'], answer: 'fair play'},
        {problem: 'Hakemin verdiği bir karara nasıl davranmalıyız?', steps: ['Hakem oyunun kurallarını uygulayan kişidir.', 'Kararlarını saygıyla kabul etmeliyiz.'], answer: 'saygıyla kabul etmek'},
      ],
    },
    items: [
      {q: 'Sporda adil oyun anlayışına ne denir?', a: 'Fair play', w: ['Hile', 'Kaba oyun', 'Rekabet dışı', 'Tek başına oyun']},
      {q: 'Rakibin kazanmasını kabul etmek neyi gösterir?', a: 'Sportmenlik', w: ['Tembellik', 'Hile', 'Korkaklık', 'Kavga']},
    ],
  }),
  textTopic({
    id: '4-be-ritim', unit: BE, name: 'Ritmik hareketler', symbol: '🎵', summary: 'Müzikle uyumlu hareket becerisini öğren',
    intro: 'Ritmik hareketler, müziğin ritmine uygun olarak yapılan hareketlerdir ve koordinasyonu geliştirir.',
    paras: ['Müziğe uygun el çırpma ve adım atma koordinasyon becerisini geliştirir.'],
    tip: 'Müzik başladığında ritmi önce dinleyip sonra harekete geç.',
    more: {
      sections: [
        {title: 'Ritmik hareket', paras: ['Ritmik hareketler, müzik eşliğinde düzenli ve tekrarlı biçimde yapılan hareketlerdir. Müziğin ritmiyle uyum içinde hareket etmek koordinasyonu geliştirir.']},
        {title: 'Koordinasyon', paras: ['Koordinasyon, vücudun farklı bölümlerinin birlikte ve uyumlu çalışmasıdır. Müziğe göre yapılan hareketler bu becerinin gelişmesine yardım eder.'], tip: 'Önce müziğin ritmini ayaklarınla vurarak tutmayı dene, sonra hareketleri ekle.'},
      ],
      examples: [
        {problem: 'Müzik eşliğinde düzenli ve tekrarlı yapılan hareketlere ne ad verilir?', steps: ['Müzikle uyumlu tekrarlı hareketler ritmiktir.', 'Bu hareketlere ritmik hareket denir.'], answer: 'ritmik hareket'},
        {problem: 'Vücut bölümlerinin uyumlu çalışmasına ne denir?', steps: ['Farklı vücut bölümlerinin birlikte çalışması bir beceridir.', 'Bu beceriye koordinasyon denir.'], answer: 'koordinasyon'},
      ],
    },
    items: [
      {q: 'Müziğin ritmine uygun yapılan hareketlere ne denir?', a: 'Ritmik hareket', w: ['Yavaş yürüyüş', 'Serbest uyku', 'Hızlı koşu', 'Sessiz duruş']},
      {q: 'Ritmik hareketler hangi beceriyi geliştirir?', a: 'Koordinasyon', w: ['Uyku', 'Yemek', 'Sessizlik', 'Yalnızlık']},
    ],
  }),
];
