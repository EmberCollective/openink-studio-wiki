import { readdirSync, readFileSync, existsSync, statSync } from 'node:fs';
import { resolve, join, relative } from 'node:path';
import assert from 'node:assert/strict';

const base = '/openink-studio-wiki/';
const root = resolve('dist');
function localTarget(href, page) {
  const url = new URL(href.replaceAll('&amp;', '&'), `https://docs.test${base}${page}`);
  if (url.origin !== 'https://docs.test') return null;
  assert(url.pathname.startsWith(base), `链接缺少站点前缀: ${href}`);
  const path = decodeURIComponent(url.pathname.slice(base.length));
  assert(!path.split('/').includes('..'), `非法路径: ${href}`);
  return { path: path.endsWith('/') || !path ? `${path}index.html` : path, hash: decodeURIComponent(url.hash.slice(1)) };
}
assert.deepEqual(localTarget('../../images/a.png', 'guide/first-write/'), { path: 'images/a.png', hash: '' });
assert.deepEqual(localTarget('../pdf-write/#校准', 'guide/first-write/'), { path: 'guide/pdf-write/index.html', hash: '校准' });
assert.equal(localTarget('https://github.com/EmberCollective/openink-studio', ''), null);
assert.throws(() => localTarget('/missing-base/', ''));

function files(dir) {
  return readdirSync(dir).flatMap(name => {
    const path = join(dir, name);
    return statSync(path).isDirectory() ? files(path) : [path];
  });
}
let count = 0;
for (const file of files(root).filter(path => path.endsWith('.html'))) {
  const page = relative(root, file).replaceAll('\\', '/');
  const html = readFileSync(file, 'utf8');
  for (const [, href] of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    if (/^(?:mailto:|tel:|data:|javascript:)/.test(href)) continue;
    const target = localTarget(href, page);
    if (!target) continue;
    const path = join(root, target.path);
    assert(existsSync(path), `${page}: 不存在的资源 ${href}`);
    if (target.hash && path.endsWith('.html')) {
      const ids = [...readFileSync(path, 'utf8').matchAll(/id="([^"]+)"/g)].map(match => match[1]);
      assert(ids.includes(target.hash), `${page}: 不存在的锚点 ${href}`);
    }
    count++;
  }
}
console.log(`已检查 ${count} 个本地链接、锚点和资源。`);
