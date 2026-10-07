import React, { useState } from 'react';
import { 
  X, Plus, Check, Trophy, ArrowRight, 
  BarChart2, Users, Maximize2, DollarSign, Heart, Building
} from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { Country } from '../../types/geo';
import { COUNTRIES_DATA } from '../../data/countries';
import { PageView } from '../common/Header';

interface ComparisonTableProps {
  initialCountries?: Country[];
  onNavigate: (page: PageView, param?: string) => void;
}

export const ComparisonTable: React.FC<ComparisonTableProps> = ({
  initialCountries,
  onNavigate
}) => {
  const [selectedIds, setSelectedIds] = useState<string[]>(() => {
    if (initialCountries && initialCountries.length > 0) {
      return initialCountries.slice(0, 3).map((c) => c.id);
    }
    // Defaults: Japan and Brazil
    return ['japan', 'brazil', 'germany'];
  });

  const selectedCountries = selectedIds
    .map((id) => COUNTRIES_DATA.find((c) => c.id === id))
    .filter(Boolean) as Country[];

  const handleAddCountry = (id: string) => {
    if (selectedIds.length < 3 && !selectedIds.includes(id)) {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const handleRemoveCountry = (id: string) => {
    if (selectedIds.length > 1) {
      setSelectedIds(selectedIds.filter((cid) => cid !== id));
    }
  };

  // Recharts comparative dataset
  const chartData = [
    {
      metric: 'Population (M)',
      ...selectedCountries.reduce((acc, c) => ({
        ...acc,
        [c.name]: Number((c.population / 1_000_000).toFixed(1))
      }), {})
    },
    {
      metric: 'Area (k km²)',
      ...selectedCountries.reduce((acc, c) => ({
        ...acc,
        [c.name]: Number((c.area / 1_000).toFixed(0))
      }), {})
    },
    {
      metric: 'GDP ($B)',
      ...selectedCountries.reduce((acc, c) => ({
        ...acc,
        [c.name]: c.gdp
      }), {})
    },
    {
      metric: 'GDP/Cap ($k)',
      ...selectedCountries.reduce((acc, c) => ({
        ...acc,
        [c.name]: Number((c.gdpPerCapita / 1000).toFixed(1))
      }), {})
    },
    {
      metric: 'Life Exp (yrs)',
      ...selectedCountries.reduce((acc, c) => ({
        ...acc,
        [c.name]: c.lifeExpectancy
      }), {})
    }
  ];

  const colors = ['#1683FF', '#32D583', '#35C7FF'];

  // Comparison metrics rows
  const metrics = [
    {
      name: 'Capital City',
      getValue: (c: Country) => c.capital,
      type: 'text'
    },
    {
      name: 'Continent & Region',
      getValue: (c: Country) => `${c.continent} (${c.region})`,
      type: 'text'
    },
    {
      name: 'Total Population',
      getValue: (c: Country) => `${(c.population / 1_000_000).toFixed(2)}M people`,
      getNumeric: (c: Country) => c.population,
      type: 'numeric'
    },
    {
      name: 'Land Area',
      getValue: (c: Country) => `${c.area.toLocaleString()} sq km`,
      getNumeric: (c: Country) => c.area,
      type: 'numeric'
    },
    {
      name: 'Nominal GDP',
      getValue: (c: Country) => `$${c.gdp.toLocaleString()} Billion`,
      getNumeric: (c: Country) => c.gdp,
      type: 'numeric'
    },
    {
      name: 'GDP per Capita',
      getValue: (c: Country) => `$${c.gdpPerCapita.toLocaleString()}`,
      getNumeric: (c: Country) => c.gdpPerCapita,
      type: 'numeric'
    },
    {
      name: 'Population Density',
      getValue: (c: Country) => `${c.populationDensity} people / km²`,
      getNumeric: (c: Country) => c.populationDensity,
      type: 'numeric'
    },
    {
      name: 'Life Expectancy',
      getValue: (c: Country) => `${c.lifeExpectancy} years`,
      getNumeric: (c: Country) => c.lifeExpectancy,
      type: 'numeric'
    },
    {
      name: 'Urbanization Rate',
      getValue: (c: Country) => `${c.urbanPopulationPercent}%`,
      getNumeric: (c: Country) => c.urbanPopulationPercent,
      type: 'numeric'
    },
    {
      name: 'Currency',
      getValue: (c: Country) => `${c.currency.name} (${c.currency.code} ${c.currency.symbol})`,
      type: 'text'
    },
    {
      name: 'Official Languages',
      getValue: (c: Country) => c.officialLanguages.join(', '),
      type: 'text'
    },
    {
      name: 'Highest Elevation',
      getValue: (c: Country) => `${c.highestPoint.name} (${c.highestPoint.elevation}m)`,
      getNumeric: (c: Country) => c.highestPoint.elevation,
      type: 'numeric'
    },
    {
      name: 'Climate Classification',
      getValue: (c: Country) => `${c.climateZone} · ${c.climate.slice(0, 60)}...`,
      type: 'text'
    },
    {
      name: 'Form of Government',
      getValue: (c: Country) => c.government,
      type: 'text'
    }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Header & Selector Area */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight font-['Space_Grotesk']">
            Compare Sovereign Nations
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Analyze geopolitical, demographic, and socioeconomic indicators side by side (2 to 3 nations).
          </p>
        </div>

        {/* Add Country Dropdown if < 3 */}
        {selectedIds.length < 3 && (
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400">Add nation:</span>
            <select
              onChange={(e) => {
                if (e.target.value) {
                  handleAddCountry(e.target.value);
                  e.target.value = '';
                }
              }}
              defaultValue=""
              aria-label="Add nation to compare"
              className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-[#1683FF]"
            >
              <option value="" disabled>Select country to add...</option>
              {COUNTRIES_DATA.filter((c) => !selectedIds.includes(c.id)).map((c) => (
                <option key={c.id} value={c.id}>
                  {c.flagEmoji} {c.name}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Selected Nations Cards Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {selectedCountries.map((country, index) => (
          <div
            key={country.id}
            className="p-4 rounded-2xl bg-[#091526] border border-slate-800 shadow-xl flex items-center justify-between relative group"
            style={{ borderLeftColor: colors[index], borderLeftWidth: 4 }}
          >
            <div className="flex items-center gap-3">
              <span className="text-3xl">{country.flagEmoji}</span>
              <div>
                <h3 className="text-base font-bold text-white font-['Space_Grotesk']">{country.name}</h3>
                <p className="text-xs text-slate-400">{country.capital} · {country.continent}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => onNavigate('country-detail', country.id)}
                className="p-1.5 text-slate-400 hover:text-[#35C7FF] rounded-lg transition-colors"
                title="View Dossier"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
              {selectedCountries.length > 2 && (
                <button
                  onClick={() => handleRemoveCountry(country.id)}
                  className="p-1.5 text-slate-400 hover:text-red-400 rounded-lg transition-colors"
                  title="Remove from comparison"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Comparative Visual Chart */}
      <div className="p-6 rounded-3xl bg-[#091526]/90 border border-slate-800 shadow-2xl">
        <div className="flex items-center gap-2 mb-6">
          <BarChart2 className="w-5 h-5 text-[#35C7FF]" />
          <h3 className="text-base font-bold text-white font-['Space_Grotesk']">
            Visual Relative Performance Metrics
          </h3>
        </div>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <XAxis dataKey="metric" stroke="#64748B" fontSize={11} tickLine={false} />
              <YAxis stroke="#64748B" fontSize={11} tickLine={false} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#091526', 
                  borderColor: '#1E293B',
                  borderRadius: 12,
                  fontSize: 12,
                  color: '#FFFFFF'
                }} 
              />
              <Legend wrapperStyle={{ fontSize: 12, paddingTop: 10 }} />
              {selectedCountries.map((c, i) => (
                <Bar 
                  key={c.name} 
                  dataKey={c.name} 
                  fill={colors[i]} 
                  radius={[4, 4, 0, 0]} 
                />
              ))}
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Side-by-side Detailed Comparison Table */}
      <div className="rounded-3xl bg-[#091526]/90 border border-slate-800 shadow-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-800 bg-[#06101E]">
                <th className="py-4 px-6 font-semibold uppercase tracking-wider text-slate-400 w-1/4">
                  Indicator
                </th>
                {selectedCountries.map((c, i) => (
                  <th key={c.id} className="py-4 px-6 text-sm font-bold text-white">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{c.flagEmoji}</span>
                      <span className="font-['Space_Grotesk']">{c.name}</span>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {metrics.map((m, idx) => {
                // Find highest value if numeric
                let highestCountryId: string | null = null;
                if (m.type === 'numeric' && m.getNumeric) {
                  let maxVal = -Infinity;
                  selectedCountries.forEach((c) => {
                    const val = m.getNumeric!(c);
                    if (val > maxVal) {
                      maxVal = val;
                      highestCountryId = c.id;
                    }
                  });
                }

                return (
                  <tr key={idx} className="hover:bg-slate-800/30 transition-colors">
                    <td className="py-3.5 px-6 font-medium text-slate-400">
                      {m.name}
                    </td>
                    {selectedCountries.map((c) => {
                      const isHighest = m.type === 'numeric' && c.id === highestCountryId;
                      return (
                        <td key={c.id} className="py-3.5 px-6 text-slate-200">
                          <div className="flex items-center gap-2">
                            <span className={isHighest ? 'text-[#32D583] font-bold font-mono' : 'font-mono'}>
                              {m.getValue(c)}
                            </span>
                            {isHighest && (
                              <Trophy className="w-3.5 h-3.5 text-[#32D583] shrink-0" />
                            )}
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
