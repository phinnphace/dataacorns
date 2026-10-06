const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const root = path.resolve(__dirname, '..');
const manifest = JSON.parse(fs.readFileSync(path.join(root, 'docs/source-artifacts.json'), 'utf8'));
const failures = [];
for (const artifact of manifest) {
  const file = path.join(root, artifact.path);
  if (!fs.existsSync(file)) {
    failures.push(`Missing: ${artifact.path}`);
    continue;
  }
  const hash = crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');
  if (hash !== artifact.sha256) failures.push(`Changed bytes: ${artifact.path}`);
}
function walk(dir) {
  return fs.readdirSync(path.join(root, dir), {withFileTypes: true}).flatMap(entry => {
    const file = `${dir}/${entry.name}`;
    return entry.isDirectory() ? walk(file) : [file];
  });
}
const expected = manifest.filter(artifact => artifact.path.startsWith('public/acorns=iris/')).map(artifact => artifact.path).sort();
const actual = walk('public/acorns=iris').sort();
if (JSON.stringify(expected) !== JSON.stringify(actual)) failures.push('Iris evidence file list changed.');
if (failures.length) {
  console.error(failures.join('\n'));
  process.exitCode = 1;
} else {
  console.log(`Verified ${manifest.length} original source artifacts, including all ${expected.length} Iris evidence files.`);
}
