import React, { useState, useEffect } from 'react';
import { BookOpen, AlertCircle, Leaf, Terminal, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import petalLengthBoxplot from './petallength_boxplots.png';
import sepalWidthBoxplot from './sepalwidth_boxplots.png';
import pcaSummary from './PCAsummary.png';
import pcaKMeans from './PCAkMeans.png';
import screeplot from './screeplot.png';
import pairwisePlot from './pairwise.png';

import anovaPlot from './ANOVA.png';
import ldaManovaPlot from './LDAMANOVA.png';
import sepalLengthPlot from './sepallength.png';
import sepalWidthPlot from './sepalwidth.png';
import petalLengthPlot from './petallength.png';
import petalWidthPlot from './petalwidth.png';

const GateIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    {/* Outer Pillars */}
    <path d="M4 22V5" />
    <path d="M20 22V5" />
    {/* Pillar Caps */}
    <path d="M2 5h4" />
    <path d="M18 5h4" />
    {/* Gate Arch */}
    <path d="M4 14c3-3 5-3 8-3s5 0 8 3" />
    {/* Center Post */}
    <path d="M12 22V11" />
    {/* Inner Bars */}
    <path d="M8 22v-9" />
    <path d="M16 22v-9" />
    {/* Bottom Rail */}
    <path d="M4 22h16" />
  </svg>
);

const IrisCaseStudy: React.FC = () => {
  const [activeCard, setActiveCard] = useState<string | null>(null);

  useEffect(() => {
    if (activeCard) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [activeCard]);

  const cards = [
    {
      id: 'genesis',
      title: 'Project Genesis',
      icon: Leaf,
      color: 'text-[#556b2f]',
      position: 'top-[5%] left-[2%] md:left-[8%]',
      summary: 'Deconstructing typologies in \'classic\' data science examples.',
      content: (
        <div className="space-y-6 text-[#3e3326] text-lg leading-relaxed">
          <h3 className="text-2xl font-bold text-[#1a1510] flex items-center gap-3 border-b border-[#d4c4a8] pb-3">
            <span className="text-2xl">🍃</span> Project Genesis and Critical Framing
          </h3>
          <p>
            This project began with a simple task: find a dataset for a graduate-level assignment. I came across the "classic <em>Iris</em> dataset" — and more importantly, the name <em>Fisher</em>. I paused: <em>They mean that Fisher?</em> Yes, they did.
          </p>
          <a href="https://archive.ics.uci.edu/dataset/53/iris" target="_blank" rel="noopener noreferrer" className="block bg-[#fdfbf7] border border-[#e5ddcb] p-5 rounded-sm hover:shadow-md transition-all group">
            <div className="flex items-center gap-4 text-[#556b2f] group-hover:text-[#3e4f22]">
              <span className="text-2xl">💡</span>
              <span className="font-mono text-sm underline underline-offset-4 break-all">https://archive.ics.uci.edu/dataset/53/iris</span>
            </div>
          </a>
        </div>
      )
    },
    {
      id: 'erasure',
      title: 'The Erasure',
      icon: BookOpen,
      color: 'text-[#8b7355]',
      position: 'top-[10%] right-[2%] md:right-[8%]',
      summary: 'The complete erasure of who Ronald A. Fisher was.',
      content: (
        <div className="space-y-6 text-[#3e3326] text-lg leading-relaxed">
          <h3 className="text-2xl font-bold text-[#1a1510] flex items-center gap-3 border-b border-[#d4c4a8] pb-3">
            <span className="text-2xl">📖</span> The Erasure
          </h3>
          <p>
            What galvanized this project wasn't the dataset itself, or even its ubiquitous presence in data science education.
          </p>
          <p>
            It was the <em>absence</em> — the complete erasure of who Ronald A. Fisher was. Buried in a sub-footnote was a citation to <em>The Annals of Eugenics</em>, with no accompanying context. There was no mention that Fisher — along with Francis Galton and Karl Pearson — was a key architect of both modern statistics <em>and</em> the eugenics movement.
          </p>
          <a href="https://rpubs.com/marksonp/1376907" target="_blank" rel="noopener noreferrer" className="block bg-[#fdfbf7] border border-[#e5ddcb] p-5 rounded-sm hover:shadow-md transition-all group">
            <div className="flex items-center gap-4 text-[#556b2f] group-hover:text-[#3e4f22]">
              <span className="text-2xl">💡</span>
              <span className="font-mono text-sm underline underline-offset-4 break-all">https://rpubs.com/marksonp/1376907</span>
            </div>
          </a>
        </div>
      )
    },
    {
      id: 'foundations',
      title: 'Foundations',
      icon: GateIcon,
      color: 'text-[#6b5e4b]',
      position: 'top-[45%] left-[2%] md:left-[5%]',
      summary: 'Fisher, Galton, and Pearson are foundational to modern statistical science.',
      content: (
        <div className="space-y-6 text-[#3e3326] text-lg leading-relaxed">
          <h3 className="text-2xl font-bold text-[#1a1510] flex items-center gap-3 border-b border-[#d4c4a8] pb-3">
            <span className="text-2xl">🏛️</span> Foundations
          </h3>
          <p>
            Fisher, Galton, and Pearson are not marginal figures — they are <em>foundational</em> to modern statistical science.
          </p>
          <div className="bg-[#f5f0e6] p-6 rounded-sm border border-[#e5ddcb]">
            <p className="font-bold text-[#1a1510] mb-4">Without them, we would not have:</p>
            <ul className="list-disc list-inside space-y-2 text-base text-[#5c4e3c]">
              <li>Correlation and regression</li>
              <li>The concepts of mean, variance, standard deviation, and normal distribution</li>
              <li>Bivariate distributions, quantiles, the bell curve</li>
              <li>Linear regression, chi-square tests, p-values</li>
              <li>Histograms, the method of moments, ANOVA, the F-distribution</li>
              <li>Fisher's exact test, null hypothesis testing, and the design of experiments</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      id: 'ideology',
      title: 'Ideology & Methodology',
      icon: Terminal,
      color: 'text-[#1a1510]',
      position: 'top-[50%] right-[2%] md:right-[5%]',
      summary: 'Ideology determines methodology. It can\'t not.',
      content: (
        <div className="space-y-6 text-[#3e3326] text-lg leading-relaxed">
          <h3 className="text-2xl font-bold text-[#1a1510] flex items-center gap-3 border-b border-[#d4c4a8] pb-3">
            <span className="text-2xl">⚖️</span> Ideology & Methodology
          </h3>
          <p>
            And yet, these contributions are routinely taught as if divorced from the ideology that shaped them. But ideology determines methodology. It can't not.
          </p>
          <p>
            This project is both a technical analysis and a critique of how we inherit tools without interrogating their origins. Statistical methods don't exist in a vacuum — they are shaped by the people who created them, and by the social, political, and scientific paradigms of their time. If we are serious about equity in data science, we must be equally serious about the roots of the tools we use.
          </p>
          <a href="https://rpubs.com/marksonp/Iris_reanalysis" target="_blank" rel="noopener noreferrer" className="block bg-[#fdfbf7] border border-[#e5ddcb] p-5 rounded-sm hover:shadow-md transition-all group">
            <div className="flex items-center gap-4 text-[#556b2f] group-hover:text-[#3e4f22]">
              <span className="text-2xl">💡</span>
              <span className="font-mono text-sm underline underline-offset-4 break-all">https://rpubs.com/marksonp/Iris_reanalysis</span>
            </div>
          </a>
        </div>
      )
    },
    {
      id: 'presumption',
      title: 'Presumption of Normality',
      icon: BookOpen,
      color: 'text-[#556b2f]',
      position: 'bottom-[5%] left-[10%] md:left-[20%]',
      summary: 'Interrogating assumptions and engaging with data through context.',
      content: (
        <div className="space-y-6 text-[#3e3326] text-lg leading-relaxed">
          <h3 className="text-2xl font-bold text-[#1a1510] flex items-center gap-3 border-b border-[#d4c4a8] pb-3">
            <span className="text-2xl">🔍</span> Presumption of Normality
          </h3>
          <p>
            As a research scientist grounded in equity, I found this erasure untenable.
          </p>
          <p>
            The <em>Iris</em> dataset is widely used as a pedagogical tool: neat, tidy, separable — a "perfect" dataset. Ironically, it's often used to teach the fundamentals of normality, clustering, and classification <em>despite</em> its own internal complexity and assumptions. My aim in this project was to interrogate those assumptions and engage with the data more fully — not only through analysis, but through context.
          </p>
          <p>
            We train ourselves — and our tools — on the <em>presumption</em> of normality, often ignoring how that presumption is constructed. The <em>Iris</em> dataset is a paradigmatic example of this: widely viewed as neutral, when in fact it reflects a highly curated ideal rooted in typological thinking.
          </p>
          <a href="https://tinyurl.com/IrisConsulting" target="_blank" rel="noopener noreferrer" className="block bg-[#fdfbf7] border border-[#e5ddcb] p-5 rounded-sm hover:shadow-md transition-all group">
            <div className="flex items-center gap-4 text-[#556b2f] group-hover:text-[#3e4f22]">
              <span className="text-2xl">💡</span>
              <span className="font-mono text-sm underline underline-offset-4 break-all">https://tinyurl.com/IrisConsulting</span>
            </div>
          </a>
        </div>
      )
    }
  ];

  const activeCardData = cards.find(c => c.id === activeCard);

  return (
    <div className="min-h-screen bg-[#fdfbf7] relative overflow-hidden selection:bg-[#d4c4a8] selection:text-[#2c241b] flex flex-col">
      {/* Header Section */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-6 pt-12 pb-6 font-serif text-[#2c241b] flex-shrink-0">
        <header className="text-center border-b-2 border-double border-[#d4c4a8] pb-8">
          <div className="flex justify-center mb-4">
            <Leaf className="text-[#556b2f] w-10 h-10 opacity-80" />
          </div>
          <h1 className="text-3xl md:text-5xl font-normal leading-tight mb-4 text-[#1a1510]">
            The Iris Dataset
          </h1>
          <h2 className="text-lg md:text-xl italic text-[#5c4e3c] font-light max-w-2xl mx-auto leading-relaxed">
            An accidental case study in pedagogy, methodology, and real-world implications.
          </h2>
          <div className="mt-4 text-xs tracking-widest uppercase text-[#8b7355]">
            Tap the anatomical cards to explore the analysis
          </div>
        </header>
      </div>

      {/* Full-Page Interactive Anatomy Mockup */}
      <section className="relative z-10 w-full flex-grow min-h-[700px] flex items-center justify-center bg-[#fdfbf7] p-4">
        <div className="relative w-full max-w-5xl h-full min-h-[600px] flex items-center justify-center">
          
          {/* Central Image */}
          <img 
            src="/Iris_versicolor,_Blue_flag,_or_flower_de_luce_(3528517964).jpg" 
            alt="Iris Versicolor Botanical Illustration" 
            className="absolute inset-0 w-full h-full object-contain opacity-90 mix-blend-multiply"
          />

          {/* Floating Cards */}
          {cards.map((card, index) => {
            const Icon = card.icon;
            return (
              <motion.div 
                key={card.id}
                onClick={() => setActiveCard(card.id)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ scale: 1.03, y: -5 }}
                className={`absolute ${card.position} bg-white/90 backdrop-blur-md p-3 md:p-4 rounded-sm shadow-lg border border-[#d4c4a8] max-w-[160px] md:max-w-[200px] cursor-pointer z-20 group`}
              >
                <div className="flex items-center gap-2 mb-2 border-b border-[#e5ddcb] pb-2">
                  <Icon className={`w-4 h-4 ${card.color} group-hover:scale-110 transition-transform flex-shrink-0`} />
                  <span className="font-bold text-sm text-[#1a1510] leading-tight">{card.title}</span>
                </div>
                <p className="text-xs text-[#5c4e3c] leading-snug">
                  {card.summary}
                </p>
                
                {/* Hover Indicator */}
                <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-[#fdfbf7] border border-[#d4c4a8] rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-sm">
                  <span className="text-[#8b7355] text-xs">↗</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Modal Overlay (The "Flipped" Card) */}
      <AnimatePresence>
        {activeCard && activeCardData && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 perspective-1000">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 bg-[#1a1510]/60 backdrop-blur-sm"
              onClick={() => setActiveCard(null)}
            />
            <motion.div 
              initial={{ rotateY: 90, opacity: 0, scale: 0.9 }}
              animate={{ rotateY: 0, opacity: 1, scale: 1 }}
              exit={{ rotateY: -90, opacity: 0, scale: 0.9 }}
              transition={{ type: "spring", damping: 20, stiffness: 100 }}
              className="relative bg-[#fdfbf7] w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-sm shadow-2xl border border-[#d4c4a8] flex flex-col" 
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className="sticky top-0 bg-[#fdfbf7]/95 backdrop-blur-md border-b border-[#e5ddcb] px-6 py-4 flex items-center justify-between z-10">
                <div className="flex items-center gap-3">
                  <activeCardData.icon className={`w-6 h-6 ${activeCardData.color}`} />
                  <h2 className="text-2xl font-bold text-[#1a1510] font-serif">{activeCardData.title}</h2>
                </div>
                <button 
                  onClick={() => setActiveCard(null)}
                  className="p-2 text-[#8b7355] hover:text-[#1a1510] hover:bg-[#e5ddcb] rounded-full transition-colors"
                  aria-label="Close"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="p-6 md:p-10 font-serif">
                {activeCardData.content}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default IrisCaseStudy;
