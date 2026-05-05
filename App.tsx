import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Database, Layout, Sparkles, Map as MapIcon, BookOpen, Gift } from 'lucide-react';
import ShellGame from './src/projects/ShellGame';
import TransitMap from './src/projects/TransitMap';
import IrisCaseStudy from './src/projects/IrisCaseStudy';
import FreeStuff from './src/projects/FreeStuff';

// We can add more projects here later
const PROJECTS = [
  {
    id: 'shellgame',
    name: 'Ecosystem Navigator',
    description: 'R Packages & Audit Protocol',
    icon: Database,
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
  const [isOpen, setIsOpen] = useState(false);

  const current = PROJECTS.find(p => p.id === activeProject) || PROJECTS[0];

  return (
    <div className="fixed top-0 left-0 right-0 z-[100] bg-stone-950 text-stone-300 border-b border-stone-800 font-sans">
      <div className="container mx-auto px-6 h-12 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono font-bold tracking-[0.3em] uppercase text-stone-400">
              Data Acorns
            </span>
          </div>
          
          <div className="w-px h-4 bg-stone-800 hidden sm:block"></div>
          
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white hover:text-nobel-gold transition-colors bg-stone-900 px-3 py-1.5 rounded-md border border-stone-800"
          >
            {current.name}
            <ChevronDown size={14} className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
          </button>
        </div>
        
        <div className="hidden md:flex items-center gap-4 text-[10px] font-mono uppercase tracking-widest text-stone-500">
          <span>Data Journey</span>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-12 left-0 right-0 bg-stone-900 border-b border-stone-800 shadow-2xl"
          >
            <div className="container mx-auto px-6 py-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {PROJECTS.map((project) => (
                  <button
                    key={project.id}
                    onClick={() => {
                      if (project.status === 'active') {
                        setActiveProject(project.id);
                        setIsOpen(false);
                      }
                    }}
                    className={`text-left p-6 border transition-all flex flex-col gap-4 ${
                      activeProject === project.id 
                        ? 'border-nobel-gold bg-stone-950' 
                        : project.status === 'active'
                          ? 'border-stone-800 hover:border-stone-600 hover:bg-stone-800/50 cursor-pointer'
                          : 'border-stone-800/50 opacity-50 cursor-not-allowed'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <project.icon size={20} className={activeProject === project.id ? 'text-nobel-gold' : 'text-stone-500'} />
                      {project.status === 'active' && activeProject === project.id && (
                        <span className="text-[9px] font-mono px-2 py-0.5 bg-nobel-gold/10 text-nobel-gold uppercase tracking-widest">Current</span>
                      )}
                      {project.status === 'upcoming' && (
                        <span className="text-[9px] font-mono px-2 py-0.5 bg-stone-800 text-stone-500 uppercase tracking-widest">Locked</span>
                      )}
                    </div>
                    <div>
                      <h3 className="font-bold text-sm uppercase tracking-widest text-white mb-1">{project.name}</h3>
                      <p className="text-xs text-stone-500 font-light">{project.description}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const App: React.FC = () => {
  const [activeProject, setActiveProject] = useState('shellgame');

  return (
    <div className="relative pt-12">
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
