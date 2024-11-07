'use client';
import { useState} from 'react';
import Link from 'next/link';
import charadesData from '@/lib/questions_charades.json';

export default function DumbCharades() {
  const [usedPrompts, setUsedPrompts] = useState<Set<number>>(new Set());
  const [currentPrompt, setCurrentPrompt] = useState<string>('');
  const [isRevealed, setIsRevealed] = useState(false);

  const getRandomPrompt = () => {
    const availablePrompts = charadesData.prompts.filter(
      (_, index) => !usedPrompts.has(index)
    );

    if (availablePrompts.length === 0) {
      setCurrentPrompt('No more prompts available!');
      return;
    }

    const randomIndex = Math.floor(Math.random() * availablePrompts.length);
    const originalIndex = charadesData.prompts.indexOf(availablePrompts[randomIndex]);
    
    setUsedPrompts(prev => new Set([...prev, originalIndex]));
    setCurrentPrompt(availablePrompts[randomIndex]);
    setIsRevealed(true);
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
            <span className="text-[#F3D77D]">Dumb</span>
            <span className="text-[#40E0D0]">Charades</span>
            <span className="text-[#FF9E9E]">&apos;24</span>
          </h1>
          <Link 
            href="/"
            className="text-[#40E0D0] hover:text-[#F3D77D] transition-colors duration-300"
          >
            Back to Home
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 pt-20">
        <div className="w-full max-w-2xl mx-auto text-center space-y-8">
          {isRevealed && (
            <div className="bg-[#2A2A2A] p-6 md:p-8 rounded-xl border-2 border-[#40E0D0]/30 shadow-lg">
              <p className="text-xl md:text-2xl text-white font-medium">
                {currentPrompt}
              </p>
            </div>
          )}

          <button
            onClick={getRandomPrompt}
            className="inline-block px-8 md:px-12 py-3 md:py-4 
                     bg-[#40E0D0] text-[#1A1A1A] text-lg md:text-xl 
                     font-bold rounded-lg hover:bg-[#F3D77D] 
                     transform hover:scale-105 transition-all duration-300 
                     shadow-lg hover:shadow-[#40E0D0]/20"
          >
            {isRevealed ? 'Get Next Prompt' : 'Get Prompt'}
          </button>

          {usedPrompts.size > 0 && (
            <p className="text-[#40E0D0]/60 text-sm">
              Prompts Used: {usedPrompts.size} / {charadesData.prompts.length}
            </p>
          )}
        </div>
      </main>
    </div>
  );
}