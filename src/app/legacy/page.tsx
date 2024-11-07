'use client';
import React, { useState } from 'react';
import Link from 'next/link';

export default function LegacyPage() {
  const [isClearing, setIsClearing] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleClearLeaderboard = async () => {
    try {
      setIsClearing(true);
      setMessage(null);

      const response = await fetch('/api/leaderboard/clear', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to clear leaderboard');
      }

      setMessage('Leaderboard cleared successfully!');
    } catch (error) {
      setMessage('Failed to clear leaderboard. Please try again.');
    } finally {
      setIsClearing(false);
    }
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
            <span className="text-[#F3D77D]">Legacy</span>
            <span className="text-[#40E0D0]"> Tools</span>
          </h1>
          <nav className="flex items-center space-x-4">
            <Link
              href="/leader-board"
              className="text-[#40E0D0] hover:text-[#F3D77D] transition-colors duration-300"
            >
              View Leaderboard
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
        <div className="bg-[#2A2A2A] rounded-xl p-8 shadow-lg border-2 border-[#40E0D0]/30">
          <h2 className="text-2xl font-bold text-[#40E0D0] mb-6">Leaderboard Management</h2>
          
          <div className="space-y-6">
            <div className="bg-[#1A1A1A] rounded-lg p-6 border border-[#40E0D0]/20">
              <h3 className="text-xl text-[#F3D77D] mb-4">Clear Leaderboard</h3>
              <p className="text-gray-400 mb-4">
                This action will remove all entries from the leaderboard. This cannot be undone.
              </p>
              <button
                onClick={handleClearLeaderboard}
                disabled={isClearing}
                className={`
                  px-6 py-3 rounded-lg font-bold
                  ${isClearing 
                    ? 'bg-red-500/30 text-red-300 cursor-not-allowed' 
                    : 'bg-red-500 text-white hover:bg-red-600'}
                  transition-colors duration-300
                `}
              >
                {isClearing ? 'Clearing...' : 'Clear Leaderboard'}
              </button>
            </div>

            {message && (
              <div className={`rounded-lg p-4 ${
                message.includes('success') 
                  ? 'bg-green-500/10 border border-green-500/30 text-green-300'
                  : 'bg-red-500/10 border border-red-500/30 text-red-300'
              }`}>
                {message}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}