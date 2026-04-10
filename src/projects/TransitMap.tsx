import React, { useState, useEffect, useMemo } from 'react';
import { MapContainer, TileLayer, GeoJSON, Popup, Marker, useMap } from 'react-leaflet';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import 'leaflet/dist/leaflet.css';
import { Layers, Map as MapIcon, Info, Filter, AlertTriangle, CheckCircle, Database, ShoppingCart } from 'lucide-react';
import * as d3Scale from 'd3-scale';
import * as d3ScaleChromatic from 'd3-scale-chromatic';

// We need to fix the default Leaflet icon issue in React
import L from 'leaflet';
// @ts-ignore
import icon from 'leaflet/dist/images/marker-icon.png';
// @ts-ignore
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

import finalAppData from './final_app_data.json';
import groceriesData from './groceries.json';

const VAR_CONFIG = {
  "Assessment Scores": [
    { id: "V_final_Weighted", label: "Final Weighted Score", direction: "High Value = High Vulnerability" },
    { id: "V_final_Unweighted", label: "Final Unweighted Score", direction: "High Value = High Vulnerability" }
  ],
  "Composite Scores": [
    { id: "C_Economic", label: "Economic Vulnerability", direction: "High Score = High Vulnerability" },
    { id: "C_Geographic", label: "Geographic Vulnerability", direction: "High Score = High Vulnerability" },
    { id: "TVS", label: "Transportation Vulnerability Score", direction: "High Score = High Vulnerability" }
  ],
  "Systemic Transit Impact": [
    { id: "C_Vehicle_A", label: "No Vehicle % HH", direction: "Darker = Less Access (High % No Vehicle)" },
    { id: "C_Transit_B", label: "Transit Stops per Capita", direction: "Darker = High Density (Or Desert Penalty)" },
    { id: "C_Internet_C", label: "% No Internet Access", direction: "Darker = Higher % No Internet" },
    { id: "C_Roads_D", label: "Walkability", direction: "Darker = Higher Walkability Score" }
  ],
  "Other Metrics": [
    { id: "LILA_Flag", label: "USDA LILA Flag", direction: "Red = Food Desert" }
  ]
};

const MapResizer = () => {
  const map = useMap();
  useEffect(() => {
    const timer = setTimeout(() => {
      map.invalidateSize();
    }, 550);
    return () => clearTimeout(timer);
  }, [map]);
  return null;
};

// Custom Pastel Palette for Internet (5 classes)
const PASTEL_COLORS = ['#fbb4ae', '#b3cde3', '#ccebc5', '#decbe4', '#fed9a6'];

// Color mapping logic based on the Python script
const getColorScale = (var_id: string, min: number, max: number) => {
  // Helper to create a linear scale from a d3 interpolator or an array of colors
  const createScale = (interpolatorOrColors: any, domainMin: number, domainMax: number) => {
    if (Array.isArray(interpolatorOrColors)) {
      // If it's an array of colors (like PASTEL_COLORS), map them evenly across the domain
      const domain = interpolatorOrColors.map((_, i) => domainMin + (i * (domainMax - domainMin)) / (interpolatorOrColors.length - 1));
      return d3Scale.scaleLinear<string>().domain(domain).range(interpolatorOrColors);
    } else {
      // If it's a d3 interpolator (like d3.interpolatePuBuGn)
      return d3Scale.scaleSequential(interpolatorOrColors).domain([domainMin, domainMax]);
    }
  };

  switch (var_id) {
    case "V_final_Weighted":
      return createScale(d3ScaleChromatic.interpolatePuBuGn, min, max);
    case "V_final_Unweighted":
      return createScale(d3ScaleChromatic.interpolateOranges, min, max);
    case "C_Transit_B":
      return createScale(d3ScaleChromatic.interpolateReds, 0, 5); // Manual bin override
    case "C_Vehicle_A":
      return createScale(d3ScaleChromatic.interpolatePurples, min, max);
    case "C_Economic":
      return createScale(d3ScaleChromatic.interpolateGreens, min, max);
    case "C_Internet_C":
    case "pct_no_internet":
      // For pct_no_internet, manual bins are [0, 10, 20, 30, 40, 50, 60]
      // We'll use the min/max from the data for C_Internet_C, but could hardcode if needed
      const domainMax = var_id === "pct_no_internet" ? 60 : max;
      const domainMin = var_id === "pct_no_internet" ? 0 : min;
      return createScale(PASTEL_COLORS, domainMin, domainMax);
    case "C_Roads_D":
      return createScale(d3ScaleChromatic.interpolateYlOrBr, min, max);
    case "C_Geographic":
      return createScale(d3ScaleChromatic.interpolatePuRd, min, max);
    case "LILA_Flag":
      return d3Scale.scaleLinear<string>().domain([0, 1]).range(['#f0f0f0', '#d6604d']);
    default:
      return createScale(d3ScaleChromatic.interpolateYlGnBu, min, max);
  }
};

const getColor = (value: number, var_id: string, min: number, max: number) => {
  if (value === undefined || value === null) return 'transparent';
  const scale = getColorScale(var_id, min, max);
  return scale(value) as string;
};

const groceryIcon = L.divIcon({
  html: `<div style="background-color: #10b981; width: 14px; height: 14px; border-radius: 50%; border: 2px solid white; box-shadow: 0 1px 3px rgba(0,0,0,0.4);"></div>`,
  className: 'custom-grocery-icon',
  iconSize: [14, 14],
  iconAnchor: [7, 7]
});

const VulnerabilityDashboard: React.FC = () => {
  const [selectedLayer, setSelectedLayer] = useState<string | null>("V_final_Weighted");
  const [selectedTract, setSelectedTract] = useState<string>(finalAppData.features[0].properties.GEOID);

  const [weights, setWeights] = useState({
    vehicle: 0.5,
    transit: 0.2,
    internet: 0.2,
    roads: 0.1
  });

  const dynamicFeatures = useMemo(() => {
    return finalAppData.features.map((f: any) => {
      const props = f.properties;
      const tvs = 
        weights.vehicle * (props.C_Vehicle_A || 0) + 
        weights.transit * (props.C_Transit_B || 0) + 
        weights.internet * (props.C_Internet_C || 0) + 
        weights.roads * (props.C_Roads_D || 0);
      
      const v_final_w = (props.C_Economic || 0) + (props.C_Geographic || 0) + tvs;
      
      return {
        ...f,
        properties: {
          ...props,
          V_final_Weighted: v_final_w,
          TVS: tvs
        }
      };
    });
  }, [weights]);

  // Calculate min/max for the selected layer to drive the color scale
  const layerStats = useMemo(() => {
    if (!selectedLayer) return { min: 0, max: 1 };
    const values = dynamicFeatures
      .map((f: any) => f.properties[selectedLayer])
      .filter((v: any) => v !== undefined && v !== null);
    if (values.length === 0) return { min: 0, max: 1 };
    return {
      min: Math.min(...values),
      max: Math.max(...values)
    };
  }, [selectedLayer, dynamicFeatures]);

  const geoJsonStyle = (feature: any) => {
    if (!selectedLayer) {
      return { fillColor: 'transparent', color: 'black', weight: 2, fillOpacity: 0 };
    }
    const val = feature.properties[selectedLayer];
    return {
      fillColor: getColor(val, selectedLayer, layerStats.min, layerStats.max),
      color: 'white',
      weight: 1,
      fillOpacity: 0.7
    };
  };

  const activeTractData = useMemo(() => {
    return dynamicFeatures.find((f: any) => f.properties.GEOID === selectedTract)?.properties || null;
  }, [selectedTract, dynamicFeatures]);

  const chartConfig = useMemo(() => {
    if (!selectedLayer) return { keys: [], label: '' };
    if (selectedLayer === 'V_final_Weighted' || selectedLayer === 'V_final_Unweighted') {
      return {
        keys: [
          { key: 'Unweighted Score', color: '#007ACC' },
          { key: 'Weighted Score', color: '#D34D4D' }
        ],
        label: 'Context vs. Flattening'
      };
    }
    
    let label = selectedLayer;
    for (const group of Object.values(VAR_CONFIG)) {
      const item = group.find(i => i.id === selectedLayer);
      if (item) {
        label = item.label;
        break;
      }
    }
    return {
      keys: [{ key: label, color: '#D34D4D' }],
      label: label
    };
  }, [selectedLayer]);

  const comparisonChartData = useMemo(() => {
    return dynamicFeatures.map((f: any) => {
      const base = { name: `Tract ${f.properties.TRACTCE20}`, GEOID: f.properties.GEOID };
      if (selectedLayer === 'V_final_Weighted' || selectedLayer === 'V_final_Unweighted') {
        return {
          ...base,
          'Weighted Score': f.properties.V_final_Weighted,
          'Unweighted Score': f.properties.V_final_Unweighted,
        };
      } else if (selectedLayer) {
        return {
          ...base,
          [chartConfig.label]: f.properties[selectedLayer]
        };
      }
      return base;
    });
  }, [dynamicFeatures, selectedLayer, chartConfig.label]);

  const breakdownChartData = useMemo(() => {
    if (!activeTractData) return [];
    return [
      { name: 'C_Economic', score: activeTractData.C_Economic || 0 },
      { name: 'C_Geographic', score: activeTractData.C_Geographic || 0 },
      { name: 'C_Vehicle_A (Weighted)', score: (activeTractData.C_Vehicle_A || 0) * weights.vehicle },
      { name: 'C_Transit_B (Weighted)', score: (activeTractData.C_Transit_B || 0) * weights.transit },
      { name: 'C_Internet_C (Weighted)', score: (activeTractData.C_Internet_C || 0) * weights.internet },
      { name: 'C_Roads_D (Weighted)', score: (activeTractData.C_Roads_D || 0) * weights.roads }
    ];
  }, [activeTractData, weights]);

  return (
    <div className="min-h-screen bg-stone-50 pt-12 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Project Landing Page Content Placeholder */}
        <div className="mb-12 max-w-4xl">
          <div className="inline-block mb-4 px-2 py-1 bg-stone-200 text-stone-600 text-[10px] font-bold tracking-[0.2em] uppercase">
            Project Overview
          </div>
          <h1 className="font-serif text-4xl md:text-5xl text-stone-900 mb-6 leading-tight">
            Mapping Food Vulnerability
          </h1>
          <div className="prose prose-stone text-stone-600 font-light max-w-none">
            <p className="text-lg">
              Welcome to the Mapping Food Vulnerability project page. This space is reserved for your project narrative, 
              methodology updates, and future iterations. You can add or edit content here to provide context 
              before users interact with the data dashboard below.
            </p>
            <p className="mt-4">
              <a href="https://github.com/phinnphace/MVP-Food-access-county-tree-update_test_1.02" target="_blank" rel="noreferrer" className="text-blue-600 hover:underline font-medium">
                View the project repository on GitHub
              </a>
            </p>
            {/* Add more landing page content here as needed */}
          </div>
        </div>

        <hr className="border-stone-200 my-12" />

        {/* The "Shiny App" Dashboard Container */}
        <div className="bg-white rounded-2xl shadow-xl border border-stone-200 overflow-hidden">
          <div className="bg-stone-900 text-white px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Database size={20} className="text-blue-400" />
              <h2 className="font-mono text-sm font-bold tracking-widest uppercase">Interactive Vulnerability Dashboard</h2>
            </div>
            <div className="text-[10px] font-mono text-stone-400 uppercase tracking-widest">
              Static Model v1.0
            </div>
          </div>
          
          <div className="p-6 sm:p-8 lg:p-10 bg-stone-50">
            {/* Header Section for the App */}
            <div className="mb-12 max-w-4xl">
              <h2 className="font-serif text-3xl text-stone-900 mb-6 leading-tight">
                Seeing through the Map: A Static Test of Classification, Measurement, and Proxy Logic
              </h2>
              
              <div className="prose prose-stone text-stone-600 font-light max-w-none">
                <h3 className="text-xl font-medium text-stone-800 mt-8 mb-4">An Invitation to Critique</h3>
                <p>
                  This dashboard is not a statement of fact, but a <strong>proposal for measurement</strong>. 
                  Standard USDA maps often erase local nuance. This model attempts to correct that by implementing <strong>Contextual Weighting (RUCA)</strong>, and accounting for systemic infrastructure gaps.
                </p>
            <p>
              This dashboard demonstrates an <strong>Equity-Centered Scoring Model</strong> where context is used to weight components, correcting for the flaws of 'one-size-fits-all' vulnerability indices. 
              The model incorporates <strong>Composite Economic</strong> and <strong>Systemic Transit Penalty</strong> factors.
            </p>
            <p>
              The model is far from a benchmark and it is still "better" than a binary measurement that relies on the false assumption that proximity to a resource equals access.
            </p>
            
            <div className="bg-stone-100 p-6 border-l-4 border-stone-400 my-8">
              <h4 className="text-sm font-bold uppercase tracking-wider text-stone-800 mb-2">How to use this tool:</h4>
              <ol className="list-decimal pl-5 space-y-2 text-sm">
                <li><strong>Deconstruct:</strong> Use the sidebar to view the raw components (like Transit or Internet).</li>
                <li><strong>Compare:</strong> Look at how the <em>Unweighted</em> score differs from the <em>Weighted</em> score.</li>
                <li><strong>Ask:</strong> Does this classification logic hold up? Where does the proxy logic fail?</li>
              </ol>
            </div>

            <h3 className="text-xl font-medium text-stone-800 mt-8 mb-4">Presumptive norms lead to disproportionate effects.</h3>
            <p>
              Take the approach the USDA uses for the “food desert” flag (LILA tracts) in the <a href="https://www.ers.usda.gov/data-products/food-access-research-atlas/" target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">Food Access Research Atlas</a>:
            </p>
            <p className="text-sm italic border-l-2 border-stone-300 pl-4 my-4">
              A tract is classified as ‘low-income, low-access’ (LILA) if it meets both low-income criteria (poverty rate ≥20% or median family income ≤80% of state/metro median) and low-access criteria (at least 500 people or 33% of the population more than 1 mile [urban] or 10 miles [rural] from the nearest supermarket, supercenter, or large grocery), as defined by USDA ERS (2023).
            </p>
            <p>
              In summation; resource proximity. How close are you or I to the resource states how accessible it is to us. There are refinements to this where they add in the vehicle by household percentage. 
              As a (recent) non-driver due to disability in a small city with sub-optimal transit I know first hand how inaccurate these measures are.
            </p>
            <p>
              Decatur County, GA was randomly selected for this static model and is ~ 35 miles wide; given the above definition, the grocery points that are placed on the map from OpenStreetMap mean that almost everyone falls within the range of grocery store access.{' '}
              <strong>Accessibility is far more complicated than that.</strong>
            </p>
          </div>
        </div>

        <hr className="border-stone-200 my-12" />

        {/* Section 1: Main Map & Controls */}
        <div className="mb-16">
          <h2 className="font-serif text-2xl text-stone-900 mb-8">1. Final Contextual Vulnerability Score (V_final_Weighted)</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Left Column: Controls & Widgets */}
            <div className="lg:col-span-1 space-y-8">
              
              {/* Tract Selector & USDA Widget */}
              <div className="bg-white border border-stone-200 shadow-sm p-6">
                <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-stone-400 mb-4">
                  Select Tract
                </h3>
                <select 
                  className="w-full p-2 border border-stone-300 rounded-md text-sm mb-6 bg-stone-50"
                  value={selectedTract}
                  onChange={(e) => setSelectedTract(e.target.value)}
                >
                  {dynamicFeatures.map((f: any) => (
                    <option key={f.properties.GEOID} value={f.properties.GEOID}>
                      Tract {f.properties.TRACTCE20}
                    </option>
                  ))}
                </select>

                <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-stone-400 mb-4 flex items-center gap-2">
                  USDA LILA Status
                </h3>
                
                {activeTractData?.LILA_Flag === 1 ? (
                  <div className="p-4 bg-red-50 border border-red-100 rounded-md">
                    <div className="flex items-center gap-2 mb-1">
                      <AlertTriangle size={18} className="text-red-600" />
                      <span className="text-sm font-bold text-red-700 uppercase tracking-wider">YES: Food Desert</span>
                    </div>
                    <p className="text-xs text-red-600/80 mt-2">Low Income + Low Access (&gt; 10mi)</p>
                  </div>
                ) : (
                  <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-md">
                    <div className="flex items-center gap-2 mb-1">
                      <CheckCircle size={18} className="text-emerald-600" />
                      <span className="text-sm font-bold text-emerald-700 uppercase tracking-wider">NO: Not a Food Desert</span>
                    </div>
                    <p className="text-xs text-emerald-600/80 mt-2">Does not meet Low Income & Low Access criteria</p>
                  </div>
                )}
              </div>

              {/* Map Controls */}
              <div className="bg-white border border-stone-200 shadow-sm p-6">
                <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-stone-400 mb-6 flex items-center gap-2">
                  <Filter size={14} /> Vulnerability Layers
                </h3>
                
                <div className="space-y-6">
                  {Object.entries(VAR_CONFIG).map(([groupName, items]) => (
                    <div key={groupName}>
                      <h4 className="text-xs font-bold text-stone-800 mb-3">{groupName}</h4>
                      <div className="space-y-2">
                        {items.map((item) => (
                          <label key={item.id} className="flex items-start gap-3 cursor-pointer group">
                            <div className="relative flex items-center justify-center mt-0.5">
                              <input 
                                type="radio" 
                                name="mapLayer"
                                className="sr-only" 
                                checked={selectedLayer === item.id}
                                onChange={() => setSelectedLayer(item.id)}
                              />
                              <div className={`w-4 h-4 rounded-full border transition-colors flex items-center justify-center ${selectedLayer === item.id ? 'bg-blue-600 border-blue-600' : 'bg-white border-stone-300 group-hover:border-blue-400'}`}>
                                {selectedLayer === item.id && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
                              </div>
                            </div>
                            <div className="flex flex-col">
                              <span className={`text-sm transition-colors ${selectedLayer === item.id ? 'text-stone-900 font-medium' : 'text-stone-600'}`}>
                                {item.label}
                              </span>
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <button 
                  onClick={() => setSelectedLayer(null)}
                  className="w-full mt-6 py-2 px-4 bg-stone-100 hover:bg-stone-200 text-stone-700 text-sm font-medium rounded transition-colors"
                >
                  Clear Map
                </button>
              </div>

              {/* Score Guide */}
              <div className="bg-white border border-stone-200 shadow-sm p-6">
                <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-stone-400 mb-4 flex items-center gap-2">
                  <Info size={14} /> How to Read the Scores
                </h3>
                <div className="space-y-4 text-sm text-stone-600 leading-relaxed">
                  <p>
                    All scores are standardized (Z-scores) to compare each tract against the <strong>national average</strong>.
                  </p>
                  <ul className="space-y-3 mt-4">
                    <li className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-stone-100 flex items-center justify-center font-mono font-bold text-stone-600 text-xs">0</span>
                      <span><strong>Average:</strong> A score of zero means the tract is exactly at the national average.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-red-100 flex items-center justify-center font-mono font-bold text-red-600 text-xs">+</span>
                      <span><strong>Worse:</strong> Positive scores indicate <em>higher vulnerability</em> or lack of access.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center font-mono font-bold text-emerald-600 text-xs">-</span>
                      <span><strong>Better:</strong> Negative scores indicate <em>lower vulnerability</em> or better access.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Right Column: Map */}
            <div className="lg:col-span-3">
              <div className="bg-white border border-stone-200 shadow-sm h-[600px] relative z-0">
                <MapContainer 
                  center={[30.87, -84.57]} // Decatur County, GA
                  zoom={10} 
                  style={{ height: '100%', width: '100%' }}
                  zoomControl={true}
                >
                  <MapResizer />
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  
                  {/* Dynamic GeoJSON Layer */}
                  <GeoJSON 
                    key={(selectedLayer || 'empty') + JSON.stringify(weights)} 
                    data={{ type: "FeatureCollection", features: dynamicFeatures } as any} 
                    style={geoJsonStyle}
                    onEachFeature={(feature, layer) => {
                      layer.bindTooltip(`Tract: ${feature.properties.TRACTCE20}`);
                      layer.on({
                        click: () => {
                          setSelectedTract(feature.properties.GEOID);
                        }
                      });
                    }}
                  />

                  {/* Selected Tract Highlight */}
                  {selectedTract && (
                    <GeoJSON
                      key={`highlight-${selectedTract}`}
                      data={dynamicFeatures.find((f: any) => f.properties.GEOID === selectedTract) as any}
                      style={{
                        fillColor: 'transparent',
                        color: '#10b981',
                        weight: 4,
                        fillOpacity: 0
                      }}
                      interactive={false}
                    />
                  )}

                  {/* Render Grocery Stores */}
                  {groceriesData.features.map((f: any, idx: number) => {
                    // Extract coordinates [lng, lat]
                    const coords = f.geometry.coordinates;
                    if (!coords || coords.length < 2) return null;
                    return (
                      <Marker key={`grocery-${idx}`} position={[coords[1], coords[0]]} icon={groceryIcon}>
                        <Popup>
                          <strong>{f.properties.name || "Grocery Store"}</strong><br/>
                          {f.properties.address && <span>{f.properties.address}</span>}
                        </Popup>
                      </Marker>
                    );
                  })}
                </MapContainer>
                
                {/* Map Overlay UI */}
                <div className="absolute top-4 right-4 z-[400] bg-white p-3 shadow-sm border border-stone-200 flex flex-col gap-2 pointer-events-none min-w-[180px]">
                  <div className="flex items-center gap-2 border-b border-stone-100 pb-2">
                    <MapIcon size={14} className="text-stone-400" />
                    <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-stone-900 leading-tight">
                      {chartConfig.label || 'No Layer Selected'}
                    </span>
                  </div>
                  {selectedLayer && selectedLayer !== 'LILA_Flag' && (
                    <div className="flex flex-col gap-1 mt-1">
                      <div className="flex justify-between items-center text-[10px] font-mono">
                        <span className="text-stone-500">Min:</span>
                        <span className="font-bold text-emerald-600">{layerStats.min.toFixed(2)} <span className="text-[9px] font-sans font-normal text-stone-400">(Better)</span></span>
                      </div>
                      <div className="flex justify-between items-center text-[10px] font-mono">
                        <span className="text-stone-500">Max:</span>
                        <span className="font-bold text-red-600">{layerStats.max.toFixed(2)} <span className="text-[9px] font-sans font-normal text-stone-400">(Worse)</span></span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="mt-4 p-3 bg-emerald-50 border border-emerald-100 rounded text-xs text-emerald-800 flex items-start gap-2">
                <Info size={16} className="flex-shrink-0 mt-0.5" />
                <p><strong>Note:</strong> The green points on the map represent known grocery store locations.</p>
              </div>
            </div>
          </div>
        </div>

        <hr className="border-stone-200 my-12" />

        {/* Section 2 & 3: Charts and Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          
          {/* Section 2: Comparison */}
          <div>
            <h2 className="font-serif text-2xl text-stone-900 mb-4">
              2. {selectedLayer === 'V_final_Weighted' || selectedLayer === 'V_final_Unweighted' ? 'Context vs. Flattening' : 'Layer Distribution'}
            </h2>
            <p className="text-sm text-stone-600 font-light mb-8">
              {selectedLayer === 'V_final_Weighted' || selectedLayer === 'V_final_Unweighted' 
                ? <>The comparison shows the difference between the <strong>Unweighted Score</strong> (simple additive) and the <strong>Weighted Score</strong> (using Transport Vulnerability Score with RUCA context weights).</>
                : `This chart displays the distribution of ${chartConfig.label} across all tracts in the county.`}
            </p>
            
            <div className="bg-white border border-stone-200 shadow-sm p-6 h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart 
                  data={comparisonChartData} 
                  margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
                  onClick={(state) => {
                    if (state && state.activePayload && state.activePayload.length > 0) {
                      setSelectedTract(state.activePayload[0].payload.GEOID);
                    }
                  }}
                  className="cursor-pointer"
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} />
                  <Tooltip 
                    cursor={{ fill: '#f3f4f6' }}
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                  <Legend wrapperStyle={{ paddingTop: '20px' }} />
                  {chartConfig.keys.map((k) => (
                    <Bar 
                      key={k.key} 
                      dataKey={k.key} 
                      fill={k.color} 
                      radius={[4, 4, 0, 0]} 
                    >
                      {comparisonChartData.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={k.color} 
                          fillOpacity={entry.GEOID === selectedTract ? 1 : 0.4}
                        />
                      ))}
                    </Bar>
                  ))}
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Section 3: Breakdown */}
          <div>
            <h2 className="font-serif text-2xl text-stone-900 mb-4">3. Component Breakdown</h2>
            <p className="text-sm text-stone-600 font-light mb-4">
              This view is critical for <strong>anti-erasure practice</strong>, showing exactly which component drives the score for Tract {activeTractData?.TRACTCE20}. Adjust the weights below to see how the final score changes dynamically.
            </p>

            {/* Interactive Weights Sliders */}
            <div className="bg-stone-50 border border-stone-200 p-4 rounded-md mb-6 space-y-3">
              <div className="flex justify-between items-end mb-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500">Adjust TVS Weights</h4>
                <span className="text-[10px] text-stone-400 uppercase tracking-wider">0 = Ignored, 1 = Max Impact</span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-stone-600 flex justify-between">
                    <span>Vehicle Access</span>
                    <span className="font-mono">{weights.vehicle.toFixed(2)}</span>
                  </label>
                  <input type="range" min="0" max="1" step="0.05" value={weights.vehicle} onChange={e => setWeights(w => ({ ...w, vehicle: parseFloat(e.target.value) }))} className="w-full h-1.5 bg-stone-300 rounded-lg appearance-none cursor-pointer" />
                </div>
                <div>
                  <label className="text-xs text-stone-600 flex justify-between">
                    <span>Transit Stops</span>
                    <span className="font-mono">{weights.transit.toFixed(2)}</span>
                  </label>
                  <input type="range" min="0" max="1" step="0.05" value={weights.transit} onChange={e => setWeights(w => ({ ...w, transit: parseFloat(e.target.value) }))} className="w-full h-1.5 bg-stone-300 rounded-lg appearance-none cursor-pointer" />
                </div>
                <div>
                  <label className="text-xs text-stone-600 flex justify-between">
                    <span>Internet Access</span>
                    <span className="font-mono">{weights.internet.toFixed(2)}</span>
                  </label>
                  <input type="range" min="0" max="1" step="0.05" value={weights.internet} onChange={e => setWeights(w => ({ ...w, internet: parseFloat(e.target.value) }))} className="w-full h-1.5 bg-stone-300 rounded-lg appearance-none cursor-pointer" />
                </div>
                <div>
                  <label className="text-xs text-stone-600 flex justify-between">
                    <span>Roads/Walkability</span>
                    <span className="font-mono">{weights.roads.toFixed(2)}</span>
                  </label>
                  <input type="range" min="0" max="1" step="0.05" value={weights.roads} onChange={e => setWeights(w => ({ ...w, roads: parseFloat(e.target.value) }))} className="w-full h-1.5 bg-stone-300 rounded-lg appearance-none cursor-pointer" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-blue-50 border border-blue-100 p-4 rounded-md">
                <div className="text-xs text-blue-600 font-bold uppercase tracking-wider mb-1">Weighted</div>
                <div className="text-2xl font-light text-blue-900">{activeTractData?.V_final_Weighted?.toFixed(2) || 'N/A'}</div>
              </div>
              <div className="bg-stone-100 border border-stone-200 p-4 rounded-md">
                <div className="text-xs text-stone-500 font-bold uppercase tracking-wider mb-1">Unweighted</div>
                <div className="text-2xl font-light text-stone-800">{activeTractData?.V_final_Unweighted?.toFixed(2) || 'N/A'}</div>
              </div>
              <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-md">
                <div className="text-xs text-emerald-600 font-bold uppercase tracking-wider mb-1">Poverty Rate</div>
                <div className="text-2xl font-light text-emerald-900">{activeTractData?.poverty_pct?.toFixed(1) || '0'}%</div>
              </div>
            </div>
            
            <div className="bg-white border border-stone-200 shadow-sm p-6 h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={breakdownChartData} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e5e7eb" />
                  <XAxis type="number" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} />
                  <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#4b5563' }} />
                  <Tooltip 
                    cursor={{ fill: '#f3f4f6' }}
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                  <Bar dataKey="score" radius={[0, 4, 4, 0]}>
                    {breakdownChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.score > 0 ? '#D34D4D' : '#2E8B57'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>

        <hr className="border-stone-200 my-12" />

        {/* Section 4: Full Data Table */}
        <div className="mb-16">
          <h2 className="font-serif text-2xl text-stone-900 mb-8">4. Full Data Table</h2>
          <div className="bg-white border border-stone-200 shadow-sm overflow-x-auto">
            <table className="min-w-full divide-y divide-stone-200 text-sm">
              <thead className="bg-stone-50">
                <tr>
                  <th className="px-4 py-3 text-left font-bold text-stone-500 uppercase tracking-wider">TRACTCE20</th>
                  <th className="px-4 py-3 text-left font-bold text-stone-500 uppercase tracking-wider">GEOID</th>
                  <th className="px-4 py-3 text-left font-bold text-stone-500 uppercase tracking-wider">V_final_W</th>
                  <th className="px-4 py-3 text-left font-bold text-stone-500 uppercase tracking-wider">V_final_UW</th>
                  <th className="px-4 py-3 text-left font-bold text-stone-500 uppercase tracking-wider">C_Eco</th>
                  <th className="px-4 py-3 text-left font-bold text-stone-500 uppercase tracking-wider">C_Geo</th>
                  <th className="px-4 py-3 text-left font-bold text-stone-500 uppercase tracking-wider">C_Veh_A</th>
                  <th className="px-4 py-3 text-left font-bold text-stone-500 uppercase tracking-wider">C_Trans_B</th>
                  <th className="px-4 py-3 text-left font-bold text-stone-500 uppercase tracking-wider">C_Int_C</th>
                  <th className="px-4 py-3 text-left font-bold text-stone-500 uppercase tracking-wider">C_Rds_D</th>
                  <th className="px-4 py-3 text-left font-bold text-stone-500 uppercase tracking-wider">LILA</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-stone-200 font-light text-stone-600">
                {dynamicFeatures.map((f: any, idx: number) => (
                  <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-stone-50'}>
                    <td className="px-4 py-3 whitespace-nowrap font-medium text-stone-900">{f.properties.TRACTCE20}</td>
                    <td className="px-4 py-3 whitespace-nowrap">{f.properties.GEOID}</td>
                    <td className="px-4 py-3 whitespace-nowrap">{f.properties.V_final_Weighted?.toFixed(3)}</td>
                    <td className="px-4 py-3 whitespace-nowrap">{f.properties.V_final_Unweighted?.toFixed(3)}</td>
                    <td className="px-4 py-3 whitespace-nowrap">{f.properties.C_Economic?.toFixed(3)}</td>
                    <td className="px-4 py-3 whitespace-nowrap">{f.properties.C_Geographic?.toFixed(3)}</td>
                    <td className="px-4 py-3 whitespace-nowrap">{f.properties.C_Vehicle_A?.toFixed(3)}</td>
                    <td className="px-4 py-3 whitespace-nowrap">{f.properties.C_Transit_B?.toFixed(3)}</td>
                    <td className="px-4 py-3 whitespace-nowrap">{f.properties.C_Internet_C?.toFixed(3)}</td>
                    <td className="px-4 py-3 whitespace-nowrap">{f.properties.C_Roads_D?.toFixed(3)}</td>
                    <td className="px-4 py-3 whitespace-nowrap">{f.properties.LILA_Flag}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <hr className="border-stone-200 my-12" />

        {/* Section 5: Methodology */}
        <div className="mb-16">
          <h2 className="font-serif text-2xl text-stone-900 mb-8">5. Model Methodology</h2>
          <div className="bg-white border border-stone-200 shadow-sm p-8 prose prose-stone max-w-none">
            <p className="text-sm font-light">
              All standardized variables use global mean (μ) and global standard deviation (σ) from the master dataset.
              This ensures Decatur County's tracts are evaluated relative to the broader landscape rather than an artificially small local sample.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-8">
              <div>
                <h4 className="text-lg font-medium text-stone-800">Model Formulas</h4>
                <div className="space-y-4 mt-4">
                  <div className="p-4 bg-stone-50 rounded border border-stone-100">
                    <div className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-2">Final Weighted Model</div>
                    <code className="text-sm text-stone-800 bg-transparent p-0">V_final_W = C_Eco + C_Geo + TVS</code>
                  </div>
                  <div className="p-4 bg-stone-50 rounded border border-stone-100">
                    <div className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-2">Transport Vulnerability Score</div>
                    <code className="text-sm text-stone-800 bg-transparent p-0">TVS = {weights.vehicle.toFixed(2)}(C_A) + {weights.transit.toFixed(2)}(C_B) + {weights.internet.toFixed(2)}(C_Internet_C) + {weights.roads.toFixed(2)}(C_Roads_D)</code>
                  </div>
                  <div className="p-4 bg-stone-50 rounded border border-stone-100">
                    <div className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-2">Transit Absence Penalty</div>
                    <code className="text-sm text-stone-800 bg-transparent p-0">C_Transit_B = +3.0</code>
                  </div>
                  <div className="p-4 bg-stone-50 rounded border border-stone-100">
                    <div className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-2">Unweighted Model (for comparison)</div>
                    <code className="text-sm text-stone-800 bg-transparent p-0">V_final_UW = C_Eco + C_Geo + C_A + C_Transit_B + C_Internet_C + C_Roads_D</code>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-medium text-stone-800">Interpretation Framework</h4>
                <p className="text-sm font-light mt-4">
                  The comparison between <strong>unweighted</strong> and <strong>RUCA-weighted</strong> final scores reveals the necessity of context-sensitive weighting.
                  The unweighted model treats all components equally, erasing rural conditions.
                  The weighted model elevates the components that matter most in Micropolitan regions—vehicle access, roads—and down-weights structurally absent elements like transit.
                </p>
                <p className="text-sm font-light mt-4">
                  This prevents the erasure of localized transport barriers and creates an equitable, context-aware food access vulnerability score.
                </p>
              </div>
            </div>

            <hr className="border-stone-200 my-12" />

            <h3 className="text-xl font-medium text-stone-800 mb-6">Component Definitions</h3>
            <div className="space-y-8">
              <div>
                <h4 className="font-bold text-stone-900">1. Economic Vulnerability (C_Economic)</h4>
                <div className="bg-stone-50 p-4 my-3 rounded border border-stone-100 text-center font-mono text-sm">
                  C<sub>Economic</sub> = -Z<sub>Income</sub> + Z<sub>Poverty_pct</sub>
                </div>
                <p className="text-sm text-stone-600"><em>Concept:</em> Income alone hides deprivation. Pairing reversed income with positive poverty rate prevents flattening of economic reality.</p>
              </div>
              <div>
                <h4 className="font-bold text-stone-900">2. Geographic Vulnerability (C_Geo)</h4>
                <div className="bg-stone-50 p-4 my-3 rounded border border-stone-100 text-center font-mono text-sm">
                  C<sub>Geo</sub> = -Z<sub>den_total_food_stores</sub>
                </div>
                <p className="text-sm text-stone-600"><em>Concept:</em> Store density directly indicates food resource availability. Low density increases vulnerability.</p>
              </div>
              <div>
                <h4 className="font-bold text-stone-900">3. Vehicle Access Vulnerability (C_Vehicle_A)</h4>
                <div className="bg-stone-50 p-4 my-3 rounded border border-stone-100 text-center font-mono text-sm">
                  C<sub>Vehicle_A</sub> = Z<sub>Vehicles_pct_HH_No_Vehicle</sub>
                </div>
                <p className="text-sm text-stone-600"><em>Concept:</em> In rural areas without transit, lacking a vehicle is one of the strongest predictors of limited access.</p>
              </div>
              <div>
                <h4 className="font-bold text-stone-900">4. Transit Access Vulnerability (C_Transit_B)</h4>
                <div className="bg-stone-50 p-4 my-3 rounded border border-stone-100 text-center font-mono text-sm">
                  C<sub>Transit_B</sub> = -Z<sub>STOPS_PER_CAPITA</sub>
                </div>
                <p className="text-sm text-stone-600"><em>(Penalty +3.0 when no transit) Concept:</em> Transit stop availability is protective. Zero availability indicates systemic infrastructure failure.</p>
              </div>
              <div>
                <h4 className="font-bold text-stone-900">5. Internet Access Vulnerability (C_Internet_C)</h4>
                <div className="bg-stone-50 p-4 my-3 rounded border border-stone-100 text-center font-mono text-sm">
                  C<sub>Internet_C</sub> = Z<sub>est_NO_INT</sub> + Z<sub>pct_no_internet</sub> - Z<sub>pct_cellular_broadband</sub>
                </div>
                <p className="text-sm text-stone-600"><em>Concept:</em> Captures multiple facets of digital exclusion. Accessing transit can be entirely data access dependent. Digital connectivity acknowledges this contextual reality. Lack-of-access increases lack of mobility potential.</p>
              </div>
              <div>
                <h4 className="font-bold text-stone-900">6. Roads / Walkability Vulnerability (C_Roads_D)</h4>
                <div className="bg-stone-50 p-4 my-3 rounded border border-stone-100 text-center font-mono text-sm">
                  C<sub>Roads_D</sub> = -Z<sub>PROP_PRIM_SEC_ROADS</sub>
                </div>
                <p className="text-sm text-stone-600"><em>Concept:</em> Primary and secondary roads serve as a proxy for mobility infrastructure. Low road density increases vulnerability.</p>
              </div>
            </div>
          </div>
        </div>

        <hr className="border-stone-200 my-12" />

        {/* Section 6: Datasets */}
        <div className="mb-16">
          <h2 className="font-serif text-2xl text-stone-900 mb-8 flex items-center gap-3">
            <Database className="text-stone-400" /> 5. Datasets
          </h2>
          <div className="bg-white border border-stone-200 shadow-sm overflow-hidden">
            <table className="min-w-full divide-y divide-stone-200 text-sm">
              <thead className="bg-stone-50">
                <tr>
                  <th className="px-6 py-3 text-left font-bold text-stone-500 uppercase tracking-wider">Dataset</th>
                  <th className="px-6 py-3 text-left font-bold text-stone-500 uppercase tracking-wider">Contribution</th>
                  <th className="px-6 py-3 text-left font-bold text-stone-500 uppercase tracking-wider">Source</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-stone-200 font-light text-stone-600">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-stone-900">ACS 5-Year Estimates (2019-2023)</td>
                  <td className="px-6 py-4">Socioeconomic indicators</td>
                  <td className="px-6 py-4"><a href="https://data.census.gov" className="text-blue-600 hover:underline" target="_blank" rel="noreferrer">U.S. Census Bureau</a></td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-stone-900">NaNDA Grocery Stores (2020)</td>
                  <td className="px-6 py-4">Grocery store density</td>
                  <td className="px-6 py-4"><a href="https://doi.org/10.3886/E209313V1" className="text-blue-600 hover:underline" target="_blank" rel="noreferrer">ICPSR</a></td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-stone-900">NaNDA Transit Stops (2024)</td>
                  <td className="px-6 py-4">Public transit stop counts</td>
                  <td className="px-6 py-4"><a href="https://doi.org/10.3886/ICPSR38605.v2" className="text-blue-600 hover:underline" target="_blank" rel="noreferrer">ICPSR</a></td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-stone-900">NaNDA Road Infrastructure (2020)</td>
                  <td className="px-6 py-4">Road density (walkability proxy)</td>
                  <td className="px-6 py-4"><a href="https://www.openicpsr.org/openicpsr/project/120221/version/V1/view" className="text-blue-600 hover:underline" target="_blank" rel="noreferrer">ICPSR</a></td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-stone-900">NaNDA Internet Access (2019)</td>
                  <td className="px-6 py-4">Internet connectivity</td>
                  <td className="px-6 py-4"><a href="https://www.openicpsr.org/openicpsr/project/120224/version/V1/view" className="text-blue-600 hover:underline" target="_blank" rel="noreferrer">ICPSR</a></td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-stone-900">USDA RUCA Codes (2020)</td>
                  <td className="px-6 py-4">Rural-urban connectivity</td>
                  <td className="px-6 py-4"><a href="https://www.ers.usda.gov/data-products/rural-urban-commuting-area-codes/" className="text-blue-600 hover:underline" target="_blank" rel="noreferrer">USDA ERS</a></td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-stone-900">USDA RUCC Codes (2023)</td>
                  <td className="px-6 py-4">County-level classification</td>
                  <td className="px-6 py-4"><a href="https://www.ers.usda.gov/data-products/rural-urban-continuum-codes/" className="text-blue-600 hover:underline" target="_blank" rel="noreferrer">USDA ERS</a></td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-stone-900">HUD ZIP-Tract Crosswalk (2020)</td>
                  <td className="px-6 py-4">Geographic alignment</td>
                  <td className="px-6 py-4"><a href="https://www.huduser.gov/portal/datasets/usps_crosswalk.html" className="text-blue-600 hover:underline" target="_blank" rel="noreferrer">HUD User</a></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div> {/* End of App Container padding */}
    </div> {/* End of App Container */}

  </div> {/* End of max-w-7xl */}
</div>
  );
};

export default VulnerabilityDashboard;
