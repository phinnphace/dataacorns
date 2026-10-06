export interface Abstract {
  id: string;
  title: string;
  conference: string;
  conferenceFull: string;
  date: string;
  location: string;
  authors: string;
  institutions: string;
  summary: string;
  fullText: string[];
  keyFindings: string[];
  pdfName: string;
  tags: string[];
  type: string;
  citeChicago: string;
  citeBibtex: string;
  relatedEcoverse?: string;
  imageUrl?: string;
}

export const ABSTRACTS: Abstract[] = [
  {
    id: 'shell-game-sacnas',
    title: 'The Shell Game: Auditing Allocation in Crosswalked Population Data',
    conference: 'SACNAS 2026',
    conferenceFull: 'Society for the Advancement of Chicanos/Hispanics and Native Americans in Science (SACNAS)',
    date: 'October 29-31, 2026',
    location: 'Long Beach, California',
    authors: 'P. Markson¹, K.Rao²',
    institutions: '¹The Ohio State University, Columbus, OH, USA | ²The Ohio State University, Columbus, OH, USA',
    summary: 'Conceptual framework and CRAN software for identifying and quantifying perturbation in data transformation across administrative boundaries.',
    fullText: [
      'Geographic crosswalking, which is commonplace in population data workflows, is often described as the simple harmonization of datasets across diverging boundary systems. In practice, crosswalks allocate observations between administrative geographies, fundamentally altering the analytical sample while preserving the variable name. This work introduces a standardized audit protocol designed to track and quantify the sample-integrity perturbation (ΔX) introduced by crosswalk-induced transformations.',
      'The demonstration workflow defines geographic membership using US Census Bureau relationship files and allocates ZIP-level observations to county administrative zones using the HUD-USPS ZIP-county crosswalk (specifically analyzing the TOT_RATIO factor). Further development testing evaluates block-to-tract boundary interpolation derived from block-level geographic relationships in the National Historical Geographic Information Society (NHGIS).',
      'Preliminary results demonstrate significant, measurable perturbation introduced solely through spatial allocation decisions, prior to any downstream statistical modeling. These findings indicate that crosswalk spatial transformations should not be ignored as minor pre-processing steps, but must be treated as formal allocation procedures. We support the use of proactive auditing tools—including the geoDeltaAudit suite—to evaluate key crosswalk assumptions in population-data and socio-spatial workflows.'
    ],
    keyFindings: [
      'Allocated outputs imputed via crosswalks are treated as direct measurements. This acts as a statistical shell game where variables appear stable but underlying samples shift.',
      'Measurable perturbation is introduced solely by spatial allocation choices prior to any statistical regression or modeling.',
      'MAUP (Modifiable Areal Unit Problem) errors disproportionately impact boundary-crossing and rural-urban fringe communities.'
    ],
    pdfName: 'The_Shell_Game_Auditing_Allocation_SACNAS_2026.pdf',
    relatedEcoverse: 'shellgame',
    tags: ['Crosswalk Audit', 'geoDeltaAudit', 'Population Data', 'Spatial Equity'],
    type: 'SACNAS',
    citeChicago: 'Markson, P., Rao, K. "The Shell Game: Auditing Allocation in Crosswalked Population Data." SACNAS Annual National Conference, Long Beach, California October 29-31, 2026.',
    citeBibtex: `@inproceedings{markson2026shell,\n  author    = {Markson, P. and Rao, K.},\n  title     = {The Shell Game: Auditing Allocation in Crosswalked Population Data},\n  booktitle = {SACNAS National Diversity in STEM Conference},\n  address   = {Long Beach, California},\n  month     = {October},\n  year      = {2026}\n}`
  },
  {
    id: 'stop-saying-who',
    title: 'Stop Saying Who, Start Saying How: A Mechanistic Approach to Public Health Messaging',
    conference: 'ABRCMS 2025',
    conferenceFull: 'Annual Biomedical Research Conference for Minoritized Scientists',
    date: 'November 19-22, 2025',
    location: 'San Antonio, TX',
    authors: 'T. Selnko¹, P. Markson²',
    institutions: '¹Mailman School of Public Health, Columbia University, New York, NY, USA | ²Translational Data Analytics Institute, The Ohio State University, Columbus, OH, USA',
    summary: 'Identity based public health messaging excludes the populations it purports to serve. We introduce a mechanistic, behavior based message approach that does not reify stigmatization  and addresses the routes of transmission for the spread of disease.',
    fullText: [
      'The term men who have sex with men (MSM) was adopted in the 1990s to reduce stigma by focusing on behavior over identity in HIV/STI prevention. Yet, its continued use has reinforced identity-based risk profiling, obscuring shared transmission mechanisms and limiting public health impact. Rising gonorrhea rates now span diverse populations — including women, heterosexual men, youth, and racial minorities — yet messaging often remains targeted to MSM, missing opportunities for broad prevention.',
      'We propose a shift to a mechanistic, universal precaution framework that emphasizes condomless penetrative sex as the primary risk factor, regardless of gender or sexual identity. This approach treats risk as a function of behavior, not identity, aligning messaging with actual transmission dynamics. Using gonorrhea as a model pathogen — due to its high incidence, short incubation, and clear route of transmission — we test whether behavior-based messaging increases prevention uptake across all groups.',
      'In a cluster quasi-experimental trial across 20 U.S. sexual health clinics (2025–2026), intervention sites will implement mechanistic messaging; control sites will maintain standard, identity-targeted campaigns. The primary outcome is adjusted gonorrhea positivity (cases per test) to account for testing-rate bias. Secondary outcomes include self-reported condom use via validated surveys and perceived stigma. Exploratory analyses will examine trends in antibiotic resistance markers, if available, to rule out treatment failure as a driver of changes.',
      'We will use difference-in-differences analysis with time-series adjustments (e.g., for concurrent public health interventions) to compare pre- and post-intervention changes across arms. Subgroup analyses by gender, sexual orientation, and race/ethnicity will assess equity in impact without presuming risk. Power analysis (G*Power): Assuming a baseline positivity rate of 5%, ICC = 0.02, 50 patients per cluster, and 20 clusters (10 per arm), we achieve 80% power (α = 0.05) to detect a 30% reduction in positivity (to 3.5%) — a meaningful public health effect. If effective, this behavior-centered model could replace identity-based STI messaging with a scalable, stigma-reducing framework. Because transmission depends on acts, not identities, this approach may be adapted across STIs, offering a pathogen-agnostic strategy for equitable, evidence-based public health communication.'
    ],
    keyFindings: [
      'Shifts public health and STI messaging from demographic/identity categories to direct transmission behaviors (condomless penetrative sex) as the primary risk factor.',
      'Proposes a cluster quasi-experimental trial across 20 U.S. sexual health clinics comparing behavior-based mechanistic messaging to identity-targeted campaigns.',
      'Measures adjusted gonorrhea positivity and self-reported condom use to demonstrate that transmission depends on acts, not identities, offering a pathogen-agnostic framework.'
    ],
    pdfName: 'Stop_Saying_Who_Start_Saying_How_ABRCMS_2025.pdf',
    imageUrl: '/abrcms_2025_official.png',
    tags: ['Health Communication', 'Universal Precaution', 'Epidemiology', 'Stigma Reduction'],
    type: 'ABRCMS',
    citeChicago: 'Selnko, T. and P. Markson. "Stop Saying Who, Start Saying How: A Mechanistic Approach to Public Health Messaging." In Proceedings of the Annual Biomedical Research Conference for Minoritized Scientists (ABRCMS), San Antonio, TX, November 19-22, 2025.',
    citeBibtex: `@inproceedings{selnko2025stopsaying,\n  author    = {Selnko, T. and Markson, P.},\n  title     = {Stop Saying Who, Start Saying How: A Mechanistic Approach to Public Health Messaging},\n  booktitle = {Annual Biomedical Research Conference for Minoritized Scientists (ABRCMS)},\n  address   = {San Antonio, Texas},\n  month     = {November},\n  year      = {2025}\n}`
  }
];
