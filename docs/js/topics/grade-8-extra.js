// 8. sınıf: her konuya eklenen ek çözümlü örnekler. curriculum.js bu bölümleri konu anlatımına ekler.
const section = examples => ({
  title: 'Daha fazla örnek',
  paras: ['Aşağıdaki örnekleri adım adım takip et, sonra kendi sayılarınla aynı adımları dene.'],
  examples,
});

export const extraSections = {
  '8-uslu': section([
    {problem: '2⁵ · 2³ çarpımı kaçtır?', steps: ['Tabanlar aynı: üsler toplanır, 5 + 3 = 8', '2⁸ = 256'], answer: '256'},
    {problem: '(5²)² ifadesi kaçtır?', steps: ['Üs üssü: 2 · 2 = 4', '5⁴ = 625'], answer: '625'},
    {problem: '10⁴ ÷ 10² kaçtır?', steps: ['Tabanlar aynı: üsler çıkarılır, 4 − 2 = 2', '10² = 100'], answer: '100'},
  ]),
  '8-kok': section([
    {problem: '√144 kaçtır?', steps: ['12 · 12 = 144', 'Sonuç: 12'], answer: '12'},
    {problem: '√(16 · 9) kaçtır?', steps: ['√(16 · 9) = √16 · √9', '= 4 · 3 = 12'], answer: '12'},
    {problem: '√72 = a√2 ise a kaçtır?', steps: ['72 = 36 · 2', '√72 = √36 · √2 = 6√2', 'a = 6'], answer: '6'},
  ]),
  '8-ozdeslik': section([
    {problem: '(x + 3)² ifadesinde x\'in katsayısı kaçtır?', steps: ['(x + 3)² = x² + 2·3·x + 9', '= x² + 6x + 9', 'Katsayı: 6'], answer: '6'},
    {problem: '(x − 4)(x + 4) ifadesinin sabit terimi kaçtır?', steps: ['Farkların çarpımı: x² − 4²', '= x² − 16', 'Sabit terim: −16'], answer: '-16'},
    {problem: '2x(x + 5) ifadesinde x\'in katsayısı kaçtır?', steps: ['2x · x = 2x²', '2x · 5 = 10x', 'Katsayı: 10'], answer: '10'},
  ]),
  '8-dogrusal-egim': section([
    {problem: '(1, 2) ve (3, 8) noktalarından geçen doğrunun eğimi kaçtır?', steps: ['m = (8 − 2) / (3 − 1)', '= 6 / 2 = 3'], answer: '3'},
    {problem: '(2, 5) ve (4, 1) noktalarından geçen doğrunun eğimi kaçtır?', steps: ['m = (1 − 5) / (4 − 2)', '= −4 / 2 = −2'], answer: '-2'},
    {problem: 'y = −4x + 7 doğrusunun eğimi kaçtır?', steps: ['y = mx + n biçiminde m, x\'in katsayısıdır', 'm = −4'], answer: '-4'},
  ]),
  '8-pisagor': section([
    {problem: 'Dik kenarları 6 ve 8 olan dik üçgenin hipotenüsü kaçtır?', steps: ['c² = 6² + 8² = 36 + 64 = 100', 'c = 10'], answer: '10'},
    {problem: 'Hipotenüsü 13, bir dik kenarı 5 olan dik üçgenin diğer dik kenarı kaçtır?', steps: ['b² = 13² − 5² = 169 − 25 = 144', 'b = 12'], answer: '12'},
    {problem: 'Dik kenarları 9 ve 12 olan dik üçgenin hipotenüsü kaçtır?', steps: ['c² = 81 + 144 = 225', 'c = 15'], answer: '15'},
  ]),
  '8-donusum': section([
    {problem: 'A(2, 3) noktasının x eksenine göre yansıması olan noktanın y koordinatı kaçtır?', steps: ['x eksenine yansımada y işaret değiştirir', 'y = −3'], answer: '-3'},
    {problem: 'A(2, 3) noktası (+4, −1) vektörüyle ötelenirse yeni x koordinatı kaçtır?', steps: ['x = 2 + 4 = 6', 'y = 3 − 1 = 2', 'Yeni x: 6'], answer: '6'},
    {problem: 'A(−1, 4) noktasının y eksenine göre yansıması olan noktanın x koordinatı kaçtır?', steps: ['y eksenine yansımada x işaret değiştirir', 'x = 1'], answer: '1'},
  ]),
  '8-medyan': section([
    {problem: 'Veriler 3, 7, 5, 9 ise medyan kaçtır?', steps: ['Sırala: 3, 5, 7, 9', 'Çift sayıda veri: ortadaki iki sayının ortalaması', '(5 + 7) / 2 = 6'], answer: '6'},
    {problem: 'Veriler 2, 8, 4 ise medyan kaçtır?', steps: ['Sırala: 2, 4, 8', 'Ortadaki değer: 4'], answer: '4'},
    {problem: 'Veriler 10, 6, 14, 2, 8 ise medyan kaçtır?', steps: ['Sırala: 2, 6, 8, 10, 14', 'Ortadaki değer: 8'], answer: '8'},
  ]),
};
