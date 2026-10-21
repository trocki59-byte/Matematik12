import {topics, lessonFor, generateQuestion} from './curriculum.js';
import {createProgressStore} from './progress.js';
import {createSession} from './session.js';
import {EXAM_LENGTH, buildExam, gradeExam, examTopicsFor} from './exams.js';

// ---------- Yardımcılar ----------

const app = document.getElementById('app');
const warning = document.getElementById('storage-warning');
const GRADES = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const GRADE_COLORS = {1: '#f0644f', 2: '#f29a1f', 3: '#22a88a', 4: '#2e8fe0', 5: '#7c6cf0', 6: '#e0559b', 7: '#14a9bd', 8: '#5a67d8', 9: '#e8703a', 10: '#16a34a', 11: '#0ea5e9', 12: '#a855f7'};

let storage;
try { storage = window.localStorage; } catch { storage = null; }
const store = createProgressStore(storage);

let session = null, sessionTopic = null, questionNo = 1;

// Güvenli DOM oluşturma: tüm metinler textContent ile yazılır.
function h(tag, props = {}, ...children) {
  const node = document.createElement(tag);
  for (const [key, value] of Object.entries(props)) {
    if (value === undefined || value === null || value === false) continue;
    if (key === 'class') node.className = value;
    else if (key === 'text') node.textContent = value;
    else if (key === 'style') {
      for (const [prop, val] of Object.entries(value)) {
        if (prop.startsWith('--')) node.style.setProperty(prop, val);
        else node.style[prop] = val;
      }
    }
    else if (key.startsWith('on')) node.addEventListener(key.slice(2), value);
    else node.setAttribute(key, value === true ? '' : String(value));
  }
  for (const child of children.flat()) {
    if (child === undefined || child === null || child === false) continue;
    node.append(child instanceof Node ? child : document.createTextNode(String(child)));
  }
  return node;
}

function summary() {
  let total = 0, correct = 0;
  for (const topic of topics) {
    const s = store.get(topic.id);
    total += s.total;
    correct += s.correct;
  }
  return {total, correct, rate: total ? Math.round((100 * correct) / total) : null};
}

function rateOf(topicId) {
  const s = store.get(topicId);
  return {total: s.total, correct: s.correct, rate: s.total ? Math.round((100 * s.correct) / s.total) : 0};
}

function setPage(title, focusTarget) {
  document.title = `${title} · Matematik 12`;
  warning.hidden = store.isPersistent();
  if (focusTarget) {
    focusTarget.setAttribute('tabindex', '-1');
    focusTarget.focus({preventScroll: false});
  }
}

// ---------- Ana sayfa: sınıf seçimi ve üniteler ----------

function topicCard(topic) {
  const r = rateOf(topic.id);
  const color = GRADE_COLORS[topic.grade];
  return h('a', {class: 'topic-card', href: `#/konu/${topic.id}`, style: {'--accent': color}},
    h('span', {class: 'topic-symbol', 'aria-hidden': 'true', text: topic.symbol}),
    h('h3', {text: topic.name}),
    h('p', {class: 'topic-summary', text: topic.summary}),
    h('div', {class: 'progress', role: 'img', 'aria-label': r.total ? `%${r.rate} başarı` : 'Henüz başlanmadı'},
      h('span', {style: {width: `${r.total ? r.rate : 0}%`}})),
    h('div', {class: 'topic-foot'},
      h('span', {text: r.total ? `${r.total} soru · %${r.rate} başarı` : 'Konu anlatımıyla başla'}),
      h('span', {class: 'arrow', 'aria-hidden': 'true', text: '→'})));
}

function renderHome(grade) {
  const gradeTopics = topics.filter(t => t.grade === grade);
  const units = [];
  for (const topic of gradeTopics) {
    let unit = units.find(u => u.name === topic.unit);
    if (!unit) units.push(unit = {name: topic.unit, topics: []});
    unit.topics.push(topic);
  }
  const s = summary();
  const title = h('h1', {id: 'page-title', text: `${grade}. Sınıf matematik`});

  app.replaceChildren(
    h('section', {class: 'hero'},
      h('div', {class: 'hero-copy'},
        h('p', {class: 'eyebrow', text: '1. – 12. SINIF · KONU ANLATIMI VE ALIŞTIRMA'}),
        h('h2', {text: 'Anlayarak öğren, sonra pekiştir.'}),
        h('p', {class: 'lead', text: 'Her konuda kısa anlatımı oku, adım adım çözülmüş örnekleri incele, ardından sorularla kendini sına.'}),
        h('dl', {class: 'stats'},
          h('div', {}, h('dt', {text: 'Çözülen soru'}), h('dd', {text: String(s.total)})),
          h('div', {}, h('dt', {text: 'Doğru cevap'}), h('dd', {text: String(s.correct)})),
          h('div', {}, h('dt', {text: 'Başarı'}), h('dd', {text: s.rate === null ? '—' : `%${s.rate}`})))),
      h('div', {class: 'hero-art', 'aria-hidden': 'true'},
        h('span', {class: 't1', text: '+'}), h('span', {class: 't2', text: '×'}),
        h('span', {class: 't3', text: '÷'}), h('span', {class: 't4', text: '='}))),
    h('nav', {class: 'grades', 'aria-label': 'Sınıf seçimi'},
      GRADES.map(n => h('a', {
        class: 'grade-chip', href: `#/sinif/${n}`, style: {'--accent': GRADE_COLORS[n]},
        'aria-current': n === grade ? 'page' : undefined,
      }, `${n}. sınıf`))),
    h('div', {class: 'grade-head'}, title,
      h('p', {text: `${gradeTopics.length} konu · ${units.length} ünite`})),
    examBanner(grade),
    ...units.map(unit => h('section', {class: 'unit', 'aria-labelledby': `unit-${grade}-${units.indexOf(unit)}`},
      h('h2', {id: `unit-${grade}-${units.indexOf(unit)}`, text: unit.name}),
      h('div', {class: 'cards'}, unit.topics.map(topicCard)))),
    h('p', {class: 'footnote', text: 'Hata yapmak öğrenmenin parçasıdır. Her yanlış cevabın yanında çözüm adımları var.'}));

  setPage(`${grade}. Sınıf`, title);
}

// ---------- Konu sayfası: anlatım ve alıştırma ----------

function renderLesson(topic) {
  const lesson = lessonFor(topic.id);
  const article = h('article', {class: 'lesson'}, h('p', {class: 'lesson-intro', text: lesson.intro}));
  lesson.sections.forEach(section => {
    const block = h('section', {class: 'lesson-section'}, h('h2', {text: section.title}));
    section.paras.forEach(p => block.append(h('p', {text: p})));
    if (section.formula) block.append(h('div', {class: 'formula', text: section.formula}));
    (section.examples || []).forEach((ex, i) => block.append(
      h('div', {class: 'example'},
        h('p', {class: 'example-title', text: `Örnek ${i + 1}`}),
        h('p', {class: 'example-problem', text: ex.problem}),
        h('ol', {class: 'example-steps'}, ex.steps.map(step => h('li', {text: step}))),
        h('p', {class: 'example-answer'}, 'Cevap: ', h('strong', {text: ex.answer})))));
    if (section.tip) block.append(h('aside', {class: 'tip'}, h('strong', {text: '✦ İpucu: '}), section.tip));
    article.append(block);
  });
  article.append(h('a', {class: 'primary-link', href: `#/konu/${topic.id}/alistirma`, text: 'Bu konuda alıştırma yap →'}));
  return article;
}

function renderPractice(topic) {
  if (!session || sessionTopic !== topic.id) {
    session = createSession(topic.id, store);
    sessionTopic = topic.id;
    questionNo = 1;
  }
  const question = session.current();
  const r = rateOf(topic.id);

  const input = h('input', {id: 'answer', type: 'text', inputmode: 'decimal', autocomplete: 'off', placeholder: 'Cevabını yaz', 'aria-describedby': 'answer-error'});
  const error = h('p', {id: 'answer-error', class: 'input-error', role: 'alert'});
  const check = h('button', {class: 'primary-button', type: 'submit', text: 'Cevabımı kontrol et'});
  const feedback = h('div', {class: 'feedback', role: 'status', hidden: true});
  const next = h('button', {class: 'primary-button', type: 'button', hidden: true, text: 'Sonraki soru →'});
  const form = h('form', {class: 'answer-form', novalidate: true}, h('label', {for: 'answer', text: 'Sence cevap kaç?'}), input, error, check);

  let answered = false;
  form.addEventListener('submit', e => {
    e.preventDefault();
    if (answered) return;
    const result = session.submit(input.value);
    if (result.status === 'invalid') {
      error.textContent = 'Bir sayı yaz. Örneğin: 12, −3, 2,5 ya da 3/4';
      input.setAttribute('aria-invalid', 'true');
      input.focus();
      return;
    }
    if (result.status === 'simplify') {
      error.textContent = 'Kesri en sade hâline getirmeyi dene.';
      input.setAttribute('aria-invalid', 'true');
      input.focus();
      return;
    }
    answered = true;
    input.disabled = true;
    input.removeAttribute('aria-invalid');
    error.textContent = '';
    check.hidden = true;
    const correct = result.status === 'correct';
    feedback.className = `feedback ${correct ? 'correct' : 'incorrect'}`;
    feedback.hidden = false;
    feedback.replaceChildren(
      h('strong', {text: correct ? '✓ Harika, doğru cevap!' : `Birlikte bakalım. Doğru cevap: ${question.answerText}`}),
      h('p', {class: 'steps-title', text: 'Çözüm adımları'}),
      h('ol', {}, question.steps.map(step => h('li', {text: step}))));
    next.hidden = false;
    const s = store.get(topic.id);
    stats.replaceChildren(...statChips(s));
    next.focus();
  });

  // Sonraki soruda yalnızca alıştırma paneli değişir; sayfa yukarı kaydırılmaz.
  next.addEventListener('click', () => {
    session.next();
    questionNo++;
    const fresh = renderPractice(topic);
    panel.replaceWith(fresh);
    fresh.querySelector('#answer').focus({preventScroll: true});
  });

  const stats = h('div', {class: 'chips'}, statChips(store.get(topic.id)));
  const panel = h('section', {class: 'practice'},
    h('div', {class: 'practice-head'},
      h('p', {class: 'eyebrow', text: `ALIŞTIRMA · SORU ${questionNo}`}),
      stats),
    h('p', {class: 'question', text: question.text}),
    form,
    feedback,
    next,
    h('p', {class: 'practice-foot', text: `Başarı: ${r.total ? `%${r.rate}` : 'henüz yok'} · İlerlemen bu tarayıcıda saklanır.`}));
  return panel;
}

function statChips(s) {
  return [
    h('span', {class: 'chip'}, h('strong', {text: String(s.correct)}), ' doğru'),
    h('span', {class: 'chip'}, h('strong', {text: String(s.total)}), ' toplam'),
    h('span', {class: 'chip'}, h('strong', {text: s.total ? `%${Math.round((100 * s.correct) / s.total)}` : '—'}), ' başarı'),
  ];
}

function renderTopic(topic, tab) {
  const isPractice = tab === 'alistirma';
  const title = h('h1', {id: 'page-title', text: topic.name});
  const tabs = h('nav', {class: 'tabs', 'aria-label': 'Konu bölümleri'},
    h('a', {href: `#/konu/${topic.id}`, 'aria-current': isPractice ? undefined : 'page', text: 'Konu anlatımı'}),
    h('a', {href: `#/konu/${topic.id}/alistirma`, 'aria-current': isPractice ? 'page' : undefined, text: 'Alıştırma'}));

  app.replaceChildren(
    h('a', {class: 'back', href: `#/sinif/${topic.grade}`, text: `← ${topic.grade}. sınıf konuları`}),
    h('header', {class: 'topic-head', style: {'--accent': GRADE_COLORS[topic.grade]}},
      h('p', {class: 'eyebrow', text: `${topic.grade}. SINIF · ${topic.unit.toLocaleUpperCase('tr')}`}),
      title,
      h('p', {class: 'lead', text: topic.summary})),
    tabs,
    isPractice ? renderPractice(topic) : renderLesson(topic));

  setPage(topic.name, title);
}


// ---------- Sınavlar ----------

let examState = null;

function examBanner(grade) {
  const past = store.examsFor(grade);
  const best = past.length ? Math.max(...past.map(e => Math.round((100 * e.score) / e.total))) : null;
  return h('a', {class: 'exam-banner', href: `#/sinav/${grade}`, style: {'--accent': GRADE_COLORS[grade]}},
    h('span', {class: 'exam-banner-icon', 'aria-hidden': 'true', text: '✎'}),
    h('span', {class: 'exam-banner-text'},
      h('strong', {text: `${grade}. sınıf sınavı`}),
      h('span', {text: past.length ? `${past.length} sınav · en iyi %${best}` : `${EXAM_LENGTH} soruluk sınav · her seferinde yeni sorular`})),
    h('span', {class: 'arrow', 'aria-hidden': 'true', text: '→'}));
}

function formatDate(iso) {
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? '' : d.toLocaleString('tr-TR', {day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit'});
}

function renderExamIntro(grade) {
  const past = store.examsFor(grade);
  const title = h('h1', {id: 'page-title', text: `${grade}. sınıf sınavı`});
  const history = past.length
    ? h('ol', {class: 'exam-history', 'aria-label': 'Önceki sınavlar'}, past.slice(0, 10).map(e =>
        h('li', {},
          h('strong', {text: `%${Math.round((100 * e.score) / e.total)}`}),
          h('span', {text: ` · ${e.score}/${e.total} doğru`}),
          h('time', {datetime: e.date, text: ` · ${formatDate(e.date)}`}))))
    : h('p', {class: 'muted', text: 'Henüz sınav çözmedin. İlk sınavını başlat!'});

  app.replaceChildren(
    h('nav', {class: 'breadcrumb'}, h('a', {href: `#/sinif/${grade}`, text: `← ${grade}. sınıf konuları`})),
    h('header', {class: 'grade-head'}, title,
      h('p', {text: `${EXAM_LENGTH} soru · ${examTopicsFor(grade).length} konudan karışık · her sınavda sorular değişir`})),
    h('section', {class: 'exam-card'},
      h('p', {text: 'Cevaplarını bitirdiğinde puanın kaydedilir. Sınav bitince her sorunun doğru çözümünü görebilirsin.'}),
      h('a', {class: 'primary-link', href: `#/sinav/${grade}/basla`, text: 'Sınava başla →'})),
    h('section', {class: 'exam-card'},
      h('h2', {text: 'Sınav geçmişi'}), history));
  setPage(`${grade}. Sınıf sınavı`, title);
}

function renderExamStart(grade) {
  examState = {grade, exam: buildExam(grade)};
  renderExamForm();
}

function renderExamForm() {
  const {grade, exam} = examState;
  const title = h('h1', {id: 'page-title', text: `${grade}. sınıf sınavı`});
  const inputs = [];
  const error = h('p', {class: 'input-error', role: 'alert'});

  const list = h('ol', {class: 'exam-list'}, exam.questions.map((item, i) => {
    const input = h('input', {type: 'text', inputmode: 'decimal', autocomplete: 'off', placeholder: 'Cevap', 'aria-label': `${i + 1}. soru cevabı`});
    inputs.push(input);
    return h('li', {class: 'exam-item'},
      h('p', {class: 'exam-topic', text: item.topicName}),
      h('p', {class: 'exam-question', text: item.question.text}),
      input);
  }));

  const form = h('form', {class: 'exam-form', novalidate: true},
    list, error,
    h('div', {class: 'exam-actions'},
      h('button', {class: 'primary-button', type: 'submit', text: 'Sınavı bitir'}),
      h('a', {class: 'ghost-link', href: `#/sinav/${grade}`, text: 'Vazgeç'})));

  form.addEventListener('submit', e => {
    e.preventDefault();
    const answers = inputs.map(input => input.value);
    const result = gradeExam(exam, answers);
    const entry = store.recordExam(grade, result.score, result.total);
    examState = {...examState, result, saved: Boolean(entry)};
    renderExamResult();
  });

  app.replaceChildren(
    h('nav', {class: 'breadcrumb'}, h('a', {href: `#/sinav/${grade}`, text: `← ${grade}. sınıf sınavı`})),
    h('header', {class: 'grade-head'}, title,
      h('p', {text: 'Cevaplarını yaz. Kesirleri en sade hâline getirerek yaz (örneğin 1/2).'})),
    form);
  setPage(`${grade}. Sınıf sınavı`, title);
}

const STATUS_TEXT = {
  empty: 'Boş bırakıldı',
  invalid: 'Geçersiz cevap',
  simplify: 'Kesir sadeleştirilmemiş',
  incorrect: 'Yanlış',
  correct: 'Doğru',
};

function renderExamResult() {
  const {grade, exam, result, saved} = examState;
  const pct = Math.round((100 * result.score) / result.total);
  const title = h('h1', {id: 'page-title', text: `Sınav sonucu: ${result.score}/${result.total}`});

  const items = result.results.map((r, i) => h('li', {class: `exam-result ${r.correct ? 'correct' : 'incorrect'}`},
    h('p', {class: 'exam-topic', text: `${i + 1}. soru · ${r.topicName}`}),
    h('p', {class: 'exam-question', text: r.question.text}),
    h('p', {class: 'exam-verdict'},
      h('strong', {text: r.correct ? '✓ Doğru' : `✗ ${STATUS_TEXT[r.status]}`}),
      r.given ? h('span', {text: ` · Senin cevabın: ${r.given}`}) : null),
    r.correct ? null : h('div', {class: 'feedback incorrect'},
      h('strong', {text: `Doğru cevap: ${r.question.answerText}`}),
      h('ol', {}, r.question.steps.map(step => h('li', {text: step}))))));

  const retry = h('button', {class: 'primary-button', type: 'button', text: 'Yeni sınav çöz'});
  retry.addEventListener('click', () => renderExamStart(grade));

  app.replaceChildren(
    h('nav', {class: 'breadcrumb'}, h('a', {href: `#/sinav/${grade}`, text: `← ${grade}. sınıf sınavı`})),
    h('header', {class: 'grade-head'}, title,
      h('p', {text: `Başarı: %${pct}${saved ? ' · Puanın kaydedildi.' : ''}`})),
    h('ol', {class: 'exam-list'}, items),
    h('div', {class: 'exam-actions'}, retry,
      h('a', {class: 'ghost-link', href: `#/sinav/${grade}`, text: 'Sınav geçmişine dön'})));
  setPage(`Sınav sonucu ${result.score}/${result.total}`, title);
}

// ---------- Yönlendirme ----------

function route() {
  const parts = location.hash.replace(/^#\/?/, '').split('/').filter(Boolean);
  if (parts[0] === 'konu' && parts[1]) {
    const topic = topics.find(t => t.id === parts[1]);
    if (topic) {
      renderTopic(topic, parts[2] === 'alistirma' ? 'alistirma' : 'anlatim');
      return;
    }
  }
  if (parts[0] === 'sinav' && GRADES.includes(Number(parts[1]))) {
    const examGrade = Number(parts[1]);
    if (parts[2] === 'basla') renderExamStart(examGrade);
    else renderExamIntro(examGrade);
    return;
  }
  const grade = parts[0] === 'sinif' ? Number(parts[1]) : 1;
  renderHome(GRADES.includes(grade) ? grade : 1);
}

window.addEventListener('hashchange', route);
route();
if ('serviceWorker' in navigator) navigator.serviceWorker.register('./sw.js').catch(() => {});
