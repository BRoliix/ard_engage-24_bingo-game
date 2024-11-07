'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

interface LeaderboardEntry {
  _id?: string;
  name: string;
  timestamp: string;
}

export default function LeaderBoard() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await fetch('/api/leaderboard');
      if (!response.ok) {
        throw new Error('Failed to fetch leaderboard');
      }
      const data = await response.json();
      // Sort by timestamp
      const sortedData = data.sort((a: LeaderboardEntry, b: LeaderboardEntry) => 
        new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
      );
      setLeaderboard(sortedData);
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
      setError('Failed to load leaderboard. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });
  };

  return (
    <div className="min-h-screen bg-[#1A1A1A] relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 w-full h-full">
        <div className="absolute inset-0 opacity-30">
          <div className="animate-float-slow absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-[#40E0D0] blur-3xl"></div>
          <div className="animate-float-medium absolute top-1/2 right-1/4 w-96 h-96 rounded-full bg-[#FF9E9E] blur-3xl"></div>
          <div className="animate-float-fast absolute bottom-1/4 left-1/3 w-96 h-96 rounded-full bg-[#F3D77D] blur-3xl"></div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#1A1A1A]/50 to-[#1A1A1A]"></div>
      </div>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-[#1A1A1A]/95 backdrop-blur-sm z-50 border-b border-[#40E0D0]/20">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl md:text-3xl font-bold">
            <span className="text-[#F3D77D]">Leader</span>
            <span className="text-[#40E0D0]">board</span>
            <span className="text-[#FF9E9E]">&apos;24</span>
          </h1>
          <Link 
            href="/bingo"
            className="text-[#40E0D0] hover:text-[#F3D77D] transition-colors duration-300"
          >
            Back to Game
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 pt-24 px-4 pb-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-[#2A2A2A] rounded-xl border-2 border-[#40E0D0]/30 shadow-lg overflow-hidden">
            {/* Title Section */}
            <div className="bg-[#1A1A1A] p-6 border-b border-[#40E0D0]/20">
              <h2 className="text-2xl md:text-3xl font-bold text-center">
                <span className="text-[#F3D77D]">Bingo</span>
                <span className="text-white"> Winners</span>
              </h2>
            </div>

            {/* Leaderboard Content */}
            <div className="p-6">
              {isLoading ? (
                <div className="text-center py-8">
                  <div className="text-[#40E0D0] text-lg">Loading...</div>
                </div>
              ) : error ? (
                <div className="text-center py-8">
                  <div className="text-[#FF9E9E] text-lg">{error}</div>
                </div>
              ) : leaderboard.length === 0 ? (
                <div className="text-center py-8">
                  <div className="text-[#F3D77D] text-lg">No winners yet!</div>
                </div>
              ) : (
                <div className="space-y-4">
                  {leaderboard.map((entry, index) => (
                    <div 
                      key={entry._id || index}
                      className="flex items-center justify-between p-4 rounded-lg bg-[#1A1A1A]/50 border border-[#40E0D0]/10 hover:border-[#40E0D0]/30 transition-colors"
                    >
                      <div className="flex items-center space-x-4">
                        <span className={`
                          text-2xl font-bold
                          ${index === 0 ? 'text-[#F3D77D]' : 
                            index === 1 ? 'text-[#40E0D0]' : 
                            index === 2 ? 'text-[#FF9E9E]' : 'text-white'}
                        `}>
                          #{index + 1}
                        </span>
                        <span className="text-white font-medium">{entry.name}</span>
                      </div>
                      <span className="text-sm text-[#40E0D0]/80">
                        {formatTime(entry.timestamp)}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}