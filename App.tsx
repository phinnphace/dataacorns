import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Database, Layout, Sparkles, Map as MapIcon, BookOpen, Gift, Compass, GraduationCap, ShieldCheck } from 'lucide-react';
import ShellGame from './src/projects/ShellGame';
import TransitAware from './src/projects/TransitAware';
import TransitMap from './src/projects/TransitMap';
import IrisCaseStudy from './src/projects/IrisCaseStudy';
import FreeStuff from './src/projects/FreeStuff';
import AbstractGallery from './components/AbstractGallery';
import MayoCaseStudy from './src/projects/MayoCaseStudy';

// We can add more projects here later
const PROJECTS = [
  {
    id: 'shellgame',
    name: 'Ecoverse',
    description: 'R Packages & Audit Protocol',
    icon: Database,
    status: 'active'
  },
  {
    id: 'mayo-sogi',
    name: 'Mayo SOGI Case Study',
    description: 'SOGI Admissions Data & Ethics',
    icon: ShieldCheck,
    status: 'active'
  },
  {
    id: 'research-hub',
    name: 'Research Hub',
    description: 'Conference Accepted Abstracts',
    icon: GraduationCap,
    status: 'active'
  },
  {
    id: 'transitaware',
    name: 'TransitAware',
    description: 'Layered Transit Analysis',
    icon: Compass,
    status: 'active'
  },
  {
    id: 'transit-map',
    name: 'Mapping Food Vulnerability',
    description: 'Interactive Spatial Dashboard',
    icon: MapIcon,
    status: 'active'
  },
  {
    id: 'iris-case-study',
    name: 'The Iris Dataset',
    description: 'Pedagogy & Methodology',
    icon: BookOpen,
    status: 'active'
  },
  {
    id: 'free-stuff',
    name: 'By Design',
    description: 'Open Source Scripts & Tools',
    icon: Gift,
    status: 'active'
  }
];

const GlobalNav = ({ activeProject, setActiveProject }: { activeProject: string, setActiveProject: (id: string) => void }) => {
  return (
    <div className="fixed top-0 left-0 right-0 z-[100] bg-stone-950 text-stone-300 border-b border-stone-800 font-sans shadow-lg select-none">
      <div className="container mx-auto px-4 md:px-6 h-14 flex items-center justify-between gap-4">
        
        {/* Brand Logo */}
        <button 
          onClick={() => setActiveProject('shellgame')}
          className="flex items-center gap-2 flex-shrink-0 hover:text-white transition-colors"
        >
          <span className="text-[10px] font-mono font-black tracking-[0.25em] uppercase text-nobel-gold">
            DATA ACORNS
          </span>
        </button>
        
        <div className="w-px h-5 bg-stone-800 hidden md:block"></div>
        
        {/* Visible Tab Strip (Horizontal scroll on mobile, flex row on desktop) */}
        <div className="flex-1 flex items-center overflow-x-auto no-scrollbar scroll-smooth py-1">
          <div className="flex items-center gap-1 sm:gap-2 md:gap-4 flex-nowrap min-w-max">
            {PROJECTS.map((project) => {
              const IconComponent = project.icon;
              const isActive = activeProject === project.id;
              
              return (
                <button
                  key={project.id}
                  onClick={() => setActiveProject(project.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-[10px] md:text-xs font-bold uppercase tracking-wider transition-all cursor-pointer select-none whitespace-nowrap ${
                    isActive
                      ? 'bg-nobel-gold/15 text-white border border-nobel-gold/40'
                      : 'border border-transparent text-stone-400 hover:text-stone-100 hover:bg-stone-900/60'
                  }`}
                >
                  <IconComponent size={12} className={isActive ? 'text-nobel-gold' : 'text-stone-500'} />
                  <span>{project.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Status Indicator / Journey details */}
        <div className="hidden lg:flex items-center gap-2 text-[9px] font-mono uppercase tracking-[0.2em] text-stone-500 flex-shrink-0 pl-2 border-l border-stone-800">
          <Sparkles size={10} className="text-nobel-gold animate-pulse" />
          <span>Research Hub</span>
        </div>

      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [activeProject, setActiveProject] = useState('shellgame');

  return (
    <div className="relative pt-14">
      <GlobalNav activeProject={activeProject} setActiveProject={setActiveProject} />
      
      <AnimatePresence mode="wait">
        {activeProject === 'shellgame' && (
          <motion.div
            key="shellgame"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <ShellGame />
          </motion.div>
        )}

        {activeProject === 'mayo-sogi' && (
          <motion.div
            key="mayo-sogi"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <MayoCaseStudy />
          </motion.div>
        )}

        {activeProject === 'research-hub' && (
          <motion.div
            key="research-hub"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <AbstractGallery />
          </motion.div>
        )}
        
        {activeProject === 'transitaware' && (
          <motion.div
            key="transitaware"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <TransitAware />
          </motion.div>
        )}
        
        {activeProject === 'transit-map' && (
          <motion.div
            key="transit-map"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <TransitMap />
          </motion.div>
        )}
        
        {activeProject === 'iris-case-study' && (
          <motion.div
            key="iris-case-study"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <IrisCaseStudy />
          </motion.div>
        )}

        {activeProject === 'free-stuff' && (
          <motion.div
            key="free-stuff"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <FreeStuff />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
