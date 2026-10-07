import React from 'react';
import { 
  ArrowLeft, Globe, MapPin, Users, Maximize2, DollarSign, 
  Clock, Shield, Building, Mountain, Droplets, Compass, 
  Sparkles, CheckCircle, ChevronRight
} from 'lucide-react';
import { Country } from '../../types/geo';
import { PageView } from '../common/Header';

interface CountryInfoProps {
  country: Country;
  onBack: () => void;
  onNavigate: (page: PageView, param?: string) => void;
  onCompareWith?: (country: Country) => void;
}

export const CountryInfo: React.FC<CountryInfoProps> = ({
  country,
  onBack,
  onNavigate,
  onCompareWith
}) => {
  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Navigation Breadcrumb / Back button */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition-colors text-xs font-semibold"
        >
          <ArrowLeft className="w-4 h-4 text-[#35C7FF]" />
          <span>Back to Countries Catalog</span>
        </button>

        <div className="flex items-center gap-3">
          {onCompareWith && (
            <button
              onClick={() => onCompareWith(country)}
              className="px-3.5 py-1.5 rounded-xl bg-blue-500/10 border border-blue-500/30 text-[#35C7FF] hover:bg-blue-500/20 transition-colors text-xs font-semibold"
            >
              + Compare {country.name}
            </button>
          )}
          <button
            onClick={() => onNavigate('map')}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-[#1683FF] to-[#35C7FF] text-white shadow-md shadow-blue-500/20 text-xs font-semibold hover:opacity-95"
          >
            <Globe className="w-3.5 h-3.5" />
            <span>Locate on Atlas</span>
          </button>
        </div>
      </div>

      {/* Hero Banner for Country */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0A1A33] via-[#091526] to-[#050C17] border border-slate-700/80 p-6 sm:p-10 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#1683FF]/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="flex items-start sm:items-center gap-5">
            {/* National Flag */}
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-slate-900/90 border border-slate-700 flex items-center justify-center text-5xl sm:text-6xl shadow-xl shrink-0">
              {country.flagEmoji}
            </div>

            <div>
              <div className="flex items-center gap-2.5 flex-wrap">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-['Space_Grotesk']">
                  {country.name}
                </h1>
                <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-md bg-[#1683FF]/20 text-[#35C7FF] border border-[#1683FF]/40">
                  {country.iso3} / {country.iso2}
                </span>
              </div>
              <p className="text-sm sm:text-base text-slate-400 mt-1 font-medium">
                {country.nativeName} · <span className="text-[#32D583]">{country.continent}</span> ({country.region})
              </p>
              <div className="flex items-center gap-4 mt-3 text-xs text-slate-400">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#35C7FF]" />
                  <span>Capital: <strong className="text-white">{country.capital}</strong></span>
                </span>
                <span>·</span>
                <span className="flex items-center gap-1">
                  <Compass className="w-3.5 h-3.5 text-[#32D583]" />
                  <span>{country.coordinates[0].toFixed(2)}° N, {country.coordinates[1].toFixed(2)}° E</span>
                </span>
              </div>
            </div>
          </div>

          {/* Quick Emblem / National Stat Badge */}
          <div className="flex lg:flex-col items-center lg:items-end gap-2 text-right">
            <div className="px-4 py-2 rounded-xl bg-slate-900/80 border border-slate-800 text-xs">
              <span className="text-slate-500 block text-[10px] uppercase tracking-wider">Government Type</span>
              <span className="text-slate-200 font-semibold">{country.government}</span>
            </div>
            <div className="px-4 py-2 rounded-xl bg-slate-900/80 border border-slate-800 text-xs">
              <span className="text-slate-500 block text-[10px] uppercase tracking-wider">Timezone</span>
              <span className="text-[#35C7FF] font-mono font-semibold">{country.timezone}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Grid of Key Numerical Stat Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        {[
          { label: 'Population', value: `${(country.population / 1_000_000).toFixed(1)}M`, sub: `${country.population.toLocaleString()} people`, icon: <Users className="w-4 h-4 text-[#1683FF]" /> },
          { label: 'Total Area', value: `${(country.area / 1_000).toFixed(0)}k`, sub: `${country.area.toLocaleString()} sq km`, icon: <Maximize2 className="w-4 h-4 text-[#35C7FF]" /> },
          { label: 'GDP (Nominal)', value: `$${country.gdp}B`, sub: `$${country.gdpPerCapita.toLocaleString()} per capita`, icon: <DollarSign className="w-4 h-4 text-[#32D583]" /> },
          { label: 'Density', value: `${country.populationDensity}`, sub: 'people / km²', icon: <Building className="w-4 h-4 text-amber-400" /> },
          { label: 'Life Expectancy', value: `${country.lifeExpectancy} yrs`, sub: `${country.urbanPopulationPercent}% urbanized`, icon: <Shield className="w-4 h-4 text-purple-400" /> },
          { label: 'Currency', value: country.currency.code, sub: `${country.currency.name} (${country.currency.symbol})`, icon: <DollarSign className="w-4 h-4 text-emerald-400" /> },
        ].map((stat, i) => (
          <div key={i} className="p-4 rounded-2xl bg-[#091526] border border-slate-800/90 shadow-md">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">{stat.label}</span>
              {stat.icon}
            </div>
            <div className="text-xl sm:text-2xl font-bold text-white font-mono">{stat.value}</div>
            <p className="text-[11px] text-slate-400 mt-1 truncate">{stat.sub}</p>
          </div>
        ))}
      </div>

      {/* Section 1: Detailed Geography */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#091526]/90 border border-slate-800/90 shadow-xl space-y-6">
        <div className="flex items-center gap-3 pb-4 border-b border-slate-800">
          <Mountain className="w-6 h-6 text-[#1683FF]" />
          <div>
            <h2 className="text-xl font-bold text-white font-['Space_Grotesk']">Geography & Terrestrial Profile</h2>
            <p className="text-xs text-slate-400">Physical terrain, hydrology, elevation extremes, and climate dynamics.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Terrain & Landscape</h4>
              <p className="text-sm text-slate-200 leading-relaxed bg-[#050C17] p-4 rounded-xl border border-slate-800">
                {country.terrain}
              </p>
            </div>

            <div>
              <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Climate & Biomes</h4>
              <p className="text-sm text-slate-200 leading-relaxed bg-[#050C17] p-4 rounded-xl border border-slate-800">
                {country.climate}
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-[#050C17] border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400 font-medium">Highest Elevation</span>
                <span className="text-xs font-mono font-bold text-[#35C7FF]">{country.highestPoint.elevation} meters</span>
              </div>
              <div className="text-base font-semibold text-white">{country.highestPoint.name}</div>
            </div>

            <div className="p-4 rounded-xl bg-[#050C17] border border-slate-800 space-y-2">
              <div className="text-xs text-slate-400 font-medium">Major River Systems</div>
              <div className="flex flex-wrap gap-2 pt-1">
                {country.majorRivers.map((river, idx) => (
                  <span key={idx} className="text-xs px-2.5 py-1 rounded-lg bg-blue-500/10 text-[#35C7FF] border border-blue-500/20 font-medium">
                    {river}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#050C17] border border-slate-800 space-y-2">
              <div className="text-xs text-slate-400 font-medium">Major Lakes & Water Reservoirs</div>
              <div className="flex flex-wrap gap-2 pt-1">
                {country.majorLakes.map((lake, idx) => (
                  <span key={idx} className="text-xs px-2.5 py-1 rounded-lg bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 font-medium">
                    {lake}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section 2: Interesting Facts */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#091526]/90 border border-slate-800/90 shadow-xl space-y-6">
        <div className="flex items-center gap-3 pb-4 border-b border-slate-800">
          <Sparkles className="w-6 h-6 text-[#32D583]" />
          <div>
            <h2 className="text-xl font-bold text-white font-['Space_Grotesk']">Interesting Geographic & Cultural Facts</h2>
            <p className="text-xs text-slate-400">Curated global distinctions, historical milestones, and natural wonders.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {country.interestingFacts.map((fact, index) => (
            <div 
              key={index}
              className="flex items-start gap-3.5 p-4 rounded-2xl bg-[#050C17] border border-slate-800/80 hover:border-slate-700 transition-colors"
            >
              <div className="w-6 h-6 rounded-full bg-[#32D583]/10 border border-[#32D583]/30 flex items-center justify-center shrink-0 mt-0.5 text-xs font-mono font-bold text-[#32D583]">
                {index + 1}
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                {fact}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Section 3: Major Cities */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#091526]/90 border border-slate-800/90 shadow-xl space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800 flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <Building className="w-6 h-6 text-[#35C7FF]" />
            <div>
              <h2 className="text-xl font-bold text-white font-['Space_Grotesk']">Major Cities & Urban Metropolises</h2>
              <p className="text-xs text-slate-400">Key municipal centers ranked by population size.</p>
            </div>
          </div>
          <button
            onClick={() => onNavigate('cities')}
            className="flex items-center gap-1.5 text-xs font-semibold text-[#1683FF] hover:text-[#35C7FF] transition-colors"
          >
            <span>Explore World Cities Catalog</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {country.majorCities.map((city, idx) => (
            <div 
              key={idx}
              className="p-4 rounded-2xl bg-[#050C17] border border-slate-800 flex items-center justify-between hover:border-blue-500/40 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-slate-800/80 flex items-center justify-center border border-slate-700 text-[#35C7FF]">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-white">{city.name}</span>
                    {city.isCapital && (
                      <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-blue-500/20 text-[#35C7FF] border border-blue-500/30">
                        Capital
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-slate-400 font-mono">
                    {city.population.toLocaleString()} residents
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
