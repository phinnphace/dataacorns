import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Info, AlertCircle, Database, Map, Layers, RotateCcw, ArrowDown } from 'lucide-react';

const FlipCard = ({ title, icon: Icon, frontContent, backContent, satellite }: any) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className="relative flex flex-col items-center w-full">
      {/* Satellite Node */}
      {satellite && (
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 flex flex-col items-center z-20 w-48">
          <div className="bg-white border-2 border-stone-900 p-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] text-center relative">
            <span className="block text-[10px] font-mono font-bold text-nobel-gold uppercase mb-1">{satellite.title}</span>
            <span className="block text-xs text-stone-600 leading-tight">{satellite.content}</span>
          </div>
          {/* Connecting Line */}
          <div className="w-0.5 h-8 bg-stone-900"></div>
          {/* Arrow head */}
          <div className="w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[6px] border-t-stone-900"></div>
        </div>
      )}

      {/* Flip Card Container */}
      <div 
        className="w-full aspect-square relative cursor-pointer mt-8"
        style={{ perspective: '1000px' }}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <motion.div
          className="w-full h-full relative duration-500"
          style={{ transformStyle: 'preserve-3d' }}
          animate={{ rotateY: isFlipped ? 180 : 0 }}
        >
          {/* Front */}
          <div className="absolute inset-0 border-2 border-stone-900 bg-white p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] flex flex-col justify-between" style={{ backfaceVisibility: 'hidden' }}>
            <div className="flex justify-between items-start">
              <span className="text-[10px] font-mono font-bold uppercase">{title}</span>
              <Icon size={16} />
            </div>
            <div className="flex-grow flex items-center justify-center relative w-full h-full">
              {frontContent}
            </div>
            <div className="flex justify-between items-center text-[8px] font-mono text-stone-400">
              <span>TAP TO FLIP</span>
              <RotateCcw size={10} />
            </div>
          </div>

          {/* Back */}
          <div className="absolute inset-0 border-2 border-stone-900 bg-stone-900 text-white p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] flex flex-col overflow-y-auto" style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
            <div className="flex justify-between items-start mb-4">
              <span className="text-[10px] font-mono font-bold uppercase text-nobel-gold">{title} Details</span>
              <Icon size={16} className="text-nobel-gold" />
            </div>
            <div className="text-sm font-light leading-relaxed space-y-4">
              {backContent}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const MethodologyBreakdown: React.FC = () => {
  const [step, setStep] = useState(0);
  const [assessmentExpanded, setAssessmentExpanded] = useState(false);

  const dataPoints = Array.from({ length: 40 }).map((_, i) => ({
    id: i,
    initialX: Math.random() * 100,
    initialY: Math.random() * 100,
  }));

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((s) => (s + 1) % 3);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-32 bg-[#F4F4F0] text-stone-900 font-sans selection:bg-red-600 selection:text-white border-y border-stone-300 relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="mb-24 border-b-2 border-stone-900 pb-8 flex flex-col md:flex-row justify-between items-end gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-2 py-0.5 bg-stone-900 text-white text-[10px] font-bold tracking-tighter uppercase">Document: Audit-01</span>
              <span className="text-[10px] font-mono text-stone-500 uppercase tracking-widest">Classification: Methodology Breakdown</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-serif font-bold tracking-tight mb-4">
              The Shell Game <span className="italic font-normal text-stone-500">Protocol</span>
            </h2>
            <p className="text-stone-600 font-light leading-relaxed max-w-xl">
              Visualizing the systematic perturbation introduced by geographic crosswalking. 
              Tap the cards below to reveal the underlying audit steps and decision points.
            </p>
          </div>
        </div>

        {/* The Visual Component: The Shell Game */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start mb-16 relative pt-12">
          
          {/* Connecting Lines (Desktop only) */}
          <div className="hidden lg:block absolute top-[calc(50%+2rem)] left-[16.66%] right-[16.66%] h-0.5 bg-stone-300 -translate-y-1/2 z-0 pointer-events-none"></div>

          {/* Left: Source Boundary (ZIP) */}
          <div className="flex flex-col items-center relative z-10">
            <FlipCard
              title="Source Geography"
              icon={Database}
              satellite={{
                title: "Decision Point 1",
                content: "Analysts choose how to define membership"
              }}
              frontContent={
                <div className="w-full h-full relative overflow-hidden">
                  <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
                  <div className="grid grid-cols-4 gap-1 opacity-20 absolute inset-4">
                    {Array.from({ length: 16 }).map((_, i) => (
                      <div key={i} className="aspect-square border border-stone-900"></div>
                    ))}
                  </div>
                  <div className="absolute inset-0 p-8">
                    {dataPoints.map((p) => (
                      <motion.div
                        key={p.id}
                        className="absolute w-1.5 h-1.5 bg-stone-900 rounded-full"
                        animate={{
                          x: step === 0 ? `${p.initialX}%` : step === 1 ? '150%' : '-50%',
                          opacity: step === 0 ? 1 : 0,
                        }}
                        transition={{ duration: 1.5, ease: "easeInOut", delay: p.id * 0.02 }}
                      />
                    ))}
                  </div>
                  <div className="absolute bottom-2 right-2 text-[8px] font-mono text-stone-400">N = 40</div>
                </div>
              }
              backContent={
                <div className="text-sm font-light leading-relaxed space-y-4">
                  <p className="font-bold text-nobel-gold uppercase tracking-widest text-[10px]">Where proportionality enters</p>
                  
                  <div>
                    <h4 className="font-bold text-white mb-2">Decision Points Framework</h4>
                    <ul className="list-disc pl-4 space-y-1 text-stone-300">
                      <li><strong className="text-white">Decision Point 1:</strong> [Specific boundary alignment choice]</li>
                      <li><strong className="text-white">Decision Point 2:</strong> [Specific aggregation/distribution method]</li>
                    </ul>
                    <p className="text-stone-300 mt-2">The first hop produces a one-to-many mapping (ZCTA→&#123;ZIPs&#125;) that reflects common “lookup-style” workflows in applied settings.</p>
                  </div>

                  <div>
                    <h4 className="font-bold text-white mb-2">Step A — Association construction</h4>
                    <ul className="list-disc pl-4 space-y-1 text-stone-300">
                      <li>ZCTA ↔ ZIP relationships</li>
                      <li>No weights</li>
                      <li>No allocation</li>
                      <li>Just structure</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-bold text-white mb-2">Step B — Association audit (neutral)</h4>
                    <ul className="list-disc pl-4 space-y-1 text-stone-300">
                      <li>How many rows?</li>
                      <li>How many targets per source?</li>
                      <li>Where does fan-out occur?</li>
                    </ul>
                  </div>
                </div>
              }
            />
            <p className="mt-6 text-[10px] font-mono uppercase tracking-widest text-stone-500">Initial Analytic Sample</p>
          </div>

          {/* Middle: The Crosswalk (Transition) */}
          <div className="flex flex-col items-center justify-center relative z-10">
            <FlipCard
              title="Crosswalk Allocation"
              icon={Layers}
              satellite={{
                title: "Decision Point 2",
                content: "Crosswalk Selection"
              }}
              frontContent={
                <div className="w-full h-full flex flex-col items-center justify-center bg-[#F9F8F4] border border-stone-200 p-4">
                  <div className="w-16 h-16 rounded-full border-2 border-stone-900 flex items-center justify-center animate-pulse mb-4 bg-white">
                    <Layers size={24} className="text-stone-900" />
                  </div>
                  <div className="w-full h-12 bg-white border border-stone-200 relative overflow-hidden flex items-center justify-center">
                    <motion.div 
                      className="absolute inset-0 bg-red-500/10"
                      animate={{ opacity: [0.1, 0.3, 0.1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <div className="relative z-10 flex flex-col items-center">
                      <span className="text-[10px] font-mono font-bold text-red-600">PERTURBATION DETECTED</span>
                      <div className="flex gap-1 mt-1">
                        {Array.from({ length: 12 }).map((_, i) => (
                          <motion.div 
                            key={i}
                            className="w-1 h-2 bg-red-600"
                            animate={{ height: [4, 8, 4] }}
                            transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.1 }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              }
              backContent={
                <div className="text-sm font-light leading-relaxed space-y-4">
                  <div>
                    <h4 className="font-bold text-white mb-2">Step C.1 — Build ZIP-level population using a minimal, explicit rule</h4>
                    <p className="text-stone-300 mb-2">Measuring (precisely) Now we go where allocation starts in the workflow. In plain language this is called "I used X crosswalk" and is documented in the footnotes or references.</p>
                    <p className="text-stone-300 mb-2">This second decision point is 'build x-level population using a minimal, explicit rule'. This demonstration uses zip-level.</p>
                  </div>
                </div>
              }
            />
            <p className="mt-6 text-[10px] font-mono uppercase tracking-widest text-stone-500">Transformation Engine</p>
          </div>

          {/* Right: Target Boundary (County) */}
          <div className="flex flex-col items-center relative z-10">
            <FlipCard
              title="Target Geography"
              icon={Map}
              frontContent={
                <div className="w-full h-full relative overflow-hidden">
                  <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
                  <div className="grid grid-cols-2 gap-2 opacity-20 absolute inset-4">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <div key={i} className="aspect-square border-2 border-stone-900 rounded-full"></div>
                    ))}
                  </div>
                  <div className="absolute inset-0 p-8">
                    {dataPoints.map((p) => (
                      <motion.div
                        key={p.id}
                        className="absolute w-1.5 h-1.5 bg-red-600 rounded-full"
                        animate={{
                          x: step === 2 ? `${p.initialX + (Math.random() * 20 - 10)}%` : step === 0 ? '-150%' : '150%',
                          y: step === 2 ? `${p.initialY + (Math.random() * 20 - 10)}%` : `${p.initialY}%`,
                          opacity: step === 2 ? 1 : 0,
                          scale: step === 2 ? [1, 1.5, 1] : 1,
                        }}
                        transition={{ duration: 1.5, ease: "easeInOut", delay: p.id * 0.02 }}
                      />
                    ))}
                  </div>
                  <div className="absolute bottom-2 right-2 text-[8px] font-mono text-red-600 font-bold">ΔX APPLIED</div>
                </div>
              }
              backContent={
                <div className="text-sm font-light leading-relaxed space-y-4">
                  <div>
                    <h4 className="font-bold text-nobel-gold mb-2 uppercase tracking-widest text-[10px]">Hop 2: ZIP → County</h4>
                    <p className="text-stone-300 mb-2">ZIP-level allocated values are joined to the HUD ZIP-County crosswalk and weighted by TOT_RATIO (or alternative ratio).</p>
                    <ul className="list-disc pl-4 space-y-1 text-stone-300">
                      <li>Values are summed to the county level.</li>
                      <li>Introduces additional perturbation as values are redistributed across county boundaries.</li>
                    </ul>
                    <p className="text-stone-400 italic text-xs mt-2">At this stage, the analyst is no longer working with the original statistical units; the analytical surface has already shifted.</p>
                  </div>
                </div>
              }
            />
            <p className="mt-6 text-[10px] font-mono uppercase tracking-widest text-red-600 font-bold">Allocated Analytic Sample</p>
          </div>
        </div>

        {/* Auditing the Audit Section */}
        <div className="mt-32 border-t-2 border-stone-900 pt-16">
          <button 
            onClick={() => setAssessmentExpanded(!assessmentExpanded)}
            className="flex items-center gap-4 text-stone-900 hover:text-stone-600 transition-colors font-bold tracking-widest uppercase text-xs w-full text-left mb-8"
          >
            <Database size={16} />
            {assessmentExpanded ? 'Hide NHGIS Assessment' : 'View NHGIS Interpolation Assessment'}
            <ArrowDown size={14} className={`transition-transform duration-300 ${assessmentExpanded ? 'rotate-180' : ''}`} />
          </button>

          <AnimatePresence>
            {assessmentExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="mb-12 pt-8">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-2 py-0.5 bg-stone-900 text-white text-[10px] font-bold tracking-tighter uppercase">Assessment: Control</span>
                    <span className="text-[10px] font-mono text-stone-500 uppercase tracking-widest">Auditing the Audit</span>
                  </div>
                  <h3 className="text-4xl font-serif font-bold tracking-tight mb-4">NHGIS Interpolation Assessment</h3>
                  <p className="text-stone-600 font-light leading-relaxed max-w-3xl">
                    During development, we implemented the IPUMS NHGIS geographic interpolation crosswalk to evaluate perturbation under a block-based allocation framework. This serves as an assessment of the package, methodology, and mathematical functionality using standard controls.
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 pb-16">
                  {/* Prose / Notes */}
                  <div className="space-y-8">
                    <div>
                      <h4 className="font-bold text-stone-900 uppercase tracking-widest text-xs mb-3">IPUMS / NHGIS Interpolation Methodology</h4>
                      <p className="text-sm text-stone-600 leading-relaxed mb-4">
                        IPUMS NHGIS recommends that geographic crosswalks be constructed from the lowest available census geography to minimize interpolation error when transforming summary data between boundary systems.
                      </p>
                      <blockquote className="border-l-2 border-nobel-gold pl-4 text-sm italic text-stone-500 my-4">
                        “To transform summary data from one census’s geographic units to another’s, it’s important to start from the lowest possible level.”
                      </blockquote>
                      <p className="text-sm text-stone-600 leading-relaxed">
                        Because the demonstration variable used in development testing is total population from the decennial census, the appropriate NHGIS pathway is a block-to-tract crosswalk. Accordingly, the crosswalk selected for testing was the Minnesota 2010 Census block → 2020 Census tract crosswalk.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-bold text-stone-900 uppercase tracking-widest text-xs mb-3">Data Integrity and Cleaning</h4>
                      <p className="text-sm text-stone-600 leading-relaxed">
                        The IPUMS/NHGIS README accompanying this crosswalk describes the structure and intended use of the interpolation weights. Because crosswalk files frequently contain auxiliary fields and formatting that vary across software environments, light preprocessing was required to standardize the dataset for analysis.
                      </p>
                    </div>
                  </div>

                  {/* Code / Output Terminal */}
                  <div className="bg-stone-900 rounded-sm overflow-hidden flex flex-col shadow-lg">
                    <div className="bg-stone-800 px-4 py-2 flex items-center gap-2 border-b border-stone-700">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
                      <span className="ml-2 text-[10px] font-mono text-stone-400">nhgis_audit.R</span>
                    </div>
                    <div className="p-6 font-mono text-xs text-stone-300 overflow-x-auto space-y-4">
                      <div>
                        <span className="text-stone-500"># 1. Read the crosswalk and filter to tract</span><br/>
                        <span className="text-blue-400">xwalk_t</span> {"<-"} xwalk |&gt;<br/>
                        &nbsp;&nbsp;filter(tr2020ge == <span className="text-green-400">"27053101600"</span>)<br/>
                        <br/>
                        <span className="text-stone-500"># Check IDs</span><br/>
                        <span className="text-blue-400">xwalk_t</span> |&gt; summarise(<br/>
                        &nbsp;&nbsp;atoms = n(),<br/>
                        &nbsp;&nbsp;n_blocks = n_distinct(blk2010ge),<br/>
                        &nbsp;&nbsp;weight_sum = sum(weight, na.rm = <span className="text-purple-400">TRUE</span>)<br/>
                        )<br/>
                        <span className="text-nobel-gold"># A tibble: 1 × 3<br/>
                        #   atoms n_blocks weight_sum<br/>
                        #   &lt;int&gt;    &lt;int&gt;      &lt;dbl&gt;<br/>
                        # 1    54       54         54</span>
                      </div>
                      
                      <div>
                        <span className="text-stone-500"># 2. Join + apply NHGIS weight + sum to the tract</span><br/>
                        <span className="text-blue-400">tract_est</span> {"<-"} xwalk_t |&gt;<br/>
                        &nbsp;&nbsp;left_join(blk_pop_2010, by = <span className="text-green-400">"blk2010ge"</span>) |&gt;<br/>
                        &nbsp;&nbsp;mutate(pop_alloc = pop2010 * weight) |&gt;<br/>
                        &nbsp;&nbsp;summarise(<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;pop2010_est_in_tr2020 = sum(pop_alloc, na.rm = <span className="text-purple-400">TRUE</span>),<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;pct_blocks_matched = 100 * blocks_matched / blocks_total<br/>
                        &nbsp;&nbsp;)<br/>
                        <span className="text-nobel-gold"># A tibble: 1 × 2<br/>
                        #   pop2010_est_in_tr2020 pct_blocks_matched<br/>
                        #                   &lt;dbl&gt;              &lt;dbl&gt;<br/>
                        # 1                  2437                100</span>
                      </div>

                      <div className="mt-6 pt-4 border-t border-stone-700">
                        <span className="text-red-400 font-bold">Conclusion:</span><br/>
                        <span className="text-stone-100">When we follow NHGIS/IPUMS best-practice interpolation exactly, the resulting estimates are internally stable. However, the transformation still produces a non-zero Δx relative to alternate boundary representations, and this change is undocumented in downstream use.</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default MethodologyBreakdown;

