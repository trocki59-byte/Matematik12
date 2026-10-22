// 7. sınıf: Türkçe, Fen Bilimleri, Sosyal Bilgiler, İngilizce, Din Kültürü, Görsel Sanatlar, Müzik, Beden Eğitimi.
// Metin tabanlı konular: her madde {q, a, w}; w tam 4 yanlış seçenek içerir.

function textTopic({id, unit, name, symbol, summary, intro, paras, tip, items}) {
  return {
    id, grade: 7, unit, name, symbol, summary, kind: 'text',
    lesson: {intro, sections: [{title: name, paras, tip}]},
    gen(rnd) {
      const it = items[rnd(0, items.length - 1)];
      return {text: it.q, answerText: it.a, wrong: it.w, steps: [`Doğru cevap: ${it.a}`]};
    },
  };
}

const TR = 'Türkçe';
const FEN = 'Fen Bilimleri';
const SOS = 'Sosyal Bilgiler';
const EN = 'İngilizce';
const DIN = 'Din Kültürü';
const GS = 'Görsel Sanatlar';
const MU = 'Müzik';
const BE = 'Beden Eğitimi';

export default [
  // ---------- Türkçe ----------
  textTopic({
    id: '7-tr-zamir', unit: TR, name: 'Zamirler', symbol: 'o', summary: 'Kişi, işaret ve belirtme zamirlerini ayır',
    intro: 'Zamirler, isimlerin yerine kullanılan sözcüklerdir. Kişi zamirleri (ben, sen, o), işaret zamirleri (bu, şu, o) gibi türleri vardır.',
    paras: ['"Ahmet geldi. O çok yorgundu." cümlesinde "o" kişi zamiridir ve Ahmet\'in yerine kullanılmıştır.'],
    tip: 'Bir zamirin hangi ismin yerine kullanıldığını bulmak anlamı kavramayı kolaylaştırır.',
    items: [
      {q: '"Biz yarın geleceğiz." cümlesindeki zamir hangisidir?', a: 'Biz', w: ['Yarın', 'Gelecek', 'Geleceğiz', 'Yarın geleceğiz']},
      {q: 'Hangisi işaret zamiridir?', a: 'Bu', w: ['Ben', 'Sen', 'Biz', 'Onlar']},
      {q: 'Hangi cümlede kişi zamiri kullanılmıştır?', a: 'Sen gelir misin?', w: ['Gelecek hafta.', 'Ağaç büyük.', 'Kitap okudu.', 'Çok güzel.']},
    ],
  }),
  textTopic({
    id: '7-tr-edat', unit: TR, name: 'Edatlar ve bağlaçlar', symbol: 'ile', summary: 'Edat ve bağlaçların cümledeki görevini öğren',
    intro: 'Edatlar ve bağlaçlar cümlede sözcükleri ya da cümleleri birbirine bağlayan yardımcı sözcüklerdir.',
    paras: ['"Kitapla birlikte kalemi de getir." cümlesinde "ile" bir edattır. "ve", "ama", "çünkü" ise bağlaçlardır.'],
    tip: 'Bağlaçlar cümleleri birbirine, edatlar ise sözcükleri birbirine bağlar.',
    items: [
      {q: 'Hangisi bir bağlaçtır?', a: 've', w: ['için', 'kadar', 'gibi', 'ile']},
      {q: '"Hava soğuk, ama güneşli." cümlesindeki bağlaç hangisidir?', a: 'ama', w: ['hava', 'soğuk', 'güneşli', 'güneş']},
      {q: 'Hangi sözcük bir edattır?', a: 'için', w: ['ve', 'çünkü', 'ama', 'ya da']},
    ],
  }),
  textTopic({
    id: '7-tr-hikaye-ogeleri', unit: TR, name: 'Hikâye unsurları', symbol: '📖', summary: 'Hikâyenin temel unsurlarını ve teması tanı',
    intro: 'Hikâyenin temel unsurları olay, kişiler, yer, zaman ve anlatıcıdır. Hikâyenin ana düşüncesine tema denir.',
    paras: ['Tema, yazarın eserle anlatmak istediği genel düşüncedir ve çoğu zaman olayların sonunda ortaya çıkar.'],
    tip: 'Bir hikâyenin temasını bulmak için "bu hikâye bize ne anlatıyor?" diye sor.',
    items: [
      {q: 'Yazarın eserle anlatmak istediği genel düşünceye ne denir?', a: 'Tema', w: ['Düğüm', 'Çözüm', 'Olay örgüsü', 'Yer']},
      {q: 'Hikâyeyi kimin anlattığını gösteren unsur hangisidir?', a: 'Anlatıcı', w: ['Tema', 'Düğüm', 'Zaman', 'Yer']},
      {q: 'Hangisi bir hikâye unsuru değildir?', a: 'Ölçü', w: ['Olay', 'Kişiler', 'Yer', 'Zaman']},
    ],
  }),

  // ---------- Fen Bilimleri ----------
  textTopic({
    id: '7-fen-hucre-bolunme', unit: FEN, name: 'Hücre bölünmesi', symbol: '🧬', summary: 'Mitoz ve mayoz bölünmeyi karşılaştır',
    intro: 'Hücre bölünmesi, canlıların büyümesi ve üremesi için gerekli bir süreçtir. Mitoz bölünmede bir hücreden iki aynı yavru hücre oluşur.',
    paras: ['Mayoz bölünme eşey hücrelerinin oluşumunda görülür ve kromozom sayısı yarıya iner.'],
    tip: 'Mitozu büyüme ve onarım, mayozu ise üreme ile ilişkilendirmek kolaylık sağlar.',
    items: [
      {q: 'Hangi bölünmede kromozom sayısı yarıya iner?', a: 'Mayoz', w: ['Mitoz', 'İkili bölünme', 'Tomurcuklanma', 'Sporlanma']},
      {q: 'Mitoz bölünmede bir hücreden kaç yavru hücre oluşur?', a: '2', w: ['1', '3', '4', '8']},
      {q: 'Büyüme ve onarım hangi bölünmeyle sağlanır?', a: 'Mitoz', w: ['Mayoz', 'Döllenme', 'Göçme', 'Sporlanma']},
    ],
  }),
  textTopic({
    id: '7-fen-isi', unit: FEN, name: 'Isı ve sıcaklık', symbol: '🌡', summary: 'Isı ile sıcaklık arasındaki farkı öğren',
    intro: 'Isı, sıcaklık farkından dolayı bir maddeden diğerine geçen enerjidir. Sıcaklık ise maddelerdeki taneciklerin ortalama hareketinin ölçüsüdür.',
    paras: ['Isı enerjisinin birimi joule (J), sıcaklığın ölçüsü ise derecedir (°C).'],
    tip: 'Isı bir enerji, sıcaklık ise bir ölçüdür; bu iki kavramı karıştırma.',
    items: [
      {q: 'Isının birimi hangisidir?', a: 'Joule', w: ['Derece', 'Newton', 'Metre', 'Litre']},
      {q: 'Sıcaklığın ölçü birimi hangisidir?', a: 'Santigrat derece', w: ['Joule', 'Newton', 'Kilogram', 'Metre']},
      {q: 'Isı ile sıcaklık için hangisi doğrudur?', a: 'Isı enerji, sıcaklık ise bir ölçüdür', w: ['İkisi de aynı şeydir', 'İkisi de bir uzunluktur', 'Isı bir ölçü, sıcaklık bir enerjidir', 'İkisi de bir kütledir']},
    ],
  }),
  textTopic({
    id: '7-fen-yansima', unit: FEN, name: 'Işığın yansıması', symbol: '🪞', summary: 'Düzlem aynada yansıma kanunlarını öğren',
    intro: 'Işık bir yüzeye çarptığında yansır. Yansıma açısı, gelme açısına eşittir.',
    paras: ['Düzlem aynada oluşan görüntü, cismin aynaya göre simetriğidir: sanal ve cisimle aynı boyuttadır.'],
    tip: 'Gelme ve yansıma açılarını normale göre ölç.',
    items: [
      {q: 'Yansıma kanununa göre gelme açısı ile yansıma açısı nasıldır?', a: 'Eşittir', w: ['Toplamı 90 derecedir', 'Farklıdır', 'Toplamı 180 derecedir', 'Birbirinin iki katıdır']},
      {q: 'Düzlem aynada oluşan görüntü nasıldır?', a: 'Sanal ve cisimle aynı boyutta', w: ['Gerçek ve ters', 'Daha büyük ve gerçek', 'Görünmez', 'Daha küçük ve gerçek']},
      {q: 'Işık yüzeye çarpıp geri dönüyorsa bu olaya ne denir?', a: 'Yansıma', w: ['Kırılma', 'Soğurma', 'Dağılma', 'Gölge']},
    ],
  }),

  // ---------- Sosyal Bilgiler ----------
  textTopic({
    id: '7-sos-osmanli-kurulus', unit: SOS, name: 'Osmanlı Devleti\'nin kuruluşu', symbol: '🏰', summary: 'Osmanlı Devleti\'nin kuruluş dönemini tanı',
    intro: 'Osmanlı Devleti, 1299 yılında Osman Bey tarafından Söğüt ve Bilecik çevresinde kurulmuştur.',
    paras: ['Osman Bey, Bizans topraklarında uç beyi olarak görev yapmış ve devletin temellerini atmıştır.'],
    tip: 'Kuruluş dönemini hatırlamak için hükümdarların sırasını öğrenmek faydalıdır.',
    items: [
      {q: 'Osmanlı Devleti hangi yılda kurulmuştur?', a: '1299', w: ['1071', '1453', '1923', '1326']},
      {q: 'Osmanlı Devleti\'nin kurucusu kimdir?', a: 'Osman Bey', w: ['Orhan Bey', 'Fatih Sultan Mehmet', 'Alp Arslan', 'Mete Han']},
      {q: 'Osmanlı Devleti ilk olarak hangi bölgede kurulmuştur?', a: 'Söğüt ve Bilecik çevresi', w: ['İstanbul', 'Ankara', 'Konya', 'Trabzon']},
    ],
  }),
  textTopic({
    id: '7-sos-cografya', unit: SOS, name: 'Türkiye\'nin coğrafi konumu', symbol: '📍', summary: 'Türkiye\'nin konumunu ve komşularını öğren',
    intro: 'Türkiye, Asya ve Avrupa kıtaları arasında köprü konumundadır. Üç tarafı denizlerle çevrilidir.',
    paras: ['Türkiye\'nin kuzeyinde Karadeniz, güneyinde Akdeniz, batısında Ege Denizi bulunur.'],
    tip: 'Türkiye\'nin denizlerini ve komşularını harita üzerinde göstermek faydalıdır.',
    items: [
      {q: 'Türkiye\'nin kuzeyinde hangi deniz bulunur?', a: 'Karadeniz', w: ['Akdeniz', 'Ege Denizi', 'Marmara Denizi', 'Kızıldeniz']},
      {q: 'Türkiye hangi iki kıta arasında köprü konumundadır?', a: 'Asya ve Avrupa', w: ['Afrika ve Avrupa', 'Asya ve Afrika', 'Amerika ve Avrupa', 'Okyanusya ve Asya']},
      {q: 'Türkiye\'nin batısında hangi deniz bulunur?', a: 'Ege Denizi', w: ['Karadeniz', 'Akdeniz', 'Hazar Denizi', 'Kızıldeniz']},
    ],
  }),

  // ---------- İngilizce ----------
  textTopic({
    id: '7-en-present-continuous', unit: EN, name: 'Present Continuous', symbol: 'ing', summary: 'Şu anda devam eden eylemleri anlatmayı öğren',
    intro: 'Present Continuous, şu anda devam eden ya da geçici olarak gerçekleşen eylemleri anlatır. "am/is/are + fiil-ing" yapısı kullanılır.',
    paras: ['"She is reading a book now." cümlesinde kişi şu anda kitap okumaktadır.'],
    tip: 'Şu an, bu anda gibi zarflar genellikle Present Continuous ile birlikte kullanılır.',
    items: [
      {q: '"They ___ football now." boşluğu için hangisi doğrudur?', a: 'are playing', w: ['play', 'plays', 'played', 'will play']},
      {q: '"I ___ my homework at the moment." boşluğu için hangisi doğrudur?', a: 'am doing', w: ['do', 'does', 'did', 'will do']},
      {q: 'Present Continuous hangi yapıyla kurulur?', a: 'am/is/are + fiil-ing', w: ['have + fiil', 'will + fiil', 'did + fiil', 'fiil + s']},
    ],
  }),
  textTopic({
    id: '7-en-feelings', unit: EN, name: 'Feelings', symbol: '😊', summary: 'Duygu ifadelerini İngilizce öğren',
    intro: 'Duyguları anlatmak için happy, sad, angry, excited gibi sıfatlar kullanılır.',
    paras: ['"I am happy today." cümlesinde kişi bugün mutlu olduğunu söyler.'],
    tip: 'Duygu sıfatlarını yüz ifadeleriyle eşleştirerek ezberleyebilirsin.',
    items: [
      {q: '"Sad" İngilizcede hangi duygudur?', a: 'Üzgün', w: ['Mutlu', 'Heyecanlı', 'Kızgın', 'Korkmuş']},
      {q: '"Excited" ne anlama gelir?', a: 'Heyecanlı', w: ['Üzgün', 'Yorgun', 'Kızgın', 'Sakin']},
      {q: '"I am angry." cümlesinin Türkçesi nedir?', a: 'Kızgınım.', w: ['Mutluyum.', 'Üzgünüm.', 'Yorgunum.', 'Heyecanlıyım.']},
    ],
  }),
  textTopic({
    id: '7-en-abilities', unit: EN, name: 'Abilities', symbol: 'can', summary: 'Yetenek bildiren "can" fiilini öğren',
    intro: '"Can" fiili yetenek ve olasılık bildirmek için kullanılır. Olumsuz şekli "cannot" ya da "can\'t" olur.',
    paras: ['"I can swim." cümlesinde kişi yüzebildiğini anlatır. "She can\'t drive." ise araba süremediğini söyler.'],
    tip: 'Yetenek için "can", yetenek olmadığında ise "can\'t" kullanılır.',
    items: [
      {q: '"He ___ speak English." boşluğu için hangisi doğrudur?', a: 'can', w: ['cans', 'canned', 'can to speak', 'to can']},
      {q: '"Can\'t" hangi anlama gelir?', a: 'Yapamam / yapamıyor', w: ['Yapabilirim', 'Yapacağım', 'Yapmıştım', 'Yapmalıyım']},
      {q: 'Yetenek bildirmek için hangi fiil kullanılır?', a: 'Can', w: ['Must', 'Should', 'Will', 'Would']},
    ],
  }),

  // ---------- Din Kültürü ----------
  textTopic({
    id: '7-din-ahiret', unit: DIN, name: 'Ahiret inancı', symbol: '🌙', summary: 'Ahiret inancının temel kavramlarını öğren',
    intro: 'Ahiret, insanın ölümden sonra başlayan ve sonsuz olan hayatıdır. Ahirete inanmak, İslam inanç esaslarından biridir.',
    paras: ['Ahiret gününde insanlar yaptıklarından sorumlu tutulur. Hesap günü ve cennet-cehennem bu inancın parçalarıdır.'],
    tip: 'Ahiret inancı, dünyada yapılan iyiliklerin anlamını da açıklar.',
    items: [
      {q: 'İnsanın ölümden sonra başlayan sonsuz hayatına ne denir?', a: 'Ahiret', w: ['Dünya', 'Kader', 'Ayet', 'Sünnet']},
      {q: 'İslam inanç esaslarından biri hangisidir?', a: 'Ahirete inanmak', w: ['Yalan söylemek', 'Kibirli olmak', 'Kötülük yapmak', 'Hile yapmak']},
      {q: 'Ahiret gününde insanlar neden sorumlu tutulur?', a: 'Yaptıklarından', w: ['Yaşadıkları yerden', 'Giydikleri kıyafetten', 'Sahip oldukları paradan', 'Yaşlarından']},
    ],
  }),
  textTopic({
    id: '7-din-peygamber-hayat', unit: DIN, name: 'Hz. Muhammed\'in hayatı', symbol: '🕌', summary: 'Hz. Muhammed\'in hayatından örnekleri öğren',
    intro: 'Hz. Muhammed, Mekke\'de doğmuş; kırk yaşında peygamber olarak görevlendirilmiştir. Güvenilirliği ve dürüstlüğü ile tanınmıştır.',
    paras: ['Hz. Muhammed, Medine\'ye hicret ederek İslam\'ın yayılmasını sağlamıştır.'],
    tip: 'Peygamberimizin hayatı, ahlaki değerler için en güzel örnektir.',
    items: [
      {q: 'Hz. Muhammed nerede doğmuştur?', a: 'Mekke', w: ['Medine', 'Kudüs', 'Şam', 'Bağdat']},
      {q: 'Hz. Muhammed kaç yaşında peygamber olarak görevlendirilmiştir?', a: '40', w: ['20', '30', '50', '60']},
      {q: 'Hz. Muhammed\'in Medine\'ye göçüne ne denir?', a: 'Hicret', w: ['Ahiret', 'Kurban', 'Zekât', 'Teravih']},
    ],
  }),

  // ---------- Görsel Sanatlar ----------
  textTopic({
    id: '7-gs-tasarim-urun', unit: GS, name: 'Ürün tasarımı', symbol: '🪑', summary: 'Ürün tasarımında işlev ve estetik dengesini öğren',
    intro: 'Ürün tasarımı, bir nesnenin hem işlevsel hem de estetik olmasını hedefler. İyi bir tasarımda işlev ve görünüm dengeli olur.',
    paras: ['Bir sandalyenin rahat olması işlevsel, şeklinin hoş görünmesi ise estetik özelliktir.'],
    tip: 'Bir ürünü tasarlarken önce kullanım amacını belirle.',
    items: [
      {q: 'Ürün tasarımında hem işlevsel hem estetik olmayı sağlayan yaklaşım hangisidir?', a: 'Denge', w: ['Gösteriş', 'Taklit', 'Karmaşa', 'Rastlantı']},
      {q: 'Bir ürünün kullanım amacını gösteren özelliğe ne denir?', a: 'İşlev', w: ['Renk', 'Doku', 'Desen', 'Leke']},
    ],
  }),
  textTopic({
    id: '7-gs-renk-kuramı', unit: GS, name: 'Renk uyumları', symbol: '🌈', summary: 'Tamamlayıcı ve benzer renk uyumlarını öğren',
    intro: 'Renk çemberinde karşılıklı renkler tamamlayıcı renklerdir. Yan yana olan renkler ise benzer (analog) uyum oluşturur.',
    paras: ['Mavi ile turuncu tamamlayıcı renklerdir. Mavi ile yeşil ise benzer renklerdir.'],
    tip: 'Renk çemberine bakarak uyumlu renkleri kolayca bulabilirsin.',
    items: [
      {q: 'Renk çemberinde karşılıklı duran renklere ne denir?', a: 'Tamamlayıcı renkler', w: ['Ana renkler', 'Ara renkler', 'Nötr renkler', 'Sıcak renkler']},
      {q: 'Mavinin tamamlayıcı rengi hangisidir?', a: 'Turuncu', w: ['Yeşil', 'Mor', 'Siyah', 'Kahverengi']},
      {q: 'Yan yana bulunan renkler hangi uyum türünü oluşturur?', a: 'Benzer uyum', w: ['Tamamlayıcı uyum', 'Karşıt uyum', 'Monokrom uyum', 'Siyah-beyaz uyum']},
    ],
  }),

  // ---------- Müzik ----------
  textTopic({
    id: '7-mu-halk-bolge', unit: MU, name: 'Halk müziği bölgeleri', symbol: '🎼', summary: 'Türkiye\'nin müzik bölgelerini tanı',
    intro: 'Türkiye\'de halk müziği bölgesel özelliklere göre Karadeniz, Ege, Doğu Anadolu ve Orta Anadolu gibi bölgelere ayrılır.',
    paras: ['Karadeniz türkülerinde kemençe, Doğu Anadolu türkülerinde ise bağlama öne çıkar.'],
    tip: 'Her bölgenin müziğini çalgılarından ve ezgilerinden tanıyabilirsin.',
    items: [
      {q: 'Karadeniz türkülerinde öne çıkan çalgı hangisidir?', a: 'Kemençe', w: ['Ney', 'Kanun', 'Org', 'Trompet']},
      {q: 'Doğu Anadolu türkülerinde öne çıkan çalgı hangisidir?', a: 'Bağlama', w: ['Kemençe', 'Ney', 'Piyano', 'Davul']},
      {q: 'Halk müziği neden bölgesel özellikler taşır?', a: 'Yöresel yaşam ve kültürden doğduğu için', w: ['Sadece bir plağa bağlı olduğu için', 'Hiçbir bölgeye ait olmadığı için', 'Yalnızca bir kentte yapıldığı için', 'Sadece bir sözlükten geldiği için']},
    ],
  }),
  textTopic({
    id: '7-mu-sanat', unit: MU, name: 'Türk sanat müziği', symbol: '🎶', summary: 'Türk sanat müziğinin özelliklerini öğren',
    intro: 'Türk sanat müziği, saray ve şehir kültüründen doğmuş, makam ve usul temelli bir müzik türüdür.',
    paras: ['Kâr, şarkı, türkü ve gazel Türk sanat müziğinin başlıca formlarındandır.'],
    tip: 'Sanat müziğini dinlerken makam ve usul yapısına dikkat et.',
    items: [
      {q: 'Türk sanat müziği hangi kültürden doğmuştur?', a: 'Saray ve şehir kültürü', w: ['Göçebe kültür', 'Denizcilik kültürü', 'Köy kültürü', 'Dağ kültürü']},
      {q: 'Hangisi Türk sanat müziğinin formlarından biridir?', a: 'Kâr', w: ['Ağıt', 'Tekerleme', 'Mani', 'Bilmece']},
      {q: 'Türk sanat müziğinin temelinde hangi yapılar bulunur?', a: 'Makam ve usul', w: ['Renk ve boyut', 'Sadece nota sayısı', 'Yalnızca ritim', 'Sadece söz']},
    ],
  }),

  // ---------- Beden Eğitimi ----------
  textTopic({
    id: '7-be-atletizm', unit: BE, name: 'Atletizm', symbol: '🏁', summary: 'Atletizmin temel dallarını öğren',
    intro: 'Atletizm; koşu, atlama ve atma dallarından oluşan temel bir spor dalıdır.',
    paras: ['Yüksek atlama, uzun atlama ve gülle atma atletizm dallarındandır.'],
    tip: 'Her dalın hangi beceriyi geliştirdiğini düşünerek öğrenmek kolaylık sağlar.',
    items: [
      {q: 'Atletizmin temel dallarından hangisi değildir?', a: 'Voleybol', w: ['Koşu', 'Atlama', 'Atma', 'Gülle atma']},
      {q: 'Gülle atma hangi spor dalının içindedir?', a: 'Atletizm', w: ['Yüzme', 'Basketbol', 'Güreş', 'Jimnastik']},
      {q: 'Yüksek atlama hangi becerinin gelişimine katkı sağlar?', a: 'Güç ve esneklik', w: ['Sadece uyku', 'Sadece sessizlik', 'Sadece renk', 'Yalnızca yemek']},
    ],
  }),
  textTopic({
    id: '7-be-saglik-kondisyon', unit: BE, name: 'Vücut çalışması', symbol: '💪', summary: 'Güçlendirme çalışmalarının ilkelerini öğren',
    intro: 'Güçlendirme çalışmaları, kasların gücünü ve dayanıklılığını artırmaya yöneliktir. Doğru teknik ve dinlenme ile yapılmalıdır.',
    paras: ['Güçlendirme çalışmalarında aynı kas grubunu arka arkaya yormamak ve dinlenmeye zaman ayırmak önemlidir.'],
    tip: 'Teknik hataları azaltmak için hareketleri yavaş ve kontrollü yap.',
    items: [
      {q: 'Güçlendirme çalışmalarında dikkat edilmesi gereken unsur hangisidir?', a: 'Doğru teknik ve dinlenme', w: ['Hızlı ve plansız hareket', 'Ağır yüklerle hemen başlamak', 'Hiç dinlenmemek', 'Sadece tek kası çalıştırmak']},
      {q: 'Güçlendirme çalışmalarının amacı nedir?', a: 'Kasların gücünü ve dayanıklılığını artırmak', w: ['Kemikleri zayıflatmak', 'Sadece boyu uzatmak', 'Vücudu sertleştirmek', 'Esnekliği yok etmek']},
    ],
  }),
];
