import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Calendar, MapPin, Download, BookOpen, X, FileText, ArrowRight, Award, Compass, Sparkles, ChevronRight, Share2, Copy, Check } from 'lucide-react';

interface Abstract {
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
    summary: 'A novel framework and audit protocol for documenting boundary crosswalk assumptions and evaluating how geographic allocation alters the target analytic sample.',
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
    pdfName: '',
    tags: ['Crosswalk Audit', 'geoDeltaAudit', 'Population Data', 'Spatial Equity'],
    type: 'SACNAS',
    citeChicago: 'Markson, P., Rao, K. "The Shell Game: Auditing Allocation in Crosswalked Population Data." SACNAS Annual National Conference, Long Beach, California October 29-31, 2026.',
    citeBibtex: `@inproceedings{markson2026shell,\n  author    = {Markson, P. and Rao, K.},\n  title     = {The Shell Game: Auditing Allocation in Crosswalked Population Data},\n  booktitle = {SACNAS National Diversity in STEM Conference},\n  address   = {San Juan, Puerto Rico},\n  month     = {October},\n  year      = {2025}\n}`
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
    summary: 'A proposed shift from identity-based risk profiling in HIV/STI public health messaging to a behavior-centered, mechanistic framework emphasizing condomless penetrative sex.',
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
    pdfName: '',
    tags: ['Health Communication', 'Universal Precaution', 'Epidemiology', 'Stigma Reduction'],
    type: 'ABRCMS',
    citeChicago: 'Selnko, T. and P. Markson. "Stop Saying Who, Start Saying How: A Mechanistic Approach to Public Health Messaging." In Proceedings of the Annual Biomedical Research Conference for Minoritized Scientists (ABRCMS), San Antonio, TX, November 19-22, 2025.',
    citeBibtex: `@inproceedings{selnko2025stopsaying,\n  author    = {Selnko, T. and Markson, P.},\n  title     = {Stop Saying Who, Start Saying How: A Mechanistic Approach to Public Health Messaging},\n  booktitle = {Annual Biomedical Research Conference for Minoritized Scientists (ABRCMS)},\n  address   = {San Antonio, Texas},\n  month     = {November},\n  year      = {2025}\n}`
  }
];

// High-fidelity rendering of the conference thumbnails inside the cards
const ConferenceThumbnail = ({ type, id }: { type: string; id?: string }) => {
  if (id === 'stop-saying-who') {
    return (
      <div className="w-full h-32 bg-stone-100 flex items-center justify-center relative border-b border-stone-200 select-none overflow-hidden">
        <img 
          src="/abrcms_2025_official.png" 
          alt="ABRCMS 2025: Stop Saying Who, Start Saying How" 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
      </div>
    );
  }
  if (type === 'ABRCMS') {
    // Exact visual representation of the uploaded ABRCMS file
    return (
      <div className="w-full h-32 bg-white flex flex-col justify-between p-3 relative border border-stone-200 select-none overflow-hidden">
        {/* Core ABRCMS branding background style */}
        <div className="flex-1 flex items-center justify-center gap-1.5 pt-2">
          {/* ABRCMS Segmented Radial Wheel */}
          <div className="relative w-12 h-12 flex-shrink-0">
            <svg viewBox="0 0 100 100" className="w-full h-full rotate-[15deg]">
              <circle cx="50" cy="50" r="40" fill="none" stroke="#E5E7EB" strokeWidth="2" strokeDasharray="5 5" />
              {[...Array(12)].map((_, i) => {
                const colors = ['#E11D48', '#0EA5E9', '#10B981', '#F59E0B', '#6366F1', '#EC4899'];
                const angle = (i * 360) / 12;
                return (
                  <line
                    key={i}
                    x1="50"
                    y1="50"
                    x2={50 + 40 * Math.cos((angle * Math.PI) / 180)}
                    y2={50 + 40 * Math.sin((angle * Math.PI) / 180)}
                    stroke={colors[i % colors.length]}
                    strokeWidth="7"
                    strokeDasharray="14 10"
                    strokeLinecap="round"
                  />
                );
              })}
              <circle cx="50" cy="50" r="28" fill="#FFFFFF" />
              <circle cx="50" cy="50" r="16" fill="none" stroke="#000000" strokeWidth="0.5" strokeDasharray="3 3" />
            </svg>
          </div>

          <div className="flex flex-col text-left font-sans leading-none">
            <div className="flex items-baseline gap-1">
              <span className="font-extrabold text-lg sm:text-xl text-stone-900 tracking-tighter">ABRCMS</span>
            </div>
            <span className="text-[7.5px] text-stone-500 font-bold tracking-tight uppercase mt-1">
              Biomedical Research Conference
            </span>
          </div>
        </div>

        {/* Technical tag */}
        <div className="flex justify-between items-center text-[7.5px] font-mono text-stone-400 border-t border-stone-100 pt-1">
          <span>ABRCMS // ACCEPTED ABSTRACT</span>
          <span>USA</span>
        </div>
      </div>
    );
  }

  if (type === 'SACNAS') {
    return (
      <div className="w-full h-32 bg-stone-950 flex flex-col justify-between p-3 relative border border-teal-900/30 overflow-hidden select-none">
        <div className="absolute inset-0 opacity-[0.08]" style={{ 
          backgroundImage: 'radial-gradient(circle at 1px 1px, #0ea5e9 1px, transparent 0)', 
          backgroundSize: '16px 16px' 
        }}></div>
        
        <div className="flex-grow flex items-center justify-start gap-2.5 relative z-10 pt-2 px-1">
          <div className="w-12 h-12 rounded-full relative flex items-center justify-center bg-gradient-to-tr from-teal-500 to-amber-500 p-0.5 shadow-lg flex-shrink-0">
            <div className="w-full h-full bg-stone-950 rounded-full flex items-center justify-center">
              <svg viewBox="0 0 100 100" className="w-8 h-8 text-amber-500">
                <polygon points="50,15 55,35 75,30 65,45 85,50 65,55 75,70 55,65 50,85 45,65 25,70 35,55 15,50 35,45 25,30 45,35" fill="currentColor" opacity="0.9" />
                <circle cx="50" cy="50" r="14" fill="#042f2e" />
                <circle cx="50" cy="50" r="8" fill="#f59e0b" />
              </svg>
            </div>
          </div>
          
          <div className="flex flex-col text-left font-serif leading-none">
            <span className="font-extrabold tracking-tight text-white text-[9.5px] leading-tight max-w-[210px]">
              Society for the Advancement of Chicanos/Hispanics and Native Americans in Science
            </span>
            <span className="font-mono text-[6.5px] tracking-[0.05em] text-teal-400 uppercase font-bold mt-1">National Diversity in STEM</span>
            <span className="text-[7px] text-stone-400 font-sans tracking-tight mt-0.5">Long Beach, CA</span>
          </div>
        </div>

        <div className="flex justify-between items-center text-[7px] font-mono text-teal-500 border-t border-stone-800/60 pt-1">
          <span className="truncate max-w-[70%]">Society for the Advancement of Chicanos/Hispanics and Native Americans in Science</span>
          <span>ACCEPTED ABSTRACT</span>
        </div>
      </div>
    );
  }

  if (type === 'AAAS') {
    return (
      <div className="w-full h-32 bg-sky-950 flex flex-col justify-between p-3 relative border border-sky-900/40 overflow-hidden select-none">
        <div className="absolute inset-0 opacity-10" style={{ 
          backgroundImage: 'linear-gradient(rgba(14,165,233,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(14,165,233,0.1) 1px, transparent 1px)', 
          backgroundSize: '10px 10px' 
        }}></div>
        
        <div className="flex-grow flex items-center justify-center gap-2 relative z-10 pt-2">
          {/* Double Helix Pattern */}
          <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center bg-sky-900/50 rounded-full border border-sky-400/30 text-sky-400">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
              <path d="M4.5 10.5C4.5 10.5 7.5 4.5 12 4.5C16.5 4.5 19.5 10.5 19.5 10.5C19.5 10.5 16.5 16.5 12 16.5C7.5 16.5 4.5 10.5 4.5 10.5Z" />
              <circle cx="12" cy="10.5" r="3" />
              <path d="M12 2v2.5M12 16.5V22M19.5 10.5H22M2 10.5H4.5" />
            </svg>
          </div>
          
          <div className="flex flex-col text-left font-sans">
            <span className="font-black text-white text-base tracking-tight leading-none">AAAS 2024</span>
            <span className="text-[8px] font-mono text-sky-300 font-bold uppercase mt-1">Science Advancement</span>
            <span className="text-[7.5px] text-stone-300 tracking-tight">Denver, CO</span>
          </div>
        </div>

        <div className="flex justify-between items-center text-[7.5px] font-mono text-sky-400 border-t border-sky-900 pt-1">
          <span>AAAS // ANNUAL MEETING</span>
          <span>DEN-CO</span>
        </div>
      </div>
    );
  }

  if (type === 'ASBMB') {
    return (
      <div className="w-full h-32 bg-emerald-950 flex flex-col justify-between p-3 relative border border-emerald-900/40 overflow-hidden select-none">
        <div className="absolute inset-0 opacity-[0.06] bg-[radial-gradient(#10b981_1px,transparent_1px)] bg-[size:8px_8px]" />
        
        <div className="flex-grow flex items-center justify-center gap-2 relative z-10 pt-2">
          {/* Molecule Symbol */}
          <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center bg-emerald-900/40 rounded-lg border border-emerald-500/20 text-emerald-400">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
              <circle cx="6" cy="6" r="3" />
              <circle cx="18" cy="6" r="3" />
              <circle cx="12" cy="18" r="3" />
              <line x1="8.5" y1="8.5" x2="10" y2="15" />
              <line x1="15.5" y1="8.5" x2="14" y2="15" />
              <line x1="9" y1="6" x2="15" y2="6" />
            </svg>
          </div>
          
          <div className="flex flex-col text-left">
            <span className="font-extrabold text-white text-sm tracking-tight leading-none uppercase">ASBMB 2023</span>
            <span className="text-[8px] font-mono text-emerald-300 font-bold uppercase mt-1">Biochemistry & Molecular</span>
            <span className="text-[7.5px] text-stone-300 mt-0.5">Seattle, WA</span>
          </div>
        </div>

        <div className="flex justify-between items-center text-[7.5px] font-mono text-emerald-400 border-t border-emerald-900 pt-1">
          <span>ASBMB // DISCOVER BMB</span>
          <span>SEA-WA</span>
        </div>
      </div>
    );
  }

  if (type === 'ERN') {
    return (
      <div className="w-full h-32 bg-purple-950 flex flex-col justify-between p-3 relative border border-purple-900/30 overflow-hidden select-none">
        <div className="absolute inset-0 opacity-[0.05] bg-[linear-gradient(45deg,#a855f7_1px,transparent_1px)] bg-[size:10px_10px]" />
        
        <div className="flex-grow flex items-center justify-center gap-2 relative z-10 pt-2">
          {/* Connected Network Nodes */}
          <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center bg-purple-900/50 rounded-full border border-purple-400/30 text-purple-400">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          </div>
          
          <div className="flex flex-col text-left">
            <span className="font-extrabold text-white text-base tracking-tight leading-none">ERN 2024</span>
            <span className="text-[8px] font-mono text-purple-300 font-bold mt-1 uppercase">Emerging Researchers</span>
            <span className="text-[7.5px] text-stone-300 mt-0.5">Washington, D.C.</span>
          </div>
        </div>

        <div className="flex justify-between items-center text-[7.5px] font-mono text-purple-400 border-t border-purple-900/50 pt-1">
          <span>ERN // NATIONAL STEM</span>
          <span>WDC</span>
        </div>
      </div>
    );
  }

  if (type === 'Mayo Clinic') {
    return (
      <div className="w-full h-32 bg-slate-900 flex flex-col justify-between p-3 relative border border-slate-800 overflow-hidden select-none">
        <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#38bdf8_1px,transparent_0)] bg-[size:12px_12px]" />
        
        <div className="flex-grow flex items-center justify-center gap-2 relative z-10 pt-2">
          {/* Mayo inspired emblem */}
          <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center bg-blue-950 rounded-lg border border-blue-400/30 text-blue-400">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5 text-sky-400">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              <path d="M12 6v10M8 11h8" strokeWidth="2.5" />
            </svg>
          </div>
          
          <div className="flex flex-col text-left">
            <span className="font-extrabold text-white text-xs sm:text-sm tracking-tight leading-none uppercase">MAYO CLINIC</span>
            <span className="text-[8px] font-mono text-sky-300 font-bold mt-1 uppercase leading-none">Education Symposium</span>
            <span className="text-[7.5px] text-stone-400 mt-0.5">Rochester, MN</span>
          </div>
        </div>

        <div className="flex justify-between items-center text-[7.5px] font-mono text-stone-500 border-t border-slate-800 pt-1">
          <span>MAYO CLINIC // RESEARCH</span>
          <span>ROC-MN</span>
        </div>
      </div>
    );
  }

  if (type === 'ASEE') {
    return (
      <div className="w-full h-32 bg-amber-950 flex flex-col justify-between p-3 relative border border-amber-900/30 overflow-hidden select-none">
        <div className="absolute inset-0 opacity-[0.04]" style={{ 
          backgroundImage: 'radial-gradient(circle at 1px 1px, #f59e0b 1px, transparent 0)', 
          backgroundSize: '14px 14px' 
        }}></div>
        
        <div className="flex-grow flex items-center justify-center gap-2 relative z-10 pt-2">
          {/* Engineering gear wheel */}
          <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center bg-amber-900/40 rounded-full border border-amber-500/20 text-amber-500">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
              <path d="M12.22 2h-.44a2 2 0 00-2 2v.18a2 2 0 01-1 1.73l-.43.25a2 2 0 01-2 0l-.15-.08a2 2 0 00-2.73.73l-.22.38a2 2 0 00.73 2.73l.15.1a2 2 0 011 1.72v.51a2 2 0 01-1 1.74l-.15.09a2 2 0 00-.73 2.73l.22.38a2 2 0 002.73.73l.15-.08a2 2 0 012 0l.43.25a2 2 0 011 1.73V20a2 2 0 002 2h.44a2 2 0 002-2v-.18a2 2 0 011-1.73l.43-.25a2 2 0 012 0l.15.08a2 2 0 002.73-.73l.22-.39a2 2 0 00-.73-2.73l-.15-.08a2 2 0 01-1-1.74v-.5a2 2 0 011-1.74l.15-.1a2 2 0 00.73-2.73l-.22-.38a2 2 0 00-2.73-.73l-.15.08a2 2 0 01-2 0l-.43-.25a2 2 0 01-1-1.73V4a2 2 0 00-2-2z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          </div>
          
          <div className="flex flex-col text-left">
            <span className="font-extrabold text-white text-sm tracking-tight leading-none uppercase">ASEE 2022</span>
            <span className="text-[8px] font-mono text-amber-400 font-bold uppercase mt-1">Engineering Education</span>
            <span className="text-[7.5px] text-stone-300 mt-0.5">Minneapolis, MN</span>
          </div>
        </div>

        <div className="flex justify-between items-center text-[7.5px] font-mono text-amber-500 border-t border-amber-900/50 pt-1">
          <span>ASEE // ANNUAL MANUSCRIPT</span>
          <span>MSP-MN</span>
        </div>
      </div>
    );
  }

  if (type === 'NIH') {
    return (
      <div className="w-full h-32 bg-stone-900 flex flex-col justify-between p-3 relative border border-stone-800 overflow-hidden select-none">
        <div className="absolute inset-0 opacity-[0.06] bg-[linear-gradient(45deg,rgba(0,0,0,0.1)_12%,transparent_12%,transparent_50%,rgba(0,0,0,0.1)_50%,rgba(0,0,0,0.1)_62%,transparent_62%)] bg-[size:12px_12px]" />
        
        <div className="flex-grow flex items-center justify-center gap-2 relative z-10 pt-2">
          {/* Classic Bethesda Columns columns */}
          <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center bg-stone-850 rounded-full border border-stone-700 text-stone-300">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5 text-amber-500">
              <path d="M3 22h18M6 6v12M12 6v12M18 6v12M3 6l9-4 9 4M5 22h14" />
            </svg>
          </div>
          
          <div className="flex flex-col text-left">
            <span className="font-extrabold text-stone-100 text-sm tracking-tight leading-none uppercase">NIH 2024</span>
            <span className="text-[8px] font-mono text-amber-400 font-bold uppercase mt-1">Summer Postbac</span>
            <span className="text-[7.5px] text-stone-400 mt-0.5">Bethesda, MD</span>
          </div>
        </div>

        <div className="flex justify-between items-center text-[7.5px] font-mono text-stone-500 border-t border-stone-800 pt-1">
          <span>NIH // POSTER INDEXED</span>
          <span>BETH-MD</span>
        </div>
      </div>
    );
  }

  // Fallback / Notebook
  return (
    <div className="w-full h-32 bg-stone-900 flex flex-col justify-between p-3 relative border border-stone-800 overflow-hidden select-none">
      <div className="absolute inset-0 opacity-[0.06] bg-[linear-gradient(45deg,rgba(0,0,0,0.1)_12%,transparent_12%,transparent_50%,rgba(0,0,0,0.1)_50%,rgba(0,0,0,0.1)_62%,transparent_62%)] bg-[size:12px_12px]" />
      
      <div className="flex-grow flex items-center justify-center gap-2 relative z-10 pt-2">
        <div className="w-10 h-10 rounded-full bg-stone-800 border border-stone-700 flex items-center justify-center text-stone-300">
          <BookOpen size={16} />
        </div>
        <div className="flex flex-col text-left">
          <span className="font-extrabold text-stone-100 text-sm tracking-tight leading-none uppercase">Research manuscript</span>
          <span className="text-[7.5px] text-stone-400 tracking-tight mt-1">Accepted Conference Abstract</span>
        </div>
      </div>

      <div className="flex justify-between items-center text-[7.5px] font-mono text-stone-500 border-t border-stone-800 pt-1">
        <span>TECHNICAL REPORT</span>
        <span>INDEXED</span>
      </div>
    </div>
  );
};

const AbstractGallery: React.FC = () => {
  const [selectedAbstract, setSelectedAbstract] = useState<Abstract | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [copiedCite, setCopiedCite] = useState<string | null>(null);

  const filters = ['All', 'SACNAS', 'ABRCMS'];

  const getFilterLabel = (filter: string) => {
    if (filter === 'All') return 'Show All';
    if (filter === 'SACNAS') return 'Society for the Advancement of Chicanos/Hispanics and Native Americans in Science (SACNAS)';
    if (filter === 'ABRCMS') return 'Annual Biomedical Research Conference for Minoritized Scientists (ABRCMS)';
    return filter;
  };

  const filteredAbstracts = ABSTRACTS.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.conferenceFull.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesFilter = activeFilter === 'All' || item.type === activeFilter;
    return matchesSearch && matchesFilter;
  });

  const handleCopy = (citation: string, id: string) => {
    navigator.clipboard.writeText(citation);
    setCopiedCite(id);
    setTimeout(() => setCopiedCite(null), 2000);
  };

  return (
    <div id="abstract" className="py-20 bg-stone-50 border-b border-stone-200">
      <div className="container mx-auto px-6">
        
        {/* Header Block */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-3 bg-stone-900 text-white text-[10px] font-mono px-3 py-1 uppercase tracking-[0.3em] font-medium rounded-full">
            <BookOpen size={10} /> Research Gallery
          </div>
          <h2 className="font-serif text-3xl md:text-5xl font-bold tracking-tight text-stone-900 mb-6">
            Conference Accepted Abstracts
          </h2>
          <p className="text-stone-500 max-w-2xl mx-auto text-sm sm:text-base font-light font-sans">
            A comprehensive index of peer-reviewed research papers and poster abstracts accepted at national scientific conferences. Click on any card to view the full manuscript, study details, and citations.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="max-w-5xl mx-auto mb-10 flex flex-col md:flex-row gap-4 items-center justify-between border-b border-stone-200 pb-6">
          {/* Tabs */}
          <div className="flex flex-wrap gap-2 text-[10px] md:text-xs font-mono font-bold tracking-wider uppercase max-w-3xl">
            {filters.map(filter => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-3 py-2 border transition-all text-left md:text-center ${
                  activeFilter === filter
                    ? 'bg-stone-900 border-stone-900 text-white shadow-sm'
                    : 'bg-white border-stone-200 text-stone-600 hover:border-stone-400 hover:text-stone-950'
                }`}
              >
                {getFilterLabel(filter)}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative w-full md:w-80">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-stone-400">
              <Search size={14} />
            </span>
            <input
              type="text"
              placeholder="Search research abstracts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full text-xs font-mono pl-9 pr-4 py-2 border border-stone-200 rounded bg-white text-stone-800 placeholder-stone-400 focus:outline-none focus:border-stone-900 focus:ring-1 focus:ring-stone-900 shadow-inner"
            />
          </div>
        </div>

        {/* Grid of Abstract Cards */}
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredAbstracts.length > 0 ? (
            filteredAbstracts.map((item) => (
              <div 
                key={item.id}
                onClick={() => setSelectedAbstract(item)}
                className="group flex flex-col bg-white border border-stone-200 hover:border-nobel-gold shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer overflow-hidden p-0"
              >
                {/* Visual Thumbnail */}
                <ConferenceThumbnail type={item.type} id={item.id} />

                {/* Content */}
                <div className="p-6 flex-grow flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-[10px] font-mono text-stone-400 mb-3 uppercase tracking-wider">
                      <span className="flex items-center gap-1"><Calendar size={10} /> {item.date}</span>
                      <span className="flex items-center gap-1"><MapPin size={10} /> {item.location}</span>
                    </div>

                    <h3 className="font-serif text-lg font-bold text-stone-900 leading-snug group-hover:text-nobel-gold transition-colors mb-3">
                      {item.title}
                    </h3>
                    
                    <p className="text-xs text-stone-500 font-light leading-relaxed mb-4 line-clamp-3">
                      {item.summary}
                    </p>
                  </div>

                  {/* Actions / Info */}
                  <div className="border-t border-stone-100 pt-4 mt-auto flex items-center justify-between font-mono text-[9px] uppercase tracking-wider">
                    <span className="text-stone-400 font-bold">{item.conferenceFull}</span>
                    <span className="flex items-center gap-1 text-stone-900 font-bold group-hover:translate-x-1 transition-transform">
                      {(item.type === 'SACNAS' || item.type === 'ABRCMS' || !item.pdfName) ? 'Read Abstract' : 'Read Paper'} <ChevronRight size={10} />
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-2 py-16 text-center text-stone-400 font-mono text-xs border border-dashed border-stone-200 bg-stone-50 rounded">
              No results found matching your search. Try resetting the filters.
            </div>
          )}
        </div>

      </div>

      {/* Slide-out Research Paper Overlay (Framer Motion Drawer) */}
      <AnimatePresence>
        {selectedAbstract && (
          <div className="fixed inset-0 z-[110] flex justify-end">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedAbstract(null)}
              className="absolute inset-0 bg-stone-950"
            />

            {/* Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative w-full max-w-2xl bg-[#FBFBFA] shadow-2xl h-screen flex flex-col overflow-y-auto border-l border-stone-200"
            >
              {/* Close Button Top Panel */}
              <div className="sticky top-0 bg-[#FBFBFA] z-20 px-6 py-4 border-b border-stone-200 flex justify-between items-center bg-opacity-95 backdrop-blur-sm">
                <span className="text-[10px] font-mono text-stone-400 uppercase tracking-[0.2em]">
                  {selectedAbstract.pdfName ? 'Conference Accepted Manuscript' : 'Conference Accepted Abstract'}
                </span>
                <button 
                  onClick={() => setSelectedAbstract(null)} 
                  className="p-1 px-3 border border-stone-200 hover:bg-stone-50 text-stone-400 hover:text-stone-950 transition-all font-mono text-[10px] flex items-center gap-1"
                >
                  <X size={12} /> CLOSE INDEX
                </button>
              </div>

              {/* Manuscript Content area */}
              <div className="p-8 space-y-8 flex-grow">
                
                {/* Interactive Logo on Detail panel */}
                <div className="border border-stone-200 rounded overflow-hidden shadow-sm">
                  <ConferenceThumbnail type={selectedAbstract.type} id={selectedAbstract.id} />
                </div>

                {/* Meta details */}
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {selectedAbstract.tags.map(t => (
                      <span key={t} className="text-[9px] font-mono px-2 py-0.5 bg-stone-100 text-stone-500 rounded uppercase tracking-wider font-semibold">
                        {t}
                      </span>
                    ))}
                  </div>

                  <h1 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-stone-900 leading-tight">
                    {selectedAbstract.title}
                  </h1>

                  {/* Authors list */}
                  <div className="text-xs font-mono text-stone-500 border-l border-stone-200 pl-4 py-1 leading-normal">
                    <p className="font-bold text-stone-700">Authors:</p>
                    <p>{selectedAbstract.authors}</p>
                    <p className="text-[9px] font-light mt-1 italic text-stone-400">{selectedAbstract.institutions}</p>
                  </div>
                </div>

                {/* Section breakdown */}
                <div className="space-y-6">
                  <div className="flex items-center gap-3 border-b border-stone-200 pb-2">
                    <BookOpen size={16} className="text-stone-400" />
                    <h2 className="font-mono text-xs font-extrabold uppercase tracking-widest text-stone-700">Official Abstract</h2>
                  </div>

                  <div className="text-stone-600 leading-relaxed space-y-6 font-sans text-sm sm:text-base font-light">
                    {selectedAbstract.fullText.map((para, idx) => (
                      <p 
                        key={idx} 
                        className={idx === 0 ? "first-letter:text-5xl first-letter:font-serif first-letter:float-left first-letter:mr-3 first-letter:font-bold first-letter:text-stone-900 hover:text-stone-900 transition-colors" : "hover:text-stone-900 transition-colors"}
                      >
                        {idx === 0 ? para : para}
                      </p>
                    ))}
                  </div>
                </div>

                {/* Key Research Discoveries */}
                <div className="space-y-4 bg-white border border-stone-200 p-6 shadow-sm rounded-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <Award size={16} className="text-nobel-gold" />
                    <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-stone-900">Key Scientific Findings</h3>
                  </div>

                  <ul className="space-y-4 text-xs sm:text-sm text-stone-500 font-light font-sans">
                    {selectedAbstract.keyFindings.map((finding, index) => (
                      <li key={index} className="flex gap-3">
                        <span className="font-mono font-bold text-nobel-gold mt-0.5">0{index + 1}.</span>
                        <p className="leading-relaxed"><strong className="text-stone-800 font-normal">{finding.split('.')[0]}.</strong>{finding.split('.').slice(1).join('.')}</p>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* PDF Citation Download Section */}
                <div className="space-y-4 border-t border-stone-200 pt-8 pb-12">
                  <div className="flex items-center gap-2 mb-4">
                    <FileText size={16} className="text-stone-400" />
                    <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-stone-700">
                      {selectedAbstract.pdfName ? 'Accepted PDF & Citations' : 'Academic Citations'}
                    </h3>
                  </div>

                  {/* Actions row */}
                  {selectedAbstract.pdfName && (
                    <div className="w-full">
                      {/* Download button */}
                      <a 
                        href={`/${selectedAbstract.pdfName}`}
                        download={selectedAbstract.pdfName}
                        className="flex items-center justify-between p-4 bg-stone-900 hover:bg-stone-800 text-white rounded border border-stone-900 transition-colors shadow"
                      >
                        <div className="flex items-center gap-3 text-left">
                          <div className="p-2 bg-stone-800 text-teal-400 rounded">
                            <Download size={16} />
                          </div>
                          <div>
                            <p className="text-[11px] font-mono leading-none text-stone-400">Accepted Manuscript</p>
                            <p className="text-[10px] font-bold font-sans mt-1 tracking-tight text-white line-clamp-1">{selectedAbstract.pdfName}</p>
                          </div>
                        </div>
                        <ChevronRight size={14} className="text-stone-400" />
                      </a>
                    </div>
                  )}

                  {/* Dynamic Academic Citations Box */}
                  <div className="bg-[#FAF9F5] border border-stone-200 p-4 rounded mt-4 space-y-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[9px] font-mono uppercase tracking-wider text-stone-400 flex items-center gap-1">
                        <Share2 size={10} /> Academic Reference (Chicago Style)
                      </span>
                      <button 
                        onClick={() => handleCopy(selectedAbstract.citeChicago, 'chi')}
                        className="p-1 border border-stone-200 rounded hover:bg-stone-50 hover:border-stone-400 text-stone-500 hover:text-stone-800 transition-all font-mono text-[9px] flex items-center gap-1"
                      >
                        {copiedCite === 'chi' ? <Check size={10} className="text-green-500" /> : <Copy size={10} />}
                        {copiedCite === 'chi' ? 'Copied!' : 'Copy'}
                      </button>
                    </div>
                    <p className="text-xs font-sans text-stone-600 leading-normal bg-white p-3 border border-stone-100 rounded">
                      {selectedAbstract.citeChicago}
                    </p>

                    <div className="flex items-center justify-between mt-4 mb-2">
                      <span className="text-[9px] font-mono uppercase tracking-wider text-stone-400 flex items-center gap-1">
                        <Sparkles size={10} /> LaTeX / BibTeX Source
                      </span>
                      <button 
                        onClick={() => handleCopy(selectedAbstract.citeBibtex, 'bib')}
                        className="p-1 border border-stone-200 rounded hover:bg-stone-50 hover:border-stone-400 text-stone-500 hover:text-stone-800 transition-all font-mono text-[9px] flex items-center gap-1"
                      >
                        {copiedCite === 'bib' ? <Check size={10} className="text-green-500" /> : <Copy size={10} />}
                        {copiedCite === 'bib' ? 'Copied!' : 'Copy'}
                      </button>
                    </div>
                    <pre className="text-[10px] font-mono text-stone-500 bg-stone-900 border border-stone-950 p-3 rounded overflow-x-auto text-left leading-normal whitespace-pre">
                      {selectedAbstract.citeBibtex}
                    </pre>
                  </div>

                </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AbstractGallery;
