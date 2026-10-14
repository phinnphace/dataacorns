// Housing for original papers, independent of the Ecoverse registry.
export const PAPERS = [
  {
    id: 'shell-game-case-study',
    title: 'The Shell Game: A Case Study Introducing a Reproducible Framework for Auditing Data Transformations Across Administrative Boundaries',
    fileName: 'The_Shell_Game_Case_Study.pdf',
  },
  {
    id: 'contextual-training-effects',
    title: 'The Effect of Contextual Training on Visual Feature Learning: A Controlled Study Using Chinese Characters',
    fileName: 'Contextual_Training_Effects_on_Visual_Feature_Learning (2).pdf',
  },
];

export const paperUrl = (fileName: string) => `/papers/${encodeURIComponent(fileName)}`;
