const CACHE = 'matematik12-v5';
const FILES = [
  './', './index.html', './styles.css', './manifest.webmanifest', './icon.svg',
  './js/app.js', './js/answers.js', './js/curriculum.js', './js/progress.js', './js/session.js', './js/steps.js',
  './js/topics/grades-1-4.js', './js/topics/grade-5.js', './js/topics/grade-6.js', './js/topics/grade-7.js', './js/topics/grade-8.js',
  './js/topics/grade-9.js', './js/topics/grade-10.js', './js/topics/grade-11.js', './js/topics/grade-12.js',
];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(FILES)));
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(key => key.startsWith('matematik1') && key !== CACHE).map(key => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET' || new URL(event.request.url).origin !== self.location.origin) return;
  event.respondWith(
    fetch(event.request).then(response => {
      if (response.ok) {
        const copy = response.clone();
        event.waitUntil(caches.open(CACHE).then(cache => cache.put(event.request, copy)));
      }
      return response;
    }).catch(async () => {
      const cached = await caches.match(event.request);
      if (cached) return cached;
      if (event.request.mode === 'navigate') return caches.match('./index.html');
      return Response.error();
    })
  );
});
