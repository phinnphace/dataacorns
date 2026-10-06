import { Database, GraduationCap, ClipboardList, Compass, Map as MapIcon, BookOpen, Gift, Sliders, type LucideIcon } from 'lucide-react';

export interface Ecoverse {
  id: string;
  stageNum: number;
  gridPos: { x: number; y: number }; // Percentage position on the SMB3/Zelda map canvas
  name: string;
  realmName: string;
  type: string;
  status: 'active' | 'secret' | 'upcoming';
  description: string;
  icon: LucideIcon;
  terrain: 'forest' | 'citadel' | 'grid' | 'vault' | 'atlas' | 'lab' | 'forge' | 'cushion';
  nestingLayers: {
    outer: string;
    middle: string;
    inner: string;
  };
  tags: string[];
}

export const ECOVERSES: Ecoverse[] = [
  {
    id: 'shellgame',
    stageNum: 1,
    gridPos: { x: 18, y: 70 },
    name: 'The Shell Game',
    realmName: 'World 1 • Allocation Forest',
    type: 'Spatial Equity & Audit Protocol',
    status: 'active',
    description: 'Auditing allocation perturbation and MAUP errors in crosswalked population data prior to statistical modeling.',
    icon: Database,
    terrain: 'forest',
    nestingLayers: {
      outer: 'The Public Surface: An R package suite (shellgame & geoDeltaAudit) auditing data perturbation across administrative transformations.',
      middle: 'Under the Couch Cushions: Observations shift to proxied allocations.',
      inner: 'The Join: Allocation decisions determine counts, counts determine samples and samples determine statistics.'
    },
    tags: ['CRAN Package', 'Spatial Audit', 'MAUP', 'Crosswalks']
  },
  {
    id: 'research-hub',
    stageNum: 2,
    gridPos: { x: 30, y: 38 },
    name: 'Research Hub',
    realmName: 'World 2 • Academic Citadel',
    type: "Conference Abstracts, Papers, DOIs, Stretch Goal of Open Projects",
    status: 'active',
    description: 'See you in Long Beach!!',
    icon: GraduationCap,
    terrain: 'citadel',
    nestingLayers: {
      outer: 'The Public Surface: Writing, conferences, Software',
      middle: 'Under the Couch Cushions: Not money',
      inner: 'The Join: We all count, because we all count'
    },
    tags: ['SACNAS', 'ABRCMS', 'ASBMB', 'AAAS', 'ASEE', 'MAYO', 'OASES', 'ERN', 'NIH', 'Publications', 'Citations']
  },
  {
    id: 'survey-design',
    stageNum: 3,
    gridPos: { x: 50, y: 22 },
    name: 'Survey Design',
    realmName: 'World 3 • Inclusivity Vault',
    type: 'SOGI Data Collection Framework',
    status: 'active',
    description: 'Survey design, focus group, and analysis of post-secondary graduate admissions data with onehot encoding for unstructured textual analysis.',
    icon: ClipboardList,
    terrain: 'vault',
    nestingLayers: {
      outer: 'The Public Surface: Full cycle project on SOGI admissions application questionnaire redo.',
      middle: 'Under the Couch Cushions: Diverged from traditional statistcal methodolgies that are colonizing.',
      inner: 'The Join: A second look demonstrated that syntactial issues were the prime driver in non-response rates.'
    },
    tags: ['SOGI', 'Survey Method', 'Demographics', 'Inclusivity']
  },
  {
    id: 'transitaware',
    stageNum: 4,
    gridPos: { x: 72, y: 34 },
    name: 'TransitAware',
    realmName: 'World 4 • Transit Grid Nexus',
    type: 'Urban Mobility & Network Analysis',
    status: 'active',
    description: 'Madison transit access modeled in Python using the Google Routes and Distance Matrix APIs. This interactive dashboard demonstrates that geographic proximity does not equal resource access, and details how historic municipal boundaries still dictate urban mobility.',
    icon: Compass,
    terrain: 'grid',
    nestingLayers: {
      outer: 'The Public Surface: A static map and Google API transit-analysis scripts.',
      middle: 'Under the Couch Cushions: A course project examining assumptions about transit access.',
      inner: 'The Join: This is a separate project from Mapping Food Vulnerability.'
    },
    tags: ['GIS', 'Transit Mobility', 'Spatial Networks', 'Urban Access']
  },
  {
    id: 'transit-map',
    stageNum: 5,
    gridPos: { x: 84, y: 60 },
    name: 'Mapping Food Vulnerability',
    realmName: 'World 5 • Equity Waypoint',
    type: 'Interactive Food Desert Dashboard',
    status: 'active',
    description: 'Original Equity-Centered Scoring Model grounded in context.Context is used as a critique of the binary USDA definiton of food desert where resource proximity and economic status is equivelant to food access. Contains a manually constructed map with original conceptual framework and scoring methodology.',
    icon: MapIcon,
    terrain: 'atlas',
    nestingLayers: {
      outer: 'The Public Surface: Manually built map, with novel conceptual framework and scoring methodology to address the insufficient USDA definition of "food desert',
      middle: 'Under the Couch Cushions: Access is not a binary varible as it is typically reduced to (income and distance to the resource).',
      inner: 'The Join: Food security transects every variable'
    },
    tags: ['Food Equity', 'choropleth', 'GIS', 'Leaflet', 'QGIS']
  },
  {
    id: 'iris-case-study',
    stageNum: 6,
    gridPos: { x: 65, y: 80 },
    name: 'The Iris Dataset',
    realmName: 'World 6 • Botanical Pedagogy Lab',
    type: 'Classical Multivariate Analysis',
    status: 'active',
    description: 'Deconstructing Fisher\'s Iris dataset orgaqnnically because this is still the unexamined ML status quo sans dialouge on eugenics and statistics.',
    icon: BookOpen,
    terrain: 'lab',
    nestingLayers: {
      outer: 'The Public Surface: An interactive pedagogical guide through how I fell into this with my distance partner',
      middle: 'Under the Couch Cushions: We both played our STEM lineage roles flawlessly as if they had been written for us...',
      inner: 'The Join: We do not live in a vacuum. A methodology (tool) created by a group of people determined to create a subhuman group is not and cannot be absent this.'
    },
    tags: ['EUGENICS', 'SILENCE-WARNINGS', 'Pedagogy', 'R Stats', 'MODEL FIT']
  },
  {
    id: 'free-stuff',
    stageNum: 7,
    gridPos: { x: 38, y: 80 },
    name: 'By Design',
    realmName: 'World 7 • Buildy things\'s Forge',
    type: 'Open Source Tools & Reproducible Research',
    status: 'active',
    description: 'Production-ready R scripts, Canvas LMS monitors, Python utilities, and reproducible research workflows.',
    icon: Gift,
    terrain: 'forge',
    nestingLayers: {
      outer: 'The Public Surface: Free, open source scripts, Canvas LMS automation tools, and reproducible templates.',
      middle: 'Under the Couch Cushions: Building tools that solve daily operational friction in academic research.',
      inner: 'The Join: Sharing knowledge freely so others don\'t have to rebuild the wheel from scratch.'
    },
    tags: ['Open Source', 'CRAN Scripts', 'PyPI', 'Canvas LMS', 'Python']
  },
  {
    id: 'the-80-20',
    stageNum: 8,
    gridPos: { x: 50, y: 52 },
    name: 'The 80-20 Project',
    realmName: 'World 8 • Draftpersons Validation Atelier',
    type: 'ML Validation & Confounder Diagnostics',
    status: 'active',
    description: 'Exposing confounded measurements through diligent validation',
    icon: Sliders,
    terrain: 'forge',
    nestingLayers: {
      outer: 'The Public Surface: Standard machine learning confuses benchmarks with findings. and calibration with results.',
      middle: 'Under the Couch Cushions: Following a methodologically diligent protocol to identify and remove confounders similiar to an epididemiological SDOH framework, whereby root causes are identified and elimenated where possible',
      inner: 'The Join: Asking questions regarding what, where, why and how initial and intermediate experimentation interacts with the sample yields rigorous results.'
    },
    tags: ['ML Validation', '80/20 Split', 'Linear Probes', 'GAP Collapse', 'Observational Constraints']
  }
];
