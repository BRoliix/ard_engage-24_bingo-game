export interface LeaderboardEntry {
    name: string;
    timestamp: string;
  }
  
  // In-memory storage
  export const leaderboardStore: LeaderboardEntry[] = [];
  
  // Add entry function
  export const addEntry = (name: string) => {
    leaderboardStore.unshift({
      name,
      timestamp: new Date().toISOString()
    });
  };
  
  // Get entries function
  export const getEntries = () => {
    return [...leaderboardStore];
  };