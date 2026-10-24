// 3. sınıf: Türkçe, Hayat Bilgisi, Müzik, Görsel Sanatlar, Beden Eğitimi.
// Metin tabanlı konular: her madde {q, a, w}; w tam 4 yanlış seçenek içerir.

function textTopic({id, unit, name, symbol, summary, intro, paras, tip, items}) {
  return {
    id, grade: 3, unit, name, symbol, summary, kind: 'text',
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
    id: '3-tr-anlam', unit: TR, name: 'Sözcükte anlam', symbol: 'a=?', summary: 'Gerçek, mecaz ve terim anlamı ayır',
    intro: 'Sözcükler gerçek anlamda, mecaz anlamda ya da terim anlamında kullanılabilir.',
    paras: ['"Elini çabuk tut" cümlesinde "el" sözcüğü gerçek anlamda değil, mecazi anlamda kullanılmıştır.'],
    tip: 'Sözcüğün cümledeki anlamına bakarak hangi anlamda kullanıldığını bul.',
    items: [
      {q: '"Kalbi kırık" ifadesinde "kalp" sözcüğü hangi anlamdadır?', a: 'Mecaz anlamda', w: ['Gerçek anlamda', 'Terim anlamında', 'Yan anlamda değil', 'Sayı anlamında']},
      {q: '"Ağaç" sözcüğü hangi anlamda kullanılmıştır: "Bahçedeki ağaç çok büyük."', a: 'Gerçek anlamda', w: ['Mecaz anlamda', 'Terim anlamında', 'Eş anlamda', 'Zıt anlamda']},
      {q: '"Deniz" sözcüğünün gerçek anlamı hangisidir?', a: 'Tuzlu su kütlesi', w: ['Çok üzgün olmak', 'Büyük sevinç', 'Gök kubbe', 'Uzun yol']},
    ],
  }),
  textTopic({
    id: '3-tr-fiil', unit: TR, name: 'Fiiller', symbol: 'git', summary: 'Eylem bildiren sözcükleri (fiilleri) bul',
    intro: 'Fiiller iş, oluş ya da durum bildiren sözcüklerdir. Cümlede yüklem olarak kullanılırlar.',
    paras: ['"Koşmak", "gülmek", "okumak" birer fiildir. "Ali koştu." cümlesinde yüklem "koştu" fiilidir.'],
    tip: 'Fiiller genellikle "-mak" ya da "-mek" ekiyle sözlükte yer alır.',
    items: [
      {q: 'Hangisi bir fiildir?', a: 'okumak', w: ['kitap', 'güzel', 'masa', 'hızlı']},
      {q: '"Ayşe dün resim yaptı." cümlesinde fiil hangisidir?', a: 'yaptı', w: ['Ayşe', 'dün', 'resim', 'Ayşe dün']},
      {q: 'Hangisi bir eylem bildirmez?', a: 'kırmızı', w: ['koşmak', 'yazmak', 'uyumak', 'çizmek']},
    ],
  }),
  textTopic({
    id: '3-tr-sifat', unit: TR, name: 'Sıfatlar', symbol: 'güzel', summary: 'Nitelik bildiren sözcükleri (sıfatları) bul',
    intro: 'Sıfatlar, isimlerin niteliğini, rengini, büyüklüğünü ya da sayısını bildirir.',
    paras: ['"Kırmızı elma" ifadesinde "kırmızı" sıfattır; elmanın rengini bildirir.'],
    tip: 'Bir isme "nasıl?" ya da "kaç tane?" diye sorduğunda cevap veren sözcük sıfattır.',
    items: [
      {q: '"Büyük bir ağaç" ifadesinde sıfat hangisidir?', a: 'Büyük', w: ['ağaç', 'bir', 'Büyük bir', 'ifade']},
      {q: 'Hangisi bir sıfattır?', a: 'uzun', w: ['koşmak', 'kalem', 'dün', 'yüzmek']},
      {q: '"Üç kırmızı balon" ifadesinde sayı sıfatı hangisidir?', a: 'Üç', w: ['kırmızı', 'balon', 'üç kırmızı', 'Hiçbiri']},
    ],
  }),
  textTopic({
    id: '3-tr-zarf', unit: TR, name: 'Zarflar', symbol: 'hızlı', summary: 'Durum bildiren sözcükleri (zarfları) bul',
    intro: 'Zarflar fiillerin nasıl, ne zaman ya da nerede yapıldığını bildirir.',
    paras: ['"Ali hızlı koştu." cümlesinde "hızlı" zarftır; koşmanın nasıl yapıldığını bildirir.'],
    tip: 'Zarf, fiile "nasıl?", "ne zaman?" ya da "nerede?" sorusuyla cevap verir.',
    items: [
      {q: '"Yarın okula gideceğiz." cümlesinde zarf hangisidir?', a: 'Yarın', w: ['okula', 'gideceğiz', 'okul', 'gideceğiz okula']},
      {q: '"Kuşlar yüksekte uçtu." cümlesinde zarf hangisidir?', a: 'yüksekte', w: ['kuşlar', 'uçtu', 'Kuşlar', 'Hiçbiri']},
    ],
  }),
  textTopic({
    id: '3-tr-noktalama', unit: TR, name: 'Noktalama işaretleri', symbol: ',', summary: 'Virgül, nokta ve iki nokta kullanımını öğren',
    intro: 'Noktalama işaretleri cümlenin anlamını doğru aktarmak için kullanılır.',
    paras: ['Virgül sıralı sözcükleri ayırır: "Elma, armut, muz." Üç nokta düşünceyi yarıda bırakır.'],
    tip: 'Sıralı sözcükler arasına virgül, cümle sonuna nokta konur.',
    items: [
      {q: 'Sıralı sözcükler arasında hangi işaret kullanılır?', a: 'Virgül', w: ['Nokta', 'Ünlem', 'Soru işareti', 'Tire']},
      {q: 'Hangi noktalama işareti düşünceyi yarıda bırakmak için kullanılır?', a: 'Üç nokta', w: ['Virgül', 'Nokta', 'Soru işareti', 'Ünlem']},
      {q: 'Cümlede bir ünlem ifadesi bittiğinde hangi işaret konur?', a: 'Ünlem işareti', w: ['Nokta', 'Virgül', 'Soru işareti', 'Tırnak']},
    ],
  }),
  textTopic({
    id: '3-tr-metin', unit: TR, name: 'Metin türleri', symbol: '📰', summary: 'Şiir, hikâye ve bilgilendirici metinleri ayır',
    intro: 'Metinler amaçlarına ve yapılarına göre şiir, hikâye, masal ve bilgilendirici metin gibi türlere ayrılır.',
    paras: ['Şiirde dize ve kafiye bulunur. Hikâyede olay, kişi, yer ve zaman vardır.'],
    tip: 'Metnin amacını anlamak, hangi türde olduğunu bulmanı kolaylaştırır.',
    items: [
      {q: 'Dize ve kafiyeden oluşan metin türü hangisidir?', a: 'Şiir', w: ['Hikâye', 'Makale', 'Fıkra', 'Mektup']},
      {q: 'Olay, kişi, yer ve zaman içeren metin türü hangisidir?', a: 'Hikâye', w: ['Şiir', 'Bilgi metni', 'Tarif', 'Liste']},
      {q: 'Bilgi vermek amacıyla yazılan metne ne denir?', a: 'Bilgilendirici metin', w: ['Şiir', 'Masal', 'Tiyatro', 'Fıkra']},
    ],
  }),

  // ---------- Hayat Bilgisi ----------
  textTopic({
    id: '3-hb-tarih', unit: HB, name: 'Tarihimiz', symbol: '🏛', summary: 'Geçmişi anlatan kaynakları öğren',
    intro: 'Tarih, geçmişte yaşanan olayların bilimsel olarak incelenmesidir. Tarihi öğrenmek için çeşitli kaynaklardan yararlanılır.',
    paras: ['Eski eşyalar, fotoğraflar ve yazılı belgeler tarihî kaynaklardır.'],
    tip: 'Büyüklerimizin anlattığı olaylar da sözlü tarih kaynağıdır.',
    items: [
      {q: 'Geçmişte yaşanan olayları inceleyen bilim dalı hangisidir?', a: 'Tarih', w: ['Coğrafya', 'Matematik', 'Müzik', 'Biyoloji']},
      {q: 'Hangisi tarihî bir kaynaktır?', a: 'Eski fotoğraflar', w: ['Yeni çıkan bir oyun', 'Bugünkü hava durumu', 'Yarınki ders programı', 'Gelecek planı']},
      {q: 'Büyüklerimizin anlattığı olaylar hangi kaynak türüdür?', a: 'Sözlü kaynak', w: ['Görsel kaynak', 'Sayısal kaynak', 'Yazılı kaynak', 'Haritalı kaynak']},
    ],
  }),
  textTopic({
    id: '3-hb-cografya', unit: HB, name: 'Yön bulma', symbol: '🧭', summary: 'Pusula yönlerini ve yer tariflerini öğren',
    intro: 'Pusulada dört temel yön bulunur: kuzey, güney, doğu ve batı.',
    paras: ['Güneş doğduğunda doğuyu gösterir; sabah güneşe bakarken sağımız güney, solumuz kuzey olur.'],
    tip: 'Kuzey yönünü bulmak için pusulanın iğne ucuna bak.',
    items: [
      {q: 'Pusulanın iğnesi hangi yönü gösterir?', a: 'Kuzey', w: ['Güney', 'Doğu', 'Batı', 'Güneydoğu']},
      {q: 'Güneş genellikle hangi yönden doğar?', a: 'Doğu', w: ['Batı', 'Kuzey', 'Güney', 'Kuzeybatı']},
      {q: 'Sabah güneşe doğru bakan biri için sağ taraf hangi yöndür?', a: 'Güney', w: ['Kuzey', 'Doğu', 'Batı', 'Kuzeydoğu']},
    ],
  }),
  textTopic({
    id: '3-hb-haklar', unit: HB, name: 'Haklar ve sorumluluklar', symbol: '⚖', summary: 'Çocuk haklarını ve sorumluluklarını öğren',
    intro: 'Her çocuğun eğitim, sağlık, barınma ve sevgi gibi hakları vardır. Bu hakların yanında sorumlulukları da vardır.',
    paras: ['Okula gitmek hakkımızdır; derslerimizi çalışmak ise sorumluluğumuzdur.'],
    tip: 'Bir hakkı kullanırken başkalarının haklarını da düşünmeliyiz.',
    items: [
      {q: 'Çocukların sahip olduğu haklardan biri hangisidir?', a: 'Eğitim hakkı', w: ['Sınırsız para hakkı', 'Ev kiralama hakkı', 'Ehliyet hakkı', 'Oy verme hakkı']},
      {q: 'Hakkını kullanırken ne düşünmeliyiz?', a: 'Başkalarının haklarını', w: ['Sadece kendi isteğimizi', 'Hiçbir şeyi', 'Diğerlerini yok saymayı', 'Kuralları bozmayı']},
    ],
  }),
  textTopic({
    id: '3-hb-ihtiyac', unit: HB, name: 'İhtiyaçlar ve istekler', symbol: '🛒', summary: 'İhtiyaç ile isteği ayır',
    intro: 'İhtiyaçlar yaşamımız için zorunlu olan şeylerdir. İstekler ise olsa güzel olacak ama zorunlu olmayan şeylerdir.',
    paras: ['Ekmek, su ve giysi ihtiyaçtır. Yeni oyuncak ise çoğu zaman bir istektir.'],
    tip: 'Bir şeyi almadan önce ihtiyaç mı yoksa istek mi olduğunu düşün.',
    items: [
      {q: 'Hangisi bir ihtiyaçtır?', a: 'Su', w: ['Yeni oyuncak', 'Pahalı bir bisiklet', 'Lüks bir saat', 'Şekerleme']},
      {q: 'Hangisi bir istektir?', a: 'Yeni bir oyuncak', w: ['Ekmek', 'Temiz su', 'Giysi', 'Ders kitabı']},
    ],
  }),
  textTopic({
    id: '3-hb-iletisim', unit: HB, name: 'İletişim araçları', symbol: '📞', summary: 'İletişim araçlarını ve kullanım amaçlarını öğren',
    intro: 'İnsanlar birbirleriyle konuşarak, yazarak ya da teknolojik araçlarla iletişim kurar.',
    paras: ['Telefon, mektup, radyo ve internet iletişim araçlarındandır.'],
    tip: 'Hangi aracın hangi amaçla kullanıldığını düşünerek öğrenebilirsin.',
    items: [
      {q: 'Uzaktaki birine kısa mesaj göndermek için hangi araç kullanılabilir?', a: 'Telefon', w: ['Pusula', 'Cetvel', 'Terazi', 'Harita']},
      {q: 'Hangisi bir iletişim aracıdır?', a: 'Mektup', w: ['Cetvel', 'Makas', 'Kalem', 'Terazi']},
    ],
  }),

  // ---------- Müzik ----------
  textTopic({
    id: '3-mu-usul', unit: MU, name: 'Ölçü ve vurgu', symbol: '𝄞', summary: 'Ölçü ve vurguyu tanı',
    intro: 'Müzikte sesler belli bir düzende gruplanır. Her grubun başında vurgu yapılır.',
    paras: ['İki zamanlı ölçüde ilk vuruş vurgulu, ikinci vuruş vurgusuzdur. Marş genellikle dört zamanlı ölçüyle yazılır.'],
    tip: 'Vurguyu bulmak için şarkıyı alkışlayarak takip et.',
    items: [
      {q: 'Müzikte sesleri gruplandıran birim nedir?', a: 'Ölçü', w: ['Nota', 'Gam', 'Makam', 'Ses']},
      {q: 'Bir ölçünün başında hangi vuruş bulunur?', a: 'Vurgulu vuruş', w: ['Sessiz vuruş', 'Uzun ses', 'Kısa nefes', 'Boş vuruş']},
      {q: 'Marşlar genellikle hangi ölçüyle yazılır?', a: 'Dört zamanlı', w: ['İki zamanlı', 'Üç zamanlı', 'Beş zamanlı', 'Altı zamanlı']},
    ],
  }),
  textTopic({
    id: '3-mu-marş', unit: MU, name: 'Marş ve türkü', symbol: '🎺', summary: 'Marş ile türkü arasındaki farkı öğren',
    intro: 'Marşlar genellikle canlı ve ritmik müziklerdir, yürüyüşte söylenir. Türküler ise halkın duygularını anlatan ezgilerdir.',
    paras: ['İstiklal Marşı bir marştır. Yanık türküler ise hüzünlü ve duygusal bir hava taşır.'],
    tip: 'Marşlar genellikle ayakta ve saygıyla dinlenir.',
    items: [
      {q: 'Hangisi bir marştır?', a: 'İstiklal Marşı', w: ['Yanık türkü', 'Ninni', 'Bağlama semaisi', 'Sevda şarkısı']},
      {q: 'Canlı ve ritmik, yürüyüşte söylenen müzik türü hangisidir?', a: 'Marş', w: ['Ninni', 'Türkü', 'Ağıt', 'Mani']},
    ],
  }),
  textTopic({
    id: '3-mu-enstruman', unit: MU, name: 'Yaylı ve üflemeli çalgılar', symbol: '🎻', summary: 'Çalgıları sınıflarına göre ayır',
    intro: 'Çalgılar, ses çıkarma biçimine göre yaylı, üflemeli, vurmalı ve telli olarak gruplandırılır.',
    paras: ['Keman yaylı, flüt üflemeli, davul vurmalı, gitar telli bir çalgıdır.'],
    tip: 'Bir çalgıyı görünce ses çıkarma biçimini düşün.',
    items: [
      {q: 'Keman hangi çalgı grubundadır?', a: 'Yaylı', w: ['Üflemeli', 'Vurmalı', 'Elektronik', 'Sözlü']},
      {q: 'Flüt hangi çalgı grubundadır?', a: 'Üflemeli', w: ['Yaylı', 'Vurmalı', 'Elektronik', 'Sözlü']},
      {q: 'Davul hangi çalgı grubundadır?', a: 'Vurmalı', w: ['Yaylı', 'Üflemeli', 'Telli', 'Elektronik']},
    ],
  }),

  // ---------- Görsel Sanatlar ----------
  textTopic({
    id: '3-gs-perspektif', unit: GS, name: 'Yakın ve uzak', symbol: '🏞', summary: 'Resimde yakın ve uzak kavramını öğren',
    intro: 'Resimde yakındaki nesneler büyük, uzaktakiler küçük çizilir. Böylece derinlik duygusu oluşturulur.',
    paras: ['Bir yol resmi çizerken önde büyük ağaçlar, arkada küçük evler çizilir.'],
    tip: 'Ufuk çizgisi resimdeki uzaklığı göstermeye yardım eder.',
    items: [
      {q: 'Resimde uzaktaki nesneler nasıl çizilir?', a: 'Küçük', w: ['Büyük', 'Renksiz', 'Kalın çizgiyle', 'Kesik çizgiyle']},
      {q: 'Derinlik duygusunu oluşturan şey nedir?', a: 'Yakın ve uzak ilişkisi', w: ['Sadece renk', 'Sadece boyut', 'Sadece çizgi', 'Hiçbiri']},
    ],
  }),
  textTopic({
    id: '3-gs-kompozisyon', unit: GS, name: 'Kompozisyon', symbol: '▢', summary: 'Resimde düzen ve kompozisyonun önemini öğren',
    intro: 'Kompozisyon, resimdeki öğelerin sayfa üzerinde düzenlenme biçimidir.',
    paras: ['Dengeli bir kompozisyonda öğeler sayfaya uyumlu biçimde yerleştirilir.'],
    tip: 'Resmi çizmeden önce sayfada nereye neyi koyacağını planla.',
    items: [
      {q: 'Resimdeki öğelerin düzenlenme biçimine ne denir?', a: 'Kompozisyon', w: ['Perspektif', 'Doku', 'Renk tonu', 'Desen']},
      {q: 'Bir resim yaparken önce ne yapmak yararlıdır?', a: 'Sayfada yerleşimi planlamak', w: ['Sayfayı boyamak', 'Resmi yırtmak', 'Hiçbir şey yapmamak', 'Sadece kenar çizmek']},
    ],
  }),
  textTopic({
    id: '3-gs-ritim', unit: GS, name: 'Görsel ritim', symbol: '≋', summary: 'Resimde tekrar ve ritim kavramını öğren',
    intro: 'Görsel ritim, resimde aynı öğelerin düzenli aralıklarla tekrarlanmasıyla oluşur.',
    paras: ['Bir sırada tekrar eden yuvarlaklar ya da üçgenler görsel ritim oluşturur.'],
    tip: 'Ritim yaratmak için tekrar eden öğeler arasındaki boşlukları eşit tut.',
    items: [
      {q: 'Görsel ritim neyle oluşur?', a: 'Öğelerin düzenli tekrarıyla', w: ['Rastgele renklerle', 'Tek bir çizgiyle', 'Boş alanla', 'Silgiyle']},
      {q: 'Hangisi görsel ritme örnektir?', a: 'Sıralanmış üçgenler', w: ['Tek bir nokta', 'Boş sayfa', 'Karışık leke', 'Tek renkli boyama']},
    ],
  }),

  // ---------- Beden Eğitimi ----------
  textTopic({
    id: '3-be-dayanıklılık', unit: BE, name: 'Dayanıklılık', symbol: '💪', summary: 'Dayanıklılığın ne olduğunu ve nasıl geliştiğini öğren',
    intro: 'Dayanıklılık, uzun süre yorulmadan hareket edebilme becerisidir.',
    paras: ['Her gün yapılan yürüyüş ve koşu, dayanıklılığımızı artırır.'],
    tip: 'Dayanıklılığı yavaş yavaş ve düzenli çalışmayla geliştir.',
    items: [
      {q: 'Uzun süre yorulmadan hareket edebilme becerisine ne denir?', a: 'Dayanıklılık', w: ['Esneklik', 'Hız', 'Güç', 'Denge']},
      {q: 'Dayanıklılığı artırmak için ne yapılabilir?', a: 'Düzenli yürüyüş ve koşu', w: ['Sürekli oturmak', 'Hiç hareket etmemek', 'Gece geç yatmak', 'Sadece uyumak']},
    ],
  }),
  textTopic({
    id: '3-be-esneklik', unit: BE, name: 'Esneklik', symbol: '🧘', summary: 'Esnekliğin önemini ve ısınma hareketlerini öğren',
    intro: 'Esneklik, eklemlerin ve kasların rahatça hareket edebilme yeteneğidir.',
    paras: ['Spor öncesinde yapılan germe hareketleri esnekliği artırır ve sakatlanma riskini azaltır.'],
    tip: 'Germe hareketlerini zorlamadan, yavaşça yap.',
    items: [
      {q: 'Esneklik neyi ifade eder?', a: 'Eklemlerin rahat hareket etmesini', w: ['Çok hızlı koşmayı', 'Ağır kaldırmayı', 'Uzun süre uyumayı', 'Yüksek sesle bağırmayı']},
      {q: 'Spor öncesinde ne yapmak sakatlanma riskini azaltır?', a: 'Germe hareketleri yapmak', w: ['Hemen koşmak', 'Hiç ısınmamak', 'Ağır yük kaldırmak', 'Uzun süre oturmak']},
    ],
  }),
  textTopic({
    id: '3-be-hijyen', unit: BE, name: 'Güvenli oyun', symbol: '🛡', summary: 'Oyunlarda güvenlik kurallarını öğren',
    intro: 'Oyun oynarken kendimizi ve arkadaşlarımızı korumak için güvenlik kurallarına uymalıyız.',
    paras: ['Oyun alanını kontrol etmek, uygun ayakkabı giymek ve kurallara uymak kazaları önler.'],
    tip: 'Her oyundan önce güvenli bir alan olup olmadığına bak.',
    items: [
      {q: 'Oyunlarda kazaları önlemek için ne yapılmalıdır?', a: 'Güvenlik kurallarına uymak', w: ['Kuralları bozmak', 'Güvenlik ekipmanını çıkarmak', 'Oyun alanını hiç kontrol etmemek', 'Acele etmek']},
      {q: 'Oyun öncesinde hangi kontrol önemlidir?', a: 'Oyun alanının güvenli olup olmadığı', w: ['Oyuncuların saç rengi', 'Topun kokusu', 'Renk seçimi', 'Oyun süresi']},
    ],
  }),
];
