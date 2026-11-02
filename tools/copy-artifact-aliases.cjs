// Preserve established download URLs after the supporting-documentation relocation.
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const root = path.resolve(__dirname, '..');
const manifest = JSON.parse(fs.readFileSync(path.join(root, 'docs/source-artifacts.json'), 'utf8'));
let count = 0;
for (const artifact of manifest) {
  if (!artifact.originalPath.startsWith('public/acorns=iris/receipts/')) continue;
  if (!artifact.path.startsWith('public/acorns=iris/supporting-documentation/')) {
    throw new Error(`Unexpected supporting-documentation relocation: ${artifact.path}`);
  }
  const source = path.join(root, 'dist', artifact.path.slice('public/'.length));
  const alias = path.join(root, 'dist', artifact.originalPath.slice('public/'.length));
  const bytes = fs.readFileSync(source);
  const digest = crypto.createHash('sha256').update(bytes).digest('hex');
  if (digest !== artifact.sha256) throw new Error(`Artifact mismatch: ${artifact.path}`);
  fs.mkdirSync(path.dirname(alias), { recursive: true });
  fs.writeFileSync(alias, bytes);
  count += 1;
}
if (count !== 12) throw new Error(`Expected 12 established download aliases; found ${count}`);
console.log(`Preserved ${count} established download URLs with identical current file bytes.`);
