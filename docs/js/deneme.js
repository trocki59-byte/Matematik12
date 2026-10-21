import {generateQuestion} from './curriculum.js';
import {choicesFor} from './exams.js';
import {rndFrom} from './steps.js';

// Deneme sınavları: konu ağırlıkları, yayımlanan ÖSYM dağılımlarına göre ayarlanmıştır
// (TYT matematik ve AYT matematik toplam 40 soru). Sorular her seferinde yeniden üretilir;
// gerçek sınav soruları kullanılmaz.
export const DENEME_LENGTH = 40;

export const DENEMELER = {
  tyt: {
    title: 'TYT matematik denemesi',
    minutes: 60,
    groups: [
      {label: 'Problemler', count: 12, ids: ['6-oran', '6-yuzde', '7-yuzde-artis', '7-denklem', '6-kesir-carpma-bolme']},
      {label: 'Temel kavramlar ve sayılar', count: 7, ids: ['5-basamak', '5-islem', '5-bolunebilme', '5-ebob', '6-tamsayi']},
      {label: 'Üslü ve köklü sayılar', count: 4, ids: ['8-uslu', '8-kok', '9-koklu']},
      {label: 'Mutlak değer ve eşitsizlik', count: 4, ids: ['9-mutlak', '9-esitsizlik']},
      {label: 'Fonksiyon ve küme', count: 4, ids: ['9-kumeler', '10-fonksiyon']},
      {label: 'Olasılık ve sayma', count: 4, ids: ['10-kombinasyon', '10-permutasyon', '7-olasilik']},
      {label: 'Veri ve mantık', count: 3, ids: ['9-mantik', '9-veri', '8-medyan']},
      {label: 'Cebir', count: 2, ids: ['8-ozdeslik', '6-cebir-deger']},
    ],
  },
  ayt: {
    title: 'AYT matematik denemesi',
    minutes: 60,
    groups: [
      {label: 'Temel kavramlar', count: 6, ids: ['9-kumeler', '9-mantik', '9-mutlak', '9-esitsizlik']},
      {label: 'Trigonometri', count: 6, ids: ['11-trig', '12-hazirlik-trig-deger']},
      {label: 'Türev', count: 4, ids: ['12-turev', '12-ekstremum', '12-hazirlik-teget']},
      {label: 'İntegral', count: 4, ids: ['12-integral', '12-hazirlik-alan']},
      {label: 'Limit', count: 3, ids: ['12-limit', '12-hazirlik-limit-oran']},
      {label: 'Logaritma', count: 3, ids: ['11-logaritma', '12-hazirlik-log']},
      {label: 'Fonksiyon', count: 3, ids: ['10-fonksiyon', '12-hazirlik-ters-fonksiyon', '12-hazirlik-bilesske']},
      {label: 'Polinom ve ikinci derece', count: 3, ids: ['12-hazirlik-kalan', '10-ikinci', '11-parabol', '12-hazirlik-parabol-tepe']},
      {label: 'Sayma ve olasılık', count: 3, ids: ['10-permutasyon', '10-kombinasyon', '12-hazirlik-kosullu', '10-olasilik-zar', '12-hazirlik-kombinasyon']},
      {label: 'Diziler', count: 3, ids: ['11-aritmetik', '11-geometrik', '12-hazirlik-aritmetik-terim', '12-hazirlik-geometrik-toplam']},
      {label: 'Analitik geometri ve matris', count: 2, ids: ['12-analitik', '12-hazirlik-dogru-egim', '12-hazirlik-cember-merkez', '12-determinant', '12-hazirlik-karmasik']},
    ],
  },
};

// Bir deneme oluşturur: her grubun sorusu kendi konularından, konular karıştırılarak seçilir.
export function buildDeneme(kind, rng = Math.random) {
  const deneme = DENEMELER[kind];
  if (!deneme) throw new Error('Bilinmeyen deneme');
  const random = rndFrom(rng);
  const questions = [];
  for (const group of deneme.groups) {
    const order = [...group.ids];
    for (let i = order.length - 1; i > 0; i--) {
      const j = random(0, i);
      [order[i], order[j]] = [order[j], order[i]];
    }
    for (let i = 0; i < group.count; i++) {
      const id = order[i % order.length];
      const question = generateQuestion(id, rng);
      const {options, correctIndex} = choicesFor(question, rng);
      questions.push({topicId: id, topicName: group.label, question, options, correctIndex});
    }
  }
  return {grade: 12, questions, title: deneme.title, minutes: deneme.minutes};
}
