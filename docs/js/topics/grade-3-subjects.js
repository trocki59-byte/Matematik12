// 3. sınıf: Türkçe, Hayat Bilgisi, Müzik, Görsel Sanatlar, Beden Eğitimi.
// Metin tabanlı konular: her madde {q, a, w}; w tam 4 yanlış seçenek içerir.

function textTopic({id, unit, name, symbol, summary, intro, paras, tip, items, more}) {
  const extra = more?.sections ?? [];
  const examples = more?.examples ?? items.slice(0, 3).map(it => ({problem: it.q, steps: ['Soruyu dikkatlice oku.', 'Seçenekleri tek tek değerlendir.', `Doğru cevap: ${it.a}`], answer: it.a}));
  return {
    id, grade: 3, unit, name, symbol, summary, kind: 'text',
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
    id: '3-tr-anlam', unit: TR, name: 'Sözcükte anlam', symbol: 'a=?', summary: 'Gerçek, mecaz ve terim anlamı ayır',
    intro: 'Sözcükler gerçek anlamda, mecaz anlamda ya da terim anlamında kullanılabilir.',
    paras: ['"Elini çabuk tut" cümlesinde "el" sözcüğü gerçek anlamda değil, mecazi anlamda kullanılmıştır.'],
    tip: 'Sözcüğün cümledeki anlamına bakarak hangi anlamda kullanıldığını bul.',
    more: {
      sections: [
        {title: 'Gerçek anlam', paras: ['Bir sözcüğün sözlükteki ilk ve temel anlamına gerçek anlam denir. Sıcak çorba cümlesinde sıcak sözcüğü gerçek anlamıyla kullanılmıştır.']},
        {title: 'Mecaz anlam', paras: ['Sözcüğün gerçek anlamından uzaklaşarak yeni bir anlam kazanmasına mecaz anlam denir. Kalbi taş gibi ifadesinde kalp sözcüğü duygusuz anlamında mecaz olarak kullanılmıştır.'], tip: 'Bir sözcük cümlede olağan dışı bir anlam taşıyorsa büyük ihtimalle mecazdır.'},
      ],
      examples: [
        {problem: 'Kalbi taş gibi cümlesinde kalp sözcüğü hangi anlamda kullanılmıştır?', steps: ['Kalp organ anlamında değil, duygusuz anlamında kullanılmış.', 'Gerçek anlamından uzaklaşmış.'], answer: 'mecaz anlam'},
        {problem: 'Sıcak çorba ifadesinde sıcak sözcüğü hangi anlamdadır?', steps: ['Çorbanın ısısını anlatıyor.', 'Sözcük temel anlamında kullanılmış.'], answer: 'gerçek anlam'},
      ],
    },
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
    more: {
      sections: [
        {title: 'Fiil nedir?', paras: ['Fiil, bir iş, oluş ya da durum bildiren sözcüktür. Koşmak, yazmak, gelmek birer fiildir.', 'Fiiller -mak ya da -mek ekiyle sözlükte yer alır. Cümlede zamana göre çekimlenirler: koşuyor, koştu, koşacak.'], tip: 'Bir sözcüğe "yapmak" dediğinde anlam kazanıyorsa büyük ihtimalle fiildir.'},
      ],
      examples: [
        {problem: 'Koşmak sözcüğü hangi sözcük türüdür?', steps: ['Koşmak bir iş bildiriyor.', 'Bu nedenle fiildir.'], answer: 'fiil'},
        {problem: 'Yazıyor fiilinin zamanı nedir?', steps: ['Ekindeki -ıyor eki işin şu an yapıldığını gösterir.', 'Bu zaman şimdiki zamandır.'], answer: 'şimdiki zaman'},
      ],
    },
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
    more: {
      sections: [
        {title: 'Sıfat nedir?', paras: ['Sıfat, isimleri niteleyen, yani onların nasıl olduğunu anlatan sözcüklerdir. Uzun, kırmızı, güzel birer sıfattır.'], tip: 'Bir ismin önüne "nasıl bir" sorusunu sorduğunda cevap veren sözcük sıfattır.'},
      ],
      examples: [
        {problem: 'Uzun sözcüğü hangi sözcük türüdür?', steps: ['Bir ismin nasıl olduğunu anlatıyor.', 'Bu nedenle sıfattır.'], answer: 'sıfat'},
        {problem: 'Kırmızı elma cümlesinde sıfat hangisidir?', steps: ['Elma bir isimdir.', 'Elmanın nasıl olduğunu kırmızı anlatır.'], answer: 'kırmızı'},
      ],
    },
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
    more: {
      sections: [
        {title: 'Zarf nedir?', paras: ['Zarf, fiilleri niteleyen sözcüklerdir. Zaman, durum ve yer bildirirler: dün, hızlı, içeride gibi.'], tip: 'Zarfı bulmak için fiile "nasıl", "ne zaman" ya da "nerede" diye sorduğunda cevap veren sözcüğe bak.'},
      ],
      examples: [
        {problem: 'Hızlı koştu cümlesinde hızlı sözcüğü hangi türdendir?', steps: ['Hızlı, koşma fiilinin nasıl yapıldığını anlatır.', 'Fiili niteleyen sözcük zarftır.'], answer: 'zarf'},
        {problem: 'Dün geldi cümlesindeki dün sözcüğü hangi zarf türüdür?', steps: ['Dün, işin ne zaman yapıldığını bildirir.', 'Bu bir zaman zarfıdır.'], answer: 'zaman zarfı'},
      ],
    },
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
    more: {
      sections: [
        {title: 'Sık kullanılan işaretler', paras: ['Virgül (,) sıralı sözcükleri ve cümle parçalarını ayırır. Nokta (.) cümlenin sonunu gösterir. İki nokta (:) bir açıklama ya da sıralamadan önce kullanılır.', 'Tırnak işareti (") bir alıntıyı ya da özel bir ifadeyi göstermek için kullanılır.'], tip: 'Sıralı sözcüklerin arasına her zaman virgül koy.'},
      ],
      examples: [
        {problem: 'Sıralı sözcükleri birbirinden hangi işaret ayırır?', steps: ['Elma, armut, üzüm sıralamasında ayırıcı işaret gerekir.', 'Sıralı sözcükler virgül ile ayrılır.'], answer: 'virgül'},
        {problem: 'Bir alıntıyı göstermek için hangi işaret kullanılır?', steps: ['Başkasının söylediği sözü belirtmek gerekir.', 'Bu amaçla tırnak işareti kullanılır.'], answer: 'tırnak işareti'},
      ],
    },
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
    more: {
      sections: [
        {title: 'Şiir', paras: ['Şiir, dizelerden oluşan ve çoğunlukla uyaklı metindir. Duygular ve düşünceler şiirde kısa ve ahenkli bir biçimde anlatılır.']},
        {title: 'Öykü ve masal', paras: ['Öykü, gerçekçi bir olayı anlatan kısa metindir. Masal ise olağanüstü olayların ve hayvanların konuşabildiği kurgusal metindir.'], tip: 'Metnin gerçek hayatta olabilecek mi yoksa olağanüstü mü olduğuna bakarak türünü anlayabilirsin.'},
      ],
      examples: [
        {problem: 'Dizelerden oluşan, uyaklı metin hangi türdedir?', steps: ['Dizelerden ve uyaklardan oluşan metin şiirdir.', 'Bu tür şiirdir.'], answer: 'şiir'},
        {problem: 'Olağanüstü olayların ve konuşan hayvanların anlatıldığı metin hangi türdedir?', steps: ['Olağanüstü olaylar masalların özelliğidir.', 'Bu tür masaldır.'], answer: 'masal'},
      ],
    },
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
    more: {
      sections: [
        {title: 'Tarih nedir?', paras: ['Tarih, geçmişte yaşanan olayların ve insanların öğrenilmesidir. Aile büyüklerimizden dinlediğimiz anılar, eski fotoğraflar ve belgeler tarih bilgisi kaynaklarıdır.']},
        {title: 'Kaynaklar', paras: ['Yazılı kaynaklar kitap, mektup ve belgelerdir. Sözlü kaynaklar ise insanların anlattığı anılardır.'], tip: 'Bir olayı öğrenirken hangi kaynaktan öğrendiğini de not etmek iyi bir alışkanlıktır.'},
      ],
      examples: [
        {problem: 'Geçmişte yaşanan olayların öğrenilmesine ne ad verilir?', steps: ['Geçmişi incelemek tarih bilimidir.', 'Bu bilimin adı tarihtir.'], answer: 'tarih'},
        {problem: 'Büyüklerimizden dinleyerek öğrendiğimiz bilgi hangi kaynak türüdür?', steps: ['Anlatılarak aktarılan bilgiler sözlüdür.', 'Bu kaynak sözlü kaynaktır.'], answer: 'sözlü kaynak'},
      ],
    },
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
    more: {
      sections: [
        {title: 'Ana yönler', paras: ['Dört ana yön vardır: kuzey, güney, doğu ve batı. Güneş doğudan doğar, batıdan batar.', 'Kuzey yönü genellikle harita üzerinde yukarıya, güney ise aşağıya çizilir.'], tip: 'Sabah güneşe doğru baktığında sağ tarafın güney, sol tarafın kuzey olduğunu hatırla.'},
      ],
      examples: [
        {problem: 'Güneş hangi yönden doğar?', steps: ['Güneş sabah doğudan yükselir.', 'Doğan güneşin yönü doğudur.'], answer: 'doğu'},
        {problem: 'Kuzeyin tam karşısındaki yön hangisidir?', steps: ['Kuzey ile karşılıklı olan yön güneydir.', 'Bu nedenle cevap güneydir.'], answer: 'güney'},
      ],
    },
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
    more: {
      sections: [
        {title: 'Çocuk hakları', paras: ['Her çocuğun eğitim alma, sağlıklı olma, oyun oynama ve kendini ifade etme hakkı vardır.', 'Haklarımızı kullanırken başkalarının haklarına da saygı göstermeliyiz.'], tip: 'Bir hakkı kullanırken başkasının da aynı hakkı olduğunu unutma.'},
      ],
      examples: [
        {problem: 'Okula gidip ders görmek hangi hakkın örneğidir?', steps: ['Okula gidip eğitim almak bir haktır.', 'Bu eğitim hakkıdır.'], answer: 'eğitim hakkı'},
        {problem: 'Dinlenmek ve oyun oynamak hangi hakkın parçasıdır?', steps: ['Oyun ve dinlenme çocuk hakları arasındadır.', 'Bu dinlenme ve oyun hakkıdır.'], answer: 'dinlenme ve oyun hakkı'},
      ],
    },
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
    more: {
      sections: [
        {title: 'İhtiyaç nedir?', paras: ['İhtiyaç, yaşamak için mutlaka gerekli olan şeylerdir. Yemek, su, giysi ve barınak birer ihtiyaçtır.']},
        {title: 'İstek nedir?', paras: ['İstek, insanın canı çektiği, olmasa da yaşamını sürdürebileceği şeylerdir. Oyuncak, yeni bir bisiklet ya da tatlı birer istektir.'], tip: 'Bir şey olmadan yaşayabiliyorsan büyük olasılıkla bir istektir.'},
      ],
      examples: [
        {problem: 'Ekmek ihtiyaç mıdır, istek midir?', steps: ['Ekmek yaşamak için gereken bir besindir.', 'Bu nedenle bir ihtiyaçtır.'], answer: 'ihtiyaç'},
        {problem: 'Yeni bir bisiklet ihtiyaç mıdır, istek midir?', steps: ['Bisiklet olmadan yaşamak mümkündür.', 'Bu nedenle bir istektir.'], answer: 'istek'},
      ],
    },
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
    more: {
      sections: [
        {title: 'İletişim araçları', paras: ['İletişim araçları insanların birbirine bilgi aktarmasını sağlar. Telefon, radyo, televizyon, internet ve mektup birer iletişim aracıdır.', 'Bazı araçlar ses, bazıları ise hem ses hem görüntü iletir.'], tip: 'Bir aracın ses mi görüntü mü ilettiğini düşünerek ayırt edebilirsin.'},
      ],
      examples: [
        {problem: 'Hem ses hem görüntü ileten iletişim aracı hangisidir?', steps: ['Ses ve görüntüyü birlikte veren araç televizyondur.', 'Bu araç televizyondur.'], answer: 'televizyon'},
        {problem: 'Uzaktaki birine hızlıca konuşarak ulaşmak için hangi araç kullanılır?', steps: ['Uzaktaki kişiyle sesle konuşmak gerekir.', 'Bunun için telefon kullanılır.'], answer: 'telefon'},
      ],
    },
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
    more: {
      sections: [
        {title: 'Ölçü nedir?', paras: ['Ölçü, müzikte vuruşların belli bir düzende gruplanmasıdır. 2/4, 3/4 ve 4/4 en sık kullanılan ölçülerdir.', 'Ölçünün ilk vuruşu genellikle vurgulu çalınır.'], tip: 'Bir şarkıyı sayarak dinle: 1-2-3, 1-2-3 gibi giden müzik 3/4 ölçülüdür.'},
      ],
      examples: [
        {problem: '3/4 ölçüde bir ölçüde kaç vuruş vardır?', steps: ['Ölçünün paydası vuruşun türünü, payı vuruş sayısını gösterir.', 'Payda 3 olduğu için üç vuruş vardır.'], answer: '3'},
        {problem: 'Vurgunun genellikle düştüğü vuruş hangisidir?', steps: ['Ölçünün başı vurgulu çalınır.', 'Vurgu ölçünün ilk vuruşunda olur.'], answer: 'ilk vuruş'},
      ],
    },
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
    more: {
      sections: [
        {title: 'Marş', paras: ['Marşlar, genellikle geçit törenlerinde ve önemli günlerde söylenen, güçlü ve coşkulu müziklerdir.'], tip: 'Marşlarda ritim güçlü olduğu için birlikte yürürken söylemek kolaydır.'},
        {title: 'Türkü', paras: ['Türküler halkın duygu ve düşüncelerini yansıtan, yüzyıllardır söylenen şarkılardır. Yöreden yöreye farklılık gösterebilir.'], tip: 'Bir türkü dinlerken söyleyenin hangi duygularını anlattığını düşün.'},
      ],
      examples: [
        {problem: 'Marşlar genellikle hangi duyguyu anlatır?', steps: ['Marşlar güçlü ve coşkulu müziklerdir.', 'Anlattıkları duygu coşkudur.'], answer: 'coşku'},
        {problem: 'Türküler neyi anlatır?', steps: ['Türküler halkın duygu ve düşüncelerini söyler.', 'Bu nedenle halkın duygu ve düşüncelerini anlatır.'], answer: 'halkın duygu ve düşüncelerini'},
      ],
    },
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
    more: {
      sections: [
        {title: 'Yaylı çalgılar', paras: ['Yaylı çalgılarda ses, tellerin yay ile sürtülmesiyle çıkar. Keman ve viyolonsel bu aileye aittir.']},
        {title: 'Üflemeli çalgılar', paras: ['Üflemeli çalgılarda ses, havanın üflenerek çalgının içinden geçmesiyle çıkar. Flüt, klarnet ve trompet bu aileye aittir.'], tip: 'Bir çalgının sesini nasıl çıkardığını düşünerek ailesini bulabilirsin.'},
      ],
      examples: [
        {problem: 'Keman hangi çalgı ailesine aittir?', steps: ['Keman tellerinin yay ile sürtülmesiyle ses çıkarır.', 'Bu nedenle yaylı çalgıdır.'], answer: 'yaylı'},
        {problem: 'Klarnet nasıl çalınır?', steps: ['Klarnet bir üflemeli çalgıdır.', 'Ses üfleyerek çıkarılır.'], answer: 'üfleyerek'},
      ],
    },
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
    more: {
      sections: [
        {title: 'Yakın ve uzak', paras: ['Resimde yakında olan nesneler büyük, uzaktaki nesneler ise küçük çizilir. Bu sayede resme derinlik kazandırılır.', 'Uzaktaki dağlar ve ağaçlar genellikle daha açık renklerle boyanır.'], tip: 'Resmin altına yakın şeyleri, ortaya ve üste uzak şeyleri çizmeyi dene.'},
      ],
      examples: [
        {problem: 'Resimde uzaktaki bir ağaç nasıl çizilir?', steps: ['Uzaktaki nesneler resimde küçük görünür.', 'Ağaç küçük çizilir.'], answer: 'küçük'},
        {problem: 'Resimde yakındaki bir nesne nasıl çizilir?', steps: ['Yakındaki nesneler daha büyük görünür.', 'Nesne büyük çizilir.'], answer: 'büyük'},
      ],
    },
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
    more: {
      sections: [
        {title: 'Kompozisyon nedir?', paras: ['Kompozisyon, bir resmin içindeki öğelerin düzenlenmesidir. Ön plan, orta plan ve arka plan birbirini tamamlar.', 'Resmin en dikkat çeken yerine odak nokta denir. Odak nokta izleyicinin ilk baktığı yerdir.'], tip: 'Resmini yapmadan önce en önemli şeyin nerede olacağını planla.'},
      ],
      examples: [
        {problem: 'Resmin en dikkat çeken yerine ne ad verilir?', steps: ['Resmin ilk bakılan yeri dikkat çeker.', 'Bu yere odak nokta denir.'], answer: 'odak nokta'},
        {problem: 'Yakın nesneler resmin hangi kısmında yer alır?', steps: ['Yakın nesneler izleyiciye en yakın olan kısımdadır.', 'Bu bölüm ön plandır.'], answer: 'ön plan'},
      ],
    },
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
    more: {
      sections: [
        {title: 'Görsel ritim', paras: ['Görsel ritim, bir resimde şekil, renk ya da boyutun düzenli olarak tekrarlanmasıyla oluşan hissi verir.', 'Büyük ve küçük şekillerin sırayla dizilmesi, ritim ve hareket duygusu yaratır.'], tip: 'Bir ritmi göz ile takip etmek için şekillerin sırasını parmağınla takip et.'},
      ],
      examples: [
        {problem: 'Büyük, küçük, büyük, küçük diye giden düzen neyi oluşturur?', steps: ['Şekiller sırayla tekrar ediyor.', 'Bu tekrar bir ritim yaratır.'], answer: 'ritim'},
        {problem: 'Görsel ritim neyin tekrarıyla oluşur?', steps: ['Ritim düzenli tekrarlarla oluşur.', 'Tekrar eden şekil, renk ya da boyut ritim oluşturur.'], answer: 'tekrar'},
      ],
    },
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
    more: {
      sections: [
        {title: 'Dayanıklılık nedir?', paras: ['Dayanıklılık, vücudun uzun süre yorulmadan hareket edebilme becerisidir. Koşu, yüzme ve uzun yürüyüş dayanıklılığı geliştirir.'], tip: 'Dayanıklılığını artırmak için her gün biraz daha uzun süre hareket etmeyi dene.'},
      ],
      examples: [
        {problem: 'Uzun süre yorulmadan koşabilme özelliği nedir?', steps: ['Uzun süre hareket edebilmek vücudun dayanıklılığıdır.', 'Bu özellik dayanıklılıktır.'], answer: 'dayanıklılık'},
        {problem: 'Dayanıklılığı artırmak için ne yapılmalıdır?', steps: ['Düzenli spor vücudu güçlendirir.', 'Dayanıklılığı artırmak için düzenli spor yapılmalıdır.'], answer: 'düzenli spor yapmak'},
      ],
    },
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
    more: {
      sections: [
        {title: 'Esneklik nedir?', paras: ['Esneklik, eklemlerimizin hareket açıklığını ifade eder. Esnek bir vücut daha rahat hareket eder ve sakatlanma riski azalır.', 'Germe hareketleri esnekliği artırır. Bu hareketleri yaparken acı hissetmeden, yavaşça ve sabit tutarak yapmalıyız.'], tip: 'Esneme hareketlerini ısındıktan sonra yapmak daha güvenlidir.'},
      ],
      examples: [
        {problem: 'Esneklik vücutta neyi artırır?', steps: ['Esneklik eklemlerin hareket açıklığını artırır.', 'Bu nedenle hareket açıklığı artar.'], answer: 'hareket açıklığı'},
        {problem: 'Esneme hareketleri ne zaman yapılmalıdır?', steps: ['Soğuk kaslar sakatlanmaya daha yatkındır.', 'Esneme hareketleri ısındıktan sonra yapılır.'], answer: 'ısındıktan sonra'},
      ],
    },
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
    more: {
      sections: [
        {title: 'Güvenli oyun', paras: ['Oyun oynarken oyun alanının güvenli olması çok önemlidir. Kırık, sivri ya da kaygan yerlerden uzak durmalıyız.', 'Bisiklet ve kaykay gibi araçlarla oynarken koruyucu malzeme, örneğin kask takmak gerekir.'], tip: 'Oynamaya başlamadan önce oyun alanını kontrol etmek kazaları önler.'},
      ],
      examples: [
        {problem: 'Bisiklet sürerken hangi koruyucu malzeme takılmalıdır?', steps: ['Başı darbelerden korumak için bir malzeme gerekir.', 'Bisiklet sürerken kask takılmalıdır.'], answer: 'kask'},
        {problem: 'Oyun oynamadan önce ne kontrol edilmelidir?', steps: ['Oyun alanında tehlike olabilir.', 'Oyun alanındaki tehlikeler kontrol edilmelidir.'], answer: 'oyun alanının güvenliği'},
      ],
    },
    items: [
      {q: 'Oyunlarda kazaları önlemek için ne yapılmalıdır?', a: 'Güvenlik kurallarına uymak', w: ['Kuralları bozmak', 'Güvenlik ekipmanını çıkarmak', 'Oyun alanını hiç kontrol etmemek', 'Acele etmek']},
      {q: 'Oyun öncesinde hangi kontrol önemlidir?', a: 'Oyun alanının güvenli olup olmadığı', w: ['Oyuncuların saç rengi', 'Topun kokusu', 'Renk seçimi', 'Oyun süresi']},
    ],
  }),
];
