// 5. sınıf: Türkçe, Fen Bilimleri, Sosyal Bilgiler, İngilizce, Din Kültürü, Görsel Sanatlar, Müzik, Beden Eğitimi.
// Metin tabanlı konular: her madde {q, a, w}; w tam 4 yanlış seçenek içerir.

function textTopic({id, unit, name, symbol, summary, intro, paras, tip, items}) {
  return {
    id, grade: 5, unit, name, symbol, summary, kind: 'text',
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
    id: '5-tr-kok', unit: TR, name: 'Sözcükte yapı', symbol: 'kök', summary: 'Kök ve gövdeyi ayır, türetilmiş sözcükleri tanı',
    intro: 'Kök, sözcüğün temel anlamını taşıyan kısımdır. Köke yapım eki eklenerek yeni bir sözcük, çekim eki eklenerek ise çekimli bir biçim oluşur.',
    paras: ['"Göz" kökünden "gözlük" türetilmiştir. "Gözlüğü" sözcüğünde "-ü" çekim ekidir.'],
    tip: 'Yapım eki sözcüğün türünü değiştirebilir; çekim eki ise yalnızca biçimini değiştirir.',
    items: [
      {q: '"Kitaplık" sözcüğünün kökü hangisidir?', a: 'kitap', w: ['kitaplık', 'lık', 'kitapl', 'kita']},
      {q: '"Güzellik" sözcüğünde kök hangisidir?', a: 'güzel', w: ['güzellik', 'lik', 'güzelli', 'zellik']},
      {q: '"Evlerimizden" sözcüğündeki çekim eki hangisidir?', a: '-imiz', w: ['-ler', '-den', '-ev', '-leri']},
    ],
  }),
  textTopic({
    id: '5-tr-noktalama', unit: TR, name: 'İki nokta ve noktalı virgül', symbol: ';', summary: 'İki nokta ve noktalı virgülün kullanımını öğren',
    intro: 'İki nokta, bir açıklama ya da sıralama öncesinde kullanılır. Noktalı virgül ise birbiriyle ilişkili iki cümleyi ayırır.',
    paras: ['"Çantamda şunlar var: kalem, defter, silgi." cümlesinde iki nokta sıralamayı başlatır.'],
    tip: 'Noktalı virgül yerine çoğu zaman nokta da kullanılabilir; ama ilişkili cümleler için noktalı virgül daha uygundur.',
    items: [
      {q: 'Bir açıklama ya da sıralamadan önce hangi işaret kullanılır?', a: 'İki nokta', w: ['Noktalı virgül', 'Virgül', 'Tire', 'Üç nokta']},
      {q: 'Birbiriyle ilişkili iki cümleyi ayıran işaret hangisidir?', a: 'Noktalı virgül', w: ['Virgül', 'Tırnak', 'Kesme işareti', 'Ünlem']},
      {q: 'Hangi cümlede iki nokta doğru kullanılmıştır?', a: 'Aradığım kitap şu: Sefiller.', w: ['Aradığım: kitap şu Sefiller.', 'Aradığım kitap; şu: Sefiller', 'Aradığım kitap şu; Sefiller:', 'Aradığım: kitap; şu Sefiller']},
    ],
  }),
  textTopic({
    id: '5-tr-olay', unit: TR, name: 'Olay ve yer', symbol: '⏱', summary: 'Hikâyede olay, yer ve zamanı belirle',
    intro: 'Hikâyenin temel öğeleri olay, kişi, yer ve zamandır. Olay örgüsü başlangıç, gelişme, düğüm ve sonuç bölümlerinden oluşur.',
    paras: ['Hikâyede düğüm, olayın en gergin noktasıdır; çözüm ise sorunun giderildiği bölümdür.'],
    tip: 'Bir hikâyeyi okurken olayların hangi sırayla geliştiğini not almak yardımcı olur.',
    items: [
      {q: 'Olayın en gergin noktasına ne denir?', a: 'Düğüm', w: ['Giriş', 'Sonuç', 'Çözüm', 'Tema']},
      {q: 'Hikâyenin temel öğeleri arasında hangisi yoktur?', a: 'Ölçü', w: ['Olay', 'Kişi', 'Yer', 'Zaman']},
      {q: 'Sorunun giderildiği bölüme ne denir?', a: 'Çözüm', w: ['Düğüm', 'Giriş', 'Gelişme', 'Ara sonuç']},
    ],
  }),

  // ---------- Fen Bilimleri ----------
  textTopic({
    id: '5-fen-canli', unit: FEN, name: 'Canlıların ortak özellikleri', symbol: '🌱', summary: 'Canlıların ortak özelliklerini öğren',
    intro: 'Canlılar; beslenir, solunum yapar, üreme yapar, hareket eder, büyür ve gelişir, uyarılara tepki verir.',
    paras: ['Bitkiler de canlıdır; çünkü büyür, üreir ve dış uyaranlara tepki verir.'],
    tip: 'Bir varlığın canlı olup olmadığını anlamak için bu özelliklerin hepsine bakmak gerekir.',
    items: [
      {q: 'Canlıların ortak özelliklerinden biri hangisidir?', a: 'Solunum yapmak', w: ['Elektrik üretmek', 'Kendiliğinden parlamak', 'Taş gibi sert olmak', 'Hiç büyümemek']},
      {q: 'Bitkilerin canlı olduğunu gösteren özellik hangisidir?', a: 'Büyüyüp gelişmek', w: ['Hareket etmek için sinir sistemi olmak', 'Ses çıkarmak', 'Işık yaymak', 'Sıcaklık üretmek']},
      {q: 'Canlılar uyaranlara ne yapar?', a: 'Tepki verir', w: ['Hiç tepki vermez', 'Sadece uyur', 'Renk değiştirir', 'Kendini yok eder']},
    ],
  }),
  textTopic({
    id: '5-fen-madde', unit: FEN, name: 'Maddenin halleri', symbol: '💧', summary: 'Katı, sıvı ve gaz hallerini ve değişimlerini öğren',
    intro: 'Madde katı, sıvı ve gaz olmak üzere üç temel halde bulunabilir. Isı değişimiyle hal değişimi gerçekleşir.',
    paras: ['Buzun erimesi katıdan sıvıya, suyun buharlaşması sıvıdan gaza geçiştir.'],
    tip: 'Isı alan maddeler genellikle katıdan sıvıya, sıvıdan gaza geçer.',
    items: [
      {q: 'Buzun erimesi hangi hal değişimidir?', a: 'Katıdan sıvıya', w: ['Sıvıdan gaza', 'Gazdan sıvıya', 'Sıvıdan katıya', 'Gazdan katıya']},
      {q: 'Suyun buharlaşması hangi hal değişimidir?', a: 'Sıvıdan gaza', w: ['Katıdan sıvıya', 'Gazdan sıvıya', 'Sıvıdan katıya', 'Katıdan gaza']},
      {q: 'Hangi hal sabit bir şekle ve hacme sahiptir?', a: 'Katı', w: ['Sıvı', 'Gaz', 'Plazma', 'Hiçbiri']},
    ],
  }),
  textTopic({
    id: '5-fen-kuvvet', unit: FEN, name: 'Kuvvet', symbol: 'N', summary: 'Kuvvetin etkilerini ve birimini öğren',
    intro: 'Kuvvet, cisimlerin hareketini, şeklini veya yönünü değiştiren etkidir. Kuvvetin birimi newton (N) dur.',
    paras: ['Bir topu itmek ya da çekmek kuvvet uygulamaktır. Kuvvet, yay ile dinamometre kullanılarak ölçülür.'],
    tip: 'Kuvvetin büyüklüğü ve yönü birlikte önemlidir.',
    items: [
      {q: 'Kuvvetin birimi nedir?', a: 'Newton', w: ['Metre', 'Kilogram', 'Saniye', 'Litre']},
      {q: 'Kuvveti ölçmek için hangi araç kullanılır?', a: 'Dinamometre', w: ['Termometre', 'Barometre', 'Cetvel', 'Terazi kefesi']},
      {q: 'Kuvvet cisimlerde hangi değişikliği yapabilir?', a: 'Hareket, şekil ve yön değişikliği', w: ['Sadece renk değişikliği', 'Sadece boyut değişikliği', 'Hiçbir değişiklik', 'Sadece ses']},
    ],
  }),
  textTopic({
    id: '5-fen-isik', unit: FEN, name: 'Işığın yayılması', symbol: '☀', summary: 'Işığın yayılma özelliklerini öğren',
    intro: 'Işık, düz çizgi boyunca yayılır. Saydam maddelerden geçer, yarı saydamlar kısmen, opak maddeler ise geçirmez.',
    paras: ['Güneş ışığı bir cisme çarptığında cismin arkasında gölge oluşur.'],
    tip: 'Gölgenin oluşması için ışık kaynağı, cisim ve ekran aynı doğrultuda olmalıdır.',
    items: [
      {q: 'Işık nasıl yayılır?', a: 'Düz çizgi boyunca', w: ['Eğri çizgi boyunca', 'Dalga gibi yukarı', 'Her yöne eşit olmadan', 'Sadece aşağı']},
      {q: 'Işığı hiç geçirmeyen maddelere ne denir?', a: 'Opak', w: ['Saydam', 'Yarı saydam', 'Geçirgen', 'Parlak']},
      {q: 'Cismin arkasında oluşan karanlık bölgeye ne denir?', a: 'Gölge', w: ['Yansıma', 'Kırılma', 'Renk', 'Işık hüzmesi']},
    ],
  }),

  // ---------- Sosyal Bilgiler ----------
  textTopic({
    id: '5-sos-harita', unit: SOS, name: 'Harita bilgisi', symbol: '🗺', summary: 'Harita ölçeği, lejant ve yön bulmayı öğren',
    intro: 'Harita, yeryüzünün küçültülmüş ve düzleştirilmiş görünümüdür. Haritada kullanılan semboller lejantta açıklanır.',
    paras: ['Ölçek, haritadaki uzunlukla gerçek uzunluk arasındaki orantıyı gösterir.'],
    tip: 'Bir haritayı okurken önce lejantı ve ölçeği kontrol et.',
    items: [
      {q: 'Haritadaki sembollerin açıklamasına ne denir?', a: 'Lejant', w: ['Ölçek', 'Enlem', 'Boylam', 'Kıta']},
      {q: 'Haritadaki uzunlukla gerçek uzunluk arasındaki orana ne denir?', a: 'Ölçek', w: ['Lejant', 'Yön', 'Paralel', 'Meridyen']},
      {q: 'Harita okurken hangi bilgi önce kontrol edilmelidir?', a: 'Lejant ve ölçek', w: ['Haritanın rengi', 'Haritanın kağıt kalınlığı', 'Yazının boyu', 'Çerçevenin rengi']},
    ],
  }),
  textTopic({
    id: '5-sos-kita', unit: SOS, name: 'Kıtalar ve okyanuslar', symbol: '🌍', summary: 'Kıtaları ve okyanusları tanı',
    intro: 'Dünyada yedi kıta ve beş okyanus bulunur. Türkiye, Asya ve Avrupa kıtaları üzerinde yer alır.',
    paras: ['Pasifik Okyanusu dünyanın en büyük okyanusudur.'],
    tip: 'Kıtaları ve okyanusları harita üzerinde göstermek bilgiyi kalıcı hale getirir.',
    items: [
      {q: 'Dünyada kaç kıta vardır?', a: '7', w: ['5', '6', '8', '9']},
      {q: 'Dünyanın en büyük okyanusu hangisidir?', a: 'Pasifik Okyanusu', w: ['Atlas Okyanusu', 'Hint Okyanusu', 'Arktik Okyanusu', 'Akdeniz']},
      {q: 'Türkiye hangi kıtalar üzerinde yer alır?', a: 'Asya ve Avrupa', w: ['Afrika ve Asya', 'Avrupa ve Afrika', 'Amerika ve Asya', 'Okyanusya ve Avrupa']},
    ],
  }),
  textTopic({
    id: '5-sos-ilk-devlet', unit: SOS, name: 'Türklerin ilk devletleri', symbol: '🐺', summary: 'Hunlar ve Göktürkler gibi ilk Türk devletlerini tanı',
    intro: 'Türkler tarih boyunca birçok devlet kurmuştur. Hunlar ve Göktürkler bunların en bilinenlerindendir.',
    paras: ['Hunlar Mete Han döneminde güçlenmiş; Göktürkler ise Orhun Yazıtları ile tanınmıştır.'],
    tip: 'Devletleri kuruluş dönemleri ve önemli hükümdarlarıyla birlikte öğrenmek kolaylık sağlar.',
    items: [
      {q: 'Orhun Yazıtları hangi devlete aittir?', a: 'Göktürkler', w: ['Hunlar', 'Selçuklular', 'Osmanlılar', 'Gazneliler']},
      {q: 'Hunların en güçlü dönemindeki hükümdarları kimdir?', a: 'Mete Han', w: ['Alp Arslan', 'Fatih Sultan Mehmet', 'Kanuni Sultan Süleyman', 'Osman Bey']},
      {q: 'Hangisi Türklerin kurduğu ilk devletlerden biridir?', a: 'Hunlar', w: ['Osmanlı', 'Bizans', 'Roma', 'Mısır']},
    ],
  }),

  // ---------- İngilizce ----------
  textTopic({
    id: '5-en-greet', unit: EN, name: 'Greetings', symbol: 'Hi', summary: 'Selamlaşma ifadelerini öğren',
    intro: '"Hello" ve "Hi" genel selamlaşmalardır. "Good morning" sabah, "Good evening" akşam için kullanılır.',
    paras: ['Biriyle tanıştığında "Nice to meet you" diyebilirsin.'],
    tip: 'Selamlaşma ifadelerini gün zamanına göre seçmek doğal görünmeni sağlar.',
    items: [
      {q: '"Good morning" ne zaman kullanılır?', a: 'Sabahları', w: ['Akşamları', 'Geceleri', 'Öğle sonrası', 'Gece yarısı']},
      {q: '"Nice to meet you" ne anlama gelir?', a: 'Tanıştığıma memnun oldum', w: ['Hoşça kal', 'Nasılsın', 'Teşekkür ederim', 'Özür dilerim']},
      {q: 'Hangisi bir selamlaşma ifadesidir?', a: 'Hello', w: ['Goodbye', 'Thank you', 'Sorry', 'Please']},
    ],
  }),
  textTopic({
    id: '5-en-colours', unit: EN, name: 'Colours', symbol: '🎨', summary: 'Renk adlarını İngilizce öğren',
    intro: 'Renk adları İngilizce "colours" olarak anılır. Temel renkler: red, blue, yellow, green, black, white.',
    paras: ['"The sky is blue." cümlesinde "blue" mavi demektir.'],
    tip: 'Renkleri eşyalarla birlikte öğrenmek akılda kalıcılığı artırır.',
    items: [
      {q: '"Kırmızı" İngilizcede nedir?', a: 'Red', w: ['Blue', 'Green', 'Yellow', 'Black']},
      {q: '"Yellow" hangi renktir?', a: 'Sarı', w: ['Mavi', 'Yeşil', 'Kırmızı', 'Siyah']},
      {q: '"The grass is green." cümlesinde "green" hangi renktir?', a: 'Yeşil', w: ['Mavi', 'Kırmızı', 'Sarı', 'Beyaz']},
    ],
  }),
  textTopic({
    id: '5-en-numbers', unit: EN, name: 'Numbers', symbol: '123', summary: 'Sayıları İngilizce olarak öğren',
    intro: 'İngilizcede sayılar one, two, three şeklinde okunur. On ikiye kadar sayılar özel adlarla anılır.',
    paras: ['"Three apples" ifadesinde "three" 3 demektir.'],
    tip: 'Sayıları 1-12 arası ezberlemek günlük konuşmalarda işine yarar.',
    items: [
      {q: '"Five" sayısının rakamı hangisidir?', a: '5', w: ['4', '6', '7', '3']},
      {q: '"Ten" hangi sayıdır?', a: '10', w: ['8', '9', '11', '12']},
      {q: '"Seven" kaç sayısıdır?', a: '7', w: ['5', '6', '8', '9']},
    ],
  }),

  // ---------- Din Kültürü ----------
  textTopic({
    id: '5-din-ibadet', unit: DIN, name: 'İbadet', symbol: '🕌', summary: 'İbadetlerin anlamını ve çeşitlerini öğren',
    intro: 'İbadet, Allah\'a yakınlaşmak amacıyla yapılan dini uygulamalardır. Namaz, oruç, zekât ve hac başlıca ibadetlerdendir.',
    paras: ['İbadetler sadece ritüel değil, aynı zamanda ahlaki sorumlulukların da bir parçasıdır.'],
    tip: 'İbadetlerin amacını anlamak, onları daha bilinçli yapmamıza yardım eder.',
    items: [
      {q: 'Günde beş vakit kılınan ibadet hangisidir?', a: 'Namaz', w: ['Oruç', 'Hac', 'Zekât', 'Kurban']},
      {q: 'Ramazan ayında tutulan ibadet hangisidir?', a: 'Oruç', w: ['Namaz', 'Hac', 'Zekât', 'Fitre']},
      {q: 'Malın belirli bir oranını ihtiyaç sahiplerine vermeye ne denir?', a: 'Zekât', w: ['Oruç', 'Hac', 'Namaz', 'Kurban']},
    ],
  }),
  textTopic({
    id: '5-din-ahlak', unit: DIN, name: 'Dürüstlük', symbol: '⚖', summary: 'Dürüstlüğün önemini ve örneklerini öğren',
    intro: 'Dürüstlük, doğru söylemek ve sözünde durmaktır. Dinimizde dürüst olmak önemli bir ahlaki değerdir.',
    paras: ['Bulduğumuz bir eşyayı sahibine teslim etmek dürüstlük örneğidir.'],
    tip: 'Dürüstlük hem kendimize hem topluma güven kazandırır.',
    items: [
      {q: 'Dürüstlük neyi ifade eder?', a: 'Doğru söylemek ve sözünde durmak', w: ['Çok konuşmak', 'Herkesi kırmak', 'Yalan söylemek', 'Kuralları bozmak']},
      {q: 'Hangisi dürüstlüğe örnektir?', a: 'Bulduğu eşyayı sahibine geri vermek', w: ['Arkadaşını kandırmak', 'Sınavda kopya çekmek', 'Yalan söylemek', 'Ödevi başkasına yaptırmak']},
    ],
  }),

  // ---------- Görsel Sanatlar ----------
  textTopic({
    id: '5-gs-resim', unit: GS, name: 'Resim türleri', symbol: '🖼', summary: 'Resim türlerini ve özelliklerini tanı',
    intro: 'Resim türleri konularına göre portre, manzara, natürmort ve soyut resim olarak sınıflandırılır.',
    paras: ['Portre insan yüzünü, manzara doğa görüntüsünü, natürmort ise cansız nesneleri konu alır.'],
    tip: 'Bir resmin türünü anlamak için ana konusuna bakmak yeterlidir.',
    items: [
      {q: 'İnsan yüzünü konu alan resim türü hangisidir?', a: 'Portre', w: ['Manzara', 'Natürmort', 'Karikatür', 'Afiş']},
      {q: 'Cansız nesneleri konu alan resim türü hangisidir?', a: 'Natürmort', w: ['Portre', 'Manzara', 'Karikatür', 'Heykel']},
      {q: 'Doğa görüntüsünü konu alan resim türü hangisidir?', a: 'Manzara', w: ['Portre', 'Natürmort', 'Soyut', 'Afiş']},
    ],
  }),
  textTopic({
    id: '5-gs-karakalem', unit: GS, name: 'Karakalem tekniği', symbol: '✏', summary: 'Karakalemle gölgelendirme ve tonlamayı öğren',
    intro: 'Karakalem çalışmalarında farklı sert ve yumuşak kalemler kullanılarak ton ve gölge elde edilir.',
    paras: ['Yumuşak kalemler daha koyu tonlar verir; sert kalemler daha açık ve ince çizgiler oluşturur.'],
    tip: 'Gölgeyi kademeli olarak koyulaştırmak resmin derinliğini artırır.',
    items: [
      {q: 'Karakalemde koyu ton elde etmek için hangi kalem uygundur?', a: 'Yumuşak kalem', w: ['Sert kalem', 'Tükenmez kalem', 'Kurşun kalem uçlu', 'Keçeli kalem']},
      {q: 'Karakalem çalışmasında derinliği artıran öğe nedir?', a: 'Kademeli gölgelendirme', w: ['Tek renk boyama', 'Kenar çizgisi', 'Hızlı çizim', 'Silgi kullanmamak']},
    ],
  }),

  // ---------- Müzik ----------
  textTopic({
    id: '5-mu-solfej', unit: MU, name: 'Solfej: nota okuma', symbol: '𝄞', summary: 'Sol anahtarı ve nota okuma temelini öğren',
    intro: 'Solfej, notaları okuma ve seslendirme becerisidir. Sol anahtarı, sesleri belirli perdelere yerleştirir.',
    paras: ['Sol anahtarı nota çizgisinin başında bulunur ve sol sesini gösterir.'],
    tip: 'Notaları önce okuyup sonra seslendirerek çalışmak doğru perde algısını geliştirir.',
    items: [
      {q: 'Nota çizgisinin başında bulunan ve sesleri perdelere yerleştiren işarete ne denir?', a: 'Anahtar', w: ['Ölçü', 'Vuruş', 'Gam', 'Makam']},
      {q: 'Notaların okunup seslendirilmesi becerisine ne denir?', a: 'Solfej', w: ['Kompozisyon', 'Tempo', 'Makam', 'Ritim tutma']},
      {q: 'En yaygın kullanılan anahtar hangisidir?', a: 'Sol anahtarı', w: ['Fa anahtarı', 'Do anahtarı', 'Ritim anahtarı', 'Sol bemol anahtarı']},
    ],
  }),
  textTopic({
    id: '5-mu-turk', unit: MU, name: 'Türk müziği çalgıları', symbol: '🪕', summary: 'Ney, kanun ve bağlamayı tanı',
    intro: 'Türk müziğinde ney üflemeli, kanun telli ve bağlama telli çalgılar olarak yer alır.',
    paras: ['Ney, kamış gövdeli bir üflemeli çalgıdır; kanun ise tellerinin üzerinde mızrapla çalınan bir çalgıdır.'],
    tip: 'Çalgıları dinlerken sesin tınısına dikkat ederek ayırt edebilirsin.',
    items: [
      {q: 'Ney hangi çalgı grubundadır?', a: 'Üflemeli', w: ['Telli', 'Vurmalı', 'Yaylı', 'Elektronik']},
      {q: 'Kanun hangi çalgı grubundadır?', a: 'Telli', w: ['Üflemeli', 'Vurmalı', 'Yaylı', 'Sözlü']},
      {q: 'Hangisi Türk müziğinin telli çalgılarından biridir?', a: 'Bağlama', w: ['Ney', 'Davul', 'Flüt', 'Trompet']},
    ],
  }),

  // ---------- Beden Eğitimi ----------
  textTopic({
    id: '5-be-kondisyon', unit: BE, name: 'Kondisyon', symbol: '🏃', summary: 'Kondisyon çalışmasının ilkelerini öğren',
    intro: 'Kondisyon, dayanıklılık, güç ve hız gibi fiziksel becerilerin bütünüdür. Düzenli çalışmayla geliştirilir.',
    paras: ['Kondisyon çalışmalarında, yavaş başlayıp aşamalı olarak yoğunluğu artırmak önemlidir.'],
    tip: 'Antrenmanlarda dinlenme günlerini de programına eklemeyi unutma.',
    items: [
      {q: 'Kondisyon çalışmasında yoğunluk nasıl artırılmalıdır?', a: 'Aşamalı olarak', w: ['Birden fazla', 'Hiç artırmadan', 'Her gün iki katına', 'Ölçü olmaksızın']},
      {q: 'Fiziksel becerilerin bütününe ne denir?', a: 'Kondisyon', w: ['Esneklik', 'Tempo', 'Takım ruhu', 'Hakemlik']},
    ],
  }),
  textTopic({
    id: '5-be-beslenme', unit: BE, name: 'Sporda beslenme', symbol: '🥗', summary: 'Sporcular için dengeli beslenmeyi öğren',
    intro: 'Sporcular için dengeli beslenme; karbonhidrat, protein, yağ, vitamin ve mineral içeren besinlerle sağlanır.',
    paras: ['Antrenman öncesinde hafif ve enerji veren besinler tercih edilmelidir.'],
    tip: 'Su tüketimi, spor performansını doğrudan etkileyen bir unsurdur.',
    items: [
      {q: 'Vücuda hızlı enerji veren besin grubu hangisidir?', a: 'Karbonhidrat', w: ['Vitamin', 'Mineral', 'Su', 'Lif']},
      {q: 'Antrenman öncesinde nasıl bir öğün tercih edilmelidir?', a: 'Hafif ve enerji veren', w: ['Çok ağır ve yağlı', 'Hiç yemeden', 'Bol şekerli', 'Tek başına çikolata']},
      {q: 'Spor performansını doğrudan etkileyen unsur hangisidir?', a: 'Su tüketimi', w: ['Renk seçimi', 'Ayakkabı numarası', 'Oyun sayısı', 'Hakem sayısı']},
    ],
  }),
];
