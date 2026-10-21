import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync, existsSync} from 'node:fs';
import {fileURLToPath} from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));

// Yayın iş akışı, sitenin çalışması için gereken her dosyayı kopyalamalı.
test('publish workflow copies every top-level file the site needs', () => {
  const workflow = readFileSync(root + '.github/workflows/pages.yml', 'utf8');
  const copyLine = workflow.split('\n').find(line => line.includes('cp docs/index.html'));
  assert.ok(copyLine, 'copy line missing');
  const copied = copyLine.trim().split(/\s+/).slice(1, -1).map(p => p.replace(/^docs\//, ''));
  const sw = readFileSync(root + 'docs/sw.js', 'utf8');
  const topFiles = [...sw.matchAll(/'\.\/([^'\/]+\.[a-z]+)'/g)].map(m => m[1]);
  const html = readFileSync(root + 'docs/index.html', 'utf8');
  for (const file of new Set([...topFiles, ...[...html.matchAll(/href="\.\/([^"?]+)/g)].map(m => m[1])])) {
    if (file.endsWith('.js')) continue;
    assert.ok(existsSync(root + 'docs/' + file), `docs/${file} missing`);
    assert.ok(copied.includes(file), `workflow does not copy ${file}`);
  }
});
