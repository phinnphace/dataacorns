import React, { useState, useEffect, useMemo } from 'react';
import { MapContainer, TileLayer, GeoJSON, Popup, Marker, Polyline, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { 
  Compass, 
  Map as MapIcon, 
  Navigation, 
  Clock, 
  Layers, 
  Info, 
  ArrowRight, 
  History, 
  Check, 
  Flame, 
  ChevronRight, 
  Code,
  FileCode,
  Bus,
  Car,
  Bike,
  Milestone,
  Copy,
  ChevronDown,
  ExternalLink
} from 'lucide-react';

// Import raw python script for educational display
// @ts-ignore
import pythonCode from './ComputeRouteMatrix.py?raw';

// Import extracted JSON data
import mappingInequality from '../../transitaware/mappinginequality.json';
import restaurantsData from '../../transitaware/restaurants.json';

// Coordinates for the starting point / Home
const HOME_COORDS: [number, number] = [43.1329, -89.3409];

// Utility: Decoder for standard Google encoded polylines in TypeScript
function decodePolyline(encoded: string | null): [number, number][] {
  if (!encoded) return [];
  let index = 0;
  let lat = 0;
  let lng = 0;
  const coordinates: [number, number][] = [];

  while (index < encoded.length) {
    let result = 0;
    let shift = 0;
    let byte = null;

    do {
      byte = encoded.charCodeAt(index++) - 63;
      result |= (byte & 0x1f) << shift;
      shift += 5;
    } while (byte >= 0x20);

    lat += (result & 1) ? ~(result >> 1) : (result >> 1);
    result = 0;
    shift = 0;

    do {
      byte = encoded.charCodeAt(index++) - 63;
      result |= (byte & 0x1f) << shift;
      shift += 5;
    } while (byte >= 0x20);

    lng += (result & 1) ? ~(result >> 1) : (result >> 1);
    coordinates.push([lat / 1e5, lng / 1e5]);
  }

  return coordinates;
}

// Subcomponent: Map Viewport Controller to handle programmatically animating center/bounds
const MapController: React.FC<{
  activeStep: number | null;
  selectedRestaurant: any;
  allRestaurants: any[];
}> = ({ activeStep, selectedRestaurant, allRestaurants }) => {
  const map = useMap();

  useEffect(() => {
    // Re-render and resize map on mount to avoid glitched tiles
    const timer = setTimeout(() => {
      map.invalidateSize();
    }, 450);
    return () => clearTimeout(timer);
  }, [map]);

  useEffect(() => {
    if (selectedRestaurant) {
      // Focus on selected restaurant
      map.setView([selectedRestaurant.lat, selectedRestaurant.lng], 14, {
        animate: true,
        duration: 1.2
      });
      return;
    }

    if (activeStep === 0) {
      // Focus on Home base
      map.setView(HOME_COORDS, 13, { animate: true, duration: 1.2 });
    } else if (activeStep === 1 || activeStep === 2) {
      // Focus on all points bounds
      const points = [HOME_COORDS, ...allRestaurants.map(({ lat, lng }) => [lat, lng])];
      const bounds = L.latLngBounds(points as L.LatLngTuple[]);
      map.fitBounds(bounds.pad(0.12), { animate: true, duration: 1.2 });
    } else if (activeStep === 3) {
      // Focus on Madison isthmus overlap
      map.setView([43.085, -89.37], 12.5, { animate: true, duration: 1.2 });
    } else {
      // Default fitting containing all data points
      const points = [HOME_COORDS, ...allRestaurants.map(({ lat, lng }) => [lat, lng])];
      const bounds = L.latLngBounds(points as L.LatLngTuple[]);
      map.fitBounds(bounds.pad(0.15), { animate: true, duration: 1.2 });
    }
  }, [activeStep, selectedRestaurant, allRestaurants, map]);

  return null;
};

const TransitAware: React.FC = () => {
  // Navigation storytelling steps state
  const [activeStep, setActiveStep] = useState<number>(0);
  
  // Custom manual overlay triggers (which are controlled by step OR manually checked)
  const [showHOLC, setShowHOLC] = useState<boolean>(false);
  const [showOutbound, setShowOutbound] = useState<boolean>(false);
  const [showReturn, setShowReturn] = useState<boolean>(false);
  const [showFallback, setShowFallback] = useState<boolean>(true);
  const [basemap, setBasemap] = useState<'street' | 'muted'>('street');
  const [showHomeAndRestaurants, setShowHomeAndRestaurants] = useState<boolean>(false);

  // Interactive restaurant selection
  const [selectedRestaurant, setSelectedRestaurant] = useState<any>(null);
  
  // Python display folding state
  const [showCode, setShowCode] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  // Sync manual checkbox variables when step changes to create intuitive guided experience
  useEffect(() => {
    if (activeStep === 0) {
      setShowHOLC(false);
      setShowOutbound(false);
      setShowReturn(false);
      setBasemap('street');
      setShowHomeAndRestaurants(false);
      setSelectedRestaurant(null);
    } else if (activeStep === 1) {
      setShowHOLC(false);
      setShowOutbound(false);
      setShowReturn(false);
      setBasemap('street');
      setShowHomeAndRestaurants(true);
      setSelectedRestaurant(null);
    } else if (activeStep === 2) {
      setShowHOLC(false);
      setShowOutbound(true);
      setShowReturn(false);
      setBasemap('street');
      setShowHomeAndRestaurants(true);
      setSelectedRestaurant(null);
    } else if (activeStep === 3) {
      setShowHOLC(false);
      setShowOutbound(true);
      setShowReturn(true);
      setBasemap('street');
      setShowHomeAndRestaurants(true);
      setSelectedRestaurant(null);
    } else if (activeStep === 4) {
      setShowHOLC(true);
      setShowOutbound(true);
      setShowReturn(true);
      setBasemap('muted');
      setShowHomeAndRestaurants(true);
      setSelectedRestaurant(null);
    }
  }, [activeStep]);

  // Extract polyline geometries once for performance
  const decodedRestaurants = useMemo(() => {
    return restaurantsData.map((rest: any) => {
      const norm = rest.name.toLowerCase();
      let driveTimeMin = 0;
      let ratio = 0;
      let distanceStr = "";
      
      if (norm.includes("mint")) { driveTimeMin = 8; ratio = 4.85; distanceStr = "3.8 mi"; }
      else if (norm.includes("lola")) { driveTimeMin = 8; ratio = 3.15; distanceStr = "3.1 mi"; }
      else if (norm.includes("corallini")) { driveTimeMin = 11; ratio = 4.93; distanceStr = "4.0 mi"; }
      else if (norm.includes("beef") || norm.includes("bbq")) { driveTimeMin = 5; ratio = 3.86; distanceStr = "1.5 mi"; }
      else if (norm.includes("bierock")) { driveTimeMin = 5; ratio = 4.11; distanceStr = "1.5 mi"; }
      else if (norm.includes("alchemy")) { driveTimeMin = 11; ratio = 3.74; distanceStr = "3.9 mi"; }
      else if (norm.includes("tip top")) { driveTimeMin = 7; ratio = 5.42; distanceStr = "2.8 mi"; }
      else if (norm.includes("monsoon") || norm.includes("siam")) { driveTimeMin = 12; ratio = 6.23; distanceStr = "4.4 mi"; }
      else if (norm.includes("ogden")) { driveTimeMin = 7; ratio = 5.33; distanceStr = "2.8 mi"; }
      else if (norm.includes("kingdom")) { driveTimeMin = 5; ratio = 4.18; distanceStr = "1.6 mi"; }

      return {
        ...rest,
        decodedOutbound: decodePolyline(rest.outboundPolyline),
        decodedReturn: decodePolyline(rest.returnPolyline),
        driveTimeMin,
        ratio,
        distanceStr
      };
    });
  }, []);

  const totalMinOutbound = useMemo(() => {
    return restaurantsData.reduce((sum, r) => sum + (r.outboundMinutes || 0), 0);
  }, []);

  const totalMinReturn = useMemo(() => {
    return restaurantsData.reduce((sum, r) => sum + (r.returnMinutes || 0), 0);
  }, []);

  // HOLC polygon colors
  const getHolcStyle = (feature: any) => {
    const grade = feature.properties?.grade || '';
    let color = '#9ca3af'; // fallback gray
    if (grade === 'A') color = '#2e7d32'; // bold green
    if (grade === 'B') color = '#1565c0'; // bold blue
    if (grade === 'C') color = '#f57f17'; // warm yellow
    if (grade === 'D') color = '#c62828'; // danger red
    
    return {
      fillColor: color,
      fillOpacity: 0.22,
      color: color,
      weight: 1.5,
      opacity: 0.85
    };
  };

  const copyCodeToClipboard = () => {
    navigator.clipboard.writeText(pythonCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Google Maps Direction Step Metadata representing the Gestalt/LATCH/D&T storytelling flow
  const STEPS = [
    {
      title: "Start: Street basemap",
      subtitle: "The Baseline Canvas & Principles",
      desc: "I was given an assignment to find the top ten restaurants and use Gestalt, LATCH and D&T principles to “How many ways you can organize the top 10 list? Based on location? Type of food? Price range? Frequency of your visit? “ The assumptions baked in: access via transit, access via economics, access via ability, access via culture.",
      badge: "The Assignment"
    },
    {
      title: "Turn 1: Toggle on “Home + restaurant”",
      subtitle: "The Proximity Paradox",
      desc: "It all looks pretty close. And it is. Same zipcode (53704), within 5 miles.",
      badge: "Geography Scale"
    },
    {
      title: "Turn 2: Add “Outbound transit routes”",
      subtitle: "Outbound Transit Layer",
      desc: "The dark circle up top is where I live.",
      badge: "5:00 PM Outbound"
    },
    {
      title: "Turn 3: Add “Return transit routes”",
      subtitle: "Isthmus Obstacles",
      desc: "Transit in Madison is excused as being challenging because we are on an isthmus.",
      badge: "8:00 PM Return"
    },
    {
      title: "Turn 4: Add “Muted basemap” + “HOLC redlining”",
      subtitle: "Historical Legacies Intersecting",
      desc: "When you look at the HOLC map from 1940 and the Sanborn fire insurance map from this time they are nearly identical to now.",
      badge: "Redlining Legacy"
    }
  ];

  return (
    <div className="min-h-screen bg-stone-900 text-stone-100 font-sans">
      
      {/* Intro Header */}
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-stone-800">
          <div>
            <div className="inline-flex items-center gap-1 bg-stone-800 text-amber-500 text-[10px] uppercase tracking-[0.25em] font-bold px-2.5 py-1 mb-3 rounded border border-stone-700/50">
              <Compass size={12} /> Translational Research Portfolio
            </div>
            <h1 className="font-serif text-4xl sm:text-5xl text-stone-100 tracking-tight leading-tight mb-2">
              TransitAware
            </h1>
            <p className="text-stone-400 font-light max-w-2xl text-[14px] sm:text-md leading-relaxed">
              Madison transit access modeled in Python using the Google Routes and Distance Matrix APIs. 
              This interactive dashboard demonstrates that geographic proximity does not equal resource access, and details how historic municipal boundaries still dictate urban mobility.
            </p>
          </div>
          
          <div className="flex flex-col gap-2">
            <span className="text-[10px] font-mono text-stone-500 uppercase tracking-widest text-right">
              Project Code: MAD-TRANSIT-V1
            </span>
            <div className="flex gap-2">
              <a 
                href="https://github.com/phinnphace/transitaware" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-amber-500 border border-amber-500/30 hover:border-amber-500/80 bg-amber-500/5 hover:bg-amber-500/10 px-3.5 py-2 transition-all"
              >
                Go to GitHub Repo <ExternalLink size={12} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Split Interface */}
      <div className="max-w-7xl mx-auto px-6 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Google Maps Directions Sidebar (5 Columns) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Google Maps Directions Panel - Header */}
            <div className="bg-stone-950 border border-stone-800 rounded-xl overflow-hidden shadow-2xl">
              
              {/* Pseudo G-Maps Input Header */}
              <div className="bg-stone-900 border-b border-stone-800 p-5">
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-9 w-9 rounded-full bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-900/30">
                    <Navigation size={18} className="rotate-45" />
                  </div>
                  <div>
                    <h2 className="text-sm font-semibold tracking-wide text-stone-200">Directions Interface</h2>
                    <p className="text-[11px] font-mono text-stone-500 uppercase tracking-widest">Storytelling Layer Controller</p>
                  </div>
                </div>

                {/* Driving input simulators */}
                  <div className="relative flex flex-col gap-2 pl-6 border-l-2 border-stone-700/60 ml-4 py-1">
                  
                  {/* Origin pin */}
                  <div className="absolute -left-[5px] top-4 w-2 h-2 rounded-full border border-[#4f8fc6] bg-stone-950 flex items-center justify-center">
                    <div className="w-1 h-1 bg-[#4f8fc6] rounded-full"></div>
                  </div>
                  {/* Destination pin */}
                  <div className="absolute -left-[5px] bottom-4 w-2 h-2 rounded-full border border-rose-500 bg-stone-950 flex items-center justify-center">
                    <div className="w-1 h-1 bg-rose-500 rounded-full"></div>
                  </div>

                  <div className="flex items-center justify-between text-xs bg-stone-950/80 border border-stone-800 rounded px-3 py-2 text-stone-300 font-mono">
                    <span className="flex items-center gap-1">A: Home <span className="text-[9px] text-amber-500/70 border border-amber-500/20 bg-amber-500/5 px-1 py-0.2 rounded font-sans">Homeicordinates.py</span></span>
                    <span className="text-[9px] text-stone-500">43.1329, -89.3409</span>
                  </div>
                  
                  <div className="flex items-center justify-between text-xs bg-stone-950/80 border border-stone-800 rounded px-3 py-2 text-stone-300 font-mono">
                    <span className="text-amber-500 font-sans font-bold">
                      {selectedRestaurant ? `B: ${selectedRestaurant.name}` : "B: Custom Food Destinations (x10)"}
                    </span>
                    <span className="text-[9px] text-stone-500">Madison, WI</span>
                  </div>
                </div>

                {/* Ride Type Selectors (Mimics Transit, Walk, Bike, Drive tabs) */}
                <div className="grid grid-cols-4 gap-1 mt-4 pt-4 border-t border-stone-800/60">
                  <button className="flex flex-col items-center justify-center gap-1 p-2 rounded text-stone-600 cursor-not-allowed">
                    <Car size={16} />
                    <span className="text-[9px] font-mono">Drive</span>
                  </button>
                  <button className="flex flex-col items-center justify-center gap-1 p-2 rounded bg-stone-800 text-amber-500 border border-stone-700/50 shadow-sm">
                    <Bus size={16} className="animate-bounce" />
                    <span className="text-[9px] font-mono font-bold">Transit</span>
                  </button>
                  <button className="flex flex-col items-center justify-center gap-1 p-2 rounded text-stone-600 cursor-not-allowed">
                    <Bike size={16} />
                    <span className="text-[9px] font-mono">Bike</span>
                  </button>
                  <button className="flex flex-col items-center justify-center gap-1 p-2 rounded text-stone-600 cursor-not-allowed">
                    <Milestone size={16} />
                    <span className="text-[9px] font-mono">Walk</span>
                  </button>
                </div>
              </div>

              {/* Step By Step Storyline Walking Guide */}
              <div className="p-4 bg-stone-950/50 space-y-3 max-h-[380px] overflow-y-auto">
                <div className="px-1 pb-2 flex items-center justify-between border-b border-stone-900">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-stone-400 font-bold">Interactive Route Timeline</span>
                  <span className="text-[9px] bg-amber-500/10 text-amber-500 border border-amber-500/30 px-1.5 py-0.5 rounded font-mono font-bold">4 Steps</span>
                </div>

                {STEPS.map((step, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveStep(idx)}
                    className={`w-full text-left p-4.5 rounded-lg border transition-all duration-300 flex items-start gap-4 cursor-pointer ${
                      activeStep === idx 
                        ? 'bg-stone-900 border-amber-500/50 shadow-lg shadow-amber-500/5' 
                        : 'bg-stone-950 border-stone-900 hover:border-stone-800 hover:bg-stone-900/40'
                    }`}
                  >
                    {/* Circle counter */}
                    <div className={`flex-shrink-0 h-6 w-6 rounded-full flex items-center justify-center font-mono text-[11px] font-bold ${
                      activeStep === idx 
                        ? 'bg-amber-500 text-stone-950' 
                        : 'bg-stone-800 text-stone-400'
                    }`}>
                      {idx + 1}
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center justify-between gap-2">
                        <h4 className={`text-xs font-bold uppercase tracking-wider ${
                          activeStep === idx ? 'text-amber-500' : 'text-stone-300'
                        }`}>{step.title}</h4>
                        <span className="text-[9px] font-mono text-stone-500 whitespace-nowrap">{step.badge}</span>
                      </div>
                      
                      <p className="text-[10px] text-stone-400 font-medium tracking-wide">{step.subtitle}</p>
                      
                      {activeStep === idx && (
                        <p className="text-[11px] text-stone-400 font-light leading-relaxed pt-1.5 border-t border-stone-800/50 mt-1.5 animate-fadeIn">
                          {step.desc}
                        </p>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Layer Overrides Toolbar */}
            <div className="bg-stone-950 border border-stone-800 rounded-xl p-5 shadow-xl">
              <h3 className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-4 flex items-center gap-1.5 border-b border-stone-900 pb-2">
                <Layers size={14} className="text-amber-500" /> Map Toggles & Layers
              </h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="flex items-center gap-2.5 text-xs text-stone-300 cursor-pointer hover:text-white transition-colors">
                    <input 
                      type="checkbox" 
                      checked={showOutbound} 
                      onChange={(e) => {
                        setShowOutbound(e.target.checked);
                        setActiveStep(4); // shift to custom step
                      }}
                      className="rounded border-stone-800 bg-stone-900 text-amber-500 focus:ring-amber-500 focus:ring-offset-stone-900 h-4 w-4"
                    />
                    <span>Outbound Routes (5PM)</span>
                  </label>
                  
                  <label className="flex items-center gap-2.5 text-xs text-stone-300 cursor-pointer hover:text-white transition-colors">
                    <input 
                      type="checkbox" 
                      checked={showReturn} 
                      onChange={(e) => {
                        setShowReturn(e.target.checked);
                        setActiveStep(4);
                      }}
                      className="rounded border-stone-800 bg-stone-900 text-amber-500 focus:ring-amber-500 focus:ring-offset-stone-900 h-4 w-4"
                    />
                    <span>Return Routes (8PM)</span>
                  </label>
                </div>

                <div className="space-y-2">
                  <label className="flex items-center gap-2.5 text-xs text-stone-300 cursor-pointer hover:text-white transition-colors">
                    <input 
                      type="checkbox" 
                      checked={showHOLC} 
                      onChange={(e) => {
                        setShowHOLC(e.target.checked);
                        setActiveStep(4);
                      }}
                      className="rounded border-stone-800 bg-stone-900 text-amber-500 focus:ring-amber-500 focus:ring-offset-stone-900 h-4 w-4"
                    />
                    <span className="flex items-center gap-1">HOLC Redlining (1937)</span>
                  </label>
                  
                  <label className="flex items-center gap-2.5 text-xs text-stone-300 cursor-pointer hover:text-white transition-colors">
                    <input 
                      type="checkbox" 
                      checked={showFallback} 
                      onChange={(e) => setShowFallback(e.target.checked)}
                      className="rounded border-stone-800 bg-stone-900 text-amber-500 focus:ring-amber-500 focus:ring-offset-stone-900 h-4 w-4"
                    />
                    <span>Straight Vectors</span>
                  </label>
                </div>
              </div>

              {/* Map Layout Styled Control */}
              <div className="flex gap-4 border-t border-stone-900 mt-4 pt-4 text-xs">
                <span className="text-stone-500 font-mono text-[10px] uppercase font-bold self-center">Base:</span>
                <button 
                  onClick={() => setBasemap('street')}
                  className={`px-3 py-1 border rounded text-[10px] font-mono transition-all ${
                    basemap === 'street' 
                      ? 'bg-stone-800 border-amber-500/40 text-amber-500' 
                      : 'border-stone-800 text-stone-500 hover:text-stone-300'
                  }`}
                >
                  OSM STreet
                </button>
                <button 
                  onClick={() => setBasemap('muted')}
                  className={`px-3 py-1 border rounded text-[10px] font-mono transition-all ${
                    basemap === 'muted' 
                      ? 'bg-stone-800 border-amber-500/40 text-amber-500' 
                      : 'border-stone-800 text-stone-500 hover:text-stone-300'
                  }`}
                >
                  Carto Light
                </button>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Map Widget (7 Columns) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Map Frame Container */}
            <div className="bg-stone-950 border border-stone-800 rounded-xl overflow-hidden shadow-2xl relative">
              
              <div className="bg-stone-950 border-b border-stone-800 px-5 py-3.5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  <p className="font-mono text-xs text-stone-400 font-bold tracking-wider uppercase">Active Interactive Map Frame</p>
                </div>
                <span className="text-[10px] font-mono text-amber-500 font-semibold bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded">
                  {selectedRestaurant ? `Selected: ${selectedRestaurant.name}` : `Guided: Step ${activeStep + 1}`}
                </span>
              </div>

              <div className="h-[520px] relative z-10 bg-stone-900">
                <MapContainer 
                  center={HOME_COORDS} 
                  zoom={12} 
                  style={{ height: '100%', width: '100%', background: '#1c1917' }}
                  scrollWheelZoom={true}
                >
                  {/* Sync animations and center bounds programmatically */}
                  <MapController 
                    activeStep={activeStep < 4 ? activeStep : null} 
                    selectedRestaurant={selectedRestaurant} 
                    allRestaurants={decodedRestaurants} 
                  />

                  {/* Basemaps conditionally switched */}
                  {basemap === 'street' ? (
                    <TileLayer
                      attribution='&copy; OpenStreetMap contributors'
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      className="map-tiles-grayscale"
                    />
                  ) : (
                    <TileLayer
                      attribution='&copy; CARTO'
                      url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                    />
                  )}

                  {/* 1. HOLC Redlining Polygons Layer */}
                  {showHOLC && mappingInequality && (
                    <GeoJSON 
                      key="holc-geojson"
                      data={mappingInequality as any} 
                      style={getHolcStyle}
                      onEachFeature={(feature, layer) => {
                        const props = feature.properties || {};
                        layer.bindPopup(`
                          <div class="p-1 font-sans text-stone-900">
                            <h4 class="font-bold text-xs">HOLC Layer Grade: <span class="px-1.5 py-0.5 rounded bg-stone-100 text-stone-900">${props.grade || '?'}</span></h4>
                            <p class="text-[11px] mt-2"><strong>Category:</strong> ${props.category || 'Unknown'}</p>
                            <p class="text-[11px]"><strong>Area ID:</strong> ${props.area_id || 'N/A'}</p>
                            <p class="text-[10px] text-stone-500 mt-1 italic">Madison Redlining Survey (1937)</p>
                          </div>
                        `);
                      }}
                    />
                  )}

                  {/* 2. Outbound Transit Routes Polylines (Solid Paths) */}
                  {showOutbound && decodedRestaurants.map((restaurant) => {
                    const isFocus = selectedRestaurant === null || selectedRestaurant.name === restaurant.name;
                    return (
                      <Polyline 
                        key={`outbound-${restaurant.name}`}
                        positions={restaurant.decodedOutbound}
                        pathOptions={{
                          color: restaurant.color || '#f4a261',
                          weight: isFocus ? 4 : 1.5,
                          opacity: isFocus ? 0.85 : 0.2
                        }}
                      />
                    );
                  })}

                  {/* 3. Return Transit Routes Polylines (Dashed Paths) */}
                  {showReturn && decodedRestaurants.map((restaurant) => {
                    const isFocus = selectedRestaurant === null || selectedRestaurant.name === restaurant.name;
                    return (
                      <Polyline 
                        key={`return-${restaurant.name}`}
                        positions={restaurant.decodedReturn}
                        pathOptions={{
                          color: '#264653',
                          weight: isFocus ? 3 : 1,
                          opacity: isFocus ? 0.7 : 0.15,
                          dashArray: '8, 8'
                        }}
                      />
                    );
                  })}

                  {/* 4. Fallback Straight Line Vectors */}
                  {showFallback && decodedRestaurants.map((restaurant) => {
                    if (restaurant.decodedOutbound.length > 0) return null;
                    const isFocus = selectedRestaurant === null || selectedRestaurant.name === restaurant.name;
                    return (
                      <Polyline 
                        key={`fallback-${restaurant.name}`}
                        positions={[HOME_COORDS, [restaurant.lat, restaurant.lng]]}
                        pathOptions={{
                          color: restaurant.color || '#6c757d',
                          weight: isFocus ? 1.8 : 0.5,
                          opacity: isFocus ? 0.6 : 0.15,
                          dashArray: '3, 6'
                        }}
                      />
                    );
                  })}

                  {/* 5. Origin home marker */}
                  {showHomeAndRestaurants && (
                    <Marker 
                      position={HOME_COORDS}
                      icon={L.divIcon({
                        html: `<div class="w-5 h-5 bg-stone-900 border-4 border-white rounded-full shadow-lg flex items-center justify-center animate-pulse"><div class="w-1.5 h-1.5 bg-blue-500 rounded-full"></div></div>`,
                        className: 'custom-home-node',
                        iconSize: [20, 20],
                        iconAnchor: [10, 10]
                      })}
                    >
                      <Popup>
                        <div className="p-1 text-stone-900">
                          <strong className="text-xs">Origin Node (Home)</strong>
                          <p className="text-[10px] text-stone-500 mt-1">Madison, WI (ZIP 53704)</p>
                        </div>
                      </Popup>
                    </Marker>
                  )}

                  {/* 6. Restaurants destinations markers */}
                  {showHomeAndRestaurants && decodedRestaurants.map((restaurant) => {
                    const isFocus = selectedRestaurant === null || selectedRestaurant.name === restaurant.name;
                    return (
                      <Marker 
                        key={`restaurant-node-${restaurant.name}`}
                        position={[restaurant.lat, restaurant.lng]}
                        icon={L.divIcon({
                          html: `<div class="w-4.5 h-4.5 border-1.5 border-stone-950 rounded-full shadow-md flex items-center justify-center transition-transform hover:scale-125" style="background-color: ${restaurant.color}; opacity: ${isFocus ? 1 : 0.45}"></div>`,
                          className: 'custom-restaurant-node',
                          iconSize: [18, 18],
                          iconAnchor: [9, 9]
                        })}
                      >
                        <Popup>
                          <div className="p-1 font-sans text-stone-900 leading-normal max-w-[210px]">
                            <h4 className="font-bold text-[13px] text-stone-900 mb-0.5">{restaurant.name}</h4>
                            <p className="text-[10px] text-stone-500 mb-2">{restaurant.address}</p>
                            
                            <hr className="border-stone-100 my-1.5" />
                            
                            <div className="grid grid-cols-2 gap-2 text-[10px]">
                              <div>
                                <span className="text-stone-400 block uppercase tracking-wider text-[8px] font-bold">Outbound (5PM)</span>
                                <strong className="text-amber-700">{restaurant.outboundMinutes ? `${restaurant.outboundMinutes} min` : 'No route'}</strong>
                                <span className="text-stone-500 block text-[9px]">{restaurant.outboundMiles || '?'} mi</span>
                              </div>
                              <div>
                                <span className="text-stone-400 block uppercase tracking-wider text-[8px] font-bold">Return (8PM)</span>
                                <strong className="text-teal-700">{restaurant.returnMinutes ? `${restaurant.returnMinutes} min` : 'No route'}</strong>
                                <span className="text-stone-500 block text-[9px]">{restaurant.returnMiles || '?'} mi</span>
                              </div>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-2 text-[10px] mt-1.5 border-t border-dashed border-stone-200 pt-1.5">
                              <div>
                                <span className="text-stone-400 block uppercase tracking-wider text-[8px] font-bold">Drive Time (CSV)</span>
                                <strong className="text-blue-700">{restaurant.driveTimeMin ? `${restaurant.driveTimeMin} min` : 'N/A'}</strong>
                              </div>
                              <div>
                                <span className="text-stone-400 block uppercase tracking-wider text-[8px] font-bold">Ratio Delta</span>
                                <strong className="text-teal-700">{restaurant.ratio ? `${restaurant.ratio.toFixed(2)}x` : 'N/A'}</strong>
                              </div>
                            </div>

                            <div className="bg-stone-50 p-1.5 rounded text-[10px] mt-2 flex justify-between border border-stone-100">
                              <span className="text-stone-500">Transit Commute Sum:</span>
                              <strong className="text-stone-900">{restaurant.roundTripMinutes ? `${restaurant.roundTripMinutes} min` : 'N/A'}</strong>
                            </div>
                          </div>
                        </Popup>
                      </Marker>
                    );
                  })}
                </MapContainer>

                {/* Map Floating HUD Info */}
                <div className="absolute top-4 right-4 z-[400] bg-stone-950/90 border border-stone-800 p-3 ml-2 max-w-[220px] rounded shadow-2xl pointer-events-none font-mono text-[9px] text-stone-400">
                  <div className="flex items-center gap-1.5 border-b border-stone-800 pb-1.5 mb-1.5 text-stone-200 uppercase tracking-widest font-bold">
                    <Clock size={12} className="text-amber-500" /> Madison Metrics
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <span>Total Outbound:</span>
                      <strong className="text-stone-100">{totalMinOutbound.toFixed(1)}m</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>Total Return:</span>
                      <strong className="text-stone-100">{totalMinReturn.toFixed(1)}m</strong>
                    </div>
                    <div className="flex justify-between border-t border-stone-900 pt-1 mt-1 font-bold text-amber-500">
                      <span>Asymmetry Delta:</span>
                      <span>+{(((totalMinReturn - totalMinOutbound) / totalMinOutbound) * 100).toFixed(0)}%</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map Footer warnings */}
              <div className="bg-stone-950 px-5 py-3 border-t border-stone-800 flex items-start gap-2 text-[11px] text-stone-400 leading-relaxed font-light">
                <Info size={14} className="text-amber-500 mt-0.5 flex-shrink-0" />
                <p>
                  <strong>Note:</strong> Solid lines represent outbound routes (5:00 PM). Dashed lines represent evening return routes (8:00 PM). Historical zones graded A (Green) to D (Red). Notice the extreme return penalty.
                </p>
              </div>

            </div>

            {/* Lived Reality Contrast Block */}
            <div className="bg-stone-950 border border-stone-800 rounded-xl p-6 shadow-2xl relative overflow-hidden">
              <div className="flex items-center gap-2 mb-4">
                <div className="h-5 w-5 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-500">
                  <Compass size={14} />
                </div>
                <h3 className="text-sm font-serif font-bold tracking-wide text-stone-200">
                  "Lived Reality is Different" — Auto vs. Transit Commute Matrix
                </h3>
              </div>

              {selectedRestaurant ? (
                <div className="space-y-4 animate-[fadeIn_0.5s_ease-out]">
                  <p className="text-xs text-stone-400 leading-relaxed font-light">
                    Standard navigation maps paint a picture of uniform geo-proximity. Since <strong className="text-stone-200">{selectedRestaurant.name}</strong> is only <strong className="text-stone-200">{selectedRestaurant.distanceStr || "a few miles"}</strong> away in Madison's ZIP 53704, it seems easily accessible. But when we compare actual transportation modes side-by-side:
                  </p>

                  <div className="bg-stone-900/60 rounded-lg p-4 border border-stone-805 space-y-3 font-mono text-xs">
                    <div className="flex justify-between items-center text-stone-400 border-b border-stone-800 pb-2">
                      <span>Destination</span>
                      <strong className="text-stone-100 font-sans">{selectedRestaurant.name}</strong>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-[11px]">
                        <span className="flex items-center gap-1 text-stone-300"><Car size={12} className="text-blue-400" /> Auto Duration (CSV Total R.T.)</span>
                        <span className="text-blue-400 font-bold">{selectedRestaurant.driveTimeMin * 2} min R.T.</span>
                      </div>
                      <div className="w-full bg-stone-950 rounded-full h-1.5 overflow-hidden">
                        <div className="bg-blue-500 h-full rounded-full transition-all duration-500" style={{ width: `${Math.min(100, (((selectedRestaurant.driveTimeMin * 2) || 12) / 150) * 100)}%` }} />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-[11px]">
                        <span className="flex items-center gap-1 text-stone-300"><Bus size={12} className="text-amber-500" /> Transit Duration (API Total R.T.)</span>
                        <span className="text-amber-500 font-bold">{selectedRestaurant.roundTripMinutes} min R.T.</span>
                      </div>
                      <div className="w-full bg-stone-950 rounded-full h-1.5 overflow-hidden">
                        <div className="bg-amber-500 h-full rounded-full transition-all duration-500" style={{ width: `${Math.min(100, (selectedRestaurant.roundTripMinutes / 150) * 100)}%` }} />
                      </div>
                    </div>

                    <div className="pt-2 border-t border-stone-800 mt-2 flex justify-between items-center">
                      <span className="text-stone-400 text-[11px]">Slower by Transit</span>
                      <span className="bg-amber-500/15 border border-amber-500/30 text-amber-400 px-2.5 py-0.5 rounded font-bold font-sans text-xs">
                        {selectedRestaurant.ratio ? `${selectedRestaurant.ratio.toFixed(2)}x slower` : `${(selectedRestaurant.roundTripMinutes / ((selectedRestaurant.driveTimeMin * 2) || 10)).toFixed(2)}x slower`}
                      </span>
                    </div>
                  </div>

                  <p className="text-[11px] text-stone-400 leading-relaxed font-light italic">
                    * While a private driver completes a quick round-trip of <span className="text-stone-200 font-semibold">{selectedRestaurant.driveTimeMin * 2} minutes</span>, a bus rider must allocate <span className="text-stone-200 font-semibold">{selectedRestaurant.roundTripMinutes} minutes</span> over the exact same physical space. This represents an astronomical multiplier penalty of <span className="text-amber-400 font-bold">{selectedRestaurant.ratio ? `${selectedRestaurant.ratio.toFixed(2)}x` : "?"}</span> for relying on collective public infrastructure.
                  </p>
                </div>
              ) : (
                <div className="space-y-4 animate-[fadeIn_0.5s_ease-out]">
                  <p className="text-xs text-stone-400 leading-relaxed font-light">
                    Our empirical matrices show that geographic proximity is an illusion. Across all ten selected dining destinations—all located within the exact same ZIP code (53704) and within a 5-mile boundary:
                  </p>

                  <div className="grid grid-cols-3 gap-3">
                    <div className="bg-stone-900 border border-stone-800 rounded p-3 text-center">
                      <span className="text-stone-500 text-[8px] uppercase tracking-wider block font-mono">Avg Driving R.T.</span>
                      <strong className="text-blue-400 text-md sm:text-lg font-mono">14.8m</strong>
                    </div>
                    <div className="bg-stone-900 border border-stone-800 rounded p-3 text-center">
                      <span className="text-stone-500 text-[8px] uppercase tracking-wider block font-mono">Avg Transit R.T.</span>
                      <strong className="text-amber-500 text-md sm:text-lg font-mono">74.1m</strong>
                    </div>
                    <div className="bg-stone-900 border border-stone-800 rounded p-3 text-center">
                      <span className="text-stone-500 text-[8px] uppercase tracking-wider block font-mono">Avg Ratio Penalty</span>
                      <strong className="text-teal-400 text-md sm:text-lg font-mono">5.0x slower</strong>
                    </div>
                  </div>

                  <div className="space-y-2 border-t border-stone-900 pt-3">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-stone-400 font-bold block">
                      Comparative Transit-to-Drive Ratio Audit:
                    </span>
                    <div className="max-h-[160px] overflow-y-auto pr-1 space-y-1 bg-stone-900/20 rounded border border-stone-800 p-2">
                      {decodedRestaurants.map((r) => (
                        <button
                          key={r.name}
                          onClick={() => setSelectedRestaurant(r)}
                          className="w-full flex items-center justify-between text-[11px] font-mono hover:bg-stone-900 px-2 py-1 rounded transition-colors text-stone-300 hover:text-white text-left cursor-pointer"
                        >
                          <span className="truncate max-w-[150px] sm:max-w-[200px]">{r.name}</span>
                          <div className="flex items-center gap-3">
                            <span className="text-stone-500 text-[10px]">{r.roundTripMinutes}m vs {r.driveTimeMin * 2}m auto</span>
                            <span className="text-teal-400 font-bold w-12 text-right">+{r.ratio?.toFixed(2)}x</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

          </div>

        </div>
      </div>

      {/* Directory Section resembling Recommended Routes (10 dining locations) */}
      <div className="max-w-7xl mx-auto px-6 mb-16">
        <div className="bg-stone-950 border border-stone-800 rounded-xl p-6 shadow-2xl">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6 pb-4 border-b border-stone-900">
            <div>
              <h3 className="text-md uppercase tracking-wider font-bold text-stone-200">
                Madison Experimental Transit Grid: Destination Registry
              </h3>
              <p className="text-xs text-stone-500 tracking-wide font-light">
                Alphabetical indices of Dining destinations with corresponding Google transit timing matrices.
              </p>
            </div>
            {selectedRestaurant && (
              <button 
                onClick={() => setSelectedRestaurant(null)}
                className="text-[10px] font-mono text-stone-400 hover:text-white bg-stone-900 hover:bg-stone-850 px-3 py-1.5 rounded transition-all border border-stone-850"
              >
                Reset Focus To Grid
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {decodedRestaurants.map((item) => {
              const isSelected = selectedRestaurant?.name === item.name;
              return (
                <button
                  key={item.name}
                  onClick={() => {
                    setSelectedRestaurant(item);
                    setActiveStep(4); // custom
                  }}
                  className={`text-left p-4 rounded-lg border transition-all flex flex-col justify-between duration-300 gap-3 cursor-pointer ${
                    isSelected 
                      ? 'border-amber-500 bg-amber-500/5 shadow-md shadow-amber-500/5' 
                      : 'border-stone-900 bg-stone-950 hover:border-stone-850 hover:bg-stone-900/10'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-xs font-bold text-stone-200 tracking-wide line-clamp-1">{item.name}</span>
                      <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }} />
                    </div>
                    <span className="text-[10px] text-stone-500 line-clamp-1">{item.address}</span>
                  </div>

                  <div className="border-t border-stone-900/60 pt-2.5 space-y-2 text-[10px] font-mono">
                    <div className="flex justify-between items-center">
                      <div className="flex flex-col">
                        <span className="text-stone-500 text-[8px] uppercase tracking-wider">Transit R.T.</span>
                        <strong className="text-amber-500">{item.roundTripMinutes ? `${item.roundTripMinutes} min` : 'N/A'}</strong>
                      </div>
                      <div className="flex flex-col text-right">
                        <span className="text-stone-500 text-[8px] uppercase tracking-wider">Out / Back</span>
                        <span className="text-stone-400">{item.outboundMinutes || '?'}/{item.returnMinutes || '?'}</span>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center border-t border-stone-900/30 pt-1.5 text-stone-400">
                      <div className="flex flex-col">
                        <span className="text-stone-500 text-[8px] uppercase tracking-wider">Drive (CSV)</span>
                        <strong className="text-blue-400 font-bold">{item.driveTimeMin ? `${item.driveTimeMin} min` : 'N/A'}</strong>
                      </div>
                      <div className="flex flex-col text-right">
                        <span className="text-stone-500 text-[8px] uppercase tracking-wider font-semibold">Ratio Penalty</span>
                        <strong className="text-teal-400 font-bold">{item.ratio ? `${item.ratio.toFixed(2)}x` : 'N/A'}</strong>
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Code pipeline display Section */}
      <div className="max-w-7xl mx-auto px-6 mb-24">
        <div className="bg-stone-950 border border-stone-800 rounded-xl overflow-hidden shadow-2xl">
          <button
            onClick={() => setShowCode(!showCode)}
            className="w-full px-6 py-4 flex items-center justify-between hover:bg-stone-900/30 transition-all text-left cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <Code size={20} className="text-amber-500" />
              <div>
                <h3 className="text-xs uppercase tracking-wider font-bold text-stone-200">
                  Developer Code Pipeline: ComputeRouteMatrix.py
                </h3>
                <p className="text-[11px] text-stone-500 select-none">
                  Click to inspect the Python pipeline used to query Google's Distance Matrix and Route APIs.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-[9px] font-mono bg-stone-900 text-stone-400 border border-stone-800 px-2 py-0.5 rounded">
                284 Lines
              </span>
              <ChevronDown 
                size={18} 
                className={`text-stone-500 transition-transform duration-300 ${showCode ? 'rotate-180' : ''}`} 
              />
            </div>
          </button>

          {showCode && (
            <div className="border-t border-stone-900">
              <div className="bg-stone-900 border-b border-stone-800 px-6 py-3 flex items-center justify-between text-xs text-stone-400">
                <span className="font-mono flex items-center gap-1.5">
                  <FileCode size={14} className="text-amber-500/70" /> ComputeRouteMatrix.py  &middot; Python 3
                </span>
                
                <button
                  onClick={copyCodeToClipboard}
                  className="inline-flex items-center gap-1 hover:text-white font-mono bg-stone-950 hover:bg-stone-800 border border-stone-800 shadow px-3 py-1 rounded transition-all text-[11px] cursor-pointer"
                >
                  <Copy size={12} /> {copied ? 'Copied!' : 'Copy Code'}
                </button>
              </div>

              <div className="bg-stone-950 p-6 overflow-x-auto select-text font-mono text-xs leading-relaxed text-stone-300 max-h-[500px]">
                <pre>{pythonCode}</pre>
              </div>
            </div>
          )}
        </div>
      </div>

    </div>
  );
};

export default TransitAware;
