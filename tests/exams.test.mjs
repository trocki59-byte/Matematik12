import test from 'node:test';
import assert from 'node:assert/strict';
import {buildExam, gradeExam, EXAM_LENGTH, examTopicsFor} from '../docs/js/exams.js';
import {createProgressStore} from '../docs/js/progress.js';
import {topics} from '../docs/js/curriculum.js';

function seeded(seed) {
  let s = seed;
  return () => { s = (s * 1103515245 + 12345) % 2147483648; return s / 2147483648; };
}

test('every grade 1-12 can build a 10-question exam with its own topics', () => {
  for (let grade = 1; grade <= 12; grade++) {
    const exam = buildExam(grade, seeded(grade + 1));
    assert.equal(exam.questions.length, EXAM_LENGTH);
    const own = new Set(examTopicsFor(grade).map(t => t.id));
    for (const item of exam.questions) assert.ok(own.has(item.topicId), `grade ${grade} question from other grade`);
  }
});

test('exam covers distinct topics when the grade has enough of them', () => {
  const exam = buildExam(5, seeded(7));
  const used = new Set(exam.questions.map(q => q.topicId));
  assert.ok(used.size >= Math.min(EXAM_LENGTH, examTopicsFor(5).length) - 0);
});

test('a new exam gets new questions', () => {
  const a = buildExam(9, seeded(1)).questions.map(q => q.question.text).join('|');
  const b = buildExam(9, seeded(99)).questions.map(q => q.question.text).join('|');
  assert.notEqual(a, b);
});

test('grading counts correct answers and reports empty and invalid ones', () => {
  const exam = {questions: [
    {topicId: 'x', topicName: 'x', question: {text: 'a', answer: 4, answerText: '4', steps: []}},
    {topicId: 'x', topicName: 'x', question: {text: 'b', answer: 2, answerText: '2', steps: []}},
    {topicId: 'x', topicName: 'x', question: {text: 'c', answer: 7, answerText: '7', steps: []}},
  ]};
  const r = gradeExam(exam, ['4', '', 'abc']);
  assert.equal(r.score, 1);
  assert.equal(r.total, 3);
  assert.deepEqual(r.results.map(x => x.status), ['correct', 'empty', 'invalid']);
});

test('unsimplified fraction is not counted in an exam', () => {
  const exam = {questions: [
    {topicId: 'x', topicName: 'x', question: {text: 'f', answer: 0.5, answerText: '1/2', steps: [], mustSimplify: true}},
  ]};
  assert.equal(gradeExam(exam, ['2/4']).results[0].status, 'simplify');
  assert.equal(gradeExam(exam, ['1/2']).score, 1);
});

function memoryStorage() {
  const data = new Map();
  return {getItem: k => (data.has(k) ? data.get(k) : null), setItem: (k, v) => data.set(k, String(v))};
}

test('exam results are saved and reloaded per grade', () => {
  const storage = memoryStorage();
  const store = createProgressStore(storage);
  store.recordExam(5, 8, 10, '2026-10-21T10:00:00.000Z');
  store.recordExam(6, 3, 10, '2026-10-21T11:00:00.000Z');
  store.recordExam(5, 10, 10, '2026-10-22T10:00:00.000Z');
  const again = createProgressStore(storage);
  const grade5 = again.examsFor(5);
  assert.equal(grade5.length, 2);
  assert.equal(grade5[0].score, 10);
  assert.equal(again.examsFor(6)[0].score, 3);
});

test('invalid exam results are not saved', () => {
  const store = createProgressStore(memoryStorage());
  assert.equal(store.recordExam(5, 11, 10), null);
  assert.equal(store.examsFor(5).length, 0);
});

test('topic practice records still work next to exam history', () => {
  const storage = memoryStorage();
  const store = createProgressStore(storage);
  const id = topics[0].id;
  store.record(id, true);
  store.recordExam(1, 5, 10);
  const reloaded = createProgressStore(storage);
  assert.equal(reloaded.get(id).correct, 1);
  assert.equal(reloaded.examsFor(1).length, 1);
});
