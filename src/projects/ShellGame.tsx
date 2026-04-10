import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowDown, Menu, X, BookOpen, Github, FileText, ExternalLink, ShieldAlert, BarChart3, MapPin, GitBranch, Database } from 'lucide-react';
import MethodologyBreakdown from '../../components/MethodologyBreakdown';
import AuditIntro from '../../components/AuditIntro';

const PackageCard = ({ name, description, features, icon: Icon }: { name: string, description: string, features: string[], icon: any }) => {
  return (
    <div className="flex flex-col p-8 bg-white border-2 border-stone-900 shadow-[8px_8px_0px_0px_rgba(0,0,0,0.1)] hover:shadow-[12px_12px_0px_0px_rgba(197,160,89,0.3)] transition-all duration-300">
      <div className="w-12 h-12 bg-stone-900 text-white flex items-center justify-center mb-6">
        <Icon size={24} />
      </div>
      <h3 className="font-mono text-2xl font-bold mb-4 uppercase tracking-tighter">{name}</h3>
      <p className="text-stone-600 mb-6 font-light leading-relaxed">{description}</p>
      <ul className="space-y-3 mb-8">
        {features.map((f, i) => (
          <li key={i} className="flex items-start gap-3 text-sm text-stone-500">
            <span className="mt-1.5 w-1.5 h-1.5 bg-nobel-gold flex-shrink-0"></span>
            <span>{f}</span>
          </li>
        ))}
      </ul>
      <div className="mt-auto flex gap-4">
        <a href="#" className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest hover:text-nobel-gold transition-colors">
          <Github size={14} /> GitHub
        </a>
        <a href="#" className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest hover:text-nobel-gold transition-colors">
          <FileText size={14} /> Docs
        </a>
      </div>
    </div>
  );
};

const ShellGame: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [activeCrosswalk, setActiveCrosswalk] = useState<'census' | 'hud' | 'nhgis'>('census');
  const [auditExpanded, setAuditExpanded] = useState(false);
  const [abstractExpanded, setAbstractExpanded] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-[#F9F8F4] text-stone-900 font-sans selection:bg-stone-900 selection:text-white">
      
      {/* Navigation */}
      <nav className={`fixed top-12 left-0 right-0 z-40 transition-all duration-300 ${scrolled ? 'bg-[#F9F8F4]/90 backdrop-blur-md border-b border-stone-200 py-4' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-10 h-10 bg-stone-900 text-white flex items-center justify-center font-mono font-bold text-xl">SG</div>
            <div className="flex flex-col">
              <span className="font-mono font-bold text-sm tracking-tighter leading-none">SHELLGAME</span>
              <span className="font-mono text-[10px] text-stone-400 tracking-widest uppercase">Audit Protocol</span>
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-[10px] font-bold tracking-[0.2em] uppercase text-stone-500">
            <a href="#abstract" onClick={scrollToSection('abstract')} className="hover:text-stone-900 transition-colors">Abstract</a>
            <a href="#methodology" onClick={scrollToSection('methodology')} className="hover:text-stone-900 transition-colors">Methodology</a>
            <a href="#packages" onClick={scrollToSection('packages')} className="hover:text-stone-900 transition-colors">Packages</a>
            <a href="#impact" onClick={scrollToSection('impact')} className="hover:text-stone-900 transition-colors">Impact</a>
            <a 
              href="#" 
              className="px-6 py-2 bg-stone-900 text-white hover:bg-stone-800 transition-colors shadow-sm"
            >
              R-CRAN
            </a>
          </div>

          <button className="md:hidden text-stone-900 p-2" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-30 bg-[#F9F8F4] flex flex-col items-center justify-center gap-8 text-xs font-bold tracking-widest uppercase animate-fade-in">
            <a href="#abstract" onClick={scrollToSection('abstract')} className="hover:text-nobel-gold transition-colors">Abstract</a>
            <a href="#methodology" onClick={scrollToSection('methodology')} className="hover:text-nobel-gold transition-colors">Methodology</a>
            <a href="#packages" onClick={scrollToSection('packages')} className="hover:text-nobel-gold transition-colors">Packages</a>
            <a href="#impact" onClick={scrollToSection('impact')} className="hover:text-nobel-gold transition-colors">Impact</a>
            <a href="#" className="px-8 py-3 bg-stone-900 text-white shadow-lg">R-CRAN</a>
        </div>
      )}

      {/* Hero Section: Lab Report Style */}
      <header className="relative min-h-screen flex items-center pt-32 pb-24 overflow-hidden border-b border-stone-200 bg-white">
        {/* Background Grid */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
             style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '60px 60px' }}></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-5xl mx-auto"
          >
            {/* Lab Report Badge */}
            <div className="flex items-center gap-4 mb-12">
              <div className="px-3 py-1 bg-stone-900 text-white text-[10px] font-mono font-bold tracking-[0.3em] uppercase">
                Data Audit: SG-2026-03
              </div>
              <div className="h-px flex-grow bg-stone-100"></div>
              <div className="text-[10px] font-mono text-stone-400 uppercase tracking-widest">
                Confidential // Internal Use Only
              </div>
            </div>

            {/* Monospaced Headline */}
            <h1 className="font-mono text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.1] mb-12 text-stone-900 tracking-tighter uppercase">
              The greatest trick <br/>
              <span className="text-red-600">allocation</span> ever pulled <br/>
              was convincing everyone <br/>
              it was <span className="italic">observations</span>.
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-end mb-16">
              <div className="md:col-span-7">
                <p className="text-xl text-stone-500 font-light leading-relaxed border-l-2 border-stone-900 pl-8">
                  Auditing the epistemic failure mode of treating geographic transformation as a sequence of decisions that alter the underlying data-generating process.
                </p>
              </div>
              <div className="md:col-span-5 flex justify-end">
                <div className="font-mono text-[10px] text-stone-400 space-y-1 text-right">
                  <div>REF: SHELLGAME PROTOCOL</div>
                  <div>VER: 1.0.4-BETA</div>
                  <div>TIMESTAMP: 2026-03-18T13:02:07Z</div>
                </div>
              </div>
            </div>

            {/* Interactive Maps Component */}
            <div className="w-full mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
              {/* Legacy Map Container */}
              <div 
                className="relative group cursor-crosshair border border-stone-200 bg-white p-4 shadow-sm"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <div className="absolute top-0 left-0 bg-stone-900 text-white text-[8px] px-2 py-0.5 font-mono uppercase tracking-widest z-20">
                  Source: Baseline (n=74)
                </div>
                
                <div className="relative aspect-[4/3] overflow-hidden bg-[#F9F8F4] border border-stone-100 p-2 flex items-center justify-center">
                  {/* Legacy Map */}
                  <img 
                    src="https://drive.google.com/thumbnail?id=1KiD0eBpk7iLesS3kZucboVIJx-okXSyF&sz=w1000" 
                    alt="Legacy ZCTA Map" 
                    className="w-full h-full object-contain opacity-100 group-hover:opacity-30 transition-opacity duration-500"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Ghosting / Flickering Effect */}
                  <AnimatePresence>
                    {isHovered && (
                      <motion.div
                        initial={{ opacity: 0, filter: "blur(4px)" }}
                        animate={{ 
                          opacity: [0, 0.8, 0.4, 0.9, 0.5, 1],
                          x: [0, -4, 4, -2, 2, 0],
                          y: [0, 2, -3, 1, -1, 0],
                          filter: ["blur(4px)", "blur(0px)", "blur(2px)", "blur(0px)"],
                          scale: [1, 1.02, 0.98, 1.01, 1]
                        }}
                        exit={{ opacity: 0, filter: "blur(4px)" }}
                        transition={{ 
                          duration: 0.4,
                          repeat: Infinity,
                          repeatType: "mirror"
                        }}
                        className="absolute inset-0 pointer-events-none z-10 p-2 flex items-center justify-center mix-blend-multiply"
                      >
                        <img 
                          src="https://drive.google.com/thumbnail?id=1MViWTgZLcziEp-jSColjPYx3dBc0xPJp&sz=w1000" 
                          alt="Perturbed Ghost" 
                          className="w-full h-full object-contain opacity-80"
                          referrerPolicy="no-referrer"
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                
                <div className="mt-4 flex justify-between items-end">
                  <div className="font-mono text-[10px] text-stone-400 uppercase tracking-widest">
                    Fig 01.A // Relationship-based
                  </div>
                  <div className="text-[10px] font-bold text-stone-900 uppercase tracking-tighter">
                    Observation Baseline
                  </div>
                </div>
              </div>

              {/* Perturbed Map Container */}
              <div className="relative border border-stone-200 bg-white p-4 shadow-sm">
                <div className="absolute top-0 left-0 bg-red-600 text-white text-[8px] px-2 py-0.5 font-mono uppercase tracking-widest z-20">
                  Result: Perturbed (ΔX)
                </div>
                
                <div className="relative aspect-[4/3] overflow-hidden bg-[#F9F8F4] border border-stone-100 p-2 flex items-center justify-center">
                  {/* Perturbed Map */}
                  <img 
                    src="https://drive.google.com/thumbnail?id=1MViWTgZLcziEp-jSColjPYx3dBc0xPJp&sz=w1000" 
                    alt="Perturbed Map" 
                    className={`w-full h-full object-contain transition-all duration-700 ${isHovered ? 'scale-[1.03] drop-shadow-xl' : 'opacity-90'}`}
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Subtle Glitch Overlay when hovered */}
                  {isHovered && (
                    <motion.div 
                      animate={{ 
                        opacity: [0, 0.2, 0],
                        backgroundColor: ["transparent", "rgba(220,38,38,0.15)", "transparent"]
                      }}
                      transition={{ duration: 0.15, repeat: Infinity }}
                      className="absolute inset-0 pointer-events-none mix-blend-overlay"
                    />
                  )}
                </div>
                
                <div className="mt-4 flex justify-between items-end">
                  <div className="font-mono text-[10px] text-stone-400 uppercase tracking-widest">
                    Fig 01.B // Geometric Intersection
                  </div>
                  <div className="text-[10px] font-bold text-red-600 uppercase tracking-tighter">
                    Allocated Proxy
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-20 flex flex-col gap-8">
              <div className="flex flex-wrap gap-8 items-center">
                 <button onClick={() => setAuditExpanded(!auditExpanded)} className={`px-10 py-5 font-bold text-xs tracking-widest uppercase transition-all flex items-center gap-3 ${auditExpanded ? 'bg-nobel-gold text-stone-900 shadow-inner' : 'bg-stone-900 text-white hover:bg-stone-800'}`}>
                    INITIATE AUDIT <ArrowDown size={14} className={`transition-transform duration-300 ${auditExpanded ? 'rotate-180' : ''}`} />
                 </button>
                 <div className="flex items-center gap-6">
                    <div className="flex flex-col">
                      <span className="text-[10px] font-mono text-stone-400 uppercase tracking-widest">Status</span>
                      <span className="text-xs font-bold text-green-600 uppercase">Operational</span>
                    </div>
                    <div className="w-px h-8 bg-stone-200"></div>
                    <div className="flex flex-col">
                      <span className="text-[10px] font-mono text-stone-400 uppercase tracking-widest">Integrity</span>
                      <span className="text-xs font-bold text-stone-900 uppercase tracking-tighter">98.4% Audited</span>
                    </div>
                 </div>
              </div>
              
              <AnimatePresence>
                {auditExpanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden bg-stone-900 rounded-sm"
                  >
                    <div className="p-8">
                      <AuditIntro />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </header>

      <main>
        {/* Abstract Section */}
        <section id="abstract" className="py-12 bg-white border-b border-stone-200">
          <div className="container mx-auto px-6 md:px-12">
            <button 
              onClick={() => setAbstractExpanded(!abstractExpanded)}
              className="flex items-center gap-4 text-stone-900 hover:text-stone-600 transition-colors font-bold tracking-widest uppercase text-xs w-full text-left"
            >
              <BookOpen size={16} />
              {abstractExpanded ? 'Hide Abstract' : 'Read Abstract'}
              <ArrowDown size={14} className={`transition-transform duration-300 ${abstractExpanded ? 'rotate-180' : ''}`} />
            </button>
            
            <AnimatePresence>
              {abstractExpanded && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <div className="pt-12 grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
                    <div className="md:col-span-4">
                      <div className="inline-block mb-3 text-[10px] font-bold tracking-[0.3em] text-stone-400 uppercase">Abstract</div>
                      <h2 className="font-serif text-4xl mb-6 leading-tight text-stone-900">The Structured <br/>Uncertainty</h2>
                      <div className="w-16 h-1 bg-stone-900 mb-6"></div>
                      <div className="font-mono text-[10px] text-stone-400 uppercase tracking-widest">
                        Ref: NHGIS / HUD USPS / IPUMS
                      </div>
                    </div>
                    <div className="md:col-span-8 text-lg text-stone-600 leading-relaxed space-y-8">
                      <p className="first-letter:text-6xl first-letter:font-serif first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:text-stone-900">
                        Geographic crosswalking, which is commonplace in population data workflows, is often described as the harmonization of datasets across boundary systems. In practice, crosswalks allocate observations between administrative geographies, altering the analytic sample while preserving the variable name. This work introduces two R packages designed to quantify perturbation (ΔX) introduced by crosswalk allocation. The first, <strong className="text-stone-900">shellgame</strong>, introduces a conceptual framework and audit protocol for documenting crosswalk assumptions and evaluating how allocation alters the analytic sample. Second, <strong className="text-stone-900">geoDeltaAudit</strong> quantifies perturbation, ΔX(VAR), across allocation steps, making crosswalk-induced sample change measurable.
                      </p>
                      <p>
                        The demonstration workflow defines geographic membership using census relationship files and allocates ZIP-level observations to counties using the Housing and Urban Development, United States Postal Service ZIP–county crosswalk (TOT_RATIO). Development testing also evaluates an National Historical Geographic Information Society (NHGIS) Integrated Public Microdata Series NHGIS block-to-tract interpolation crosswalk derived from block-level geographic relationships. Preliminary results demonstrate measurable perturbation introduced solely through allocation choices prior to statistical analysis. These findings indicate that crosswalk transformations should be treated as allocation procedures and support the use of auditing tools to evaluate crosswalk assumptions in population-data workflows.
                      </p>
                      <p>
                        The allocated outputs imputed via crosswalks are treated as direct measurements. This is the shell game. The variable remains the same, but the underlying sample changes. Methodological artifacts conflate with observations. This structured uncertainty disproportionately impacts boundary communities but remains unquantified in standard workflows. <strong className="text-stone-900">shellgame</strong> and <strong className="text-stone-900">geoDeltaAudit</strong> make these transformations measurable, enabling analysts to document how crosswalk choices shape the results used for funding, resource allocation, and policy implementation.
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-8">
                        <div className="p-6 bg-[#F9F8F4] border border-stone-200">
                          <h4 className="font-mono text-xs font-bold mb-2 uppercase tracking-widest text-stone-900">Key Finding 01</h4>
                          <p className="text-sm text-stone-500 italic">Allocated outputs imputed via crosswalks are treated as direct measurements. This is the shell game.</p>
                        </div>
                        <div className="p-6 bg-[#F9F8F4] border border-stone-200">
                          <h4 className="font-mono text-xs font-bold mb-2 uppercase tracking-widest text-stone-900">Key Finding 02</h4>
                          <p className="text-sm text-stone-500 italic">Measurable perturbation is introduced solely through allocation choices prior to statistical analysis.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>

        {/* Methodology Component */}
        <section id="methodology">
          <MethodologyBreakdown />
        </section>

        {/* The Packages */}
        <section id="packages" className="py-24 bg-white border-t border-stone-200">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <div className="inline-block mb-3 text-[10px] font-bold tracking-[0.3em] text-stone-400 uppercase">Software Suite</div>
              <h2 className="font-serif text-5xl mb-4 text-stone-900">Audit Tools</h2>
              <p className="text-stone-500 max-w-2xl mx-auto font-light">Two specialized R packages for documenting and quantifying crosswalk-induced sample change.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
              <PackageCard 
                name="shellgame"
                icon={ShieldAlert}
                description="Introduces a conceptual framework and audit protocol for documenting crosswalk assumptions."
                features={[
                  "Standardized audit documentation",
                  "Assumption validation framework",
                  "Sample integrity scoring",
                  "Metadata generation for workflows"
                ]}
              />
              <PackageCard 
                name="geoDeltaAudit"
                icon={BarChart3}
                description="Quantifies perturbation (ΔX) across allocation steps, making sample change measurable."
                features={[
                  "ΔX(VAR) quantification engine",
                  "Step-by-step perturbation tracking",
                  "Support for Census & HUD crosswalks",
                  "Visualization of allocation bias"
                ]}
              />
            </div>
          </div>
        </section>

        {/* Impact Section */}
        <section id="impact" className="py-24 bg-stone-900 text-white relative overflow-hidden">
          {/* Decorative background */}
          <div className="absolute top-0 right-0 w-1/3 h-full bg-white/5 skew-x-12 translate-x-1/2"></div>
          
          <div className="container mx-auto px-6 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <div className="inline-block mb-6 px-3 py-1 border border-white/30 text-white/50 text-[10px] font-bold tracking-[0.3em] uppercase">
                  Policy & Implementation
                </div>
                <h2 className="font-serif text-5xl md:text-6xl mb-8 leading-tight">Beyond <br/><span className="italic text-stone-400">Harmonization</span></h2>
                <div className="space-y-6 text-stone-400 text-lg font-light leading-relaxed">
                  <p>
                    Crosswalk transformations should be treated as <strong className="text-white">allocation procedures</strong>. Treating them as simple harmonization masks the underlying sample changes that can skew results.
                  </p>
                  <p>
                    By making these transformations measurable, we enable analysts to document how crosswalk choices shape results used in <strong className="text-white">funding, resource allocation, and policy implementation</strong>.
                  </p>
                </div>
                
                <div className="mt-12">
                  <div className="flex items-center gap-4 mb-6">
                    <GitBranch size={16} className="text-stone-500" />
                    <span className="text-[10px] font-mono text-stone-500 uppercase tracking-widest">Source Files</span>
                    <div className="flex bg-white/10 p-1 rounded-sm border border-white/10">
                      <button 
                        onClick={() => setActiveCrosswalk('census')}
                        className={`px-4 py-1.5 text-xs font-bold uppercase tracking-widest transition-colors ${activeCrosswalk === 'census' ? 'bg-nobel-gold text-stone-900' : 'text-stone-400 hover:text-white'}`}
                      >
                        Census Files
                      </button>
                      <button 
                        onClick={() => setActiveCrosswalk('hud')}
                        className={`px-4 py-1.5 text-xs font-bold uppercase tracking-widest transition-colors ${activeCrosswalk === 'hud' ? 'bg-nobel-gold text-stone-900' : 'text-stone-400 hover:text-white'}`}
                      >
                        HUD USPS
                      </button>
                      <button 
                        onClick={() => setActiveCrosswalk('nhgis')}
                        className={`px-4 py-1.5 text-xs font-bold uppercase tracking-widest transition-colors ${activeCrosswalk === 'nhgis' ? 'bg-nobel-gold text-stone-900' : 'text-stone-400 hover:text-white'}`}
                      >
                        NHGIS
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-6">
                    <AnimatePresence mode="wait">
                      {activeCrosswalk === 'census' && (
                        <motion.a 
                          key="census"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          href="/acs_zcta_hennepin.csv" 
                          download 
                          className="group flex items-center gap-4 p-4 border border-white/10 hover:border-nobel-gold/50 hover:bg-white/5 transition-all cursor-pointer rounded-sm w-full sm:w-auto"
                        >
                          <div className="w-12 h-12 rounded-full bg-white/10 group-hover:bg-nobel-gold/20 flex items-center justify-center transition-colors">
                            <MapPin className="text-nobel-gold" />
                          </div>
                          <div className="flex flex-col">
                            <span className="text-xs font-bold uppercase tracking-widest text-white group-hover:text-nobel-gold transition-colors">Download Census Mapping</span>
                            <span className="text-[10px] font-mono text-stone-500">acs_zcta_hennepin.csv</span>
                          </div>
                        </motion.a>
                      )}
                      
                      {activeCrosswalk === 'hud' && (
                        <motion.a 
                          key="hud"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          href="/zip_county_hud_hennepin.csv" 
                          download 
                          className="group flex items-center gap-4 p-4 border border-white/10 hover:border-nobel-gold/50 hover:bg-white/5 transition-all cursor-pointer rounded-sm w-full sm:w-auto"
                        >
                          <div className="w-12 h-12 rounded-full bg-white/10 group-hover:bg-nobel-gold/20 flex items-center justify-center transition-colors">
                            <ExternalLink className="text-nobel-gold" />
                          </div>
                          <div className="flex flex-col">
                            <span className="text-xs font-bold uppercase tracking-widest text-white group-hover:text-nobel-gold transition-colors">Download HUD Crosswalk</span>
                            <span className="text-[10px] font-mono text-stone-500">zip_county_hud_hennepin.csv</span>
                          </div>
                        </motion.a>
                      )}

                      {activeCrosswalk === 'nhgis' && (
                        <motion.a 
                          key="nhgis"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          href="/nhgis_blk2010_tr2020_27.csv" 
                          download 
                          className="group flex items-center gap-4 p-4 border border-white/10 hover:border-nobel-gold/50 hover:bg-white/5 transition-all cursor-pointer rounded-sm w-full sm:w-auto"
                        >
                          <div className="w-12 h-12 rounded-full bg-white/10 group-hover:bg-nobel-gold/20 flex items-center justify-center transition-colors">
                            <Database className="text-nobel-gold" />
                          </div>
                          <div className="flex flex-col">
                            <span className="text-xs font-bold uppercase tracking-widest text-white group-hover:text-nobel-gold transition-colors">Download NHGIS Crosswalk</span>
                            <span className="text-[10px] font-mono text-stone-500">nhgis_blk2010_tr2020_27.csv</span>
                          </div>
                        </motion.a>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
              
              <div className="bg-white/5 p-12 border border-white/10 backdrop-blur-sm">
                <blockquote className="space-y-8">
                  <p className="font-serif text-3xl italic text-stone-200 leading-snug">
                    "Methodological artifacts conflate with observations. This structured uncertainty disproportionately impacts boundary communities."
                  </p>
                  <footer className="flex items-center gap-4">
                    <div className="w-12 h-px bg-nobel-gold"></div>
                    <div className="flex flex-col">
                      <cite className="not-italic font-bold text-xs uppercase tracking-[0.2em]">The Shell Game Protocol</cite>
                      <span className="text-[10px] font-mono text-stone-500">Audit Documentation v1.0</span>
                    </div>
                  </footer>
                </blockquote>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#F4F4F0] border-t border-stone-200 py-24">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-start gap-12">
            <div className="max-w-md">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-stone-900 text-white flex items-center justify-center font-mono font-bold text-2xl">SG</div>
                <h3 className="font-mono font-bold text-xl tracking-tighter uppercase">ShellGame Suite</h3>
              </div>
              <p className="text-stone-500 text-sm leading-relaxed mb-8">
                A research-driven toolkit for auditing geographic crosswalks and quantifying sample perturbation in population data workflows.
              </p>
              <div className="flex gap-4">
                <a href="#" className="p-2 border border-stone-300 hover:border-stone-900 transition-colors"><Github size={18} /></a>
                <a href="#" className="p-2 border border-stone-300 hover:border-stone-900 transition-colors"><FileText size={18} /></a>
                <a href="#" className="p-2 border border-stone-300 hover:border-stone-900 transition-colors"><ExternalLink size={18} /></a>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-12">
              <div>
                <h4 className="font-mono text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-6">Packages</h4>
                <ul className="space-y-3 text-sm font-medium">
                  <li><a href="#" className="hover:text-nobel-gold transition-colors">shellgame</a></li>
                  <li><a href="#" className="hover:text-nobel-gold transition-colors">geoDeltaAudit</a></li>
                  <li><a href="#" className="hover:text-nobel-gold transition-colors">CRAN Repository</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-mono text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-6">Resources</h4>
                <ul className="space-y-3 text-sm font-medium">
                  <li><a href="#" className="hover:text-nobel-gold transition-colors">Documentation</a></li>
                  <li><a href="#" className="hover:text-nobel-gold transition-colors">Vignettes</a></li>
                  <li><a href="#" className="hover:text-nobel-gold transition-colors">Research Paper</a></li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="mt-24 pt-8 border-t border-stone-200 flex flex-col md:flex-row justify-between items-center gap-6 font-mono text-[10px] text-stone-400 uppercase tracking-widest">
            <span>© 2026 ShellGame Protocol. All Rights Reserved.</span>
            <div className="flex gap-8">
              <a href="#" className="hover:text-stone-900 transition-colors">Privacy</a>
              <a href="#" className="hover:text-stone-900 transition-colors">Terms</a>
              <a href="#" className="hover:text-stone-900 transition-colors">License</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ShellGame;
