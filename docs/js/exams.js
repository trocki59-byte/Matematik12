import {topics, generateQuestion} from './curriculum.js';
import {rndFrom} from './steps.js';

export const EXAM_LENGTH = 10;
export const CHOICE_COUNT = 5;
export const LETTERS = ['A', 'B', 'C', 'D', 'E'];

// Bir sınıfın sınav için kullanılabilecek konuları.
export function examTopicsFor(grade) {
  return topics.filter(t => t.grade === grade);
}

// Doğru cevaba benzeyen ama yanlış olan seçenekler üretir. Cevaptaki sayılar biraz değiştirilir.
export function distractorsFor(answerText, rng) {
  const random = rndFrom(rng);
  const correct = String(answerText);
  const found = new Set([correct]);
  const numbers = [...correct.matchAll(/\d+(?:,\d+)?/g)];
  if (numbers.length === 0) return [];
  for (let attempt = 0; attempt < 400 && found.size < CHOICE_COUNT; attempt++) {
    const scale = attempt < 200 ? 3 : 15;
    const m = numbers[random(0, numbers.length - 1)];
    const token = m[0];
    const value = Number(token.replace(',', '.'));
    let delta = random(1, scale) * (random(0, 1) ? 1 : -1);
    let next = value + delta;
    if (next < 0) next = value + Math.abs(delta);
    if (next === value) continue;
    const text = String(next).replace('.', ',');
    const candidate = correct.slice(0, m.index) + text + correct.slice(m.index + token.length);
    found.add(candidate);
  }
  return [...found].slice(1);
}

// Her soru için 5 seçenek (1 doğru, 4 yanlış) hazırlar ve karıştırır.
export function choicesFor(question, rng) {
  const random = rndFrom(rng);
  const wrong = distractorsFor(question.answerText, rng);
  if (wrong.length < CHOICE_COUNT - 1) throw new Error('Yeterli seçenek üretilemedi');
  const options = [question.answerText, ...wrong.slice(0, CHOICE_COUNT - 1)];
  for (let i = options.length - 1; i > 0; i--) {
    const j = random(0, i);
    [options[i], options[j]] = [options[j], options[i]];
  }
  return {options, correctIndex: options.indexOf(question.answerText)};
}

// Sınav oluşturur: konular karıştırılır, sorular konular arasında dönüşümlü seçilir.
// Her soru her seferinde yeniden üretilir ve 5 seçenekli olur.
export function buildExam(grade, rng = Math.random, count = EXAM_LENGTH) {
  const random = rndFrom(rng);
  const pool = examTopicsFor(grade);
  if (pool.length === 0) throw new Error('Bu sınıf için konu yok');
  const order = [...pool];
  for (let i = order.length - 1; i > 0; i--) {
    const j = random(0, i);
    [order[i], order[j]] = [order[j], order[i]];
  }
  const questions = [];
  for (let i = 0; i < count; i++) {
    const topic = order[i % order.length];
    const question = generateQuestion(topic.id, rng);
    const {options, correctIndex} = choicesFor(question, rng);
    questions.push({topicId: topic.id, topicName: topic.name, question, options, correctIndex});
  }
  return {grade, questions};
}

// picks[i] seçilen seçeneğin dizinidir (0–4) ya da boş (null/undefined).
export function gradeExam(exam, picks) {
  const results = exam.questions.map((item, i) => {
    const pick = picks[i];
    const answered = Number.isInteger(pick) && pick >= 0 && pick < item.options.length;
    if (!answered) return {...item, pick: null, status: 'empty', correct: false};
    const correct = pick === item.correctIndex;
    return {...item, pick, status: correct ? 'correct' : 'incorrect', correct};
  });
  const score = results.filter(r => r.correct).length;
  return {score, total: exam.questions.length, results};
}
