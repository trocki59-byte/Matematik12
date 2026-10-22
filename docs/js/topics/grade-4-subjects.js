// 4. sınıf: Türkçe, Hayat Bilgisi, Müzik, Görsel Sanatlar, Beden Eğitimi.
// Metin tabanlı konular: her madde {q, a, w}; w tam 4 yanlış seçenek içerir.

function textTopic({id, unit, name, symbol, summary, intro, paras, tip, items}) {
  return {
    id, grade: 4, unit, name, symbol, summary, kind: 'text',
    lesson: {intro, sections: [{title: name, paras, tip}]},
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
    items: [
      {q: 'Müziğin ritmine uygun yapılan hareketlere ne denir?', a: 'Ritmik hareket', w: ['Yavaş yürüyüş', 'Serbest uyku', 'Hızlı koşu', 'Sessiz duruş']},
      {q: 'Ritmik hareketler hangi beceriyi geliştirir?', a: 'Koordinasyon', w: ['Uyku', 'Yemek', 'Sessizlik', 'Yalnızlık']},
    ],
  }),
];
