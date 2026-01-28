
import React, { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, PieChart, Pie } from 'recharts';
import { getVotes, clearVotes } from '../services/storage';
import { LOGO_PROPOSALS } from '../types';

interface AdminDashboardProps {
  onBack: () => void;
}

const COLORS = ['#0074B7', '#1BB4EA', '#64748b'];

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onBack }) => {
  const votes = useMemo(() => getVotes(), []);
  
  const stats = useMemo(() => {
    const counts = LOGO_PROPOSALS.map(logo => {
      const count = votes.filter(v => v.logoId === logo.id).length;
      return {
        name: logo.title.split(':')[0].trim(),
        fullName: logo.title,
        value: count,
        percentage: votes.length > 0 ? Math.round((count / votes.length) * 100) : 0
      };
    });
    return counts;
  }, [votes]);

  const handleClear = () => {
    if (window.confirm("Êtes-vous sûr de vouloir réinitialiser TOUS les votes ? Cette action est irréversible.")) {
      clearVotes();
      window.location.reload();
    }
  };

  return (
    <div className="space-y-8 py-6 animate-fadeIn">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">Tableau de bord administrateur</h2>
          <p className="text-slate-500">Statistiques en temps réel des votes pour le logo des 30 ans.</p>
        </div>
        <div className="flex space-x-3">
          <button 
            onClick={handleClear}
            className="px-4 py-2 text-red-600 hover:bg-red-50 font-semibold rounded-lg transition-colors border border-red-100"
          >
            Réinitialiser
          </button>
          <button 
            onClick={onBack}
            className="px-4 py-2 bg-slate-800 text-white font-semibold rounded-lg hover:bg-slate-900 transition-colors"
          >
            Fermer
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center justify-center">
          <span className="text-slate-400 text-sm font-bold uppercase tracking-wider mb-2">Total Votes</span>
          <span className="text-5xl font-black text-[#0074B7]">{votes.length}</span>
        </div>
        
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className="text-slate-400 text-xs font-bold uppercase block">{stat.name}</span>
                <span className="text-xl font-bold text-slate-900">{stat.value} votes</span>
              </div>
              <span className="text-2xl font-black text-[#1BB4EA]">{stat.percentage}%</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2">
              <div 
                className="h-full rounded-full" 
                style={{ width: `${stat.percentage}%`, backgroundColor: COLORS[idx % COLORS.length] }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="text-lg font-bold text-slate-900 mb-6">Répartition par proposition</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip 
                  cursor={{fill: '#f8fafc'}}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="value" radius={[8, 8, 0, 0]} barSize={50}>
                  {stats.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="text-lg font-bold text-slate-900 mb-6">Engagement global</h3>
          <div className="h-[300px] flex items-center justify-center">
            {votes.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={stats}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {stats.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="text-slate-400 italic">Aucune donnée disponible</div>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-50 bg-slate-50/50">
          <h3 className="text-lg font-bold text-slate-900">Journal des votes récents</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-xs font-bold text-slate-400 uppercase tracking-wider border-b">
                <th className="px-6 py-4">Participant</th>
                <th className="px-6 py-4">Proposition</th>
                <th className="px-6 py-4">Date & Heure</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {votes.length === 0 ? (
                <tr>
                  <td colSpan={3} className="px-6 py-12 text-center text-slate-400 italic">
                    Aucun vote enregistré pour le moment.
                  </td>
                </tr>
              ) : (
                [...votes].reverse().slice(0, 10).map((vote) => (
                  <tr key={vote.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-slate-900">{vote.voterIdentity}</td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-blue-50 text-[#0074B7] rounded-full text-xs font-bold">
                        {LOGO_PROPOSALS.find(l => l.id === vote.logoId)?.title.split(':')[0]}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-500">
                      {new Date(vote.timestamp).toLocaleString('fr-FR')}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
