import test from 'node:test';
import assert from 'node:assert/strict';
import {createProgressStore} from '../docs/js/progress.js';
const storage=()=>{const m=new Map();return {getItem:k=>m.get(k)??null,setItem:(k,v)=>m.set(k,v)}};
test('progress survives reload and records correct and incorrect answers',()=>{
  const s=storage(),p=createProgressStore(s);p.record('a',true);p.record('a',false);
  assert.deepEqual(createProgressStore(s).get('a'),{correct:1,total:2});
});
test('broken, negative and inconsistent records cannot corrupt progress',()=>{
  for(const value of ['{','null',JSON.stringify({version:2,topics:{}}),...[-1,3,1.5].map(n=>JSON.stringify({version:1,topics:{a:{correct:n,total:2}}}))]){
    const s=storage();s.setItem('matematik12.progress.v1',value);
    assert.deepEqual(createProgressStore(s).get('a'),{correct:0,total:0});
  }
});
test('read and write failures retain usable in-memory progress',()=>{
  for(const s of [null,{getItem(){throw Error()},setItem(){throw Error()}},{getItem(){return null},setItem(){throw Error()}}]){
    const p=createProgressStore(s);p.record('a',true);
    assert.deepEqual(p.get('a'),{correct:1,total:1});assert.equal(p.isPersistent(),false);
  }
});
test('legacy web progress is migrated without losing extra topics',()=>{
  const s=storage();s.setItem('mat14_stats',JSON.stringify({'2-para':{d:4,t:6}}));
  assert.deepEqual(createProgressStore(s).get('2-para'),{correct:4,total:6});
});
