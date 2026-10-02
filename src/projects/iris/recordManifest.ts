export const ARTIFACT_ROOT = '/acorns=iris';

export type RecordDocument = {
  id: string;
  label: string;
  title: string;
  fileName: string;
  preview: string;
  size: string;
};

export type ArtifactFile = {
  fileName: string;
  size: string;
  kind: 'text' | 'data' | 'image' | 'pdf' | 'numbers' | 'code';
};

export type ArtifactFolder = {
  id: 'data' | 'receipts';
  name: string;
  files: ArtifactFile[];
};

export const artifactUrl = (relativePath: string) =>
  `${ARTIFACT_ROOT}/${encodeURI(relativePath)}`;

export const recordDocuments: RecordDocument[] = [
  {
    id: 'd1',
    label: 'D.1',
    title: 'The legacy record, verbatim',
    fileName: 'D.1 The legacy record, verbatim (iris.names, served unchanged since 1989).docx',
    preview:
      'Excerpts reproduced verbatim from the repository\'s legacy documentation file (retrieved September 13, 2026).',
    size: '10.5 KB',
  },
  {
    id: 'd2',
    label: 'D.2',
    title: 'The mirrors disagree (full values)',
    fileName: 'D.2 The mirrors disagree (full values).docx',
    preview: 'The duplicate is IN the primary.',
    size: '3.7 MB',
  },
  {
    id: 'd3',
    label: 'D.3',
    title: 'The manufactured triplet, and what deduplication deletes',
    fileName: 'D.3 The manufactured triplet, and what deduplication deletes.docx',
    preview:
      'The canonical file\'s two transcription errors (rows 35, 38; see D.2) collapse distinct setosa specimens onto row 10, manufacturing a triplet of identical rows.',
    size: '3.3 MB',
  },
  {
    id: 'd4',
    label: 'D.4',
    title: 'Layer-by-layer audit',
    fileName: 'D4 layer by layer.docx',
    preview:
      'Attribution: The primary is explicit about both provenance and credit: the I. setosa and I. versicolor plants were “found growing together in the same colony and measured by Dr E. Anderson, to whom I am indebted for the use of the data.”',
    size: '3.2 MB',
  },
  {
    id: 'd5',
    label: 'D.5',
    title: 'The intervention',
    fileName: 'D.5 The intervention.docx',
    preview:
      'Findings were reported to repository maintainers on September 09, 2026; issue #32 is still open as of this draft, September 22, 2026.',
    size: '404.5 KB',
  },
  {
    id: 'd6',
    label: 'D.6',
    title: 'pdf-mcp',
    fileName: 'D.6 pdf-mcp.docx',
    preview:
      'The iris dataset, tabel 1was extracted from Fisher (1936), p. 180 (PDF page 3) using the MCP-based PDF tool developed by Kevin Tan (Tan, 2025).',
    size: '3.9 MB',
  },
  {
    id: 'd6a',
    label: 'D.6a',
    title: 'The shape prior — the canonical geometry fails the primary',
    fileName: 'D.6a The shape prior — the canonical geometry fails the primary.docx',
    preview:
      'The first verification attempt against Table I failed three times, and each turned out to be a symptom of the problem.',
    size: '9.1 KB',
  },
];

export const artifactFolders: ArtifactFolder[] = [
  {
    id: 'data',
    name: 'data',
    files: [
      { fileName: 'Index', size: '105 bytes', kind: 'data' },
      { fileName: 'bezdekIris.data', size: '11.7 KB', kind: 'data' },
      { fileName: 'citation_metadata_human_readable.txt', size: '159 bytes', kind: 'text' },
      { fileName: 'citation_metadata_machine_readable.bib', size: '891 bytes', kind: 'text' },
      { fileName: 'iris.data', size: '4.4 KB', kind: 'data' },
      { fileName: 'iris.names', size: '2.9 KB', kind: 'data' },
    ],
  },
  {
    id: 'receipts',
    name: 'receipts',
    files: [
      { fileName: '20260929_135504.jpg', size: '3.6 MB', kind: 'image' },
      { fileName: '600cellauditdiff.r', size: '283 bytes', kind: 'code' },
      {
        fileName:
          'Annals of Eugenics - September 1936 - FISHER - THE USE OF MULTIPLE MEASUREMENTS IN TAXONOMIC PROBLEMS copy.pdf',
        size: '490.2 KB',
        kind: 'pdf',
      },
      { fileName: 'Insearchofvirginica copy.pdf', size: '2.3 MB', kind: 'pdf' },
      {
        fileName: 'RAudit-showing failed cross validation bc or wrong metadata copy.txt',
        size: '2.6 KB',
        kind: 'text',
      },
      { fileName: 'codex-transcript.txt', size: '4.6 KB', kind: 'text' },
      { fileName: 'fisher.flowchart.png', size: '190.2 KB', kind: 'image' },
      { fileName: 'fisher1936_table1 copy.csv', size: '3.3 KB', kind: 'data' },
      { fileName: 'fisher1936_table1.numbers', size: '230.7 KB', kind: 'numbers' },
      { fileName: 'pdf-mcp-run copy.txt', size: '3.8 KB', kind: 'text' },
      { fileName: 'pdf-mcpmetadata copy.txt', size: '525 bytes', kind: 'text' },
      { fileName: 'settingupmcp-codex.txt', size: '1.3 KB', kind: 'text' },
    ],
  },
];
