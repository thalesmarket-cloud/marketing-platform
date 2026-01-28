
import React from 'react';

const Confirmation: React.FC = () => {
  return (
    <div className="max-w-lg mx-auto py-16 text-center space-y-8 animate-fadeIn">
      <div className="inline-flex items-center justify-center w-24 h-24 bg-green-100 text-green-500 rounded-full mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
        </svg>
      </div>

      <div className="space-y-4">
        <h2 className="text-4xl font-extrabold text-slate-900">Merci pour votre participation ! 🎉</h2>
        <p className="text-xl text-slate-600">
          Votre vote a été enregistré avec succès. Le logo gagnant sera dévoilé lors de l'événement anniversaire.
        </p>
      </div>

      <div className="bg-blue-50 border border-blue-100 p-6 rounded-2xl text-left">
        <h4 className="text-[#0074B7] font-bold text-sm uppercase tracking-wider mb-2">Prochaines étapes</h4>
        <ul className="text-slate-600 text-sm space-y-2 list-disc list-inside">
          <li>Clôture des votes : Vendredi prochain à 18h</li>
          <li>Analyse des résultats par le comité de direction</li>
          <li>Inauguration officielle de la nouvelle identité visuelle</li>
        </ul>
      </div>

      <button
        onClick={() => window.location.reload()}
        className="text-[#0074B7] font-semibold hover:underline"
      >
        Retour à l'accueil
      </button>
    </div>
  );
};

export default Confirmation;
