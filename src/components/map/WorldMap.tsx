import React, { useState, useRef, useEffect } from 'react';
import { 
  ZoomIn, ZoomOut, RotateCcw, Layers, Search, 
  MapPin, Eye, Compass, TrendingUp, CloudSun, Mountain, Users
} from 'lucide-react';
import { Country, MapMode, Continent } from '../../types/geo';
import { COUNTRIES_DATA } from '../../data/countries';
import { CITIES_DATA } from '../../data/cities';
import { 
  WORLD_COUNTRY_PATHS, 
  MAP_CONNECTIONS, 
  latLngToSvg, 
  MapRegion 
} from '../../data/worldMapPaths';
import { useLanguage } from '../../context/LanguageContext';

interface WorldMapProps {
  onSelectCountry: (countryId: string) => void;
  onSelectCity?: (cityId: string) => void;
}

export const WorldMap: React.FC<WorldMapProps> = ({ onSelectCountry, onSelectCity }) => {
  const { t } = useLanguage();
  const [mode, setMode] = useState<MapMode>('countries');
  const [selectedContinent, setSelectedContinent] = useState<Continent | 'All'>('All');
  const [mapSearch, setMapSearch] = useState('');
  
  // Transform & Pan / Zoom states
  const [scale, setScale] = useState(1);
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  // Hover state
  const [hoveredCountry, setHoveredCountry] = useState<Country | null>(null);
  const [hoverPos, setHoverPos] = useState({ x: 0, y: 0 });
  const [hoveredCity, setHoveredCity] = useState<typeof CITIES_DATA[0] | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);

  // Zoom controls
  const handleZoomIn = () => setScale((prev) => Math.min(prev * 1.35, 5));
  const handleZoomOut = () => setScale((prev) => Math.max(prev / 1.35, 0.8));
  const handleResetZoom = () => {
    setScale(1);
    setTranslate({ x: 0, y: 0 });
  };

  // Pan handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - translate.x, y: e.clientY - translate.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setTranslate({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }

    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setHoverPos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    }
  };

  const handleMouseUp = () => setIsDragging(false);

  // Touch handlers for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      setIsDragging(true);
      setDragStart({
        x: e.touches[0].clientX - translate.x,
        y: e.touches[0].clientY - translate.y
      });
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isDragging && e.touches.length === 1) {
      setTranslate({
        x: e.touches[0].clientX - dragStart.x,
        y: e.touches[0].clientY - dragStart.y
      });
    }
  };

  const handleTouchEnd = () => setIsDragging(false);

  // Wheel zoom
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const factor = e.deltaY < 0 ? 1.15 : 0.85;
    setScale((prev) => Math.min(Math.max(prev * factor, 0.8), 5));
  };

  // Filter countries by continent & search
  const filteredCountries = COUNTRIES_DATA.filter((country) => {
    const matchesContinent = selectedContinent === 'All' || country.continent === selectedContinent;
    const matchesSearch = !mapSearch || 
      country.name.toLowerCase().includes(mapSearch.toLowerCase()) ||
      country.capital.toLowerCase().includes(mapSearch.toLowerCase());
    return matchesContinent && matchesSearch;
  });

  // Color generator based on current MapMode
  const getCountryStyle = (region: MapRegion) => {
    const country = COUNTRIES_DATA.find((c) => c.id === region.id);
    const isHovered = hoveredCountry?.id === region.id;
    const isFilteredOut = selectedContinent !== 'All' && region.continent !== selectedContinent;

    if (isFilteredOut) {
      return {
        fill: '#0d1b2e',
        stroke: '#1e293b',
        opacity: 0.35
      };
    }

    // Dynamic coloring based on layer mode
    switch (mode) {
      case 'population': {
        if (!country) return { fill: '#142236', stroke: '#1e3a5f' };
        // Scale population: > 1B (gold), > 200M (bright cyan), > 50M (blue), else deep slate
        if (country.population > 1_000_000_000) {
          return {
            fill: isHovered ? '#F59E0B' : 'rgba(245, 158, 11, 0.75)',
            stroke: '#FBBF24',
            opacity: 1
          };
        } else if (country.population > 100_000_000) {
          return {
            fill: isHovered ? '#35C7FF' : 'rgba(53, 199, 255, 0.65)',
            stroke: '#7DD3FC',
            opacity: 1
          };
        } else if (country.population > 30_000_000) {
          return {
            fill: isHovered ? '#1683FF' : 'rgba(22, 131, 255, 0.55)',
            stroke: '#38BDF8',
            opacity: 0.95
          };
        }
        return {
          fill: isHovered ? '#0284C7' : 'rgba(14, 116, 144, 0.45)',
          stroke: '#0891B2',
          opacity: 0.9
        };
      }
      case 'economy': {
        if (!country) return { fill: '#142236', stroke: '#1e3a5f' };
        if (country.gdp > 10_000) {
          return { fill: isHovered ? '#32D583' : 'rgba(50, 213, 131, 0.75)', stroke: '#6EE7B7' };
        } else if (country.gdp > 2000) {
          return { fill: isHovered ? '#10B981' : 'rgba(16, 185, 129, 0.55)', stroke: '#34D399' };
        } else if (country.gdp > 500) {
          return { fill: isHovered ? '#059669' : 'rgba(5, 150, 105, 0.45)', stroke: '#10B981' };
        }
        return { fill: isHovered ? '#047857' : 'rgba(4, 120, 87, 0.35)', stroke: '#059669' };
      }
      case 'climate': {
        if (!country) return { fill: '#142236', stroke: '#1e3a5f' };
        const zoneColors: Record<string, { fill: string; stroke: string }> = {
          Tropical: { fill: 'rgba(50, 213, 131, 0.6)', stroke: '#32D583' },
          Arid: { fill: 'rgba(245, 158, 11, 0.6)', stroke: '#FBBF24' },
          Temperate: { fill: 'rgba(53, 199, 255, 0.6)', stroke: '#35C7FF' },
          Continental: { fill: 'rgba(99, 102, 241, 0.6)', stroke: '#818CF8' },
          Polar: { fill: 'rgba(226, 232, 240, 0.6)', stroke: '#F8FAFC' }
        };
        const z = zoneColors[country.climateZone] || { fill: '#1e3a5f', stroke: '#38bdf8' };
        return {
          fill: isHovered ? z.stroke : z.fill,
          stroke: z.stroke
        };
      }
      case 'geography': {
        return {
          fill: isHovered ? '#0284C7' : '#0B2545',
          stroke: isHovered ? '#38BDF8' : '#134E5E'
        };
      }
      default: {
        // Standard countries view
        if (isHovered) {
          return {
            fill: '#1683FF',
            stroke: '#35C7FF',
            opacity: 1
          };
        }
        return {
          fill: '#0F2744',
          stroke: '#1E4976',
          opacity: 0.95
        };
      }
    }
  };

  const continentsList: (Continent | 'All')[] = [
    'All',
    'Africa',
    'Asia',
    'Europe',
    'North America',
    'South America',
    'Oceania',
    'Antarctica'
  ];

  const modesList: { id: MapMode; labelKey: string; icon: React.ReactNode }[] = [
    { id: 'countries', labelKey: 'modeCountries', icon: <Compass className="w-3.5 h-3.5" /> },
    { id: 'cities', labelKey: 'modeCities', icon: <MapPin className="w-3.5 h-3.5" /> },
    { id: 'population', labelKey: 'modePopulation', icon: <Users className="w-3.5 h-3.5" /> },
    { id: 'economy', labelKey: 'modeEconomy', icon: <TrendingUp className="w-3.5 h-3.5" /> },
    { id: 'geography', labelKey: 'modeGeography', icon: <Mountain className="w-3.5 h-3.5" /> },
    { id: 'climate', labelKey: 'modeClimate', icon: <CloudSun className="w-3.5 h-3.5" /> },
  ];

  return (
    <div className="relative w-full bg-[#050C17] border border-slate-800/90 rounded-2xl overflow-hidden shadow-2xl">
      
      {/* Top Map Control Bar */}
      <div className="p-3 sm:p-4 bg-[#07111F]/90 backdrop-blur-md border-b border-slate-800/80 flex flex-wrap items-center justify-between gap-3 z-20 relative">
        
        {/* Thematic Layer Switchers */}
        <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          {modesList.map((m) => {
            const isActive = mode === m.id;
            return (
              <button
                key={m.id}
                onClick={() => setMode(m.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-[#1683FF] text-white shadow-md shadow-blue-500/30'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                {m.icon}
                <span>{t(m.labelKey)}</span>
              </button>
            );
          })}
        </div>

        {/* Quick Search on Map */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-48">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={mapSearch}
              onChange={(e) => setMapSearch(e.target.value)}
              placeholder="Find on map..."
              className="w-full pl-8 pr-3 py-1.5 bg-slate-900/90 border border-slate-700/70 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#1683FF]"
            />
          </div>
        </div>
      </div>

      {/* Continent Filter Bar */}
      <div className="px-4 py-2 bg-[#06101E] border-b border-slate-800/60 flex items-center gap-1.5 overflow-x-auto text-xs scrollbar-none">
        <span className="text-[11px] uppercase tracking-wider text-slate-500 mr-2 shrink-0">Region:</span>
        {continentsList.map((cont) => (
          <button
            key={cont}
            onClick={() => setSelectedContinent(cont)}
            className={`px-2.5 py-1 rounded-md transition-all whitespace-nowrap ${
              selectedContinent === cont
                ? 'bg-slate-800 text-[#35C7FF] border border-blue-500/40 font-medium'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {cont}
          </button>
        ))}
      </div>

      {/* Map Interactive Canvas */}
      <div
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onWheel={handleWheel}
        className="relative w-full h-[460px] sm:h-[580px] lg:h-[650px] cursor-grab active:cursor-grabbing select-none overflow-hidden bg-[#050C17]"
      >
        {/* Subtle holographic grid lines background */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, rgba(22, 131, 255, 0.15) 0%, transparent 70%),
              linear-gradient(to right, rgba(53, 199, 255, 0.05) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(53, 199, 255, 0.05) 1px, transparent 1px)`,
            backgroundSize: '100% 100%, 40px 40px, 40px 40px'
          }}
        />

        {/* SVG World Map */}
        <svg
          viewBox="0 0 1000 500"
          className="w-full h-full transition-transform duration-75"
          style={{
            transform: `translate(${translate.x}px, ${translate.y}px) scale(${scale})`,
            transformOrigin: 'center center'
          }}
        >
          <defs>
            {/* Pulsing glow filter for tech atlas */}
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            <linearGradient id="flightGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1683FF" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#35C7FF" stopOpacity="1" />
              <stop offset="100%" stopColor="#32D583" stopOpacity="0.8" />
            </linearGradient>
          </defs>

          {/* Graticule Latitude & Longitude grid lines */}
          <g className="opacity-25" stroke="#1E3A5F" strokeWidth="0.5" strokeDasharray="3 3">
            {/* Equator */}
            <line x1="0" y1="250" x2="1000" y2="250" stroke="#35C7FF" strokeWidth="0.8" />
            {/* Tropic of Cancer (approx 23.5° N -> y ≈ 184) */}
            <line x1="0" y1="184" x2="1000" y2="184" />
            {/* Tropic of Capricorn (approx 23.5° S -> y ≈ 315) */}
            <line x1="0" y1="315" x2="1000" y2="315" />
            {/* Prime Meridian (Greenwich 0° -> x = 500) */}
            <line x1="500" y1="0" x2="500" y2="500" stroke="#35C7FF" strokeWidth="0.8" />
            {/* Additional longitudes */}
            <line x1="250" y1="0" x2="250" y2="500" />
            <line x1="750" y1="0" x2="750" y2="500" />
          </g>

          {/* Country Landmasses */}
          <g className="cursor-pointer">
            {WORLD_COUNTRY_PATHS.map((region) => {
              const style = getCountryStyle(region);
              const matchedCountry = COUNTRIES_DATA.find((c) => c.id === region.id);

              return (
                <path
                  key={region.id}
                  d={region.d}
                  fill={style.fill}
                  stroke={style.stroke}
                  strokeWidth="1"
                  strokeLinejoin="round"
                  className="transition-all duration-200 hover:filter hover:drop-shadow-[0_0_8px_rgba(53,199,255,0.7)]"
                  onMouseEnter={() => {
                    if (matchedCountry) setHoveredCountry(matchedCountry);
                  }}
                  onMouseLeave={() => setHoveredCountry(null)}
                  onClick={() => {
                    if (matchedCountry) onSelectCountry(matchedCountry.id);
                  }}
                />
              );
            })}
          </g>

          {/* Inter-continental flight/network lines (Active in 'cities' or default mode) */}
          {(mode === 'cities' || mode === 'countries') && (
            <g className="pointer-events-none">
              {MAP_CONNECTIONS.map((conn, idx) => {
                const start = latLngToSvg(conn.fromCoords[0], conn.fromCoords[1]);
                const end = latLngToSvg(conn.toCoords[0], conn.toCoords[1]);
                
                // Calculate curved arc mid point
                const midX = (start.x + end.x) / 2;
                const midY = Math.min(start.y, end.y) - 30;

                return (
                  <g key={`conn-${idx}`}>
                    <path
                      d={`M ${start.x},${start.y} Q ${midX},${midY} ${end.x},${end.y}`}
                      fill="none"
                      stroke="url(#flightGrad)"
                      strokeWidth="1.2"
                      strokeDasharray="4 4"
                      className="animate-[pulse_3s_ease-in-out_infinite] opacity-60"
                    />
                  </g>
                );
              })}
            </g>
          )}

          {/* World City Points & Radar Beacons */}
          {CITIES_DATA.map((city) => {
            const svgPos = latLngToSvg(city.coordinates.lat, city.coordinates.lng);
            const isHovered = hoveredCity?.id === city.id;
            const isVisible = mode === 'cities' || scale > 1.2 || isHovered;

            if (!isVisible) return null;

            return (
              <g
                key={city.id}
                className="cursor-pointer group"
                transform={`translate(${svgPos.x}, ${svgPos.y})`}
                onMouseEnter={() => setHoveredCity(city)}
                onMouseLeave={() => setHoveredCity(null)}
                onClick={(e) => {
                  e.stopPropagation();
                  if (onSelectCity) onSelectCity(city.id);
                  else onSelectCountry(city.countryId);
                }}
              >
                {/* Radar beacon pulsing circle */}
                <circle
                  r="6"
                  fill="none"
                  stroke="#35C7FF"
                  strokeWidth="1"
                  className="animate-ping opacity-75 origin-center"
                />
                {/* Outer halo */}
                <circle
                  r="4"
                  fill="#1683FF"
                  opacity="0.8"
                />
                {/* Core dot */}
                <circle
                  r="2"
                  fill="#32D583"
                  className="group-hover:scale-150 transition-transform origin-center"
                />
                {/* City name text tag on hover or zoom */}
                {(isHovered || scale > 1.8) && (
                  <text
                    x="6"
                    y="3"
                    fill="#FFFFFF"
                    fontSize="7"
                    fontFamily="Plus Jakarta Sans"
                    fontWeight="600"
                    className="pointer-events-none drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]"
                  >
                    {city.name}
                  </text>
                )}
              </g>
            );
          })}
        </svg>

        {/* Hover Country Dossier Card (Floating near cursor) */}
        {hoveredCountry && (
          <div
            className="absolute pointer-events-none z-30 transition-all duration-75"
            style={{
              left: Math.min(hoverPos.x + 16, (containerRef.current?.clientWidth || 800) - 260),
              top: Math.min(hoverPos.y + 16, (containerRef.current?.clientHeight || 500) - 180)
            }}
          >
            <div className="w-64 p-3.5 bg-[#091526]/95 backdrop-blur-md border border-[#1683FF]/40 rounded-xl shadow-2xl text-left space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{hoveredCountry.flagEmoji}</span>
                  <div>
                    <h4 className="text-sm font-bold text-white leading-tight font-['Space_Grotesk']">
                      {hoveredCountry.name}
                    </h4>
                    <p className="text-[11px] text-slate-400">{hoveredCountry.continent}</p>
                  </div>
                </div>
                <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-blue-500/10 text-[#35C7FF] border border-blue-500/30">
                  {hoveredCountry.iso3}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800 text-[11px]">
                <div>
                  <span className="text-slate-500 block">Capital</span>
                  <span className="text-slate-200 font-medium truncate block">{hoveredCountry.capital}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Population</span>
                  <span className="text-slate-200 font-mono font-medium block">
                    {(hoveredCountry.population / 1_000_000).toFixed(1)}M
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 block">Land Area</span>
                  <span className="text-slate-200 font-mono font-medium block">
                    {(hoveredCountry.area / 1_000).toFixed(0)}k km²
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 block">GDP (Nominal)</span>
                  <span className="text-slate-200 font-mono font-medium block">
                    ${hoveredCountry.gdp}B
                  </span>
                </div>
              </div>

              <div className="pt-1.5 flex items-center justify-between text-[10px] text-[#35C7FF]">
                <span>Click to view full dossier</span>
                <Eye className="w-3 h-3" />
              </div>
            </div>
          </div>
        )}

        {/* Hover City Card */}
        {hoveredCity && !hoveredCountry && (
          <div
            className="absolute pointer-events-none z-30 transition-all duration-75"
            style={{
              left: Math.min(hoverPos.x + 16, (containerRef.current?.clientWidth || 800) - 240),
              top: Math.min(hoverPos.y + 16, (containerRef.current?.clientHeight || 500) - 120)
            }}
          >
            <div className="w-56 p-3 bg-[#091526]/95 backdrop-blur-md border border-[#35C7FF]/40 rounded-xl shadow-2xl text-left space-y-1.5">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#35C7FF]" />
                <div>
                  <h4 className="text-sm font-bold text-white font-['Space_Grotesk']">{hoveredCity.name}</h4>
                  <p className="text-[11px] text-slate-400">{hoveredCity.country} · {hoveredCity.timezone}</p>
                </div>
              </div>
              <p className="text-[11px] text-slate-300 line-clamp-2">{hoveredCity.description}</p>
              <div className="text-[10px] text-slate-400 font-mono">
                Pop: {(hoveredCity.population / 1_000_000).toFixed(2)}M people
              </div>
            </div>
          </div>
        )}

        {/* Bottom Left Legend for Current Mode */}
        <div className="absolute bottom-4 left-4 z-20 hidden sm:block p-3 rounded-xl bg-[#091526]/90 backdrop-blur-md border border-slate-800 text-xs">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-300">
              Layer: {mode.toUpperCase()}
            </span>
          </div>
          {mode === 'population' && (
            <div className="flex items-center gap-3 text-[11px] text-slate-400">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]" /> &gt;1 Billion
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#35C7FF]" /> &gt;100 Million
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#1683FF]" /> &gt;30 Million
              </span>
            </div>
          )}
          {mode === 'economy' && (
            <div className="flex items-center gap-3 text-[11px] text-slate-400">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#32D583]" /> &gt;$10T GDP
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]" /> &gt;$2T GDP
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#059669]" /> Developing
              </span>
            </div>
          )}
          {mode === 'climate' && (
            <div className="grid grid-cols-2 gap-x-3 gap-y-1 text-[11px] text-slate-400">
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#32D583]" /> Tropical</span>
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#F59E0B]" /> Arid</span>
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#35C7FF]" /> Temperate</span>
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#E2E8F0]" /> Polar</span>
            </div>
          )}
          {mode === 'countries' && (
            <p className="text-[11px] text-slate-400">Click any country to explore its geopolitical & geographical profile.</p>
          )}
          {mode === 'cities' && (
            <p className="text-[11px] text-slate-400">Showing illuminated megacities and primary global flight routes.</p>
          )}
          {mode === 'geography' && (
            <p className="text-[11px] text-slate-400">Physical geography view illustrating continental plates and elevation.</p>
          )}
        </div>

        {/* Floating Zoom / Pan Controls (Bottom Right) */}
        <div className="absolute bottom-4 right-4 z-20 flex flex-col gap-1.5 bg-[#091526]/90 backdrop-blur-md p-1.5 rounded-xl border border-slate-800 shadow-xl">
          <button
            onClick={handleZoomIn}
            className="p-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
            title="Zoom In"
            aria-label="Zoom in"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            onClick={handleZoomOut}
            className="p-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
            title="Zoom Out"
            aria-label="Zoom out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <div className="h-px bg-slate-800 my-0.5" />
          <button
            onClick={handleResetZoom}
            className="p-2 text-slate-400 hover:text-[#35C7FF] hover:bg-slate-800 rounded-lg transition-colors"
            title="Reset View"
            aria-label="Reset map"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        {/* Drag Hint on Map */}
        <div className="absolute top-3 right-3 pointer-events-none text-[10px] font-mono text-slate-500 bg-[#07111F]/80 px-2 py-1 rounded border border-slate-800/80">
          Scroll to Zoom · Drag to Pan
        </div>
      </div>
    </div>
  );
};
