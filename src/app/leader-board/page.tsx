'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { LeaderboardEntry } from '@/lib/store';

export default function LeaderBoard() {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/leaderboard');
        if (!response.ok) {
          throw new Error('Failed to fetch leaderboard data');
        }
        const data = await response.json();
        setEntries(data);
      } catch (error) {
        console.error('Error fetching leaderboard:', error);
        setError('Failed to load leaderboard data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchLeaderboard();

    // Set up polling to refresh the leaderboard
    const intervalId = setInterval(fetchLeaderboard, 5000); // Poll every 5 seconds

    return () => clearInterval(intervalId);
  }, []);

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
            <span className="text-[#F3D77D]">Bingo</span>
            <span className="text-[#40E0D0]"> Leaders</span>
          </h1>
          <nav className="flex items-center space-x-4">
            <Link
              href="/bingo"
              className="text-[#40E0D0] hover:text-[#F3D77D] transition-colors duration-300"
            >
              Back to Game
            </Link>
            <Link
              href="/"
              className="text-[#40E0D0] hover:text-[#F3D77D] transition-colors duration-300"
            >
              Home
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 pt-24 px-4 max-w-4xl mx-auto">
        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#40E0D0]"></div>
          </div>
        ) : error ? (
          <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-6 text-center">
            <p className="text-red-300">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-300 rounded-lg transition-colors"
            >
              Try Again
            </button>
          </div>
        ) : (
          <div className="bg-[#2A2A2A] rounded-xl p-6 shadow-lg border-2 border-[#40E0D0]/30">
            {entries.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-400 text-lg">No winners yet!</p>
                <p className="text-gray-500 mt-2">Be the first to win the game!</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-[#40E0D0] border-b border-[#40E0D0]/30">
                      <th className="py-3 px-4 text-left">#</th>
                      <th className="py-3 px-4 text-left">Player</th>
                      <th className="py-3 px-4 text-left">Date</th>
                      <th className="py-3 px-4 text-left">Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {entries.map((entry, index) => {
                      const date = new Date(entry.timestamp);
                      return (
                        <tr 
                          key={index} 
                          className="border-b border-[#40E0D0]/10 text-white hover:bg-[#40E0D0]/5 transition-colors"
                        >
                          <td className="py-3 px-4 text-[#F3D77D]">
                            {index + 1}
                          </td>
                          <td className="py-3 px-4 font-medium">
                            {entry.name}
                          </td>
                          <td className="py-3 px-4 text-gray-300">
                            {date.toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric'
                            })}
                          </td>
                          <td className="py-3 px-4 text-gray-300">
                            {date.toLocaleTimeString('en-US', {
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}