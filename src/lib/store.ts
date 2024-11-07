export interface LeaderboardEntry {
    name: string;
    timestamp: string;
  }
  
  // Use const instead of let for the store
  export const leaderboardStore: LeaderboardEntry[] = [];
  
  // Add entry function
  export const addEntry = (name: string): void => {
    leaderboardStore.unshift({
      name,
      timestamp: new Date().toISOString()
    });
  };
  
  // Get entries function
  export const getEntries = (): LeaderboardEntry[] => {
    return [...leaderboardStore];
  };