// Housing for original papers, independent of the Ecoverse registry.
export const PAPERS = [
  {
    id: 'contextual-training-effects',
    title: 'The Effect of Contextual Training on Visual Feature Learning: A Controlled Study Using Chinese Characters',
    fileName: 'Contextual_Training_Effects_on_Visual_Feature_Learning (2).pdf',
  },
];

export const paperUrl = (fileName: string) => `/papers/${encodeURIComponent(fileName)}`;
