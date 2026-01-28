
import React, { useState } from 'react';

interface IdentificationProps {
  onContinue: (identity: string) => void;
  onBack: () => void;
  error?: string;
}

const Identification: React.FC<IdentificationProps> = ({ onContinue, onBack, error }) => {
  const [identity, setIdentity] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (identity.trim().length >= 3) {
      onContinue(identity.trim());
    }
  };

  return (
    <div className="max-w-md mx-auto py-12 animate-fadeIn">
      <div className="bg-white p-8 rounded-2xl shadow-xl border border-slate-100">
        <h2 className="text-2xl font-bold text-slate-900 mb-6 text-center">Identifiez-vous</h2>
        <p className="text-slate-500 text-sm text-center mb-8">
          Pour garantir l'intégrité du vote, veuillez saisir votre adresse email professionnelle ou votre nom complet.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="identity" className="block text-sm font-semibold text-slate-700 mb-2">
              Email ou Nom & Prénom
            </label>
            <input
              type="text"
              id="identity"
              required
              placeholder="ex: jean.dupont@thales.com"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#0074B7] focus:border-transparent outline-none transition-all"
              value={identity}
              onChange={(e) => setIdentity(e.target.value)}
            />
            {error && <p className="mt-2 text-sm text-red-500 font-medium">{error}</p>}
          </div>

          <button
            type="submit"
            disabled={identity.trim().length < 3}
            className="w-full py-4 bg-[#0074B7] text-white font-bold rounded-xl hover:bg-[#005a8d] transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
          >
            Accéder aux propositions
          </button>
        </form>

        <button
          onClick={onBack}
          className="w-full mt-4 text-sm font-semibold text-slate-400 hover:text-slate-600 transition-colors"
        >
          Retour à l'accueil
        </button>
      </div>
    </div>
  );
};

export default Identification;
