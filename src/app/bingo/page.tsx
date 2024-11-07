'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import questionsData from '@/lib/questions_bingo.json';

interface BingoQuestion {
  text: string;
  isSelected: boolean;
  isFreeCell?: boolean;
}

export default function BingoGame() {
  const [questions, setQuestions] = useState<BingoQuestion[]>([]);
  const [selectedBoxes, setSelectedBoxes] = useState<Set<number>>(new Set());
  const [showBingoMessage, setShowBingoMessage] = useState(false);
  const [playerName, setPlayerName] = useState('');
  const [showNameInput, setShowNameInput] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const savedName = localStorage.getItem('bingoPlayerName');
    if (savedName) {
      setPlayerName(savedName);
      setShowNameInput(false);
    }
    initializeGame();
  }, []);

  const initializeGame = () => {
    try {
      const shuffledQuestions = [...questionsData.questions]
        .sort(() => Math.random() - 0.5)
        .slice(0, 15)
        .map(text => ({ text, isSelected: false, isFreeCell: false }));

      shuffledQuestions.splice(10, 0, {
        text: "FREE",
        isSelected: true,
        isFreeCell: true
      });
      
      setQuestions(shuffledQuestions);
      setSelectedBoxes(new Set([10]));
    } catch (error) {
      console.error('Error initializing game:', error);
    }
  };

  const saveBingoWinner = async () => {
    if (!playerName.trim()) return;

    try {
      setIsLoading(true);
      const response = await fetch('/api/leaderboard', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: playerName.trim(),
          timestamp: new Date().toISOString()
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to save winner');
      }
    } catch (error) {
      console.error('Error saving winner:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const checkBingo = (selected: Set<number>) => {
    // Check rows
    for (let i = 0; i < 4; i++) {
      const row = Array.from({ length: 4 }, (_, j) => i * 4 + j);
      if (row.every(num => selected.has(num))) return true;
    }

    // Check columns
    for (let i = 0; i < 4; i++) {
      const col = Array.from({ length: 4 }, (_, j) => i + j * 4);
      if (col.every(num => selected.has(num))) return true;
    }

    // Check diagonals
    const diagonal1 = [0, 5, 10, 15];
    const diagonal2 = [3, 6, 9, 12];
    
    return diagonal1.every(num => selected.has(num)) || diagonal2.every(num => selected.has(num));
  };

  const handleCellClick = async (index: number) => {
    if (questions[index].isFreeCell) return;

    const newSelected = new Set(selectedBoxes);
    if (newSelected.has(index)) {
      newSelected.delete(index);
    } else {
      newSelected.add(index);
    }
    setSelectedBoxes(newSelected);

    if (checkBingo(newSelected)) {
      setShowBingoMessage(true);
      await saveBingoWinner();
      setTimeout(() => {
        setShowBingoMessage(false);
        window.location.href = '/leader-board';
      }, 3000);
    }
  };

  const handleNameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (playerName.trim()) {
      localStorage.setItem('bingoPlayerName', playerName.trim());
      setShowNameInput(false);
    }
  };

  if (showNameInput) {
    return (
      <div className="min-h-screen bg-[#1A1A1A] relative overflow-hidden">
        <div className="absolute inset-0 w-full h-full">
          <div className="absolute inset-0 opacity-30">
            <div className="animate-float-slow absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-[#40E0D0] blur-3xl"></div>
            <div className="animate-float-medium absolute top-1/2 right-1/4 w-96 h-96 rounded-full bg-[#FF9E9E] blur-3xl"></div>
            <div className="animate-float-fast absolute bottom-1/4 left-1/3 w-96 h-96 rounded-full bg-[#F3D77D] blur-3xl"></div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#1A1A1A]/50 to-[#1A1A1A]"></div>
        </div>
        <div className="relative z-10 min-h-screen flex items-center justify-center">
          <form 
            onSubmit={handleNameSubmit}
            className="bg-[#2A2A2A] p-8 rounded-xl border-2 border-[#40E0D0]/30 shadow-lg"
          >
            <h2 className="text-2xl font-bold text-[#40E0D0] mb-4">Enter Your Name</h2>
            <input
              type="text"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              className="w-full px-4 py-2 bg-[#1A1A1A] border-2 border-[#40E0D0]/30 rounded-lg text-white mb-4"
              placeholder="Your Name"
              required
            />
            <button
              type="submit"
              className="w-full px-4 py-2 bg-[#40E0D0] text-[#1A1A1A] rounded-lg font-bold hover:bg-[#F3D77D] transition-colors"
            >
              Start Game
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1A1A1A] relative overflow-hidden">
      <div className="absolute inset-0 w-full h-full">
        <div className="absolute inset-0 opacity-30">
          <div className="animate-float-slow absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-[#40E0D0] blur-3xl"></div>
          <div className="animate-float-medium absolute top-1/2 right-1/4 w-96 h-96 rounded-full bg-[#FF9E9E] blur-3xl"></div>
          <div className="animate-float-fast absolute bottom-1/4 left-1/3 w-96 h-96 rounded-full bg-[#F3D77D] blur-3xl"></div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#1A1A1A]/50 to-[#1A1A1A]"></div>
      </div>

      <header className="fixed top-0 left-0 right-0 bg-[#1A1A1A]/95 backdrop-blur-sm z-50 border-b border-[#40E0D0]/20">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl md:text-3xl font-bold">
            <span className="text-[#F3D77D]">Bingo</span>
            <span className="text-[#40E0D0]">of</span>
            <span className="text-[#FF9E9E]">Engage&apos;24</span>
          </h1>
          <div className="flex items-center space-x-4">
            <Link
              href="/leader-board"
              className="text-[#40E0D0] hover:text-[#F3D77D] transition-colors duration-300"
            >
              Leaderboard
            </Link>
            <Link
              href="/"
              className="text-[#40E0D0] hover:text-[#F3D77D] transition-colors duration-300"
            >
              Home
            </Link>
          </div>
        </div>
      </header>

      <main className="relative z-10 pt-20 px-2 md:px-6 pb-6">
        <div className="w-[95vw] md:w-[600px] mx-auto">
          <div className="text-center mb-4">
            <h2 className="text-[#40E0D0] text-xl">Playing as: {playerName}</h2>
          </div>

          <div className="grid grid-cols-4 gap-2 md:gap-3">
            {questions.map((question, index) => (
              <button
                key={index}
                onClick={() => handleCellClick(index)}
                disabled={question.isFreeCell || isLoading}
                className={`
                  aspect-square rounded-lg md:rounded-xl
                  flex items-center justify-center
                  text-[0.65rem] sm:text-sm md:text-base
                  font-medium p-1.5 md:p-3
                  transition-all duration-300
                  ${question.isFreeCell 
                    ? 'bg-[#40E0D0]/30 text-white border-[#40E0D0] cursor-default' 
                    : selectedBoxes.has(index)
                      ? 'bg-[#40E0D0]/20 text-[#40E0D0] border-[#40E0D0]' 
                      : 'bg-[#2A2A2A] text-white border-[#40E0D0]/30'}
                  border border-opacity-20 md:border-2
                  hover:border-[#40E0D0]
                  hover:bg-[#2A2A2A]/80
                  disabled:cursor-not-allowed
                `}
              >
                <div className="w-full h-full flex items-center justify-center px-1 md:px-2">
                  <span className="text-center leading-tight">{question.text}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </main>

      {showBingoMessage && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/70">
          <div className="bg-[#1A1A1A] p-8 rounded-xl border-2 border-[#40E0D0] transform animate-bounce shadow-lg shadow-[#40E0D0]/20">
            <h2 className="text-4xl md:text-6xl font-bold text-center">
              <span className="text-[#F3D77D]">B</span>
              <span className="text-[#40E0D0]">I</span>
              <span className="text-[#FF9E9E]">N</span>
              <span className="text-[#F3D77D]">G</span>
              <span className="text-[#40E0D0]">O!</span>
            </h2>
          </div>
        </div>
      )}
    </div>
  );
}