import React from 'react';

const Methodology: React.FC = () => {
  return (
    <div className="py-24 bg-[#F4F4F0] text-stone-900 font-sans border-y border-stone-300 relative overflow-hidden">
      {/* Lab Grid Background */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
      
      <div className="container mx-auto px-6 relative z-10 max-w-4xl">
        <div className="mb-16 border-b-2 border-stone-900 pb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-2 py-0.5 bg-stone-900 text-white text-[10px] font-bold tracking-tighter uppercase">Vignette: 01</span>
            <span className="text-[10px] font-mono text-stone-500 uppercase tracking-widest">Classification: Methodology</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-serif font-bold tracking-tight mb-4">
            Proportionality <span className="italic font-normal text-stone-500">Considerations</span>
          </h2>
        </div>

        <div className="space-y-16">
          {/* Section 1 */}
          <section>
            <h3 className="font-mono text-xl font-bold mb-6 uppercase tracking-tighter border-l-4 border-nobel-gold pl-4">
              Why Crosswalks Create Delta
            </h3>
            <div className="text-lg text-stone-600 leading-relaxed space-y-4 pl-5">
              <p>
                Much like antigen or diagnostic formulation, where sensitivity and specificity must be balanced, geographic transformations operate within a similar trade-off space. A method that maximizes coverage may reduce geographic precision, while a method that preserves tight geographic alignment may shed or distort counts.
              </p>
              <p>
                Crosswalks, allocation rules, and lookup tables implicitly select a point along this trade-off. This audit makes that selection visible.
              </p>
            </div>
          </section>

          {/* Section 2 */}
          <section>
            <h3 className="font-mono text-xl font-bold mb-6 uppercase tracking-tighter border-l-4 border-nobel-gold pl-4">
              Proportional Allocation Is an Assumption
            </h3>
            <div className="text-lg text-stone-600 leading-relaxed space-y-4 pl-5">
              <p className="italic text-stone-500 text-sm mb-4">This is verbatim for "How to Apply Proportional Allocation"</p>
              <ol className="list-decimal list-outside ml-5 space-y-4">
                <li>
                  <strong className="text-stone-900">Identify the Split:</strong> If a Census tract is split by two different ZIP codes (e.g., 30% in ZIP A, 70% in ZIP B), the RES_RATIO will be 0.30 and 0.70.
                </li>
                <li>
                  <strong className="text-stone-900">Calculate Allocation:</strong> If a Census tract has 100 housing units, 30 units (100 * 0.30) are allocated to ZIP A, and 70 units (100 * 0.70) are allocated to ZIP B.
                </li>
                <li>
                  <strong className="text-stone-900">Handle Multiple Records:</strong> A single tract or ZIP code may appear multiple times if it overlaps with multiple, opposing boundaries.
                </li>
              </ol>
            </div>
          </section>

          {/* Section 3 */}
          <section>
            <h3 className="font-mono text-xl font-bold mb-6 uppercase tracking-tighter border-l-4 border-nobel-gold pl-4">
              Direction Matters (ZCTA → ZIP ≠ ZIP → ZCTA)
            </h3>
            <div className="text-lg text-stone-600 leading-relaxed space-y-4 pl-5">
              <p>
                This construction (crosswalks in general) does not imply bidirectionality (it is not a valid inverse crosswalk) and does not encode proportional allocation. It is used solely to quantify how a typical boundary-translation workflow can alter aggregate estimates under an explicit allocation rule.
              </p>
            </div>
          </section>

          {/* Section 4 */}
          <section>
            <h3 className="font-mono text-xl font-bold mb-6 uppercase tracking-tighter border-l-4 border-nobel-gold pl-4">
              What geoDeltaAudit Measures
            </h3>
            <div className="text-lg text-stone-600 leading-relaxed space-y-6 pl-5">
              <p>
                We quantify <strong className="text-stone-900 font-serif italic">Δx(VAR)</strong>, defined as the change in the value of a variable induced solely by geographic transformation and allocation choices, holding the underlying data source constant.
              </p>
              
              <div className="bg-white p-6 border border-stone-200 shadow-sm font-mono text-sm">
                <div className="font-bold text-stone-900 mb-2">Δx(VAR) Components:</div>
                <ul className="list-disc list-inside text-stone-600 space-y-1 ml-2">
                  <li>Sensitivity</li>
                  <li>Perturbation</li>
                  <li>Pathway dependence</li>
                </ul>
              </div>

              <p>
                In this example, <strong className="text-stone-900 font-serif italic">Δx(population)</strong> for Hennepin County under a ZCTA → ZIP → County transformation using HUD proportional allocation is <strong className="text-red-600 font-bold">−12.6%</strong> relative to the relationship-based baseline.
              </p>

              <div className="bg-stone-900 text-stone-300 p-6 font-mono text-sm space-y-2 shadow-md">
                <div className="flex gap-4"><span className="text-stone-500 w-24">Input:</span> <span className="text-white">VAR₀ at geography A</span></div>
                <div className="flex gap-4"><span className="text-stone-500 w-24">Transformation:</span> <span className="text-white">T₁ ∘ T₂ ∘ …</span></div>
                <div className="flex gap-4"><span className="text-stone-500 w-24">Output:</span> <span className="text-white">VAR₁ at geography A</span></div>
                <div className="w-full h-px bg-stone-700 my-2"></div>
                <div className="flex gap-4"><span className="text-nobel-gold w-24">Result:</span> <span className="text-white font-bold">Δx(VAR) = VAR₁ − VAR₀</span></div>
              </div>

              <div className="pt-4">
                <p className="font-bold text-stone-900 mb-2">Δx(VAR) does not imply:</p>
                <ul className="list-disc list-inside text-stone-600 space-y-2 ml-2">
                  <li>Directionality of truth</li>
                  <li>Which representation is "correct"</li>
                  <li>That zero delta is desirable</li>
                </ul>
                <p className="mt-4 italic text-stone-500 border-l-2 border-stone-300 pl-4">
                  Δx(VAR) is saying that the variable is not invariant under this transformation.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Methodology;
