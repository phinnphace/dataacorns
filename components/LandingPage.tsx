import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Compass, Map as MapIcon, Grid, Layers, Sparkles, BookOpen, 
  Database, ShieldAlert, Gift, GraduationCap, ClipboardList, 
  ChevronRight, ArrowRight, Eye, Volume2, VolumeX, Maximize2, 
  Search, Sliders, Boxes, Feather, Terminal, HelpCircle, CornerDownRight,
  RefreshCw, CheckCircle2, Lock, Flame, LucideIcon, Heart, MapPin, Play
} from 'lucide-react';

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

interface LandingPageProps {
  onSelectEcoverse: (id: string) => void;
  activeTab: 'map' | 'philosophy' | 'directory';
  setActiveTab: (tab: 'map' | 'philosophy' | 'directory') => void;
  soundEnabled: boolean;
  setSoundEnabled: (enabled: boolean | ((prev: boolean) => boolean)) => void;
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
      outer: 'The Public Surface: An R package suite (geoDeltaAudit & crosswalkAudit) evaluating spatial data stability.',
      middle: 'Under the Couch Cushions: Spatial allocation choices introduce measurable noise before regression even occurs.',
      inner: 'The Join: Boundary-crossing and rural-urban fringe communities lose representation when algorithms guess.'
    },
    tags: ['R Package', 'Spatial Audit', 'MAUP', 'Crosswalks']
  },
  {
    id: 'research-hub',
    stageNum: 2,
    gridPos: { x: 30, y: 38 },
    name: 'Research Hub',
    realmName: 'World 2 • Academic Citadel',
    type: 'Peer-Reviewed Conference Abstracts',
    status: 'active',
    description: 'National conference abstracts accepted at SACNAS (Long Beach) and ABRCMS (Miami) on spatial equity.',
    icon: GraduationCap,
    terrain: 'citadel',
    nestingLayers: {
      outer: 'The Public Surface: Academic publications and citations presented at national diversity in STEM conferences.',
      middle: 'Under the Couch Cushions: Translating complex methodological findings into concise, rigorous research posters.',
      inner: 'The Join: Creating visible pathways for underrepresented communities in data science and spatial statistics.'
    },
    tags: ['SACNAS', 'ABRCMS', 'Publications', 'Citations']
  },
  {
    id: 'survey-design',
    stageNum: 3,
    gridPos: { x: 50, y: 22 },
    name: 'Survey Design',
    realmName: 'World 3 • Inclusivity Vault',
    type: 'SOGI Data Collection Framework',
    status: 'active',
    description: 'Methodological standards for capturing Sexual Orientation and Gender Identity data safely and accurately.',
    icon: ClipboardList,
    terrain: 'vault',
    nestingLayers: {
      outer: 'The Public Surface: Best practices for demographic questionnaire engineering and non-binary field design.',
      middle: 'Under the Couch Cushions: Forced binary choices erase critical populations from health and equity datasets.',
      inner: 'The Join: Protecting vulnerable respondents while honoring their lived identity in official records.'
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
    description: 'Layered transit accessibility models mapping real-time frequency, transfer friction, and spatial deserts.',
    icon: Compass,
    terrain: 'grid',
    nestingLayers: {
      outer: 'The Public Surface: Multi-modal transit vulnerability indices and GTFS spatial route visualization.',
      middle: 'Under the Couch Cushions: Scheduled timetables rarely match actual arrival reality for night-shift transit riders.',
      inner: 'The Join: Where missing a single bus transfer determines whether someone keeps their job or healthcare.'
    },
    tags: ['GTFS', 'Transit Mobility', 'Spatial Networks', 'Urban Access']
  },
  {
    id: 'transit-map',
    stageNum: 5,
    gridPos: { x: 84, y: 60 },
    name: 'Food Vulnerability Atlas',
    realmName: 'World 5 • Equity Waypoint',
    type: 'Interactive Food Desert Dashboard',
    status: 'active',
    description: 'Spatial dashboard mapping transit time contours, grocery desert density, and nutritional access gaps.',
    icon: MapIcon,
    terrain: 'atlas',
    nestingLayers: {
      outer: 'The Public Surface: Isochrone map layers showing 15, 30, and 45-minute transit travel times to fresh produce.',
      middle: 'Under the Couch Cushions: Distance as the crow flies ignores the 2-hour multi-bus journey for non-car owners.',
      inner: 'The Join: Food security is a spatial justice issue at the intersection of urban design and public transit.'
    },
    tags: ['Food Equity', 'Isochrones', 'GIS', 'Leaflet']
  },
  {
    id: 'iris-case-study',
    stageNum: 6,
    gridPos: { x: 65, y: 80 },
    name: 'The Iris Dataset',
    realmName: 'World 6 • Botanical Pedagogy Lab',
    type: 'Classical Multivariate Analysis',
    status: 'active',
    description: 'Deconstructing Fisher\'s Iris dataset through MANOVA, LDA, and modern pedagogical statistical teaching.',
    icon: BookOpen,
    terrain: 'lab',
    nestingLayers: {
      outer: 'The Public Surface: An interactive pedagogical guide through LDA, MANOVA, and principal components.',
      middle: 'Under the Couch Cushions: Questioning historical textbook assumptions and teaching methods in intro stats.',
      inner: 'The Join: Learning how to interview the data rather than accepting canned textbook scripts.'
    },
    tags: ['MANOVA', 'LDA', 'Pedagogy', 'R Stats']
  },
  {
    id: 'free-stuff',
    stageNum: 7,
    gridPos: { x: 38, y: 80 },
    name: 'By Design',
    realmName: 'World 7 • Craftsman\'s Forge',
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
    tags: ['Open Source', 'R Scripts', 'Canvas LMS', 'Python']
  }
];

export const LandingPage: React.FC<LandingPageProps> = ({ 
  onSelectEcoverse,
  activeTab,
  setActiveTab,
  soundEnabled,
  setSoundEnabled
}) => {
  const [selectedEcoverse, setSelectedEcoverse] = useState<Ecoverse | null>(null);
  const [isVisionDismissed, setIsVisionDismissed] = useState<boolean>(false);
  const [activeNestLayer, setActiveNestLayer] = useState<'outer' | 'middle' | 'inner'>('outer');
  const [activeFilter, setActiveFilter] = useState<string>('All');

  // Web Audio retro 8-bit sound effects
  const playRetroSound = (type: 'hover' | 'select' | 'open') => {
    if (!soundEnabled) return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'square';
      osc.connect(gain);
      gain.connect(ctx.destination);

      const now = ctx.currentTime;
      if (type === 'hover') {
        osc.frequency.setValueAtTime(300, now);
        osc.frequency.exponentialRampToValueAtTime(500, now + 0.03);
        gain.gain.setValueAtTime(0.02, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.03);
        osc.start(now);
        osc.stop(now + 0.03);
      } else if (type === 'select') {
        osc.frequency.setValueAtTime(400, now);
        osc.frequency.setValueAtTime(800, now + 0.05);
        gain.gain.setValueAtTime(0.04, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
        osc.start(now);
        osc.stop(now + 0.08);
      } else if (type === 'open') {
        osc.frequency.setValueAtTime(523.25, now);
        osc.frequency.setValueAtTime(659.25, now + 0.06);
        osc.frequency.setValueAtTime(783.99, now + 0.12);
        gain.gain.setValueAtTime(0.05, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
        osc.start(now);
        osc.stop(now + 0.2);
      }
    } catch {
      // Audio fallback
    }
  };

  const handleStageSelect = (eco: Ecoverse) => {
    playRetroSound('select');
    setSelectedEcoverse(eco);
  };

  const handleEnterEcoverse = (id: string) => {
    playRetroSound('open');
    onSelectEcoverse(id);
  };

  const filteredEcoverses = ECOVERSES.filter(eco => {
    if (activeFilter === 'All') return true;
    if (activeFilter === 'Active') return eco.status === 'active';
    if (activeFilter === 'Spatial') return eco.tags.some(t => t.toLowerCase().includes('spatial') || t.toLowerCase().includes('gis') || t.toLowerCase().includes('maup'));
    if (activeFilter === 'Methods') return eco.tags.some(t => t.toLowerCase().includes('sogi') || t.toLowerCase().includes('pedagogy') || t.toLowerCase().includes('publications'));
    if (activeFilter === 'Open Source') return eco.tags.some(t => t.toLowerCase().includes('open source') || t.toLowerCase().includes('r package') || t.toLowerCase().includes('r scripts'));
    return true;
  });

  return (
    <div className="min-h-[calc(100vh-3.5rem)] bg-[#FAF8F5] text-stone-900 font-sans selection:bg-amber-200 selection:text-amber-950 pb-12">
      
      {/* Main Container Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 space-y-6">

        {/* ------------------- TAB 1: OVERWORLD MAP LANDING SPACE ------------------- */}
        {activeTab === 'map' && (
          <div className="space-y-4">
            
            {/* Map Header Title */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-300 pb-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2 py-0.5 rounded bg-amber-100 border border-amber-300 text-amber-900 font-mono text-[10px] uppercase font-bold tracking-widest flex items-center gap-1">
                    <Sparkles size={11} className="text-amber-600" /> OVERWORLD MATRIX
                  </span>
                  <span className="font-mono text-[10px] text-stone-500 uppercase">
                    WORLD 1
                  </span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-serif font-black text-stone-900 tracking-tight">
                  Data Acorns Ecoverses
                </h1>
                <p className="text-xs text-stone-600 mt-0.5">
                  Click any stage node along the path to inspect nesting doll layers or enter its realm space.
                </p>
              </div>

              <div className="flex items-center gap-2 text-xs font-mono">
                <span className="px-3 py-1.5 rounded-lg bg-amber-50 border border-amber-200 text-amber-900 font-bold flex items-center gap-1.5 shadow-xs">
                  <Heart size={13} className="text-amber-600 fill-amber-500" />
                  <span>8 Ecoverses Live</span>
                </span>
              </div>
            </div>

            {/* Map Canvas Frame (Expansive & Bright 8/16-bit Overworld) */}
            <div className="bg-[#120F0D] border-4 border-stone-900 rounded-2xl shadow-2xl overflow-hidden relative min-h-[520px] sm:min-h-[580px] md:min-h-[640px] p-3 sm:p-5 select-none">
              
              {/* Top Retro NES HUD Bar */}
              <div className="bg-[#221A15] text-white p-2.5 px-4 rounded-xl border-2 border-[#F8B800] mb-4 flex flex-wrap items-center justify-between text-xs font-mono shadow-md">
                <div className="flex items-center gap-2">
                  <span className="text-[#FFCC00] font-bold">★ DATA ACORNS OVERWORLD MATRIX</span>
                  <span className="text-stone-500 hidden sm:inline">|</span>
                  <span className="text-stone-300 text-[11px] hidden sm:inline">WORLD 1</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1 text-emerald-400 font-bold">
                    <Heart size={12} className="fill-emerald-400" /> 7 LIVE REALMS
                  </span>
                </div>
              </div>

              {/* Map Background Graphic / Vibrant 8-Bit Canvas Layer */}
              <div className="relative w-full h-[460px] sm:h-[510px] md:h-[560px] bg-[#1B75D0] rounded-xl border-2 border-stone-900 overflow-hidden shadow-inner">
                
                {/* SVG Canvas with 0-100 ViewBox scale matching Node % coordinates */}
                <svg 
                  className="absolute inset-0 w-full h-full pointer-events-none z-0"
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                >
                  <defs>
                    <pattern id="pixelGrid" width="4" height="4" patternUnits="userSpaceOnUse">
                      <rect width="4" height="4" fill="none" />
                      <path d="M 4 0 L 0 0 0 4" fill="none" stroke="#155FB0" strokeWidth="0.2" />
                    </pattern>
                  </defs>
                  
                  {/* Ocean Pixel Grid */}
                  <rect width="100" height="100" fill="url(#pixelGrid)" />

                  {/* Ocean Wave Accents */}
                  <path d="M 4,12 L 8,12 M 18,30 L 22,30 M 82,18 L 86,18 M 90,82 L 94,82 M 4,88 L 8,88" stroke="#48A0F8" strokeWidth="0.8" strokeLinecap="round" />

                  {/* Sand Coastline Layer (Golden Shoreline surrounding the island) */}
                  <path 
                    d="M 10,65 Q 8,24 24,12 Q 50,4 76,12 Q 92,24 90,65 Q 88,90 64,94 Q 36,95 10,88 Z" 
                    fill="#E5C368" 
                    stroke="#1C1917" 
                    strokeWidth="1.5" 
                  />

                  {/* Vibrant Green Landmass Continent (All 7 Nodes ground firmly on this island) */}
                  <path 
                    d="M 13,62 Q 11,26 26,15 Q 50,7 74,15 Q 89,26 87,62 Q 85,87 62,91 Q 38,92 13,85 Z" 
                    fill="#3CA028" 
                    stroke="#68D830" 
                    strokeWidth="1.2" 
                  />

                  {/* Inner Grass Contour Texture */}
                  <path 
                    d="M 16,59 Q 14,28 28,18 Q 50,10 72,18 Q 86,28 84,59 Q 82,84 60,88 Q 40,89 16,82 Z" 
                    fill="#42C830" 
                    opacity="0.6" 
                  />

                  {/* Outer Black Border for Connected Stage Road */}
                  <path 
                    d="M 18,70 L 30,38 L 50,22 L 72,34 L 84,60 L 65,80 L 38,80 Z" 
                    stroke="#1C1917" 
                    strokeWidth="2.4" 
                    strokeLinejoin="round" 
                    strokeLinecap="round"
                    fill="none" 
                  />

                  {/* Inner Golden Yellow Dirt Road Track */}
                  <path 
                    d="M 18,70 L 30,38 L 50,22 L 72,34 L 84,60 L 65,80 L 38,80 Z" 
                    stroke="#FFCC00" 
                    strokeWidth="1.3" 
                    strokeLinejoin="round" 
                    strokeLinecap="round"
                    fill="none" 
                  />

                  {/* Inner Dotted Road Centerline */}
                  <path 
                    d="M 18,70 L 30,38 L 50,22 L 72,34 L 84,60 L 65,80 L 38,80 Z" 
                    stroke="#FFF090" 
                    strokeWidth="0.4" 
                    strokeDasharray="1 1"
                    strokeLinejoin="round" 
                    strokeLinecap="round"
                    fill="none" 
                  />
                </svg>

                {/* Decorative 8-Bit Map Props on Landmass */}
                <div className="absolute top-[16%] left-[18%] text-emerald-950/70 text-2xl font-serif select-none pointer-events-none">🌳</div>
                <div className="absolute top-[16%] right-[22%] text-emerald-950/70 text-2xl font-serif select-none pointer-events-none">🌳</div>
                <div className="absolute top-[10%] left-[46%] text-amber-950/70 text-2xl font-serif select-none pointer-events-none">🏰</div>
                <div className="absolute bottom-[24%] left-[12%] text-amber-950/70 text-2xl font-serif select-none pointer-events-none">🌰</div>
                <div className="absolute bottom-[16%] right-[16%] text-emerald-950/70 text-2xl font-serif select-none pointer-events-none">🌳</div>
                <div className="absolute top-[48%] left-[48%] text-amber-900/70 text-2xl font-serif select-none pointer-events-none">🏔️</div>

                {/* Stage Nodes Layer (Strictly Placed on Golden Dirt Paths) */}
                {ECOVERSES.map((eco) => {
                  const IconComp = eco.icon;
                  const isSelected = selectedEcoverse?.id === eco.id;

                  return (
                    <div
                      key={eco.id}
                      style={{
                        left: `${eco.gridPos.x}%`,
                        top: `${eco.gridPos.y}%`,
                      }}
                      onClick={() => handleStageSelect(eco)}
                      onDoubleClick={() => handleEnterEcoverse(eco.id)}
                      className="absolute z-20 -translate-x-1/2 -translate-y-1/2 cursor-pointer flex flex-col items-center group select-none"
                    >
                      {/* Node Box */}
                      <div className={`w-11 h-11 sm:w-12 sm:h-12 rounded-xl border-2 flex items-center justify-center font-mono font-bold shadow-lg transition-transform duration-200 group-hover:scale-110 ${
                        isSelected
                          ? 'bg-[#FFCC00] border-stone-900 text-stone-950 ring-4 ring-[#FFE870]/60 scale-110'
                          : 'bg-[#FFFDF8] border-stone-900 text-stone-900 hover:bg-[#FFE870]'
                      }`}>
                        <div className="flex flex-col items-center">
                          <span className="text-[10px] font-black">{eco.stageNum}</span>
                          <IconComp size={13} className={isSelected ? 'text-stone-950' : 'text-stone-700'} />
                        </div>
                      </div>

                      {/* Stage Name Badge */}
                      <span className={`mt-1.5 px-2 py-0.5 rounded text-[9.5px] font-mono font-bold uppercase tracking-tight shadow-md whitespace-nowrap transition-colors ${
                        isSelected
                          ? 'bg-stone-900 text-[#FFCC00] border border-stone-800'
                          : 'bg-stone-900/90 text-white border border-stone-800 group-hover:border-[#FFCC00]'
                      }`}>
                        {eco.name}
                      </span>

                      {/* Active Player Acorn Marker */}
                      {isSelected && (
                        <div className="absolute -top-5 text-amber-400 text-base font-bold animate-bounce pointer-events-none">
                          🌰
                        </div>
                      )}
                    </div>
                  );
                })}

                {/* Floating Popover Card: Shows "Minding the Gap" Vision when null, or Selected Ecoverse when clicked */}
                <AnimatePresence mode="wait">
                  {selectedEcoverse === null ? (
                    !isVisionDismissed ? (
                      /* Initial Popover Card: "Minding the Gap" Philosophy & Core Vision */
                      <motion.div
                        key="vision-card"
                        initial={{ opacity: 0, y: 15, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 15, scale: 0.98 }}
                        transition={{ duration: 0.2 }}
                        className="absolute bottom-4 right-4 left-4 sm:left-auto sm:max-w-md z-30 bg-[#1A1613] border-2 border-[#F8B800] text-white rounded-xl p-4 sm:p-5 shadow-2xl space-y-3"
                      >
                        {/* Card Header */}
                        <div className="flex items-start justify-between gap-3 border-b border-stone-800 pb-2.5">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-[#FFCC00] font-mono text-lg font-bold flex-shrink-0">
                              🌰
                            </div>
                            <div>
                              <span className="font-mono text-[10px] text-[#FFCC00] font-bold uppercase tracking-wider block">
                                DATA ACORNS CORE VISION
                              </span>
                              <h2 className="text-base font-serif font-bold text-white">
                                Minding the Gap
                              </h2>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <span className="px-2 py-0.5 rounded bg-amber-500/20 text-[#FFCC00] font-mono text-[9px] uppercase font-bold border border-amber-500/30">
                              The Why
                            </span>
                            <button
                              onClick={() => setIsVisionDismissed(true)}
                              className="text-stone-400 hover:text-white p-1 rounded-md hover:bg-stone-800 transition-colors cursor-pointer text-xs font-mono font-bold"
                              title="Close Popover"
                            >
                              ✕
                            </button>
                          </div>
                        </div>

                        {/* Vision Blurb */}
                        <p className="text-xs text-stone-300 leading-relaxed font-sans">
                          “Dataacorns comes from a poem considering acorns as oak trees in waiting… stories waiting to be told. We look closely, question prevailing assumptions, and check under the couch cushions where all the joins meet—where data disappears between systems and administrative seams.”
                        </p>

                        <div className="bg-stone-900/90 p-2.5 rounded-lg border border-stone-800 text-[11px] text-stone-300 font-mono space-y-1">
                          <div className="text-[#FFCC00] font-bold flex items-center gap-1.5">
                            <Sparkles size={12} /> The Nesting Doll Framework:
                          </div>
                          <p className="text-[10px] text-stone-400 leading-normal">
                            1. Surface Data → 2. Couch Cushions → 3. The Unseen Join
                          </p>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center gap-2 pt-1">
                          <button
                            onClick={() => setActiveTab('philosophy')}
                            className="flex-1 py-2 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 font-mono text-xs font-bold uppercase tracking-wider transition-colors border border-stone-700 cursor-pointer text-center"
                          >
                            Read Essay
                          </button>

                          <span className="text-[10px] font-mono text-stone-500 text-center px-1">
                            or click any node (1-7)
                          </span>
                        </div>
                      </motion.div>
                    ) : (
                      /* Minimal Re-Open Vision Button when dismissed */
                      <motion.button
                        key="open-vision-btn"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        onClick={() => setIsVisionDismissed(false)}
                        className="absolute bottom-4 right-4 z-30 bg-[#1A1613] hover:bg-stone-800 border-2 border-[#F8B800] text-[#FFCC00] font-mono text-xs font-bold px-3 py-2 rounded-xl shadow-xl flex items-center gap-2 cursor-pointer transition-all hover:scale-105"
                      >
                        <Sparkles size={14} />
                        <span>📖 Show Minding the Gap Vision</span>
                      </motion.button>
                    )
                  ) : (
                    /* Stage Node Inspection Card */
                    <motion.div
                      key={`eco-card-${selectedEcoverse.id}`}
                      initial={{ opacity: 0, y: 15, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 15, scale: 0.98 }}
                      transition={{ duration: 0.2 }}
                      className="absolute bottom-4 right-4 left-4 sm:left-auto sm:max-w-md z-30 bg-[#1A1613] border-2 border-[#F8B800] text-white rounded-xl p-4 sm:p-5 shadow-2xl space-y-3"
                    >
                      {/* Popover Header */}
                      <div className="flex items-start justify-between gap-3 border-b border-stone-800 pb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-[#FFCC00] font-mono font-bold flex-shrink-0">
                            {selectedEcoverse.stageNum}
                          </div>
                          <div>
                            <span className="font-mono text-[10px] text-[#FFCC00] font-bold uppercase block">
                              {selectedEcoverse.realmName}
                            </span>
                            <h2 className="text-base font-serif font-bold text-white">
                              {selectedEcoverse.name}
                            </h2>
                          </div>
                        </div>

                        <button
                          onClick={() => setSelectedEcoverse(null)}
                          className="text-stone-400 hover:text-white p-1.5 px-2 rounded-md hover:bg-stone-800 transition-colors cursor-pointer text-xs font-mono font-bold border border-stone-700 bg-stone-900"
                          title="Close Realm Inspection"
                        >
                          ✕ Close
                        </button>
                      </div>

                      <p className="text-xs text-stone-300 leading-relaxed font-sans">
                        {selectedEcoverse.description}
                      </p>

                      {/* Nesting Doll Layers Inspector */}
                      <div className="space-y-2 pt-1 border-t border-stone-800/80">
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-[9px] uppercase text-stone-400 font-bold tracking-wider">
                            🪆 NESTING DOLL LAYER:
                          </span>
                          <div className="flex gap-1">
                            {(['outer', 'middle', 'inner'] as const).map((layer, idx) => (
                              <button
                                key={layer}
                                onClick={() => { setActiveNestLayer(layer); playRetroSound('hover'); }}
                                className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold uppercase transition-all cursor-pointer ${
                                  activeNestLayer === layer
                                    ? 'bg-[#FFCC00] text-stone-950 font-black'
                                    : 'bg-stone-800 text-stone-400 hover:text-white'
                                }`}
                              >
                                {idx + 1}. {layer === 'outer' ? 'Surface' : layer === 'middle' ? 'Cushions' : 'The Join'}
                              </button>
                            ))}
                          </div>
                        </div>

                        <p className="text-xs text-stone-300 font-sans leading-normal bg-stone-900/90 p-2.5 rounded-lg border border-stone-800">
                          {selectedEcoverse.nestingLayers[activeNestLayer]}
                        </p>
                      </div>

                      {/* Enter Realm Button */}
                      <button
                        onClick={() => handleEnterEcoverse(selectedEcoverse.id)}
                        className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-[#FFCC00] hover:bg-amber-400 text-stone-950 font-mono text-xs font-black uppercase tracking-wider transition-all transform hover:scale-[1.01] shadow-md cursor-pointer mt-2"
                      >
                        <span>ENTER REALM</span>
                        <ArrowRight size={14} />
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>

              </div>

            </div>
          </div>
        )}


        {/* ------------------- TAB 2: NARRATIVE & PHILOSOPHY ("Minding the Gap") ------------------- */}
        {activeTab === 'philosophy' && (
          <div className="max-w-4xl mx-auto space-y-8">
            
            <div className="bg-[#FFFDF9] border-2 border-stone-300 rounded-2xl p-6 sm:p-10 shadow-xl space-y-8 relative overflow-hidden">
              
              <div className="border-b-2 border-amber-600/30 pb-4 flex items-center justify-between">
                <div>
                  <span className="font-mono text-xs text-amber-700 font-bold uppercase tracking-widest block">
                    CHAPTER 01 • ESSAY & PHILOSOPHY
                  </span>
                  <h1 className="text-2xl sm:text-3xl font-serif font-black text-stone-900 mt-1">
                    Minding the Gap: Where You Can Find Me
                  </h1>
                </div>

                <div className="text-right font-mono text-[10px] text-stone-500 hidden sm:block">
                  DOCUMENT REF: <br />
                  <span className="text-stone-800 font-bold">[DATA_ACORNS_ORIGIN]</span>
                </div>
              </div>

              <div className="bg-[#F7F4EC] border-l-4 border-amber-600 p-5 rounded-r-xl space-y-2">
                <blockquote className="text-xs sm:text-sm italic font-serif text-stone-800 leading-relaxed">
                  “The monastic flight from the world [or what Father Richard calls ‘the system’] into the desert is not a mere refusal to know anything about the world, but a total rejection of all standards of judgment which imply attachment to a history of delusion, egoism and sin … a definitive refusal to participate in those activities which have no other fruit than to prolong the reign of untruth, greed, cruelty and arrogance….”
                </blockquote>
              </div>

              <div className="prose prose-stone max-w-none text-xs sm:text-sm text-stone-800 leading-relaxed space-y-4">
                <p className="first-letter:text-4xl first-letter:font-serif first-letter:font-bold first-letter:float-left first-letter:mr-2 first-letter:text-amber-700">
                  Dataacorns comes from a poem I listened to where the author considers acorns as oak trees in waiting… stories waiting to be told. This is the best way I can articulate how I envision learning, research and data. A process of discovery that is closer to an interview where I am seeking the story to be told from the story.
                </p>

                <p>
                  I look closely, and I step back, and I question my own assumptions, and I question the prevailing assumptions that drive the conditions of the story because inevitably I have found, doing so gets to the heart of the story.
                </p>

                <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-xl font-serif text-stone-900 font-medium text-xs sm:text-sm my-6">
                  “Often, we skim, summarize and compress and this is a massive disservice to all of us directly and indirectly.”
                </div>

                <p>
                  Dataacorns check the cracks, and under the couch cushions, and where all of the joins meet and separate because where responsibility ends, no one watches and this is where a lot of important people get lost, data disappears, and stories change.
                </p>
              </div>

              <div className="border-t border-stone-200 pt-6 space-y-4">
                <h3 className="font-serif font-bold text-lg text-stone-900 flex items-center gap-2">
                  <span>🪆</span> The Nesting Doll Method in Translational Research
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-[#F7F4EC] p-4 rounded-xl border border-stone-200 space-y-1">
                    <span className="font-mono text-[10px] font-bold text-amber-700 uppercase block">Layer 1</span>
                    <h4 className="font-serif font-bold text-sm text-stone-900">The Outer Shell</h4>
                    <p className="text-[11px] text-stone-600 leading-normal">
                      The public publication, R package, or dashboard presented to the scientific community.
                    </p>
                  </div>

                  <div className="bg-[#F7F4EC] p-4 rounded-xl border border-stone-200 space-y-1">
                    <span className="font-mono text-[10px] font-bold text-amber-700 uppercase block">Layer 2</span>
                    <h4 className="font-serif font-bold text-sm text-stone-900">Under the Couch Cushions</h4>
                    <p className="text-[11px] text-stone-600 leading-normal">
                      Auditing spatial allocation noise, MAUP perturbation, and forced survey assumptions.
                    </p>
                  </div>

                  <div className="bg-[#F7F4EC] p-4 rounded-xl border border-stone-200 space-y-1">
                    <span className="font-mono text-[10px] font-bold text-amber-700 uppercase block">Layer 3</span>
                    <h4 className="font-serif font-bold text-sm text-stone-900">The Seams & Joins</h4>
                    <p className="text-[11px] text-stone-600 leading-normal">
                      Where responsibility ends and no one watches — protecting vulnerable populations from disappearing.
                    </p>
                  </div>
                </div>
              </div>

            </div>

          </div>
        )}


        {/* ------------------- TAB 3: DIRECTORY INDEX ------------------- */}
        {activeTab === 'directory' && (
          <div className="space-y-6">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-300 pb-4">
              <div>
                <h1 className="text-2xl font-serif font-black text-stone-900">
                  Ecoverse Directory
                </h1>
                <p className="text-xs text-stone-600 mt-1">
                  Full scannable directory of all research applications, packages, and interactive models.
                </p>
              </div>

              <div className="flex items-center gap-1.5 flex-wrap">
                {['All', 'Active', 'Spatial', 'Methods', 'Open Source'].map(filter => (
                  <button
                    key={filter}
                    onClick={() => { setActiveFilter(filter); playRetroSound('hover'); }}
                    className={`px-3 py-1 rounded text-[10px] font-mono font-bold uppercase transition-all cursor-pointer ${
                      activeFilter === filter
                        ? 'bg-amber-600 text-white font-black shadow-xs'
                        : 'bg-stone-200 text-stone-700 hover:text-stone-950'
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredEcoverses.map((eco) => {
                const IconComp = eco.icon;

                return (
                  <div
                    key={eco.id}
                    onClick={() => handleEnterEcoverse(eco.id)}
                    className="bg-[#FFFDF9] border border-stone-300 hover:border-amber-500 rounded-xl p-5 cursor-pointer transition-all hover:shadow-lg flex flex-col justify-between space-y-4 group"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[10px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded border border-amber-300">
                          {eco.realmName}
                        </span>
                        <span className="font-mono text-[9px] uppercase text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded border border-emerald-300 font-bold">
                          {eco.status}
                        </span>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="p-2.5 rounded-lg bg-stone-100 border border-stone-200 text-amber-700 group-hover:scale-110 transition-transform">
                          <IconComp size={20} />
                        </div>
                        <div>
                          <h3 className="font-serif font-bold text-stone-900 text-base group-hover:text-amber-800 transition-colors">
                            {eco.name}
                          </h3>
                          <span className="text-[11px] font-mono text-stone-500">
                            {eco.type}
                          </span>
                        </div>
                      </div>

                      <p className="text-xs text-stone-700 leading-relaxed line-clamp-3">
                        {eco.description}
                      </p>
                    </div>

                    <div className="border-t border-stone-200 pt-3 flex items-center justify-between">
                      <div className="flex flex-wrap gap-1">
                        {eco.tags.slice(0, 2).map((tag, i) => (
                          <span key={i} className="text-[9px] font-mono text-stone-600 bg-stone-100 px-1.5 py-0.5 rounded border border-stone-200">
                            #{tag}
                          </span>
                        ))}
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEnterEcoverse(eco.id);
                        }}
                        className="flex items-center gap-1 font-mono text-xs font-bold text-amber-700 hover:text-amber-900 cursor-pointer"
                      >
                        Enter Ecoverse <ArrowRight size={12} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        )}

      </main>

    </div>
  );
};

export default LandingPage;
