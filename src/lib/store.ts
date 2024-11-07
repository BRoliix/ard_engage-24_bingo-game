export interface LeaderboardEntry {
    name: string;
    timestamp: string;
  }
  
  // In-memory storage
  let leaderboardStore: LeaderboardEntry[] = [];
  
  export const addEntry = (name: string): void => {
    leaderboardStore.unshift({
      name,
      timestamp: new Date().toISOString()
    });
  };
  
  export const getEntries = (): LeaderboardEntry[] => {
    return leaderboardStore;
  };
  
  export { leaderboardStore };