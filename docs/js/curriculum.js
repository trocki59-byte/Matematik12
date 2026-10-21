import {rndFrom} from './steps.js';
import grades14 from './topics/grades-1-4.js';
import grade5 from './topics/grade-5.js';
import grade6 from './topics/grade-6.js';
import grade7 from './topics/grade-7.js';
import grade8 from './topics/grade-8.js';

export {addSteps as additionSteps, subtractionSteps} from './steps.js';

// Her konu: id, sınıf (1–8), ünite, ad, sembol, kısa açıklama,
// konu anlatımı (lesson) ve soru üreticisi (gen).
const ALL = [...grades14, ...grade5, ...grade6, ...grade7, ...grade8];
const BY_ID = new Map(ALL.map(t => [t.id, t]));

export const topics = ALL.map(({id, grade, unit, name, symbol, summary}) => ({id, grade, unit, name, symbol, summary}));

export function lessonFor(topicId) {
  const topic = BY_ID.get(topicId);
  if (!topic) throw new Error('Bilinmeyen konu');
  return topic.lesson;
}

// Soru üretir. rng 0 ile 1 arasında bir sayı döndüren fonksiyondur (test için verilebilir).
export function generateQuestion(topicId, rng = Math.random) {
  const topic = BY_ID.get(topicId);
  if (!topic) throw new Error('Bilinmeyen konu');
  const q = topic.gen(rndFrom(rng));
  return {
    text: q.text,
    answer: q.answer,
    answerText: q.answerText ?? String(q.answer),
    steps: q.steps,
    mustSimplify: Boolean(q.mustSimplify),
  };
}
