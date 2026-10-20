import {topics} from './curriculum.js';
import {createProgressStore} from './progress.js';
import {createSession} from './session.js';
const $=id=>document.getElementById(id);
let storage;try{storage=window.localStorage;}catch{storage=null;}
const store=createProgressStore(storage);
let grade='1. Sınıf',session=null,activeTopic=null,answered=false,questionNumber=1;
const symbols={top:'+',cik:'−',carpma:'×',bolme:'÷',sekil:'△',para:'₺',saat:'◷'};
const palette=[['#edf3ff','#4774d7'],['#fff2e4','#b67d32'],['#edf7f3','#388775'],['#f2eeff','#8266bd']];
function element(tag,cls,text){const el=document.createElement(tag);if(cls)el.className=cls;if(text!==undefined)el.textContent=text;return el;}
function updateWarning(){$('storage-warning').hidden=store.isPersistent();}
function renderDashboard(){
  let total=0,correct=0;for(const topic of topics){const s=store.get(topic.id);total+=s.total;correct+=s.correct;}
  $('summary-total').textContent=total;$('summary-correct').textContent=correct;$('summary-rate').textContent=total?`${Math.round(100*correct/total)}%`:'—';
  $('grade-tabs').replaceChildren();
  for(let n=1;n<=4;n++){const label=`${n}. Sınıf`,button=element('button','grade-tab',label);button.setAttribute('aria-pressed',String(grade===label));button.onclick=()=>{grade=label;renderDashboard();};$('grade-tabs').append(button);}
  const filtered=topics.filter(t=>t.grade===grade);$('topic-count').textContent=`${filtered.length} keşfedilecek konu`;$('topics').replaceChildren();
  filtered.forEach((topic,i)=>{const state=store.get(topic.id),rate=state.total?Math.round(100*state.correct/state.total):0;const card=element('button','topic-card'),top=element('div','topic-card-top'),symbol=element('span','topic-symbol',symbols[topic.id.split('-')[1]]||'+');symbol.style.background=palette[i%4][0];symbol.style.color=palette[i%4][1];symbol.setAttribute('aria-hidden','true');top.append(symbol,element('span','topic-index',`KONU ${String(i+1).padStart(2,'0')}`));const parts=topic.name.match(/^([^(:]+)(?::\s*|\s*\()(.*?)(?:\))?$/);const title=parts?parts[1].trim():topic.name,description=parts?parts[2]:'Birlikte pratik yapalım';const track=element('div','progress-track'),fill=element('div','progress-fill');fill.style.width=`${rate}%`;track.append(fill);const bottom=element('div','topic-bottom');bottom.append(element('span','',state.total?`${state.total} soru · %${rate} başarı`:'Keşfetmeye başla'),element('span','topic-arrow','→'));card.append(top,element('h3','',title),element('p','topic-description',description),track,bottom);card.onclick=()=>openTopic(topic);$('topics').append(card);});updateWarning();
}
function renderStats(){const s=store.get(activeTopic.id);$('quiz-stats').replaceChildren();for(const [value,label] of [[s.correct,'Doğru'],[s.total,'Toplam'],[s.total?`${Math.round(s.correct*100/s.total)}%`:'—','Başarı']]){const el=element('div');el.append(element('strong','',String(value)),document.createTextNode(label));$('quiz-stats').append(el);}updateWarning();}
function renderQuestion(){answered=false;$('question').textContent=session.current().text;$('question-number').textContent=`Soru ${questionNumber}`;$('answer').value='';$('answer').disabled=false;$('answer').removeAttribute('aria-invalid');$('input-error').textContent='';$('check-button').hidden=false;$('feedback').hidden=true;$('feedback').replaceChildren();$('next-button').hidden=true;renderStats();$('answer').focus();}
function openTopic(topic){activeTopic=topic;session=createSession(topic.id,store);questionNumber=1;$('dashboard').hidden=true;$('quiz').hidden=false;$('quiz-grade').textContent=topic.grade;$('quiz-title').textContent=topic.name;renderQuestion();window.scrollTo({top:0,behavior:'instant'});}
function goHome(){session=null;activeTopic=null;$('dashboard').hidden=false;$('quiz').hidden=true;renderDashboard();$('topics-heading').setAttribute('tabindex','-1');$('topics-heading').focus();}
$('answer-form').onsubmit=e=>{e.preventDefault();if(!session||answered)return;const result=session.submit($('answer').value);if(result.status==='invalid'){$('input-error').textContent='Lütfen bir tam sayı yaz. Örneğin: 12';$('answer').setAttribute('aria-invalid','true');$('answer').focus();return;}answered=true;$('input-error').textContent='';$('answer').removeAttribute('aria-invalid');$('answer').disabled=true;$('check-button').hidden=true;const correct=result.status==='correct';$('feedback').className=`feedback ${correct?'correct':'incorrect'}`;$('feedback').hidden=false;$('feedback').append(element('strong','',correct?'✓ Harika, doğru cevap!':`Birlikte bakalım. Doğru cevap: ${result.question.answer}`));const steps=element('ol');for(const step of result.question.steps)steps.append(element('li','',step));$('feedback').append(steps);$('next-button').hidden=false;renderStats();$('next-button').focus();};
$('next-button').onclick=()=>{if(session){session.next();questionNumber++;renderQuestion();}};
$('back-button').onclick=goHome;$('home-link').onclick=goHome;
$('start-button').onclick=()=>{$('topics-heading').scrollIntoView({behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth',block:'start'});$('grade-tabs').querySelector('[aria-pressed=true]').focus({preventScroll:true});};
renderDashboard();
if('serviceWorker' in navigator)navigator.serviceWorker.register('./sw.js').catch(()=>{});
