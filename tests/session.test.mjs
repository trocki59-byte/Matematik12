import test from 'node:test';
import assert from 'node:assert/strict';
import {createSession} from '../docs/js/session.js';
import {createProgressStore} from '../docs/js/progress.js';

test('invalid answers do not count; equivalent answers count once',()=>{
  const p=createProgressStore(null),s=createSession('a',p,()=>({text:'2 + 2 = ?',answer:4,answerText:'4',steps:['4']}));
  for(const input of ['', ' ', 'abc','1e2','9007199254740992']) assert.equal(s.submit(input).status,'invalid');
  assert.deepEqual(p.get('a'),{correct:0,total:0});
  assert.equal(s.submit(' 004 ').status,'correct');
  assert.equal(s.submit('4').status,'already-answered');
  assert.deepEqual(p.get('a'),{correct:1,total:1});
  s.next();assert.equal(s.submit('+4').status,'correct');
  s.next();assert.equal(s.submit('5').status,'incorrect');
  assert.deepEqual(p.get('a'),{correct:2,total:3});
});

test('decimal and fraction answers are scored by value',()=>{
  const p=createProgressStore(null);
  const s=createSession('a',p,()=>({text:'x',answer:0.75,answerText:'3/4',mustSimplify:true,steps:['3/4']}));
  assert.equal(s.submit('0,75').status,'correct');
  assert.deepEqual(p.get('a'),{correct:1,total:1});
});

test('fractions that are not simplified are asked to be reduced and are not counted',()=>{
  const p=createProgressStore(null);
  const s=createSession('a',p,()=>({text:'x',answer:0.5,answerText:'1/2',mustSimplify:true,steps:['1/2']}));
  assert.equal(s.submit('2/4').status,'simplify');
  assert.deepEqual(p.get('a'),{correct:0,total:0});
  assert.equal(s.submit('1/2').status,'correct');
});
