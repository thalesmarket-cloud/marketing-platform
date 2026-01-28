
import React, { useState } from 'react';
import { LOGO_PROPOSALS, LogoProposal } from '../types.js';

interface VotingSessionProps {
  voterName: string;
  onVote: (logoId: number) => void;
}

const VotingSession: React.FC<VotingSessionProps> = ({ voterName, onVote }) => {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  return (
    <div className="space-y-10 py-6 animate-fadeIn">
      <div className="text-center space-y-2">
        <span className="inline-block px-3 py-1 bg-blue-50 text-[#0074B7] rounded-full text-xs font-bold uppercase tracking-wider mb-2">
          Session de vote active
        </span>
        <h2 className="text-3xl font-bold text-slate-900">Bienvenue, {voterName}</h2>
        <p className="text-slate-500">Sélectionnez votre proposition favorite parmi les trois designs ci-dessous.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {LOGO_PROPOSALS.map((logo) => (
          <div 
            key={logo.id}
            className={`group relative bg-white rounded-3xl overflow-hidden border-2 transition-all duration-300 cursor-pointer shadow-sm hover:shadow-2xl ${
              selectedId === logo.id ? 'border-[#0074B7] scale-[1.02]' : 'border-slate-100 hover:border-blue-200'
            }`}
            onClick={() => setSelectedId(logo.id)}
          >
            <div className="relative aspect-video overflow-hidden bg-slate-100">
              <img 
                src={logo.image} 
                alt={logo.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
            
            <div className="p-6 space-y-4">
              <h3 className="text-xl font-bold text-slate-900 leading-tight">{logo.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                {logo.description}
              </p>
              
              <div className="flex items-center justify-between pt-4">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onVote(logo.id);
                  }}
                  className={`flex-grow py-3 px-4 rounded-xl font-bold transition-all ${
                    selectedId === logo.id 
                      ? 'bg-[#0074B7] text-white shadow-lg' 
                      : 'bg-slate-50 text-slate-500 hover:bg-[#1BB4EA] hover:text-white'
                  }`}
                >
                  Voter pour ce logo
                </button>
              </div>
            </div>

            {selectedId === logo.id && (
              <div className="absolute top-4 right-4 bg-[#0074B7] text-white p-2 rounded-full shadow-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>
      
      <div className="mt-8 text-center text-xs text-slate-400 italic">
        * Un seul vote par collaborateur autorisé. Vos données sont traitées de manière sécurisée.
      </div>
    </div>
  );
};

export default VotingSession;
