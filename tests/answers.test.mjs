import test from 'node:test';
import assert from 'node:assert/strict';
import {parseAnswer, isSameAnswer} from '../docs/js/answers.js';

test('whole numbers, decimals with comma or dot, negatives and fractions are understood',()=>{
  assert.equal(parseAnswer('12').value,12);
  assert.equal(parseAnswer(' 004 ').value,4);
  assert.equal(parseAnswer('2,5').value,2.5);
  assert.equal(parseAnswer('2.5').value,2.5);
  assert.equal(parseAnswer('−3').value,-3);
  assert.equal(parseAnswer('-3').value,-3);
  assert.equal(parseAnswer('3/4').value,0.75);
  assert.deepEqual(parseAnswer('-3/4').fraction,{num:-3,den:4});
  assert.equal(parseAnswer('2 1/2').value,2.5);
  assert.equal(parseAnswer('1.000').value,1000);
});

test('empty, malformed, division-by-zero and oversized input is rejected',()=>{
  for(const input of ['','   ','abc','1e2','1/0','3/','//','1,2,3','9007199254740992','2 / ']) {
    assert.equal(parseAnswer(input).ok,false,`accepted ${JSON.stringify(input)}`);
  }
});

test('equality uses a small tolerance for decimal results',()=>{
  assert.ok(isSameAnswer(0.1+0.2,0.3));
  assert.ok(!isSameAnswer(0.3,0.31));
});
