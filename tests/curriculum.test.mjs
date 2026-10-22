import test from 'node:test';
import assert from 'node:assert/strict';
import {topics,generateQuestion,lessonFor,additionSteps,subtractionSteps} from '../docs/js/curriculum.js';
import {parseAnswer,isSameAnswer} from '../docs/js/answers.js';

const grades14=topics.filter(t=>t.grade<=4);
const numeric=topics.filter(t=>t.kind!=='text');

test('every grade from 1 to 8 has topics, units and a lesson',()=>{
  assert.equal(grades14.length,79);
  for(const grade of [1,2,3,4,5,6,7,8,9,10,11,12]) {
    const list=topics.filter(t=>t.grade===grade);
    assert.ok(list.length>=(grade<=4?2:6),`grade ${grade} has only ${list.length} topics`);
    for(const topic of list) {
      assert.ok(topic.unit && topic.name && topic.summary && topic.symbol,`${topic.id} metadata`);
      const lesson=lessonFor(topic.id);
      assert.ok(lesson.intro.length>20,`${topic.id} intro`);
      assert.ok(lesson.sections.length>=1,`${topic.id} sections`);
      for(const section of lesson.sections) {
        assert.ok(section.title && section.paras.length>=1,`${topic.id} section`);
        for(const ex of section.examples||[]) {
          assert.ok(ex.problem && ex.steps.length>=1 && ex.answer,`${topic.id} example`);
        }
      }
    }
  }
});

test('topic ids are unique',()=>{
  assert.equal(new Set(topics.map(t=>t.id)).size,topics.length);
});

test('every generated question has a parseable answer that matches its numeric value',()=>{
  for(const topic of numeric) for(let i=0;i<300;i++) {
    const q=generateQuestion(topic.id);
    assert.ok(q.steps.length>0,`${topic.id} steps`);
    assert.ok(Number.isFinite(q.answer),`${topic.id} answer`);
    const parsed=parseAnswer(q.answerText);
    assert.ok(parsed.ok,`${topic.id} answerText "${q.answerText}" not parseable`);
    assert.ok(isSameAnswer(parsed.value,q.answer),`${topic.id} answerText "${q.answerText}" != ${q.answer}`);
  }
});

test('all 1–4 topics produce valid whole-number questions within the advertised ranges',()=>{
  for(const topic of grades14.filter(t=>t.kind!=='text')) for(let i=0;i<1000;i++) {
    const q=generateQuestion(topic.id);
    assert.ok(Number.isSafeInteger(q.answer));
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

test('grade 5 place value, fractions and simplification are correct',()=>{
  for(let i=0;i<300;i++) {
    const s=generateQuestion('5-sadelestirme');
    const [,n,d]=s.text.match(/^(\d+)\/(\d+)/);
    assert.equal(s.answer,Number(n)/Number(d));
    assert.equal(s.mustSimplify,true);
    assert.equal(s.answerText.split('/').length,2);
  }
  assert.equal(generateQuestion('5-basamak',()=>0).answer,1);
});

test('grade 8 median uses the middle value of seven sorted numbers',()=>{
  for(let i=0;i<200;i++) {
    const q=generateQuestion('8-medyan');
    const nums=q.text.match(/Verilen sayılar: ([\d, ]+)\./)[1].split(', ').map(Number);
    const sorted=[...nums].sort((a,b)=>a-b);
    assert.equal(nums.length,7);
    assert.equal(q.answer,sorted[3]);
  }
});

test('every grade 8 topic has an extra worked-example section with three examples',()=>{
  for(const topic of topics.filter(t=>t.grade===8)) {
    const lesson=lessonFor(topic.id);
    const extra=lesson.sections.find(s=>s.title==='Daha fazla örnek');
    assert.ok(extra,`${topic.id} missing extra examples`);
    assert.equal(extra.examples.length,3,`${topic.id} needs 3 extra examples`);
    for(const ex of extra.examples) assert.ok(ex.steps.length>=2&&ex.answer,`${topic.id} example incomplete`);
  }
});
