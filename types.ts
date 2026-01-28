
export type AppStep = 'home' | 'identification' | 'vote' | 'confirmation' | 'admin';

export interface VoteRecord {
  id: string;
  voterIdentity: string;
  logoId: number;
  timestamp: number;
}

export interface LogoProposal {
  id: number;
  title: string;
  image: string;
  description: string;
}

export const LOGO_PROPOSALS: LogoProposal[] = [
  {
    id: 1,
    title: "Proposition A : L'Innovation Continue",
    image: "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?auto=format&fit=crop&q=80&w=800",
    description: "Un design épuré soulignant notre trajectoire vers le futur."
  },
  {
    id: 2,
    title: "Proposition B : 30 Ans d'Excellence",
    image: "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?auto=format&fit=crop&q=80&w=800",
    description: "Un logo dynamique célébrant notre héritage et nos équipes."
  },
  {
    id: 3,
    title: "Proposition C : Connecter le Monde",
    image: "https://images.unsplash.com/photo-1614850523059-c144c1945f93?auto=format&fit=crop&q=80&w=800",
    description: "Une approche moderne axée sur la connectivité globale."
  }
];
