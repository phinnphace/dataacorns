import fs from 'fs';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const pdf = require('pdf-parse');

async function extract() {
  const files = [
    './src/projects/MarksonP_Iris_CaseStudy_Final2025.pdf',
    './src/projects/Consulting_Final_ProjectRedacted.pdf'
  ];
  for (const f of files) {
    if (fs.existsSync(f)) {
      const dataBuffer = fs.readFileSync(f);
      const data = await pdf(dataBuffer);
      fs.writeFileSync(f + '.txt', data.text);
      console.log('Extracted', f);
    }
  }
}
extract();
