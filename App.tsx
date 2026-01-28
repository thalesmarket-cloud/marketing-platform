
import React, { useState, useEffect, useCallback } from 'react';
import { AppStep, VoteRecord } from './types';
import { saveVote, getVotes } from './services/storage';
import Layout from './components/Layout';
import Home from './components/Home';
import Identification from './components/Identification';
import VotingSession from './components/VotingSession';
import Confirmation from './components/Confirmation';
import AdminDashboard from './components/AdminDashboard';

const App: React.FC = () => {
  const [step, setStep] = useState<AppStep>('home');
  const [voterIdentity, setVoterIdentity] = useState('');
  const [error, setError] = useState<string | undefined>();
  const [isAdmin, setIsAdmin] = useState(false);

  // Simple admin auth check
  const handleAdminAccess = useCallback(() => {
    const pass = window.prompt("Veuillez saisir le mot de passe administrateur :");
    if (pass === "Thales30") {
      setIsAdmin(true);
      setStep('admin');
    } else if (pass !== null) {
      alert("Mot de passe incorrect.");
    }
  }, []);

  const handleStartVote = () => setStep('identification');
  
  const handleIdentitySubmitted = (identity: string) => {
    // Basic check for duplicates
    const votes = getVotes();
    const alreadyVoted = votes.some(v => v.voterIdentity.toLowerCase() === identity.toLowerCase());
    
    if (alreadyVoted) {
      setError("Vous avez déjà participé à ce vote. Un seul vote par personne est autorisé.");
    } else {
      setVoterIdentity(identity);
      setError(undefined);
      setStep('vote');
    }
  };

  const handleVoteSubmit = (logoId: number) => {
    const newVote: VoteRecord = {
      id: crypto.randomUUID(),
      voterIdentity,
      logoId,
      timestamp: Date.now()
    };

    const success = saveVote(newVote);
    if (success) {
      setStep('confirmation');
    } else {
      setError("Une erreur est survenue lors de l'enregistrement de votre vote.");
      setStep('identification');
    }
  };

  const renderStep = () => {
    switch (step) {
      case 'home':
        return <Home onStart={handleStartVote} />;
      case 'identification':
        return (
          <Identification 
            onContinue={handleIdentitySubmitted} 
            onBack={() => setStep('home')} 
            error={error}
          />
        );
      case 'vote':
        return <VotingSession voterName={voterIdentity} onVote={handleVoteSubmit} />;
      case 'confirmation':
        return <Confirmation />;
      case 'admin':
        return <AdminDashboard onBack={() => setStep('home')} />;
      default:
        return <Home onStart={handleStartVote} />;
    }
  };

  return (
    <Layout onAdminClick={handleAdminAccess}>
      <div className="transition-all duration-300">
        {renderStep()}
      </div>
    </Layout>
  );
};

export default App;
