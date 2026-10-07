import { ContinentStat } from '../types/geo';

export const CONTINENTS_STATS: ContinentStat[] = [
  {
    name: 'Asia',
    countriesCount: 49,
    population: 4750000000,
    area: 44579000,
    gdp: 39500,
    color: '#1683FF'
  },
  {
    name: 'Africa',
    countriesCount: 54,
    population: 1460000000,
    area: 30370000,
    gdp: 3100,
    color: '#32D583'
  },
  {
    name: 'Europe',
    countriesCount: 44,
    population: 742000000,
    area: 10180000,
    gdp: 24800,
    color: '#35C7FF'
  },
  {
    name: 'North America',
    countriesCount: 23,
    population: 604000000,
    area: 24709000,
    gdp: 31200,
    color: '#F59E0B'
  },
  {
    name: 'South America',
    countriesCount: 12,
    population: 439000000,
    area: 17840000,
    gdp: 4200,
    color: '#EC4899'
  },
  {
    name: 'Oceania',
    countriesCount: 14,
    population: 45000000,
    area: 8525989,
    gdp: 2100,
    color: '#8B5CF6'
  },
  {
    name: 'Antarctica',
    countriesCount: 0,
    population: 1500,
    area: 14200000,
    gdp: 0,
    color: '#64748B'
  }
];

export const TOP_POPULATION_DATA = [
  { name: 'India', population: 1438, flag: '🇮🇳' },
  { name: 'China', population: 1410, flag: '🇨🇳' },
  { name: 'United States', population: 341, flag: '🇺🇸' },
  { name: 'Indonesia', population: 279, flag: '🇮🇩' },
  { name: 'Pakistan', population: 241, flag: '🇵🇰' },
  { name: 'Nigeria', population: 224, flag: '🇳🇬' },
  { name: 'Brazil', population: 216, flag: '🇧🇷' },
  { name: 'Bangladesh', population: 173, flag: '🇧🇩' },
  { name: 'Russia', population: 144, flag: '🇷🇺' },
  { name: 'Mexico', population: 129, flag: '🇲🇽' }
];

export const TOP_AREA_DATA = [
  { name: 'Russia', area: 17098, flag: '🇷🇺' },
  { name: 'Canada', area: 9984, flag: '🇨🇦' },
  { name: 'United States', area: 9833, flag: '🇺🇸' },
  { name: 'China', area: 9596, flag: '🇨🇳' },
  { name: 'Brazil', area: 8515, flag: '🇧🇷' },
  { name: 'Australia', area: 7692, flag: '🇦🇺' },
  { name: 'India', area: 3287, flag: '🇮🇳' },
  { name: 'Argentina', area: 2780, flag: '🇦🇷' },
  { name: 'Kazakhstan', area: 2724, flag: '🇰🇿' },
  { name: 'Algeria', area: 2381, flag: '🇩🇿' }
];

export const TOP_GDP_DATA = [
  { name: 'United States', gdp: 27360, flag: '🇺🇸' },
  { name: 'China', gdp: 18530, flag: '🇨🇳' },
  { name: 'Germany', gdp: 4460, flag: '🇩🇪' },
  { name: 'Japan', gdp: 4210, flag: '🇯🇵' },
  { name: 'India', gdp: 3940, flag: '🇮🇳' },
  { name: 'United Kingdom', gdp: 3340, flag: '🇬🇧' },
  { name: 'France', gdp: 3050, flag: '🇫🇷' },
  { name: 'Italy', gdp: 2250, flag: '🇮🇹' },
  { name: 'Brazil', gdp: 2170, flag: '🇧🇷' },
  { name: 'Canada', gdp: 2140, flag: '🇨🇦' }
];

export const DENSITY_DATA = [
  { name: 'Singapore', density: 8065, flag: '🇸🇬' },
  { name: 'Bahrain', density: 1892, flag: '🇧🇭' },
  { name: 'Bangladesh', density: 1320, flag: '🇧🇩' },
  { name: 'South Korea', density: 516, flag: '🇰🇷' },
  { name: 'India', density: 437, flag: '🇮🇳' },
  { name: 'Japan', density: 338, flag: '🇯🇵' },
  { name: 'United Kingdom', density: 281, flag: '🇬🇧' },
  { name: 'Germany', density: 236, flag: '🇩🇪' },
  { name: 'Switzerland', density: 215, flag: '🇨🇭' },
  { name: 'Italy', density: 195, flag: '🇮🇹' }
];

export const LIFE_EXPECTANCY_TRENDS = [
  { year: 1970, global: 56.4, europe: 71.1, americas: 65.2, asia: 56.1, africa: 44.8 },
  { year: 1980, global: 62.8, europe: 72.8, americas: 69.3, asia: 62.4, africa: 49.3 },
  { year: 1990, global: 65.4, europe: 74.8, americas: 71.9, asia: 65.9, africa: 53.0 },
  { year: 2000, global: 67.2, europe: 76.5, americas: 74.4, asia: 68.7, africa: 52.8 },
  { year: 2010, global: 70.8, europe: 79.4, americas: 77.1, asia: 72.4, africa: 58.7 },
  { year: 2020, global: 72.8, europe: 81.2, americas: 78.5, asia: 74.6, africa: 63.4 },
  { year: 2026, global: 73.9, europe: 82.6, americas: 79.6, asia: 75.8, africa: 65.2 }
];
