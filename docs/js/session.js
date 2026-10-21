import {generateQuestion} from './curriculum.js';
import {parseAnswer, isSameAnswer, isSimplest} from './answers.js';

// Bir konunun alıştırma oturumu. Her soru en fazla bir kez puanlanır.
export function createSession(topicId, store, generator = generateQuestion) {
  let question = generator(topicId), answered = false;
  return {
    current() { return question; },
    next() {
      question = generator(topicId);
      answered = false;
      return question;
    },
    submit(text) {
      if (answered) return {status: 'already-answered', question};
      const parsed = parseAnswer(text);
      if (!parsed.ok) return {status: 'invalid', question};
      // Kesir sorularında en sade hâl istenir; sadeleşmemiş cevap puanlanmaz.
      if (question.mustSimplify && parsed.fraction && !isSimplest(parsed.fraction)) {
        return {status: 'simplify', question};
      }
      const correct = isSameAnswer(parsed.value, question.answer);
      answered = true;
      store.record(topicId, correct);
      return {status: correct ? 'correct' : 'incorrect', question};
    }
  };
}
