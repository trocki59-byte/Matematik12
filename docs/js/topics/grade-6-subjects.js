// 6. sınıf: Türkçe, Fen Bilimleri, Sosyal Bilgiler, İngilizce, Din Kültürü, Görsel Sanatlar, Müzik, Beden Eğitimi.
// Metin tabanlı konular: her madde {q, a, w}; w tam 4 yanlış seçenek içerir.

function textTopic({id, unit, name, symbol, summary, intro, paras, tip, items}) {
  return {
    id, grade: 6, unit, name, symbol, summary, kind: 'text',
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
    id: '6-tr-anlatim', unit: TR, name: 'Anlatım biçimleri', symbol: '✍', summary: 'Öyküleme, betimleme ve açıklama gibi anlatım biçimlerini ayır',
    intro: 'Anlatım biçimleri öyküleme, betimleme, açıklama, tartışma ve söyleşme olarak sıralanır.',
    paras: ['Öyküleme olayları anlatır; betimleme ise kişi, yer veya nesneyi ayrıntılı tanıtır.'],
    tip: 'Bir metnin anlatım biçimini bulmak için cümlelerin amacına bak.',
    items: [
      {q: 'Olayların anlatıldığı anlatım biçimi hangisidir?', a: 'Öyküleme', w: ['Betimleme', 'Açıklama', 'Tartışma', 'Söyleşme']},
      {q: 'Bir yeri ya da kişiyi ayrıntılarıyla tanıtan anlatım biçimi hangisidir?', a: 'Betimleme', w: ['Öyküleme', 'Açıklama', 'Tartışma', 'Söyleşme']},
      {q: 'Bir konuyu nedenleriyle birlikte açıklayan anlatım biçimi hangisidir?', a: 'Açıklama', w: ['Öyküleme', 'Betimleme', 'Söyleşme', 'Tartışma']},
    ],
  }),
  textTopic({
    id: '6-tr-fiil-cekim', unit: TR, name: 'Fiilde çekim', symbol: 'git-', summary: 'Fiilin kip ve kişi eklerini tanı',
    intro: 'Fiiller zaman, kip ve kişi ekleri alarak çekimlenir. Kip ekleri eylemin hangi zamanda ve nasıl gerçekleştiğini bildirir.',
    paras: ['"Gel-ecek-sin" sözcüğünde "-ecek" gelecek zaman, "-sin" ikinci tekil kişi ekidir.'],
    tip: 'Fiil çekiminde önce kipi, sonra kişiyi belirlemek kolaylık sağlar.',
    items: [
      {q: '"Yazacağım" sözcüğünde zaman eki hangisidir?', a: '-acak', w: ['-ım', '-yaz', '-ağ', '-ı']},
      {q: '"Okudular" sözcüğünde kişi eki hangisidir?', a: '-lar', w: ['-du', '-ok', '-u', '-ı']},
      {q: 'Hangi sözcükte geçmiş zaman eki bulunur?', a: 'Gelmişti', w: ['Gelecek', 'Geliyor', 'Gel', 'Gelsin']},
    ],
  }),
  textTopic({
    id: '6-tr-sozcuk-turu', unit: TR, name: 'Sözcük türleri', symbol: 'isim', summary: 'İsim, sıfat, zarf ve fiil gibi sözcük türlerini tanı',
    intro: 'Sözcükler isim, sıfat, zamir, zarf ve fiil gibi türlere ayrılır. Her türün cümledeki görevi farklıdır.',
    paras: ['"Kırmızı" sıfat, "elma" isim, "koştu" fiil, "hızlı" ise zarf görevindedir.'],
    tip: 'Sözcüğün cümledeki görevine bakmak türünü bulmanı sağlar.',
    items: [
      {q: 'Bir varlığın adını bildiren sözcük türü hangisidir?', a: 'İsim', w: ['Sıfat', 'Zarf', 'Fiil', 'Zamir']},
      {q: 'Bir ismin niteliğini bildiren sözcük türü hangisidir?', a: 'Sıfat', w: ['İsim', 'Zarf', 'Zamir', 'Edat']},
      {q: '"Ben" sözcüğü hangi türdendir?', a: 'Zamir', w: ['İsim', 'Sıfat', 'Zarf', 'Fiil']},
    ],
  }),

  // ---------- Fen Bilimleri ----------
  textTopic({
    id: '6-fen-hucre', unit: FEN, name: 'Hücre', symbol: '🔬', summary: 'Hücrenin yapısını ve temel organellerini öğren',
    intro: 'Hücre, canlıların yapı ve işlev birimidir. Bitki hücresinde hücre duvarı ve kloroplast bulunur, hayvan hücresinde ise bulunmaz.',
    paras: ['Çekirdek hücrenin yönetim merkezidir ve kalıtsal bilgiyi taşır.'],
    tip: 'Bitki ve hayvan hücresinin farklarını karşılaştırarak öğrenmek kalıcı olur.',
    items: [
      {q: 'Hücrenin yönetim merkezi hangisidir?', a: 'Çekirdek', w: ['Sitoplazma', 'Hücre zarı', 'Ribozom', 'Vakuol']},
      {q: 'Hangi yapı yalnızca bitki hücresinde bulunur?', a: 'Hücre duvarı', w: ['Hücre zarı', 'Çekirdek', 'Sitoplazma', 'Mitokondri']},
      {q: 'Fotosentez yapılan organel hangisidir?', a: 'Kloroplast', w: ['Mitokondri', 'Çekirdek', 'Ribozom', 'Golgi']},
    ],
  }),
  textTopic({
    id: '6-fen-kuvvet-denge', unit: FEN, name: 'Kuvvet ve denge', symbol: '⚖', summary: 'Dengelenmiş kuvvetleri ve sonuçlarını öğren',
    intro: 'Bir cisme etki eden kuvvetler dengelenmişse cisim hareket etmez ya da sabit hızla hareket eder.',
    paras: ['İki eşit ve zıt yönlü kuvvet birbirini dengeler; bu durumda cisimde hareket oluşmaz.'],
    tip: 'Kuvvetlerin yönüne ve büyüklüğüne bakarak bileşkeyi bulabilirsin.',
    items: [
      {q: 'Eşit büyüklükte ve zıt yönlü iki kuvvet ne yapar?', a: 'Dengeler', w: ['Hızlandırır', 'Yavaşlatır', 'Döndürür', 'Ağırlaştırır']},
      {q: 'Dengelenmiş kuvvetlerin etkisindeki cisim nasıl hareket eder?', a: 'Hareket etmez ya da sabit hızla gider', w: ['Sürekli hızlanır', 'Geri döner', 'Yukarı çıkar', 'Hemen durur']},
      {q: 'Bileşkesi sıfır olan kuvvetler için hangisi doğrudur?', a: 'Cisim dengededir', w: ['Cisim hızla yer değiştirir', 'Cisim yukarı çıkar', 'Cisim küçülür', 'Cisim renk değiştirir']},
    ],
  }),
  textTopic({
    id: '6-fen-elektrik', unit: FEN, name: 'Elektrik devreleri', symbol: '⚡', summary: 'Basit elektrik devresinin bileşenlerini öğren',
    intro: 'Bir elektrik devresinde pil, ampul, anahtar ve iletken teller bulunur. Devre kapalı olduğunda akım akar.',
    paras: ['İletkenler elektriği geçirir; yalıtkanlar ise geçirmez.'],
    tip: 'Devrenin kapalı olduğunu kontrol etmek ampulün yanmasının ilk koşuludur.',
    items: [
      {q: 'Elektriği geçiren maddelere ne denir?', a: 'İletken', w: ['Yalıtkan', 'Opak', 'Saydam', 'Gaz']},
      {q: 'Devrede ampulün yanması için devre nasıl olmalıdır?', a: 'Kapalı', w: ['Açık', 'Kırık', 'Sadece pilli', 'Hiç pil olmadan']},
      {q: 'Hangisi elektriği geçirmeyen bir maddedir?', a: 'Plastik', w: ['Bakır', 'Demir', 'Alüminyum', 'Gümüş']},
    ],
  }),

  // ---------- Sosyal Bilgiler ----------
  textTopic({
    id: '6-sos-iklim', unit: SOS, name: 'İklim ve yaşam', symbol: '🌤', summary: 'İklim elemanlarını ve iklimin yaşama etkisini öğren',
    intro: 'İklim, uzun yıllar boyunca bir yerdeki sıcaklık, yağış ve rüzgâr gibi koşulların ortalamasıdır.',
    paras: ['Yağış ve sıcaklık iklimin en önemli elemanlarındandır. İklim, bitki örtüsünü ve yerleşimi etkiler.'],
    tip: 'Hava durumu kısa süreli, iklim ise uzun yıllık ortalamalardır.',
    items: [
      {q: 'Uzun yıllar boyunca bir yerdeki hava koşullarının ortalamasına ne denir?', a: 'İklim', w: ['Hava durumu', 'Mevsim', 'Rüzgâr', 'Yağmur']},
      {q: 'Hangisi iklim elemanlarından biridir?', a: 'Sıcaklık', w: ['Harita', 'Pusula', 'Nüfus', 'Ulaşım']},
      {q: 'İklim en çok neyi etkiler?', a: 'Bitki örtüsü ve yerleşim', w: ['Sadece renkleri', 'Sadece sesleri', 'Yalnızca saatleri', 'Hiçbir şeyi']},
    ],
  }),
  textTopic({
    id: '6-sos-nufus', unit: SOS, name: 'Nüfus', symbol: '👥', summary: 'Nüfus ve nüfus hareketlerini öğren',
    intro: 'Nüfus, belirli bir yerde yaşayan insan sayısıdır. Göç, nüfusun yer değiştirmesidir.',
    paras: ['Köyden kente göç, şehirlerde nüfus artışına neden olabilir.'],
    tip: 'Göçün nedenlerini ekonomik, sosyal ve doğal faktörler olarak düşünebilirsin.',
    items: [
      {q: 'Belirli bir yerde yaşayan insan sayısına ne denir?', a: 'Nüfus', w: ['Yoğunluk', 'Göç', 'Ölçek', 'Kıta']},
      {q: 'İnsanların yer değiştirmesine ne denir?', a: 'Göç', w: ['Nüfus', 'Yerleşme', 'İklim', 'Ölçek']},
      {q: 'Köyden kente göç sonucunda şehirlerde ne olabilir?', a: 'Nüfus artışı', w: ['Nüfus azalması', 'Ormanların artması', 'Tarım alanlarının artması', 'Göçün sona ermesi']},
    ],
  }),
  textTopic({
    id: '6-sos-tarih-oncesi', unit: SOS, name: 'İlk çağ uygarlıkları', symbol: '🏺', summary: 'Mezopotamya ve Mısır gibi ilk uygarlıkları tanı',
    intro: 'İlk uygarlıklar, büyük nehirlerin kenarlarında kurulmuştur. Mezopotamya ve Mısır bunların en eskilerindendir.',
    paras: ['Mezopotamya uygarlığında çivi yazısı kullanılmıştır. Mısır\'da hiyeroglif yazısı görülür.'],
    tip: 'Uygarlıkların büyük nehirlerle ilişkisini hatırlamak kolaylık sağlar.',
    items: [
      {q: 'Çivi yazısı hangi uygarlığa aittir?', a: 'Mezopotamya', w: ['Mısır', 'Çin', 'Roma', 'Maya']},
      {q: 'Hiyeroglif yazısı hangi uygarlıkta kullanılmıştır?', a: 'Mısır', w: ['Mezopotamya', 'Hint', 'Roma', 'Yunan']},
      {q: 'İlk uygarlıklar genellikle nerelerde kurulmuştur?', a: 'Büyük nehirlerin kenarlarında', w: ['Çöllerin ortasında', 'Yüksek dağlarda', 'Okyanusların ortasında', 'Buzulların üstünde']},
    ],
  }),

  // ---------- İngilizce ----------
  textTopic({
    id: '6-en-family', unit: EN, name: 'Family', symbol: '👪', summary: 'Aile üyelerinin İngilizce adlarını öğren',
    intro: 'Aile üyeleri İngilizcede mother, father, sister, brother gibi kelimelerle ifade edilir.',
    paras: ['"My mother is a teacher." cümlesinde "mother" annem demektir.'],
    tip: 'Aile üyelerini bir ağaç şeklinde çizerek öğrenmek kalıcılığı artırır.',
    items: [
      {q: '"Kardeş" İngilizcede nedir?', a: 'Brother', w: ['Father', 'Mother', 'Uncle', 'Cousin']},
      {q: '"Father" hangi aile üyesidir?', a: 'Baba', w: ['Anne', 'Kardeş', 'Dede', 'Teyze']},
      {q: '"Sister" Türkçede ne anlama gelir?', a: 'Kız kardeş', w: ['Erkek kardeş', 'Anne', 'Teyze', 'Yenge']},
    ],
  }),
  textTopic({
    id: '6-en-simple-present', unit: EN, name: 'Simple Present', symbol: 'I go', summary: 'Geniş zamanın kullanımını öğren',
    intro: 'Simple Present, alışkanlıkları ve genel doğruları anlatmak için kullanılır. Üçüncü tekil şahısta fiilin sonuna "-s" gelir.',
    paras: ['"She plays tennis." cümlesinde "plays" geniş zaman kullanımıdır.'],
    tip: 'He, she, it öznelerinde fiile "-s" eklemeyi unutma.',
    items: [
      {q: '"She ___ football every day." boşluğu için hangisi doğrudur?', a: 'plays', w: ['play', 'playing', 'played', 'will play']},
      {q: 'Geniş zaman neyi anlatmak için kullanılır?', a: 'Alışkanlıkları', w: ['Geçmiş olayları', 'Gelecek planları', 'Şu anda olanı', 'Hayali durumları']},
      {q: '"They ___ school at 8." boşluğunu hangisi doldurur?', a: 'go to', w: ['goes to', 'going to', 'went to', 'will go to']},
    ],
  }),
  textTopic({
    id: '6-en-hobbies', unit: EN, name: 'Hobbies', symbol: '🎾', summary: 'Hobi ile ilgili İngilizce ifadeleri öğren',
    intro: 'Hobi, boş zamanlarda yapılan ve zevk alınan etkinlikleri anlatır. "I like" ve "I love" bu ifadelerde kullanılır.',
    paras: ['"I like swimming." cümlesinde kişi yüzmeyi sevdiğini anlatır.'],
    tip: 'Hobilerini anlatırken "I like" ve "I enjoy" ifadelerini kullanabilirsin.',
    items: [
      {q: '"I like reading." cümlesi ne anlama gelir?', a: 'Okumayı severim.', w: ['Yazmayı severim.', 'Yemek yapmayı severim.', 'Uyumayı severim.', 'Koşmayı severim.']},
      {q: 'Hobi için İngilizce hangi kelime kullanılır?', a: 'Hobby', w: ['Job', 'School', 'Teacher', 'Trip']},
      {q: '"She enjoys painting." cümlesinde kişi neyi sever?', a: 'Resim yapmayı', w: ['Yüzmeyi', 'Koşmayı', 'Yemek yapmayı', 'Şarkı söylemeyi']},
    ],
  }),

  // ---------- Din Kültürü ----------
  textTopic({
    id: '6-din-peygamber', unit: DIN, name: 'Peygamberlerin özellikleri', symbol: '📖', summary: 'Peygamberlerin ortak özelliklerini öğren',
    intro: 'Peygamberler Allah tarafından insanlara gönderilmiş, doğru ve dürüst kişilerdir. Peygamberler masum ve güvenilirdir.',
    paras: ['Peygamberlerin en önemli özelliklerinden biri de sadakat ve dürüstlüktür.'],
    tip: 'Peygamberlerin örnek hayatlarını incelemek ahlaki değerleri öğrenmemize yardımcı olur.',
    items: [
      {q: 'Peygamberlerin ortak özelliklerinden biri hangisidir?', a: 'Dürüst olmak', w: ['Yalan söylemek', 'Kaba davranmak', 'Sözünde durmamak', 'Hile yapmak']},
      {q: 'Peygamberler kime gönderilmiştir?', a: 'İnsanlara', w: ['Sadece hayvanlara', 'Yalnızca bitkilere', 'Sadece gökyüzüne', 'Hiçbir şeye']},
      {q: 'Peygamberler hangi özelliğe sahiptir?', a: 'Güvenilir olmak', w: ['Kötü huylu olmak', 'Aldatıcı olmak', 'Korkak olmak', 'Tembel olmak']},
    ],
  }),
  textTopic({
    id: '6-din-kuran', unit: DIN, name: 'Kur\'an-ı Kerim', symbol: '📜', summary: 'Kur\'an-ı Kerim\'in temel özelliklerini öğren',
    intro: 'Kur\'an-ı Kerim, Müslümanların kutsal kitabıdır. Hz. Muhammed\'e Cebrail aracılığıyla vahyedilmiştir.',
    paras: ['Kur\'an-ı Kerim 114 sureden oluşur. Ayetlerinin tamamı Arapça olarak nazil olmuştur.'],
    tip: 'Kur\'an-ı Kerim\'i okurken anlamını da öğrenmek ayetlerin etkisini artırır.',
    items: [
      {q: 'Kur\'an-ı Kerim kaç sureden oluşur?', a: '114', w: ['100', '99', '120', '144']},
      {q: 'Kur\'an-ı Kerim hangi peygambere vahyedilmiştir?', a: 'Hz. Muhammed', w: ['Hz. İsa', 'Hz. Musa', 'Hz. İbrahim', 'Hz. Nuh']},
    ],
  }),

  // ---------- Görsel Sanatlar ----------
  textTopic({
    id: '6-gs-heykel', unit: GS, name: 'Heykel', symbol: '🗿', summary: 'Heykel sanatının türlerini ve malzemelerini öğren',
    intro: 'Heykel, üç boyutlu sanat eseridir. Taş, bronz, ahşap ve kil gibi malzemelerle yapılabilir.',
    paras: ['Kabartma heykelde figür bir yüzeyden kısmen dışarı çıkar; yuvarlak heykel ise her yönden görülebilir.'],
    tip: 'Heykeli farklı açılardan incelemek onun tüm boyutlarını görmeyi sağlar.',
    items: [
      {q: 'Üç boyutlu sanat eserine ne denir?', a: 'Heykel', w: ['Resim', 'Afiş', 'Karikatür', 'Fotoğraf']},
      {q: 'Hangisi heykel yapımında kullanılan bir malzemedir?', a: 'Bronz', w: ['Kağıt', 'Boya', 'Mürekkep', 'Pastel']},
      {q: 'Figürü yüzeyden kısmen dışarı çıkan heykel türü hangisidir?', a: 'Kabartma', w: ['Yuvarlak heykel', 'Mozaik', 'Freska', 'Vitray']},
    ],
  }),
  textTopic({
    id: '6-gs-kolaj', unit: GS, name: 'Kolaj', symbol: '✂', summary: 'Kolaj tekniğini öğren',
    intro: 'Kolaj, farklı malzemelerin (kağıt, kumaş, fotoğraf vb.) yapıştırılmasıyla oluşturulan sanat tekniğidir.',
    paras: ['Gazete parçaları ve dergi kesikleriyle yapılan çalışmalar kolaj örneğidir.'],
    tip: 'Kolaj yaparken farklı doku ve renklerdeki malzemeleri bir araya getirmek ilginç sonuçlar verir.',
    items: [
      {q: 'Farklı malzemelerin yapıştırılmasıyla yapılan sanat tekniği hangisidir?', a: 'Kolaj', w: ['Mozaik', 'Freska', 'Seramik', 'Litografi']},
      {q: 'Kolaj için hangisi kullanılabilir?', a: 'Gazete kâğıdı', w: ['Yalnızca boya', 'Sadece tebeşir', 'Yalnızca kil', 'Sadece su']},
    ],
  }),

  // ---------- Müzik ----------
  textTopic({
    id: '6-mu-ses-tip', unit: MU, name: 'Ses türleri', symbol: '🎙', summary: 'Kadın ve erkek ses türlerini öğren',
    intro: 'Ses türleri kadın ve erkek olarak genel olarak sınıflandırılır. Kadın sesleri soprano, mezzo ve kontralto; erkek sesleri tenor, bariton ve bas olarak adlandırılır.',
    paras: ['Tenor, erkek seslerinin en tiz olanıdır; bas ise en kalın olanıdır.'],
    tip: 'Ses türlerini dinleyerek ayırt etmeye çalış.',
    items: [
      {q: 'En tiz erkek ses türü hangisidir?', a: 'Tenor', w: ['Bas', 'Bariton', 'Kontralto', 'Mezzo']},
      {q: 'En kalın erkek ses türü hangisidir?', a: 'Bas', w: ['Tenor', 'Bariton', 'Soprano', 'Mezzo']},
      {q: 'En tiz kadın ses türü hangisidir?', a: 'Soprano', w: ['Kontralto', 'Mezzo', 'Tenor', 'Bas']},
    ],
  }),
  textTopic({
    id: '6-mu-makam2', unit: MU, name: 'Makamlar', symbol: '♪', summary: 'Hicaz, Rast ve Segah gibi makamları tanı',
    intro: 'Makam, Türk müziğinde melodilerin dayandığı ses dizisi ve kurallar bütünüdür. Her makamın kendine özgü bir duygu ve yapısı vardır.',
    paras: ['Rast makamı dengeli ve ferah, Hicaz makamı ise hüzünlü bir hava taşır.'],
    tip: 'Makamları dinlemek ve sesleri ayırt etmek bu konuda ilerlemenin en iyi yoludur.',
    items: [
      {q: 'Türk müziğinde melodilerin dayandığı ses dizisine ne denir?', a: 'Makam', w: ['Ölçü', 'Vuruş', 'Ritim', 'Tını']},
      {q: 'Hüzünlü bir hava taşıyan makam hangisidir?', a: 'Hicaz', w: ['Rast', 'Segah', 'Kürdilihicaz', 'Hüseyni']},
      {q: 'Dengeli ve ferah hava veren makam hangisidir?', a: 'Rast', w: ['Hicaz', 'Uşşak', 'Nihavend', 'Karcığar']},
    ],
  }),

  // ---------- Beden Eğitimi ----------
  textTopic({
    id: '6-be-futbol', unit: BE, name: 'Futbol temel kuralları', symbol: '⚽', summary: 'Futbolun temel kurallarını öğren',
    intro: 'Futbolda her takımda on bir oyuncu bulunur. Kaleci dışındaki oyuncular topa elleriyle dokunamaz.',
    paras: ['Ofsayt, hücum oyuncusunun rakip kalecisiyle arasında son savunmacıdan fazla oyuncu bırakmadan pozisyon almasıdır.'],
    tip: 'Kuralları bilmek hem oyuncu hem de izleyici olarak oyunu daha iyi anlamayı sağlar.',
    items: [
      {q: 'Bir futbol takımında sahada kaç oyuncu bulunur?', a: '11', w: ['9', '10', '12', '7']},
      {q: 'Kaleci dışında hangi oyuncular topa elle dokunamaz?', a: 'Diğer tüm oyuncular', w: ['Hiçbir oyuncu', 'Sadece kaptan', 'Sadece forvet', 'Sadece hakem']},
      {q: 'Ofsayt kuralı neyi ifade eder?', a: 'Hücum oyuncusunun önde olan rakip savunmacıya göre fazla ileride olması', w: ['Topun ellerle taşınması', 'Kalecinin ceza sahasında dolaşması', 'Oyun süresinin uzaması', 'Sahanın genişletilmesi']},
    ],
  }),
  textTopic({
    id: '6-be-ritim2', unit: BE, name: 'Aerobik ve ritmik hareket', symbol: '🤸', summary: 'Aerobik çalışmanın faydalarını öğren',
    intro: 'Aerobik çalışmalar kalp ve solunum sistemini geliştiren, uzun süre devam eden hareketlerdir.',
    paras: ['Yürüyüş, koşu, bisiklet ve yüzme aerobik çalışmalara örnektir.'],
    tip: 'Aerobik çalışmaları haftada birkaç kez düzenli yapmak sağlığa faydalıdır.',
    items: [
      {q: 'Kalp ve solunum sistemini geliştiren çalışmalara ne denir?', a: 'Aerobik çalışma', w: ['Anaerobik halter', 'Esneme', 'Denge çalışması', 'Refleks testi']},
      {q: 'Hangisi aerobik çalışmaya örnektir?', a: 'Yüzme', w: ['Ağır ağırlık kaldırma', 'Tek ayak üstünde kalma', 'Hareketsiz oturma', 'Kısa süreli sprint']},
    ],
  }),
];
