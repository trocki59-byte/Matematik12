// 8. sınıf: Türkçe, Fen Bilimleri, T.C. İnkılap Tarihi, İngilizce, Din Kültürü, Görsel Sanatlar, Müzik, Beden Eğitimi.
// Metin tabanlı konular: her madde {q, a, w}; w tam 4 yanlış seçenek içerir.

function textTopic({id, unit, name, symbol, summary, intro, paras, tip, items}) {
  return {
    id, grade: 8, unit, name, symbol, summary, kind: 'text',
    lesson: {intro, sections: [
      {title: name, paras, tip},
      {
        title: 'Daha fazla örnek',
        paras: ['Aşağıdaki örnekler konuyu pekiştirmek için hazırlanmıştır.'],
        examples: items.slice(0, 3).map(it => ({problem: it.q, steps: [`Seçenekleri tek tek değerlendir.`, `Doğru cevap: ${it.a}`], answer: it.a})),
      },
    ]},
    gen(rnd) {
      const it = items[rnd(0, items.length - 1)];
      return {text: it.q, answerText: it.a, wrong: it.w, steps: [`Doğru cevap: ${it.a}`]};
    },
  };
}

const TR = 'Türkçe';
const FEN = 'Fen Bilimleri';
const INK = 'T.C. İnkılap Tarihi';
const EN = 'İngilizce';
const DIN = 'Din Kültürü';
const GS = 'Görsel Sanatlar';
const MU = 'Müzik';
const BE = 'Beden Eğitimi';

export default [
  // ---------- Türkçe ----------
  textTopic({
    id: '8-tr-fiilimsi', unit: TR, name: 'Fiilimsiler', symbol: 'ıp', summary: 'İsim-fiil, sıfat-fiil ve zarf-fiil yapılarını tanı',
    intro: 'Fiilimsiler, fiilden türemiş ama cümlede fiil görevi üstlenmeyen sözcüklerdir. İsim-fiil, sıfat-fiil ve zarf-fiil olarak üçe ayrılır.',
    paras: ['"Okumak" isim-fiildir. "Koşan çocuk" ifadesinde "koşan" sıfat-fiildir. "Gülerek" ise zarf-fiildir.'],
    tip: 'Fiilimsi cümlede yüklem olamaz; bir isim, sıfat ya da zarf gibi davranır.',
    items: [
      {q: '"Yüzmek sağlıklıdır." cümlesindeki fiilimsi hangisidir?', a: 'Yüzmek', w: ['sağlıklıdır', 'Yüzmek sağlıklı', 'sağlık', 'yüz']},
      {q: '"Koşan çocuk" ifadesinde fiilimsi hangi türdendir?', a: 'Sıfat-fiil', w: ['İsim-fiil', 'Zarf-fiil', 'Fiil', 'Edat']},
      {q: '"Gülerek" sözcüğü hangi fiilimsi türüdür?', a: 'Zarf-fiil', w: ['İsim-fiil', 'Sıfat-fiil', 'Zamir', 'Bağlaç']},
    ],
  }),
  textTopic({
    id: '8-tr-cumle-ogeleri', unit: TR, name: 'Cümlenin ögeleri', symbol: 'Ö', summary: 'Özne, nesne, yüklem ve tümleçleri ayır',
    intro: 'Cümlenin ögeleri özne, nesne, yüklem, dolaylı tümleç, zarf tümleci ve belirtili nesne gibi unsurlardan oluşur.',
    paras: ['"Ali kitabı masaya koydu." cümlesinde özne Ali, nesne kitabı, yüklem koydu, dolaylı tümleç masaya\'dır.'],
    tip: 'Yüklemi bulduktan sonra "kim?", "neyi?" ve "nereye?" sorularıyla diğer ögeleri bulabilirsin.',
    items: [
      {q: '"Ali kitabı masaya koydu." cümlesinde nesne hangisidir?', a: 'kitabı', w: ['Ali', 'masaya', 'koydu', 'Ali kitabı']},
      {q: 'Cümlenin yüklemi hangi sözcüktür?', a: 'koydu', w: ['Ali', 'kitabı', 'masaya', 'Ali kitabı']},
      {q: 'Cümlede "masaya" hangi öğedir?', a: 'Dolaylı tümleç', w: ['Özne', 'Nesne', 'Yüklem', 'Zarf']},
    ],
  }),
  textTopic({
    id: '8-tr-anlam-iliski', unit: TR, name: 'Sözcükte anlam ilişkileri', symbol: '≈', summary: 'Eş, zıt ve eşsesli sözcükleri ayırt et',
    intro: 'Sözcükler arasında eş anlam, zıt anlam ve eşsesli ilişkisi bulunabilir. Eşsesli sözcükler aynı yazılıp farklı anlam taşıyan sözcüklerdir.',
    paras: ['"Yüz" sözcüğü hem yüzün bir parçası hem de sayı anlamında kullanılabilir; bu eşsesli bir örnektir.'],
    tip: 'Eşsesli sözcüğün anlamını cümlenin bütününden çıkarmak gerekir.',
    items: [
      {q: 'Aynı yazılışa sahip fakat farklı anlamlara gelen sözcüklere ne denir?', a: 'Eşsesli sözcük', w: ['Eş anlamlı sözcük', 'Zıt anlamlı sözcük', 'Terim', 'Deyim']},
      {q: '"Yüz" sözcüğü hangi ilişki türüne örnektir?', a: 'Eşsesli', w: ['Eş anlamlı', 'Zıt anlamlı', 'Mecaz', 'Atasözü']},
      {q: '"Ağır" sözcüğünün zıt anlamlısı hangisidir?', a: 'Hafif', w: ['Ağırbaşlı', 'Çok', 'Yorgun', 'Zor']},
    ],
  }),

  // ---------- Fen Bilimleri ----------
  textTopic({
    id: '8-fen-basinc', unit: FEN, name: 'Basınç', symbol: 'P', summary: 'Basınç kavramını ve birimini öğren',
    intro: 'Basınç, birim alana uygulanan dik kuvvettir. P = F/A formülüyle hesaplanır ve birimi paskal (Pa) dır.',
    paras: ['Aynı kuvvet daha küçük bir alana uygulanırsa basınç artar; bu nedenle iğnenin ucu sivri yapılır.'],
    tip: 'Basınç arttıkça alan küçülür; formüldeki kuvvet ve alan ilişkisini hatırla.',
    items: [
      {q: 'Basıncın birimi nedir?', a: 'Paskal', w: ['Newton', 'Joule', 'Watt', 'Kelvin']},
      {q: 'Basınç formülü hangisidir?', a: 'P = F/A', w: ['P = F·A', 'P = A/F', 'P = F+A', 'P = F−A']},
      {q: 'Aynı kuvvet daha küçük bir alana uygulanırsa basınç nasıl değişir?', a: 'Artar', w: ['Azalır', 'Sabit kalır', 'Sıfırlanır', 'Yarıya iner']},
    ],
  }),
  textTopic({
    id: '8-fen-asit-baz', unit: FEN, name: 'Asit ve baz', symbol: 'pH', summary: 'Asit ve bazların özelliklerini ve pH değerlerini öğren',
    intro: 'Asitler ekşi tat verir ve mavi turnusol kâğıdını kırmızıya çevirir. Bazlar ise acı tat verir ve kırmızı turnusol kâğıdını maviye çevirir.',
    paras: ['pH değeri 7\'nin altında asit, 7\'nin üstünde baz, 7\'de ise nötr bir maddeyi gösterir.'],
    tip: 'pH 7 nötrdür; asitlerle bazlar birbirini nötrleştirir.',
    items: [
      {q: 'Asitler mavi turnusol kâğıdını hangi renge çevirir?', a: 'Kırmızı', w: ['Mavi', 'Yeşil', 'Sarı', 'Mor']},
      {q: 'pH değeri 7\'den küçük olan madde nasıl bir maddedir?', a: 'Asit', w: ['Baz', 'Nötr', 'Tuz', 'Element']},
      {q: 'Asit ve baz birbirini hangi işlemle etkisiz hale getirir?', a: 'Nötrleşme', w: ['Yanma', 'Erime', 'Buharlaşma', 'Donma']},
    ],
  }),
  textTopic({
    id: '8-fen-mevsim', unit: FEN, name: 'Mevsimlerin oluşumu', symbol: '🌍', summary: 'Mevsimlerin Dünya\'nın eksen eğikliğinden oluştuğunu öğren',
    intro: 'Mevsimler, Dünya\'nın Güneş etrafındaki dolanma sırasında eksen eğikliğinden dolayı oluşur.',
    paras: ['Dünya\'nın ekseni yaklaşık 23,5 derece eğiktir. Yaz mevsiminde ışınlar daha dik gelir.'],
    tip: 'Mevsim farkları, Güneş ışınlarının geliş açısıyla açıklanır.',
    items: [
      {q: 'Mevsimler neden oluşur?', a: 'Dünya\'nın eksen eğikliğinden', w: ['Dünya\'nın hızının değişmesinden', 'Ayın büyümesinden', 'Güneş\'in küçülmesinden', 'Dünyanın dönmemesinden']},
      {q: 'Yaz mevsiminde Güneş ışınları nasıl gelir?', a: 'Daha dik', w: ['Daha yatık', 'Hiç gelmez', 'Sadece gece gelir', 'Yalnızca bulutlu']},
      {q: 'Dünya\'nın ekseninin yaklaşık eğimi kaç derecedir?', a: '23,5', w: ['45', '90', '12', '5']},
    ],
  }),

  // ---------- T.C. İnkılap Tarihi ----------
  textTopic({
    id: '8-ink-kurtulus', unit: INK, name: 'Millî Mücadele', symbol: '🇹🇷', summary: 'Millî Mücadele\'nin başlıca olaylarını öğren',
    intro: 'Millî Mücadele, Osmanlı Devleti\'nin işgal edildiği dönemde Türk milletinin bağımsızlığını kazanmak için verdiği mücadeledir.',
    paras: ['Mustafa Kemal Paşa, 19 Mayıs 1919\'da Samsun\'a çıkarak Millî Mücadele\'nin başlangıcını sağlamıştır.'],
    tip: 'Millî Mücadele olaylarını tarih sırasıyla hatırlamak çok yardımcı olur.',
    items: [
      {q: 'Mustafa Kemal Paşa hangi tarihte Samsun\'a çıkmıştır?', a: '19 Mayıs 1919', w: ['29 Ekim 1923', '23 Nisan 1920', '30 Ağustos 1922', '1 Kasım 1922']},
      {q: 'Türkiye Büyük Millet Meclisi hangi tarihte açılmıştır?', a: '23 Nisan 1920', w: ['19 Mayıs 1919', '29 Ekim 1923', '30 Ağustos 1922', '24 Temmuz 1923']},
      {q: 'Millî Mücadele\'nin amacı neydi?', a: 'Bağımsızlık', w: ['Sömürgeleşmek', 'Yeni savaşlar çıkarmak', 'Toprak kazanmak', 'İşgali kabul etmek']},
    ],
  }),
  textTopic({
    id: '8-ink-cumhuriyet', unit: INK, name: 'Cumhuriyetin ilanı', symbol: '🏛', summary: 'Cumhuriyetin ilanını ve önemini öğren',
    intro: 'Cumhuriyet, 29 Ekim 1923\'te ilan edilmiştir. Egemenliğin kayıtsız şartsız millete ait olduğu bir yönetim biçimidir.',
    paras: ['Cumhuriyetin ilanıyla Türkiye\'de saltanat kaldırılmamış, ancak halk egemenliği esas alınmıştır.'],
    tip: 'Cumhuriyetin ilanı ile saltanatın kaldırılmasını ayrı tarihlerle karıştırmamak gerekir.',
    items: [
      {q: 'Cumhuriyet hangi tarihte ilan edilmiştir?', a: '29 Ekim 1923', w: ['19 Mayıs 1919', '23 Nisan 1920', '30 Ağustos 1922', '1 Kasım 1922']},
      {q: 'Cumhuriyet yönetiminde egemenlik kime aittir?', a: 'Millete', w: ['Padişaha', 'Halife\'ye', 'Askerlere', 'Yabancı devletlere']},
      {q: 'Cumhuriyetin ilanı hangi yönetim biçimini getirmiştir?', a: 'Cumhuriyet', w: ['Saltanat', 'Monarşi', 'Halifelik', 'Diktatörlük']},
    ],
  }),
  textTopic({
    id: '8-ink-inkilaplar', unit: INK, name: 'Atatürk ilke ve inkılapları', symbol: '⚑', summary: 'Başlıca inkılapları ve dönemlerini öğren',
    intro: 'Atatürk ilke ve inkılapları; eğitim, hukuk, toplum ve ekonomi alanlarında yapılan köklü değişiklikleri kapsar.',
    paras: ['Harf İnkılabı 1928\'de kabul edilmiş, Latin alfabesi kullanılmaya başlanmıştır.'],
    tip: 'İnkılapları alanlarına göre gruplayarak öğrenmek hatırlamayı kolaylaştırır.',
    items: [
      {q: 'Latin alfabesi hangi inkılapla kabul edilmiştir?', a: 'Harf İnkılabı', w: ['Hukuk İnkılabı', 'Eğitim İnkılabı', 'Şapka İnkılabı', 'Tevhid-i Tedrisat']},
      {q: 'Tevhid-i Tedrisat hangi alanda yapılan bir inkılaptır?', a: 'Eğitim', w: ['Ekonomi', 'Ulaşım', 'Sağlık', 'Askerlik']},
      {q: 'Medeni Kanun hangi alanda yapılan bir inkılaptır?', a: 'Hukuk', w: ['Eğitim', 'Ekonomi', 'Spor', 'Tarım']},
    ],
  }),

  // ---------- İngilizce ----------
  textTopic({
    id: '8-en-past-simple', unit: EN, name: 'Past Simple', symbol: 'ed', summary: 'Geçmiş zamanın kullanımını ve düzenli-düzensiz fiilleri öğren',
    intro: 'Past Simple, geçmişte başlayıp biten olayları anlatır. Düzenli fiillere "-ed" eklenir; düzensiz fiiller ise farklı çekimlenir.',
    paras: ['"I visited London last year." cümlesinde "visited" düzenli, "went" ise düzensiz bir fiil örneğidir.'],
    tip: 'Düzensiz fiilleri sık kullanılanlardan başlayarak ezberlemek faydalıdır.',
    items: [
      {q: '"Yesterday I ___ to school." boşluğu için hangisi doğrudur?', a: 'went', w: ['go', 'goes', 'going', 'will go']},
      {q: '"We ___ the movie last night." boşluğu için hangisi doğrudur?', a: 'watched', w: ['watch', 'watches', 'watching', 'will watch']},
      {q: 'Past Simple neyi anlatmak için kullanılır?', a: 'Geçmişte biten olayları', w: ['Gelecek planlarını', 'Şu an olanı', 'Alışkanlıkları', 'Hayali durumları']},
    ],
  }),
  textTopic({
    id: '8-en-conditionals', unit: EN, name: 'First Conditional', symbol: 'if', summary: 'Gerçek olabilecek koşulları ifade etmeyi öğren',
    intro: 'First Conditional, gelecekte gerçekleşmesi mümkün olan koşulları anlatır. "If + present simple, will + fiil" yapısı kullanılır.',
    paras: ['"If it rains, I will stay home." cümlesinde yağmur yağarsa evde kalacağımı anlatıyorum.'],
    tip: 'If cümlesinde gelecek zaman yerine geniş zaman kullanılır.',
    items: [
      {q: 'First Conditional hangi yapıyla kurulur?', a: 'If + present simple, will + fiil', w: ['If + past simple, would + fiil', 'If + will, can + fiil', 'If + to be, must + fiil', 'If + ing, should + fiil']},
      {q: '"If you study, you ___ pass the exam." boşluğu için hangisi doğrudur?', a: 'will', w: ['would', 'studied', 'studying', 'to']},
      {q: 'First Conditional neyi ifade eder?', a: 'Gerçekleşmesi mümkün olan koşulu', w: ['Geçmişte olmayan koşulu', 'Kesin geçmiş olayı', 'Hayali bir dileği', 'Alışkanlığı']},
    ],
  }),

  // ---------- Din Kültürü ----------
  textTopic({
    id: '8-din-kader', unit: DIN, name: 'Kader ve kaza', symbol: '☪', summary: 'Kader inancının temel ilkelerini öğren',
    intro: 'Kader, Allah\'ın her şeyi bilmesi ve takdir etmesidir. Kaza ise takdirin gerçekleşmesidir. İnsan, iradesiyle sorumluluk taşır.',
    paras: ['Kader inancı, insanın çalışıp gayret etmesine engel değildir; aksine sorumluluk bilincini artırır.'],
    tip: 'Kader inancı tembelliğe değil, gayret ve sorumluluğa yöneltmelidir.',
    items: [
      {q: 'Allah\'ın her şeyi bilmesi ve takdir etmesine ne denir?', a: 'Kader', w: ['Ahiret', 'Melek', 'Vahiy', 'Sünnet']},
      {q: 'Kaza neyi ifade eder?', a: 'Takdirin gerçekleşmesini', w: ['Takdirin olmamasını', 'Ahiret gününü', 'Namazı', 'Oruç ibadetini']},
      {q: 'Kader inancı insana ne kazandırır?', a: 'Sorumluluk bilinci', w: ['Tembellik', 'Çalışmama isteği', 'Sorumsuzluk', 'Gayret kaybı']},
    ],
  }),
  textTopic({
    id: '8-din-ibadet-ozel', unit: DIN, name: 'Bayramlar', symbol: '🌙', summary: 'Dinimizdeki bayramları ve anlamlarını öğren',
    intro: 'Ramazan Bayramı ve Kurban Bayramı İslam\'daki iki büyük bayramdır. Bayramlarda akrabalar ziyaret edilir ve yardımlaşma önem kazanır.',
    paras: ['Kurban Bayramı, Hz. İbrahim\'in sembolik olarak yaptığı fedakârlığın anısına kutlanır.'],
    tip: 'Bayramların anlamını bilmek, kutlamaları daha anlamlı yapar.',
    items: [
      {q: 'Oruç ayının ardından kutlanan bayram hangisidir?', a: 'Ramazan Bayramı', w: ['Kurban Bayramı', 'Hicri yılbaşı', 'Mevlit Kandili', 'Regaip Kandili']},
      {q: 'Kurban Bayramı hangi peygamberin fedakârlığının anısına kutlanır?', a: 'Hz. İbrahim', w: ['Hz. Musa', 'Hz. İsa', 'Hz. Nuh', 'Hz. Yusuf']},
      {q: 'Bayramlarda neye önem verilir?', a: 'Akraba ziyaretine ve yardımlaşmaya', w: ['Tek başına kalmaya', 'Gürültüye', 'Kavgaya', 'Kimseyle görüşmemeye']},
    ],
  }),

  // ---------- Görsel Sanatlar ----------
  textTopic({
    id: '8-gs-cagdas', unit: GS, name: 'Çağdaş sanat', symbol: '🎭', summary: 'Çağdaş sanatın özelliklerini öğren',
    intro: 'Çağdaş sanat, 20. yüzyılda ortaya çıkan ve geleneksel kuralları sorgulayan sanat anlayışlarını kapsar. Kavramsal sanat ve performans sanatı bu kapsamdadır.',
    paras: ['Kavramsal sanatta eserin fikri, fiziksel görünümünden daha önemlidir.'],
    tip: 'Çağdaş sanat eserlerine bakarken eserin ardındaki fikri düşünmek yararlıdır.',
    items: [
      {q: 'Eserin fikrinin fiziksel görünümünden daha önemli olduğu sanat anlayışı hangisidir?', a: 'Kavramsal sanat', w: ['Klasik resim', 'Freska', 'Mozaik', 'Minyatür']},
      {q: 'Çağdaş sanat hangi yüzyılda ortaya çıkmıştır?', a: '20. yüzyıl', w: ['15. yüzyıl', '17. yüzyıl', '18. yüzyıl', '19. yüzyılın başı']},
      {q: 'Çağdaş sanat neyi sorgular?', a: 'Geleneksel kuralları', w: ['Hiçbir şeyi', 'Yalnızca fiyatları', 'Sadece renkleri', 'Yalnızca tarihi']},
    ],
  }),
  textTopic({
    id: '8-gs-minyatur', unit: GS, name: 'Türk minyatürü', symbol: '🖌', summary: 'Türk minyatür sanatının özelliklerini öğren',
    intro: 'Minyatür, kitap sayfalarını süslemek için yapılan küçük ölçekli resimlerdir. Türk minyatüründe düz perspektif ve canlı renkler görülür.',
    paras: ['Osmanlı minyatürlerinde kişiler genellikle yüzleri profilden ve elbiseleriyle sembolik olarak çizilir.'],
    tip: 'Minyatürleri incelerken renk ve süsleme detaylarına dikkat et.',
    items: [
      {q: 'Minyatür neyi süslemek için yapılan küçük ölçekli resimlerdir?', a: 'Kitap sayfalarını', w: ['Büyük duvarları', 'Gökyüzünü', 'Yolları', 'Araçları']},
      {q: 'Türk minyatüründe hangi özellik görülür?', a: 'Canlı renkler ve düz perspektif', w: ['Gerçekçi gölgeler', 'Siyah beyaz tonlar', 'Derinlik yanılsaması', 'Üç boyutlu heykeller']},
      {q: 'Minyatürler hangi araçla yapılan eserlerdir?', a: 'Fırça ile boyanmış küçük resimler', w: ['Taş oymaları', 'Metal dökümler', 'Ağaç kesimleri', 'Dokuma kumaşlar']},
    ],
  }),

  // ---------- Müzik ----------
  textTopic({
    id: '8-mu-donem', unit: MU, name: 'Müzik dönemleri', symbol: '🎻', summary: 'Batı müziğinin başlıca dönemlerini tanı',
    intro: 'Batı müziği Barok, Klasik, Romantik ve Modern dönem gibi aşamalardan geçmiştir. Her dönemin kendine özgü özellikleri vardır.',
    paras: ['Barok döneminde Bach ve Vivaldi, Klasik dönemde Mozart ve Haydn öne çıkmıştır.'],
    tip: 'Bestecileri döneme göre gruplayarak öğrenmek kolaylık sağlar.',
    items: [
      {q: 'Barok dönemin önemli bestecilerinden biri hangisidir?', a: 'Bach', w: ['Beethoven', 'Chopin', 'Debussy', 'Stravinsky']},
      {q: 'Klasik dönemde öne çıkan besteci hangisidir?', a: 'Mozart', w: ['Vivaldi', 'Schubert', 'Bartók', 'Mahler']},
      {q: 'Hangi besteci Romantik dönemde yaşamıştır?', a: 'Chopin', w: ['Bach', 'Haydn', 'Vivaldi', 'Mozart']},
    ],
  }),
  textTopic({
    id: '8-mu-kompozisyon', unit: MU, name: 'Müzikte form', symbol: '🎵', summary: 'Müzikte temel form kavramlarını öğren',
    intro: 'Müzikte form, parçanın bölümlerinin düzenlenişidir. Tema, varyasyon ve rondo gibi formlar bulunur.',
    paras: ['Rondo formunda ana tema, aralarda farklı bölümlerle tekrarlanır.'],
    tip: 'Bir parçayı dinlerken tekrar eden bölümleri fark etmek formu anlamanı sağlar.',
    items: [
      {q: 'Ana temanın aralarda farklı bölümlerle tekrar edildiği form hangisidir?', a: 'Rondo', w: ['Sonat', 'Fuga', 'Etüt', 'Varyasyon']},
      {q: 'Müzikte form neyi ifade eder?', a: 'Parçanın bölümlerinin düzenlenişini', w: ['Parçanın rengini', 'Parçanın hızını', 'Parçanın sanatçısını', 'Parçanın süresini']},
      {q: 'Ana temanın değiştirilerek tekrarlandığı form hangisidir?', a: 'Varyasyon', w: ['Rondo', 'Sonat', 'Fuga', 'Etüt']},
    ],
  }),

  // ---------- Beden Eğitimi ----------
  textTopic({
    id: '8-be-dogaci', unit: BE, name: 'Doğa sporları', symbol: '🧗', summary: 'Doğa sporlarının özelliklerini öğren',
    intro: 'Doğa sporları, doğal ortamda yapılan ve cesaret, dayanıklılık ile çevre bilinci gerektiren etkinliklerdir.',
    paras: ['Yürüyüş, kaya tırmanışı, kano ve bisiklet doğa sporları arasında yer alır.'],
    tip: 'Doğa sporlarına çıkmadan önce hava durumunu ve güvenlik önlemlerini kontrol et.',
    items: [
      {q: 'Doğal ortamda yapılan ve çevre bilinci gerektiren sporlara ne denir?', a: 'Doğa sporları', w: ['Salon sporları', 'Takım sporları', 'Kapalı alan sporları', 'Masa tenisi']},
      {q: 'Hangisi doğa sporlarına örnektir?', a: 'Kaya tırmanışı', w: ['Basketbol', 'Voleybol', 'Masa tenisi', 'Halter']},
      {q: 'Doğa sporlarına çıkmadan önce neye bakılmalıdır?', a: 'Hava durumu ve güvenlik önlemleri', w: ['Sadece saç rengine', 'Yalnızca ayakkabı markasına', 'Sadece müziğe', 'Hiçbir şeye']},
    ],
  }),
  textTopic({
    id: '8-be-stres', unit: BE, name: 'Stres yönetimi', symbol: '🧘', summary: 'Sporla stresle başa çıkma yollarını öğren',
    intro: 'Düzenli spor, stresi azaltan ve ruh sağlığını destekleyen önemli bir yöntemdir. Derin nefes ve esneme egzersizleri de stresi azaltır.',
    paras: ['Spor yapan bireylerde mutluluk hormonu olarak bilinen endorfin salgısı artar.'],
    tip: 'Stresli anlarda derin nefes almak ve kısa yürüyüşe çıkmak yardımcı olur.',
    items: [
      {q: 'Düzenli spor hangi duyguyu azaltmaya yardımcı olur?', a: 'Stres', w: ['Sevinç', 'Enerji', 'Sabır', 'Dinlenme isteği']},
      {q: 'Spor yapınca salgılanan ve mutluluk hissi veren madde hangisidir?', a: 'Endorfin', w: ['Adrenalin', 'İnsülin', 'Kortizol', 'Melatonin']},
      {q: 'Stresi azaltmak için hangi egzersiz yardımcı olur?', a: 'Derin nefes egzersizi', w: ['Uzun süre bağırmak', 'Hiç hareket etmemek', 'Sürekli koşmak', 'Ağır yük kaldırmak']},
    ],
  }),
];
