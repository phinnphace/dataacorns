import React from 'react';
import { motion } from 'framer-motion';

const AuditIntro: React.FC = () => {
  return (
    <div className="flex flex-col gap-6">
      {/* Content */}
      <div className="bg-white/5 border border-white/10 p-6 md:p-8 relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-10 text-stone-300 font-light leading-relaxed relative z-10"
        >
          {/* Section 1 */}
          <div>
            <h3 className="text-2xl font-serif text-white mb-4">The Problem in Population Health</h3>
            <ul className="list-disc list-inside space-y-2 mb-6 text-stone-400">
              <li>Current practice treats crosswalks as neutral operations</li>
              <li>No systematic assessment of data perturbation across boundaries</li>
              <li>Equity implications of transformation choices ignored</li>
            </ul>
            <div className="space-y-4 text-sm md:text-base">
              <p>
                No authoritative ZCTA→ZIP crosswalk is published. For the first hop, we construct a ZCTA–ZIP association table by expanding the ZIP→ZCTA relationship file (i.e., grouping ZIPs by their assigned ZCTA). This produces a one-to-many mapping (ZCTA→{`{ZIPs}`}) that reflects common “lookup-style” workflows in applied settings.
              </p>
              <p>
                This construction does not imply bidirectionality (it is not a valid inverse crosswalk) and does not encode proportional allocation. It is used solely to quantify how a typical boundary-translation workflow can alter aggregate estimates under an explicit allocation rule.
              </p>
            </div>
          </div>

          <div className="w-full h-px bg-white/10"></div>

          {/* Section 2 */}
          <div>
            <h3 className="text-2xl font-serif text-white mb-6">Decision Points Framework</h3>
            
            <div className="mb-8">
              <h4 className="text-nobel-gold font-mono text-sm uppercase tracking-widest mb-3 flex items-center gap-2">
                <span className="bg-nobel-gold/20 text-nobel-gold px-2 py-0.5">DP 01</span> 
                Step 0. Define baseline
              </h4>
              <div className="space-y-3 text-sm md:text-base">
                <p>
                  We define “in-county” membership using a relationship-based ZCTA set. This is distinct from geometric intersection membership and is held constant for the audit. TOT_RATIO is defined per ZIP across counties, the sum of ratios within a single county is not constrained to equal the number of ZCTAs or ZIPs, and may exceed or fall below intuitive counts.
                </p>
                <p className="text-stone-400 italic border-l-2 border-stone-600 pl-4 py-1">
                  While obvious, the ratio is held constant as it is what carries throughout the rest of the transformations because of the crosswalk decision.
                </p>
              </div>
            </div>

            <div>
              <h4 className="text-nobel-gold font-mono text-sm uppercase tracking-widest mb-3 flex items-center gap-2">
                <span className="bg-nobel-gold/20 text-nobel-gold px-2 py-0.5">DP 02</span> 
                Administrative Linkage vs Geometric Contact
              </h4>
              <div className="space-y-4 text-sm md:text-base">
                <p>We need ZIP-level population only because HUD operates at ZIP.</p>
                <div className="bg-black/40 p-4 border-l-2 border-nobel-gold font-mono text-sm">
                  <span className="text-white font-bold uppercase tracking-widest text-xs block mb-1">Rule (explicitly stated):</span> 
                  Within a ZCTA, population is evenly attributed across associated ZIPs. This is not claimed as correct, only as necessary to proceed.
                </div>
                <p>Because <code className="text-nobel-gold bg-white/10 px-1.5 py-0.5 rounded-sm text-sm">st_intersects()</code> is doing a literal spatial test:</p>
                <ul className="list-disc list-inside space-y-2 text-stone-400 ml-2">
                  <li>If a ZCTA polygon touches Hennepin even a little, it counts.</li>
                  <li>That includes edge-touching, slivers, water boundaries, and weird TIGER topology.</li>
                  <li>The “relationship file” is not the same thing. It’s a curated linkage that reflects Census tabulation logic, not raw polygon contact.</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="w-full h-px bg-white/10"></div>

          {/* Section 3 */}
          <div>
            <h3 className="text-2xl font-serif text-white mb-4">Variable Agnosticism Design</h3>
            <ul className="list-disc list-inside space-y-2 text-stone-400 text-sm md:text-base">
              <li>Works with any continuous/categorical variable</li>
              <li>Framework applicable beyond R ecosystem</li>
              <li>Preserves analytical agency at each step</li>
            </ul>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AuditIntro;
