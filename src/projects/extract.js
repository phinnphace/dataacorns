import fs from 'fs';
import path from 'path';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const pdf = require('pdf-parse');
console.log('pdf import is:', typeof pdf, pdf);

async function extract() {
}
extract();
