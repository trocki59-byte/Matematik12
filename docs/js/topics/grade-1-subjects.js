// 1. sınıf: Türkçe, Hayat Bilgisi, Müzik, Görsel Sanatlar, Beden Eğitimi.
// Metin tabanlı konular: her soru bir "items" listesinden seçilir. Her madde {q, a, w}:
// q soru, a doğru cevap, w dört yanlış seçenek (3 ya da 4 tane; 4 olmalı).

function textTopic({id, unit, name, symbol, summary, intro, paras, tip, items, more}) {
  const extra = more?.sections ?? [];
  const examples = more?.examples ?? items.slice(0, 3).map(it => ({problem: it.q, steps: ['Soruyu dikkatlice oku.', 'Seçenekleri tek tek değerlendir.', `Doğru cevap: ${it.a}`], answer: it.a}));
  return {
    id, grade: 1, unit, name, symbol, summary, kind: 'text',
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
    id: '1-tr-harf', unit: TR, name: 'Türk alfabesi', symbol: 'Aa', summary: 'Türk alfabesindeki harfleri tanı',
    intro: 'Türk alfabesinde 29 harf vardır. Her harfin büyük ve küçük biçimi bulunur.',
    paras: ['Alfabede a, b, c, ç, d, e … harfleri sırayla yer alır. Büyük A, küçük a\'nın büyük biçimidir.'],
    tip: 'Alfabeyi her gün birkaç harf tekrar ederek ezberleyebilirsin.',
    more: {
      sections: [
        {title: 'Harflerin sırası', paras: ['Türk alfabesinde 29 harf vardır: a, b, c, ç, d, e, f, g, ğ, h, ı, i, j, k, l, m, n, o, ö, p, r, s, ş, t, u, ü, v, y, z.', 'Q, w ve x harfleri Türkçede kullanılmaz. Alfabeyi sırayla ezberlemek sözcükleri sözlükte bulmayı kolaylaştırır.']},
        {title: 'Büyük ve küçük harf', paras: ['Her harfin bir büyük (A, B, C) ve bir küçük (a, b, c) biçimi vardır. Cümlenin ilk harfi ve özel isimler büyük yazılır.']},
      ],
      examples: [
        {problem: 'Alfabede d harfinden sonra hangi harf gelir?', steps: ['Alfabe sırasına bak: c, ç, d, e ...', 'd harfinden hemen sonra e gelir.'], answer: 'e'},
        {problem: 'Alfabede ş harfinden hemen önce hangi harf gelir?', steps: ['Alfabe sırasına bak: r, s, ş, t ...', 'ş harfinden önce s harfi gelir.'], answer: 's'},
      ],
    },
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
    more: {
      sections: [
        {title: 'Sesli harfler', paras: ['Sesli harfler a, e, ı, i, o, ö, u, ü harfleridir. Sekiz tanedir.', 'Sesli harfler bir sözcükte ses çıkarmamızı sağlar. Her hecede mutlaka bir sesli harf bulunur.']},
        {title: 'Sessiz harfler', paras: ['Sesli harfler dışındaki harfler sessiz harflerdir: b, c, ç, d, f, g, ğ, h, j, k, l, m, n, p, r, s, ş, t, v, y, z.']},
      ],
      examples: [
        {problem: 'okul sözcüğünde kaç sesli harf vardır?', steps: ['Harfleri tek tek bak: o, k, u, l.', 'Sesli harfler o ve u dur.'], answer: '2'},
        {problem: 'top sözcüğünde kaç sessiz harf vardır?', steps: ['Harfleri tek tek bak: t, o, p.', 'Sesli harf o dur, sessiz harfler t ve p dir.'], answer: '2'},
      ],
    },
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
    more: {
      sections: [
        {title: 'Hece nedir?', paras: ['Hece, bir sözcüğü söylerken tek seferde çıkan ses parçasıdır. Her hecede bir sesli harf bulunur.', 'Sözcüğü yavaşça söyle ve kaç kez ağzını açtığını say. Ağzını her açtığında bir hece vardır.']},
        {title: 'Heceleme', paras: ['Hecelere ayırırken sesli harflerin yerine bakılır. Sözcük sessiz harflerle ya da sesli harfle bitebilir.']},
      ],
      examples: [
        {problem: 'okul sözcüğünü hecelerine ayır.', steps: ['Sesli harfleri bul: o ve u.', 'Her sesli harf bir hece oluşturur: o-kul.'], answer: 'o-kul'},
        {problem: 'kitap sözcüğü kaç hecelidir?', steps: ['Sesli harfleri say: i ve a.', 'İki sesli harf olduğu için iki hece vardır: ki-tap.'], answer: '2'},
      ],
    },
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
    more: {
      sections: [
        {title: 'Adlandıran sözcükler', paras: ['Bazı sözcükler kişileri, hayvanları, eşyaları ya da yerleri adlandırır. Kedi, kalem, Ankara bu sözcüklere örnektir.']},
        {title: 'Zıt anlamlı sözcükler', paras: ['Anlamları birbirinin tersi olan sözcüklere zıt anlamlı sözcük denir. Sıcak ile soğuk, büyük ile küçük birer zıt anlamlı çifttir.'], tip: 'Bir sözcüğün zıttını bulmak için o sözcüğün ne anlatmak istediğini düşün.'},
      ],
      examples: [
        {problem: 'sıcak sözcüğünün zıt anlamlısı hangisidir?', steps: ['Sıcak, bir şeyin ısısının yüksek olduğunu anlatır.', 'Anlamı tersine olan sözcük soğuk tur.'], answer: 'soğuk'},
        {problem: 'kalın sözcüğünün zıt anlamlısı hangisidir?', steps: ['Kalın, bir şeyin genişliğinin fazla olduğunu anlatır.', 'Tersi, genişliği az olan ince dir.'], answer: 'ince'},
      ],
    },
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
    more: {
      sections: [
        {title: 'Cümle nedir?', paras: ['Cümle, bir şeyi anlatan ya da bir şey soran sözlerin bütünüdür. Cümle büyük harfle başlar.']},
        {title: 'Cümle sonu işaretleri', paras: ['Bilgi veren cümle nokta (.) ile biter. Soru soran cümle soru işareti (?) ile biter. Duygu bildiren cümle ünlem (!) ile biter.']},
      ],
      examples: [
        {problem: 'Bugün hava çok güzel cümlesinin sonuna hangi işaret konur?', steps: ['Cümle bir bilgi veriyor.', 'Bilgi veren cümle nokta ile biter.'], answer: 'nokta (.)'},
        {problem: 'Neredesin cümlesinin sonuna hangi işaret konur?', steps: ['Cümle bir soru soruyor.', 'Soru cümlesi soru işareti ile biter.'], answer: 'soru işareti (?)'},
      ],
    },
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
    more: {
      sections: [
        {title: 'Büyük harfle başlayanlar', paras: ['Cümlenin ilk harfi büyük yazılır. Özel isimler de büyük harfle başlar: Ali, Ayşe, Ankara, Türkiye gibi.', 'Gün ve ay adları da büyük harfle yazılır: Pazartesi, Nisan gibi.']},
        {title: 'Sık yapılan hata', paras: ['Bazen özel isimler küçük yazılır. Yazdıktan sonra her özel ismi tekrar kontrol et.'], tip: 'Bir kişinin, yerin ya da günün adını yazıyorsan ilk harfi büyük yap.'},
      ],
      examples: [
        {problem: 'ali okula gitti cümlesi doğru yazılmış mıdır? Doğrusunu yaz.', steps: ['Cümlenin ilk harfi küçük yazılmış.', 'Ali bir kişinin adı, o da büyük harfle başlar.'], answer: 'Ali okula gitti.'},
        {problem: 'istanbul şehrinin adı nasıl yazılır?', steps: ['Şehrin adı özel isimdir.', 'İlk harf büyük yazılır: İstanbul.'], answer: 'İstanbul'},
      ],
    },
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
    more: {
      sections: [
        {title: 'Metni okurken', paras: ['Önce metni baştan sona sessizce oku. Sonra soruları oku ve cevabı metnin içinde ara.', 'Cevap genellikle metnin bir cümlesinde yazılıdır. Tahmin etmek yerine cümleyi tekrar oku.'], tip: 'Metinde "kim", "ne", "nerede" sorularının cevaplarını bulmaya çalış.'},
      ],
      examples: [
        {problem: 'Metin: "Ayşe’nin kırmızı bir balonu var. Balon çok güzel. Ayşe balonu parkta uçuruyor." Ayşe’nin balonu hangi renktir?', steps: ['Metinde "kırmızı bir balonu var" yazıyor.', 'Balonun rengi kırmızıdır.'], answer: 'kırmızı'},
        {problem: 'Metin: "Ayşe’nin kırmızı bir balonu var. Balon çok güzel. Ayşe balonu parkta uçuruyor." Ayşe balonu nerede uçuruyor?', steps: ['Metnin son cümlesine bak: "parkta uçuruyor".', 'Balonu parkta uçuruyor.'], answer: 'parkta'},
      ],
    },
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
    more: {
      sections: [
        {title: 'Büyük ve küçük biçimler', paras: ['Her harfin büyük biçimi ile küçük biçimi birlikte kullanılır. Büyük biçim, küçük biçimden daha büyük yazılır.', 'Dikkat: i harfinin büyüğü İ, ı harfinin büyüğü I dır. Noktalı ve noktasız harfleri karıştırma.']},
      ],
      examples: [
        {problem: 'i harfinin büyük biçimi nedir?', steps: ['i harfi noktalı bir harftir.', 'Büyük biçimi de noktalı İ dir.'], answer: 'İ'},
        {problem: 'ı harfinin büyük biçimi nedir?', steps: ['ı harfi noktasız bir harftir.', 'Büyük biçimi de noktasız I dır.'], answer: 'I'},
      ],
    },
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
    more: {
      sections: [
        {title: 'Okulda kurallar', paras: ['Okula zamanında gelmek, sıraya uymak ve sınıfı temiz tutmak okul kurallarındandır.', 'Koridorda koşmamak ve ders sırasında sessiz olmak herkesin rahat etmesini sağlar.']},
        {title: 'Öğretmen ve arkadaşlar', paras: ['Öğretmenlerimize ve arkadaşlarımıza saygılı davranırız. Birbirimizi incitmeden konuşur ve yardımlaşırız.'], tip: 'Bir arkadaşın eşyasını izinsiz almamak da saygının bir parçasıdır.'},
      ],
      examples: [
        {problem: 'Ders başladığında sınıfta nasıl davranmalıyız?', steps: ['Ders sırasında amaç herkesin öğrenmesidir.', 'Sessiz olup öğretmeni dinlemeliyiz.'], answer: 'Sessiz olup öğretmeni dinlemek'},
        {problem: 'Koridorda nasıl yürümeliyiz?', steps: ['Koridorda diğer öğrenciler de geçer.', 'Koşmadan, yavaşça yürümeliyiz.'], answer: 'Koşmadan yürümek'},
      ],
    },
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
    more: {
      sections: [
        {title: 'Aile üyeleri', paras: ['Ailemizde anne, baba, kardeşler, dede ve nine bulunabilir. Her birinin bize yakınlığı farklıdır.']},
        {title: 'Yakınlık adları', paras: ['Babamızın annesi babaanne, babamızın babası dededir. Annemizin annesi anneanne, annemizin babası dededir.', 'Annemizin erkek kardeşi dayı, babamızın erkek kardeşi amcadır. Annemizin kız kardeşi teyze, babamızın kız kardeşi ise halamızdır.'], tip: 'Bir yakınlık adını bulmak için önce o kişinin kimin annesi ya da babası olduğuna bak.'},
      ],
      examples: [
        {problem: 'Babanın annesi kim olur?', steps: ['Babanın annesi, senin babaannendir.', 'Yakınlık adı babaanne dir.'], answer: 'babaanne'},
        {problem: 'Annenin erkek kardeşi kim olur?', steps: ['Annenin erkek kardeşi senin dayındır.', 'Yakınlık adı dayı dır.'], answer: 'dayı'},
      ],
    },
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
    more: {
      sections: [
        {title: 'Temizlik', paras: ['Yemekten önce ve tuvaletten sonra ellerimizi sabunla yıkamalıyız. Böylece hastalıklara karşı korunuruz.']},
        {title: 'Beslenme ve uyku', paras: ['Sebze ve meyveyi dengeli tüketmek vücudumuzun ihtiyacı olan vitaminleri alır. Yeterli uyku ise büyümemize ve dinlenmemize yardım eder.', 'Dişlerimizi sabah ve akşam olmak üzere günde iki kez fırçalarız.'], tip: 'Şekerli yiyecekleri az tüketmek dişlerimizi korur.'},
      ],
      examples: [
        {problem: 'Dişlerimizi günde kaç kez fırçalamalıyız?', steps: ['Sabah bir kez fırçalarız.', 'Akşam bir kez daha fırçalarız.'], answer: '2'},
        {problem: 'Yemekten önce ne yapmalıyız?', steps: ['Ellerimizde mikrop olabilir.', 'Ellerimizi sabunla yıkamalıyız.'], answer: 'Ellerimizi sabunla yıkamak'},
      ],
    },
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
    more: {
      sections: [
        {title: 'Yaya kuralları', paras: ['Yolu geçerken yaya geçidini kullanırız. Önce sağa, sonra sola bakarız. Araç yoksa karşıya geçeriz.', 'Kırmızı ışık yanarken bekleriz, yeşil ışık yanınca geçeriz.'], tip: 'Yolda oynamak ve koşmak çok tehlikelidir.'},
      ],
      examples: [
        {problem: 'Kırmızı ışık yandığında yaya ne yapar?', steps: ['Kırmızı ışık geçmemiz gerektiğini anlatır.', 'Yaya bekler ve durur.'], answer: 'durur'},
        {problem: 'Yolu geçmek için nerede geçmeliyiz?', steps: ['Yaya geçidi, yayaların güvenle geçtiği yerdir.', 'Yolu yaya geçidinden geçeriz.'], answer: 'Yaya geçidinden'},
      ],
    },
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
    more: {
      sections: [
        {title: 'Dört mevsim', paras: ['İlkbahar: Havalar ısınır, çiçekler açar. Yaz: Hava çok sıcaktır, tatil yapılır.', 'Sonbahar: Yapraklar dökülür, hava serinler. Kış: Hava soğuktur ve kar yağabilir.'], tip: 'Her mevsimde giyeceğimiz kıyafet değişir.'},
      ],
      examples: [
        {problem: 'Yapraklar hangi mevsimde dökülür?', steps: ['Ağaçların yaprakları sonbaharda dökülür.', 'Mevsim sonbahar dır.'], answer: 'sonbahar'},
        {problem: 'Kar hangi mevsimde yağar?', steps: ['Kar, havanın çok soğuk olduğu zamanda yağar.', 'Bu mevsim kıştır.'], answer: 'kış'},
      ],
    },
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
    more: {
      sections: [
        {title: 'Ritim nedir?', paras: ['Ritim, düzenli aralıklarla tekrarlanan vuruşlardır. Bir şarkının ya da marşın hızını ritim belirler.']},
        {title: 'Ritim çalgıları', paras: ['Ritim tutmak için davul, zil ve marakas gibi vurmalı çalgılar kullanılır. Bu çalgılar vurularak ya da sallanarak çalınır.'], tip: 'Parmaklarınla masaya düzenli vurarak ritim tutmayı deneyebilirsin.'},
      ],
      examples: [
        {problem: 'Davul hangi çalgı ailesindendir?', steps: ['Davul vurularak çalınır.', 'Vurularak çalınan çalgılar vurmalıdır.'], answer: 'vurmalı'},
        {problem: 'Ritim neyle ilgilidir?', steps: ['Ritim, düzenli vuruşlardan oluşur.', 'Düzenli vuruşlar ritimdir.'], answer: 'düzenli vuruşlar'},
      ],
    },
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
    more: {
      sections: [
        {title: 'Çalgı aileleri', paras: ['Telli çalgılarda ses teller titreşerek çıkar: gitar, keman, bağlama. Üflemeli çalgılarda ses üflenerek çıkar: flüt, ney, mızıka.', 'Vurmalı çalgılarda ses vurularak çıkar: davul, zil, def.'], tip: 'Bir çalgıyı hangi aileye koyacağını bulmak için sesinin nasıl çıktığına bak.'},
      ],
      examples: [
        {problem: 'Gitar hangi çalgı ailesindendir?', steps: ['Gitarın üzerinde teller vardır.', 'Sesi tellerin titreşmesiyle çıkar.'], answer: 'telli'},
        {problem: 'Flüt nasıl çalınır?', steps: ['Flüt bir üflemeli çalgıdır.', 'Ses üfleyerek çıkarılır.'], answer: 'üfleyerek'},
      ],
    },
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
    more: {
      sections: [
        {title: 'Doğru nefes', paras: ['Şarkı söylerken nefesimizi karnımızdan alırız. Omuzlarımızı kaldırmadan rahat nefes almak sesimizi güçlendirir.']},
        {title: 'Doğru söyleyiş', paras: ['Sözleri net ve anlaşılır söyleriz. Sesimizi bağırarak değil, yumuşak ve dengeli çıkararak söyleriz.', 'Grupla söylerken arkadaşlarımızı dinleyerek onlarla aynı hızda ilerleriz.'], tip: 'Şarkıyı yavaş tempoda çalışıp sonra hızlandırmak sözleri öğrenmeni kolaylaştırır.'},
      ],
      examples: [
        {problem: 'Şarkı söylerken nefesimizi nereden almalıyız?', steps: ['Doğru nefes karnımızdan alınır.', 'Omuzları kaldırmadan karından nefes alırız.'], answer: 'karnımızdan'},
        {problem: 'Şarkı söylerken sözler nasıl söylenmeli?', steps: ['Dinleyenler sözleri anlamalıdır.', 'Sözler net ve anlaşılır söylenmelidir.'], answer: 'net ve anlaşılır'},
      ],
    },
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
    more: {
      sections: [
        {title: 'Ana renkler', paras: ['Kırmızı, sarı ve mavi ana renklerdir. Bu renkler başka renkler karıştırılarak elde edilemez.']},
        {title: 'Renk karışımları', paras: ['Kırmızı ile sarı karışınca turuncu oluşur. Sarı ile mavi karışınca yeşil oluşur. Kırmızı ile mavi karışınca mor oluşur.'], tip: 'Boya karıştırırken az miktarla başla; renk koyulaştıkça değişir.'},
      ],
      examples: [
        {problem: 'Sarı ve mavi boyalar karıştırılırsa hangi renk oluşur?', steps: ['Sarı ile mavi karışım tablosuna bak.', 'Sarı ve mavi karışınca yeşil oluşur.'], answer: 'yeşil'},
        {problem: 'Kırmızı ile sarı karışınca hangi renk oluşur?', steps: ['Kırmızı ve sarı karışım tablosuna bak.', 'Bu karışım turuncu verir.'], answer: 'turuncu'},
      ],
    },
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
    more: {
      sections: [
        {title: 'Çizgi türleri', paras: ['Düz çizgi cetvelle çizilen, hiç eğilmeyen çizgidir. Eğri çizgi yuvarlak ve kıvrımlı çizgidir.', 'Kırık çizgi yön değiştiren, köşeleri olan çizgidir. Dalgalı çizgi ise dalga gibi yukarı aşağı kıvrılan çizgidir.'], tip: 'Bir çizgiyi tanımanın yolu, kalemini kağıttan kaldırmadan nasıl çizildiğini düşünmektir.'},
      ],
      examples: [
        {problem: 'Cetvelle çizilen çizgi hangi çizgidir?', steps: ['Cetvel düz çizgi çizmeye yarar.', 'Bu çizgi düz çizgidir.'], answer: 'düz çizgi'},
        {problem: 'Köşeleri olan, yön değiştiren çizgi hangisidir?', steps: ['Köşeli ve yön değiştiren çizgi kırık çizgidir.', 'Bu çizgi kırık çizgidir.'], answer: 'kırık çizgi'},
      ],
    },
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
    more: {
      sections: [
        {title: 'Temel şekiller', paras: ['Üçgen üç kenarlı bir şekildir. Kare dört kenarı eşit olan şekildir. Dikdörtgen dört kenarlı ve karşılıklı kenarları eşit olan şekildir.', 'Daire ise hiç köşesi ve kenarı olmayan yuvarlak bir şekildir.'], tip: 'Bir şeklin kaç kenarı ve kaç köşesi olduğuna bakarak adını bulabilirsin.'},
      ],
      examples: [
        {problem: 'Kaç kenarlı şekle üçgen denir?', steps: ['Üçgenin adı üç köşeden gelir.', 'Üçgen üç kenarlıdır.'], answer: '3'},
        {problem: 'Dört kenarı da eşit olan şekil hangisidir?', steps: ['Dört kenarı eşit olan şekil kare dir.', 'Dikdörtgende kenarlar eşit değildir.'], answer: 'kare'},
      ],
    },
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
    more: {
      sections: [
        {title: 'Spor ve vücut', paras: ['Spor yapmak kaslarımızı güçlendirir, kalbimizi çalıştırır ve dayanıklılığımızı artırır.', 'Düzenli hareket ettiğimizde kendimizi daha iyi ve mutlu hissederiz.'], tip: 'Her gün en az bir saat hareket etmeye çalış.'},
      ],
      examples: [
        {problem: 'Spor yapmak vücuda ne kazandırır?', steps: ['Spor kasları ve kalbi güçlendirir.', 'Bu da vücuda güç ve sağlık kazandırır.'], answer: 'güç ve sağlık'},
        {problem: 'Ne sıklıkta hareket etmeliyiz?', steps: ['Sağlıklı yaşam için hareket düzenli olmalıdır.', 'Bu nedenle her gün hareket etmeliyiz.'], answer: 'her gün'},
      ],
    },
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
    more: {
      sections: [
        {title: 'Oyun kuralları', paras: ['Her oyunun kuralları vardır. Kurallara uymak oyunu adil ve eğlenceli kılar.', 'Sıra bekleyen oyuncular sıralarını beklerler. Hakemin ya da öğretmenin kararına saygı gösteririz.'], tip: 'Kazanmak kadar, fair play ile oynamak da önemlidir.'},
      ],
      examples: [
        {problem: 'Oyunda sıra beklemek neden önemlidir?', steps: ['Herkes oyunda eşit söz hakkına sahip olmalıdır.', 'Sıra beklemek herkesin adil oynamasını sağlar.'], answer: 'Herkes adil oynasın diye'},
        {problem: 'Oyunu kaybedince ne yapmalıyız?', steps: ['Rakibimiz kazanmıştır.', 'Rakibimizi kutlayıp fair play ile oynamalıyız.'], answer: 'Rakibi kutlamak'},
      ],
    },
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
    more: {
      sections: [
        {title: 'Denge nedir?', paras: ['Denge, vücudu düşmeden bir yerde sabit tutabilme becerisidir. Denge hareketlerinde ağırlığımız ortada olmalıdır.']},
        {title: 'Dengede durmak', paras: ['Tek ayak üzerinde dururken kollarımızı yana açarız. Gözümüzü sabit bir noktaya çevirerek dengemizi koruruz.'], tip: 'Dengeni korumak için küçük ve yavaş hareketler yap.'},
      ],
      examples: [
        {problem: 'Dengede dururken kollarımız nasıl olmalı?', steps: ['Kollar denge için kullanılır.', 'Kollar yana açık tutulur.'], answer: 'yana açık'},
        {problem: 'Dengede dururken gözlerimiz nereye bakmalı?', steps: ['Sabit bir noktaya bakmak dengeyi korur.', 'Gözler sabit bir noktaya bakar.'], answer: 'sabit bir noktaya'},
      ],
    },
    items: [
      {q: 'Tek ayak üstünde durabilme becerisine ne denir?', a: 'Denge', w: ['Koşu', 'Atlama', 'Yüzme', 'Zıplama']},
      {q: 'Denge becerisini geliştirmek için ne yapılabilir?', a: 'Tek ayak üstünde durmak', w: ['Hiç hareket etmemek', 'Sürekli oturmak', 'Uyumak', 'Yemek yemek']},
    ],
  }),
];
