import React, { lazy, Suspense, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Database, Layout, Sparkles, Map as MapIcon, BookOpen, Gift, Compass, GraduationCap, ClipboardList, Grid, Sliders } from 'lucide-react';
import LandingPage from '../ecoverses/overworld/LandingPage';
const ShellGame = lazy(() => import('../ecoverses/shell-game/ShellGame'));
const TransitAware = lazy(() => import('../ecoverses/transit-aware/TransitAware'));
const TransitMap = lazy(() => import('../ecoverses/food-vulnerability/TransitMap'));
const IrisCaseStudy = lazy(() => import('../ecoverses/iris/IrisCaseStudy'));
const FreeStuff = lazy(() => import('../ecoverses/by-design/FreeStuff'));
const ResearchHub = lazy(() => import('../ecoverses/research-hub/ResearchHub'));
const SurveyDesign = lazy(() => import('../ecoverses/survey-design/SurveyDesign'));
const The8020Project = lazy(() => import('../ecoverses/eighty-twenty/The8020Project'));

import { ECOVERSES } from './ecoverses';

const PROJECTS = [{ id: 'landing', name: 'Overworld Portal' }, ...ECOVERSES];

const projectFromHash = () => {
  const route = window.location.hash.slice(2).split('/')[0];
  if (route === 'iris') return 'iris-case-study';
  return ECOVERSES.some(project => project.id === route) ? route : 'landing';
};

const GlobalNav = ({ 
  activeProject, 
  setActiveProject,
  activeTab,
  setActiveTab,
  soundEnabled,
  setSoundEnabled
}: { 
  activeProject: string; 
  setActiveProject: (id: string) => void;
  activeTab: 'map' | 'philosophy' | 'directory';
  setActiveTab: (tab: 'map' | 'philosophy' | 'directory') => void;
  soundEnabled: boolean;
  setSoundEnabled: (enabled: boolean | ((prev: boolean) => boolean)) => void;
}) => {
  const currentProjectObj = PROJECTS.find(p => p.id === activeProject);

  return (
    <div className="fixed top-0 left-0 right-0 z-[100] bg-stone-950 text-stone-200 border-b border-stone-800 font-sans shadow-md select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
        
        {/* Brand Logo - Returns to World Map */}
        <button 
          onClick={() => {
            setActiveProject('landing');
            setActiveTab('map');
          }}
          className="flex items-center gap-2 flex-shrink-0 hover:text-amber-400 transition-colors group cursor-pointer"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500 group-hover:animate-ping"></span>
          <span className="text-[11px] sm:text-xs font-mono font-black tracking-[0.25em] uppercase text-amber-400 group-hover:text-amber-300">
            DATA ACORNS
          </span>
        </button>
        
        <div className="w-px h-5 bg-stone-800 hidden sm:block"></div>

        {/* Center Navigation Content */}
        {activeProject === 'landing' ? (
          /* Section Tabs on Landing Page */
          <div className="flex items-center gap-1 sm:gap-2">
            <button
              onClick={() => setActiveTab('map')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-bold uppercase transition-all cursor-pointer ${
                activeTab === 'map'
                  ? 'bg-amber-600 text-white shadow-sm font-extrabold'
                  : 'text-stone-400 hover:text-stone-100 hover:bg-stone-900'
              }`}
            >
              <MapIcon size={14} />
              <span>World Map</span>
            </button>

            <button
              onClick={() => setActiveTab('philosophy')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-bold uppercase transition-all cursor-pointer ${
                activeTab === 'philosophy'
                  ? 'bg-amber-600 text-white shadow-sm font-extrabold'
                  : 'text-stone-400 hover:text-stone-100 hover:bg-stone-900'
              }`}
            >
              <BookOpen size={14} />
              <span className="hidden sm:inline">Minding the Gap</span>
              <span className="sm:hidden">Essay</span>
            </button>

            <button
              onClick={() => setActiveTab('directory')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-bold uppercase transition-all cursor-pointer ${
                activeTab === 'directory'
                  ? 'bg-amber-600 text-white shadow-sm font-extrabold'
                  : 'text-stone-400 hover:text-stone-100 hover:bg-stone-900'
              }`}
            >
              <Grid size={14} />
              <span>Directory</span>
            </button>
          </div>
        ) : (
          /* Breadcrumb navigation when inside an Ecoverse */
          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveProject('landing')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-900 hover:bg-stone-800 text-amber-400 font-mono text-xs font-bold uppercase border border-stone-800 transition-colors cursor-pointer"
            >
              <Compass size={14} />
              <span>← Return to World Map</span>
            </button>

            {currentProjectObj && (
              <span className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded bg-stone-900 border border-stone-800 text-stone-300 font-mono text-xs">
                <span className="text-stone-500 uppercase font-bold">Realm:</span>
                <span className="text-amber-300 font-bold">{currentProjectObj.name}</span>
              </span>
            )}
          </div>
        )}

        {/* Right Side: Clean 8-Bit Audio Toggle (No confusing HUD flotsam) */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setSoundEnabled(prev => !prev)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border font-mono text-xs font-bold transition-all cursor-pointer ${
              soundEnabled 
                ? 'bg-amber-500/20 border-amber-500/40 text-amber-300 hover:bg-amber-500/30' 
                : 'bg-stone-900 border-stone-800 text-stone-500 hover:text-stone-300'
            }`}
          >
            <Sparkles size={13} className={soundEnabled ? "text-amber-400" : "text-stone-600"} />
            <span>{soundEnabled ? 'Audio On' : 'Mute'}</span>
          </button>
        </div>

      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [activeProject, setActiveProject] = useState(projectFromHash);
  const [activeTab, setActiveTab] = useState<'map' | 'philosophy' | 'directory'>('map');
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  const navigateToProject = (id: string) => {
    window.location.hash = id === 'landing' ? '' : `/${id === 'iris-case-study' ? 'iris' : id}`;
    setActiveProject(id);
  };

  useEffect(() => {
    const syncProjectToHash = () => {
      setActiveProject(projectFromHash());
    };

    window.addEventListener('hashchange', syncProjectToHash);
    return () => window.removeEventListener('hashchange', syncProjectToHash);
  }, []);

  return (
    <div className="relative pt-14 bg-[#FAF8F5] min-h-screen">
      <GlobalNav 
        activeProject={activeProject} 
        setActiveProject={navigateToProject}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        soundEnabled={soundEnabled}
        setSoundEnabled={setSoundEnabled}
      />
      
      <Suspense fallback={<div role="status" className="px-6 py-24 text-center font-mono text-stone-600">Opening Ecoverse…</div>}>
      <AnimatePresence mode="wait">
        {activeProject === 'landing' && (
          <motion.div
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <LandingPage 
              onSelectEcoverse={navigateToProject}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              soundEnabled={soundEnabled}
              setSoundEnabled={setSoundEnabled}
            />
          </motion.div>
        )}

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

        {activeProject === 'research-hub' && (
          <motion.div
            key="research-hub"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <ResearchHub />
          </motion.div>
        )}

        {activeProject === 'survey-design' && (
          <motion.div
            key="survey-design"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <SurveyDesign />
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

        {activeProject === 'the-80-20' && (
          <motion.div
            key="the-80-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <The8020Project onBack={() => navigateToProject('landing')} />
          </motion.div>
        )}
      </AnimatePresence>
      </Suspense>
    </div>
  );
};

export default App;
