import React, { useState, useEffect } from 'react';
import { 
  Globe, Compass, Layers, MapPin, BarChart2, HelpCircle, 
  Search, ArrowRight, ShieldCheck, Sparkles, Filter, 
  ArrowUpDown, Check, RefreshCw
} from 'lucide-react';
import { Header, PageView } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { SearchBarModal } from './components/common/SearchBar';
import { WorldMap } from './components/map/WorldMap';
import { CountryCard } from './components/countries/CountryCard';
import { CountryInfo } from './components/countries/CountryInfo';
import { CityCard } from './components/cities/CityCard';
import { ComparisonTable } from './components/compare/ComparisonTable';
import { StatisticsView } from './components/statistics/StatCard';
import { QuizCard } from './components/quiz/QuizCard';
import { COUNTRIES_DATA } from './data/countries';
import { CITIES_DATA } from './data/cities';
import { Country, Continent, CityData } from './types/geo';
import { useLanguage, LanguageProvider } from './context/LanguageContext';

function MainApp() {
  const { t } = useLanguage();
  const [currentPage, setCurrentPage] = useState<PageView>('home');
  const [selectedCountryId, setSelectedCountryId] = useState<string>('japan');
  const [comparedCountries, setComparedCountries] = useState<Country[]>([
    COUNTRIES_DATA[0], // Japan
    COUNTRIES_DATA[2]  // Brazil
  ]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Countries page filter/sort states
  const [countrySearch, setCountrySearch] = useState('');
  const [countryContinent, setCountryContinent] = useState<Continent | 'All'>('All');
  const [countrySort, setCountrySort] = useState<'name' | 'population' | 'area' | 'gdp'>('population');

  // Cities page filter/search states
  const [citySearch, setCitySearch] = useState('');
  const [cityContinent, setCityContinent] = useState<Continent | 'All'>('All');

  // Smooth scroll to top on page navigation
  const handleNavigate = (page: PageView, param?: string) => {
    if (param) {
      if (page === 'country-detail') {
        setSelectedCountryId(param);
      }
      if (page === 'cities') {
        const found = CITIES_DATA.find((c) => c.id === param);
        if (found) {
          setCitySearch(found.name);
        }
      }
    }
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectCountry = (countryId: string) => {
    setSelectedCountryId(countryId);
    setCurrentPage('country-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleCompare = (country: Country) => {
    if (comparedCountries.some((c) => c.id === country.id)) {
      if (comparedCountries.length > 1) {
        setComparedCountries(comparedCountries.filter((c) => c.id !== country.id));
      }
    } else {
      if (comparedCountries.length < 3) {
        setComparedCountries([...comparedCountries, country]);
      } else {
        setComparedCountries([comparedCountries[0], comparedCountries[1], country]);
      }
    }
  };

  // Filtered Countries
  const filteredCountries = COUNTRIES_DATA.filter((c) => {
    const matchesContinent = countryContinent === 'All' || c.continent === countryContinent;
    const matchesQuery = !countrySearch || 
      c.name.toLowerCase().includes(countrySearch.toLowerCase()) ||
      c.capital.toLowerCase().includes(countrySearch.toLowerCase()) ||
      c.nativeName.toLowerCase().includes(countrySearch.toLowerCase());
    return matchesContinent && matchesQuery;
  }).sort((a, b) => {
    if (countrySort === 'name') return a.name.localeCompare(b.name);
    if (countrySort === 'population') return b.population - a.population;
    if (countrySort === 'area') return b.area - a.area;
    if (countrySort === 'gdp') return b.gdp - a.gdp;
    return 0;
  });

  // Filtered Cities
  const filteredCities = CITIES_DATA.filter((city) => {
    const matchesContinent = cityContinent === 'All' || city.continent === cityContinent;
    const matchesQuery = !citySearch ||
      city.name.toLowerCase().includes(citySearch.toLowerCase()) ||
      city.country.toLowerCase().includes(citySearch.toLowerCase());
    return matchesContinent && matchesQuery;
  });

  const selectedCountry = COUNTRIES_DATA.find((c) => c.id === selectedCountryId) || COUNTRIES_DATA[0];

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

  return (
    <div className="min-h-screen bg-[#07111F] text-white flex flex-col font-['Plus_Jakarta_Sans'] selection:bg-[#1683FF]/30 selection:text-[#35C7FF]">
      
      {/* Universal Top Navigation */}
      <Header
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      {/* Global Quick Search Modal */}
      <SearchBarModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onNavigate={handleNavigate}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-10">
        
        {/* ================= PAGE: HOME ================= */}
        {currentPage === 'home' && (
          <div className="space-y-16 sm:space-y-20">
            
            {/* HERO BLOCK */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-[#091830] via-[#081324] to-[#07111F] border border-slate-800/90 p-6 sm:p-12 lg:p-16 shadow-2xl">
              {/* Background ambient lighting */}
              <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#1683FF]/15 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute top-1/2 right-0 w-96 h-96 bg-[#35C7FF]/10 rounded-full blur-3xl pointer-events-none" />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
                
                {/* Left Column: Headlines & Actions */}
                <div className="lg:col-span-6 space-y-6 text-left">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-xs font-semibold text-[#35C7FF]">
                    <span className="w-2 h-2 rounded-full bg-[#32D583] animate-pulse" />
                    <span>Planetary Geographic Atlas & Intelligence</span>
                  </div>

                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight font-['Space_Grotesk'] leading-[1.1] text-balance">
                    {t('heroTitle')}
                  </h1>

                  <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-xl text-balance">
                    {t('heroSubtitle')}
                  </p>

                  <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-2">
                    <button
                      onClick={() => handleNavigate('map')}
                      className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#1683FF] to-[#35C7FF] text-white font-bold text-sm shadow-xl shadow-blue-500/25 hover:shadow-blue-500/40 active:scale-95 transition-all"
                    >
                      <Compass className="w-4 h-4" />
                      <span>{t('heroBtnMap')}</span>
                    </button>
                    <button
                      onClick={() => handleNavigate('countries')}
                      className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 text-white font-semibold text-sm transition-all"
                    >
                      <Layers className="w-4 h-4 text-[#35C7FF]" />
                      <span>{t('heroBtnCountries')}</span>
                    </button>
                  </div>
                </div>

                {/* Right Column: Hero High-Tech Interactive Preview */}
                <div className="lg:col-span-6">
                  <div className="relative rounded-2xl overflow-hidden border border-slate-700/80 shadow-2xl bg-[#050C17]/90 group">
                    <img
                      src="/src/assets/images/geo_world_hero_atlas_1790156786378.jpg"
                      alt="Futuristic Digital World Globe"
                      referrerPolicy="no-referrer"
                      className="w-full h-80 sm:h-96 object-cover object-center group-hover:scale-105 transition-transform duration-700 opacity-90"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050C17] via-transparent to-black/20" />
                    
                    {/* Floating Tech Badges */}
                    <div className="absolute top-4 left-4 p-3 rounded-xl bg-[#091526]/90 backdrop-blur-md border border-slate-700/80 text-xs space-y-1">
                      <div className="flex items-center gap-2 text-slate-300">
                        <span className="w-2 h-2 rounded-full bg-[#32D583]" />
                        <span className="font-semibold text-white">Active Atlas Grid</span>
                      </div>
                      <div className="text-[11px] text-slate-400 font-mono">195 Sovereign Coordinates</div>
                    </div>

                    <div className="absolute bottom-4 right-4">
                      <button
                        onClick={() => handleNavigate('map')}
                        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#1683FF]/90 backdrop-blur-md text-white text-xs font-semibold hover:bg-[#1683FF] transition-colors shadow-lg"
                      >
                        <span>Launch Full Map</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* STATS STRIP UNDER HERO */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-10 mt-10 border-t border-slate-800/80">
                {[
                  { value: '195', label: t('statCountries'), icon: <Globe className="w-4 h-4 text-[#1683FF]" /> },
                  { value: '8B+', label: t('statPeople'), icon: <Compass className="w-4 h-4 text-[#35C7FF]" /> },
                  { value: '7', label: t('statContinents'), icon: <Layers className="w-4 h-4 text-[#32D583]" /> },
                  { value: '10K+', label: t('statCities'), icon: <MapPin className="w-4 h-4 text-amber-400" /> },
                ].map((stat, i) => (
                  <div key={i} className="p-4 rounded-2xl bg-[#050C17]/60 border border-slate-800/60 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-800/80 flex items-center justify-center shrink-0">
                      {stat.icon}
                    </div>
                    <div>
                      <div className="text-xl sm:text-2xl font-extrabold text-white font-mono">{stat.value}</div>
                      <div className="text-xs text-slate-400 font-medium">{stat.label}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* SECTION: INTERACTIVE WORLD MAP */}
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-[#35C7FF] mb-1">
                    Cartographic Engine
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-['Space_Grotesk']">
                    {t('mapSectionTitle')}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-400 mt-1">
                    {t('mapSectionSubtitle')}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleNavigate('compare')}
                    className="px-3.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-300 hover:text-white transition-colors"
                  >
                    Compare Nations
                  </button>
                  <button
                    onClick={() => handleNavigate('countries')}
                    className="px-3.5 py-1.5 rounded-lg bg-blue-500/10 border border-blue-500/30 text-xs font-semibold text-[#35C7FF] hover:bg-blue-500/20 transition-colors"
                  >
                    All Countries →
                  </button>
                </div>
              </div>

              {/* World Map Component */}
              <WorldMap
                onSelectCountry={handleSelectCountry}
                onSelectCity={(cityId) => handleNavigate('cities', cityId)}
              />
            </div>

            {/* SECTION: FEATURED SOVEREIGN NATIONS */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-white font-['Space_Grotesk']">
                    Featured Sovereign Nations
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-400">
                    Explore distinct territories, terrains, and demographic profiles.
                  </p>
                </div>
                <button
                  onClick={() => handleNavigate('countries')}
                  className="flex items-center gap-1.5 text-xs font-semibold text-[#1683FF] hover:text-[#35C7FF] transition-colors"
                >
                  <span>Explore all 195</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {COUNTRIES_DATA.slice(0, 6).map((c) => (
                  <CountryCard
                    key={c.id}
                    country={c}
                    onSelect={handleSelectCountry}
                    onCompare={handleToggleCompare}
                    isCompared={comparedCountries.some((item) => item.id === c.id)}
                  />
                ))}
              </div>
            </div>

            {/* SECTION: GLOBAL MEGACITIES SHOWCASE */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-white font-['Space_Grotesk']">
                    Global Megacities
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-400">
                    Planetary urban hubs of culture, finance, and architectural mastery.
                  </p>
                </div>
                <button
                  onClick={() => handleNavigate('cities')}
                  className="flex items-center gap-1.5 text-xs font-semibold text-[#1683FF] hover:text-[#35C7FF] transition-colors"
                >
                  <span>View All Cities</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {CITIES_DATA.slice(0, 3).map((city) => (
                  <CityCard
                    key={city.id}
                    city={city}
                    onSelectCountry={handleSelectCountry}
                    onLocateOnMap={() => handleNavigate('map')}
                  />
                ))}
              </div>
            </div>

            {/* CALL TO ACTION: GEO QUIZ BANNER */}
            <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[#0F2744] via-[#091526] to-[#0B2545] border border-blue-500/30 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
              <div className="space-y-2 text-center md:text-left">
                <span className="text-xs font-mono font-bold text-[#32D583] uppercase tracking-wider">
                  Test Your Planetary Knowledge
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold text-white font-['Space_Grotesk']">
                  Ready for the GEO World Quiz Challenge?
                </h3>
                <p className="text-sm text-slate-300 max-w-lg">
                  Guess flags, identify world capitals, and master planetary trivia with instant geographical explanations.
                </p>
              </div>
              <button
                onClick={() => handleNavigate('quiz')}
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#1683FF] to-[#35C7FF] text-white font-bold text-sm shadow-xl shadow-blue-500/30 hover:opacity-95 transition-opacity whitespace-nowrap"
              >
                Start Geo Quiz
              </button>
            </div>
          </div>
        )}

        {/* ================= PAGE: MAP ================= */}
        {currentPage === 'map' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div>
              <h1 className="text-3xl font-extrabold text-white tracking-tight font-['Space_Grotesk']">
                Interactive World Atlas
              </h1>
              <p className="text-sm text-slate-400 mt-1">
                Deep exploration map supporting thematic layers: Countries, Cities, Population density, Economy GDP, Terrain, and Climate zones.
              </p>
            </div>
            <WorldMap
              onSelectCountry={handleSelectCountry}
              onSelectCity={(cityId) => handleNavigate('cities', cityId)}
            />
          </div>
        )}

        {/* ================= PAGE: COUNTRIES CATALOG ================= */}
        {currentPage === 'countries' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            
            {/* Header & Search */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl font-extrabold text-white tracking-tight font-['Space_Grotesk']">
                  Sovereign Countries Catalog
                </h1>
                <p className="text-sm text-slate-400 mt-1">
                  Explore {COUNTRIES_DATA.length} detailed national profiles across all 7 continents.
                </p>
              </div>

              {/* Search & Sort Controls */}
              <div className="flex flex-wrap items-center gap-3">
                <div className="relative w-full sm:w-64">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={countrySearch}
                    onChange={(e) => setCountrySearch(e.target.value)}
                    placeholder="Search country, capital..."
                    className="w-full pl-9 pr-3 py-2 bg-slate-900 border border-slate-700/80 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#1683FF]"
                  />
                </div>

                <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-700/80 px-2.5 py-1.5 rounded-xl text-xs">
                  <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
                  <select
                    value={countrySort}
                    onChange={(e) => setCountrySort(e.target.value as any)}
                    className="bg-transparent text-slate-200 text-xs focus:outline-none"
                    aria-label="Sort countries"
                  >
                    <option value="population" className="bg-[#091526]">Sort: Population</option>
                    <option value="name" className="bg-[#091526]">Sort: Name (A-Z)</option>
                    <option value="area" className="bg-[#091526]">Sort: Land Area</option>
                    <option value="gdp" className="bg-[#091526]">Sort: GDP Output</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Continent Filters */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              <span className="text-xs uppercase tracking-wider text-slate-500 mr-1 shrink-0">Region:</span>
              {continentsList.map((cont) => (
                <button
                  key={cont}
                  onClick={() => setCountryContinent(cont)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all whitespace-nowrap ${
                    countryContinent === cont
                      ? 'bg-[#1683FF] text-white shadow-md shadow-blue-500/20'
                      : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {cont}
                </button>
              ))}
            </div>

            {/* Country Cards Grid */}
            {filteredCountries.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCountries.map((c) => (
                  <CountryCard
                    key={c.id}
                    country={c}
                    onSelect={handleSelectCountry}
                    onCompare={handleToggleCompare}
                    isCompared={comparedCountries.some((item) => item.id === c.id)}
                  />
                ))}
              </div>
            ) : (
              <div className="py-20 text-center rounded-3xl bg-[#091526]/50 border border-slate-800">
                <Globe className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                <h3 className="text-base font-bold text-white">No countries match your search</h3>
                <p className="text-xs text-slate-400 mt-1">Try resetting filters or adjusting search terms.</p>
                <button
                  onClick={() => {
                    setCountrySearch('');
                    setCountryContinent('All');
                  }}
                  className="mt-4 px-4 py-2 rounded-xl bg-slate-800 text-white text-xs font-semibold"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>
        )}

        {/* ================= PAGE: COUNTRY DETAIL ================= */}
        {currentPage === 'country-detail' && (
          <CountryInfo
            country={selectedCountry}
            onBack={() => setCurrentPage('countries')}
            onNavigate={handleNavigate}
            onCompareWith={(c) => {
              handleToggleCompare(c);
              handleNavigate('compare');
            }}
          />
        )}

        {/* ================= PAGE: CITIES ================= */}
        {currentPage === 'cities' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl font-extrabold text-white tracking-tight font-['Space_Grotesk']">
                  Global Cities Directory
                </h1>
                <p className="text-sm text-slate-400 mt-1">
                  Discover world capitals and primary metropolises with high-resolution imagery and municipal profiles.
                </p>
              </div>

              {/* Search input */}
              <div className="relative w-full sm:w-64">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={citySearch}
                  onChange={(e) => setCitySearch(e.target.value)}
                  placeholder="Search city, country..."
                  className="w-full pl-9 pr-3 py-2 bg-slate-900 border border-slate-700/80 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#1683FF]"
                />
              </div>
            </div>

            {/* Continent filter */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              <span className="text-xs uppercase tracking-wider text-slate-500 mr-1 shrink-0">Continent:</span>
              {continentsList.map((cont) => (
                <button
                  key={cont}
                  onClick={() => setCityContinent(cont)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all whitespace-nowrap ${
                    cityContinent === cont
                      ? 'bg-[#1683FF] text-white shadow-md shadow-blue-500/20'
                      : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {cont}
                </button>
              ))}
            </div>

            {/* Cities Grid */}
            {filteredCities.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCities.map((city) => (
                  <CityCard
                    key={city.id}
                    city={city}
                    onSelectCountry={handleSelectCountry}
                    onLocateOnMap={() => handleNavigate('map')}
                  />
                ))}
              </div>
            ) : (
              <div className="py-20 text-center rounded-3xl bg-[#091526]/50 border border-slate-800">
                <MapPin className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                <h3 className="text-base font-bold text-white">No cities match your criteria</h3>
                <p className="text-xs text-slate-400 mt-1">Try clearing your search query.</p>
              </div>
            )}
          </div>
        )}

        {/* ================= PAGE: COMPARE ================= */}
        {currentPage === 'compare' && (
          <ComparisonTable
            initialCountries={comparedCountries}
            onNavigate={handleNavigate}
          />
        )}

        {/* ================= PAGE: STATISTICS ================= */}
        {currentPage === 'stats' && (
          <StatisticsView onNavigate={handleNavigate} />
        )}

        {/* ================= PAGE: QUIZ ================= */}
        {currentPage === 'quiz' && (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <span className="text-xs font-mono font-bold text-[#35C7FF] uppercase tracking-wider">
                Interactive Knowledge Challenge
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-['Space_Grotesk']">
                GEO World Geography Quiz
              </h1>
              <p className="text-sm text-slate-400 max-w-lg mx-auto">
                Test your mastery of flags, capitals, territorial maps, and continents with real-time feedback.
              </p>
            </div>
            <QuizCard onNavigate={handleNavigate} />
          </div>
        )}
      </main>

      {/* Reusable Clean Footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <MainApp />
    </LanguageProvider>
  );
}
