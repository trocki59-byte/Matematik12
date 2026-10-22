import {test} from 'node:test';
import assert from 'node:assert/strict';
import {TYT_2026} from '../docs/js/bank/tyt-2026.js';

test('2026 TYT bölüm soru sayıları doğru', () => {
  const count = key => TYT_2026.sections.find(s => s.key === key).questions.length;
  assert.equal(count('matematik'), 40);
  assert.equal(count('turkce'), 40);
  assert.equal(count('sosyal'), 20);
  assert.equal(count('fen'), 20);
  assert.equal(count('tam'), 120);
});

test('her soru beş şıklı ve doğru cevap geçerli bir şık', () => {
  for (const section of TYT_2026.sections) {
    for (const q of section.questions) {
      assert.equal(q.options.length, 5, `${section.key}: ${q.text.slice(0, 40)}`);
      assert.ok(q.correctIndex >= 0 && q.correctIndex <= 4);
      assert.equal(new Set(q.options).size, 5, 'şıklar birbirinden farklı olmalı');
      assert.ok(q.explanation && q.explanation.length > 0, 'çözüm açıklaması olmalı');
    }
  }
});

test('tam deneme bölümlerin birleşimidir', () => {
  const parts = ['matematik', 'turkce', 'sosyal', 'fen'].flatMap(key => TYT_2026.sections.find(s => s.key === key).questions);
  const full = TYT_2026.sections.find(s => s.key === 'tam').questions;
  assert.equal(full.length, parts.length);
  assert.deepEqual(full.map(q => q.text), parts.map(q => q.text));
});
