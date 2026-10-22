import {rndFrom} from './steps.js';
import grades14 from './topics/grades-1-4.js';
import grades14More from './topics/grades-1-4-more.js';
import grade5 from './topics/grade-5.js';
import grade6 from './topics/grade-6.js';
import grade7 from './topics/grade-7.js';
import grade8 from './topics/grade-8.js';
import grade9 from './topics/grade-9.js';
import grade10 from './topics/grade-10.js';
import grade11 from './topics/grade-11.js';
import grade12 from './topics/grade-12.js';
import grade12Prep from './topics/grade-12-prep.js';
import grade12PrepMore from './topics/grade-12-prep-more.js';
import {extraSections} from './topics/grade-8-extra.js';

export {addSteps as additionSteps, subtractionSteps} from './steps.js';

// Her konu: id, sınıf (1–12), ünite, ad, sembol, kısa açıklama,
// konu anlatımı (lesson) ve soru üreticisi (gen).
const ALL = [...grades14, ...grades14More, ...grade5, ...grade6, ...grade7, ...grade8, ...grade9, ...grade10, ...grade11, ...grade12, ...grade12Prep, ...grade12PrepMore];

// Ek örnekler: konu anlatımının sonuna eklenir.
for (const topic of ALL) {
  const extra = extraSections[topic.id];
  if (extra) topic.lesson = {...topic.lesson, sections: [...topic.lesson.sections, extra]};
}
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
