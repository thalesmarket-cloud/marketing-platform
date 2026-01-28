
import React from 'react';

interface HomeProps {
  onStart: () => void;
}

const Home: React.FC<HomeProps> = ({ onStart }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center space-y-8 animate-fadeIn py-12">
      <div className="relative">
        <div className="absolute -inset-1 bg-gradient-to-r from-[#0074B7] to-[#1BB4EA] rounded-full blur opacity-25"></div>
        <div className="relative bg-white p-8 rounded-full border-2 border-slate-100 shadow-xl">
           <span className="text-6xl font-black text-[#0074B7]">30</span>
           <span className="block text-sm font-bold text-[#1BB4EA] uppercase tracking-widest mt-1">Ans</span>
        </div>
      </div>

      <div className="space-y-4 max-w-2xl">
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
          Votez pour le logo des <span className="text-[#0074B7]">30 ans</span> de Thalès Informatique
        </h1>
        <p className="text-lg text-slate-600 leading-relaxed">
          Votre avis compte ! Choisissez le logo qui représentera nos 30 ans d'existence, d'innovation et de succès collectifs.
        </p>
      </div>

      <button
        onClick={onStart}
        className="group relative inline-flex items-center justify-center px-10 py-4 font-bold text-white transition-all duration-200 bg-[#0074B7] font-pj rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0074B7] hover:bg-[#005a8d] shadow-lg"
      >
        Commencer le vote
        <svg xmlns="http://www.w3.org/2000/svg" className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </button>

      <div className="pt-12 grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-3xl opacity-60">
        <div className="flex flex-col items-center p-4 bg-white rounded-lg border border-slate-100">
           <span className="text-2xl mb-2">👤</span>
           <span className="text-xs font-bold uppercase">1. Identification</span>
        </div>
        <div className="flex flex-col items-center p-4 bg-white rounded-lg border border-slate-100">
           <span className="text-2xl mb-2">🗳️</span>
           <span className="text-xs font-bold uppercase">2. Sélection</span>
        </div>
        <div className="flex flex-col items-center p-4 bg-white rounded-lg border border-slate-100">
           <span className="text-2xl mb-2">✅</span>
           <span className="text-xs font-bold uppercase">3. Validation</span>
        </div>
      </div>
    </div>
  );
};

export default Home;
