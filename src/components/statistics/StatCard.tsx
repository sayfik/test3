import React, { useState } from 'react';
import { 
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, 
  PieChart, Pie, Cell, LineChart, Line, Legend 
} from 'recharts';
import { 
  Users, Maximize2, DollarSign, Globe, 
  Activity, TrendingUp, Compass, Award 
} from 'lucide-react';
import { 
  CONTINENTS_STATS, 
  TOP_POPULATION_DATA, 
  TOP_AREA_DATA, 
  TOP_GDP_DATA, 
  DENSITY_DATA, 
  LIFE_EXPECTANCY_TRENDS 
} from '../../data/stats';
import { PageView } from '../common/Header';

interface StatisticsViewProps {
  onNavigate: (page: PageView, param?: string) => void;
}

export const StatisticsView: React.FC<StatisticsViewProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'population' | 'area' | 'economy' | 'trends'>('overview');

  const donutColors = ['#1683FF', '#32D583', '#35C7FF', '#F59E0B', '#EC4899', '#8B5CF6', '#64748B'];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Page Title & Intro */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight font-['Space_Grotesk']">
            Planetary Statistics & Global Analytics
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Visualizing 8+ billion people across 7 continents, 195 sovereign nations, and $105+ trillion global economy.
          </p>
        </div>

        {/* Tab switchers */}
        <div className="flex items-center gap-1 p-1 bg-slate-900 border border-slate-800 rounded-xl overflow-x-auto scrollbar-none">
          {[
            { id: 'overview', label: 'Continents' },
            { id: 'population', label: 'Population' },
            { id: 'area', label: 'Land Area' },
            { id: 'economy', label: 'Global GDP' },
            { id: 'trends', label: 'Life Trends' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-[#1683FF] text-white shadow-md shadow-blue-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Top 4 Quick Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Planetary Population', value: '8.12 Billion', sub: '+0.8% annual growth', icon: <Users className="w-5 h-5 text-[#1683FF]" /> },
          { label: 'Total Landmass Area', value: '148.9M km²', sub: '29.2% of Earth surface', icon: <Maximize2 className="w-5 h-5 text-[#35C7FF]" /> },
          { label: 'Nominal World GDP', value: '$105.4 Trillion', sub: 'Global economic output', icon: <DollarSign className="w-5 h-5 text-[#32D583]" /> },
          { label: 'Global Life Expectancy', value: '73.9 Years', sub: '+17.5 years since 1970', icon: <Activity className="w-5 h-5 text-amber-400" /> },
        ].map((item, i) => (
          <div key={i} className="p-5 rounded-2xl bg-[#091526] border border-slate-800 shadow-xl">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">{item.label}</span>
              {item.icon}
            </div>
            <div className="text-2xl font-bold text-white font-mono">{item.value}</div>
            <p className="text-xs text-slate-400 mt-1">{item.sub}</p>
          </div>
        ))}
      </div>

      {/* Main Visualizations based on activeTab */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Donut Chart: Continental Population Share */}
          <div className="p-6 rounded-3xl bg-[#091526]/90 border border-slate-800 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white font-['Space_Grotesk']">
                  Continental Population Share
                </h3>
                <p className="text-xs text-slate-400">Distribution of 8B+ human population across continents.</p>
              </div>
              <Globe className="w-5 h-5 text-[#1683FF]" />
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={CONTINENTS_STATS.filter(c => c.population > 10000)}
                    dataKey="population"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={95}
                    paddingAngle={3}
                  >
                    {CONTINENTS_STATS.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={donutColors[index % donutColors.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value: any) => [`${(Number(value) / 1_000_000_000).toFixed(2)} Billion`, 'Population']}
                    contentStyle={{ backgroundColor: '#091526', borderColor: '#1E293B', borderRadius: 12, color: '#fff' }} 
                  />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Donut Chart: Land Area Distribution */}
          <div className="p-6 rounded-3xl bg-[#091526]/90 border border-slate-800 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white font-['Space_Grotesk']">
                  Continental Land Area (km²)
                </h3>
                <p className="text-xs text-slate-400">Total terrestrial square kilometers by continental shelf.</p>
              </div>
              <Maximize2 className="w-5 h-5 text-[#35C7FF]" />
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={CONTINENTS_STATS}
                    dataKey="area"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={95}
                    paddingAngle={3}
                  >
                    {CONTINENTS_STATS.map((entry, index) => (
                      <Cell key={`cell-area-${index}`} fill={donutColors[index % donutColors.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value: any) => [`${(Number(value) / 1_000_000).toFixed(1)}M km²`, 'Area']}
                    contentStyle={{ backgroundColor: '#091526', borderColor: '#1E293B', borderRadius: 12, color: '#fff' }} 
                  />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Continents Table Breakdown */}
          <div className="lg:col-span-2 rounded-3xl bg-[#091526]/90 border border-slate-800 shadow-2xl overflow-hidden p-6">
            <h3 className="text-base font-bold text-white font-['Space_Grotesk'] mb-4">
              Comprehensive Continental Data Matrix
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 bg-[#06101E] text-slate-400">
                    <th className="py-3 px-4 font-semibold">Continent</th>
                    <th className="py-3 px-4 font-semibold">Sovereign States</th>
                    <th className="py-3 px-4 font-semibold">Population</th>
                    <th className="py-3 px-4 font-semibold">Total Area</th>
                    <th className="py-3 px-4 font-semibold">Continental GDP</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-mono">
                  {CONTINENTS_STATS.map((cont, i) => (
                    <tr key={cont.name} className="hover:bg-slate-800/30">
                      <td className="py-3 px-4 font-sans font-bold text-white flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: donutColors[i] }} />
                        <span>{cont.name}</span>
                      </td>
                      <td className="py-3 px-4 text-slate-300">{cont.countriesCount} nations</td>
                      <td className="py-3 px-4 text-slate-200">
                        {cont.population > 10000 ? `${(cont.population / 1_000_000).toFixed(0)}M` : cont.population.toLocaleString()}
                      </td>
                      <td className="py-3 px-4 text-slate-300">{(cont.area / 1_000_000).toFixed(2)}M km²</td>
                      <td className="py-3 px-4 text-[#32D583]">${cont.gdp.toLocaleString()}B</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Population Tab */}
      {activeTab === 'population' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-[#091526]/90 border border-slate-800 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-bold text-white font-['Space_Grotesk']">
                  Top 10 Most Populous Countries
                </h3>
                <p className="text-xs text-slate-400">Measured in millions of permanent citizens (2026 data).</p>
              </div>
              <Users className="w-5 h-5 text-[#1683FF]" />
            </div>

            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={TOP_POPULATION_DATA} margin={{ top: 10, right: 10, left: -10, bottom: 20 }}>
                  <XAxis dataKey="name" stroke="#64748B" fontSize={11} angle={-15} textAnchor="end" />
                  <YAxis stroke="#64748B" fontSize={11} unit="M" />
                  <Tooltip 
                    formatter={(val) => [`${val} Million people`, 'Population']}
                    contentStyle={{ backgroundColor: '#091526', borderColor: '#1E293B', borderRadius: 12, color: '#fff' }} 
                  />
                  <Bar dataKey="population" fill="#1683FF" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Density Comparison */}
          <div className="p-6 rounded-3xl bg-[#091526]/90 border border-slate-800 shadow-2xl">
            <h3 className="text-base font-bold text-white font-['Space_Grotesk'] mb-2">
              Highest Population Density (People per km²)
            </h3>
            <p className="text-xs text-slate-400 mb-4">Countries and city-states with extreme territorial concentration.</p>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              {DENSITY_DATA.map((d) => (
                <div key={d.name} className="p-3 rounded-xl bg-[#050C17] border border-slate-800 text-center">
                  <span className="text-2xl block mb-1">{d.flag}</span>
                  <div className="text-xs font-bold text-white truncate">{d.name}</div>
                  <div className="text-sm font-mono font-extrabold text-[#35C7FF] mt-1">
                    {d.density.toLocaleString()}
                  </div>
                  <div className="text-[10px] text-slate-500">per km²</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Land Area Tab */}
      {activeTab === 'area' && (
        <div className="p-6 rounded-3xl bg-[#091526]/90 border border-slate-800 shadow-2xl space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-white font-['Space_Grotesk']">
                Largest Countries by Geographic Land Area
              </h3>
              <p className="text-xs text-slate-400">Ranked by total territory in thousands of square kilometers (k km²).</p>
            </div>
            <Maximize2 className="w-5 h-5 text-[#35C7FF]" />
          </div>

          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={TOP_AREA_DATA} margin={{ top: 10, right: 10, left: -10, bottom: 20 }}>
                <XAxis dataKey="name" stroke="#64748B" fontSize={11} angle={-15} textAnchor="end" />
                <YAxis stroke="#64748B" fontSize={11} unit="k km²" />
                <Tooltip 
                  formatter={(val) => [`${val} Thousand km²`, 'Area']}
                  contentStyle={{ backgroundColor: '#091526', borderColor: '#1E293B', borderRadius: 12, color: '#fff' }} 
                />
                <Bar dataKey="area" fill="#35C7FF" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Economy Tab */}
      {activeTab === 'economy' && (
        <div className="p-6 rounded-3xl bg-[#091526]/90 border border-slate-800 shadow-2xl space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-white font-['Space_Grotesk']">
                Top 10 Global Nominal Economies
              </h3>
              <p className="text-xs text-slate-400">Gross Domestic Product in Billions of United States Dollars ($B).</p>
            </div>
            <DollarSign className="w-5 h-5 text-[#32D583]" />
          </div>

          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={TOP_GDP_DATA} margin={{ top: 10, right: 10, left: -10, bottom: 20 }}>
                <XAxis dataKey="name" stroke="#64748B" fontSize={11} angle={-15} textAnchor="end" />
                <YAxis stroke="#64748B" fontSize={11} unit="$B" />
                <Tooltip 
                  formatter={(val) => [`$${val} Billion USD`, 'Nominal GDP']}
                  contentStyle={{ backgroundColor: '#091526', borderColor: '#1E293B', borderRadius: 12, color: '#fff' }} 
                />
                <Bar dataKey="gdp" fill="#32D583" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Trends Tab (Life Expectancy) */}
      {activeTab === 'trends' && (
        <div className="p-6 rounded-3xl bg-[#091526]/90 border border-slate-800 shadow-2xl space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-white font-['Space_Grotesk']">
                Global Life Expectancy Evolution (1970–2026)
              </h3>
              <p className="text-xs text-slate-400">Mean life expectancy at birth across major world regions.</p>
            </div>
            <Activity className="w-5 h-5 text-purple-400" />
          </div>

          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={LIFE_EXPECTANCY_TRENDS} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <XAxis dataKey="year" stroke="#64748B" fontSize={11} />
                <YAxis stroke="#64748B" fontSize={11} domain={[40, 90]} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#091526', borderColor: '#1E293B', borderRadius: 12, color: '#fff' }} 
                />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Line type="monotone" dataKey="global" name="Global Average" stroke="#FFFFFF" strokeWidth={2.5} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="europe" name="Europe" stroke="#35C7FF" strokeWidth={1.8} />
                <Line type="monotone" dataKey="americas" name="Americas" stroke="#1683FF" strokeWidth={1.8} />
                <Line type="monotone" dataKey="asia" name="Asia" stroke="#32D583" strokeWidth={1.8} />
                <Line type="monotone" dataKey="africa" name="Africa" stroke="#F59E0B" strokeWidth={1.8} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
};
