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
    conference: 'SACNAS 2025',
    conferenceFull: 'SACNAS National Diversity in STEM (NDiSTEM) Conference',
    date: 'October 23-25, 2025',
    location: 'San Juan, Puerto Rico',
    authors: 'P. Markson¹, J. Rodriguez², S. Patel¹ (*Corresponding Author)',
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
    pdfName: 'The Shell Game_ Auditing Allocation in Crosswalked Population Data_SACNAS_abstract (3).pdf',
    tags: ['Crosswalk Audit', 'geoDeltaAudit', 'Population Data', 'Spatial Equity'],
    type: 'SACNAS',
    citeChicago: 'Markson, P., J. Rodriguez, and S. Patel. "The Shell Game: Auditing Allocation in Crosswalked Population Data." In Proceeding of the SACNAS National Diversity in STEM (NDiSTEM) Conference, San Juan, Puerto Rico, October 23-25, 2025.',
    citeBibtex: `@inproceedings{markson2025shell,\n  author    = {Markson, P. and Rodriguez, J. and Patel, S.},\n  title     = {The Shell Game: Auditing Allocation in Crosswalked Population Data},\n  booktitle = {SACNAS National Diversity in STEM Conference},\n  address   = {San Juan, Puerto Rico},\n  month     = {October},\n  year      = {2025}\n}`
  },
  {
    id: 'stop-saying-who',
    title: 'Stop Saying Who, Start Saying How: Auditing Structural Predictors in Administrative Health Geography',
    conference: 'ABRCMS 2025',
    conferenceFull: 'Annual Biomedical Research Conference for Minoritized Scientists',
    date: 'November 19-22, 2025',
    location: 'San Antonio, TX',
    authors: 'P. Markson¹, L. Cunningham², E. Vance¹',
    summary: 'An academic audit shifting the biomedical lens from racialized demographic categorizations to direct spatial and structural infrastructure measurements.',
    fullText: [
      'Epidemiological and public health research workflows frequently rely on demographic categories ("who") as proxy variables for risk, under the implicit assumption that racialized categories represent direct biological or causal inputs. This study introduces an audit protocol that shifts the analytical lens from simple demographic categorization to explicit structural mechanisms ("how")—specifically by auditing how administrative crosswalks and zip-code level boundaries obscure localized physical infrastructure.',
      'By applying the geoDeltaAudit framework, we analyze how public health datasets interpolating county-level and zip-code level health metrics hide structural factors such as historical Home Owners\' Loan Corporation (HOLC) redlining boundaries, localized transit accessibility times, and neighborhood disinvestment patterns in Madison, WI.',
      'Preliminary results reveal that treating demographic variables as absolute proxies introduces massive spatial endogeneity, while auditing structural pathways—such as public transit travel time ratios relative to private driving—provides direct, actionable targets for health equity research. We argue that biomedical and public health data workflows must stop designating "who" is vulnerable and start measuring "how" municipal transit and spatial policies structure vulnerability.'
    ],
    keyFindings: [
      'Focusing exclusively on racial categories obscures structural neighborhood impediments (transit deserts, municipal food access barriers).',
      'By mapping the transit-to-drive ratio directly, the algorithm isolates physical infrastructure disparities of up to 5x slower public travel, explaining variance previously misattributed solely to demographics.',
      'Administrative crosswalk boundaries fail to capture the lived spatial reality of fringe communities along the Madison, WI regional boundaries.'
    ],
    pdfName: 'stop saying who, start saying how (2) (1).pdf',
    tags: ['Health Geography', 'Structural Audit', 'Transit Disparities', 'Biostatistics'],
    type: 'ABRCMS',
    citeChicago: 'Markson, P., L. Cunningham, and E. Vance. "Stop Saying Who, Start Saying How: Auditing Structural Predictors in Administrative Health Geography." In Proceedings of the Annual Biomedical Research Conference for Minoritized Scientists (ABRCMS), San Antonio, TX, November 19-22, 2025.',
    citeBibtex: `@inproceedings{markson2025stopsaying,\n  author    = {Markson, P. and Cunningham, L. and Vance, E.},\n  title     = {Stop Saying Who, Start Saying How: Auditing Structural Predictors in Administrative Health Geography},\n  booktitle = {Annual Biomedical Research Conference for Minoritized Scientists (ABRCMS)},\n  address   = {San Antonio, Texas},\n  month     = {November},\n  year      = {2025}\n}`
  },
  {
    id: 'aaas-2024',
    title: 'The Pedagogy of Perfect Separation: A Critical Re-Evaluation of the Iris Dataset in Computational Curricula',
    conference: 'AAAS 2024',
    conferenceFull: 'American Association for the Advancement of Science Annual Meeting',
    date: 'February 15-18, 2024',
    location: 'Denver, CO',
    authors: 'P. Markson¹, J. Lee² (*Corresponding Author)',
    summary: 'A pedagogical and methodological audit of the classical Iris dataset, uncovering how introductory classification pipelines systematically erase empirical complexity.',
    fullText: [
      'The Iris dataset is ubiquitous in introductory statistics and machine learning, typically presented as a parable of clean categorical separation. However, a closer examination reveals a more complicated truth: while Iris setosa is distinct, Iris versicolor and Iris virginica overlap significantly. This contradiction reveals how statistical pedagogy systematically erases empirical complexity to preserve the myth of clean, objective boundaries.',
      'This research presents a critical re-analysis comparing two parallel analytical workflows: one following the standard predictive classification path, and another focusing on an exploratory-diagnostic lens that highlights structural overlap. The divergence in these workflows demonstrates how scientific training determines what analysts see and what they discard.',
      'By tracing the historical and ideological origins of Fisher\'s taxonomic models, we argue that prioritizing predictive separation over structural mixture risks embedding biased assumptions of absolute classification into modern biostatistical and health science education. We outline an auditing framework for introducing ethical taxonomy and investigative statistics back into STEM classrooms.'
    ],
    keyFindings: [
      'Uncovers structural overlap between Versicolor and Virginica that is often erased by standard machine learning examples.',
      'Highlights the historical dependency on Fisherian metrics and the ideological origins of classification standards.',
      'Proposes a new pedagogical protocol for critical data science education that incorporates exploratory complexity and reflexive ethics.'
    ],
    pdfName: 'Iris_Pedagogy_Classification_AAAS_2024.pdf',
    tags: ['Critical Pedagogy', 'Iris Dataset', 'Biostatistics', 'STEM Ethics'],
    type: 'AAAS',
    citeChicago: 'Markson, P. and J. Lee. "The Pedagogy of Perfect Separation: A Critical Re-Evaluation of the Iris Dataset in Computational Curricula." In American Association for the Advancement of Science (AAAS) Annual Meeting, Denver, CO, February 15-18, 2024.',
    citeBibtex: `@inproceedings{markson2024aaas,\n  author    = {Markson, P. and Lee, J.},\n  title     = {The Pedagogy of Perfect Separation: A Critical Re-Evaluation of the Iris Dataset in Computational Curricula},\n  booktitle = {American Association for the Advancement of Science (AAAS) Annual Meeting},\n  address   = {Denver, Colorado},\n  month     = {February},\n  year      = {2024}\n}`
  },
  {
    id: 'asbmb-2023',
    title: 'Interrogating Quantitative Literacy: Integrating Molecular Biology Pedagogy with Computational Audit Workflows',
    conference: 'ASBMB 2023',
    conferenceFull: 'American Society for Biochemistry and Molecular Biology Annual Meeting',
    date: 'March 25-28, 2023',
    location: 'Seattle, WA',
    authors: 'P. Markson¹, S. Patel¹, E. Vance²',
    summary: 'Evaluating computational data literacy inside biochemistry and molecular science, presenting an academic auditing framework for student-led data pipelines.',
    fullText: [
      'Modern biochemistry and molecular biology are increasingly computational, requiring students to engage with massive datasets and complex statistical software. However, curricula often treat these quantitative tools as absolute black boxes, emphasizing procedural calculations over diagnostic integrity.',
      'This paper outlines a model for student-led quantitative audits integrated directly into biochemistry laboratories. Students apply a custom auditing protocol to their own gel chromatography and expression datasets, tracking how common normalization algorithms introduce artifacts or hide structural biological variance.',
      'By examining student workflows, we demonstrate that active, critical computational auditing significantly improves quantitative literacy, contextual understanding of biological noise, and investigative skepticism toward automated data classification.'
    ],
    keyFindings: [
      'Standard quantitative normalizations in biochemistry laboratories frequently introduce unquantified calculation artifacts.',
      'Students with audit-enabled training showed a 40% increase in identifying and correcting data-entry and scaling errors.',
      'Establishes a curriculum template for integrating quantitative reproducibility protocols into undergraduate molecular life science.'
    ],
    pdfName: 'Computational_Data_Literacy_Biochem_ASBMB_2023.pdf',
    tags: ['Quantitative Literacy', 'Biochemistry Pedagogy', 'Molecular Biology'],
    type: 'ASBMB',
    citeChicago: 'Markson, P., S. Patel, and E. Vance. "Interrogating Quantitative Literacy: Integrating Molecular Biology Pedagogy with Computational Audit Workflows." In Discover BMB (ASBMB Annual Meeting), Seattle, WA, March 25-28, 2023.',
    citeBibtex: `@inproceedings{markson2023asbmb,\n  author    = {Markson, P. and Patel, S. and Vance, E.},\n  title     = {Interrogating Quantitative Literacy: Integrating Molecular Biology Pedagogy with Computational Audit Workflows},\n  booktitle = {Discover BMB - Annual Meeting of the American Society for Biochemistry and Molecular Biology},\n  address   = {Seattle, Washington},\n  month     = {March},\n  year      = {2023}\n}`
  },
  {
    id: 'abrcms-2023',
    title: 'Auditing Geographic Crosswalks: Mapping Systemic Demographic Shift as a Socio-Spatial Covariate',
    conference: 'ABRCMS 2023',
    conferenceFull: 'Annual Biomedical Research Conference for Minoritized Scientists',
    date: 'November 15-18, 2023',
    location: 'Phoenix, AZ',
    authors: 'P. Markson¹, S. Patel¹',
    summary: 'Auditing ZIP-to-county and block-to-tract demographic crosswalks to determine how administrative conversions distort regional correlation markers before analytic regression.',
    fullText: [
      'Geographic crosswalks are key mechanisms utilized by epidemiological pipelines to reconcile diverging spatial scales, such as converting administrative ZIP code health databases to county-level policy frameworks. However, the demographic changes introduced by these spatial allocations are rarely documented, with researchers treating crosswalked outputs as direct physical measurements.',
      'This study audits ZIP-to-county population conversions across varying administrative jurisdictions. By implementing our geographic transformation protocol, we show how crosswalk allocation choices systematically shift local indicators, resulting in visible boundary leakage artifacts and demographic skew.',
      'Preliminary trials reveal that spatial interpolation choices alter local demographic profiles by up to 28%, indicating that crosswalk procedures must be fully documented and audited to prevent spatial errors from distorting the downstream data models designed for health resource allocation.'
    ],
    keyFindings: [
      'ZIP-to-county population conversions alter local income and demographic correlation estimates by up to 28%.',
      'The spatial conversion acts as an active allocation procedure, not a neutral pre-processing step.',
      'Provides a foundational audit standard for socio-spatial covariates in public health research.'
    ],
    pdfName: 'Demographic_Crosswalk_Audit_ABRCMS_2023.pdf',
    tags: ['Spatial Equity', 'Crosswalk Audits', 'Epidemiology', 'Methodological Bias'],
    type: 'ABRCMS',
    citeChicago: 'Markson, P. and S. Patel. "Auditing Geographic Crosswalks: Mapping Systemic Demographic Shift as a Socio-Spatial Covariate." In Annual Biomedical Research Conference for Minoritized Scientists (ABRCMS), Phoenix, AZ, November 15-18, 2023.',
    citeBibtex: `@inproceedings{markson2023abrcms,\n  author    = {Markson, P. and Patel, S.},\n  title     = {Auditing Geographic Crosswalks: Mapping Systemic Demographic Shift as a Socio-Spatial Covariate},\n  booktitle = {Annual Biomedical Research Conference for Minoritized Scientists (ABRCMS)},\n  address   = {Phoenix, Arizona},\n  month     = {November},\n  year      = {2023}\n}`
  },
  {
    id: 'ern-2024',
    title: 'Quantifying Spatial Perturbation across Changing Administrative Boundaries with geoDeltaAudit',
    conference: 'ERN 2024',
    conferenceFull: 'Emerging Researchers National Conference in STEM',
    date: 'March 14-16, 2024',
    location: 'Washington, D.C.',
    authors: 'P. Markson¹',
    summary: 'An introduction to the R-based geoDeltaAudit implementation, standardizing variance estimation representing spatial allocation choices in STEM research.',
    fullText: [
      'Spatial and demographic audits are critical to ensuring that mathematical and public models reflect authentic socio-spatial conditions. This work presents geoDeltaAudit, a native R package designed to quantify demographic and statistic perturbation (ΔX) across consecutive geographic conversion steps.',
      'Using US Census Bureau relationship and ZIP-county crosswalk files, the research maps how administrative conversions change local population densities. We outline the analytical equations and package functions constructed to track variance across spatial steps.',
      'Our goal is to make crosswalk-induced sample changes visible and auditable, giving applied STEM researchers access to robust error bounding tools for spatial mapping pipelines.'
    ],
    keyFindings: [
      'Introduces geoDeltaAudit as a formal spatial diagnostic R software package.',
      'Tracks demographic perturbation (ΔX) and standardizes scale-sensitivity measures.',
      'Simplifies complex geo-statistical auditing procedures for undergraduate and early-career STEM researchers.'
    ],
    pdfName: 'geoDeltaAudit_Spatial_Perturbation_ERN_2024.pdf',
    tags: ['geoDeltaAudit', 'Spatial Modeling', 'R Software', 'STEM Research'],
    type: 'ERN',
    citeChicago: 'Markson, P. "Quantifying Spatial Perturbation across Changing Administrative Boundaries with geoDeltaAudit." In Emerging Researchers National (ERN) Conference in STEM, Washington, D.C., March 14-16, 2024.',
    citeBibtex: `@inproceedings{markson2024ern,\n  author    = {Markson, P.},\n  title     = {Quantifying Spatial Perturbation across Changing Administrative Boundaries with geoDeltaAudit},\n  booktitle = {Emerging Researchers National (ERN) Conference in STEM},\n  address   = {Washington, D.C.},\n  month     = {March},\n  year      = {2024}\n}`
  },
  {
    id: 'mayo-2023',
    title: 'Dismantling Biased Biostatistical Benchmarks: Critical Design Protocols in Health Sciences Curricula',
    conference: 'Mayo Symposium 2023',
    conferenceFull: 'Mayo Clinic Education Science and Scholarship Symposium',
    date: 'October 26, 2023',
    location: 'Rochester, MN',
    authors: 'P. Markson¹, L. Cunningham²',
    summary: 'Applying structural pedagogical audits to medical and public health education databases to identify systemic biases present in default student-facing benchmarks.',
    fullText: [
      'Biostatistics and data science courses in medical and public health curricula are critical for preparing early-career clinicians and researchers. However, introductory datasets frequently rely on clinical benchmarks and physiological ranges derived exclusively from idealized white, male cohorts, treating these as neutral, universal standards.',
      'This project applies a critical pedagogical audit to standard biostatistical curriculum materials. We examine how treating eugenic-era datasets (such as the Iris classification or early clinical tracking files) as benign pedagogical "neutral ground" can inadvertently reinforce typological beliefs about demographic divergence and clinical variations.',
      'We present a series of alternative curriculum designs and investigative modules that replace uncritical predictive modeling with reflexive, infrastructure-focused auditing, teaching medical students to interrogate how clinical standards are historically constructed.'
    ],
    keyFindings: [
      'Identifies how introductory biostatistical curricula repeatedly rely on clinical baselines derived from non-representative demographic cohorts.',
      'Proposes pedagogical design models that teach future medical professionals to look beyond demographic proxies and measure direct structural infrastructure.',
      'Establishes a critical scholarship framework for medical data education.'
    ],
    pdfName: 'Biostatistical_Benchmarks_Mayo_Symposium_2023.pdf',
    tags: ['Critical Medicine', 'Clinical Benchmarks', 'Biostatistics Education', 'Pedagogical Auditing'],
    type: 'Mayo Clinic',
    citeChicago: 'Markson, P. and L. Cunningham. "Dismantling Biased Biostatistical Benchmarks: Critical Design Protocols in Health Sciences Curricula." In Mayo Clinic Education Science and Scholarship Symposium, Rochester, MN, October 26, 2023.',
    citeBibtex: `@inproceedings{markson2023mayo,\n  author    = {Markson, P. and Cunningham, L.},\n  title     = {Dismantling Biased Biostatistical Benchmarks: Critical Design Protocols in Health Sciences Curricula},\n  booktitle = {Mayo Clinic Education Science and Scholarship Symposium},\n  address   = {Rochester, Minnesota},\n  month     = {October},\n  year      = {2023}\n}`
  },
  {
    id: 'asee-2022',
    title: 'Fostering Computational Agency: Project-Based Auditing Workflows for Boundary Crosswalks in Engineering Education',
    conference: 'ASEE 2022',
    conferenceFull: 'American Society for Engineering Education Annual Conference & Exposition',
    date: 'June 26-29, 2022',
    location: 'Minneapolis, MN',
    authors: 'P. Markson¹',
    summary: 'A study on teaching spatial computational thinking through real-world geographic relationship files, providing engineering undergraduates with structural audit toolsets.',
    fullText: [
      'Undergraduate engineering and spatial analytics programs require dynamic project-based curricula to bridge the gap between abstract programming concepts and real-world infrastructure problems. This paper presents a pedagogical case study evaluating the implementation of spatial auditing workshops within engineering design curricula.',
      'Undergraduates were tasked with evaluating municipal water supply and transit boundaries using US Census and USPS crosswalk directories. Applying spatial-audit protocols, students documented how geographical boundary harmonization acts as a high-stakes engineering allocation decision.',
      'Results indicate that shifting from passive programming exercises to active project-based spatial audits significantly increases student ownership, computational self-efficacy, and systems-level critical auditing capacity.'
    ],
    keyFindings: [
      'Shifting to project-based spatial auditing increases engineering student motivation and systems-level understanding.',
      'Students actively design diagnostic tools for evaluating boundary discrepancies rather than blindly accepting raw dataset crosswalks.',
      'Provides a complete syllabus model for spatial engineering and computational policy analysis.'
    ],
    pdfName: 'Engineering_Spatial_Agency_ASEE_2022.pdf',
    tags: ['Computational Agency', 'Engineering Education', 'Spatial Analytics', 'Curriculum Design'],
    type: 'ASEE',
    citeChicago: 'Markson, P. "Fostering Computational Agency: Project-Based Auditing Workflows for Boundary Crosswalks in Engineering Education." In American Society for Engineering Education (ASEE) Annual Conference & Exposition, Minneapolis, MN, June 26-29, 2022.',
    citeBibtex: `@inproceedings{markson2022asee,\n  author    = {Markson, P.},\n  title     = {Fostering Computational Agency: Project-Based Auditing Workflows for Boundary Crosswalks in Engineering Education},\n  booktitle = {American Society for Engineering Education (ASEE) Annual Conference \\& Exposition},\n  address   = {Minneapolis, Minnesota},\n  month     = {June},\n  year      = {2022}\n}`
  },
  {
    id: 'nih-2024',
    title: 'Auditing Demographics vs Infrastructure: Spatial Evaluation of Public Transit Travel-Drive Ratios in Health Zones',
    conference: 'NIH Summer 2024',
    conferenceFull: 'National Institutes of Health Summer Postbaccalaureate Poster Conference',
    date: 'August 1, 2024',
    location: 'Bethesda, MD',
    authors: 'P. Markson¹, E. Vance¹',
    summary: 'Analyzing physical transit-drive access parity indexes across US ZIP code zones to challenge standard county-level health disparities models.',
    fullText: [
      'Biomedical research mapping community health risks frequently relies on demographic proxies to explain variance in outcomes, missing the direct physical mechanisms that shape vulnerability. This project presents a spatial audit evaluating physical access infrastructure across Madison, WI health zones.',
      'Using the TransitAware mapping engine, we calculate the commute-time ratio between public bus transit and private driving for every residential census block. We then audit zip-code and county administrative boundaries to track how spatial aggregation masks pockets of extreme access disparity.',
      'Our results demonstrate that public access parity is tightly correlated with regional healthcare accessibility scores, providing an active physical infrastructure variable that explains variance previously misattributed solely to demographic classifications.'
    ],
    keyFindings: [
      'Highlights how public accessibility-to-drive ratios act as direct causal markers for healthcare and community access.',
      'Audits demographic covariates to prove that spatial aggregation hides infrastructure barriers for underserved residential zones.',
      'Recommends integrating real-time travel-drive parity scores directly into biostatistical health models.'
    ],
    pdfName: 'Access_Parity_Health_Zones_NIH_Postbac_2024.pdf',
    tags: ['Biomedical Geography', 'Infrastructure Auditing', 'Access Parity', 'NIH Postbac'],
    type: 'NIH',
    citeChicago: 'Markson, P. and E. Vance. "Auditing Demographics vs Infrastructure: Spatial Evaluation of Public Transit Travel-Drive Ratios in Health Zones." In National Institutes of Health (NIH) Summer Postbaccalaureate Poster Conference, Bethesda, MD, August 1, 2024.',
    citeBibtex: `@inproceedings{markson2024nih,\n  author    = {Markson, P. and Vance, E.},\n  title     = {Auditing Demographics vs Infrastructure: Spatial Evaluation of Public Transit Travel-Drive Ratios in Health Zones},\n  booktitle = {NIH Summer Postbaccalaureate Poster Conference},\n  address   = {Bethesda, Maryland},\n  month     = {August},\n  year      = {2024}\n}`
  }
];

// High-fidelity rendering of the conference thumbnails inside the cards
const ConferenceThumbnail = ({ type }: { type: string }) => {
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
        
        <div className="flex-grow flex items-center justify-center gap-2 relative z-10 pt-2">
          <div className="w-12 h-12 rounded-full relative flex items-center justify-center bg-gradient-to-tr from-teal-500 to-amber-500 p-0.5 shadow-lg">
            <div className="w-full h-full bg-stone-950 rounded-full flex items-center justify-center">
              <svg viewBox="0 0 100 100" className="w-8 h-8 text-amber-500">
                <polygon points="50,15 55,35 75,30 65,45 85,50 65,55 75,70 55,65 50,85 45,65 25,70 35,55 15,50 35,45 25,30 45,35" fill="currentColor" opacity="0.9" />
                <circle cx="50" cy="50" r="14" fill="#042f2e" />
                <circle cx="50" cy="50" r="8" fill="#f59e0b" />
              </svg>
            </div>
          </div>
          
          <div className="flex flex-col text-left font-serif">
            <span className="font-extrabold tracking-tight text-white text-base leading-none">SACNAS</span>
            <span className="font-mono text-[8px] tracking-[0.2em] text-teal-400 uppercase font-bold mt-1">NDiSTEM Conference</span>
            <span className="text-[7.5px] text-stone-400 font-sans tracking-tight mt-0.5">San Juan, PR</span>
          </div>
        </div>

        <div className="flex justify-between items-center text-[7.5px] font-mono text-teal-500 border-t border-stone-800/60 pt-1">
          <span>SACNAS // NDiSTEM</span>
          <span>SJ-PR</span>
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

  const filters = ['All', 'SACNAS', 'ABRCMS', 'AAAS', 'ASBMB', 'ERN', 'Mayo Clinic', 'ASEE', 'NIH'];

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
          <div className="flex flex-wrap gap-2 text-xs font-mono font-bold tracking-wider uppercase">
            {filters.map(filter => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 border transition-all ${
                  activeFilter === filter
                    ? 'bg-stone-900 border-stone-900 text-white shadow-sm'
                    : 'bg-white border-stone-200 text-stone-600 hover:border-stone-400 hover:text-stone-950'
                }`}
              >
                {filter === 'All' ? 'Show All' : filter}
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
                <ConferenceThumbnail type={item.type} />

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
                      Read Paper <ChevronRight size={10} />
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
                <span className="text-[10px] font-mono text-stone-400 uppercase tracking-[0.2em]">Conference Accepted manuscript</span>
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
                  <ConferenceThumbnail type={selectedAbstract.type} />
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
                    <p className="text-[9px] font-light mt-1 italic text-stone-400">¹The Ecoverse Group, University of Wisconsin-Madison | ²Department of Biostatistics</p>
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
                    <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-stone-700">Accepted PDF & Citations</h3>
                  </div>

                  {/* Actions row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Download button */}
                    <a 
                      href={`/src/projects/${selectedAbstract.pdfName}`}
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

                    {/* Simulation File Details */}
                    <div className="p-4 bg-[#F2F1EC] rounded border border-stone-200 flex flex-col justify-between">
                      <div className="flex justify-between items-start">
                        <div className="flex flex-col">
                          <span className="text-[9px] font-mono uppercase text-stone-400">Associated Software</span>
                          <span className="text-xs font-bold font-sans text-stone-800 mt-1">geoDeltaAudit v1.0.4</span>
                        </div>
                        <span className="bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 px-1.5 py-0.5 rounded text-[8px] font-mono font-bold uppercase">
                          Compiled
                        </span>
                      </div>
                      <div className="text-[9px] text-stone-400 italic mt-3 font-mono">
                        Contains the fully audited spatial-drive ratios for Madison WI.
                      </div>
                    </div>
                  </div>

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
