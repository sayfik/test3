import React, { useState, useEffect, useRef } from 'react';
import { Search, X, MapPin, Globe, Compass, ArrowRight } from 'lucide-react';
import { COUNTRIES_DATA } from '../../data/countries';
import { CITIES_DATA } from '../../data/cities';
import { PageView } from './Header';
import { useLanguage } from '../../context/LanguageContext';

export interface SearchResultItem {
  id: string;
  title: string;
  subtitle: string;
  type: 'Country' | 'City' | 'Capital' | 'Region';
  countryId?: string;
  flag?: string;
  action: () => void;
}

interface SearchBarModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (page: PageView, param?: string) => void;
}

export const SearchBarModal: React.FC<SearchBarModalProps> = ({ isOpen, onClose, onNavigate }) => {
  const { t } = useLanguage();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResultItem[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
      setResults([]);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else inputRef.current?.focus();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    const q = query.trim().toLowerCase();
    if (!q) {
      setResults([]);
      return;
    }

    const matched: SearchResultItem[] = [];

    // 1. Check Cities
    CITIES_DATA.forEach((city) => {
      if (city.name.toLowerCase().includes(q)) {
        matched.push({
          id: `city-${city.id}`,
          title: city.name,
          subtitle: `${city.country} · ${city.continent}`,
          type: 'City',
          countryId: city.countryId,
          action: () => {
            onNavigate('cities', city.id);
            onClose();
          }
        });
      }
    });

    // 2. Check Countries (name, nativeName, iso)
    COUNTRIES_DATA.forEach((c) => {
      if (
        c.name.toLowerCase().includes(q) ||
        c.nativeName.toLowerCase().includes(q) ||
        c.iso2.toLowerCase() === q ||
        c.iso3.toLowerCase() === q
      ) {
        matched.push({
          id: `country-${c.id}`,
          title: c.name,
          subtitle: `${c.continent} · Population: ${(c.population / 1_000_000).toFixed(1)}M`,
          type: 'Country',
          countryId: c.id,
          flag: c.flagEmoji,
          action: () => {
            onNavigate('country-detail', c.id);
            onClose();
          }
        });
      }

      // Check Capitals
      if (c.capital.toLowerCase().includes(q)) {
        matched.push({
          id: `capital-${c.id}`,
          title: c.capital,
          subtitle: `Capital of ${c.name} (${c.flagEmoji})`,
          type: 'Capital',
          countryId: c.id,
          flag: c.flagEmoji,
          action: () => {
            onNavigate('country-detail', c.id);
            onClose();
          }
        });
      }

      // Check Regions
      if (c.region.toLowerCase().includes(q)) {
        matched.push({
          id: `region-${c.id}`,
          title: `${c.region} (${c.name})`,
          subtitle: `${c.continent} Region`,
          type: 'Region',
          countryId: c.id,
          flag: c.flagEmoji,
          action: () => {
            onNavigate('country-detail', c.id);
            onClose();
          }
        });
      }
    });

    setResults(matched.slice(0, 8));
  }, [query, onNavigate, onClose]);

  if (!isOpen) return null;

  const getTypeBadge = (type: SearchResultItem['type']) => {
    switch (type) {
      case 'Country':
        return 'text-[#1683FF] bg-blue-500/10 border-blue-500/30';
      case 'City':
        return 'text-[#35C7FF] bg-cyan-500/10 border-cyan-500/30';
      case 'Capital':
        return 'text-[#32D583] bg-emerald-500/10 border-emerald-500/30';
      case 'Region':
        return 'text-amber-400 bg-amber-500/10 border-amber-500/30';
    }
  };

  const getTypeIcon = (type: SearchResultItem['type']) => {
    switch (type) {
      case 'Country':
        return <Globe className="w-4 h-4 text-[#1683FF]" />;
      case 'City':
        return <MapPin className="w-4 h-4 text-[#35C7FF]" />;
      case 'Capital':
        return <Compass className="w-4 h-4 text-[#32D583]" />;
      case 'Region':
        return <Globe className="w-4 h-4 text-amber-400" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 sm:px-6 bg-black/75 backdrop-blur-sm animate-in fade-in duration-150">
      <div 
        className="w-full max-w-2xl bg-[#091526] border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="relative flex items-center px-4 py-3.5 border-b border-slate-800">
          <Search className="w-5 h-5 text-[#35C7FF] mr-3 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t('searchPlaceholder')}
            className="w-full bg-transparent text-white placeholder-slate-400 text-base focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-slate-400 hover:text-white rounded-lg transition-colors mr-2"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="text-xs px-2 py-1 bg-slate-800 text-slate-400 rounded-md border border-slate-700 hover:text-white transition-colors"
          >
            ESC
          </button>
        </div>

        {/* Results List or Suggestions */}
        <div className="max-h-96 overflow-y-auto p-2">
          {query.trim().length > 0 && results.length === 0 && (
            <div className="py-12 text-center text-slate-400">
              <Globe className="w-8 h-8 mx-auto text-slate-600 mb-2" />
              <p className="text-sm font-medium">No results found for "{query}"</p>
              <p className="text-xs text-slate-500 mt-1">Try searching for countries, world capitals, or major cities.</p>
            </div>
          )}

          {results.length > 0 && (
            <div className="space-y-1">
              <div className="px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                Found {results.length} matches
              </div>
              {results.map((item) => (
                <button
                  key={item.id}
                  onClick={item.action}
                  className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-slate-800/80 border border-transparent hover:border-slate-700/60 transition-all text-left group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-9 h-9 rounded-lg bg-slate-800/80 flex items-center justify-center shrink-0 border border-slate-700/50">
                      {item.flag ? (
                        <span className="text-xl">{item.flag}</span>
                      ) : (
                        getTypeIcon(item.type)
                      )}
                    </div>
                    <div className="truncate">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-white group-hover:text-[#35C7FF] transition-colors truncate">
                          {item.title}
                        </span>
                        <span className={`text-[10px] font-mono px-2 py-0.5 rounded border uppercase ${getTypeBadge(item.type)}`}>
                          {item.type}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 truncate mt-0.5">
                        {item.subtitle}
                      </p>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-[#35C7FF] group-hover:translate-x-1 transition-all shrink-0 ml-3" />
                </button>
              ))}
            </div>
          )}

          {query.trim().length === 0 && (
            <div className="p-4 space-y-4">
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Popular Discoveries
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { title: 'Tokyo', type: 'City', param: 'tokyo', page: 'cities' as PageView, icon: '🇯🇵' },
                  { title: 'Japan', type: 'Country', param: 'japan', page: 'country-detail' as PageView, icon: '🇯🇵' },
                  { title: 'Paris', type: 'City', param: 'paris', page: 'cities' as PageView, icon: '🇫🇷' },
                  { title: 'Brazil', type: 'Country', param: 'brazil', page: 'country-detail' as PageView, icon: '🇧🇷' },
                  { title: 'Cairo', type: 'City', param: 'cairo', page: 'cities' as PageView, icon: '🇪🇬' },
                  { title: 'Australia', type: 'Country', param: 'australia', page: 'country-detail' as PageView, icon: '🇦🇺' },
                  { title: 'Canada', type: 'Country', param: 'canada', page: 'country-detail' as PageView, icon: '🇨🇦' },
                  { title: 'Antarctica', type: 'Polar', param: 'antarctica', page: 'country-detail' as PageView, icon: '🇦🇶' },
                ].map((item) => (
                  <button
                    key={item.title}
                    onClick={() => {
                      onNavigate(item.page, item.param);
                      onClose();
                    }}
                    className="flex items-center gap-2 p-2 rounded-lg bg-slate-800/40 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-left transition-colors"
                  >
                    <span className="text-base">{item.icon}</span>
                    <div className="truncate">
                      <div className="text-xs font-medium text-slate-200 truncate">{item.title}</div>
                      <div className="text-[10px] text-slate-500">{item.type}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="px-4 py-2.5 bg-slate-900/90 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-500">
          <span>Search spans 195 nations, capitals, and planetary megacities</span>
          <span>Press ESC to close</span>
        </div>
      </div>
    </div>
  );
};
