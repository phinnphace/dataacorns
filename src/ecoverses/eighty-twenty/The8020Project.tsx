import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sliders, 
  ExternalLink, 
  Github, 
  FileText, 
  Layers, 
  Compass, 
  Sparkles, 
  Grid, 
  ArrowRight,
  X,
  Info,
  ArrowLeft,
  MousePointerClick
} from 'lucide-react';

// Custom Drafting Compass Icon
const DraftingCompassIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 2v3" />
    <circle cx="12" cy="5" r="2" />
    <path d="M11 7L6 21" />
    <path d="M13 7l5 14" />
    <path d="M8 15h8" />
  </svg>
);

// Custom T-Square Icon
const TSquareIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M3 4h18" />
    <path d="M3 2h18" />
    <path d="M12 4v18" />
    <path d="M10 8h4" />
    <path d="M10 12h4" />
    <path d="M10 16h4" />
  </svg>
);

// Definition for Carnival Wheel Constraints
interface CarnivalConstraint {
  id: string;
  num: string;
  title: string;
  subtitle: string;
  sopAssumption: string;
  failureMode: string;
  mitigation: string;
  formulaOrDiagram: string;
}

const CARNIVAL_CONSTRAINTS: CarnivalConstraint[] = [
  {
    id: 'probe-choice',
    num: '01',
    title: 'Linear Probe Presumption',
    subtitle: 'Instrument Capacity Constraint',
    sopAssumption: 'Features are evaluated solely using a linear classifier (w^T x + b = 0).',
    failureMode: 'If class information resides in a nonlinear subspace or curved manifold, the probe reports "no signal" (e.g., 50% accuracy) and researchers incorrectly conclude the features are poor.',
    mitigation: 'Evaluate features with both linear and non-parametric/kernel probes (k-NN, shallow MLP) to disentangle representation quality from instrument capacity.',
    formulaOrDiagram: 'f(x) = sign(w^T x + b)  vs.  f(x) = kNN(x, D_train)'
  },
  {
    id: 'spatial-pooling',
    num: '02',
    title: 'Global Average Pooling (GAP) Collapse',
    subtitle: 'Spatial Information Erasure',
    sopAssumption: 'Summing/averaging spatial patches (H × W × C → 1 × 1 × C) preserves essential feature context.',
    failureMode: 'Averaging collapses spatial geometry, diluting localized discriminative signals with background noise patches and erasing positional relationships.',
    mitigation: 'Evaluate dense patch token representations or spatial attention pooling before applying global feature reduction.',
    formulaOrDiagram: 'x_gap = (1 / HW) * Σ_i Σ_j x_{i,j}'
  },
  {
    id: 'split-ratio',
    num: '03',
    title: 'Arbitrary 80-20 Partitioning',
    subtitle: 'Sample Distribution Shift',
    sopAssumption: 'An 80/20 train/test split is a neutral, universally optimal dataset partition.',
    failureMode: 'Varying the split ratio dynamically changes reported performance, sample variance, and minority class coverage — introducing hidden partition bias.',
    mitigation: 'Report split-sensitivity curves across a range of ratios (50/50 to 90/10) with multi-seed stratified cross-validation.',
    formulaOrDiagram: 'Var(Accuracy) ∝ 1 / N_test'
  },
  {
    id: 'norm-erasure',
    num: '04',
    title: 'L2 Feature Normalization',
    subtitle: 'Magnitude Signal Erasure',
    sopAssumption: 'Projecting feature vectors onto a unit hypersphere (||x||_2 = 1) removes uninformative scale variations.',
    failureMode: 'Normalization strips away activation magnitude, which often encodes model confidence or feature importance in self-supervised backbones.',
    mitigation: 'Compare normalized vs. unnormalized feature distances and monitor activation norm distributions across layers.',
    formulaOrDiagram: 'x_norm = x / ||x||_2'
  },
  {
    id: 'crop-masking',
    num: '05',
    title: 'Random Crop Augmentation Bias',
    subtitle: 'Contextual Horizon Truncation',
    sopAssumption: 'Cropping images during feature extraction simulates scale invariance.',
    failureMode: 'Random cropping truncates contextual boundary cues, forcing models to rely on local texture shortcuts rather than holistic geometry.',
    mitigation: 'Audit representation shifts between full-frame center view and multi-scale random crops.',
    formulaOrDiagram: 'Scale(Crop) ∈ [0.08, 1.0]'
  },
  {
    id: 'metric-blindness',
    num: '06',
    title: 'Top-1 Accuracy Isolation',
    subtitle: 'Calibration & Margin Blindness',
    sopAssumption: 'Top-1 accuracy alone captures representation usefulness.',
    failureMode: 'Top-1 accuracy masks class imbalance, confidence miscalibration, and boundary proximity errors.',
    mitigation: 'Combine accuracy with Expected Calibration Error (ECE), AUROC, and class-conditional distance metrics.',
    formulaOrDiagram: 'ECE = Σ_k (b_k / N) * |acc(b_k) - conf(b_k)|'
  }
];

export interface SplitMatrixRow {
  split: string;
  trainRatio: number;
  aVal: number;
  aCasia: number;
  aCalli: number;
  bVal: number;
  bCasia: number;
  bCalli: number;
  takeaway: string;
}

export const REAL_SPLIT_MATRIX_DATA: SplitMatrixRow[] = [
  {
    split: '50/50',
    trainRatio: 50,
    aVal: 55.5,
    aCasia: 15.3,
    aCalli: 100.0,
    bVal: 92.3,
    bCasia: 100.0,
    bCalli: 15.8,
    takeaway: 'Condition B achieves perfect 100% CASIA transfer; Condition A drops to 15.3% on CASIA.'
  },
  {
    split: '60/40',
    trainRatio: 60,
    aVal: 64.8,
    aCasia: 44.1,
    aCalli: 47.4,
    bVal: 95.7,
    bCasia: 98.3,
    bCalli: 5.3,
    takeaway: 'OPTIMAL FOR CONDITION B: 95.7% internal validation AND 98.3% CASIA transfer (best of both worlds).'
  },
  {
    split: '70/30',
    trainRatio: 70,
    aVal: 53.7,
    aCasia: 16.9,
    aCalli: 0.0,
    bVal: 95.3,
    bCasia: 100.0,
    bCalli: 5.3,
    takeaway: 'Condition B achieves 100% CASIA transfer while Condition A drops to 16.9% CASIA & 0% CalliBench.'
  },
  {
    split: '80/20',
    trainRatio: 80,
    aVal: 73.5,
    aCasia: 34.3,
    aCalli: 100.0,
    bVal: 94.8,
    bCasia: 26.6,
    bCalli: 5.3,
    takeaway: 'THE MISLEADING 80/20 ARTIFACT: Condition B CASIA transfer drops to 26.6%, creating false conclusion that "contextual training does not transfer".'
  },
  {
    split: '90/10',
    trainRatio: 90,
    aVal: 69.4,
    aCasia: 69.5,
    aCalli: 94.7,
    bVal: 96.6,
    bCasia: 98.3,
    bCalli: 5.3,
    takeaway: 'Condition A reaches peak CASIA transfer (69.5%); Condition B maintains 98.3% CASIA transfer.'
  }
];

export const CALLIBENCH_DIFF_TABLE = [
  { aSplit: '50/50', b50: -0.8421, b60: -0.9474, b70: -0.9474, b80: -0.9474, b90: -0.9474 },
  { aSplit: '60/40', b50: -0.3158, b60: -0.4211, b70: -0.4211, b80: -0.4211, b90: -0.4211 },
  { aSplit: '70/30', b50: +0.1579, b60: +0.0526, b70: +0.0526, b80: +0.0526, b90: +0.0526 },
  { aSplit: '80/20', b50: -0.8421, b60: -0.9474, b70: -0.9474, b80: -0.9474, b90: -0.9474 },
  { aSplit: '90/10', b50: -0.7895, b60: -0.8948, b70: -0.8948, b80: -0.8948, b90: -0.8948 }
];

interface The8020ProjectProps {
  onBack?: () => void;
}

export const The8020Project: React.FC<The8020ProjectProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'probe-sim' | 'gap-sim' | 'split-sim' | 'wheel' | 'artifacts'>('overview');
  
  // Interactive State for Probe Simulator
  const [probeType, setProbeType] = useState<'linear' | 'kernel' | 'spatial'>('linear');
  const [dataSubspace, setDataSubspace] = useState<'concentric' | 'linear' | 'moons'>('concentric');

  // Interactive State for GAP Simulator
  const [gapEnabled, setGapEnabled] = useState<boolean>(true);
  const [selectedTokenIdx, setSelectedTokenIdx] = useState<number | null>(24); // Center token default

  // Interactive State for Split Simulator
  const [trainRatio, setTrainRatio] = useState<number>(80);

  // Active Carnival Constraint Modal
  const [selectedConstraint, setSelectedConstraint] = useState<CarnivalConstraint | null>(null);

  // Active Nesting Doll Layer
  const [nestLayer, setNestLayer] = useState<'outer' | 'middle' | 'inner'>('outer');

  // Artifacts list
  const artifacts = [
    {
      title: '80-20 Project GitHub Repository',
      category: 'Open Source Codebase',
      url: 'https://github.com/phinnphace/80-20',
      icon: Github,
      badge: 'GitHub Repo',
      description: 'Experiment testing whether training context (isolated vs. bigram) changes how vision models learn Chinese characters. Demonstrates that the standard 80/20 train/test split is an experimental variable, not a neutral default. .'
    },
    {
      title: 'Split-Tester GitHub Repository',
      category: 'Open Source Tooling',
      url: 'https://github.com/phinnphace/split-tester',
      icon: Github,
      badge: 'GitHub Repo',
      description: 'what happens when testing your default in ML changes every result?'
    },
    {
      title: 'Contextual Training Effects Paper & Vercel App',
      category: 'Research Manuscript',
      url: 'https://tinyurl.com/8020ml',
      icon: FileText,
      badge: 'Paper & App',
      description: 'The Effect of Contextual Training on Visual Feature Learning: A Controlled Study Using Chinese Characters.' 
    },
    {
      title: 'Train / Test Split Ratio Workbench',
      category: 'Interactive Web Tool',
      url: 'https://go.dataacorns.com/80-20/splits',
      icon: Sliders,
      badge: 'go.dataacorns.com',
      description: 'Explore how changing the default train/test split ratios dynamically alter reported accuracy, variance, and feature class coverage.'
    },
    {
      title: 'Carnival Wheel of Observational Constraints',
      category: 'Interactive Web Tool',
      url: 'https://go.dataacorns.com/80-20/carnival-wheel',
      icon: DraftingCompassIcon,
      badge: 'go.dataacorns.com',
      description: 'A widget demonstrating the arbitrary effect of the split ratio on reported results.'
    },
    {
      title: 'The 80-20 Project Overview & Methodology',
      category: 'Project Hub',
      url: 'https://go.dataacorns.com/80-20/project',
      icon: Compass,
      badge: 'go.dataacorns.com',
      description: 'The summary slide-deck for the 80-20 project and where it connects in real life, now'
    }
  ];

  // Helper to describe probe instrument capacity behavior without fake mock figures
  const getProbeMetrics = () => {
    if (dataSubspace === 'concentric') {
      if (probeType === 'linear') {
        return { 
          capacityMode: 'HYPERPLANE LIMITATION', 
          status: 'Linear probe cannot separate concentric manifold geometry (w^T x + b = 0).', 
          color: 'text-red-700', 
          bg: 'bg-red-50 border-red-200' 
        };
      } else if (probeType === 'kernel') {
        return { 
          capacityMode: 'NONLINEAR KERNEL CAPACITY', 
          status: 'Kernel mapping K(x,x\') separates non-linear concentric decision boundaries.', 
          color: 'text-emerald-800', 
          bg: 'bg-emerald-50 border-emerald-200' 
        };
      } else {
        return { 
          capacityMode: 'LOCAL DENSITY TOPOLOGY', 
          status: 'k-NN evaluates localized spatial neighborhoods regardless of manifold curvature.', 
          color: 'text-blue-800', 
          bg: 'bg-blue-50 border-blue-200' 
        };
      }
    } else if (dataSubspace === 'moons') {
      if (probeType === 'linear') {
        return { 
          capacityMode: 'CAPACITY MISMATCH', 
          status: 'Linear hyperplane fails to capture intertwined non-linear moon manifolds.', 
          color: 'text-amber-800', 
          bg: 'bg-amber-50 border-amber-200' 
        };
      } else if (probeType === 'kernel') {
        return { 
          capacityMode: 'NONLINEAR SEPARATION', 
          status: 'Polynomial/RBF kernel resolves curved manifold boundaries.', 
          color: 'text-emerald-800', 
          bg: 'bg-emerald-50 border-emerald-200' 
        };
      } else {
        return { 
          capacityMode: 'NEIGHBORHOOD TOPOLOGY', 
          status: 'Spatial proximity preserves local manifold structure.', 
          color: 'text-blue-800', 
          bg: 'bg-blue-50 border-blue-200' 
        };
      }
    } else {
      // Linearly Separable
      return { 
        capacityMode: 'LINEARLY SEPARABLE', 
        status: 'Linear hyperplane directly separates classes.', 
        color: 'text-emerald-800', 
        bg: 'bg-emerald-50 border-emerald-200' 
      };
    }
  };

  const currentProbeMetrics = getProbeMetrics();

  // Dynamic classifier descriptions for probe types
  const getProbeDescription = () => {
    if (probeType === 'linear') {
      return "As a linear classifier (hyperplane excluder), this instrument draws a single flat boundary (w^T x + b = 0). It excludes samples based purely on a linear combination of features, measuring only linearly separable signal while ignoring curved or concentric manifold structure.";
    } else if (probeType === 'kernel') {
      return "As a kernel classifier (nonlinear manifold excluder), this instrument projects features into an implicit higher-dimensional space K(x, x'). It excludes samples along curved or concentric boundaries, measuring complex nonlinear representation structure without forcing linear separability.";
    } else {
      return "As a spatial k-NN classifier (local neighborhood excluder), this instrument evaluates local feature density across k-nearest neighbors. It excludes samples based on spatial proximity in representation space, preserving local geometric topology regardless of global manifold curvature.";
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F4EB] text-stone-900 font-sans pb-20 selection:bg-amber-200 selection:text-stone-900">
      
      {/* Atelier Header Banner */}
      <header className="relative bg-[#FFFDF7] border-b-4 border-[#1E3A8A] pt-6 pb-8 px-4 sm:px-8 shadow-md overflow-hidden">
        
        {/* Subtle Draft Grid Texture */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.07] bg-[linear-gradient(to_right,#1e3a8a_1px,transparent_1px),linear-gradient(to_bottom,#1e3a8a_1px,transparent_1px)] bg-[size:20px_20px]"></div>
        
        <div className="max-w-6xl mx-auto relative z-10 space-y-4">
          
          {/* Top Breadcrumb & Return to Map Navigation */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              {onBack && (
                <button
                  onClick={onBack}
                  className="px-3 py-1.5 rounded-lg bg-[#1E3A8A] hover:bg-[#1D4ED8] text-white font-mono text-xs font-bold uppercase transition-all flex items-center gap-1.5 shadow-sm cursor-pointer"
                >
                  <ArrowLeft size={14} />
                  <span>World Map</span>
                </button>
              )}
              <span className="px-2.5 py-1 rounded bg-blue-100/80 text-[#1E3A8A] font-mono text-xs font-bold uppercase tracking-wider border border-blue-200">
                WORLD 8 • VALIDATION ATELIER
              </span>
            </div>

            <div className="flex items-center gap-2 bg-[#F4EFE6] px-3 py-1 rounded-lg border border-stone-300 text-xs font-mono text-stone-700">
              <DraftingCompassIcon className="text-amber-700" />
              <span>MEASUREMENT CURIOSITY INTROSPECTION</span>
            </div>
          </div>

          {/* Title Block */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-stone-200 pb-6">
            <div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-black tracking-tight text-stone-900 flex items-center gap-3">
                <span>The 80-20 Project</span>
                <span className="text-amber-800 text-2xl sm:text-3xl font-mono">📐</span>
              </h1>
              <p className="mt-2 text-stone-700 text-sm sm:text-base max-w-3xl leading-relaxed font-serif">
                A machine learning validation audit. Every observational choice, functionally is indistinct from a treatment because it constrains what is observable/measurable by the model and researchers — and those constraints are routinely left unquantified.
              </p>
            </div>

            {/* Links */}
            <div className="flex items-center gap-2 flex-wrap flex-shrink-0">
              <a 
                href="https://github.com/phinnphace/80-20" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#1E3A8A] hover:bg-[#1D4ED8] text-white font-mono text-xs font-bold uppercase tracking-wider transition-all shadow-md cursor-pointer"
              >
                <Github size={15} />
                <span>80-20 Repo</span>
                <ExternalLink size={13} />
              </a>

              <a 
                href="https://github.com/phinnphace/split-tester" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-amber-300 font-mono text-xs font-bold uppercase tracking-wider transition-all shadow-md cursor-pointer border border-stone-800"
              >
                <Github size={15} />
                <span>Split-Tester Repo</span>
                <ExternalLink size={13} />
              </a>
            </div>
          </div>

          {/* Workbench Tabs */}
          <div className="flex flex-wrap items-center gap-2 pt-2">
            {[
              { id: 'overview', label: 'Blueprint Overview', icon: FileText },
              { id: 'probe-sim', label: '1. Instrument Probe Simulator', icon: Sliders },
              { id: 'gap-sim', label: '2. Spatial GAP Collapse', icon: Layers },
              { id: 'split-sim', label: '3. Split Ratio Workbench', icon: Grid },
              { id: 'wheel', label: '4. Carnival Constraints Wheel', icon: DraftingCompassIcon },
              { id: 'artifacts', label: '5. Artifacts & Links', icon: Github },
            ].map((tab) => {
              const TabIcon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-mono font-bold uppercase transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#1E3A8A] text-white shadow-md font-extrabold scale-105'
                      : 'bg-white hover:bg-stone-100 text-stone-700 border border-stone-300'
                  }`}
                >
                  <TabIcon size={14} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

        </div>
      </header>

      {/* Main Workbench */}
      <main className="max-w-6xl mx-auto px-4 sm:px-8 mt-8 space-y-8">
        
        {/* TAB 0: OVERVIEW */}
        {activeTab === 'overview' && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* Genesis Hero Card */}
            <div className="bg-[#FFFDF7] border-2 border-stone-300 rounded-2xl p-6 sm:p-8 shadow-md relative overflow-hidden">
              <div className="absolute -right-10 -bottom-10 opacity-10 text-stone-900 pointer-events-none">
                <TSquareIcon className="w-80 h-80" />
              </div>

              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-amber-100 border border-amber-300 flex items-center justify-center text-amber-800">
                  <DraftingCompassIcon className="w-6 h-6" />
                </div>
                <div>
                  <span className="font-mono text-xs text-amber-800 font-bold uppercase tracking-wider block">
                    FOUNDATIONAL Framework
                  </span>
                  <h2 className="text-xl sm:text-2xl font-serif font-bold text-stone-900">
                    The Emergence of The 80-20 Project
                  </h2>
                </div>
              </div>

              {/* Precise text requested by user */}
              <div className="space-y-4 text-stone-800 text-sm sm:text-base leading-relaxed border-l-4 border-[#1E3A8A] pl-5 py-3 bg-[#F9F7F1] rounded-r-xl font-serif shadow-inner">
                <p className="font-bold text-stone-900 text-base sm:text-lg">
                  Welcome. You have found yourself at the genesis. Here a seed is planted. The seed will be nurtured. The seedling will be tended. From this will spring better measures for all.
                </p>
                <div className="pt-2 space-y-1 text-stone-800 font-serif">
                  <p className="font-bold text-stone-900 uppercase font-mono text-xs tracking-wider mb-2 text-[#1E3A8A]">
                    Here in the 80-20 project we believe:
                  </p>
                  <ul className="space-y-1.5 pl-2">
                    <li className="flex items-center gap-2 font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-700"></span>
                      <span>Everyone counts. We count everyone.</span>
                    </li>
                    <li className="flex items-center gap-2 font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-700"></span>
                      <span>Benchmarks are not synonyms for results, or findings.</span>
                    </li>
                    <li className="flex items-center gap-2 font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-700"></span>
                      <span>We do not confuse outcomes for methods.</span>
                    </li>
                    <li className="flex items-center gap-2 font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-700"></span>
                      <span>How we do anything is how we do everything</span>
                    </li>
                    <li className="flex items-center gap-2 font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-700"></span>
                      <span>Ends do not justify means</span>
                    </li>
                    <li className="flex items-center gap-2 font-medium text-[#1E3A8A] font-semibold">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#1E3A8A]"></span>
                      <span>Infrastructure friction is the finding: Weeks spent battling CUDA, DNS, and path errors force researchers to accept unexamined defaults (like 80/20) out of exhaustion.</span>
                    </li>
                    <li className="flex items-center gap-2 font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-700"></span>
                      <span>We are unafraid.</span>
                    </li>
                    <li className="flex items-center gap-2 font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-700"></span>
                      <span>We do not play small.</span>
                    </li>
                    <li className="flex items-center gap-2 font-bold text-stone-900 pt-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#1E3A8A]"></span>
                      <span>Everyone is welcome.</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Instruments */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <div className="bg-[#F4EFE6] p-4 rounded-xl border border-stone-300 space-y-2">
                  <div className="flex items-center gap-2 text-[#1E3A8A] font-mono text-xs font-bold uppercase">
                    <Sliders size={16} /> 1. Probe Capacity
                  </div>
                  <p className="text-xs text-stone-700 leading-normal font-sans">
                    Linear probes create false negatives on curved or concentric feature manifolds.
                  </p>
                </div>

                <div className="bg-[#F4EFE6] p-4 rounded-xl border border-stone-300 space-y-2">
                  <div className="flex items-center gap-2 text-[#1E3A8A] font-mono text-xs font-bold uppercase">
                    <Layers size={16} /> 2. Spatial Collapse
                  </div>
                  <p className="text-xs text-stone-700 leading-normal font-sans">
                    Global average pooling strips spatial layout before feature evaluation begins.
                  </p>
                </div>

                <div className="bg-[#F4EFE6] p-4 rounded-xl border border-stone-300 space-y-2">
                  <div className="flex items-center gap-2 text-[#1E3A8A] font-mono text-xs font-bold uppercase">
                    <Grid size={16} /> 3. Partition Bias
                  </div>
                  <p className="text-xs text-stone-700 leading-normal font-sans">
                    Arbitrary 80/20 dataset splits introduce unmonitored sample variance.
                  </p>
                </div>
              </div>
            </div>

            {/* Nesting Doll Model Card */}
            <div className="bg-[#FFFDF7] border-2 border-amber-300 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
              <div className="flex items-center justify-between flex-wrap gap-4 border-b border-stone-200 pb-4">
                <div>
                  <span className="text-xs font-mono text-amber-800 font-bold uppercase tracking-wider block">
                    A Different PERSPECTIVE
                  </span>
                  <h3 className="text-lg sm:text-xl font-serif font-bold text-stone-900 flex items-center gap-2">
                    <Sparkles size={18} className="text-amber-700" />
                     Observational Awareness
                  </h3>
                </div>

                {/* Layer Selector */}
                <div className="flex items-center gap-1 bg-[#F4EFE6] p-1 rounded-xl border border-stone-300">
                  {(['outer', 'middle', 'inner'] as const).map((layer) => (
                    <button
                      key={layer}
                      onClick={() => setNestLayer(layer)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold uppercase transition-all cursor-pointer ${
                        nestLayer === layer
                          ? 'bg-[#1E3A8A] text-white shadow-sm'
                          : 'text-stone-600 hover:text-stone-900'
                      }`}
                    >
                      {layer === 'outer' ? '1. Surface Data' : layer === 'middle' ? '2. Couch Cushions' : '3. The Unseen Join'}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-[#F9F7F1] p-5 rounded-xl border border-stone-200 space-y-3">
                {nestLayer === 'outer' && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-[#1E3A8A] font-mono text-xs font-bold uppercase">
                      <span>LEVEL 1: Top level </span>
                    </div>
                    <p className="text-sm text-stone-800 leading-relaxed font-serif">
                      Accepting reported top-1 accuracy numbers from standard 80/20 train/test splits without questioning the measurement instruments or data reductions involved.
                    </p>
                  </div>
                )}

                {nestLayer === 'middle' && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-[#1E3A8A] font-mono text-xs font-bold uppercase">
                      <span>LEVEL 2: UNDER THE COUCH CUSHIONS</span>
                    </div>
                    <p className="text-sm text-stone-800 leading-relaxed font-serif">
                      Checking where data disappears between administrative seams: linear probes that report "no signal" on nonlinear manifolds, and spatial pooling that erases local signal before measurement.
                    </p>
                  </div>
                )}

                {nestLayer === 'inner' && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-[#1E3A8A] font-mono text-xs font-bold uppercase">
                      <span>LEVEL 3: THE UNSEEN JOIN</span>
                    </div>
                    <p className="text-sm text-stone-800 leading-relaxed font-serif">
                      Recognizing that unexamined to 'this is how we do it' prevents researchers from testing and evaluating their own assumptions. 
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Launch Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                onClick={() => setActiveTab('probe-sim')}
                className="p-5 rounded-2xl bg-[#FFFDF7] border-2 border-stone-300 hover:border-[#1E3A8A] text-left transition-all cursor-pointer group space-y-2 shadow-sm"
              >
                <div className="flex items-center justify-between text-[#1E3A8A] font-mono text-xs font-bold uppercase">
                  <span className="flex items-center gap-2">
                    <Sliders size={16} /> Instrument Probe Simulator
                  </span>
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </div>
                <h4 className="text-base font-bold text-stone-900">Linear vs. Kernel Probes</h4>
                <p className="text-xs text-stone-600 font-serif">Test how linear classifiers fail on curved manifolds while kernel probes detect signals.</p>
              </button>

              <button
                onClick={() => setActiveTab('gap-sim')}
                className="p-5 rounded-2xl bg-[#FFFDF7] border-2 border-stone-300 hover:border-[#1E3A8A] text-left transition-all cursor-pointer group space-y-2 shadow-sm"
              >
                <div className="flex items-center justify-between text-[#1E3A8A] font-mono text-xs font-bold uppercase">
                  <span className="flex items-center gap-2">
                    <Layers size={16} /> Spatial GAP Collapse
                  </span>
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </div>
                <h4 className="text-base font-bold text-stone-900">Spatial Token Inspector</h4>
                <p className="text-xs text-stone-600 font-serif">Inspect how Global Average Pooling collapses 49 patch tokens into a single mean vector.</p>
              </button>
            </div>
          </motion.div>
        )}

        {/* TAB 1: INSTRUMENT PROBE SIMULATOR */}
        {activeTab === 'probe-sim' && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Back Breadcrumb */}
            <button
              onClick={() => setActiveTab('overview')}
              className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#1E3A8A] hover:underline cursor-pointer"
            >
              <ArrowLeft size={14} />
              <span>Back to Blueprint Overview</span>
            </button>

            <div className="bg-[#FFFDF7] border-2 border-stone-300 rounded-2xl p-6 sm:p-8 shadow-md space-y-6">
              
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-200 pb-4">
                <div>
                  <span className="text-xs font-mono text-[#1E3A8A] font-bold uppercase block">
                    INTERACTIVE EXPERIMENT 1
                  </span>
                  <h2 className="text-2xl font-serif font-bold text-stone-900 flex items-center gap-2">
                    Instrument Probe Capacity Simulator
                  </h2>
                </div>

                {/* Subspace Chooser */}
                <div className="flex items-center gap-2 bg-[#F4EFE6] p-1.5 rounded-xl border border-stone-300">
                  <span className="text-[11px] font-mono text-stone-600 px-2 font-bold uppercase">Subspace:</span>
                  {[
                    { id: 'concentric', label: 'Concentric Rings' },
                    { id: 'moons', label: 'Intertwined Moons' },
                    { id: 'linear', label: 'Linearly Separable' }
                  ].map((sub) => (
                    <button
                      key={sub.id}
                      onClick={() => setDataSubspace(sub.id as any)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold uppercase cursor-pointer ${
                        dataSubspace === sub.id ? 'bg-[#1E3A8A] text-white shadow-sm' : 'text-stone-700 hover:text-stone-900'
                      }`}
                    >
                      {sub.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Probe Type Selection */}
              <div className="space-y-2">
                <label className="text-xs font-mono text-stone-700 uppercase font-bold block">
                  Select Measurement Instrument (Probe Type):
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { id: 'linear', name: 'Linear Probe (Hyperplane Excluder)', desc: 'Fits linear boundary w·x + b = 0' },
                    { id: 'kernel', name: 'Polynomial/RBF Kernel Probe', desc: 'Nonlinear manifold classifier' },
                    { id: 'spatial', name: 'K-NN Spatial Density Probe', desc: 'Local neighborhood classifier' }
                  ].map((p) => (
                    <button
                      key={p.id}
                      onClick={() => setProbeType(p.id as any)}
                      className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                        probeType === p.id 
                          ? 'bg-blue-50 border-[#1E3A8A] text-[#1E3A8A] ring-2 ring-blue-200 shadow-sm'
                          : 'bg-white border-stone-300 text-stone-700 hover:bg-stone-50'
                      }`}
                    >
                      <div className="font-mono text-xs font-bold uppercase text-stone-900 mb-1">{p.name}</div>
                      <div className="text-[11px] text-stone-600 font-serif">{p.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Graphical Visualizer Canvas */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center bg-[#F9F7F1] p-6 rounded-2xl border border-stone-300 relative">
                
                {/* Draft Canvas */}
                <div className="lg:col-span-7 flex flex-col items-center">
                  <div className="w-full max-w-sm aspect-square bg-[#FFFDF7] rounded-xl border-2 border-stone-400 p-4 relative flex items-center justify-center overflow-hidden shadow-inner">
                    
                    {/* Grid overlay */}
                    <div className="absolute inset-0 opacity-15 bg-[linear-gradient(to_right,#1e3a8a_1px,transparent_1px),linear-gradient(to_bottom,#1e3a8a_1px,transparent_1px)] bg-[size:16px_16px]"></div>

                    {dataSubspace === 'concentric' && (
                      <div className="relative w-full h-full flex items-center justify-center">
                        {/* Class A Inner Ring */}
                        <div className="w-20 h-20 rounded-full bg-amber-200/80 border-2 border-amber-600 flex items-center justify-center z-10">
                          <span className="text-[10px] font-mono text-amber-900 font-bold">Class A</span>
                        </div>
                        {/* Class B Outer Ring */}
                        <div className="absolute w-52 h-52 rounded-full border-4 border-dashed border-blue-500 flex items-center justify-center">
                          <span className="absolute top-2 text-[10px] font-mono text-blue-800 font-bold">Class B (Outer Ring)</span>
                        </div>

                        {/* Probe Boundary */}
                        {probeType === 'linear' && (
                          <div className="absolute w-full h-1 bg-red-600 rotate-45 flex items-center justify-end pr-2 z-20 shadow-md">
                            <span className="text-[9px] font-mono text-white bg-red-800 px-1 rounded">Linear Hyperplane (Fails)</span>
                          </div>
                        )}

                        {probeType === 'kernel' && (
                          <div className="absolute w-36 h-36 rounded-full border-2 border-emerald-600 bg-emerald-100/60 flex items-center justify-center z-20 shadow-sm">
                            <span className="text-[9px] font-mono text-emerald-900 font-bold bg-white px-1.5 py-0.5 rounded border border-emerald-400">RBF Kernel Boundary</span>
                          </div>
                        )}

                        {probeType === 'spatial' && (
                          <div className="absolute inset-6 border-2 border-blue-500 rounded-2xl bg-blue-100/50 flex items-center justify-center z-20">
                            <span className="text-[9px] font-mono text-blue-900 font-bold bg-white px-1.5 py-0.5 rounded border border-blue-300">k-NN Density Boundary</span>
                          </div>
                        )}
                      </div>
                    )}

                    {dataSubspace === 'moons' && (
                      <div className="relative w-full h-full flex items-center justify-center">
                        <svg className="w-full h-full" viewBox="0 0 100 100">
                          {/* Upper Moon Class A */}
                          <path d="M 20,40 A 25,25 0 0,1 70,40" fill="none" stroke="#D97706" strokeWidth="12" strokeLinecap="round" />
                          {/* Lower Moon Class B */}
                          <path d="M 30,60 A 25,25 0 0,0 80,60" fill="none" stroke="#1D4ED8" strokeWidth="12" strokeLinecap="round" />

                          {/* Boundary Line */}
                          {probeType === 'linear' ? (
                            <line x1="10" y1="90" x2="90" y2="10" stroke="#DC2626" strokeWidth="3" strokeDasharray="4 2" />
                          ) : (
                            <path d="M 15,50 Q 50,40 85,50" fill="none" stroke="#059669" strokeWidth="3" />
                          )}
                        </svg>
                      </div>
                    )}

                    {dataSubspace === 'linear' && (
                      <div className="relative w-full h-full flex items-center justify-between p-6">
                        <div className="w-20 h-20 bg-amber-100 border-2 border-amber-600 rounded-lg flex items-center justify-center">
                          <span className="text-[10px] font-mono text-amber-900 font-bold">Class A</span>
                        </div>
                        <div className="w-20 h-20 bg-blue-100 border-2 border-blue-600 rounded-lg flex items-center justify-center">
                          <span className="text-[10px] font-mono text-blue-900 font-bold">Class B</span>
                        </div>
                        <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-emerald-600"></div>
                      </div>
                    )}

                  </div>
                </div>

                {/* Readout Dashboard */}
                <div className="lg:col-span-5 space-y-4">
                  <div className={`p-5 rounded-xl border ${currentProbeMetrics.bg} space-y-3`}>
                    <span className="text-[10px] font-mono text-stone-600 uppercase font-bold block">
                      INSTRUMENT CAPACITY DIAGNOSTIC
                    </span>

                    <div>
                      <div className={`text-sm font-mono font-black uppercase ${currentProbeMetrics.color}`}>
                        {currentProbeMetrics.capacityMode}
                      </div>
                      <div className="text-xs font-mono font-bold text-stone-800 mt-1">
                        {currentProbeMetrics.status}
                      </div>
                    </div>

                    {/* DYNAMIC PROBE CLASSIFIER DESCRIPTION */}
                    <div className="text-xs text-stone-700 leading-relaxed font-serif pt-2 border-t border-stone-200 space-y-1">
                      <span className="font-mono text-[10px] font-bold text-stone-900 uppercase block">
                        Instrument Mechanism:
                      </span>
                      <p>{getProbeDescription()}</p>
                    </div>
                  </div>
                </div>

              </div>

            </div>
          </motion.div>
        )}

        {/* TAB 2: GLOBAL AVERAGE POOLING (GAP) SPATIAL COLLAPSE */}
        {activeTab === 'gap-sim' && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Back Breadcrumb */}
            <button
              onClick={() => setActiveTab('overview')}
              className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#1E3A8A] hover:underline cursor-pointer"
            >
              <ArrowLeft size={14} />
              <span>Back to Blueprint Overview</span>
            </button>

            <div className="bg-[#FFFDF7] border-2 border-stone-300 rounded-2xl p-6 sm:p-8 shadow-md space-y-6">
              
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-200 pb-4">
                <div>
                  <span className="text-xs font-mono text-[#1E3A8A] font-bold uppercase block">
                    INTERACTIVE EXPERIMENT 2
                  </span>
                  <h2 className="text-2xl font-serif font-bold text-stone-900 flex items-center gap-2">
                    Global Average Pooling (GAP) Spatial Token Inspector
                  </h2>
                </div>

                <button
                  onClick={() => setGapEnabled(!gapEnabled)}
                  className={`px-4 py-2.5 rounded-xl text-xs font-mono font-bold uppercase transition-all cursor-pointer border shadow-md flex items-center gap-2 ${
                    gapEnabled 
                      ? 'bg-amber-600 hover:bg-amber-700 text-white border-amber-700 ring-2 ring-amber-300' 
                      : 'bg-emerald-700 hover:bg-emerald-800 text-white border-emerald-800'
                  }`}
                >
                  <MousePointerClick size={16} />
                  <span>{gapEnabled ? '⚠️ GAP Active (Mean Pooled)' : '✅ Spatial Token Grid Intact'}</span>
                </button>
              </div>

              {/* Clean text without raw LaTeX */}
              <p className="text-xs sm:text-sm text-stone-700 leading-relaxed bg-[#F9F7F1] p-4 rounded-xl border border-stone-200 font-serif">
                The decision to use global average pooling (GAP) as the feature reduction collapses all spatial information <strong className="font-mono text-[#1E3A8A]">(H × W × C → 1 × 1 × C)</strong> before measurement, diluting localized signal across empty background patches.
              </p>

              {/* Explicit Callout Banner */}
              <div className="bg-amber-100 border-2 border-amber-400 p-4 rounded-xl text-stone-900 text-xs font-mono font-bold flex items-start sm:items-center gap-3 shadow-sm">
                <span className="text-2xl flex-shrink-0">👉</span>
                <div>
                  <span className="text-amber-900 uppercase font-black block text-[11px] tracking-wider">
                    INTERACTIVE CALLOUT:
                  </span>
                  <span className="font-sans font-medium text-stone-800">
                    Click the <strong className="text-amber-950 font-black bg-amber-200 px-1.5 py-0.5 rounded border border-amber-400">"⚠️ GAP Active / ✅ Spatial Token Grid Intact"</strong> button above to toggle between collapsed mean-pooling and raw 49-patch token activation!
                  </span>
                </div>
              </div>

              {/* Spatial Patch Token Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center bg-[#F4EFE6] p-6 rounded-2xl border border-stone-300">
                
                {/* 7x7 Patch Token Canvas */}
                <div className="space-y-3 text-center">
                  <span className="text-xs font-mono text-stone-700 uppercase font-bold block">
                    Input Feature Map: 7×7 Token Grid (Click Token to Inspect)
                  </span>

                  <div className="grid grid-cols-7 gap-1.5 p-3 bg-[#FFFDF7] rounded-xl border border-stone-300 max-w-xs mx-auto shadow-inner">
                    {Array.from({ length: 49 }).map((_, idx) => {
                      const isCenterObject = [16, 17, 18, 23, 24, 25, 30, 31, 32].includes(idx);
                      const isSelected = selectedTokenIdx === idx;

                      return (
                        <button
                          key={idx}
                          onClick={() => setSelectedTokenIdx(idx)}
                          className={`aspect-square rounded flex items-center justify-center text-[9px] font-mono transition-all cursor-pointer ${
                            isSelected
                              ? 'ring-2 ring-[#1E3A8A] scale-110 z-10'
                              : ''
                          } ${
                            gapEnabled
                              ? 'bg-stone-200 text-stone-600 border border-stone-300'
                              : isCenterObject
                              ? 'bg-amber-400 text-amber-950 font-black border border-amber-500 shadow-sm'
                              : 'bg-stone-100 text-stone-400 border border-stone-200'
                          }`}
                        >
                          {isCenterObject && !gapEnabled ? '⚡' : idx}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Token Readout */}
                <div className="space-y-4">
                  <span className="text-xs font-mono text-stone-700 uppercase font-bold block">
                    Token Inspection Readout:
                  </span>

                  {selectedTokenIdx !== null && (
                    <div className="bg-[#FFFDF7] p-4 rounded-xl border border-stone-300 space-y-2">
                      <div className="text-xs font-mono font-bold text-[#1E3A8A]">
                        Patch Token #{selectedTokenIdx} (Coord: [{Math.floor(selectedTokenIdx / 7)}, {selectedTokenIdx % 7}])
                      </div>
                      <div className="text-xs text-stone-700">
                        {[16, 17, 18, 23, 24, 25, 30, 31, 32].includes(selectedTokenIdx) ? (
                          <span className="text-amber-800 font-bold">High Discriminative Object Activation (Activation = 0.94)</span>
                        ) : (
                          <span className="text-stone-500">Background Noise / Empty Patch (Activation = 0.02)</span>
                        )}
                      </div>

                      {gapEnabled ? (
                        <p className="text-xs text-red-700 pt-2 border-t border-stone-200 font-serif">
                          After Global Average Pooling, spatial token coordinates are collapsed (H × W × C → 1 × 1 × C). All 49 spatial patch activations are mean-averaged into a single vector, diluting localized feature signals across background patches.
                        </p>
                      ) : (
                        <p className="text-xs text-emerald-800 pt-2 border-t border-stone-200 font-serif">
                          Spatial patch representation intact. Downstream classifiers or probes retain access to localized coordinate feature vectors.
                        </p>
                      )}
                    </div>
                  )}
                </div>

              </div>

            </div>
          </motion.div>
        )}

        {/* TAB 3: SPLIT RATIO WORKBENCH */}
        {activeTab === 'split-sim' && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Back Breadcrumb */}
            <button
              onClick={() => setActiveTab('overview')}
              className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#1E3A8A] hover:underline cursor-pointer"
            >
              <ArrowLeft size={14} />
              <span>Back to Blueprint Overview</span>
            </button>

            <div className="bg-[#FFFDF7] border-2 border-stone-300 rounded-2xl p-6 sm:p-8 shadow-md space-y-6">
              
              {/* Split Ratio Workbench Header */}
              <div className="border-b border-stone-200 pb-4 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <span className="text-xs font-mono text-[#1E3A8A] font-bold uppercase block">
                    INTERACTIVE EXPERIMENT 3
                  </span>
                  <h2 className="text-2xl font-serif font-bold text-stone-900 flex items-center gap-2">
                    Train / Test Split Ratio Workbench
                  </h2>
                </div>

                <a 
                  href="https://go.dataacorns.com/80-20/splits" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 rounded-xl bg-[#1E3A8A] hover:bg-[#1D4ED8] text-white font-mono text-xs font-bold uppercase transition-all flex items-center gap-1.5 shadow-sm"
                >
                  <span>Launch Split App</span>
                  <ExternalLink size={14} />
                </a>
              </div>

              {/* Core Thesis Callout: Infrastructure Friction as the Finding */}
              <div className="p-5 bg-amber-50 rounded-2xl border-2 border-amber-300 space-y-2">
                <div className="flex items-center gap-2 text-amber-950 font-mono text-xs font-bold uppercase tracking-wider">
                  <span className="px-2 py-0.5 rounded bg-amber-200 text-amber-950">CRITICAL STRUCTURAL THESIS</span>
                  <span>The Infrastructure Friction IS the Finding</span>
                </div>
                <p className="text-xs sm:text-sm font-serif text-stone-900 leading-relaxed">
                  Fighting DNS errors, CUDA incompatibility, file format bugs, and path mismatches for weeks before running an experiment is not a distraction from the scientific result — <strong>it is the primary reason why unexamined defaults proliferate</strong>. When researchers expend 95% of their energy surviving infrastructure friction, they naturally accept SOP defaults like 80/20 and move on. The data below proves why accepting that default distorts the truth.
                </p>
              </div>

              {/* Split Selector Buttons */}
              <div className="space-y-4 bg-[#F9F7F1] p-6 rounded-2xl border border-stone-300">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-mono text-stone-500 uppercase font-bold block">ACTIVE EXPERIMENTAL PARTITION</span>
                    <label className="text-sm font-mono text-stone-900 uppercase font-bold">
                      Selected Train/Test Split: <span className="text-[#1E3A8A] font-black text-base">{trainRatio}/{100 - trainRatio}</span>
                    </label>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    {[50, 60, 70, 80, 90].map((r) => (
                      <button
                        key={r}
                        onClick={() => setTrainRatio(r)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                          trainRatio === r 
                            ? 'bg-[#1E3A8A] text-white shadow ring-2 ring-blue-300' 
                            : 'bg-stone-200 text-stone-700 hover:bg-stone-300'
                        }`}
                      >
                        {r}/{100 - r}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Progress Visual Bar */}
                <div className="h-6 rounded-lg overflow-hidden flex font-mono text-xs font-bold text-white shadow-sm">
                  <div 
                    style={{ width: `${trainRatio}%` }} 
                    className="bg-[#1E3A8A] flex items-center justify-center transition-all"
                  >
                    TRAIN: {trainRatio}%
                  </div>
                  <div 
                    style={{ width: `${100 - trainRatio}%` }} 
                    className="bg-amber-600 flex items-center justify-center transition-all"
                  >
                    TEST: {100 - trainRatio}%
                  </div>
                </div>
              </div>

              {/* Active Split Selected Metrics Comparison Cards */}
              {(() => {
                const currentRow = REAL_SPLIT_MATRIX_DATA.find(d => d.trainRatio === trainRatio) || REAL_SPLIT_MATRIX_DATA[3];
                return (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Condition A Card */}
                      <div className="bg-[#F8F6F0] p-5 rounded-2xl border-2 border-stone-300 space-y-3">
                        <div className="flex items-center justify-between border-b border-stone-200 pb-2">
                          <span className="text-xs font-mono font-bold text-stone-700 uppercase">Condition A • Isolated Model</span>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-stone-200 text-stone-800 font-bold">Isolated Training</span>
                        </div>
                        <div className="grid grid-cols-3 gap-2 font-mono text-center">
                          <div className="bg-white p-2.5 rounded-xl border border-stone-200">
                            <span className="text-[10px] text-stone-500 block uppercase font-bold">A Val</span>
                            <span className="text-base font-black text-stone-900">{currentRow.aVal}%</span>
                          </div>
                          <div className="bg-white p-2.5 rounded-xl border border-stone-200">
                            <span className="text-[10px] text-stone-500 block uppercase font-bold">A CASIA</span>
                            <span className="text-base font-black text-[#1E3A8A]">{currentRow.aCasia}%</span>
                          </div>
                          <div className="bg-white p-2.5 rounded-xl border border-stone-200">
                            <span className="text-[10px] text-stone-500 block uppercase font-bold">A CalliBench</span>
                            <span className="text-base font-black text-amber-800">{currentRow.aCalli}%</span>
                          </div>
                        </div>
                      </div>

                      {/* Condition B Card */}
                      <div className="bg-[#EEF2FF] p-5 rounded-2xl border-2 border-blue-200 space-y-3">
                        <div className="flex items-center justify-between border-b border-blue-200 pb-2">
                          <span className="text-xs font-mono font-bold text-[#1E3A8A] uppercase">Condition B • Contextual Model</span>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-100 text-[#1E3A8A] font-bold">Contextual Training</span>
                        </div>
                        <div className="grid grid-cols-3 gap-2 font-mono text-center">
                          <div className="bg-white p-2.5 rounded-xl border border-blue-200">
                            <span className="text-[10px] text-stone-500 block uppercase font-bold">B Val</span>
                            <span className="text-base font-black text-emerald-700">{currentRow.bVal}%</span>
                          </div>
                          <div className="bg-white p-2.5 rounded-xl border border-blue-200">
                            <span className="text-[10px] text-stone-500 block uppercase font-bold">B CASIA</span>
                            <span className={`text-base font-black ${currentRow.bCasia < 50 ? 'text-red-700' : 'text-emerald-700'}`}>
                              {currentRow.bCasia}%
                            </span>
                          </div>
                          <div className="bg-white p-2.5 rounded-xl border border-blue-200">
                            <span className="text-[10px] text-stone-500 block uppercase font-bold">B CalliBench</span>
                            <span className="text-base font-black text-stone-700">{currentRow.bCalli}%</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Active Split Takeaway Callout */}
                    <div className="p-4 bg-amber-50 rounded-xl border border-amber-300 text-amber-900 flex items-start gap-3">
                      <div className="p-1.5 rounded-lg bg-amber-200/80 text-amber-900 font-mono font-black text-xs shrink-0 mt-0.5">
                        {currentRow.split}
                      </div>
                      <p className="text-xs font-serif leading-relaxed">
                        <span className="font-bold font-mono text-[11px] uppercase block mb-0.5 text-amber-950">Active Partition Finding:</span>
                        {currentRow.takeaway}
                      </p>
                    </div>
                  </div>
                );
              })()}

              {/* Full Split x Transfer Matrix Table */}
              <div className="space-y-3 pt-4 border-t border-stone-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-mono font-bold text-stone-900 uppercase tracking-wide">
                    Full Experimental Split × Transfer Matrix
                  </h3>
                  <span className="text-[10px] font-mono text-stone-500">Real Paper Empirical Dataset</span>
                </div>

                <div className="overflow-x-auto rounded-xl border border-stone-300 shadow-sm">
                  <table className="w-full text-xs font-mono text-left bg-white">
                    <thead className="bg-[#F4EFE6] text-stone-800 uppercase border-b border-stone-300">
                      <tr>
                        <th className="p-3 border-r border-stone-300 font-bold">Split</th>
                        <th className="p-3 border-r border-stone-300 text-center bg-stone-100/80">A Val</th>
                        <th className="p-3 border-r border-stone-300 text-center bg-stone-100/80">A CASIA</th>
                        <th className="p-3 border-r border-stone-300 text-center bg-stone-100/80">A Calli</th>
                        <th className="p-3 border-r border-stone-300 text-center bg-blue-50">B Val</th>
                        <th className="p-3 border-r border-stone-300 text-center bg-blue-50">B CASIA</th>
                        <th className="p-3 border-r border-stone-300 text-center bg-blue-50">B Calli</th>
                        <th className="p-3">Summary Finding</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-200">
                      {REAL_SPLIT_MATRIX_DATA.map((row) => {
                        const isActive = row.trainRatio === trainRatio;
                        return (
                          <tr 
                            key={row.split} 
                            onClick={() => setTrainRatio(row.trainRatio)}
                            className={`cursor-pointer transition-colors ${
                              isActive ? 'bg-blue-50/90 font-bold text-blue-950 ring-1 ring-blue-400' : 'hover:bg-stone-50 text-stone-700'
                            }`}
                          >
                            <td className="p-3 border-r border-stone-200 font-bold text-stone-900">
                              {row.split} {isActive && <span className="text-[9px] bg-blue-600 text-white px-1 py-0.5 rounded ml-1">ACTIVE</span>}
                            </td>
                            <td className="p-3 border-r border-stone-200 text-center">{row.aVal}%</td>
                            <td className="p-3 border-r border-stone-200 text-center">{row.aCasia}%</td>
                            <td className="p-3 border-r border-stone-200 text-center">{row.aCalli}%</td>
                            <td className="p-3 border-r border-stone-200 text-center font-bold text-emerald-800">{row.bVal}%</td>
                            <td className={`p-3 border-r border-stone-200 text-center font-bold ${row.bCasia < 50 ? 'text-red-700 bg-red-50/50' : 'text-emerald-800'}`}>
                              {row.bCasia}%
                            </td>
                            <td className="p-3 border-r border-stone-200 text-center">{row.bCalli}%</td>
                            <td className="p-3 text-[11px] font-serif leading-tight text-stone-600">{row.takeaway}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Scientific Insights & Conclusions Section */}
              <div className="p-6 bg-[#F5F2EA] rounded-2xl border-2 border-stone-300 space-y-4">
                <h3 className="text-base font-serif font-bold text-stone-900 flex items-center gap-2">
                  <span>What This Finding Means</span>
                </h3>

                <div className="space-y-3 text-xs text-stone-800 font-serif leading-relaxed">
                  <p>
                    <strong className="font-mono text-stone-900">1. The split ratio massively affects transfer performance.</strong> Condition A&apos;s CASIA transfer more than doubled (34.3% → 69.5%) just by changing from 80/20 to 90/10. Condition B&apos;s CASIA transfer nearly quadrupled (26.6% → 98.3%) by switching from 80/20 to 60/40. These are not minor variations — they represent qualitative changes in experimental conclusions.
                  </p>

                  <p>
                    <strong className="font-mono text-stone-900">2. Condition B at 60/40 achieves the best of both worlds.</strong> 95.7% internal validation AND 98.3% CASIA transfer. The contextual model, when given the right split, transfers almost perfectly to isolated character recognition.
                  </p>

                  <p>
                    <strong className="font-mono text-stone-900">3. The 80/20 default was a misleading artifact.</strong> At 80/20, Condition B&apos;s CASIA transfer was 26.6% — looking terrible. But at 50/50, 60/40, 70/30, and 90/10, it is near-perfect (98.3%–100%). The original conclusion that &quot;contextual training doesn&apos;t transfer&quot; was purely an artifact of the arbitrarily chosen 80/20 split.
                  </p>

                  <p>
                    <strong className="font-mono text-stone-900">4. CalliBench is the persistent divide.</strong> Condition B fails on calligraphy (~5%) across splits regardless of ratio. That is a genuine domain gap that no split ratio can bridge.
                  </p>

                  <div className="p-4 bg-[#1E3A8A] text-white rounded-xl font-mono text-[11px] leading-relaxed space-y-1 mt-2">
                    <span className="font-bold text-amber-300 uppercase block text-[10px]">THE DEMO TAKEAWAY</span>
                    <p>
                      If a researcher runs this experiment at 80/20 and only reports internal validation, they conclude &quot;contextual training improves accuracy by 21 points.&quot; If they run at 70/30 and test on CASIA, they conclude &quot;contextual training transfers perfectly (100%) while isolated training fails (16.9%).&quot; If they run at 50/50 and test on CalliBench, they conclude &quot;isolated training is the only path to robust generalization.&quot;
                    </p>
                    <p className="text-stone-300 pt-1 italic">
                      All three conclusions come from the same data, same models, and same architecture. Only the split ratio and test metric changed.
                    </p>
                  </div>
                </div>
              </div>

              {/* CalliBench Transfer Matrix (Condition B - Condition A) */}
              <div className="space-y-3 pt-4 border-t border-stone-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-mono font-bold text-stone-900 uppercase tracking-wide">
                      CalliBench Transfer Difference Matrix (B - A)
                    </h3>
                    <p className="text-[11px] text-stone-600 font-serif">Positive = B outperforms A, Negative = A outperforms A</p>
                  </div>
                </div>

                <div className="overflow-x-auto rounded-xl border border-stone-300 shadow-sm">
                  <table className="w-full text-xs font-mono text-center bg-white">
                    <thead className="bg-[#F4EFE6] text-stone-800 uppercase border-b border-stone-300">
                      <tr>
                        <th className="p-2.5 border-r border-stone-300 text-left font-bold">A Split \ B Split</th>
                        <th className="p-2.5 border-r border-stone-300 font-bold">B = 50/50</th>
                        <th className="p-2.5 border-r border-stone-300 font-bold">B = 60/40</th>
                        <th className="p-2.5 border-r border-stone-300 font-bold">B = 70/30</th>
                        <th className="p-2.5 border-r border-stone-300 font-bold">B = 80/20</th>
                        <th className="p-2.5 font-bold">B = 90/10</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-200">
                      {CALLIBENCH_DIFF_TABLE.map((row) => (
                        <tr key={row.aSplit} className="hover:bg-stone-50">
                          <td className="p-2.5 border-r border-stone-200 font-bold text-left bg-stone-100/70 text-stone-900">
                            A = {row.aSplit}
                          </td>
                          <td className={`p-2.5 border-r border-stone-200 font-bold ${row.b50 < 0 ? 'text-red-700 bg-red-50/40' : 'text-emerald-700 bg-emerald-50/40'}`}>
                            {row.b50 > 0 ? `+${row.b50.toFixed(4)}` : row.b50.toFixed(4)}
                          </td>
                          <td className={`p-2.5 border-r border-stone-200 font-bold ${row.b60 < 0 ? 'text-red-700 bg-red-50/40' : 'text-emerald-700 bg-emerald-50/40'}`}>
                            {row.b60 > 0 ? `+${row.b60.toFixed(4)}` : row.b60.toFixed(4)}
                          </td>
                          <td className={`p-2.5 border-r border-stone-200 font-bold ${row.b70 < 0 ? 'text-red-700 bg-red-50/40' : 'text-emerald-700 bg-emerald-50/40'}`}>
                            {row.b70 > 0 ? `+${row.b70.toFixed(4)}` : row.b70.toFixed(4)}
                          </td>
                          <td className={`p-2.5 border-r border-stone-200 font-bold ${row.b80 < 0 ? 'text-red-700 bg-red-50/40' : 'text-emerald-700 bg-emerald-50/40'}`}>
                            {row.b80 > 0 ? `+${row.b80.toFixed(4)}` : row.b80.toFixed(4)}
                          </td>
                          <td className={`p-2.5 font-bold ${row.b90 < 0 ? 'text-red-700 bg-red-50/40' : 'text-emerald-700 bg-emerald-50/40'}`}>
                            {row.b90 > 0 ? `+${row.b90.toFixed(4)}` : row.b90.toFixed(4)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          </motion.div>
        )}

        {/* TAB 4: CARNIVAL SPLIT WHEEL */}
        {activeTab === 'wheel' && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Back Breadcrumb */}
            <button
              onClick={() => setActiveTab('overview')}
              className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#1E3A8A] hover:underline cursor-pointer"
            >
              <ArrowLeft size={14} />
              <span>Back to Blueprint Overview</span>
            </button>

            <div className="bg-[#FFFDF7] border-2 border-stone-300 rounded-2xl p-6 sm:p-8 shadow-md space-y-6">
              
              <div className="flex items-center justify-between flex-wrap gap-4 border-b border-stone-200 pb-4">
                <div>
                  <span className="text-xs font-mono text-[#1E3A8A] font-bold uppercase block">
                    INTERACTIVE MATRIX
                  </span>
                  <h2 className="text-2xl font-serif font-bold text-stone-900 flex items-center gap-2">
                    Carnival Split Wheel
                  </h2>
                </div>

                <a 
                  href="https://go.dataacorns.com/80-20/carnival-wheel" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 rounded-xl bg-[#1E3A8A] hover:bg-[#1D4ED8] text-white font-mono text-xs font-bold uppercase transition-all flex items-center gap-1.5 shadow-sm"
                >
                  <span>Launch Live Carnival Split Wheel App</span>
                  <ExternalLink size={14} />
                </a>
              </div>

              <p className="text-xs text-stone-600 font-mono">
                💡 Click any constraint mental model card below to inspect its SOP failure modes and audit protocols.
              </p>

              {/* Interactive Matrix Grid Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {CARNIVAL_CONSTRAINTS.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setSelectedConstraint(item)}
                    className="p-5 rounded-2xl bg-[#F9F7F1] border-2 border-stone-300 hover:border-[#1E3A8A] hover:bg-white text-left transition-all cursor-pointer group space-y-3 shadow-sm hover:shadow-md flex flex-col justify-between"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="px-2 py-0.5 rounded bg-blue-100 text-[#1E3A8A] font-mono text-[10px] font-bold border border-blue-200">
                          CONSTRAINT #{item.num}
                        </span>
                        <Info size={16} className="text-stone-400 group-hover:text-[#1E3A8A] transition-colors" />
                      </div>

                      <h4 className="text-base font-bold text-stone-900 group-hover:text-[#1E3A8A] transition-colors">
                        {item.title}
                      </h4>
                      <p className="text-xs font-mono text-amber-800 font-bold">{item.subtitle}</p>
                      <p className="text-xs text-stone-600 line-clamp-2 font-serif">{item.failureMode}</p>
                    </div>

                    <div className="pt-2 border-t border-stone-200 flex items-center justify-between text-[11px] font-mono text-[#1E3A8A] font-bold">
                      <span>Inspect Mental Model</span>
                      <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </button>
                ))}
              </div>

            </div>
          </motion.div>
        )}

        {/* TAB 5: ARTIFACTS & LINKS */}
        {activeTab === 'artifacts' && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Back Breadcrumb */}
            <button
              onClick={() => setActiveTab('overview')}
              className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#1E3A8A] hover:underline cursor-pointer"
            >
              <ArrowLeft size={14} />
              <span>Back to Blueprint Overview</span>
            </button>

            <div className="bg-[#FFFDF7] border-2 border-stone-300 rounded-2xl p-6 sm:p-8 shadow-md space-y-6">
              
              <div className="border-b border-stone-200 pb-4">
                <span className="text-xs font-mono text-[#1E3A8A] font-bold uppercase block">
                  RESOURCE ARCHIVE
                </span>
                <h2 className="text-2xl font-serif font-bold text-stone-900 flex items-center gap-2">
                  Project Code, Repositories, Papers & Applications
                </h2>
              </div>

              {/* Artifacts List */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {artifacts.map((art, idx) => {
                  const ArtIcon = art.icon;
                  return (
                    <a
                      key={idx}
                      href={art.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-5 rounded-2xl bg-[#F9F7F1] border-2 border-stone-300 hover:border-[#1E3A8A] hover:bg-white transition-all cursor-pointer group space-y-3 flex flex-col justify-between shadow-sm hover:shadow-md"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="px-2.5 py-0.5 rounded bg-blue-100 text-[#1E3A8A] font-mono text-[10px] font-bold uppercase border border-blue-200">
                            {art.badge}
                          </span>
                          <ExternalLink size={14} className="text-stone-400 group-hover:text-[#1E3A8A] transition-colors" />
                        </div>

                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 rounded-xl bg-stone-100 border border-stone-300 flex items-center justify-center text-[#1E3A8A] flex-shrink-0 group-hover:scale-105 transition-transform">
                            <ArtIcon size={20} />
                          </div>
                          <div>
                            <span className="text-[10px] font-mono text-stone-500 uppercase font-bold block">
                              {art.category}
                            </span>
                            <h3 className="text-base font-bold text-stone-900 group-hover:text-[#1E3A8A] transition-colors">
                              {art.title}
                            </h3>
                          </div>
                        </div>

                        <p className="text-xs text-stone-600 leading-relaxed font-serif">
                          {art.description}
                        </p>
                      </div>

                      <div className="pt-2 border-t border-stone-200 flex items-center justify-between text-[11px] font-mono text-[#1E3A8A] font-bold">
                        <span>Launch Resource</span>
                        <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                      </div>
                    </a>
                  );
                })}
              </div>

            </div>
          </motion.div>
        )}

      </main>

      {/* CARNIVAL CONFOUNDER INSPECTION MODAL */}
      <AnimatePresence>
        {selectedConstraint && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#FFFDF7] border-2 border-stone-400 rounded-2xl max-w-xl w-full p-6 shadow-2xl space-y-5 relative"
            >
              <button
                onClick={() => setSelectedConstraint(null)}
                className="absolute top-4 right-4 p-1.5 rounded-lg bg-stone-200 hover:bg-stone-300 text-stone-800 transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>

              <div className="space-y-1 pr-8">
                <span className="px-2.5 py-0.5 rounded bg-blue-100 text-[#1E3A8A] font-mono text-[10px] font-bold uppercase border border-blue-200">
                  CARNIVAL CONFOUNDER #{selectedConstraint.num}
                </span>
                <h3 className="text-xl font-serif font-bold text-stone-900">
                  {selectedConstraint.title}
                </h3>
                <p className="text-xs font-mono text-amber-800 font-bold">{selectedConstraint.subtitle}</p>
              </div>

              <div className="space-y-4 text-xs text-stone-800">
                <div className="p-3 bg-[#F4EFE6] rounded-xl border border-stone-300 space-y-1">
                  <span className="font-mono text-[10px] font-bold text-stone-500 uppercase block">Standard Operating Procedure (SOP) Assumption:</span>
                  <p className="font-serif">{selectedConstraint.sopAssumption}</p>
                </div>

                <div className="p-3 bg-red-50 rounded-xl border border-red-200 space-y-1 text-red-900">
                  <span className="font-mono text-[10px] font-bold text-red-700 uppercase block">Methodological Failure Mode:</span>
                  <p className="font-serif">{selectedConstraint.failureMode}</p>
                </div>

                <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 space-y-1 text-emerald-900">
                  <span className="font-mono text-[10px] font-bold text-emerald-800 uppercase block">Remedy & Audit Protocol:</span>
                  <p className="font-serif">{selectedConstraint.mitigation}</p>
                </div>

                <div className="p-2.5 bg-stone-900 text-amber-300 font-mono text-[11px] rounded-lg text-center font-bold">
                  {selectedConstraint.formulaOrDiagram}
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => setSelectedConstraint(null)}
                  className="px-4 py-2 rounded-xl bg-[#1E3A8A] text-white font-mono text-xs font-bold uppercase cursor-pointer"
                >
                  Close Inspection
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default The8020Project;
