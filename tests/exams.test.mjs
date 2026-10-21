import test from 'node:test';
import assert from 'node:assert/strict';
import {buildExam, gradeExam, choicesFor, EXAM_LENGTH, CHOICE_COUNT, examTopicsFor} from '../docs/js/exams.js';
import {generateQuestion} from '../docs/js/curriculum.js';
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

test('every topic yields five distinct choices including the correct answer', () => {
  for (const topic of topics) {
    for (let seed = 1; seed <= 25; seed++) {
      const rng = seeded(seed * 97 + topic.id.length);
      const q = generateQuestion(topic.id, rng);
      const {options, correctIndex} = choicesFor(q, rng);
      assert.equal(options.length, CHOICE_COUNT, `${topic.id} seed ${seed}`);
      assert.equal(new Set(options).size, CHOICE_COUNT, `${topic.id} duplicate options: ${options}`);
      assert.equal(options[correctIndex], q.answerText, `${topic.id} correct index wrong`);
    }
  }
});

test('grading counts picked correct options and reports empty ones', () => {
  const exam = {questions: [
    {options: ['a', 'b', 'c', 'd', 'e'], correctIndex: 2},
    {options: ['a', 'b', 'c', 'd', 'e'], correctIndex: 0},
    {options: ['a', 'b', 'c', 'd', 'e'], correctIndex: 4},
  ]};
  const r = gradeExam(exam, [2, null, 1]);
  assert.equal(r.score, 1);
  assert.equal(r.total, 3);
  assert.deepEqual(r.results.map(x => x.status), ['correct', 'empty', 'incorrect']);
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

test('university prep has at least 18 topics, each with a lesson', async () => {
  const {topics: all, lessonFor} = await import('../docs/js/curriculum.js');
  const prep = all.filter(t => t.unit === 'Üniversiteye hazırlık');
  assert.ok(prep.length >= 18, `only ${prep.length} prep topics`);
  for (const t of prep) {
    assert.equal(t.grade, 12, t.id);
    assert.ok(lessonFor(t.id).sections.every(s => s.examples.length >= 2), `${t.id} needs examples`);
  }
});

test('a topic-only test draws every question from that topic', async () => {
  const {topics: all} = await import('../docs/js/curriculum.js');
  const one = all.find(t => t.id === '12-hazirlik-kombinasyon');
  const exam = buildExam(12, seeded(5), EXAM_LENGTH, [one]);
  assert.equal(exam.questions.length, EXAM_LENGTH);
  assert.ok(exam.questions.every(q => q.topicId === one.id));
});
