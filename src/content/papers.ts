// Housing for original papers, independent of the Ecoverse registry.
export const PAPERS = [
  {
    id: 'iris-accidental-case-study',
    title: 'The Iris Dataset: An Accidental Case Study in Pedagogy, Methodology and Real-World Implications',
    fileName: 'The Iris Dataset- An Accidental Case Study in Pedagogy, Methodology and Real-World Implications.pdf',
  },
  {
    id: 'shell-game-case-study',
    title: 'The Shell Game: A Case Study Introducing a Reproducible Framework for Auditing Data Transformations Across Administrative Boundaries',
    fileName: 'The_Shell_Game_Case_Study.pdf',
  },
  {
    id: 'contextual-training-effects',
    title: 'The Effect of Contextual Training on Visual Feature Learning: A Controlled Study Using Chinese Characters',
    fileName: 'Contextual_Training_Effects_on_Visual_Feature_Learning (2).pdf',
    // Use the SHA-256 prefix to refresh cached copies when the PDF changes.
    revision: '23723d9e724b',
  },
];

export const paperUrl = (fileName: string, revision?: string) => {
  const url = `/papers/${encodeURIComponent(fileName)}`;
  return revision ? `${url}?v=${encodeURIComponent(revision)}` : url;
};
