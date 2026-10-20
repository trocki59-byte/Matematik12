import test from 'node:test';
import assert from 'node:assert/strict';
import {topics,generateQuestion,additionSteps,subtractionSteps} from '../docs/js/curriculum.js';

test('all existing topics produce valid questions within the advertised ranges',()=>{
  assert.equal(topics.length,14);
  for(const topic of topics) for(let i=0;i<1000;i++) {
    const q=generateQuestion(topic.id);
    assert.ok(Number.isSafeInteger(q.answer));
    assert.ok(q.steps.length);
    const match=q.text.match(/^(\d+) ([+−×÷]) (\d+) =/);
    if(!match) continue;
    const [,as,op,bs]=match,a=Number(as),b=Number(bs);
    assert.equal(q.answer,op==='+'?a+b:op==='−'?a-b:op==='×'?a*b:a/b);
    if(op==='−') assert.ok(a>=b);
    if(topic.id==='1-top-20') assert.ok(a+b<=20);
    if(topic.id==='1-cik-20') assert.ok(a<=20);
    if(topic.id==='2-top-100') assert.ok(a+b<=100&&a>=10&&b>=10);
    if(topic.id==='2-cik-100') assert.ok(a<=99&&b>=1);
    if(topic.id==='2-carpma-25') assert.ok([2,5].includes(a)&&b>=2&&b<=10);
    if(topic.id==='3-top-1000') assert.ok(a>=100&&a<=499&&b>=100&&b<=499);
    if(topic.id==='3-cik-1000') assert.ok(a>=100&&a<=999&&b>=10);
    if(topic.id==='3-carpma-10') assert.ok(a>=2&&a<=10&&b>=2&&b<=10);
    if(topic.id==='3-bolme') assert.ok(b>=2&&b<=10&&q.answer>=2&&q.answer<=10);
    if(topic.id==='4-carpma-2x1') assert.ok(a>=10&&a<=99&&b>=2&&b<=9);
    if(topic.id==='4-bolme-2d') assert.ok(a>=10&&a<=99&&b>=2&&b<=9&&a%b===0);
  }
});
test('random boundaries still produce two-digit dividends',()=>{
  assert.equal(generateQuestion('4-bolme-2d',()=>0).text,'10 ÷ 2 = ?');
  assert.equal(generateQuestion('4-bolme-2d',()=>0.999999).text,'99 ÷ 9 = ?');
  assert.throws(()=>generateQuestion('missing'));
});
test('place-value solutions explain carries and chained borrowing',()=>{
  assert.deepEqual(subtractionSteps(100,99),[
    'Yüzlerden 1 ödünç alınır; onlar 10 olur.',
    'Onlardan 1 ödünç alınır; birler 10 olur.',
    'Birler: 10 − 9 = 1','Onlar: 9 − 9 = 0','Yüzler: 0 − 0 = 0','Sonuç: 1']);
  assert.ok(subtractionSteps(302,178).includes('Onlar: 9 − 7 = 2'));
  assert.ok(subtractionSteps(20,19).includes('Sonuç: 1'));
  assert.ok(additionSteps(199,299).includes('Onlar: 9 + 9 + 1 (elde) = 19 → 9 yazılır, 1 elde edilir'));
  assert.ok(additionSteps(199,299).includes('Sonuç: 498'));
});
