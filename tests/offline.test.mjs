import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync, readdirSync, statSync} from 'node:fs';
import {join, relative} from 'node:path';
import {fileURLToPath} from 'node:url';
import {VERSION} from '../docs/js/version.js';

const docs = fileURLToPath(new URL('../docs/', import.meta.url));

function jsFiles(dir) {
  return readdirSync(dir).flatMap(name => {
    const path = join(dir, name);
    return statSync(path).isDirectory() ? jsFiles(path) : name.endsWith('.js') ? [path] : [];
  });
}

test('version is a dotted number', () => {
  assert.match(VERSION, /^\d+\.\d+\.\d+$/);
});

test('every app module is listed for offline caching in sw.js', () => {
  const sw = readFileSync(join(docs, 'sw.js'), 'utf8');
  const missing = jsFiles(join(docs, 'js'))
    .map(p => './' + relative(docs, p).split('\\').join('/'))
    .filter(rel => !sw.includes(`'${rel}'`));
  assert.deepEqual(missing, []);
});

test('service worker waits for approval before activating a new version', () => {
  const sw = readFileSync(join(docs, 'sw.js'), 'utf8');
  assert.ok(!/install[\s\S]*skipWaiting/.test(sw.split("addEventListener('message'")[0]));
  assert.ok(sw.includes("'SKIP_WAITING'"));
});
