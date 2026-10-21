import {topics, generateQuestion} from './curriculum.js';
import {parseAnswer, isSameAnswer, isSimplest} from './answers.js';
import {rndFrom} from './steps.js';

export const EXAM_LENGTH = 10;

// Bir sınıfın sınav için kullanılabilecek konuları.
export function examTopicsFor(grade) {
  return topics.filter(t => t.grade === grade);
}

// Sınav oluşturur: sınıfın konularından sırayla soru seçer, soruları her seferinde yeniden üretir.
// Konular karıştırılır ve sorular konular arasında dönüşümlü dağıtılır.
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
    questions.push({topicId: topic.id, topicName: topic.name, question: generateQuestion(topic.id, rng)});
  }
  return {grade, questions};
}

// Verilen cevapları puanlar. answers[i], questions[i] için metin cevaptır.
// Sadeleşmemiş kesirler yanlış sayılır ve sonuçta belirtilir.
export function gradeExam(exam, answers) {
  const results = exam.questions.map((item, i) => {
    const text = answers[i] ?? '';
    const parsed = parseAnswer(text);
    const q = item.question;
    if (!text.trim()) return {...item, given: '', status: 'empty', correct: false};
    if (!parsed.ok) return {...item, given: text, status: 'invalid', correct: false};
    if (q.mustSimplify && parsed.fraction && !isSimplest(parsed.fraction)) {
      return {...item, given: text, status: 'simplify', correct: false};
    }
    const correct = isSameAnswer(parsed.value, q.answer);
    return {...item, given: text, status: correct ? 'correct' : 'incorrect', correct};
  });
  const score = results.filter(r => r.correct).length;
  return {score, total: exam.questions.length, results};
}
