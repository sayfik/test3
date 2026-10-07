import React, { useState } from 'react';
import { Globe, Search, Menu, X, Compass, BarChart2, Layers, HelpCircle, MapPin } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export type PageView = 'home' | 'map' | 'countries' | 'country-detail' | 'cities' | 'compare' | 'stats' | 'quiz';

interface HeaderProps {
  currentPage: PageView;
  onNavigate: (page: PageView, param?: string) => void;
  onOpenSearch: () => void;
}

export const Header: React.FC<HeaderProps> = ({ currentPage, onNavigate, onOpenSearch }) => {
  const { language, setLanguage, t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: PageView; labelKey: string; icon: React.ReactNode }[] = [
    { id: 'home', labelKey: 'navExplore', icon: <Compass className="w-4 h-4" /> },
    { id: 'map', labelKey: 'navMap', icon: <Globe className="w-4 h-4" /> },
    { id: 'countries', labelKey: 'navCountries', icon: <Layers className="w-4 h-4" /> },
    { id: 'cities', labelKey: 'navCities', icon: <MapPin className="w-4 h-4" /> },
    { id: 'compare', labelKey: 'navCompare', icon: <Layers className="w-4 h-4" /> },
    { id: 'stats', labelKey: 'navStatistics', icon: <BarChart2 className="w-4 h-4" /> },
    { id: 'quiz', labelKey: 'navQuiz', icon: <HelpCircle className="w-4 h-4" /> },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#07111F]/90 backdrop-blur-md border-b border-slate-800/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Zone: Clean futuristic title */}
        <button 
          onClick={() => onNavigate('home')} 
          className="flex items-center gap-2.5 text-left group focus:outline-none"
        >
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#1683FF] to-[#35C7FF] p-0.5 flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-[#07111F] rounded-[7px] flex items-center justify-center">
              <Globe className="w-5 h-5 text-[#35C7FF] animate-pulse" />
            </div>
          </div>
          <div>
            <span className="text-xl font-bold tracking-tight text-white font-['Space_Grotesk'] group-hover:text-[#35C7FF] transition-colors">
              GEO<span className="text-[#1683FF]">.</span>World
            </span>
          </div>
        </button>

        {/* Navigation Links: Clean text with subtle indicators */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navItems.map((item) => {
            const isActive = currentPage === item.id || (item.id === 'countries' && currentPage === 'country-detail');
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all whitespace-nowrap ${
                  isActive
                    ? 'text-[#35C7FF] bg-blue-500/10 border border-blue-500/30'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                {t(item.labelKey)}
              </button>
            );
          })}
        </nav>

        {/* Right Actions: Search, Language, Explore Map Button */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick Search */}
          <button
            onClick={onOpenSearch}
            className="flex items-center gap-2 px-3 py-1.5 text-xs text-slate-400 bg-slate-900/80 border border-slate-700/60 rounded-lg hover:border-[#1683FF]/50 hover:text-white transition-all shadow-inner focus:outline-none"
            aria-label="Search atlas"
          >
            <Search className="w-3.5 h-3.5 text-[#35C7FF]" />
            <span className="hidden sm:inline">{t('searchPlaceholder').slice(0, 15)}...</span>
            <kbd className="hidden md:inline text-[10px] px-1.5 py-0.5 bg-slate-800 rounded text-slate-400 border border-slate-700">⌘K</kbd>
          </button>

          {/* Language Toggle */}
          <button
            onClick={() => setLanguage(language === 'en' ? 'ru' : 'en')}
            className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-slate-300 bg-slate-900/60 border border-slate-800 rounded-lg hover:border-slate-700 hover:text-white transition-colors"
            title="Switch Language"
          >
            <Globe className="w-3.5 h-3.5 text-[#32D583]" />
            <span className="font-mono uppercase">{language}</span>
          </button>

          {/* Primary Action Button */}
          <button
            onClick={() => onNavigate('map')}
            className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-gradient-to-r from-[#1683FF] to-[#35C7FF] rounded-lg hover:opacity-95 shadow-md shadow-blue-500/25 active:scale-95 transition-all whitespace-nowrap"
          >
            <Compass className="w-3.5 h-3.5" />
            <span>{t('btnExploreMap')}</span>
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#07111F]/98 border-b border-slate-800 px-4 pt-2 pb-6 space-y-2 animate-in slide-in-from-top-2 duration-200">
          <div className="grid grid-cols-2 gap-2 pt-2">
            {navItems.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onNavigate(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium text-left transition-colors ${
                    isActive
                      ? 'bg-[#1683FF]/20 text-[#35C7FF] border border-[#1683FF]/40'
                      : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                  }`}
                >
                  {item.icon}
                  <span>{t(item.labelKey)}</span>
                </button>
              );
            })}
          </div>
          <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
            <button
              onClick={() => {
                onOpenSearch();
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-2 text-sm text-slate-300 hover:text-white"
            >
              <Search className="w-4 h-4 text-[#35C7FF]" />
              <span>Search Database</span>
            </button>
            <button
              onClick={() => setLanguage(language === 'en' ? 'ru' : 'en')}
              className="px-3 py-1 text-xs font-mono rounded bg-slate-800 text-slate-200 border border-slate-700"
            >
              Language: {language.toUpperCase()}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
