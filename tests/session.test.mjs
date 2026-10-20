import test from 'node:test';
import assert from 'node:assert/strict';
import {createSession} from '../docs/js/session.js';
import {createProgressStore} from '../docs/js/progress.js';
test('invalid answers do not count; equivalent integers do and cannot count twice',()=>{
  const p=createProgressStore(null),s=createSession('a',p,()=>({text:'2 + 2 = ?',answer:4,steps:['4']}));
  for(const input of ['', ' ', 'abc','1e2','1,5','4.0','9007199254740992']) assert.equal(s.submit(input).status,'invalid');
  assert.deepEqual(p.get('a'),{correct:0,total:0});
  assert.equal(s.submit(' 004 ').status,'correct');
  assert.equal(s.submit('4').status,'already-answered');
  assert.deepEqual(p.get('a'),{correct:1,total:1});
  s.next();assert.equal(s.submit('+4').status,'correct');
  s.next();assert.equal(s.submit('5').status,'incorrect');
  assert.deepEqual(p.get('a'),{correct:2,total:3});
});
