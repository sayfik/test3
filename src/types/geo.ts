export type Continent = 
  | 'Africa'
  | 'Asia'
  | 'Europe'
  | 'North America'
  | 'South America'
  | 'Oceania'
  | 'Antarctica';

export type MapMode = 
  | 'countries'
  | 'cities'
  | 'population'
  | 'economy'
  | 'geography'
  | 'climate';

export interface Currency {
  code: string;
  name: string;
  symbol: string;
}

export interface CityData {
  id: string;
  name: string;
  country: string;
  countryId: string;
  image: string;
  population: number;
  coordinates: {
    lat: number;
    lng: number;
  };
  description: string;
  highlights: string[];
  foundedYear?: string | number;
  timezone: string;
  continent: Continent;
}

export interface Country {
  id: string;
  name: string;
  nativeName: string;
  iso2: string;
  iso3: string;
  flagEmoji: string;
  flagUrl?: string;
  emblemUrl?: string;
  capital: string;
  population: number;
  area: number; // in sq km
  currency: Currency;
  officialLanguages: string[];
  continent: Continent;
  region: string;
  timezone: string;
  government: string;
  gdp: number; // in billion USD
  gdpPerCapita: number; // in USD
  populationDensity: number; // people per sq km
  lifeExpectancy: number; // years
  urbanPopulationPercent: number;
  highestPoint: {
    name: string;
    elevation: number; // meters
  };
  majorRivers: string[];
  majorLakes: string[];
  terrain: string;
  climate: string;
  climateZone: 'Tropical' | 'Arid' | 'Temperate' | 'Continental' | 'Polar';
  interestingFacts: string[];
  majorCities: {
    name: string;
    population: number;
    isCapital?: boolean;
  }[];
  coordinates: [number, number]; // [lat, lng]
  mapPathId: string;
}

export interface QuizQuestion {
  id: string;
  type: 'flag' | 'capital' | 'map' | 'city' | 'continent' | 'fact';
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  countryId?: string;
  visual?: {
    flagEmoji?: string;
    imageUrl?: string;
    mapHighlightCountry?: string;
  };
}

export interface ContinentStat {
  name: Continent;
  countriesCount: number;
  population: number;
  area: number; // sq km
  gdp: number; // billion USD
  color: string;
}
