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
