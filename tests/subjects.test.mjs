import test from 'node:test';
import assert from 'node:assert/strict';
import {buildSubjectTest, SUBJECTS} from '../docs/js/subjects.js';

function seeded(seed) {
  let s = seed;
  return () => { s = (s * 1103515245 + 12345) % 2147483648; return s / 2147483648; };
}

test('every subject builds 10 five-choice questions with a valid correct option', () => {
  for (const {key} of SUBJECTS) {
    const exam = buildSubjectTest(key, seeded(3), 10);
    assert.equal(exam.questions.length, 10, key);
    for (const q of exam.questions) {
      assert.equal(q.options.length, 5, key);
      assert.equal(new Set(q.options).size, 5, `${key} duplicate options: ${q.options}`);
      assert.equal(q.options[q.correctIndex], q.question.answerText, `${key} correct mismatch`);
    }
  }
});

test('karma test has exactly 40 questions across all subjects', () => {
  const exam = buildSubjectTest('karma', seeded(9));
  assert.equal(exam.questions.length, 40);
  const topicNames = new Set(exam.questions.map(q => q.topicName));
  assert.ok(topicNames.size >= 15, 'karma should cover many topic labels');
});

test('subject tests change between builds', () => {
  for (const {key} of SUBJECTS) {
    const a = buildSubjectTest(key, seeded(1), 10).questions.map(q => q.question.text + q.options.join()).join('|');
    const b = buildSubjectTest(key, seeded(50), 10).questions.map(q => q.question.text + q.options.join()).join('|');
    assert.notEqual(a, b, key);
  }
});

test('LGS denemesi has 90 questions in the official subject split', async () => {
  const {buildLgs} = await import('../docs/js/subjects.js');
  const exam = buildLgs(seeded(4));
  assert.equal(exam.questions.length, 90);
  const counts = {};
  for (const q of exam.questions) counts[q.topicName] = (counts[q.topicName] || 0) + 1;
  assert.deepEqual(counts, {'Matematik': 20, 'Türkçe': 20, 'Fen Bilimleri': 20, 'T.C. İnkılap Tarihi': 10, 'Din Kültürü': 10, 'İngilizce': 10});
  for (const q of exam.questions) {
    assert.equal(q.options.length, 5);
    assert.equal(new Set(q.options).size, 5, `duplicate options: ${q.options}`);
    assert.equal(q.options[q.correctIndex], q.question.answerText);
  }
});
