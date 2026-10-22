import {test} from 'node:test';
import assert from 'node:assert/strict';
import {topics, generateQuestion, lessonFor} from '../docs/js/curriculum.js';
import {buildExam, choicesFor} from '../docs/js/exams.js';

const small = topics.filter(t => t.grade <= 4);

test('1–4. sınıfların her konusunda konu anlatımı var', () => {
  for (const t of small) {
    const lesson = lessonFor(t.id);
    assert.ok(lesson.intro && lesson.intro.length > 10, t.id);
    assert.ok(lesson.sections.length >= 1, t.id);
    assert.ok(lesson.sections[0].paras.length >= 1, t.id);
  }
});

test('1–4. sınıf konu kimlikleri benzersiz', () => {
  const ids = small.map(t => t.id);
  assert.equal(new Set(ids).size, ids.length);
});

test('1–4. sınıf her konu soru üretir ve cevabı seçenek üretilebilecek biçimde', () => {
  let seed = 7;
  const rng = () => { seed = (seed * 16807) % 2147483647; return seed / 2147483647; };
  for (const t of small) {
    for (let i = 0; i < 60; i++) {
      const q = generateQuestion(t.id, rng);
      assert.ok(q.text && q.answer !== undefined, t.id);
      if (t.kind !== 'text') assert.match(String(q.answerText), /\d/, `${t.id} cevabında sayı yok: ${q.answerText}`);
      const {options, correctIndex} = choicesFor(q, rng);
      assert.equal(options.length, 5, t.id);
      assert.equal(new Set(options).size, 5, t.id);
      assert.equal(options[correctIndex], q.answerText, t.id);
    }
  }
});

test('1–4. sınıf için sınav oluşturulabilir', () => {
  for (const grade of [1, 2, 3, 4]) {
    const exam = buildExam(grade, Math.random);
    assert.equal(exam.questions.length, 10, `sınıf ${grade}`);
  }
});
