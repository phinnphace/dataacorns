import fs from 'fs';
import path from 'path';
import PDFParser from 'pdf2json';

const files = fs.readdirSync('./src/projects')
  .filter(f => f.endsWith('.pdf'))
  .map(f => path.join('./src/projects', f));

console.log('PDF files to parse:', files);

async function parsePdf(filePath) {
  return new Promise((resolve, reject) => {
    const pdfParser = new PDFParser(null, 1);
    pdfParser.on("pdfParser_dataError", errData => {
      reject(errData.parserError);
    });
    pdfParser.on("pdfParser_dataReady", pdfData => {
      const txt = pdfParser.getRawTextContent();
      resolve(txt);
    });
    pdfParser.loadPDF(filePath);
  });
}

async function run() {
  for (const f of files) {
    try {
      console.log('Parsing:', f);
      const txt = await parsePdf(f);
      fs.writeFileSync(f + '.txt', txt);
      console.log('Extracted text for:', f);
    } catch (e) {
      console.error('Failed to parse:', f, e);
    }
  }
}
run();
