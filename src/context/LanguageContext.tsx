import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'en' | 'ru';

interface Translations {
  [key: string]: {
    en: string;
    ru: string;
  };
}

export const translations: Translations = {
  // Navigation
  navExplore: { en: 'Explore', ru: 'Главная' },
  navMap: { en: 'World Map', ru: 'Карта мира' },
  navCountries: { en: 'Countries', ru: 'Страны' },
  navCities: { en: 'Cities', ru: 'Города' },
  navCompare: { en: 'Compare', ru: 'Сравнение' },
  navStatistics: { en: 'Statistics', ru: 'Статистика' },
  navQuiz: { en: 'Geo Quiz', ru: 'Викторина' },
  btnExploreMap: { en: 'Explore Map', ru: 'Открыть карту' },

  // Hero
  heroTitle: { en: 'EXPLORE THE WORLD', ru: 'ИССЛЕДУЙ МИР' },
  heroSubtitle: { 
    en: 'Discover countries, cities, cultures and facts through one interactive world atlas.', 
    ru: 'Открывайте страны, города, культуры и факты через интерактивный цифровой атлас мира.' 
  },
  heroBtnMap: { en: 'Explore the Map', ru: 'Исследовать карту' },
  heroBtnCountries: { en: 'Discover Countries', ru: 'Каталог стран' },

  // Quick stats
  statCountries: { en: '195 Countries', ru: '195 Стран' },
  statPeople: { en: '8B+ People', ru: '8+ Млрд людей' },
  statContinents: { en: '7 Continents', ru: '7 Континентов' },
  statCities: { en: '10K+ Cities', ru: '10K+ Городов' },

  // Map
  mapSectionTitle: { en: 'Interactive World Atlas', ru: 'Интерактивная карта мира' },
  mapSectionSubtitle: { 
    en: 'Zoom, pan, and switch thematic layers to explore real planetary geographic data.', 
    ru: 'Масштабируйте, перемещайте и переключайте слои для исследования планетарных данных.' 
  },
  modeCountries: { en: 'Countries', ru: 'Страны' },
  modeCities: { en: 'Cities', ru: 'Города' },
  modePopulation: { en: 'Population', ru: 'Население' },
  modeEconomy: { en: 'Economy', ru: 'Экономика' },
  modeGeography: { en: 'Geography', ru: 'География' },
  modeClimate: { en: 'Climate', ru: 'Климат' },

  // General UI
  searchPlaceholder: { en: 'Search countries, cities, capitals...', ru: 'Поиск стран, городов, столиц...' },
  viewProfile: { en: 'View Country Profile', ru: 'Подробнее о стране' },
  compareWith: { en: 'Compare', ru: 'Сравнить' },
  filterAll: { en: 'All Regions', ru: 'Все регионы' },
  sortBy: { en: 'Sort by', ru: 'Сортировка' },
  sortName: { en: 'Name (A-Z)', ru: 'Название (А-Я)' },
  sortPopulation: { en: 'Population', ru: 'Население' },
  sortArea: { en: 'Land Area', ru: 'Площадь' },
  sortGdp: { en: 'GDP', ru: 'ВВП' },
  capital: { en: 'Capital', ru: 'Столица' },
  population: { en: 'Population', ru: 'Население' },
  area: { en: 'Area', ru: 'Площадь' },
  gdp: { en: 'GDP', ru: 'ВВП' },
  currency: { en: 'Currency', ru: 'Валюта' },
  density: { en: 'Density', ru: 'Плотность' },
  continent: { en: 'Continent', ru: 'Континент' },
  sqKm: { en: 'sq km', ru: 'км²' },
  people: { en: 'people', ru: 'чел.' },
  billion: { en: 'B', ru: 'млрд' },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  t: (key) => key,
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('geo_world_lang') as Language;
    if (saved === 'ru' || saved === 'en') return saved;
    // Default to en or browser preference
    return navigator.language.startsWith('ru') ? 'ru' : 'en';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('geo_world_lang', lang);
  };

  const t = (key: string): string => {
    if (translations[key] && translations[key][language]) {
      return translations[key][language];
    }
    return key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
