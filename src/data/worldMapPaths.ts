// World map coordinate projection & SVG geometry

export interface MapRegion {
  id: string;
  name: string;
  continent: string;
  d: string;
  center: [number, number]; // [x, y] in SVG coordinates (0-1000, 0-500)
}

// Convert geographic latitude and longitude to SVG coordinates (1000x500 viewBox)
export function latLngToSvg(lat: number, lng: number): { x: number; y: number } {
  // Equirectangular projection:
  // lng: -180 to 180 -> x: 0 to 1000
  // lat: -90 to 90 -> y: 500 to 0
  const x = ((lng + 180) / 360) * 1000;
  const y = ((90 - lat) / 180) * 500;
  return { x: Math.max(0, Math.min(1000, x)), y: Math.max(0, Math.min(500, y)) };
}

// Global flight / data exchange connections for high-tech atlas feel
export interface MapConnection {
  from: string;
  to: string;
  fromCoords: [number, number]; // [lat, lng]
  toCoords: [number, number];
}

export const MAP_CONNECTIONS: MapConnection[] = [
  { from: 'Tokyo', to: 'San Francisco', fromCoords: [35.6762, 139.6503], toCoords: [37.7749, -122.4194] },
  { from: 'London', to: 'New York City', fromCoords: [51.5074, -0.1278], toCoords: [40.7128, -74.0060] },
  { from: 'Paris', to: 'Cairo', fromCoords: [48.8566, 2.3522], toCoords: [30.0444, 31.2357] },
  { from: 'Singapore', to: 'Sydney', fromCoords: [1.3521, 103.8198], toCoords: [-33.8688, 151.2093] },
  { from: 'Tokyo', to: 'Singapore', fromCoords: [35.6762, 139.6503], toCoords: [1.3521, 103.8198] },
  { from: 'New York City', to: 'Rio de Janeiro', fromCoords: [40.7128, -74.0060], toCoords: [-22.9068, -43.1729] },
  { from: 'London', to: 'Nairobi', fromCoords: [51.5074, -0.1278], toCoords: [-1.2921, 36.8219] },
  { from: 'Berlin', to: 'New Delhi', fromCoords: [52.5200, 13.4050], toCoords: [28.6139, 77.2090] }
];

// Rich SVG paths for world landmasses and countries
export const WORLD_COUNTRY_PATHS: MapRegion[] = [
  // NORTH AMERICA
  {
    id: 'united-states',
    name: 'United States',
    continent: 'North America',
    d: 'M 140,145 L 290,145 L 305,170 L 295,210 L 260,225 L 225,235 L 180,220 L 150,195 L 135,165 Z M 80,70 L 130,70 L 120,110 L 70,105 Z', // Main + Alaska
    center: [220, 185]
  },
  {
    id: 'canada',
    name: 'Canada',
    continent: 'North America',
    d: 'M 130,65 L 310,65 L 340,95 L 310,142 L 140,142 L 125,105 Z M 270,30 L 330,25 L 310,65 L 260,65 Z',
    center: [215, 105]
  },
  {
    id: 'mexico',
    name: 'Mexico',
    continent: 'North America',
    d: 'M 180,220 L 230,230 L 245,260 L 210,275 L 185,250 Z M 160,220 L 175,250 L 165,260 Z',
    center: [210, 250]
  },

  // SOUTH AMERICA
  {
    id: 'brazil',
    name: 'Brazil',
    continent: 'South America',
    d: 'M 290,290 L 375,305 L 380,360 L 340,400 L 305,370 L 280,325 Z',
    center: [335, 345]
  },
  {
    id: 'argentina',
    name: 'Argentina',
    continent: 'South America',
    d: 'M 300,375 L 335,395 L 320,470 L 295,470 L 290,405 Z',
    center: [310, 425]
  },
  {
    id: 'peru',
    name: 'Peru',
    continent: 'South America',
    d: 'M 265,300 L 295,305 L 295,355 L 270,350 Z',
    center: [280, 325]
  },
  {
    id: 'colombia-other-sa',
    name: 'Northern South America',
    continent: 'South America',
    d: 'M 255,275 L 305,275 L 315,300 L 265,295 Z',
    center: [285, 285]
  },
  {
    id: 'chile',
    name: 'Chile',
    continent: 'South America',
    d: 'M 285,355 L 298,355 L 290,475 L 280,470 Z',
    center: [288, 415]
  },

  // EUROPE
  {
    id: 'united-kingdom',
    name: 'United Kingdom',
    continent: 'Europe',
    d: 'M 460,115 L 480,110 L 475,145 L 458,140 Z M 448,125 L 456,122 L 452,138 L 445,135 Z',
    center: [468, 128]
  },
  {
    id: 'france',
    name: 'France',
    continent: 'Europe',
    d: 'M 475,145 L 505,145 L 508,175 L 485,185 L 472,175 Z',
    center: [490, 162]
  },
  {
    id: 'germany',
    name: 'Germany',
    continent: 'Europe',
    d: 'M 505,130 L 530,130 L 532,160 L 505,160 Z',
    center: [518, 145]
  },
  {
    id: 'italy',
    name: 'Italy',
    continent: 'Europe',
    d: 'M 515,165 L 535,165 L 542,198 L 530,205 L 522,185 Z M 518,205 L 532,207 L 525,215 Z',
    center: [528, 185]
  },
  {
    id: 'switzerland',
    name: 'Switzerland',
    continent: 'Europe',
    d: 'M 508,162 L 520,162 L 520,172 L 508,172 Z',
    center: [514, 167]
  },
  {
    id: 'norway',
    name: 'Norway',
    continent: 'Europe',
    d: 'M 500,60 L 525,50 L 540,80 L 515,120 L 498,115 Z',
    center: [515, 85]
  },
  {
    id: 'spain-portugal',
    name: 'Iberian Peninsula',
    continent: 'Europe',
    d: 'M 450,175 L 482,175 L 478,210 L 445,210 Z',
    center: [462, 192]
  },
  {
    id: 'eastern-europe',
    name: 'Eastern Europe',
    continent: 'Europe',
    d: 'M 535,115 L 590,115 L 585,175 L 535,170 Z',
    center: [560, 142]
  },

  // AFRICA
  {
    id: 'egypt',
    name: 'Egypt',
    continent: 'Africa',
    d: 'M 565,205 L 610,205 L 610,245 L 565,245 Z',
    center: [588, 225]
  },
  {
    id: 'south-africa',
    name: 'South Africa',
    continent: 'Africa',
    d: 'M 540,405 L 585,405 L 580,455 L 535,445 Z',
    center: [560, 428]
  },
  {
    id: 'kenya',
    name: 'Kenya',
    continent: 'Africa',
    d: 'M 590,285 L 620,290 L 615,325 L 585,320 Z',
    center: [602, 305]
  },
  {
    id: 'north-africa-west',
    name: 'North Africa',
    continent: 'Africa',
    d: 'M 465,215 L 565,215 L 565,270 L 465,270 Z',
    center: [515, 242]
  },
  {
    id: 'west-africa',
    name: 'West Africa',
    continent: 'Africa',
    d: 'M 460,270 L 530,270 L 525,325 L 475,325 Z',
    center: [495, 298]
  },
  {
    id: 'central-africa',
    name: 'Central Africa',
    continent: 'Africa',
    d: 'M 530,270 L 590,270 L 585,370 L 525,370 Z',
    center: [555, 320]
  },
  {
    id: 'southern-africa-region',
    name: 'Southern Africa',
    continent: 'Africa',
    d: 'M 530,370 L 595,370 L 585,410 L 535,410 Z',
    center: [560, 390]
  },
  {
    id: 'madagascar',
    name: 'Madagascar',
    continent: 'Africa',
    d: 'M 625,365 L 640,360 L 632,420 L 618,415 Z',
    center: [628, 390]
  },

  // ASIA
  {
    id: 'japan',
    name: 'Japan',
    continent: 'Asia',
    d: 'M 875,160 L 890,150 L 900,185 L 870,210 L 865,195 Z M 885,130 L 905,125 L 900,145 L 880,145 Z',
    center: [885, 175]
  },
  {
    id: 'china',
    name: 'China',
    continent: 'Asia',
    d: 'M 720,150 L 850,150 L 855,230 L 805,250 L 750,240 L 710,200 Z',
    center: [785, 195]
  },
  {
    id: 'india',
    name: 'India',
    continent: 'Asia',
    d: 'M 685,210 L 745,210 L 745,260 L 710,310 L 685,260 Z',
    center: [715, 255]
  },
  {
    id: 'south-korea',
    name: 'South Korea',
    continent: 'Asia',
    d: 'M 845,170 L 862,170 L 858,195 L 845,190 Z',
    center: [854, 182]
  },
  {
    id: 'indonesia',
    name: 'Indonesia',
    continent: 'Asia',
    d: 'M 770,325 L 875,325 L 870,350 L 765,345 Z M 790,305 L 830,305 L 825,325 L 785,325 Z M 850,315 L 885,315 L 880,335 L 845,335 Z',
    center: [820, 335]
  },
  {
    id: 'singapore',
    name: 'Singapore',
    continent: 'Asia',
    d: 'M 788,318 L 795,318 L 795,323 L 788,323 Z',
    center: [791, 320]
  },
  {
    id: 'middle-east',
    name: 'Middle East',
    continent: 'Asia',
    d: 'M 590,185 L 680,185 L 680,250 L 615,250 Z',
    center: [640, 218]
  },
  {
    id: 'central-asia-russia',
    name: 'Northern & Central Asia',
    continent: 'Asia',
    d: 'M 590,50 L 920,50 L 880,145 L 720,145 L 590,115 Z',
    center: [750, 95]
  },
  {
    id: 'southeast-asia-mainland',
    name: 'Southeast Asia',
    continent: 'Asia',
    d: 'M 755,245 L 805,245 L 795,315 L 765,300 Z',
    center: [780, 275]
  },

  // OCEANIA
  {
    id: 'australia',
    name: 'Australia',
    continent: 'Oceania',
    d: 'M 820,380 L 935,380 L 945,465 L 830,465 Z M 915,475 L 930,475 L 925,490 L 912,490 Z',
    center: [880, 420]
  },
  {
    id: 'new-zealand',
    name: 'New Zealand',
    continent: 'Oceania',
    d: 'M 975,445 L 990,440 L 980,470 L 970,465 Z M 958,472 L 972,468 L 962,500 L 950,495 Z',
    center: [970, 468]
  },
  {
    id: 'pacific-islands',
    name: 'Pacific Islands',
    continent: 'Oceania',
    d: 'M 880,335 L 940,335 L 935,370 L 880,365 Z',
    center: [910, 350]
  },

  // ANTARCTICA
  {
    id: 'antarctica',
    name: 'Antarctica',
    continent: 'Antarctica',
    d: 'M 50,480 L 950,480 L 920,500 L 80,500 Z',
    center: [500, 490]
  }
];
