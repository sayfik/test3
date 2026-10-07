import React from 'react';
import { Globe, Compass, Layers, MapPin, BarChart2, HelpCircle } from 'lucide-react';
import { PageView } from './Header';
import { useLanguage } from '../../context/LanguageContext';

interface FooterProps {
  onNavigate: (page: PageView) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const { t } = useLanguage();

  return (
    <footer className="bg-[#050C17] border-t border-slate-800/80 text-slate-400 text-sm mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          
          {/* Col 1: Brand & Atlas Identity */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#1683FF] to-[#35C7FF] p-0.5 flex items-center justify-center">
                <div className="w-full h-full bg-[#07111F] rounded-[6px] flex items-center justify-center">
                  <Globe className="w-4 h-4 text-[#35C7FF]" />
                </div>
              </div>
              <span className="text-lg font-bold text-white font-['Space_Grotesk']">
                GEO<span className="text-[#1683FF]">.</span>World
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Futuristic digital world atlas and global geography intelligence platform. Real data on sovereign nations, megacities, and global statistics.
            </p>
          </div>

          {/* Col 2: Atlas Explorations */}
          <div>
            <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider mb-3">
              Atlas Explorations
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onNavigate('map')} className="hover:text-[#35C7FF] transition-colors flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5" />
                  <span>{t('navMap')}</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('countries')} className="hover:text-[#35C7FF] transition-colors flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5" />
                  <span>{t('navCountries')}</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('cities')} className="hover:text-[#35C7FF] transition-colors flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{t('navCities')}</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Analysis & Trivia */}
          <div>
            <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider mb-3">
              Data & Assessment
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onNavigate('compare')} className="hover:text-[#35C7FF] transition-colors flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5" />
                  <span>{t('navCompare')}</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('stats')} className="hover:text-[#35C7FF] transition-colors flex items-center gap-1.5">
                  <BarChart2 className="w-3.5 h-3.5" />
                  <span>{t('navStatistics')}</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('quiz')} className="hover:text-[#35C7FF] transition-colors flex items-center gap-1.5">
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>{t('navQuiz')}</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Geographic Standards */}
          <div>
            <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider mb-3">
              Geographic Scope
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed mb-3">
              Cartographic data calibrated against ISO 3166-1 alpha-2 / alpha-3 standards and UN geoscheme regional classifications.
            </p>
            <div className="flex items-center gap-3 text-xs text-slate-400">
              <span className="text-[#32D583]">● Live System Ready</span>
              <span>·</span>
              <span>195 Sovereign States</span>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-3">
          <p>© {new Date().getFullYear()} GEO World Platform. All geographical records verified.</p>
          <div className="flex items-center gap-4">
            <span>Mercator & Equirectangular Projection</span>
            <span>·</span>
            <span>Planetary Scale</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
