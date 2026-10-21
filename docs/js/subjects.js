import {choicesFor} from './exams.js';
import {buildDeneme} from './deneme.js';
import {rndFrom} from './steps.js';

// Ders denemeleri. Fizik ve Kimya şablonlarla sonsuz soru üretir; diğer dersler elle yazılmış
// soru bankasından seçilir ve seçenekler her denemede karıştırılır.
// Bank öğeleri: {t: konu, q: soru, o: beş seçenek, a: doğru seçeneğin dizini (0–4), s: çözüm adımları}

const T = (label, gen) => ({label, gen});

const TEMPLATES = {
  fizik: [
    T('Hız ve yol', rnd => {
      const v = rnd(20, 80) / 10 * 10, t = rnd(2, 5);
      return {text: `Sabit ${v} km/h hızla ${t} saat giden bir aracın aldığı yol kaç km’dir?`, answer: v * t,
        steps: [`x = v · t = ${v} · ${t}`, `= ${v * t} km`]};
    }),
    T('Newton’un ikinci yasası', rnd => {
      const m = [2, 4, 5][rnd(0, 2)], a = rnd(3, 6);
      return {text: `${m} kg kütleli cisme ${a} m/s² ivme kazandıran net kuvvet kaç newton’dur?`, answer: m * a,
        steps: [`F = m · a = ${m} · ${a}`, `= ${m * a} N`]};
    }),
    T('Ohm yasası', rnd => {
      const I = rnd(2, 4), R = [3, 5, 6][rnd(0, 2)];
      return {text: `Direnci ${R} Ω olan bir iletkenden ${I} A akım geçiyor. Uçlarındaki gerilim kaç volttur?`, answer: I * R,
        steps: [`V = I · R = ${I} · ${R}`, `= ${I * R} V`]};
    }),
    T('Potansiyel enerji', rnd => {
      const m = [2, 3, 5][rnd(0, 2)], h = rnd(4, 6);
      return {text: `${m} kg kütleli bir cisim ${h} m yükseklikte duruyor (g = 10 m/s²). Potansiyel enerjisi kaç joule’dür?`, answer: m * 10 * h,
        steps: [`Ep = m · g · h = ${m} · 10 · ${h}`, `= ${m * 10 * h} J`]};
    }),
    T('Kinetik enerji', rnd => {
      const m = [2, 4, 6][rnd(0, 2)], v = rnd(2, 5);
      return {text: `${m} kg kütleli bir cisim ${v} m/s hızla hareket ediyor. Kinetik enerjisi kaç joule’dür?`, answer: m * v * v / 2,
        steps: [`Ek = ½ · m · v² = ½ · ${m} · ${v}²`, `= ${m * v * v / 2} J`]};
    }),
    T('Yoğunluk', rnd => {
      const V = [5, 10][rnd(0, 1)], k = rnd(2, 6);
      return {text: `Hacmi ${V} cm³ olan bir cismin kütlesi ${V * k} g’dır. Yoğunluğu kaç g/cm³’tür?`, answer: k,
        steps: [`d = m / V = ${V * k} / ${V}`, `= ${k} g/cm³`]};
    }),
  ],
  kimya: [
    T('Mol kavramı', rnd => {
      const M = [2, 4, 8, 16, 18, 32, 44][rnd(0, 6)], n = rnd(1, 5);
      return {text: `Molar kütlesi ${M} g/mol olan bir maddenin ${M * n} g’lık kısmı kaç moldür?`, answer: n,
        steps: [`n = m / M = ${M * n} / ${M}`, `= ${n} mol`]};
    }),
    T('Kütle numarası', rnd => {
      const Z = rnd(6, 17), N = rnd(5, 12);
      return {text: `Atom numarası ${Z}, nötron sayısı ${N} olan atomun kütle numarası kaçtır?`, answer: Z + N,
        steps: [`A = Z + n = ${Z} + ${N}`, `= ${Z + N}`]};
    }),
    T('Molarite (derişim)', rnd => {
      const C = rnd(1, 5), V = [0.5, 1, 2][rnd(0, 2)];
      const n = Math.round(C * V * 10) / 10;
      const f = x => String(x).replace('.', ',');
      return {text: `${f(V)} litrelik çözeltide ${f(n)} mol çözünen madde bulunuyor. Derişimi kaç mol/L’dir?`, answer: C,
        steps: [`M = n / V = ${f(n)} / ${f(V)}`, `= ${C} mol/L`]};
    }),
    T('Mol ve kütle', rnd => {
      const M = [2, 4, 8, 16, 18, 32, 44][rnd(0, 6)], n = rnd(1, 5);
      return {text: `${n} mol olan ve molar kütlesi ${M} g/mol olan maddenin kütlesi kaç gramdır?`, answer: n * M,
        steps: [`m = n · M = ${n} · ${M}`, `= ${n * M} g`]};
    }),
    T('Elektron sayısı', rnd => {
      const Z = rnd(3, 20);
      return {text: `Atom numarası ${Z} olan nötr bir atomun elektron sayısı kaçtır?`, answer: Z,
        steps: ['Nötr atomda elektron sayısı = proton sayısı = atom numarası', `= ${Z}`]};
    }),
  ],
};

const BANK = {
  biyoloji: [
    {t: 'Hücre', q: 'Hücrenin enerji üretim merkezi aşağıdakilerden hangisidir?', o: ['Çekirdek', 'Mitokondri', 'Ribozom', 'Lizozom'], a: 1, s: ['Mitokondri hücresel solunumla ATP üretir.']},
    {t: 'Hücre', q: 'Bitki hücresinde bulunup hayvan hücresinde bulunmayan yapı hangisidir?', o: ['Çekirdek', 'Hücre zarı', 'Hücre duvarı', 'Ribozom'], a: 2, s: ['Hücre duvarı selülozdan oluşur ve yalnızca bitki hücrelerinde bulunur.']},
    {t: 'Fotosentez', q: 'Fotosentez sonucunda açığa çıkan gaz hangisidir?', o: ['Karbondioksit', 'Oksijen', 'Azot', 'Hidrojen'], a: 1, s: ['Fotosentezde su parçalanır ve O₂ açığa çıkar.']},
    {t: 'Kalıtım', q: 'DNA’nın yapı taşı aşağıdakilerden hangisidir?', o: ['Amino asit', 'Nükleotit', 'Glikoz', 'Yağ asidi'], a: 1, s: ['DNA, nükleotitlerin uzun bir zinciridir.']},
    {t: 'Kalıtım', q: 'Kalıtsal bilginin taşındığı birim aşağıdakilerden hangisidir?', o: ['Kromozom', 'Gen', 'Protein', 'Hücre'], a: 1, s: ['Gen, bir özelliği belirleyen DNA parçasıdır.']},
    {t: 'Kalıtım', q: 'İnsan hücresinde (vücut hücresi) kaç kromozom bulunur?', o: ['23', '44', '46', '48'], a: 2, s: ['23 çift, toplam 46 kromozom.']},
    {t: 'Dolaşım', q: 'Kanda oksijeni taşıyan hücre aşağıdakilerden hangisidir?', o: ['Akyuvar', 'Alyuvar', 'Trombosit', 'Plazma'], a: 1, s: ['Alyuvarlar hemoglobin sayesinde oksijen taşır.']},
    {t: 'Sindirim', q: 'Sindirimin kimyasal olarak başladığı organ hangisidir?', o: ['Mide', 'Ağız', 'İnce bağırsak', 'Kalın bağırsak'], a: 1, s: ['Tükürükteki amilaz, nişastanın sindirimini ağızda başlatır.']},
    {t: 'Bitki biyolojisi', q: 'Bitkilerde su ve mineral tuzlarını köklerden yapraklara taşıyan doku hangisidir?', o: ['Floem', 'Ksilem', 'Epidermis', 'Meristem'], a: 1, s: ['Ksilem suyu, floem besini taşır.']},
    {t: 'Hücre', q: 'Canlıların temel yapı ve işlev birimi aşağıdakilerden hangisidir?', o: ['Doku', 'Hücre', 'Organ', 'Atom'], a: 1, s: ['Tüm canlılar hücrelerden oluşur.']},
    {t: 'Bölünme', q: 'Mayoz bölünme sonucunda bir hücreden kaç hücre oluşur?', o: ['1', '2', '4', '8'], a: 2, s: ['Mayozda bir hücreden 4 hücre oluşur.']},
  ],
  turkce: [
    {t: 'Dil bilgisi', q: 'Aşağıdakilerden hangisi fiil değildir?', o: ['gitmek', 'koşmak', 'güzel', 'yazmak'], a: 2, s: ['"Güzel" bir sıfattır; diğerleri fiildir.']},
    {t: 'Yazım', q: 'Aşağıdakilerden hangisinde yazım yanlışı vardır?', o: ['kitaplar', 'bugün', 'herkez', 'kapı'], a: 2, s: ['Doğrusu "herkes" olmalıdır.']},
    {t: 'Yazım', q: 'Aşağıdakilerin hangisi doğru yazılmıştır?', o: ['Teşekkür ederim', 'Teşekür ederim', 'Teşekkur ederim', 'Tesekkür ederim'], a: 0, s: ['Doğru yazım "teşekkür"dür.']},
    {t: 'Anlam', q: '"Gözü pek" deyiminin anlamı aşağıdakilerden hangisidir?', o: ['Çok korkak', 'Cesur ve atılgan', 'Dikkatli', 'Meraklı'], a: 1, s: ['Gözü pek: korkmayan, cesur.']},
    {t: 'Sözcükte anlam', q: 'Aşağıdaki sözcük çiftlerinden hangisi eş anlamlıdır?', o: ['mutlu - sevinçli', 'soğuk - sıcak', 'büyük - küçük', 'uzun - kısa'], a: 0, s: ['Mutlu ve sevinçli aynı anlama yakındır.']},
    {t: 'Sözcükte anlam', q: 'Aşağıdaki sözcük çiftlerinden hangisi zıt anlamlıdır?', o: ['ince - kalın', 'sevgi - aşk', 'dost - arkadaş', 'güzel - hoş'], a: 0, s: ['İnce ve kalın zıt anlamlıdır.']},
    {t: 'Dil bilgisi', q: 'Aşağıdaki cümlelerin hangisinde "de" bağlacı kullanılmıştır?', o: ['Sen de geldin.', 'Kitapta yazıyor.', 'Evde kaldık.', 'Bahçede oynadık.'], a: 0, s: ['Bağlaç olan "de" ayrı yazılır ve "ayrıca" anlamı taşır.']},
    {t: 'Sözcük türleri', q: '"Hızlı koştu" cümlesinde "hızlı" sözcüğü hangi türdendir?', o: ['Sıfat', 'Zarf', 'İsim', 'Fiil'], a: 1, s: ['Hızlı, koşma fiilinin nasıl yapıldığını belirtir: zarf.']},
    {t: 'Atasözleri', q: 'Aşağıdakilerden hangisi bir atasözüdür?', o: ['Damlaya damlaya göl olur.', 'Göz ardı etmek', 'Kapı komşu', 'Ağır ol'], a: 0, s: ['Atasözü, toplumun düşünce ve öğütlerini anlatan kalıplaşmış sözdür.']},
  ],
  tarih: [
    {t: 'Osmanlı', q: 'Osmanlı Devleti’nin kurucusu kimdir?', o: ['Orhan Bey', 'Osman Bey', 'Murad I', 'Mehmed II'], a: 1, s: ['Devlet, 1299 civarında Osman Bey tarafından kuruldu.']},
    {t: 'Osmanlı', q: 'İstanbul’un fethi hangi yılda gerçekleşmiştir?', o: ['1071', '1299', '1453', '1923'], a: 2, s: ['Fatih Sultan Mehmed 1453’te İstanbul’u aldı.']},
    {t: 'Selçuklu', q: 'Malazgirt Meydan Savaşı’nda Bizans ordusunu yenen Selçuklu sultanı kimdir?', o: ['Melikşah', 'Alp Arslan', 'Tuğrul Bey', 'Sultan Sencer'], a: 1, s: ['Savaş 1071’de Alp Arslan komutasında kazanıldı.']},
    {t: 'Malazgirt', q: 'Malazgirt Meydan Savaşı hangi yılda yapılmıştır?', o: ['1071', '1453', '1299', '1923'], a: 0, s: ['Savaş 1071’de yapıldı.']},
    {t: 'Osmanlı', q: 'Mohaç Meydan Muharebesi hangi yılda yapılmıştır?', o: ['1514', '1526', '1541', '1571'], a: 1, s: ['Mohaç Savaşı 1526’da Kanuni döneminde gerçekleşti.']},
    {t: 'Tanzimat', q: 'Tanzimat Fermanı hangi yılda ilan edilmiştir?', o: ['1839', '1856', '1876', '1908'], a: 0, s: ['Gülhane Hatt-ı Hümayunu 1839’da ilan edildi.']},
    {t: 'Kurtuluş Savaşı', q: 'TBMM’nin açılış tarihi hangisidir?', o: ['19 Mayıs 1919', '23 Nisan 1920', '30 Ağustos 1922', '29 Ekim 1923'], a: 1, s: ['TBMM, 23 Nisan 1920’de açıldı.']},
    {t: 'Cumhuriyet', q: 'Türkiye Cumhuriyeti hangi tarihte ilan edilmiştir?', o: ['23 Nisan 1920', '29 Ekim 1923', '30 Ağustos 1922', '19 Mayıs 1919'], a: 1, s: ['Cumhuriyet, 29 Ekim 1923’te ilan edildi.']},
    {t: 'İnkılaplar', q: 'Harf inkılabı hangi yılda gerçekleşmiştir?', o: ['1926', '1928', '1934', '1932'], a: 1, s: ['Latin alfabesi 1928’de kabul edildi.']},
    {t: 'Kurtuluş Savaşı', q: 'Sakarya Meydan Muharebesi’nin başkomutanı kimdir?', o: ['Kazım Karabekir', 'Mustafa Kemal', 'İsmet İnönü', 'Fevzi Çakmak'], a: 1, s: ['Sakarya Savaşı 1921’de Mustafa Kemal’in komutasında kazanıldı.']},
  ],
  cografya: [
    {t: 'Türkiye’nin yer şekilleri', q: 'Türkiye’nin en büyük gölü hangisidir?', o: ['Tuz Gölü', 'Van Gölü', 'Eğirdir Gölü', 'Beyşehir Gölü'], a: 1, s: ['Van Gölü, Türkiye’nin en büyük gölüdür (tatlı su ve tuzlu su tartışmasız en büyük).']},
    {t: 'Akarsular', q: 'Türkiye’nin en uzun akarsuyu hangisidir?', o: ['Fırat', 'Kızılırmak', 'Sakarya', 'Dicle'], a: 1, s: ['Kızılırmak, Türkiye sınırları içindeki en uzun akarsudur.']},
    {t: 'Yer şekilleri', q: 'Türkiye’nin en yüksek dağı hangisidir?', o: ['Erciyes', 'Ağrı Dağı', 'Uludağ', 'Süphan'], a: 1, s: ['Ağrı Dağı, 5137 m ile Türkiye’nin en yüksek dağıdır.']},
    {t: 'Matematik coğrafya', q: 'Ekvator hangi enlemde yer alır?', o: ['0°', '23,5°', '66,5°', '90°'], a: 0, s: ['Ekvator, 0° enlemidir.']},
    {t: 'İklim', q: 'Akdeniz iklimi Türkiye’de en çok hangi bölgede görülür?', o: ['Karadeniz', 'Akdeniz', 'İç Anadolu', 'Doğu Anadolu'], a: 1, s: ['Akdeniz iklimi, Akdeniz kıyılarında yazın sıcak ve kurak, kışın ılık ve yağışlı geçer.']},
    {t: 'Okyanuslar', q: 'Dünya’nın en büyük okyanusu hangisidir?', o: ['Atlas', 'Hint', 'Pasifik', 'Arktik'], a: 2, s: ['Pasifik Okyanusu, en geniş okyanustur.']},
    {t: 'İklim', q: 'Türkiye’de en fazla yağış alan bölge hangisidir?', o: ['Karadeniz', 'Marmara', 'Ege', 'Akdeniz'], a: 0, s: ['Karadeniz’in kıyısı, dağlar ve nemli hava nedeniyle en yağışlı bölgedir.']},
    {t: 'Türkiye’nin konumu', q: 'Türkiye’nin kaç ülke ile kara sınırı vardır?', o: ['6', '7', '8', '9'], a: 2, s: ['Yunanistan, Bulgaristan, Gürcistan, Ermenistan, Nahçıvan (Azerbaycan), İran, Irak ve Suriye.']},
    {t: 'Saat dilimleri', q: 'Türkiye’nin resmi saati hangi boylamı esas alır?', o: ['15° Doğu', '30° Doğu', '45° Doğu', '0° boylam'], a: 1, s: ['Türkiye, 30° Doğu boylamına göre UTC+3 saatini kullanır.']},
    {t: 'Yer şekilleri', q: 'Kıvrım dağları hangi süreçle oluşur?', o: ['Volkanizma', 'Levha hareketleri (orojenez)', 'Erozyon', 'Sedimantasyon'], a: 1, s: ['Levhaların çarpışması kıvrım dağlarını oluşturur.']},
  ],
  felsefe: [
    {t: 'Felsefenin kurucusu', q: 'Felsefenin kurucusu olarak kabul edilen Milet’li düşünür kimdir?', o: ['Sokrates', 'Thales', 'Platon', 'Aristoteles'], a: 1, s: ['Thales, doğa üzerine sorgulamayı başlatan ilk filozof kabul edilir.']},
    {t: 'Felsefe dalları', q: 'Bilginin kaynağını, sınırlarını ve geçerliliğini inceleyen felsefe dalı hangisidir?', o: ['Ontoloji', 'Epistemoloji', 'Etik', 'Estetik'], a: 1, s: ['Epistemoloji bilgi kuramıdır.']},
    {t: 'Felsefe dalları', q: 'İyi ve kötü, doğru ve yanlış gibi kavramları inceleyen felsefe dalı hangisidir?', o: ['Ontoloji', 'Epistemoloji', 'Etik', 'Mantık'], a: 2, s: ['Etik, ahlak felsefesidir.']},
    {t: 'Descartes', q: 'Descartes’ın ünlü sözü hangisidir?', o: ['Bilgi güçtür.', 'Düşünüyorum, öyleyse varım.', 'İnsan doğası gereği iyidir.', 'Bildiğim tek şey hiçbir şey bilmediğimdir.'], a: 1, s: ['Cogito ergo sum: "Düşünüyorum, öyleyse varım".']},
    {t: 'Platon', q: 'Platon’un "Mağara alegorisi"nin yer aldığı eseri hangisidir?', o: ['Devlet', 'Nikomakhos’a Etik', 'Organon', 'Leviathan'], a: 0, s: ['Mağara alegorisi, Devlet adlı eserde anlatılır.']},
    {t: 'Aristoteles', q: 'Aristoteles’in mantık eserlerinin toplamına verilen ad nedir?', o: ['Organon', 'Devlet', 'Saf Aklın Eleştirisi', 'Leviathan'], a: 0, s: ['Organon, Aristoteles’in mantık yazılarının derlemesidir.']},
    {t: 'Kant', q: 'Immanuel Kant’ın bilgi kuramını inceleyen ünlü eseri hangisidir?', o: ['Saf Aklın Eleştirisi', 'Devlet', 'Organon', 'Leviathan'], a: 0, s: ['Kant bu eserinde aklın sınırlarını inceler.']},
    {t: 'Bilgi kuramı', q: 'Akılcılığa (rasyonalizm) göre bilginin temel kaynağı nedir?', o: ['Duyular', 'Akıl', 'Deney', 'Gelenek'], a: 1, s: ['Akılcılar, doğru bilginin akıldan geldiğini savunur.']},
  ],
  ingilizce: [
    {t: 'Present simple', q: 'She ___ to school every day.', o: ['go', 'goes', 'going', 'gone'], a: 1, s: ['Üçüncü tekil şahıs (she) ile simple present fiile -s/-es eklenir.']},
    {t: 'Present continuous', q: 'I ___ reading a book now.', o: ['am', 'is', 'are', 'be'], a: 0, s: ['"I" ile "am" kullanılır; present continuous: am + V-ing.']},
    {t: 'Past simple', q: 'They ___ football yesterday.', o: ['play', 'played', 'playing', 'plays'], a: 1, s: ['"Yesterday" geçmiş zamanı gösterir; düzenli fiiller -ed alır.']},
    {t: 'Kelime', q: 'What is the opposite of "expensive"?', o: ['cheap', 'big', 'fast', 'heavy'], a: 0, s: ['Expensive (pahalı) zıttı cheap (ucuz).']},
    {t: 'Article', q: 'She is ___ engineer.', o: ['a', 'an', 'the', '—'], a: 1, s: ['"Engineer" ünlü sesle başlar, bu yüzden "an" kullanılır.']},
    {t: 'There is / are', q: 'There ___ three books on the table.', o: ['is', 'are', 'was', 'be'], a: 1, s: ['Çoğul isimle "there are" kullanılır.']},
    {t: 'Present perfect', q: 'I haven’t seen him ___ years.', o: ['for', 'since', 'ago', 'before'], a: 0, s: ['Süre belirtirken "for", bir başlangıç noktasından beri için "since" kullanılır.']},
    {t: 'Koşul cümleleri', q: 'If it rains, I ___ at home.', o: ['will stay', 'stay', 'stayed', 'would stay'], a: 0, s: ['Gerçek koşul (First Conditional): if + simple present, will + V1.']},
    {t: 'Passive voice', q: 'The letter ___ yesterday.', o: ['was written', 'wrote', 'was write', 'written'], a: 0, s: ['Geçmiş zamanda edilgen yapı: was/were + V3.']},
    {t: 'Kelime', q: 'Which word means "happy"?', o: ['sad', 'glad', 'angry', 'tired'], a: 1, s: ['Glad, "happy" ile eş anlamlıdır.']},
    {t: 'Comparative', q: 'My sister is ___ than me.', o: ['taller', 'tall', 'most tall', 'tallest'], a: 0, s: ['İki kişi karşılaştırılırken sıfata -er eklenir: taller.']},
    {t: 'Past continuous', q: 'We ___ dinner when the phone rang.', o: ['were having', 'had', 'have', 'has'], a: 0, s: ['Bir eylem sırasında başka bir eylem olduğunda past continuous kullanılır.']},
    {t: 'Present perfect', q: '___ you ever been to London?', o: ['Have', 'Has', 'Did', 'Do'], a: 0, s: ['"You" ile "have" kullanılır: Have you ever...?']},
    {t: 'Kelime', q: 'A place where books are kept is a ___.', o: ['library', 'hospital', 'kitchen', 'garden'], a: 0, s: ['Kitapların tutulduğu yer kütüphanedir (library).']},
  ],
};

export const SUBJECTS = [
  {key: 'fizik', name: 'Fizik', minutes: 20},
  {key: 'kimya', name: 'Kimya', minutes: 20},
  {key: 'biyoloji', name: 'Biyoloji', minutes: 20},
  {key: 'turkce', name: 'Türkçe', minutes: 20},
  {key: 'tarih', name: 'Tarih', minutes: 20},
  {key: 'cografya', name: 'Coğrafya', minutes: 20},
  {key: 'felsefe', name: 'Felsefe', minutes: 20},
  {key: 'ingilizce', name: 'İngilizce', minutes: 20},
];

export const KARMA_MATH = 6;
export const KARMA_PLAN = {fizik: 4, kimya: 4, biyoloji: 4, turkce: 6, tarih: 4, cografya: 4, felsefe: 4, ingilizce: 4};

function shuffle(list, random) {
  const out = [...list];
  for (let i = out.length - 1; i > 0; i--) {
    const j = random(0, i);
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

// Tek bir ders için n soru üretir.
function questionsFor(key, n, random, rng) {
  const result = [];
  if (TEMPLATES[key]) {
    const pool = shuffle(TEMPLATES[key], random);
    for (let i = 0; i < n; i++) {
      const t = pool[i % pool.length];
      const q = t.gen(random);
      const {options, correctIndex} = choicesFor(
        {answerText: q.answerText ?? String(q.answer)}, rng);
      result.push({topicName: t.label, question: {text: q.text, steps: q.steps, answerText: q.answerText ?? String(q.answer), answer: q.answer}, options, correctIndex});
    }
    return result;
  }
  const bank = shuffle(BANK[key], random);
  for (let i = 0; i < n; i++) {
    const item = bank[i % bank.length];
    const order = shuffle([0, 1, 2, 3, 4], random);
    const options = order.map(k => item.o[k]);
    const correctIndex = order.indexOf(item.a);
    result.push({topicName: item.t, question: {text: item.q, steps: item.s, answerText: item.o[item.a], answer: item.a}, options, correctIndex});
  }
  return result;
}

// Tek ders denemesi (n soru) ya da karma deneme (tüm dersler).
export function buildSubjectTest(key, rng = Math.random, n = 10) {
  const random = rndFrom(rng);
  if (key === 'karma') {
    // Matematik soruları TYT matematik denemesinden alınır (6 soru); toplam 40 soru.
    const questions = buildDeneme('tyt', rng).questions.slice(0, KARMA_MATH);
    for (const [subject, count] of Object.entries(KARMA_PLAN)) questions.push(...questionsFor(subject, count, random, rng));
    return {grade: 12, questions: shuffle(questions, random), title: 'Karma ders denemesi', minutes: 60};
  }
  const subject = SUBJECTS.find(s => s.key === key);
  if (!subject) throw new Error('Bilinmeyen ders');
  return {grade: 12, questions: questionsFor(key, n, random, rng), title: `${subject.name} denemesi`, minutes: subject.minutes};
}
