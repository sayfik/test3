import React from 'react';
import { ArrowRight, Compass, Users, Maximize2, Shield } from 'lucide-react';
import { Country } from '../../types/geo';

interface CountryCardProps {
  country: Country;
  onSelect: (id: string) => void;
  onCompare?: (country: Country) => void;
  isCompared?: boolean;
}

export const CountryCard: React.FC<CountryCardProps> = ({
  country,
  onSelect,
  onCompare,
  isCompared
}) => {
  return (
    <div 
      onClick={() => onSelect(country.id)}
      className="group relative bg-[#091526]/80 hover:bg-[#0c1d36] border border-slate-800 hover:border-[#1683FF]/50 rounded-2xl p-5 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-blue-500/10 cursor-pointer flex flex-col justify-between"
    >
      {/* Top Header: Flag, Name, Region */}
      <div>
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-3">
            <span className="text-4xl filter drop-shadow-md group-hover:scale-110 transition-transform">
              {country.flagEmoji}
            </span>
            <div>
              <h3 className="text-lg font-bold text-white group-hover:text-[#35C7FF] transition-colors font-['Space_Grotesk'] leading-tight">
                {country.name}
              </h3>
              <p className="text-xs text-slate-400 font-medium">
                {country.capital} · {country.region}
              </p>
            </div>
          </div>
          <span className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700/60">
            {country.iso3}
          </span>
        </div>

        {/* Key Numerical Metrics: Tabular Numerals */}
        <div className="grid grid-cols-2 gap-2.5 py-3 border-y border-slate-800/80 text-xs my-3">
          <div>
            <span className="text-slate-500 block text-[11px]">Population</span>
            <span className="text-slate-200 font-mono font-semibold text-sm">
              {(country.population / 1_000_000).toFixed(1)}M
            </span>
          </div>
          <div>
            <span className="text-slate-500 block text-[11px]">Land Area</span>
            <span className="text-slate-200 font-mono font-semibold text-sm">
              {country.area.toLocaleString()} km²
            </span>
          </div>
          <div>
            <span className="text-slate-500 block text-[11px]">GDP (Nominal)</span>
            <span className="text-slate-200 font-mono font-semibold text-sm">
              ${country.gdp.toLocaleString()}B
            </span>
          </div>
          <div>
            <span className="text-slate-500 block text-[11px]">Continent</span>
            <span className="text-[#35C7FF] font-medium text-xs truncate block">
              {country.continent}
            </span>
          </div>
        </div>

        {/* Snippet from Terrain / Fact */}
        <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-4">
          {country.terrain}
        </p>
      </div>

      {/* Action Footer */}
      <div className="flex items-center justify-between pt-2 border-t border-slate-800/60 text-xs">
        {onCompare && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onCompare(country);
            }}
            className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors ${
              isCompared
                ? 'bg-[#32D583]/20 text-[#32D583] border border-[#32D583]/40'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            {isCompared ? '✓ Selected' : '+ Compare'}
          </button>
        )}
        <div className="flex items-center gap-1.5 text-[#1683FF] group-hover:text-[#35C7FF] font-semibold text-xs transition-colors ml-auto">
          <span>Dossier</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </div>
  );
};
