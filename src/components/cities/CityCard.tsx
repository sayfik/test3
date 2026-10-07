import React, { useState } from 'react';
import { MapPin, Users, Compass, ExternalLink } from 'lucide-react';
import { CityData } from '../../types/geo';

interface CityCardProps {
  city: CityData;
  onSelectCountry?: (countryId: string) => void;
  onLocateOnMap?: (city: CityData) => void;
}

export const CityCard: React.FC<CityCardProps> = ({
  city,
  onSelectCountry,
  onLocateOnMap
}) => {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="group bg-[#091526]/80 hover:bg-[#0c1d36] border border-slate-800 hover:border-[#35C7FF]/50 rounded-2xl overflow-hidden shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-cyan-500/10 flex flex-col justify-between">
      
      {/* City Photo or Resilient Fallback */}
      <div>
        <div className="relative h-48 w-full overflow-hidden bg-slate-900">
          {!imageError ? (
            <img
              src={city.image}
              alt={city.name}
              referrerPolicy="no-referrer"
              onError={() => setImageError(true)}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-[#0F2744] to-[#07111F] flex flex-col items-center justify-center p-4 text-center">
              <MapPin className="w-8 h-8 text-[#35C7FF] mb-2" />
              <span className="text-sm font-bold text-white font-['Space_Grotesk']">{city.name}</span>
              <span className="text-xs text-slate-400">{city.country}</span>
            </div>
          )}

          {/* Measured Contrast Scrim */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#091526] via-black/30 to-transparent" />

          {/* Top Country Tag */}
          <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md border border-white/10 text-xs font-medium text-white">
            <span className="text-[#35C7FF] font-semibold">{city.country}</span>
          </div>

          {/* Timezone badge */}
          <div className="absolute top-3 right-3 px-2 py-0.5 rounded bg-slate-900/80 backdrop-blur-md border border-slate-700 text-[11px] font-mono text-slate-300">
            {city.timezone}
          </div>

          {/* City Name at Bottom of Image */}
          <div className="absolute bottom-3 left-4 right-4">
            <h3 className="text-2xl font-bold text-white tracking-tight font-['Space_Grotesk'] group-hover:text-[#35C7FF] transition-colors">
              {city.name}
            </h3>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-5 space-y-4">
          {/* Numerical Metrics */}
          <div className="grid grid-cols-2 gap-2 text-xs py-2 border-b border-slate-800">
            <div>
              <span className="text-slate-500 block text-[11px]">Population</span>
              <span className="text-slate-200 font-mono font-bold text-sm">
                {(city.population / 1_000_000).toFixed(2)}M
              </span>
            </div>
            <div>
              <span className="text-slate-500 block text-[11px]">Coordinates</span>
              <span className="text-slate-300 font-mono text-xs truncate block">
                {city.coordinates.lat.toFixed(2)}°, {city.coordinates.lng.toFixed(2)}°
              </span>
            </div>
          </div>

          {/* Brief Description */}
          <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">
            {city.description}
          </p>

          {/* Key Highlights */}
          {city.highlights && city.highlights.length > 0 && (
            <div>
              <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider block mb-1.5">
                Key Landmarks & Attractions
              </span>
              <div className="flex flex-wrap gap-1.5">
                {city.highlights.slice(0, 3).map((item, idx) => (
                  <span
                    key={idx}
                    className="text-[11px] px-2 py-0.5 rounded bg-slate-800/80 border border-slate-700/60 text-slate-300"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Action Footer */}
      <div className="p-4 pt-0 flex items-center justify-between gap-2 text-xs">
        {onSelectCountry && (
          <button
            onClick={() => onSelectCountry(city.countryId)}
            className="text-xs text-slate-400 hover:text-white font-medium transition-colors"
          >
            Explore {city.country} →
          </button>
        )}
        {onLocateOnMap && (
          <button
            onClick={() => onLocateOnMap(city)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-500/10 border border-blue-500/30 text-[#35C7FF] hover:bg-blue-500/20 font-semibold transition-colors ml-auto"
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Map Pin</span>
          </button>
        )}
      </div>
    </div>
  );
};
