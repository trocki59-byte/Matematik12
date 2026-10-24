// 1. sınıf: Türkçe, Hayat Bilgisi, Müzik, Görsel Sanatlar, Beden Eğitimi.
// Metin tabanlı konular: her soru bir "items" listesinden seçilir. Her madde {q, a, w}:
// q soru, a doğru cevap, w dört yanlış seçenek (3 ya da 4 tane; 4 olmalı).

function textTopic({id, unit, name, symbol, summary, intro, paras, tip, items}) {
  return {
    id, grade: 1, unit, name, symbol, summary, kind: 'text',
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
    id: '1-tr-harf', unit: TR, name: 'Türk alfabesi', symbol: 'Aa', summary: 'Türk alfabesindeki harfleri tanı',
    intro: 'Türk alfabesinde 29 harf vardır. Her harfin büyük ve küçük biçimi bulunur.',
    paras: ['Alfabede a, b, c, ç, d, e … harfleri sırayla yer alır. Büyük A, küçük a\'nın büyük biçimidir.'],
    tip: 'Alfabeyi her gün birkaç harf tekrar ederek ezberleyebilirsin.',
    items: [
      {q: 'Türk alfabesinde kaç harf vardır?', a: '29', w: ['26', '28', '30', '32']},
      {q: '"a" harfinin büyük biçimi hangisidir?', a: 'A', w: ['E', 'O', 'İ', 'U']},
      {q: '"ç" harfinden sonra gelen harf hangisidir?', a: 'd', w: ['c', 'e', 'f', 'g']},
      {q: '"ı" harfinin büyük biçimi hangisidir?', a: 'I', w: ['İ', 'Ö', 'Ü', 'Ş']},
      {q: 'Hangisi Türk alfabesinde yer alan bir harftir?', a: 'ğ', w: ['q', 'w', 'x', 'ñ']},
    ],
  }),
  textTopic({
    id: '1-tr-sesli', unit: TR, name: 'Sesli ve sessiz harfler', symbol: 'aı', summary: 'Sesli ve sessiz harfleri ayır',
    intro: 'Sesli harfler a, e, ı, i, o, ö, u, ü harfleridir. Diğer harfler sessiz harftir.',
    paras: ['"kedi" sözcüğünde e ve i sesli harftir; k, d sessiz harftir.'],
    tip: 'Sesli harfler dile sesi taşır; her hecede bir sesli harf bulunur.',
    items: [
      {q: 'Hangisi sesli harftir?', a: 'e', w: ['k', 'm', 't', 'b']},
      {q: 'Hangisi sessiz harftir?', a: 'k', w: ['a', 'o', 'u', 'ü']},
      {q: '"masa" sözcüğünde kaç sesli harf vardır?', a: '2', w: ['1', '3', '4', '5']},
      {q: '"kitap" sözcüğünde kaç sessiz harf vardır?', a: '3', w: ['1', '2', '4', '5']},
    ],
  }),
  textTopic({
    id: '1-tr-hece', unit: TR, name: 'Hece', symbol: 'ka', summary: 'Sözcükleri hecelere ayır',
    intro: 'Hece, bir sesli harfle birlikte okunan ses birimidir. Her hecede bir sesli harf bulunur.',
    paras: ['"ka-len-dar" sözcüğü üç heceden oluşur. "kedi" sözcüğü "ke-di" olarak iki hecelidir.'],
    tip: 'Sözcüğü yavaşça söyle ve her sesli harfte bir hece say.',
    items: [
      {q: '"kalem" sözcüğü kaç hecelidir?', a: '2', w: ['1', '3', '4', '5']},
      {q: '"ev" sözcüğü kaç hecelidir?', a: '1', w: ['2', '3', '4', '0']},
      {q: '"bahçe" sözcüğü kaç hecelidir?', a: '2', w: ['1', '3', '4', '5']},
      {q: '"okul" sözcüğü kaç hecelidir?', a: '2', w: ['1', '3', '4', '5']},
    ],
  }),
  textTopic({
    id: '1-tr-sozcuk', unit: TR, name: 'Sözcük ve anlam', symbol: 'abc', summary: 'Sözcüklerin anlamlarını bil',
    intro: 'Sözcükler bir şeyi, bir kişiyi ya da bir durumu adlandırır. Sözcüğün anlamını bilmek okumayı kolaylaştırır.',
    paras: ['"kedi" bir hayvanın adıdır. "masa" bir eşyanın adıdır. Anlamı bilinen sözcükler cümleyi daha iyi anlatır.'],
    tip: 'Bilmediğin bir sözcüğü cümlenin geri kalanına bakarak anlamaya çalış.',
    items: [
      {q: 'Hangisi bir hayvanın adıdır?', a: 'kedi', w: ['masa', 'kalem', 'ev', 'ağaç']},
      {q: 'Hangisi bir eşyanın adıdır?', a: 'kalem', w: ['koşmak', 'güzel', 'sevinç', 'yüzmek']},
      {q: 'Hangisi bir yiyecektir?', a: 'ekmek', w: ['kitap', 'sandalye', 'top', 'kapı']},
      {q: '"Hızlı" sözcüğünün zıt anlamlısı hangisidir?', a: 'yavaş', w: ['güzel', 'büyük', 'soğuk', 'yeni']},
    ],
  }),
  textTopic({
    id: '1-tr-cumle', unit: TR, name: 'Cümle ve noktalama', symbol: '.', summary: 'Cümlenin sonuna doğru işareti koy',
    intro: 'Cümle, bir düşünceyi anlatan sözcük grubudur. Cümlenin sonunda bir noktalama işareti bulunur.',
    paras: ['"Ali okula gitti." cümlesi nokta ile biter. Soru cümlesi soru işareti ile biter.'],
    tip: 'Cümleyi okurken sesini nerede indirdiğine bak; orada nokta koyulur.',
    items: [
      {q: 'Bir bildirme cümlesi hangi işaretle biter?', a: 'nokta', w: ['virgül', 'soru işareti', 'ünlem işareti', 'tire']},
      {q: 'Bir soru cümlesi hangi işaretle biter?', a: 'soru işareti', w: ['nokta', 'virgül', 'iki nokta', 'tırnak']},
      {q: 'Hangisi bir cümledir?', a: 'Ben bahçeye çıktım.', w: ['bahçede', 'kırmızı top', 've', 'okul']},
    ],
  }),
  textTopic({
    id: '1-tr-buyuk', unit: TR, name: 'Büyük harf kullanımı', symbol: 'A', summary: 'Büyük harfin nerede kullanıldığını öğren',
    intro: 'Cümlenin ilk harfi büyük yazılır. Özel isimler de (ad, şehir gibi) büyük harfle başlar.',
    paras: ['"Ayşe Ankara\'ya gitti." cümlesinde Ayşe ve Ankara büyük harfle yazılmıştır.'],
    tip: 'Kişi, yer ve cümle başı büyük harfle yazılır.',
    items: [
      {q: 'Özel isimlerin ilk harfi nasıl yazılır?', a: 'büyük harfle', w: ['küçük harfle', 'kalın yazılarak', 'italik yazılarak', 'tırnak içinde']},
      {q: 'Hangisi doğru yazılmıştır?', a: 'Ankara', w: ['ankara', 'aNKARA', 'ANKARA ', 'anKara']},
      {q: 'Cümlenin ilk harfi nasıl yazılır?', a: 'büyük harfle', w: ['küçük harfle', 'rakamla', 'kalın yazılarak', 'noktalı']},
    ],
  }),
  textTopic({
    id: '1-tr-okuma', unit: TR, name: 'Kısa metni anlama', symbol: '📖', summary: 'Kısa bir metinden bilgi bul',
    intro: 'Metni dikkatlice okuyarak kim, ne, nerede, ne zaman sorularının cevabını bulabilirsin.',
    paras: ['"Ali topu attı. Top bahçeye düştü." metninde topu atan Ali\'dir.'],
    tip: 'Soruyu okuyup metinde ilgili cümleyi bul.',
    items: [
      {q: '"Ali topu attı. Top bahçeye düştü." metnine göre topu kim attı?', a: 'Ali', w: ['Ayşe', 'Top', 'Bahçe', 'Kimse']},
      {q: '"Ayşe kitap okudu." metninde Ayşe ne yaptı?', a: 'kitap okudu', w: ['koştu', 'yüzdü', 'uyudu', 'ağladı']},
      {q: '"Güneş doğdu, hava ısındı." metninde hava nasıl oldu?', a: 'ısındı', w: ['soğudu', 'karardı', 'yağdı', 'dondu']},
    ],
  }),
  textTopic({
    id: '1-tr-harf-yaz', unit: TR, name: 'Harfleri tanıma', symbol: 'e', summary: 'Harfin büyük ve küçük biçimini eşleştir',
    intro: 'Her küçük harfin bir büyük biçimi vardır. Büyük ve küçük harfleri eşleştirebilmek yazmayı kolaylaştırır.',
    paras: ['"e" harfinin büyük biçimi "E"dir. "ö" harfinin büyük biçimi "Ö"dür.'],
    tip: 'Büyük harfler küçük harflerden genellikle daha yüksektir.',
    items: [
      {q: 'Küçük "e" harfinin büyük biçimi hangisidir?', a: 'E', w: ['A', 'İ', 'O', 'U']},
      {q: 'Küçük "ö" harfinin büyük biçimi hangisidir?', a: 'Ö', w: ['O', 'Ü', 'Ş', 'Ç']},
      {q: 'Büyük "Ş" harfinin küçük biçimi hangisidir?', a: 'ş', w: ['s', 'ç', 'ğ', 'z']},
    ],
  }),

  // ---------- Hayat Bilgisi ----------
  textTopic({
    id: '1-hb-okul', unit: HB, name: 'Okulumuz', symbol: '🏫', summary: 'Okulda uyman gereken kuralları öğren',
    intro: 'Okul, birlikte öğrendiğimiz ve sorumluluk aldığımız bir yerdir. Okulda temiz ve düzenli olmak herkesin görevidir.',
    paras: ['Çöpleri çöp kutusuna atmak, sınıfı temiz tutmak ve öğretmenimizi dinlemek okul kurallarındandır.'],
    tip: 'Okulu kendi evin gibi koru.',
    items: [
      {q: 'Okulda sınıfı temiz tutmak için ne yapılır?', a: 'Çöpleri çöp kutusuna atmak', w: ['Yere atmak', 'Boya dökmek', 'Camı kırmak', 'Kâğıtları dağıtmak']},
      {q: 'Okulda öğretmenimize karşı nasıl davranmalıyız?', a: 'Saygılı olmalıyız', w: ['Bağırmalıyız', 'Dinlememeliyiz', 'Alay etmeliyiz', 'Kaçmalıyız']},
    ],
  }),
  textTopic({
    id: '1-hb-aile', unit: HB, name: 'Ailemiz', symbol: '👨‍👩‍👧', summary: 'Aile üyelerini ve yakınlıklarını tanı',
    intro: 'Aile, birlikte yaşadığımız ve birbirimize destek olduğumuz en yakın insanlarımızdır.',
    paras: ['Annenin annesi anneanne, babanın babası dededir. Ailedeki herkes birbirine saygı gösterir.'],
    tip: 'Aile büyüklerini dinlemek ve onlara yardım etmek bizim görevimizdir.',
    items: [
      {q: 'Annenin annesine ne denir?', a: 'Anneanne', w: ['Teyze', 'Hala', 'Abla', 'Yenge']},
      {q: 'Babanın babasına ne denir?', a: 'Dede', w: ['Amca', 'Dayı', 'Kardeş', 'Enişte']},
      {q: 'Annenin kız kardeşine ne denir?', a: 'Teyze', w: ['Anneanne', 'Hala', 'Yenge', 'Abla']},
    ],
  }),
  textTopic({
    id: '1-hb-saglik', unit: HB, name: 'Sağlığımız', symbol: '🦷', summary: 'Sağlıklı yaşam alışkanlıklarını öğren',
    intro: 'Sağlıklı kalmak için temizliğe dikkat etmeli, dengeli beslenmeli ve yeterince uyumalıyız.',
    paras: ['Dişlerimizi günde iki kez fırçalamak, ellerimizi yemekten önce yıkamak sağlığımızı korur.'],
    tip: 'Düzenli uyku ve temizlik sağlığın temelidir.',
    items: [
      {q: 'Dişlerimizi günde kaç kez fırçalamalıyız?', a: 'İki kez', w: ['Hiç', 'Bir kez', 'On kez', 'Ayda bir']},
      {q: 'Yemekten önce ne yapmalıyız?', a: 'Ellerimizi yıkamalıyız', w: ['Koşmalıyız', 'Oyun oynamalıyız', 'Uyumalıyız', 'Yere oturmalıyız']},
      {q: 'Hangisi sağlıklı beslenmeye örnektir?', a: 'Meyve ve sebze yemek', w: ['Sürekli şeker yemek', 'Hiç su içmemek', 'Öğün atlamak', 'Fast food yemek']},
    ],
  }),
  textTopic({
    id: '1-hb-trafik', unit: HB, name: 'Trafik kuralları', symbol: '🚦', summary: 'Yaya olarak güvenli nasıl davranacağını öğren',
    intro: 'Yaya olarak yolda güvenli olmak için kurallara uymalıyız. Yaya geçidi ve trafik ışıkları bu kuralların bir parçasıdır.',
    paras: ['Karşıya yaya geçidinden ve yeşil ışıkta geçmeliyiz. Yolda koşmak tehlikelidir.'],
    tip: 'Yola çıkmadan önce sağa ve sola bak.',
    items: [
      {q: 'Yaya olarak karşıya nerede geçmeliyiz?', a: 'Yaya geçidinden', w: ['Araların arasından', 'Koşarak', 'Arabanın önünden', 'Köşeden atlayarak']},
      {q: 'Trafik ışığında yeşil yandığında ne yapılır?', a: 'Geçilir', w: ['Durulur', 'Koşulur', 'Telefon açılır', 'Bağırılır']},
    ],
  }),
  textTopic({
    id: '1-hb-mevsim', unit: HB, name: 'Mevsimler', symbol: '🍂', summary: 'Mevsimlerin özelliklerini öğren',
    intro: 'Yılda dört mevsim vardır: ilkbahar, yaz, sonbahar ve kış. Her mevsimin havası ve doğada görülen değişiklikleri farklıdır.',
    paras: ['Sonbaharda yapraklar sararır ve dökülür. Kışın hava soğuk olur ve kar yağabilir.'],
    tip: 'Mevsimleri doğadaki değişikliklerden hatırlayabilirsin.',
    items: [
      {q: 'Hangi mevsimde yapraklar sararır ve dökülür?', a: 'Sonbahar', w: ['Kış', 'Yaz', 'İlkbahar', 'Hiçbiri']},
      {q: 'Hangi mevsimde kar yağar?', a: 'Kış', w: ['Yaz', 'İlkbahar', 'Sonbahar', 'Hiçbiri']},
      {q: 'Hangi mevsimde çiçekler açar?', a: 'İlkbahar', w: ['Kış', 'Sonbahar', 'Yaz ortası gece', 'Hiçbiri']},
    ],
  }),

  // ---------- Müzik ----------
  textTopic({
    id: '1-mu-ritim', unit: MU, name: 'Ritim', symbol: '🥁', summary: 'Ritim çalan çalgıları tanı',
    intro: 'Ritim, müzikte seslerin düzenli aralıklarla tekrarlanmasıdır. Davul ve tef ritim çalgılarıdır.',
    paras: ['Elimizi masaya vurarak ya da el çırparak basit bir ritim yapabiliriz.'],
    tip: 'Şarkıya eşlik ederken ritme uyarak el çırpabilirsin.',
    items: [
      {q: 'Hangi çalgı ritim tutmak için kullanılır?', a: 'Davul', w: ['Keman', 'Flüt', 'Piyano', 'Lavta']},
      {q: 'Ritim nedir?', a: 'Seslerin düzenli tekrarı', w: ['Yüksek ses', 'Sessizlik', 'Şarkı sözü', 'Nota adı']},
    ],
  }),
  textTopic({
    id: '1-mu-calgi', unit: MU, name: 'Müzik aletleri', symbol: '🎸', summary: 'Müzik aletlerini adlarıyla tanı',
    intro: 'Müzik aletleri, ses çıkararak müzik yapmamızı sağlayan araçlardır.',
    paras: ['Gitar telli, flüt üflemeli, davul vurmalı bir müzik aletidir.'],
    tip: 'Bir çalgıyı görünce nasıl ses çıkardığını düşün.',
    items: [
      {q: 'Hangisi bir müzik aletidir?', a: 'Gitar', w: ['Masa', 'Sandalye', 'Kalem', 'Kapı']},
      {q: 'Flüt nasıl çalınır?', a: 'Üfleyerek', w: ['Vurarak', 'Telini çekerek', 'Sallayarak', 'Sürterek']},
    ],
  }),
  textTopic({
    id: '1-mu-sarki', unit: MU, name: 'Şarkı söyleme', symbol: '🎤', summary: 'Güzel şarkı söylemenin kurallarını öğren',
    intro: 'Şarkı söylerken sesimizi doğru ayarlamak ve sözleri net söylemek önemlidir.',
    paras: ['Bağırmadan, sesimizi uygun seviyede tutarak şarkı söyleriz. Nefesimizi düzenli kullanırız.'],
    tip: 'Şarkı söylerken arkadaşlarınla uyumlu olmaya çalış.',
    items: [
      {q: 'Şarkı söylerken ne yapmalıyız?', a: 'Sesi uygun ayarlamak', w: ['Bağırmak', 'Kulakları kapatmak', 'Konuşmak', 'Hiç nefes almamak']},
      {q: 'Müziğe eşlik ederken ne yapabiliriz?', a: 'El çırpabiliriz', w: ['Uyuyabiliriz', 'Bağırabiliriz', 'Kaçabiliriz', 'Kulak tıkayabiliriz']},
    ],
  }),

  // ---------- Görsel Sanatlar ----------
  textTopic({
    id: '1-gs-renk', unit: GS, name: 'Renkler', symbol: '🎨', summary: 'Ana renkleri tanı',
    intro: 'Ana renkler kırmızı, sarı ve mavidir. Bu renkler karıştırılarak başka renkler elde edilebilir.',
    paras: ['Kırmızı ile sarıyı karıştırırsak turuncu, sarı ile maviyi karıştırırsak yeşil elde ederiz.'],
    tip: 'Renkleri karıştırarak yeni renkler denemekten çekinme.',
    items: [
      {q: 'Hangileri ana renklerdendir?', a: 'Kırmızı, sarı, mavi', w: ['Yeşil, mor, turuncu', 'Siyah, beyaz, gri', 'Pembe, kahverengi, lacivert', 'Mor, pembe, yeşil']},
      {q: 'Kırmızı ve sarı karıştırılırsa hangi renk oluşur?', a: 'Turuncu', w: ['Yeşil', 'Mor', 'Siyah', 'Gri']},
      {q: 'Sarı ve mavi karıştırılırsa hangi renk oluşur?', a: 'Yeşil', w: ['Turuncu', 'Kırmızı', 'Beyaz', 'Pembe']},
    ],
  }),
  textTopic({
    id: '1-gs-cizgi', unit: GS, name: 'Çizgiler', symbol: '〰', summary: 'Farklı çizgi türlerini tanı',
    intro: 'Çizgiler yön ve hareket anlatır. Yatay, dikey, eğri ve kırık çizgiler farklı duygular verir.',
    paras: ['Yatay çizgi yere paralel uzanır, dikey çizgi yukarıdan aşağıya iner.'],
    tip: 'Çizgileri çizerken elini rahat tutmaya çalış.',
    items: [
      {q: 'Yere paralel uzanan çizgiye ne denir?', a: 'Yatay çizgi', w: ['Dikey çizgi', 'Eğri çizgi', 'Kırık çizgi', 'Noktalı çizgi']},
      {q: 'Yukarıdan aşağıya inen çizgiye ne denir?', a: 'Dikey çizgi', w: ['Yatay çizgi', 'Eğri çizgi', 'Kırık çizgi', 'Noktalı çizgi']},
    ],
  }),
  textTopic({
    id: '1-gs-sekil', unit: GS, name: 'Geometrik şekiller', symbol: '△', summary: 'Geometrik şekilleri adlarıyla tanı',
    intro: 'Üçgen, kare, daire ve dikdörtgen temel geometrik şekillerdir.',
    paras: ['Üçgenin üç kenarı, karenin dört eşit kenarı vardır. Dairenin kenarı yoktur.'],
    tip: 'Şekilleri kenar sayısına bakarak ayırt edebilirsin.',
    items: [
      {q: 'Üç kenarı olan şekil hangisidir?', a: 'Üçgen', w: ['Kare', 'Daire', 'Dikdörtgen', 'Altıgen']},
      {q: 'Tüm kenarları eşit olan dört kenarlı şekil hangisidir?', a: 'Kare', w: ['Üçgen', 'Daire', 'Dikdörtgen', 'Beşgen']},
      {q: 'Kenarı olmayan şekil hangisidir?', a: 'Daire', w: ['Üçgen', 'Kare', 'Dikdörtgen', 'Altıgen']},
    ],
  }),

  // ---------- Beden Eğitimi ----------
  textTopic({
    id: '1-be-saglik', unit: BE, name: 'Sağlıklı yaşam', symbol: '🏃', summary: 'Sporun sağlığa faydasını öğren',
    intro: 'Düzenli spor yapmak, vücudumuzu güçlendirir ve sağlığımızı korur.',
    paras: ['Her gün hareket etmek, koşmak ve oynamak kaslarımızı ve kalbimizi güçlendirir.'],
    tip: 'Oyun oynamak da bir spor çeşididir.',
    items: [
      {q: 'Sağlıklı yaşam için ne yapmalıyız?', a: 'Spor yapmak', w: ['Sürekli oturmak', 'Geç yatmak', 'Su içmemek', 'Hiç hareket etmemek']},
      {q: 'Hangisi vücudumuzu güçlendirir?', a: 'Düzenli hareket', w: ['Sürekli uyumak', 'Hiç su içmemek', 'Televizyonda oturmak', 'Atıştırmalık yemek']},
    ],
  }),
  textTopic({
    id: '1-be-kural', unit: BE, name: 'Oyun kuralları', symbol: '⚽', summary: 'Oyunlarda kurallara uymanın önemini öğren',
    intro: 'Her oyunun kuralları vardır. Kurallara uymak, oyunu adil ve eğlenceli kılar.',
    paras: ['Oyunda sırayla oynamak ve arkadaşlarımızı kırmamak önemlidir.'],
    tip: 'Kazanmak kadar, adil oynamak da önemlidir.',
    items: [
      {q: 'Oyunda kurallara uymak neyi gösterir?', a: 'Saygı', w: ['Kaba davranış', 'Hile', 'Kavga', 'Tembellik']},
      {q: 'Oyunda sıra bekleyerek oynamak neyi gösterir?', a: 'Sabır ve saygı', w: ['Tembellik', 'Kaba davranış', 'Hile', 'Kavga']},
    ],
  }),
  textTopic({
    id: '1-be-denge', unit: BE, name: 'Denge', symbol: '🤸', summary: 'Denge hareketlerinin ne olduğunu öğren',
    intro: 'Denge, vücudu düşmeden bir noktada tutabilme becerisidir.',
    paras: ['Tek ayak üstünde durmak, denge becerimizi geliştirir.'],
    tip: 'Dengeyi geliştirmek için her gün birkaç saniye tek ayak üstünde dur.',
    items: [
      {q: 'Tek ayak üstünde durabilme becerisine ne denir?', a: 'Denge', w: ['Koşu', 'Atlama', 'Yüzme', 'Zıplama']},
      {q: 'Denge becerisini geliştirmek için ne yapılabilir?', a: 'Tek ayak üstünde durmak', w: ['Hiç hareket etmemek', 'Sürekli oturmak', 'Uyumak', 'Yemek yemek']},
    ],
  }),
];
