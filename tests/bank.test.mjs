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

import {AYT_2026} from '../docs/js/bank/ayt-2026.js';
import {TYT_2025} from '../docs/js/bank/tyt-2025.js';

test('AYT 2026 ve TYT 2025 matematik bölümleri beş şıklı ve 40 soru', () => {
  for (const bank of [AYT_2026, TYT_2025]) {
    const section = bank.sections[0];
    assert.equal(section.questions.length, 40);
    for (const q of section.questions) {
      assert.equal(q.options.length, 5);
      assert.ok(q.correctIndex >= 0 && q.correctIndex <= 4);
      assert.equal(new Set(q.options).size, 5);
    }
  }
});

import {TYT_2025 as TYT_2025_ALL} from '../docs/js/bank/tyt-2025.js';
import {TYT_2024} from '../docs/js/bank/tyt-2024.js';

test('2025 TYT bölümleri ve tam deneme doğru', () => {
  const count = key => TYT_2025_ALL.sections.find(s => s.key === key).questions.length;
  assert.equal(count('matematik'), 40);
  assert.equal(count('turkce'), 40);
  assert.equal(count('sosyal'), 20);
  assert.equal(count('fen'), 20);
  assert.equal(count('tam'), 120);
});

test('2024 TYT matematik bölümü beş şıklı ve 40 soru', () => {
  const section = TYT_2024.sections[0];
  assert.equal(section.questions.length, 40);
  for (const q of section.questions) {
    assert.equal(q.options.length, 5);
    assert.equal(new Set(q.options).size, 5);
  }
});

import {TYT_2024 as TYT_2024_ALL} from '../docs/js/bank/tyt-2024.js';

test('2024 TYT bölümleri ve tam deneme doğru', () => {
  const count = key => TYT_2024_ALL.sections.find(s => s.key === key).questions.length;
  assert.equal(count('matematik'), 40);
  assert.equal(count('turkce'), 40);
  assert.equal(count('sosyal'), 20);
  assert.equal(count('fen'), 20);
  assert.equal(count('tam'), 120);
});

import {AYT_2025} from '../docs/js/bank/ayt-2025.js';
import {AYT_2024} from '../docs/js/bank/ayt-2024.js';

test('2024 ve 2025 AYT matematik bölümleri 40 soru ve beş şıklı', () => {
  for (const bank of [AYT_2024, AYT_2025]) {
    const section = bank.sections[0];
    assert.equal(section.questions.length, 40);
    for (const q of section.questions) {
      assert.equal(q.options.length, 5);
      assert.equal(new Set(q.options).size, 5);
    }
  }
});


test('2026 AYT tüm dersleri var ve soru sayıları doğru', () => {
  const count = key => AYT_2026.sections.find(s => s.key === key).questions.length;
  assert.equal(count('matematik'), 40);
  for (const key of ['fizik', 'kimya', 'biyoloji', 'edebiyat', 'tarih', 'cografya', 'felsefe', 'din']) {
    assert.equal(count(key), 10, key);
  }
});

import {AYT_2025 as AYT_2025_ALL} from '../docs/js/bank/ayt-2025.js';

test('2025 AYT: matematik 40, diğer dersler 10 soru ve beş şık', () => {
  const sec = key => AYT_2025_ALL.sections.find(s => s.key === key);
  assert.equal(sec('matematik').questions.length, 40);
  for (const key of ['fizik', 'kimya', 'biyoloji', 'edebiyat', 'tarih', 'cografya', 'felsefe', 'din']) {
    const qs = sec(key).questions;
    assert.equal(qs.length, 10, key);
    for (const q of qs) {
      assert.equal(q.options.length, 5, key);
      assert.equal(new Set(q.options).size, 5, key);
    }
  }
});

import {TYT_2027} from '../docs/js/bank/tyt-2027.js';
import {YDT_2027} from '../docs/js/bank/ydt-2027.js';

test('2027 TYT bölüm sayıları ve tam deneme birleşimi', () => {
  const count = key => TYT_2027.sections.find(s => s.key === key).questions.length;
  assert.equal(count('matematik'), 40);
  assert.equal(count('turkce'), 40);
  assert.equal(count('sosyal'), 20);
  assert.equal(count('fen'), 20);
  assert.equal(count('tam'), 120);
  const parts = ['matematik', 'turkce', 'sosyal', 'fen'].flatMap(k => TYT_2027.sections.find(s => s.key === k).questions);
  assert.deepEqual(TYT_2027.sections.find(s => s.key === 'tam').questions.map(q => q.text), parts.map(q => q.text));
});

test('2027 YDT İngilizce 80 soru ve beş şık', () => {
  const qs = YDT_2027.sections[0].questions;
  assert.equal(qs.length, 80);
  for (const q of qs) {
    assert.equal(q.options.length, 5);
    assert.equal(new Set(q.options).size, 5);
    assert.ok(q.correctIndex >= 0 && q.correctIndex <= 4);
  }
});

import {AYT_2024 as AYT_2024_ALL} from '../docs/js/bank/ayt-2024.js';

test('2024 AYT: matematik 40, diğer dersler 10 soru ve beş şık', () => {
  const sec = key => AYT_2024_ALL.sections.find(s => s.key === key);
  assert.equal(sec('matematik').questions.length, 40);
  for (const key of ['fizik', 'kimya', 'biyoloji', 'edebiyat', 'tarih', 'cografya', 'felsefe', 'din']) {
    const qs = sec(key).questions;
    assert.equal(qs.length, 10, key);
    for (const q of qs) {
      assert.equal(q.options.length, 5, key);
      assert.equal(new Set(q.options).size, 5, key);
    }
  }
});
