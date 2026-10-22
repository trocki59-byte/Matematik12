import {topics, lessonFor, generateQuestion} from './curriculum.js';
import {createProgressStore} from './progress.js';
import {createSession} from './session.js';
import {EXAM_LENGTH, LETTERS, buildExam, gradeExam, examTopicsFor} from './exams.js';
import {createAuthStore, PIN_PATTERN} from './auth.js';
import {buildDeneme, DENEMELER} from './deneme.js';
import {buildSubjectTest, buildLgs, LGS_MINUTES, SUBJECTS} from './subjects.js';
import {VERSION} from './version.js';
import {TYT_2026} from './bank/tyt-2026.js';
import {AYT_2026} from './bank/ayt-2026.js';
import {TYT_2025} from './bank/tyt-2025.js';
import {TYT_2024} from './bank/tyt-2024.js';
import {AYT_2025} from './bank/ayt-2025.js';
import {AYT_2024} from './bank/ayt-2024.js';
import {TYT_2027} from './bank/tyt-2027.js';
import {YDT_2027} from './bank/ydt-2027.js';
import {TYT_2023} from './bank/tyt-2023.js';
import {AYT_2027} from './bank/ayt-2027.js';

// ---------- Yardımcılar ----------

const app = document.getElementById('app');
const warning = document.getElementById('storage-warning');
const GRADES = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const GRADE_COLORS = {1: '#f0644f', 2: '#f29a1f', 3: '#22a88a', 4: '#2e8fe0', 5: '#7c6cf0', 6: '#e0559b', 7: '#14a9bd', 8: '#5a67d8', 9: '#e8703a', 10: '#16a34a', 11: '#0ea5e9', 12: '#a855f7'};

let storage;
try { storage = window.localStorage; } catch { storage = null; }
const store = createProgressStore(storage);
const auth = createAuthStore(storage);
const userSlot = document.getElementById('user-slot');

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
    grade === 12 ? prepBanner() : null,
    grade === 8 ? lgsBanner() : null,
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
          h('time', {datetime: e.date, text: ` · ${formatDate(e.date)}`}), e.label ? h('span', {text: ` · ${e.label}`}) : null)))
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

function renderExamStart(grade, options = {}) {
  const exam = options.builder ? options.builder() : buildExam(grade, Math.random, EXAM_LENGTH, options.pool ?? null);
  examState = {grade, options, exam};
  renderExamForm();
}

function renderExamForm() {
  const {grade, exam} = examState;
  const title_ = examState.options.title ?? `${grade}. sınıf sınavı`;
  const back = examState.options.backHref ?? `#/sinav/${grade}`;
  const title = h('h1', {id: 'page-title', text: title_});
  const error = h('p', {class: 'input-error', role: 'alert'});
  const groupName = i => `exam-q-${i}`;

  const list = h('ol', {class: 'exam-list'}, exam.questions.map((item, i) =>
    h('li', {class: 'exam-item'},
      h('fieldset', {class: 'exam-fieldset'},
        h('legend', {class: 'exam-legend'},
          h('span', {class: 'exam-topic', text: `${i + 1}. soru · ${item.topicName}`})),
        h('p', {class: 'exam-question', text: item.question.text}),
        h('div', {class: 'choices', role: 'radiogroup', 'aria-label': `${i + 1}. soru seçenekleri`},
          item.options.map((opt, k) => h('label', {class: 'choice'},
            h('input', {type: 'radio', name: groupName(i), value: String(k)}),
            h('span', {class: 'choice-letter', 'aria-hidden': 'true', text: LETTERS[k]}),
            h('span', {class: 'choice-text', text: opt}))))))));

  const form = h('form', {class: 'exam-form', novalidate: true},
    list, error,
    h('div', {class: 'exam-actions'},
      h('button', {class: 'primary-button', type: 'submit', text: 'Sınavı bitir'}),
      h('a', {class: 'ghost-link', href: back, text: 'Vazgeç'})));

  // Süre sınırı varsa kalan süreyi gösterir; süre bitince sınav otomatik bitirilir.
  let timerId = null;
  const clock = examState.options.minutes ? h('p', {class: 'exam-clock', 'aria-live': 'off'}) : null;
  if (clock) {
    const end = Date.now() + examState.options.minutes * 60000;
    const updateClock = () => {
      const left = Math.max(0, end - Date.now());
      const m = Math.floor(left / 60000), sec = Math.floor((left % 60000) / 1000);
      clock.textContent = `Kalan süre ${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
      if (left === 0) { clearInterval(timerId); form.requestSubmit(); }
    };
    timerId = setInterval(() => {
      // Sayfadan ayrılındıysa sayacı durdur.
      if (!form.isConnected) { clearInterval(timerId); return; }
      updateClock();
    }, 1000);
    updateClock();
  }

  form.addEventListener('submit', e => {
    e.preventDefault();
    clearInterval(timerId);
    const picks = exam.questions.map((_, i) => {
      const checked = form.querySelector(`input[name="${groupName(i)}"]:checked`);
      return checked ? Number(checked.value) : null;
    });
    const result = gradeExam(exam, picks);
    const entry = store.recordExam(grade, result.score, result.total, undefined, examState.options.label);
    examState = {...examState, result, saved: Boolean(entry)};
    renderExamResult();
  });

  app.replaceChildren(
    h('nav', {class: 'breadcrumb'}, h('a', {href: back, text: `← ${title_}`})),
    h('header', {class: 'grade-head'}, title,
      h('p', {text: 'Her soru için beş seçenekten birini seç. Bitirince sonucunu ve doğru cevapları görebilirsin.'}),
      clock),
    form);
  setPage(title_, title);
}

function renderExamResult() {
  const {grade, result, saved} = examState;
  const back = examState.options.backHref ?? `#/sinav/${grade}`;
  const title_ = examState.options.title ?? `${grade}. sınıf sınavı`;
  const pct = Math.round((100 * result.score) / result.total);
  const title = h('h1', {id: 'page-title', text: `Sınav sonucu: ${result.score}/${result.total}`});

  const items = result.results.map((r, i) => {
    const verdict = r.correct
      ? h('strong', {text: '✓ Doğru'})
      : h('strong', {text: r.status === 'empty' ? '– Boş bırakıldı' : '✗ Yanlış'});
    return h('li', {class: `exam-result ${r.correct ? 'correct' : 'incorrect'}`},
      h('p', {class: 'exam-topic', text: `${i + 1}. soru · ${r.topicName}`}),
      h('p', {class: 'exam-question', text: r.question.text}),
      h('div', {class: 'choices review'},
        r.options.map((opt, k) => h('div', {
          class: `choice ${k === r.correctIndex ? 'is-correct' : ''} ${r.pick === k && k !== r.correctIndex ? 'is-wrong' : ''}`,
        },
          h('span', {class: 'choice-letter', 'aria-hidden': 'true', text: LETTERS[k]}),
          h('span', {class: 'choice-text', text: opt}),
          k === r.correctIndex ? h('span', {class: 'choice-mark', text: 'Doğru'}) : null,
          r.pick === k && k !== r.correctIndex ? h('span', {class: 'choice-mark', text: 'Senin'}) : null))),
      h('p', {class: 'exam-verdict'}, verdict),
      r.correct ? null : h('div', {class: 'feedback incorrect'},
        h('p', {class: 'steps-title', text: 'Çözüm adımları'}),
        h('ol', {}, r.question.steps.map(step => h('li', {text: step})))));
  });

  const retry = h('button', {class: 'primary-button', type: 'button', text: 'Yeni sınav çöz'});
  retry.addEventListener('click', () => renderExamStart(grade, examState.options));

  app.replaceChildren(
    h('nav', {class: 'breadcrumb'}, h('a', {href: back, text: `← ${title_}`})),
    h('header', {class: 'grade-head'}, title,
      h('p', {text: `Başarı: %${pct}${saved ? ' · Puanın kaydedildi.' : ''}`})),
    h('ol', {class: 'exam-list'}, items),
    h('div', {class: 'exam-actions'}, retry,
      h('a', {class: 'ghost-link', href: back, text: 'Geri dön'})));
  setPage(`Sınav sonucu ${result.score}/${result.total}`, title);
}

// ---------- Giriş ve öğrenci hesabı ----------

function renderUserSlot() {
  const user = auth.current();
  userSlot.replaceChildren();
  if (!user) return;
  userSlot.append(
    h('span', {class: 'user-chip'},
      h('span', {class: 'user-avatar', 'aria-hidden': 'true', text: user.name.charAt(0).toLocaleUpperCase('tr-TR')}),
      h('span', {text: `${user.name} · ${user.grade}. sınıf`})),
    h('button', {class: 'ghost-button', type: 'button', text: 'Çıkış', onclick: () => {
      auth.logout();
      location.hash = '#/giris';
      route();
    }}));
}

function renderAuth(mode = 'login') {
  const isSignup = mode === 'signup';
  const title = h('h1', {id: 'page-title', class: 'auth-title', tabindex: '-1', text: 'Hoş geldin'});
  const error = h('p', {class: 'input-error', role: 'alert'});
  const nameInput = h('input', {id: 'auth-name', type: 'text', autocomplete: 'name', maxlength: 40, required: true, placeholder: 'Adın soyadın'});
  const pinInput = h('input', {id: 'auth-pin', type: 'password', inputmode: 'numeric', autocomplete: isSignup ? 'new-password' : 'current-password', maxlength: 4, pattern: '[0-9]{4}', required: true, placeholder: '4 rakam'});
  const gradeSelect = h('select', {id: 'auth-grade', 'aria-label': 'Sınıf'},
    GRADES.map(n => h('option', {value: String(n), text: `${n}. sınıf`})));

  const submit = h('button', {class: 'primary-button auth-submit', type: 'submit', text: isSignup ? 'Hesap oluştur ve başla' : 'Giriş yap'});
  const form = h('form', {class: 'auth-form', novalidate: true},
    h('label', {for: 'auth-name', text: 'Ad soyad'}), nameInput,
    isSignup ? h('label', {for: 'auth-grade', text: 'Sınıf'}) : null,
    isSignup ? gradeSelect : null,
    h('label', {for: 'auth-pin', text: 'Şifre (4 rakam)'}), pinInput,
    error, submit);

  form.addEventListener('submit', async e => {
    e.preventDefault();
    error.textContent = '';
    const name = nameInput.value;
    const pin = pinInput.value;
    if (!PIN_PATTERN.test(pin)) { error.textContent = 'Şifre 4 rakamdan oluşmalı.'; pinInput.focus(); return; }
    submit.disabled = true;
    try {
      const user = isSignup
        ? await auth.signup({name, grade: Number(gradeSelect.value), pin})
        : await auth.login({name, pin});
      renderUserSlot();
      location.hash = `#/sinif/${user.grade}`;
      route();
    } catch (err) {
      error.textContent = err.message;
      submit.disabled = false;
    }
  });

  const tab = (id, label, active) => h('a', {
    class: `auth-tab${active ? ' active' : ''}`, href: id === 'login' ? '#/giris' : '#/kayit',
    role: 'tab', 'aria-selected': String(active), text: label,
  });

  app.replaceChildren(
    h('section', {class: 'auth', 'aria-labelledby': 'page-title'},
      h('div', {class: 'auth-card'},
        h('div', {class: 'auth-brand'},
          h('span', {class: 'brand-mark', 'aria-hidden': 'true', text: '∑'}),
          h('p', {class: 'auth-studio', text: 'TROÇKİ STUDİO'}),
          h('p', {class: 'auth-sub', text: 'Matematik Öğreniyorum'})),
        h('div', {class: 'auth-tabs', role: 'tablist'}, tab('login', 'Giriş yap', !isSignup), tab('signup', 'Yeni hesap', isSignup)),
        title,
        h('p', {class: 'auth-lead', text: isSignup ? 'Bilgilerini gir, sınıfını seç ve öğrenmeye başla.' : 'Kayıtlı adınla ve şifrenle devam et.'}),
        form,
        h('p', {class: 'auth-foot', text: 'Hesabın bu tarayıcıda saklanır. Ücretsizdir, e-posta gerekmez.'}))));

  document.title = `${isSignup ? 'Yeni hesap' : 'Giriş'} · TROÇKİ STUDİO`;
  warning.hidden = store.isPersistent();
  title.focus({preventScroll: true});
  nameInput.focus({preventScroll: true});
}


// ---------- Üniversiteye hazırlık ----------

const PREP_UNIT = 'Üniversiteye hazırlık';
const prepTopics = () => topics.filter(t => t.unit === PREP_UNIT);

function prepBanner() {
  const count = prepTopics().length;
  return h('a', {class: 'exam-banner', href: '#/hazirlik', style: {'--accent': GRADE_COLORS[12]}},
    h('span', {class: 'exam-banner-icon', 'aria-hidden': 'true', text: '🎓'}),
    h('span', {class: 'exam-banner-text'},
      h('strong', {text: 'Üniversiteye hazırlık'}),
      h('span', {text: `${count} konu · konu konu test çöz, karışık testle ölç`})),
    h('span', {class: 'arrow', 'aria-hidden': 'true', text: '→'}));
}

function lgsBanner() {
  return h('a', {class: 'exam-banner', href: '#/lgs', style: {'--accent': GRADE_COLORS[8]}},
    h('span', {class: 'exam-banner-icon', 'aria-hidden': 'true', text: '🏫'}),
    h('span', {class: 'exam-banner-text'},
      h('strong', {text: 'LGS denemesi'}),
      h('span', {text: '90 soru · tüm dersler · süre sayacı · her seferinde yeni sorular'})),
    h('span', {class: 'arrow', 'aria-hidden': 'true', text: '→'}));
}

// ---------- Yıl bazlı sınav bankası ----------

const BANKS = [TYT_2027, YDT_2027, AYT_2027, TYT_2023, TYT_2026, AYT_2026, TYT_2025, TYT_2024, AYT_2025, AYT_2024].map(b => ({...b, id: `${b.exam.toLowerCase()}-${b.year}`}));

// Bölümü her açılışta farklı seçenek sırasıyla hazırlar (doğru cevap yeri karıştırılır).
function bankExam(section) {
  return {
    grade: 12,
    title: section.label,
    minutes: section.minutes,
    questions: section.questions.map(q => {
      const order = q.options.map((_, i) => i);
      for (let i = order.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [order[i], order[j]] = [order[j], order[i]];
      }
      return {
        topicName: q.topicName,
        question: {text: q.text, steps: [q.explanation]},
        options: order.map(i => q.options[i]),
        correctIndex: order.indexOf(q.correctIndex),
      };
    }),
  };
}

function renderBankHome() {
  const title = h('h1', {id: 'page-title', text: 'Sınav bankası'});
  app.replaceChildren(
    h('nav', {class: 'breadcrumb'}, h('a', {href: '#/hazirlik', text: '← Üniversiteye hazırlık'})),
    h('header', {class: 'grade-head'}, title,
      h('p', {text: 'Yıllara göre TYT denemeleri. Her bölüm ayrı ayrı çözülebilir; tam denemede 120 soru ve 165 dakika vardır.'})),
    h('div', {}, BANKS.map(bank => h('section', {class: 'exam-card'},
      h('h2', {text: `${bank.year} ${bank.exam}`}),
      h('p', {class: 'muted', text: bank.note}),
      h('div', {class: 'prep-actions prep-grid'},
        bank.sections.map(sec => h('a', {href: `#/banka/${bank.id}/${sec.key}`, text: sec.label})))))));
  setPage('Sınav bankası', title);
}

function renderPrepHome() {
  const prep = prepTopics();
  const recent = store.examsFor(12).filter(e => e.label).slice(0, 5);
  const title = h('h1', {id: 'page-title', text: 'Üniversiteye hazırlık'});

  app.replaceChildren(
    h('nav', {class: 'breadcrumb'}, h('a', {href: '#/sinif/12', text: '← 12. sınıf konuları'})),
    h('header', {class: 'grade-head'}, title,
      h('p', {text: `${prep.length} konu · her konudan sonsuz soru · beş şıklı testlerle kendini ölç`})),
    h('section', {class: 'exam-card'},
      h('h2', {text: 'Deneme sınavları'}),
      h('p', {text: `${DENEMELER.tyt.title} ve ${DENEMELER.ayt.title}: 40 soru, beş şık, süre sayacı. Her seferinde sorular değişir.`}),
      h('div', {class: 'prep-actions'},
        h('a', {href: '#/deneme/tyt', text: 'TYT denemesi başlat'}),
        h('a', {href: '#/deneme/ayt', text: 'AYT denemesi başlat'}),
        h('a', {href: '#/banka', text: 'Yıllara göre sınav bankası'}))),
    h('section', {class: 'exam-card'},
      h('h2', {text: 'Ders denemeleri'}),
      h('p', {text: 'Fizik, kimya, biyoloji, Türkçe, tarih, coğrafya, felsefe ve İngilizce için 10 soruluk denemeler. Karma denemede tüm dersler bir arada (40 soru).'}),
      h('div', {class: 'prep-actions prep-grid'},
        SUBJECTS.map(x => h('a', {href: `#/ders/${x.key}`, text: x.name})),
        h('a', {href: '#/ders/karma', text: 'Karma deneme (40 soru)'}))),
    h('section', {class: 'exam-card'},
      h('h2', {text: 'Karışık hazırlık testi'}),
      h('p', {text: `Tüm hazırlık konularından ${EXAM_LENGTH} soru, beş şıklı. Her seferinde sorular değişir.`}),
      h('a', {class: 'primary-link', href: '#/hazirlik/karisik', text: 'Karışık test başlat →'})),
    h('div', {class: 'cards'}, prep.map(topic => h('article', {class: 'topic-card', style: {'--accent': GRADE_COLORS[12]}},
      h('span', {class: 'topic-symbol', 'aria-hidden': 'true', text: topic.symbol}),
      h('h3', {text: topic.name}),
      h('p', {class: 'topic-summary', text: topic.summary}),
      h('div', {class: 'prep-actions'},
        h('a', {href: `#/konu/${topic.id}`, text: 'Anlatım ve alıştırma'}),
        h('a', {href: `#/hazirlik/${topic.id}`, text: '10 soruluk test'}))))),
    recent.length ? h('section', {class: 'exam-card'},
      h('h2', {text: 'Son hazırlık testleri'}),
      h('ol', {class: 'exam-history'}, recent.map(e => h('li', {},
        h('strong', {text: `%${Math.round((100 * e.score) / e.total)}`}),
        h('span', {text: ` · ${e.label} · ${e.score}/${e.total}`}))))) : null);
  setPage('Üniversiteye hazırlık', title);
}

// ---------- Yönlendirme ----------

function route() {
  if (!auth.current()) {
    renderUserSlot();
    renderAuth(location.hash === '#/kayit' ? 'signup' : 'login');
    return;
  }
  renderUserSlot();
  const parts = location.hash.replace(/^#\/?/, '').split('/').filter(Boolean);
  if (parts[0] === 'konu' && parts[1]) {
    const topic = topics.find(t => t.id === parts[1]);
    if (topic) {
      renderTopic(topic, parts[2] === 'alistirma' ? 'alistirma' : 'anlatim');
      return;
    }
  }
  if (parts[0] === 'banka') {
    const bank = BANKS.find(b => b.id === parts[1]);
    const section = bank?.sections.find(sec => sec.key === parts[2]);
    if (section) {
      renderExamStart(12, {builder: () => bankExam(section), label: `${bank.year} ${bank.exam} · ${section.label}`, title: section.label, backHref: '#/banka', minutes: section.minutes});
      return;
    }
    renderBankHome();
    return;
  }
  if (parts[0] === 'lgs') {
    renderExamStart(8, {builder: () => buildLgs(), label: 'LGS denemesi', title: 'LGS denemesi (90 soru)', backHref: '#/sinif/8', minutes: LGS_MINUTES});
    return;
  }
  if (parts[0] === 'ders' && (parts[1] === 'karma' || SUBJECTS.some(x => x.key === parts[1]))) {
    const key = parts[1];
    const info = key === 'karma' ? {name: 'Karma ders denemesi', minutes: 60} : SUBJECTS.find(x => x.key === key);
    renderExamStart(12, {builder: () => buildSubjectTest(key, Math.random, 10), label: info.name, title: info.name, backHref: '#/hazirlik', minutes: info.minutes});
    return;
  }
  if (parts[0] === 'deneme' && DENEMELER[parts[1]]) {
    const kind = parts[1];
    const d = DENEMELER[kind];
    renderExamStart(12, {builder: () => buildDeneme(kind), label: d.title, title: d.title, backHref: '#/hazirlik', minutes: d.minutes});
    return;
  }
  if (parts[0] === 'hazirlik') {
    if (parts[1] === 'karisik') {
      renderExamStart(12, {pool: prepTopics(), label: 'Karışık hazırlık testi', title: 'Karışık hazırlık testi', backHref: '#/hazirlik'});
      return;
    }
    const topic = parts[1] ? prepTopics().find(t => t.id === parts[1]) : null;
    if (topic) {
      renderExamStart(12, {pool: [topic], label: topic.name, title: `${topic.name} · test`, backHref: '#/hazirlik'});
      return;
    }
    renderPrepHome();
    return;
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
// ---------- Güncelleme kontrolü ----------

const updateButton = document.getElementById('update-check');
const updateStatus = document.getElementById('update-status');
const versionNote = document.getElementById('version-note');
if (versionNote) versionNote.textContent = `Sürüm ${VERSION}`;

let registration = null;
// Sayfa zaten bir servis çalışanı tarafından yönetiliyorsa, yeni sürüm devreye girince yeniden yükle.
const hadController = 'serviceWorker' in navigator && Boolean(navigator.serviceWorker.controller);
let reloading = false;

function setUpdateStatus(text) { if (updateStatus) updateStatus.textContent = text; }

function showUpdateBanner(reg) {
  if (document.querySelector('.update-banner')) return;
  const apply = h('button', {class: 'primary-button update-apply', type: 'button', text: 'Güncelle'});
  apply.addEventListener('click', () => reg.waiting?.postMessage('SKIP_WAITING'));
  document.body.append(h('div', {class: 'update-banner', role: 'status'},
    h('span', {text: 'Yeni bir sürüm hazır.'}), apply));
}

function watchRegistration(reg) {
  if (reg.waiting && hadController) showUpdateBanner(reg);
  reg.addEventListener('updatefound', () => {
    const worker = reg.installing;
    worker?.addEventListener('statechange', () => {
      if (worker.state === 'installed' && hadController) showUpdateBanner(reg);
    });
  });
}

function finishCheck() {
  if (registration.waiting && hadController) {
    showUpdateBanner(registration);
    setUpdateStatus('Yeni sürüm hazır.');
  } else if (!registration.installing) {
    setUpdateStatus(`Güncelsin · sürüm ${VERSION}`);
  }
  if (updateButton) updateButton.disabled = false;
}

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    if (!hadController || reloading) return;
    reloading = true;
    location.reload();
  });
  navigator.serviceWorker.register('./sw.js')
    .then(reg => { registration = reg; watchRegistration(reg); })
    .catch(() => {});
}

updateButton?.addEventListener('click', async () => {
  if (!registration) {
    setUpdateStatus('Bu tarayıcıda güncelleme denetimi kullanılamıyor. Sayfayı yenilemeyi dene.');
    return;
  }
  updateButton.disabled = true;
  setUpdateStatus('Kontrol ediliyor…');
  try {
    await registration.update();
  } catch {
    setUpdateStatus('Kontrol edilemedi. Bağlantını kontrol et.');
    updateButton.disabled = false;
    return;
  }
  if (registration.installing) {
    const worker = registration.installing;
    setUpdateStatus('Yeni sürüm indiriliyor…');
    worker.addEventListener('statechange', () => {
      if (worker.state === 'installed' || worker.state === 'redundant') finishCheck();
    });
  } else {
    finishCheck();
  }
});
