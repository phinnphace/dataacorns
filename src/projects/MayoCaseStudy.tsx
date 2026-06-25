import React from 'react';
import { 
  ArrowDown, 
  ExternalLink, 
  FileText, 
  CheckCircle, 
  ChevronRight, 
  Award, 
  Mail, 
  Info, 
  BookOpen, 
  ShieldCheck, 
  TrendingDown,
  Database,
  Search,
  Sliders,
  HelpCircle
} from 'lucide-react';

export default function MayoCaseStudy() {
  return (
    <div className="min-h-screen bg-[#F4F2ED] text-[#1D2435] font-sans antialiased selection:bg-[#B84F3A]/20">
      
      {/* HERO */}
      <section className="bg-[#1D2435] text-[#FDFCFA] pt-20 pb-16 px-6 sm:px-12 md:py-24 md:px-16 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-40 bg-[radial-gradient(ellipse_at_80%_20%,rgba(43,82,120,0.4)_0%,transparent_60%)]"></div>
        <div className="max-w-[900px] mx-auto relative z-10">
          <div className="font-mono text-[11px] font-semibold tracking-[0.15em] uppercase text-[#7FA8C9] mb-6">
            Case Study · Mayo Graduate School of Biomedical Sciences · 2023
          </div>
          <h1 className="font-displaySerif text-3xl sm:text-4xl md:text-5xl leading-[1.15] text-[#FDFCFA] max-w-[760px] mb-6 font-normal">
            How We Count<br />Determines <em className="italic text-[#A8C8E4] font-normal font-displaySerif">Who</em> Counts
          </h1>
          <p className="text-[#B0BAC8] text-sm sm:text-base md:text-[15px] leading-relaxed max-w-[620px] mb-12 font-light">
            A mixed-methods investigation into SOGI non-response patterns in graduate admissions data — and what happened when the initial prediction about direction turned out to be wrong.
          </p>
          
          <div className="flex gap-10 flex-wrap items-end mb-8">
            <div className="border-l-3 border-[#B84F3A] pl-4">
              <div className="font-mono text-3xl sm:text-[38px] font-semibold text-white leading-none">
                27.75%
              </div>
              <div className="text-[12px] text-[#8A95A8] mt-1 tracking-[0.05em] leading-normal">
                Pre-intervention non-response rate
              </div>
            </div>
            <div className="font-mono text-2xl text-[#B84F3A] pb-2 leading-none">
              →
            </div>
            <div className="border-l-3 border-[#B84F3A] pl-4">
              <div className="font-mono text-3xl sm:text-[38px] font-semibold text-[#E8806A] leading-none">
                12.4%
              </div>
              <div className="text-[12px] text-[#8A95A8] mt-1 tracking-[0.05em] leading-normal">
                Post-intervention non-response rate
              </div>
            </div>
          </div>

          <div className="inline-flex items-center gap-2 bg-[rgba(43,82,120,0.4)] border border-[rgba(122,168,200,0.3)] rounded px-3 py-1.5 text-[11px] font-mono text-[#8FBBD8] tracking-[0.08em] mt-8">
            <span className="text-[#6DBF8A] font-bold">✓</span> IRB APPROVED · MINIMAL-RISK HUMAN SUBJECTS RESEARCH
          </div>
        </div>
      </section>

      {/* CONTEXT */}
      <section className="bg-[#FDFCFA] py-16 px-6 sm:px-12 md:py-20 md:px-16 border-b border-stone-200">
        <div className="max-w-[900px] mx-auto">
          <div className="font-mono text-[10px] font-semibold tracking-[0.18em] uppercase text-[#2B5278] mb-3">
            Research Context
          </div>
          <h2 className="font-displaySerif text-2xl sm:text-3xl md:text-[34px] leading-[1.2] text-[#1D2435] mb-6">
            The Question
          </h2>
          <div className="text-[#3A3F50] text-[15px] sm:text-[16px] leading-[1.7] space-y-4">
            <p>
              Implementing SOGI data collection across post-secondary STEM programs has been inconsistent. Using five years of admissions data (2018–2023) from the Mayo Graduate School of Biomedical Sciences, this study asked: do SOGI response rates differ between U.S. and international graduate applicants?
            </p>
            <p>
              The study was grounded in the 2022 NASEM consensus report <em>Measuring Sex, Gender Identity, and Sexual Orientation</em> and Executive Order 14075, which together provided validated frameworks for responsible SOGI data collection.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-10">
            <div className="space-y-2">
              <h3 className="font-displaySerif text-lg sm:text-[18px] text-[#1D2435]">The Dataset</h3>
              <p className="text-[14px] text-[#3A3F50] leading-[1.7]">
                Five years of graduate admissions data. U.S. cohort: n=919. International cohort: distributed across numerous countries, with significant sample size disparities requiring careful methodological navigation.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-displaySerif text-lg sm:text-[18px] text-[#1D2435]">Why It Mattered</h3>
              <p className="text-[14px] text-[#3A3F50] leading-[1.7]">
                There is no universal consensus on acceptable non-response thresholds — every domain and discipline sets its own. The U.S. Census benchmark (non-response under 5.95% characterized as "low") was selected deliberately: its methodology aligned with the NASEM framework used for survey validation in this study, making it the most defensible comparator. By that measure, initial non-response rates of ~30% represented a significant problem worth solving.
              </p>
            </div>
          </div>

          <div className="bg-[#E9E6DF] border-l-4 border-[#B84F3A] px-6 py-5 rounded-r mt-10">
            <div className="font-mono text-[10px] tracking-[0.15em] text-[#B84F3A] uppercase mb-2">
              Initial Prediction
            </div>
            <p className="font-sans italic text-[#1D2435] leading-[1.7] mb-3">
              "Non-U.S. applicants would be less likely to respond to SOGI questions than U.S. applicants, due to differences in national policy context and cultural familiarity with the questions."
            </p>
            <span className="inline-block bg-[#B84F3A] text-white font-mono text-[10px] tracking-[0.1em] px-2.5 py-1 rounded font-semibold uppercase">
              WRONG
            </span>
          </div>
        </div>
      </section>

      {/* WHAT DEMANDED ITERATION */}
      <section className="bg-[#1D2435] text-white py-16 px-6 sm:px-12 md:py-20 md:px-16 border-b border-stone-800">
        <div className="max-w-[900px] mx-auto">
          <div className="font-mono text-[10px] font-semibold tracking-[0.18em] uppercase text-[#7FA8C9] mb-3">
            What Demanded Iteration
          </div>
          <h2 className="font-displaySerif text-2xl sm:text-3xl md:text-[34px] leading-[1.2] text-white mb-10">
            Three things that required starting over
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[rgba(255,255,255,0.06)] border border-[rgba(255,255,255,0.1)] rounded-md p-7">
              <div className="font-mono text-[11px] text-[#B84F3A] tracking-[0.12em] mb-3">
                01 / ETHICS
              </div>
              <h3 className="font-displaySerif text-lg text-white mb-3 leading-[1.3]">
                The UN said "statistical convenience." That wasn't acceptable.
              </h3>
              <p className="text-[#9AA5B8] text-[14px] leading-[1.7] space-y-4">
                The hypothesis was accurate, but the predicted direction was wrong: international students had significantly higher response rates from the start. That's science working as intended.
              </p>
              <p className="text-[#9AA5B8] text-[14px] leading-[1.7] mt-3">
                The hard choices came when deciding how to proceed experimentally. Country sample sizes were vastly disproportionate. Following standard protocol meant grouping countries into regions using the UN M49 standard. However, the standard explicitly notes these are for "statistical convenience." To say I was dismayed at reading those words would be an understatement. I decided then and there I wanted no part of colonizing. Research is not for my convenience; if it is, then I should not engage in it. The world need not contort itself for me and doing so skews the measure. Grouping populations purely to hit statistical thresholds is an act of data colonization — this study refused to participate.
              </p>
            </div>

            <div className="bg-[rgba(255,255,255,0.06)] border border-[rgba(255,255,255,0.1)] rounded-md p-7">
              <div className="font-mono text-[11px] text-[#B84F3A] tracking-[0.12em] mb-3">
                02 / METHODOLOGY
              </div>
              <h3 className="font-displaySerif text-lg text-white mb-3 leading-[1.3]">
                Ethically Indefensible Standards
              </h3>
              <p className="text-[#9AA5B8] text-[14px] leading-[1.7]">
                While multivariable and binomial logistic regression were the standard methodologies, I had no interest in artificial regional groupings from thousands of miles away. And doing so created catastrophic model fit in disaggregated cells.
              </p>
              <p className="text-[#9AA5B8] text-[14px] leading-[1.7] mt-3">
                I rejected standard aggregation methods because they flatten intersectional variance. I had to construct and defend an unconventional, transparent methodology.
              </p>
            </div>

            <div className="bg-[rgba(255,255,255,0.06)] border border-[rgba(255,255,255,0.1)] rounded-md p-7">
              <div className="font-mono text-[11px] text-[#B84F3A] tracking-[0.12em] mb-3">
                03 / CONTEXT
              </div>
              <h3 className="font-displaySerif text-lg text-white mb-3 leading-[1.3]">
                Systemic Resistance in STEM
              </h3>
              <p className="text-[#9AA5B8] text-[14px] leading-[1.7]">
                In 2023, applying machine learning and generative AI in an unsupervised framework to qualitative responses and rejecting traditional regressions on ethical grounds was met with prejudice, fear and power dynamics. Especially from an undergraduate.
              </p>
              <p className="text-[#9AA5B8] text-[14px] leading-[1.7] mt-3">
                The decisions were made anyway. At the time, long awaited and recent releases by the National Academies and via executive order provided a breadth of methodological grounding and validation. The study took well intentioned but unvalidated admissions questions and in a validated, experimental design utilizing a representative focus group achieved a ~20% improvement of response rates and demonstrated that the low response rates were syntactical not content driven.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ANALYTICAL JOURNEY */}
      <section className="bg-[#F4F2ED] py-16 px-6 sm:px-12 md:py-20 md:px-16 border-b border-stone-200">
        <div className="max-w-[900px] mx-auto">
          <div className="font-mono text-[10px] font-semibold tracking-[0.18em] uppercase text-[#2B5278] mb-3">
            Analytical Pivots
          </div>
          <h2 className="font-displaySerif text-2xl sm:text-3xl md:text-[34px] leading-[1.2] text-[#1D2435] mb-4">
            How the methodology actually evolved
          </h2>
          <p className="text-[#3A3F50] text-[15px] leading-relaxed mb-10">
            Each pivot was documented as it happened. The decision tree below reflects the actual sequence of analytical choices — not a retrospective narrative.
          </p>

          <div className="overflow-x-auto pb-4">
            <div className="flex items-stretch gap-0 min-w-[850px]">
              
              {/* Node 1 */}
              <div className="flex-1 min-w-[140px] relative">
                <div className="bg-white border-1.5 border-[#DEDAD1] rounded-md p-4 h-full flex flex-col justify-between hover:border-[#2B5278] hover:shadow-md transition-all">
                  <div>
                    <span className="inline-block text-[9px] font-mono tracking-[0.12em] uppercase px-2 py-0.5 rounded mb-3 bg-[#F0EDE8] text-[#5E6070]">
                      Initial
                    </span>
                    <h4 className="text-[13px] font-semibold text-[#1D2435] mb-1.5 leading-[1.3]">
                      Country-by-Country Analysis
                    </h4>
                    <p className="text-[11px] text-[#5E6070] leading-[1.5]">
                      Compare response rates across all countries individually.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center px-2 text-[#5E6070] text-lg select-none">→</div>

              {/* Node 2 */}
              <div className="flex-1 min-w-[140px] relative">
                <div className="bg-[#FDF8F7] border-1.5 border-[rgba(184,79,58,0.4)] rounded-md p-4 h-full flex flex-col justify-between hover:border-[#B84F3A] hover:shadow-md transition-all">
                  <div>
                    <span className="inline-block text-[9px] font-mono tracking-[0.12em] uppercase px-2 py-0.5 rounded mb-3 bg-[rgba(184,79,58,0.12)] text-[#B84F3A]">
                      Rejected
                    </span>
                    <h4 className="text-[13px] font-semibold text-[#1D2435] mb-1.5 leading-[1.3]">
                      Multivariable Logistic Regression
                    </h4>
                    <p className="text-[11px] text-[#5E6070] leading-[1.5]">
                      Poor model fit. Coefficients contradictory (-1.007 / +2.383). Grouping marginalized populations to boost power = data colonization.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center px-2 text-[#5E6070] text-lg select-none">→</div>

              {/* Node 3 */}
              <div className="flex-1 min-w-[140px] relative">
                <div className="bg-[#F4F8FC] border-1.5 border-[rgba(43,82,120,0.4)] rounded-md p-4 h-full flex flex-col justify-between hover:border-[#2B5278] hover:shadow-md transition-all">
                  <div>
                    <span className="inline-block text-[9px] font-mono tracking-[0.12em] uppercase px-2 py-0.5 rounded mb-3 bg-[rgba(43,82,120,0.1)] text-[#2B5278]">
                      Pivot
                    </span>
                    <h4 className="text-[13px] font-semibold text-[#1D2435] mb-1.5 leading-[1.3]">
                      UN M49 Regional Grouping
                    </h4>
                    <p className="text-[11px] text-[#5E6070] leading-[1.5]">
                      Countries grouped using UN Standard Country Codes for Statistical Use to address sample size disparities without imposing arbitrary groupings.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center px-2 text-[#5E6070] text-lg select-none">→</div>

              {/* Node 4 */}
              <div className="flex-1 min-w-[140px] relative">
                <div className="bg-[#F4F8FC] border-1.5 border-[rgba(43,82,120,0.4)] rounded-md p-4 h-full flex flex-col justify-between hover:border-[#2B5278] hover:shadow-md transition-all">
                  <div>
                    <span className="inline-block text-[9px] font-mono tracking-[0.12em] uppercase px-2 py-0.5 rounded mb-3 bg-[rgba(43,82,120,0.1)] text-[#2B5278]">
                      Pivot
                    </span>
                    <h4 className="text-[13px] font-semibold text-[#1D2435] mb-1.5 leading-[1.3]">
                      Double Randomization
                    </h4>
                    <p className="text-[11px] text-[#5E6070] leading-[1.5]">
                      Two-step sequential protocol: Step 1 — RAND generates initial sample. Step 2 — TRNG generates second independent sample, because RAND is pseudorandom/deterministic, not technically random. n=400 per group. Chi-square for independence adopted.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center px-2 text-[#5E6070] text-lg select-none">→</div>

              {/* Node 5 */}
              <div className="flex-1 min-w-[140px] relative">
                <div className="bg-[#F4F8FC] border-1.5 border-[rgba(43,82,120,0.4)] rounded-md p-4 h-full flex flex-col justify-between hover:border-[#2B5278] hover:shadow-md transition-all">
                  <div>
                    <span className="inline-block text-[9px] font-mono tracking-[0.12em] uppercase px-2 py-0.5 rounded mb-3 bg-[rgba(43,82,120,0.1)] text-[#2B5278]">
                      Novel
                    </span>
                    <h4 className="text-[13px] font-semibold text-[#1D2435] mb-1.5 leading-[1.3]">
                      Unsupervised GPT One-Hot Encoding
                    </h4>
                    <p className="text-[11px] text-[#5E6070] leading-[1.5]">
                      Unstructured survey text was passed over by standard approaches, but one-hot encoding with unsupervised GPT produced superior sentiment and nuance analysis compared to standard dummy coding — preserving intersectional signal that would otherwise have been flattened.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center px-2 text-[#5E6070] text-lg select-none">→</div>

              {/* Node 6 */}
              <div className="flex-1 min-w-[140px] relative">
                <div className="bg-[#F4FAF6] border-1.5 border-[rgba(77,140,97,0.5)] rounded-md p-4 h-full flex flex-col justify-between hover:border-emerald-600 hover:shadow-md transition-all">
                  <div>
                    <span className="inline-block text-[9px] font-mono tracking-[0.12em] uppercase px-2 py-0.5 rounded mb-3 bg-[rgba(77,140,97,0.12)] text-[#3D7A54]">
                      Finding
                    </span>
                    <h4 className="text-[13px] font-semibold text-[#1D2435] mb-1.5 leading-[1.3]">
                      Syntactical, Not Content
                    </h4>
                    <p className="text-[11px] text-[#5E6070] leading-[1.5]">
                      The problem was question format, not question content. Non-response dropped from 27.75% to 12.4% following instrument redesign.
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* KEY FINDINGS */}
      <section className="bg-[#FDFCFA] py-16 px-6 sm:px-12 md:py-20 md:px-16 border-b border-stone-200">
        <div className="max-w-[900px] mx-auto">
          <div className="font-mono text-[10px] font-semibold tracking-[0.18em] uppercase text-[#2B5278] mb-3">
            Key Findings
          </div>
          <h2 className="font-displaySerif text-2xl sm:text-3xl md:text-[34px] leading-[1.2] text-[#1D2435] mb-10">
            Selected data
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            
            {/* Chart 1 */}
            <div>
              <div className="text-[13px] font-semibold text-[#1D2435] mb-5">
                Response Rates by Question Type and Student Group
              </div>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center text-[10px] font-mono text-[#5E6070] mb-1.5">
                    <span>Pronoun · US</span>
                    <span className="font-semibold">66.0%</span>
                  </div>
                  <div className="w-full h-[26px] bg-[#E9E6DF] rounded-[3px] overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-[#2B5278] to-[#3D6FA0] flex items-center justify-end pr-2 transition-all duration-1000" style={{ width: '66.0%' }}>
                      <span className="font-mono text-[10px] font-semibold text-white">66.0%</span>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center text-[10px] font-mono text-[#5E6070] mb-1.5">
                    <span>Pronoun · Int'l</span>
                    <span className="font-semibold">78.5%</span>
                  </div>
                  <div className="w-full h-[26px] bg-[#E9E6DF] rounded-[3px] overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-[#B84F3A] to-[#C96850] flex items-center justify-end pr-2 transition-all duration-1000" style={{ width: '78.5%' }}>
                      <span className="font-mono text-[10px] font-semibold text-white">78.5%</span>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center text-[10px] font-mono text-[#5E6070] mb-1.5">
                    <span>Gender ID · US</span>
                    <span className="font-semibold">62.2%</span>
                  </div>
                  <div className="w-full h-[26px] bg-[#E9E6DF] rounded-[3px] overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-[#2B5278] to-[#3D6FA0] flex items-center justify-end pr-2 transition-all duration-1000" style={{ width: '62.2%' }}>
                      <span className="font-mono text-[10px] font-semibold text-white">62.2%</span>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center text-[10px] font-mono text-[#5E6070] mb-1.5">
                    <span>Gender ID · Int'l</span>
                    <span className="font-semibold">74.8%</span>
                  </div>
                  <div className="w-full h-[26px] bg-[#E9E6DF] rounded-[3px] overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-[#B84F3A] to-[#C96850] flex items-center justify-end pr-2 transition-all duration-1000" style={{ width: '74.8%' }}>
                      <span className="font-mono text-[10px] font-semibold text-white">74.8%</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-5 mt-4">
                <div className="flex items-center gap-1.5 text-[11px] text-[#5E6070]">
                  <span className="w-2.5 h-2.5 rounded-[2px] bg-[#2B5278] inline-block"></span>
                  <span>US</span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-[#5E6070]">
                  <span className="w-2.5 h-2.5 rounded-[2px] bg-[#B84F3A] inline-block"></span>
                  <span>Int'l</span>
                </div>
              </div>
            </div>

            {/* Chart 2 */}
            <div>
              <div className="text-[13px] font-semibold text-[#1D2435] mb-5">
                Aggregate Non-Response: Before and After Instrument Redesign
              </div>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center text-[10px] font-mono text-[#5E6070] mb-1.5">
                    <span>Pre-Intervention</span>
                    <span className="font-semibold">27.75%</span>
                  </div>
                  <div className="w-full h-[26px] bg-[#E9E6DF] rounded-[3px] overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-[#6B7280] to-[#9CA3AF] flex items-center justify-end pr-2 transition-all duration-1000" style={{ width: '100%' }}>
                      <span className="font-mono text-[10px] font-semibold text-white">27.75%</span>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center text-[10px] font-mono text-[#5E6070] mb-1.5">
                    <span>Post-Intervention</span>
                    <span className="font-semibold">12.4%</span>
                  </div>
                  <div className="w-full h-[26px] bg-[#E9E6DF] rounded-[3px] overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-[#2B5278] to-[#3D6FA0] flex items-center justify-end pr-2 transition-all duration-1000" style={{ width: '44.7%' }}>
                      <span className="font-mono text-[10px] font-semibold text-white">12.4%</span>
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-[12px] text-[#5E6070] leading-[1.7] mt-3">
                Post-intervention rate calculated on full sample (n=161).
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-6">
                <div className="bg-[#E9E6DF] rounded-md p-6">
                  <div className="font-mono text-[32px] font-semibold text-[#2B5278] leading-none">
                    87.6%
                  </div>
                  <div className="text-[12px] text-[#5E6070] mt-1 leading-normal">
                    Valid "favorite batch" responses in instrument preference survey
                  </div>
                </div>
                <div className="bg-[#E9E6DF] rounded-md p-6">
                  <div className="font-mono text-[32px] font-semibold text-[#B84F3A] leading-none">
                    Batch 2
                  </div>
                  <div className="text-[12px] text-[#5E6070] mt-1 leading-normal">
                    Preferred instrument: 77 most favorite vs. 24 least favorite. Batch 1 (binary, minimal options): 26 vs. 52. Batch 3 (explanatory hover-text): 38 vs. 48. Decisive winner on conciseness, inclusivity, and multi-select design.
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* CONFERENCE POSTER */}
      <section className="bg-[#E9E6DF] py-16 px-6 sm:px-12 md:py-20 md:px-16 border-b border-stone-200">
        <div className="max-w-[900px] mx-auto">
          <div className="font-mono text-[10px] font-semibold tracking-[0.18em] uppercase text-[#2B5278] mb-3">
            Conference Poster
          </div>
          <h2 className="font-displaySerif text-2xl sm:text-3xl md:text-[34px] leading-[1.2] text-[#1D2435] mb-4">
            AAAS Annual Meeting — Denver 2024
          </h2>
          <p className="text-[#3A3F50] text-[15px] leading-relaxed mb-8">
            "The Best Outcomes — When Everybody Sees Every Body": Response rates to gender identity questions across Mayo Graduate School of Biomedical Sciences 2020–2023.
          </p>

          <div className="relative border border-[#DEDAD1] rounded-md bg-white p-2 shadow-md">
            <img 
              src="aaas_poster.jpg" 
              alt="AAAS 2024 conference poster: The Best Outcomes — When Everybody Sees Every Body" 
              className="w-full rounded-sm block"
              onError={(e) => {
                // If the poster image fails to load, gracefully display a beautifully framed backup placeholder
                e.currentTarget.style.display = 'none';
                const parent = e.currentTarget.parentElement;
                if (parent) {
                  const fallback = parent.querySelector('.poster-fallback');
                  if (fallback) fallback.classList.remove('hidden');
                }
              }}
            />
            {/* Elegant, clean poster layout placeholder purely as a fallback with absolutely no fabricated details */}
            <div className="poster-fallback hidden bg-[#1D2435] text-white p-8 sm:p-12 text-center rounded-sm">
              <div className="text-[10px] font-mono tracking-[0.2em] text-[#7FA8C9] mb-4 uppercase">
                Mayo Graduate School of Biomedical Sciences Fellowship, 2023
              </div>
              <h3 className="font-displaySerif text-2xl sm:text-3xl md:text-4xl leading-tight mb-4">
                "The Best Outcomes — When Everybody Sees Every Body"
              </h3>
              <p className="text-[#B0BAC8] text-xs sm:text-sm font-mono tracking-wide uppercase mb-6">
                Response rates to gender identity questions across Mayo Graduate School of Biomedical Sciences 2020–2023
              </p>
              <div className="h-[1px] bg-white/10 w-24 mx-auto mb-6"></div>
              <div className="text-[11px] sm:text-xs font-mono text-stone-400">
                Presenter: Phinn Markson
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PULLQUOTE */}
      <section className="bg-[#2B5278] text-white text-center py-16 px-6 md:py-20">
        <div className="max-w-[700px] mx-auto">
          <p className="font-displaySerif text-xl sm:text-2xl md:text-[32px] leading-[1.4] text-white mb-4">
            "Inclusivity is often determined not by <em>what</em> is asked, but by <em>how</em> it is asked."
          </p>
          <div className="font-mono text-[11px] text-[rgba(255,255,255,0.5)] tracking-[0.12em]">
            SOGI Methods Write-Up · Phinn Markson, Mayo Graduate School of Biomedical Sciences, 2023
          </div>
        </div>
      </section>

      {/* METHODS */}
      <section className="bg-[#F4F2ED] py-16 px-6 sm:px-12 md:py-20 md:px-16 border-b border-stone-200">
        <div className="max-w-[900px] mx-auto">
          <div className="font-mono text-[10px] font-semibold tracking-[0.18em] uppercase text-[#2B5278] mb-3">
            Methods Detail
          </div>
          <h2 className="font-displaySerif text-2xl sm:text-3xl md:text-[34px] leading-[1.2] text-[#1D2435] mb-10">
            What was actually done, and why
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-md p-6 border border-[#DEDAD1]">
              <div className="font-mono text-[10px] text-[#2B5278] bg-[#E9E6DF] px-2 py-0.5 rounded inline-block tracking-[0.08em] mb-4">
                QUANTITATIVE · ARM 1
              </div>
              <h3 className="font-displaySerif text-[17px] text-[#1D2435] mb-3">
                Double Randomization + Chi-Square
              </h3>
              <p className="text-[14px] text-[#3A3F50] leading-[1.7]">
                To address the n=919 U.S. vs. small international cohorts problem, a two-step double randomization protocol created comparable groups (n=400 each): Step 1 used Excel RAND to generate an initial random sample; Step 2 used a True Random Number Generator (TRNG) to generate a second independent sample, because RAND is a pseudorandom/deterministic function — not technically random. Chi-square test for independence examined US vs. non-US response patterns for gender identity and pronoun questions separately.
              </p>
            </div>

            <div className="bg-white rounded-md p-6 border border-[#DEDAD1]">
              <div className="font-mono text-[10px] text-[#2B5278] bg-[#E9E6DF] px-2 py-0.5 rounded inline-block tracking-[0.08em] mb-4">
                QUALITATIVE · ARM 2
              </div>
              <h3 className="font-displaySerif text-[17px] text-[#1D2435] mb-3">
                Survey Design + GPT One-Hot Encoding
              </h3>
              <p className="text-[14px] text-[#3A3F50] leading-[1.7]">
                A follow-up Qualtrics instrument (target n=70–140; actual n=167) tested three batches of validated SOGI questions against each other. Batch 1 used traditional binary structure with minimal options. Batch 2 offered multi-select, inclusive terminology, and concise phrasing. Batch 3 used Batch 1's structure with added hover-text explanations. Focus groups were conducted with the graduate student population and the Mayo LGBTQI+ Employee Resource Group. Unstructured free-text responses were passed over by standard approaches, but unsupervised GPT with one-hot encoding produced superior sentiment and nuance analysis compared to dummy coding — preserving the intersectional signal that mattered.
              </p>
            </div>

            <div className="bg-white rounded-md p-6 border border-[#DEDAD1]">
              <div className="font-mono text-[10px] text-[#2B5278] bg-[#E9E6DF] px-2 py-0.5 rounded inline-block tracking-[0.08em] mb-4">
                ETHICAL FRAMEWORK
              </div>
              <h3 className="font-displaySerif text-[17px] text-[#1D2435] mb-3">
                Against Data Colonization
              </h3>
              <p className="text-[14px] text-[#3A3F50] leading-[1.7]">
                Grouping marginalized populations solely to achieve statistical power imposes artificial homogeneity and obscures the unique characteristics of those communities. This study chose granular analysis over power, and documented that choice explicitly using a decision tree that traces each analytical pivot and the reasoning behind it.
              </p>
            </div>

            <div className="bg-white rounded-md p-6 border border-[#DEDAD1]">
              <div className="font-mono text-[10px] text-[#2B5278] bg-[#E9E6DF] px-2 py-0.5 rounded inline-block tracking-[0.08em] mb-4">
                GROUNDING
              </div>
              <h3 className="font-displaySerif text-[17px] text-[#1D2435] mb-3">
                Federal Evidence Base
              </h3>
              <p className="text-[14px] text-[#3A3F50] leading-[1.7]">
                NASEM consensus report <em>Measuring Sex, Gender Identity, and Sexual Orientation</em> (2022) + NIH/NCSES validated frameworks + Executive Order 14075 federal guidance. The study design was grounded in the best available federal evidence at the time and supported by Mayo CCaTS Grant UL1TR000135 from NCATS.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PRESENTATIONS */}
      <section className="bg-[#FDFCFA] py-16 px-6 sm:px-12 md:py-20 md:px-16 border-b border-stone-200">
        <div className="max-w-[900px] mx-auto">
          <div className="font-mono text-[10px] font-semibold tracking-[0.18em] uppercase text-[#2B5278] mb-3">
            Dissemination
          </div>
          <h2 className="font-displaySerif text-2xl sm:text-3xl md:text-[34px] leading-[1.2] text-[#1D2435] mb-6">
            Where this work has been presented
          </h2>

          <div className="mt-8 divide-y divide-stone-200">
            <div className="flex items-start gap-4 py-4">
              <div className="font-mono text-[11px] text-[#5E6070] w-12 flex-shrink-0 pt-1">
                2023
              </div>
              <div>
                <div className="text-[14px] text-[#1D2435] font-medium">
                  ABRCMS — Annual Biomedical Research Conference for Minoritized Scientists — Phoenix, AZ
                </div>
                <span className="font-mono text-[10px] text-[#2B5278] bg-[rgba(43,82,120,0.08)] px-2 py-0.5 rounded inline-block mt-1">
                  POSTER
                </span>
              </div>
            </div>

            <div className="flex items-start gap-4 py-4">
              <div className="font-mono text-[11px] text-[#5E6070] w-12 flex-shrink-0 pt-1">
                2023
              </div>
              <div>
                <div className="text-[14px] text-[#1D2435] font-medium">
                  Mayo Education Science &amp; Scholarship Symposium — Rochester, MN
                </div>
                <span className="font-mono text-[10px] text-[#2B5278] bg-[rgba(43,82,120,0.08)] px-2 py-0.5 rounded inline-block mt-1">
                  PRESENTATION
                </span>
              </div>
            </div>

            <div className="flex items-start gap-4 py-4">
              <div className="font-mono text-[11px] text-[#5E6070] w-12 flex-shrink-0 pt-1">
                2024
              </div>
              <div>
                <div className="text-[14px] text-[#1D2435] font-medium">
                  AAAS Annual Meeting — Denver, CO
                </div>
                <span className="font-mono text-[10px] text-[#2B5278] bg-[rgba(43,82,120,0.08)] px-2 py-0.5 rounded inline-block mt-1">
                  POSTER
                </span>
              </div>
            </div>

            <div className="flex items-start gap-4 py-4">
              <div className="font-mono text-[11px] text-[#5E6070] w-12 flex-shrink-0 pt-1">
                2024
              </div>
              <div>
                <div className="text-[14px] text-[#1D2435] font-medium">
                  Emerging Researchers National Conference (ERN) — Washington, DC
                </div>
                <span className="font-mono text-[10px] text-[#2B5278] bg-[rgba(43,82,120,0.08)] px-2 py-0.5 rounded inline-block mt-1">
                  PRESENTATION
                </span>
              </div>
            </div>

            <div className="flex items-start gap-4 py-4">
              <div className="font-mono text-[11px] text-[#5E6070] w-12 flex-shrink-0 pt-1">
                2024
              </div>
              <div>
                <div className="text-[14px] text-[#1D2435] font-medium">
                  Edgewood College Senior Capstone Symposium — Madison, WI
                </div>
                <span className="font-mono text-[10px] text-[#2B5278] bg-[rgba(43,82,120,0.08)] px-2 py-0.5 rounded inline-block mt-1">
                  PRESENTATION
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MATERIALS */}
      <section className="bg-[#E9E6DF] py-16 px-6 sm:px-12 md:py-20 md:px-16 border-b border-stone-200">
        <div className="max-w-[900px] mx-auto">
          <div className="font-mono text-[10px] font-semibold tracking-[0.18em] uppercase text-[#2B5278] mb-3">
            Supporting Materials
          </div>
          <h2 className="font-displaySerif text-2xl sm:text-3xl md:text-[34px] leading-[1.2] text-[#1D2435] mb-8">
            Documentation available upon request
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
            <div className="bg-white rounded-md p-5 border border-[#DEDAD1] hover:border-[#2B5278] hover:shadow-sm transition-all">
              <div className="text-[22px] mb-3">📄</div>
              <h3 className="text-[14px] font-semibold text-[#1D2435] mb-1.5">
                Methods Write-Up
              </h3>
              <p className="text-[12px] text-[#5E6070] leading-[1.6]">
                Full narrative of methodological challenges, analytical pivots, and ethical decision-making framework.
              </p>
            </div>

            <div className="bg-white rounded-md p-5 border border-[#DEDAD1] hover:border-[#2B5278] hover:shadow-sm transition-all">
              <div className="text-[22px] mb-3">📊</div>
              <h3 className="text-[14px] font-semibold text-[#1D2435] mb-1.5">
                Slide Deck (Short Form)
              </h3>
              <p className="text-[12px] text-[#5E6070] leading-[1.6]">
                Conference presentation: key results, one-hot encoding approach, and instrument design findings.
              </p>
            </div>

            <div className="bg-white rounded-md p-5 border border-[#DEDAD1] hover:border-[#2B5278] hover:shadow-sm transition-all">
              <div className="text-[22px] mb-3">🎓</div>
              <h3 className="text-[14px] font-semibold text-[#1D2435] mb-1.5">
                Senior Symposium Deck
              </h3>
              <p className="text-[12px] text-[#5E6070] leading-[1.6]">
                Full presentation including disaggregation framework, statistical methodology narrative, and Bayesian iteration rationale.
              </p>
            </div>

            <div className="bg-white rounded-md p-5 border border-[#DEDAD1] hover:border-[#2B5278] hover:shadow-sm transition-all">
              <div className="text-[22px] mb-3">🔬</div>
              <h3 className="text-[14px] font-semibold text-[#1D2435] mb-1.5">
                IRB Protocol + Data Sample
              </h3>
              <p className="text-[12px] text-[#5E6070] leading-[1.6]">
                IRB exemption documentation and anonymized data snapshot available to qualified researchers.
              </p>
            </div>
          </div>

          <p className="mt-8 text-[13px] text-[#5E6070]">
            Contact: <a href="mailto:markson.2@osu.edu" className="text-[#2B5278] hover:underline">markson.2@osu.edu</a> · Portfolio: <a href="https://dataacorns.com" target="_blank" rel="noreferrer" className="text-[#2B5278] hover:underline">dataacorns.com</a>
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#1D2435] text-[rgba(255,255,255,0.5)] py-8 px-6 sm:px-12 text-center text-[12px] font-mono tracking-[0.05em]">
        <p>
          Phinn Markson · <a href="https://dataacorns.com" target="_blank" rel="noreferrer" className="text-[rgba(255,255,255,0.6)] hover:text-white transition-colors">dataacorns.com</a> · Mayo Graduate School of Biomedical Sciences Fellowship, 2023
        </p>
      </footer>

    </div>
  );
}
