
import { VoteRecord } from '../types.js';

const STORAGE_KEY = 'thales_30_votes';

export const getVotes = (): VoteRecord[] => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

export const saveVote = (vote: VoteRecord): boolean => {
  const votes = getVotes();
  
  // Check if identity already exists
  const alreadyVoted = votes.some(v => v.voterIdentity.toLowerCase() === vote.voterIdentity.toLowerCase());
  
  if (alreadyVoted) {
    return false;
  }
  
  votes.push(vote);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(votes));
  return true;
};

export const clearVotes = () => {
  localStorage.removeItem(STORAGE_KEY);
};
