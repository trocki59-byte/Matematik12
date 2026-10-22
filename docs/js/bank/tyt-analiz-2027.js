// TYT Analiz Denemesi 2027 – tam deneme (120 soru).
// Konu dağılımı son 8 yılın ÖSYM TYT sorularına göre belirlendi (scratchpad analizi).
// Sorular ÖSYM sorusu değildir; tamamen orijinal pratik sorulardır.
import {TYT_ANALIZ_2027 as MATEMATIK_BANKA} from './tyt-analiz-2027-matematik.js';

const q = (topicName, text, correct, wrong, pos, explanation) => {
  const options = [...wrong];
  options.splice(pos, 0, correct);
  return {topicName, text, options, correctIndex: pos, explanation};
};
const withPassage = (passage, stem) => `${passage}\n\n${stem}`;

const P1 = 'Bir şehrin kimliğini yalnızca binaları ve caddeleri belirlemez. Asıl olan, orada yaşayan insanların birbirine gösterdiği küçük özenlerdir. Kaldırımda düşen bir çantayı uzatmak, yoğun bir otobüste yer açmak ya da bir komşunun kapısını ardına kadar kapatmadan bekletmek gibi davranışlar şehri yalnızca bir yerleşim olmaktan çıkarıp ortak bir yaşam alanına dönüştürür. Modern kentlerin en çok yoksun kaldığı şey, belki de bu görünmez bağların ta kendisidir.';
const P2 = 'Okumanın asıl kazancı, bilgiyi biriktirmekte değil, bilginin insanı nasıl değiştirdiğinde görülür. Aynı kitabı on yıl arayla okuyan biri, sayfaların değişmediğini fakat kendisinin değiştiğini fark eder. Bu yüzden iyi bir eser, her okunuşta yeni bir anlam üretir. Okumayı bir yarış gibi görüp kitap sayısını önemseyen okur, bu zenginliği kaçırabilir.';
const P3 = 'Mart ayının soğuk bir sabahında Elif, dedesinin bahçesindeki eski çınar ağacının yanında durdu. Ağaç yıllardır aynı yerdeydi ama dalları her yıl biraz daha yayılmıştı. Dedesi bir keresinde, bu ağacın kendisinden önce dikildiğini, onu büyütenlerin de artık aramızda olmadığını söylemişti. Elif, o gün ilk kez ağacın gölgesinde oturmanın bir miras taşımak olduğunu anladı.';
const P4 = 'Bilimsel bilginin güvenilirliği, sonuçların başkaları tarafından tekrarlanabilmesine dayanır. Bir deneyin sonucu yalnızca bir laboratuvarda doğrulanmışsa, bu bilginin evrensel olduğunu söylemek için henüz erkendir. Bu nedenle bilim insanları, kendi bulgularını açık biçimde paylaşarak eleştiriye davet eder. Eleştiriden kaçınan bir bilim, kendi kendini sınırlandırır.';
const P5 = 'Dil, toplumun belleğini taşıyan canlı bir varlıktır. Yeni kavramlar ortaya çıktıkça sözcük hazinesi genişler; eski sözcükler ise kullanılmadıkça unutulur. Bu süreç dilin bir eksilme olduğu anlamına gelmez; aksine dil, kullanıcılarının ihtiyaçlarına göre kendini yeniler. Dil bu yüzden kültürel bir kayıt olduğu kadar gelecek için bir araçtır.';
const P6 = 'Bir resim, ilk bakışta yalnızca renklerden oluşmuş gibi görünebilir. Oysa ressam, her fırça darbesiyle bir düşünceyi de tuvale yerleştirir. Seyirci, bu düşünceyi çözmek için kendi deneyimini eserin önüne getirir. Böylece resim, yalnızca ressamın değil, izleyenin de yarattığı bir anlam alanına dönüşür.';

const turkce = [
  q('Paragraf-Ana düşünce', withPassage(P1, 'Parçanın ana düşüncesi aşağıdakilerden hangisidir?'), 'Bir şehri yaşanır kılan, insanlar arasındaki gündelik saygı ve özenlerdir.', ['Şehirlerin mimari yapısı insan ilişkilerinden daha önemlidir.', 'Otobüs ve kaldırım gibi kamusal alanlar modern kentlerde yetersizdir.', 'Komşuluk ilişkileri yalnızca küçük yerleşimlerde görülür.', 'Kentlerde yaşayanlar birbirine yardım etmeyi bırakmıştır.'], 1, 'Parçanın merkezinde gündelik özen ve görünmez bağların önemi vardır.'),
  q('Paragraf-Çıkarım', withPassage(P1, 'Parçadan hangisi çıkarılabilir?'), 'Gündelik küçük davranışlar bir şehrin niteliğini etkiler.', ['Şehrin kimliğini yalnızca mimari belirler.', 'Kentlerde yardımlaşma tamamen ortadan kalkmıştır.', 'Yazar şehirlerde yaşamayı sevmemektedir.', 'Otobüste yer vermek yasal bir zorunluluktur.'], 2, 'Yazar, küçük özenlerin şehri topluluk yaptığını söyler.'),
  q('Paragraf-Yardımcı fikir', withPassage(P1, 'Yazar, kaldırımda bir çantayı uzatmak örneğini neden vermiştir?'), 'Gündelik bir özen davranışının şehri topluluk yaptığını örneklemek için.', ['Şehrin ulaşım sorununu anlatmak için.', 'Kamusal alanların bakımsızlığını göstermek için.', 'Modern teknolojinin insanları ayırdığını vurgulamak için.', 'Şehrin gelişmişliğini övmek için.'], 3, 'Örnek, parçadaki ana düşünceyi somutlaştırmak için verilmiştir.'),
  q('Paragraf-Diğer', withPassage(P1, 'Parçada geçen "görünmez bağlar" ifadesi neyi anlatır?'), 'Gözle görülmeyen ama insanları birbirine bağlayan ilişkileri.', ['Şehirlerdeki elektrik ve su hatlarını.', 'Yasalarla belirlenen sınırları.', 'Kentlerdeki trafik düzenini.', 'Mahalledeki duvar yazılarını.'], 0, 'Mecaz anlamda kullanılmış bir ifadedir: insanlar arasındaki görünmeyen bağları anlatır.'),

  q('Paragraf-Ana düşünce', withPassage(P2, 'Yazara göre okumanın asıl kazancı nedir?'), 'Bilginin insanı değiştirmesi.', ['Çok sayıda kitap okumak.', 'Bilgiyi ezberleyip hatırlamak.', 'Kitapları hızlı bitirmek.', 'Eserlerin fiyatını bilmek.'], 2, 'Parça, okumanın değişim yaratan etkisini vurgular.'),
  q('Paragraf-Çıkarım', withPassage(P2, 'Parçadan hangisine ulaşılabilir?'), 'İyi bir eser her okunuşta farklı bir anlam kazandırabilir.', ['Kitap, okur değiştikçe kendisi de değişir.', 'Kitap sayısını önemseyen okur daha başarılıdır.', 'On yıl sonra okunan kitaplar anlamını yitirir.', 'Yazar okuma alışkanlığını yasaklamaktadır.'], 1, 'Parça, iyi eserin her okunuşta yeni anlam ürettiğini söyler.'),
  q('Anlatım biçimi', withPassage(P2, 'Parçada ağırlıklı olarak hangi anlatım biçimi kullanılmıştır?'), 'Açıklama', ['Öyküleme', 'Betimleme', 'Söyleşme', 'Günlük'], 2, 'Parça bir düşünceyi gerekçeleriyle açıklar.'),
  q('Sözcük yapısı/ek', withPassage(P2, 'Parçada geçen "okunuşta" sözcüğü hangi türdendir?'), 'İsim', ['Sıfat', 'Zarf', 'Zamir', 'Edat'], 1, '"Okunuş" okuma eyleminden türetilmiş bir isimdir; "-ta" eki bulunma hâlini gösterir.'),

  q('Paragraf-Ana düşünce', withPassage(P3, 'Parçanın ana düşüncesi aşağıdakilerden hangisidir?'), 'Geçmişten kalan değerler, yaşayanlar için bir miras niteliği taşır.', ['Ağaçlar kış aylarında büyümeyi durdurur.', 'Dedeler torunlarına sürekli öğüt vermelidir.', 'Ağaç bakımı çocuklar için zordur.', 'Mart ayı soğuk geçen bir aydır.'], 4, 'Parça, geçmişin ve emeğin bugüne bıraktığı mirası anlatır.'),
  q('Anlatım biçimi', withPassage(P3, 'Parçada hangi anlatım biçimi ağırlıklıdır?'), 'Öyküleme', ['Betimleme', 'Açıklama', 'Tartışma', 'Söyleşme'], 0, 'Parça, Elif\'in yaşadığı bir anı ve olayları sırasıyla anlatır.'),
  q('Sözcükte anlam', withPassage(P3, 'Parçada geçen "miras" sözcüğü hangi anlamda kullanılmıştır?'), 'Geçmişten gelen ve sonraki kuşaklara aktarılan değer.', ['Ölen kişinin bıraktığı maddi değer.', 'Yasal bir belge.', 'Bir ağacın kökü.', 'Bir ailenin yerleşim yeri.'], 2, 'Sözcük mecaz anlamda, kültürel ya da manevi bir değeri anlatır.'),
  q('Paragraf-Çıkarım', withPassage(P3, 'Parçadan hangisi çıkarılabilir?'), 'Ağaç, dedesinden daha eskidir.', ['Elif ağacı yeni dikmiştir.', 'Dedesi ağacı kışın dikmiştir.', 'Ağaç her yıl aynı büyüklükte kalmıştır.', 'Elif ağacın gölgesinde hiç oturmamıştır.'], 1, 'Dedesi ağacın kendisinden önce dikildiğini söylemiştir.'),

  q('Paragraf-Ana düşünce', withPassage(P4, 'Parçanın ana düşüncesi nedir?'), 'Bilimsel bilginin güvenilirliği tekrarlanabilirlik ve eleştiriyle sağlanır.', ['Bilim insanları deneylerini gizlemelidir.', 'Laboratuvar koşulları bilimin gelişmesini engeller.', 'Tek bir deney yeterlidir.', 'Bilim ile eleştiri birbirinden bağımsızdır.'], 0, 'Parça, bilimsel güvenilirliğin tekrar ve eleştiriye dayandığını anlatır.'),
  q('Paragraf-Çıkarım', withPassage(P4, 'Parçadan hangisi çıkarılabilir?'), 'Açık paylaşım bilimin güvenilirliğini destekler.', ['Tek bir deneyle elde edilen sonuç her zaman geçerlidir.', 'Bilim insanları eleştiriden kaçınmalıdır.', 'Laboratuvar dışında bilgi üretilemez.', 'Evrensel bilgi yalnızca kitaplarda yer alır.'], 1, 'Bulguları paylaşmak, sonuçların denetlenmesini ve güvenilirliğin artmasını sağlar.'),
  q('Paragraf-Yardımcı fikir', withPassage(P4, 'Yazar, tek bir laboratuvar sonucunun evrensel olduğunu söylemeyi neden erken bulmaktadır?'), 'Sonuçlar tekrarlanarak doğrulanmadığı için.', ['Bilim insanları çok az çalıştığı için.', 'Laboratuvarların hep kapalı olduğu için.', 'Deneylerin pahalı olduğu için.', 'Bilimin yalnız kuramsal olduğu için.'], 2, 'Tekrarlanmayan sonuçlar genelleştirilemez.'),
  q('Paragraf-Diğer', withPassage(P4, 'Parçadaki "kendi kendini sınırlandırır" ifadesiyle ne anlatılmak istenmiştir?'), 'Eleştiriye kapalı bilim, kendi gelişimini engeller.', ['Bilimsel gelişim kendini geliştirme yeteneği kazanır.', 'Bilim insanları birbirini destekler.', 'Sınır koymak bilimin temel ilkesidir.', 'Bilim yalnızca kendi alanında kalır.'], 3, 'İfade, eleştiriden kaçınan bilimin kendi ilerlemesini durdurmasını anlatır.'),

  q('Paragraf-Ana düşünce', withPassage(P5, 'Parçanın ana düşüncesi aşağıdakilerden hangisidir?'), 'Dil, kullanıcılarının ihtiyaçlarına göre kendini yenileyen canlı bir yapıdır.', ['Dil değişmeyen bir yapıdır.', 'Eski sözcükler dilin en önemli parçasıdır.', 'Yeni kavramlar dili bozar.', 'Sözcük hazinesi her zaman daralır.'], 2, 'Parça, dilin canlılığını ve değişimini ana fikir olarak sunar.'),
  q('Paragraf-Çıkarım', withPassage(P5, 'Parçadan hangisi çıkarılabilir?'), 'Dilin genişlemesi, toplumun düşünsel ihtiyaçlarıyla ilgilidir.', ['Kullanılmayan sözcükler dilin dışına asla çıkmaz.', 'Dil yalnızca geçmişi anlatır.', 'Yeni sözcükler dilin zenginliğini azaltır.', 'Eski sözcükler kültürel bir değer taşımaz.'], 1, 'Yeni kavramlar ve ihtiyaçlar sözcük hazinesini genişletir.'),
  q('Paragraf-Yardımcı fikir', withPassage(P5, 'Yazar, dilin "bir eksilme" olmadığını neden belirtmektedir?'), 'Değişimin dilin ihtiyaçlara göre yenilenmesi olduğunu vurgulamak için.', ['Yeni sözcüklerin eskilerin yerini tamamen aldığını belirtmek için.', 'Dilin hiçbir zaman değişmediğini göstermek için.', 'Eski sözcüklerin geri dönmesini sağlamak için.', 'Dil öğretiminin zorluğunu anlatmak için.'], 1, 'Yazar, değişimi dilin yenilenmesi olarak yorumlar.'),
  q('Paragraf-Diğer', withPassage(P5, 'Parçada geçen "kültürel bir kayıt" ifadesi neyi anlatır?'), 'Bir toplumun geçmişten bugüne taşıdığı birikimin dile yansımasını.', ['Dilin resmî kayıtlarda tutulmasını.', 'Kültürel etkinliklerin kaydedilmesini.', 'Yazılı metinlerin arşivlenmesini.', 'Dilin hukuki belgelerdeki yerini.'], 0, 'Dil, toplumun kültürel birikimini taşıyan bir kayıt niteliğindedir.'),

  q('Paragraf-Ana düşünce', withPassage(P6, 'Parçanın ana düşüncesi nedir?'), 'Sanat eseri, ressam ve izleyici birlikte anlam üretir.', ['Resim yalnızca renklerle anlatılabilir.', 'Ressamlar eserlerini açıklamamalıdır.', 'Seyirci sanattan anlamaz.', 'Renk seçimi bir resmin tek unsurudur.'], 1, 'Parça, anlamın ressam ile izleyicinin ortak üretimi olduğunu söyler.'),
  q('Paragraf-Çıkarım', withPassage(P6, 'Parçadan hangisine ulaşılabilir?'), 'Aynı resim farklı izleyicilerde farklı anlamlar uyandırabilir.', ['İzleyici, eserin anlamını yalnızca ressamdan öğrenebilir.', 'Renkler anlam taşımaz.', 'Ressamın düşüncesi tuvale yerleştirilmez.', 'Resim yapmak bir deneyim gerektirmez.'], 2, 'İzleyicinin deneyimi, eserin anlamını farklılaştırır.'),
  q('Paragraf-Yardımcı fikir', withPassage(P6, 'Yazar, ressamın eserine yerleştirdiği düşünceyi neden vurgulamaktadır?'), 'İzleyicinin de anlam üretiminde rol oynadığını göstermek için.', ['Resmin neden pahalı olduğunu açıklamak için.', 'Ressamların eğitimini anlatmak için.', 'Renk kullanımını eleştirmek için.', 'Sanat eleştirmenlerini yermek için.'], 3, 'Parça, ressam ve izleyicinin birlikte anlam kurduğunu öne çıkarır.'),
  q('Sözcükte anlam', withPassage(P6, 'Parçada geçen "fırça darbesi" ifadesi ne anlama gelir?'), 'Ressamın tuvale yaptığı küçük bir müdahale.', ['Fırçanın kırılması.', 'Sanat eleştirisi.', 'Renk tonu.', 'Kişinin tuvali kırması.'], 0, 'İfade, bir fırçalama hareketi ve onun taşıdığı anlamı kastetmektedir.'),

  q('Dil bilgisi', 'Aşağıdaki sözcüklerden hangisi sıfattır?', 'kırmızı', ['yazmak', 'ancak', 'dün', 'ben'], 0, '"Kırmızı" bir ismin rengini bildirdiği için sıfattır.'),
  q('Dil bilgisi', 'Aşağıdaki cümlelerin hangisinde zamir vardır?', 'Bunu ben yaptım.', ['Kitap masanın üstünde.', 'Çok güzel bir gün.', 'Yarın gideceğiz.', 'Hızla koştu.'], 1, '"Bunu" ve "ben" birer zamirdir.'),
  q('Dil bilgisi', 'Hangi cümlede edat vardır?', 'Ali için bir hediye aldı.', ['Kitap masanın üstünde.', 'Hava çok soğuk.', 'Dün geldi.', 'Güzel bir çiçek.'], 2, '"İçin" bir edattır.'),
  q('Dil bilgisi', '"Gülerek" sözcüğü hangi fiilimsi türüdür?', 'Zarf-fiil', ['İsim-fiil', 'Sıfat-fiil', 'Ek fiil', 'Edat'], 0, 'Fiile "-erek" eki getirilerek zarf görevi kazandırılmıştır.'),
  q('Dil bilgisi', '"Okuyan öğrenci" ifadesinde "okuyan" hangi türdendir?', 'Sıfat-fiil', ['İsim-fiil', 'Zarf-fiil', 'Ek fiil', 'Fiil çekimi'], 1, 'Bir ismi niteleyen fiilimsi olduğu için sıfat-fiildir.'),
  q('Dil bilgisi', '"Ali dün yeni bir kitap aldı." cümlesinde nesne hangisidir?', 'yeni bir kitap', ['Ali', 'dün', 'aldı', 'Ali dün'], 3, 'Eylemin doğrudan nesnesi "yeni bir kitap" tamlamasıdır.'),
  q('Dil bilgisi', '"Ali eve gitti." cümlesinde yüklem hangisidir?', 'gitti', ['Ali', 'eve', 'Ali eve', 'Hepsi'], 4, 'Cümlenin yüklemi, eylemi bildiren "gitti" sözcüğüdür.'),
  q('Noktalama', 'Sıralı sözcükler arasında hangi noktalama işareti kullanılır?', 'virgül', ['nokta', 'iki nokta', 'tire', 'ünlem'], 1, 'Sıralı sözcükler arasına virgül konur.'),
  q('Noktalama', 'Hangi cümlenin sonuna soru işareti konulmalıdır?', 'Yarın okula gelecek misin', ['Yarın okula gelecek.', 'Yarın okula gel.', 'Yarın okula gelecek!', 'Yarın okula gelecek,'], 0, 'Soru eki (mi/mı/mu/mü) taşıyan cümleler soru işaretiyle biter.'),
  q('Yazım', 'Hangisi doğru yazılmıştır?', "Ankara'ya", ['Ankaraya', 'ankara\'ya', 'Ankara ya', 'Ankarra\'ya'], 2, 'Özel isim büyük harfle başlar ve ek kesme işaretiyle ayrılır.'),
  q('Yazım', 'Hangisi doğru yazılmıştır?', 'hiçbir şey', ['hiç bir şey', 'hiçbirşey', 'hiç birşey', 'hiç bir şeye'], 3, '"Hiçbir" sözcüğü bitişik yazılır.'),
  q('Sözcükte anlam', '"Göz atmak" deyiminin anlamı nedir?', 'hızlıca bakıp geçmek', ['çok dikkatle bakmak', 'bir şeyi görmezden gelmek', 'gözünü kapatmak', 'göz kulak olmak'], 0, 'Deyim, bir şeye kısa süre bakmak anlamına gelir.'),

  q('Sözcükte anlam', '"Sevinç" sözcüğünün eş anlamlısı hangisidir?', 'neşe', ['üzüntü', 'korku', 'öfke', 'sıkıntı'], 0, 'Eş anlamlılar aynı kavramı karşılayan sözcüklerdir.'),
  q('Sözcükte anlam', '"Yakın" sözcüğünün zıt anlamlısı hangisidir?', 'uzak', ['yeni', 'sıcak', 'küçük', 'hızlı'], 0, '"Yakın" sözcüğünün karşıt anlamı "uzak"tır.'),
  q('Sözcükte anlam', 'Hangisinde "yüz" sözcüğü sayı anlamında kullanılmıştır?', 'Yüz kişi toplandı.', ['Yüzünü yıkadı.', 'Denizde yüzdü.', 'Yüzüne baktı.', 'Yüzü kızardı.'], 1, 'Burada "yüz", sayı adı olarak kullanılmıştır.'),
  q('Sözcükte anlam', '"Kulak kabartmak" deyiminin anlamı nedir?', 'dikkatle dinlemek', ['bağırmak', 'sessiz kalmak', 'kulağını çekmek', 'kulağına fısıldamak'], 0, 'Deyim, bir sesi dikkatle dinlemeyi anlatır.'),
];

const sosyal = [
  q('Felsefe', 'Platon\'un bilgi anlayışında gerçek bilgiye ulaşmanın yolu nedir?', 'Akıl yoluyla idealara ulaşmak', ['Duyuların bildirdiklerini olduğu gibi kabul etmek', 'Yalnızca deneyle sınamak', 'Geleneklere uymak', 'Toplumun görüşünü benimsemek'], 1, 'Platon\'a göre gerçek bilgi duyularla değil, akılla idealara ulaşmakla elde edilir.'),
  q('Felsefe', '"Düşünüyorum, öyleyse varım" ilkesi hangi filozofa aittir?', 'Descartes', ['Platon', 'Aristoteles', 'Hume', 'Kant'], 1, 'Bu ilke Descartes\'ın şüphe yönteminin temel sonucudur.'),
  q('Felsefe', 'Kant\'ın "Saf Aklın Eleştirisi" adlı eseri temel olarak neyi inceler?', 'Bilginin olanakları ve sınırlarını', ['Ahlakın kökenini', 'Devletin biçimlerini', 'Sanatın tanımını', 'Tanrı\'nın varlığını kanıtlamayı'], 2, 'Kant, aklın neyi bilebileceğini ve bilginin sınırlarını inceler.'),
  q('Felsefe', 'Sokrates\'in soru sorarak karşısındakinin bilgisini sorgulama yöntemine ne ad verilir?', 'Diyalektik', ['Tümevarım', 'Deney', 'Tümdengelim', 'Sezgi'], 0, 'Sokrates diyalog yoluyla bilgiyi sorgulayan diyalektik yöntemi kullanmıştır.'),
  q('Felsefe', 'Kant\'a göre ahlaki bir eylemin temel ölçütü nedir?', 'Ödev bilinciyle ve evrensel bir ilkeye uygun yapılması', ['Sonucunun yararlı olması', 'Kişinin çıkarını gözetmesi', 'Toplumun beğenmesi', 'Duygusal haz vermesi'], 2, 'Kant\'ın ahlak anlayışında eylemin değeri niyet ve evrensel ilkeye uygunlukla ölçülür.'),
  q('Felsefe', 'Varlık felsefesinin temel sorusu hangisidir?', 'Varlık nedir?', ['Bilgi nasıl elde edilir?', 'İyi nedir?', 'Güzel nedir?', 'Devlet nasıl yönetilmelidir?'], 1, 'Varlık felsefesi (ontoloji) varlığın ne olduğunu ve doğasını sorgular.'),
  q('Felsefe', 'Bilginin kaynağını deneye ve duyu algısına dayandıran akım hangisidir?', 'Deneycilik', ['Akılcılık', 'Varoluşçuluk', 'Pragmatizm', 'Eleştirel rasyonalizm'], 1, 'Deneycilik (ampirizm), bilginin kaynağını deneyde görür.'),
  q('Felsefe', 'Aristoteles\'in klasik akıl yürütme biçimi hangisidir?', 'Tümdengelim', ['Tümevarım', 'Diyalektik', 'Sezgi', 'Deney'], 0, 'Aristoteles\'in kıyas (silogizm) yöntemi tümdengelimdir.'),

  q('Coğrafya', 'Ölçeği 1/100 000 olan bir haritada 2 cm\'lik uzunluk gerçekte kaç km\'ye karşılık gelir?', '2 km', ['0,2 km', '20 km', '200 km', '0,02 km'], 1, '2 cm × 100 000 = 200 000 cm = 2 km.'),
  q('Coğrafya', 'Ekvatorun enlemi kaç derecedir?', '0°', ['23,5°', '45°', '66,5°', '90°'], 0, 'Ekvator, enlemlerin başlangıç çizgisidir ve enlemi 0°\'dir.'),
  q('Coğrafya', 'Karların erimesiyle beslenen akarsuların rejimine ne ad verilir?', 'Kar rejimi', ['Yağmur rejimi', 'Buzul rejimi', 'Kurak rejim', 'Karışık rejim'], 1, 'Akarsu rejimi, besleyen kaynağa göre adlandırılır.'),
  q('Coğrafya', 'Türkiye\'de yıllık yağış miktarının en fazla olduğu bölge hangisidir?', 'Karadeniz', ['Akdeniz', 'İç Anadolu', 'Güneydoğu Anadolu', 'Ege'], 0, 'Karadeniz kıyıları, dağların yamaçları nedeniyle en fazla yağış alan bölgedir.'),
  q('Coğrafya', 'İç Anadolu Bölgesi\'nde görülen başlıca iklim tipi hangisidir?', 'Step iklimi', ['Akdeniz iklimi', 'Karadeniz iklimi', 'Tundra iklimi', 'Ekvatoral iklim'], 2, 'İç Anadolu, karasal ve az yağışlı step iklimi görülen bir bölgedir.'),

  q('Tarih', 'Malazgirt Savaşı hangi yılda gerçekleşmiştir?', '1071', ['1299', '1453', '1923', '1517'], 0, 'Malazgirt Savaşı 1071\'de yapılmıştır.'),
  q('Tarih', 'Türkiye Büyük Millet Meclisi hangi tarihte açılmıştır?', '23 Nisan 1920', ['19 Mayıs 1919', '29 Ekim 1923', '30 Ağustos 1922', '1 Kasım 1922'], 1, 'TBMM, 23 Nisan 1920\'de açılmıştır.'),
  q('Tarih', 'İstanbul\'u fetheden Osmanlı padişahı kimdir?', 'Fatih Sultan Mehmet', ['Orhan Gazi', 'Yıldırım Bayezid', 'Kanuni Sultan Süleyman', 'Yavuz Sultan Selim'], 4, 'İstanbul, 1453\'te Fatih Sultan Mehmet tarafından fethedilmiştir.'),
  q('Tarih', 'Tevhid-i Tedrisat Kanunu hangi yıl kabul edilmiştir?', '1924', ['1923', '1928', '1932', '1934'], 1, 'Eğitimin tek elde toplanmasını sağlayan kanun 1924\'te kabul edilmiştir.'),

  q('Din', 'Hicret olayıyla başlayan takvim hangisidir?', 'Hicri takvim', ['Miladi takvim', 'Rumi takvim', 'Mali takvim', 'Güneş takvimi'], 0, 'Hicri takvim, Hz. Muhammed\'in Medine\'ye hicretinden başlar.'),
  q('Din', 'Oruç hangi aya mahsus olarak tutulur?', 'Ramazan', ['Muharrem', 'Recep', 'Şaban', 'Zilhicce'], 0, 'Oruç, Ramazan ayında tutulan farz ibadettir.'),
  q('Din', 'Zekât ile ilgili aşağıdakilerden hangisi doğrudur?', 'Nisap miktarına ulaşmış maldan belirli oranın ihtiyaç sahiplerine verilmesidir.', ['Her insanın gelirinin tamamını vermesidir.', 'Yalnızca hayvanlardan alınan bir vergidir.', 'Sadece bayramda verilen bir hediyedir.', 'Yalnızca yoksullara yapılan bir sadakadır.'], 2, 'Zekât, nisap miktarını aşan malın belirli bir oranının ihtiyaç sahiplerine verilmesidir.'),
];

const fen = [
  q('Kimya', 'Atom numarası 11 olan element hangisidir?', 'Na', ['Li', 'Mg', 'Al', 'K'], 1, 'Atom numarası proton sayısına eşittir; 11 protonlu element sodyumdur (Na).'),
  q('Kimya', 'Avogadro sayısı yaklaşık kaçtır?', '6,02 · 10²³', ['3,01 · 10²³', '6,02 · 10²⁰', '12,04 · 10²³', '6,02 · 10⁻²³'], 0, 'Bir moldeki tanecik sayısı yaklaşık 6,02 · 10²³\'tür.'),
  q('Kimya', 'Asitlerin sulu çözeltilerinde bulunduğunda ortaya çıkan iyon hangisidir?', 'H⁺', ['OH⁻', 'Na⁺', 'K⁺', 'Ca²⁺'], 2, 'Asitler sulu çözeltide hidrojen iyonu (H⁺) verir.'),
  q('Kimya', 'pH değeri 3 olan bir çözelti için hangisi doğrudur?', 'Asidiktir.', ['Baziktir.', 'Nötrdür.', 'Doymuştur.', 'Hem asidik hem bazik.'], 3, 'pH 7\'den küçük çözeltiler asidiktir.'),
  q('Kimya', 'Periyodik tabloda aynı dikey sütunda bulunan elementlerin ortak özelliği nedir?', 'Değerlik elektron sayıları aynıdır.', ['Kütle numaraları eşittir.', 'Atom yarıçapları eşittir.', 'Aynı periyotta bulunurlar.', 'Proton sayıları eşittir.'], 1, 'Aynı grup elementlerinin değerlik elektron sayıları aynıdır.'),
  q('Kimya', 'Kapalı bir kapta gerçekleşen kimyasal tepkimede toplam kütle nasıl değişir?', 'Değişmez.', ['Artar.', 'Azalır.', 'Sıfırlanır.', 'İkiye katlanır.'], 2, 'Kütlenin korunumu yasasına göre tepkimede toplam kütle sabit kalır.'),
  q('Kimya', 'Farklı elementlerin belirli oranlarda kimyasal bağla birleşmesiyle oluşan saf maddeye ne denir?', 'Bileşik', ['Karışım', 'Element', 'Çözelti', 'Alaşım'], 0, 'Bileşikler, kimyasal bağla oluşan ve sabit oranlı saf maddelerdir.'),
  q('Kimya', 'Sıvı maddenin gaz hâline geçmesine ne ad verilir?', 'Buharlaşma', ['Yoğunlaşma', 'Donma', 'Erime', 'Çökelme'], 4, 'Sıvının gaza geçişi buharlaşmadır (kaynama da bu hal değişimidir).'),

  q('Biyoloji', 'Fotosentez hangi organelde gerçekleşir?', 'Kloroplast', ['Mitokondri', 'Ribozom', 'Çekirdek', 'Golgi'], 0, 'Fotosentez, bitki hücrelerindeki kloroplastlarda gerçekleşir.'),
  q('Biyoloji', 'DNA\'da adenin hangi bazla eşleşir?', 'Timin', ['Guanin', 'Sitozin', 'Urasil', 'Adenin'], 2, 'DNA\'da adenin (A) timinle (T) eşleşir.'),
  q('Biyoloji', 'Enzimler hangi yapıdaki biyolojik moleküllerdir?', 'Protein', ['Yağ', 'Karbonhidrat', 'Vitamin', 'Mineral'], 2, 'Enzimler protein yapılı biyolojik katalizörlerdir.'),
  q('Biyoloji', 'Ekosistemde üretici canlıların temel görevi nedir?', 'Güneş enerjisini kimyasal enerjiye çevirerek besin üretmek', ['Ölü organizmaları parçalamak', 'Diğer canlılara zarar vermek', 'Atık maddeleri temizlemek', 'Oksijeni tüketmek'], 0, 'Üreticiler fotosentezle besin üretir ve ekosistemin enerji girişini sağlar.'),
  q('Biyoloji', 'Kalbin sol karıncığından çıkan ve vücuda oksijenli kan taşıyan ana atardamar hangisidir?', 'Aort', ['Pulmoner arter', 'Vena kava', 'Pulmoner ven', 'Koroner damar'], 1, 'Aort, sol karıncıktan çıkıp sistemik dolaşıma oksijenli kan taşır.'),
  q('Biyoloji', 'Mitoz bölünmenin sonunda oluşan yavru hücrelerin kromozom sayısı ana hücreye göre nasıldır?', 'Aynıdır.', ['Yarısıdır.', 'İki katıdır.', 'Dörtte biridir.', 'Üç katıdır.'], 2, 'Mitozda kromozom sayısı korunur; yavru hücreler ana hücreyle aynı sayıdadır.'),

  q('Fizik', 'Kütlesi 2 kg olan bir cisme 6 m/s² ivme kazandıran net kuvvet kaç N\'dur?', '12 N', ['3 N', '8 N', '4 N', '6 N'], 2, 'F = m · a = 2 · 6 = 12 N.'),
  q('Fizik', '100 m\'lik yolu 20 saniyede alan bir hareketlinin sabit hızı kaç m/s\'dir?', '5 m/s', ['2 m/s', '10 m/s', '20 m/s', '0,5 m/s'], 0, 'v = x / t = 100 / 20 = 5 m/s.'),
  q('Fizik', 'Uçları arasındaki gerilim 10 V, direnci 5 Ω olan iletkenden geçen akım kaç A\'dir?', '2 A', ['0,5 A', '5 A', '15 A', '50 A'], 3, 'I = V / R = 10 / 5 = 2 A.'),
  q('Fizik', 'Yüzeyine dik olarak 200 N kuvvet uygulanan ve alanı 0,5 m² olan yüzeyde oluşan basınç kaç Pa\'dır?', '400 Pa', ['100 Pa', '200 Pa', '800 Pa', '1000 Pa'], 1, 'P = F / A = 200 / 0,5 = 400 Pa.'),
  q('Fizik', 'Suya bırakılan bir cisme etki eden kaldırma kuvvetinin, cismin yer değiştirdiği suyun ağırlığına eşit olduğunu ileri süren bilim insanı kimdir?', 'Arşimet', ['Newton', 'Galileo', 'Kepler', 'Faraday'], 1, 'Bu ilke Arşimet İlkesi olarak bilinir.'),
  q('Fizik', 'Işığın farklı bir ortama geçerken yön değiştirmesine ne denir?', 'Kırılma', ['Yansıma', 'Soğurma', 'Dağılma', 'Girişim'], 0, 'Işık iki ortamın sınırında hızı değiştiği için yön değiştirir; bu olaya kırılma denir.'),
];

export const TYT_ANALIZ_2027 = {
  year: 2027,
  exam: 'TYT',
  id: 'tyt-analiz-2027',
  title: 'TYT Analiz Denemesi 2027 (tam, 120 soru)',
  note: 'Konu dağılımı son 8 yılın ÖSYM TYT sorularına göre belirlendi. Sorular ÖSYM sorusu değildir; orijinal pratik sorulardır.',
  sections: [
    {key: 'turkce', label: 'TYT Türkçe (40 soru)', minutes: 40, questions: turkce},
    {key: 'sosyal', label: 'TYT Sosyal Bilimler (20 soru)', minutes: 40, questions: sosyal},
    ...MATEMATIK_BANKA.sections,
    {key: 'fen', label: 'TYT Fen Bilimleri (20 soru)', minutes: 20, questions: fen},
  ],
};
