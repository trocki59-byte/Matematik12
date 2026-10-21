const KEY = 'matematik12.progress.v1';
const MAX_EXAMS = 100;
const valid = s => s && Number.isSafeInteger(s.correct) && Number.isSafeInteger(s.total) && s.correct >= 0 && s.total >= s.correct;
const validExam = e => e && Number.isSafeInteger(e.grade) && Number.isSafeInteger(e.score) && Number.isSafeInteger(e.total)
  && e.total > 0 && e.score >= 0 && e.score <= e.total && typeof e.date === 'string'
  && (e.label === undefined || typeof e.label === 'string');

export function createProgressStore(storage) {
  let persistent = !!storage;
  const records = Object.create(null);
  let exams = [];
  try {
    const raw = storage?.getItem(KEY);
    if (raw) {
      const data = JSON.parse(raw);
      if (data?.version === 1 && data.topics && typeof data.topics === 'object') {
        for (const [id,s] of Object.entries(data.topics)) if (valid(s)) records[id] = {correct:s.correct,total:s.total};
      }
      if (data?.version === 1 && Array.isArray(data.exams)) exams = data.exams.filter(validExam);
    } else {
      const legacy = JSON.parse(storage?.getItem('mat14_stats') || '{}');
      for (const [id,s] of Object.entries(legacy || {})) {
        const converted = {correct:s?.d,total:s?.t};
        if (valid(converted)) records[id] = converted;
      }
    }
  } catch { persistent = false; }

  function save() {
    try { if (storage) storage.setItem(KEY,JSON.stringify({version:1,topics:records,exams})); }
    catch { persistent = false; }
  }

  return {
    get(id) { return {...(records[id] || {correct:0,total:0})}; },
    record(id,correct) {
      const previous = this.get(id);
      records[id] = {correct:previous.correct + Number(correct),total:previous.total + 1};
      save();
    },
    // Bir sınav sonucunu kaydeder. Tarih ISO biçiminde saklanır.
    recordExam(grade, score, total, date = new Date().toISOString(), label) {
      const entry = {grade, score, total, date};
      if (label) entry.label = String(label).slice(0, 80);
      if (!validExam(entry)) return null;
      exams = [entry, ...exams].slice(0, MAX_EXAMS);
      save();
      return entry;
    },
    // Belirli bir sınıfın sınav sonuçlarını, en yenisi başta olacak şekilde döndürür.
    examsFor(grade) { return exams.filter(e => e.grade === grade).map(e => ({...e})); },
    isPersistent() { return persistent; }
  };
}
