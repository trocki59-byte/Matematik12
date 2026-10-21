import test from 'node:test';
import assert from 'node:assert/strict';
import {buildDeneme, DENEMELER, DENEME_LENGTH} from '../docs/js/deneme.js';
import {topics} from '../docs/js/curriculum.js';

function seeded(seed) {
  let s = seed;
  return () => { s = (s * 1103515245 + 12345) % 2147483648; return s / 2147483648; };
}

test('both denemes have 40 questions and every topic id exists', () => {
  const ids = new Set(topics.map(t => t.id));
  for (const kind of Object.keys(DENEMELER)) {
    const d = DENEMELER[kind];
    assert.equal(d.groups.reduce((a, g) => a + g.count, 0), DENEME_LENGTH, kind);
    for (const g of d.groups) for (const id of g.ids) assert.ok(ids.has(id), `${kind}: missing ${id}`);
  }
});

test('deneme builds 40 five-choice questions following group counts', () => {
  for (const kind of Object.keys(DENEMELER)) {
    const exam = buildDeneme(kind, seeded(11));
    assert.equal(exam.questions.length, DENEME_LENGTH);
    assert.ok(exam.questions.every(q => q.options.length === 5 && q.options[q.correctIndex] === q.question.answerText));
    const counts = {};
    for (const q of exam.questions) counts[q.topicName] = (counts[q.topicName] || 0) + 1;
    for (const g of DENEMELER[kind].groups) assert.equal(counts[g.label], g.count, `${kind} ${g.label}`);
  }
});

test('each deneme build changes the questions', () => {
  const a = buildDeneme('tyt', seeded(1)).questions.map(q => q.question.text).join('|');
  const b = buildDeneme('tyt', seeded(77)).questions.map(q => q.question.text).join('|');
  assert.notEqual(a, b);
});
