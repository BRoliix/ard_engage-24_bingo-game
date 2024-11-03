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

  useEffect(() => {
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
    } catch (_error) {
      console.error('Error loading questions:', _error);
    }
  }, []);

  const checkBingo = (selected: Set<number>) => {
    for (let i = 0; i < 4; i++) {
      const row = Array.from({ length: 4 }, (_, j) => i * 4 + j);
      if (row.every(num => selected.has(num))) return true;
    }

    for (let i = 0; i < 4; i++) {
      const col = Array.from({ length: 4 }, (_, j) => i + j * 4);
      if (col.every(num => selected.has(num))) return true;
    }

    const diagonal1 = [0, 5, 10, 15];
    const diagonal2 = [3, 6, 9, 12];
    
    return diagonal1.every(num => selected.has(num)) || diagonal2.every(num => selected.has(num));
  };

  const handleCellClick = (index: number) => {
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
      setTimeout(() => setShowBingoMessage(false), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-[#1A1A1A] relative">
      <header className="fixed top-0 left-0 right-0 bg-[#1A1A1A]/95 backdrop-blur-sm z-50 border-b border-[#40E0D0]/20">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl md:text-3xl font-bold">
            <span className="text-[#F3D77D]">Bingo</span>
            <span className="text-[#40E0D0]">of</span>
            <span className="text-[#FF9E9E]">Engage&apos;24</span>
          </h1>
          <Link 
            href="/"
            className="text-[#40E0D0] hover:text-[#F3D77D] transition-colors duration-300"
          >
            Back to Home
          </Link>
        </div>
      </header>

      <main className="pt-20 px-2 md:px-6 pb-6">
        <div className="w-[95vw] md:w-[600px] mx-auto">
          <div className="grid grid-cols-4 gap-2 md:gap-3">
            {questions.map((question, index) => (
              <button
                key={index}
                onClick={() => handleCellClick(index)}
                disabled={question.isFreeCell}
                className={`
                  aspect-square rounded-lg md:rounded-xl
                  flex items-center justify-center
                  text-[0.65rem] sm:text-sm md:text-base
                  font-medium
                  p-1.5 md:p-3
                  transition-all duration-300
                  ${question.isFreeCell 
                    ? 'bg-[#40E0D0]/30 text-white border-[#40E0D0] cursor-default' 
                    : selectedBoxes.has(index)
                      ? 'bg-[#40E0D0]/20 text-[#40E0D0] border-[#40E0D0]' 
                      : 'bg-[#2A2A2A] text-white border-[#40E0D0]/30'}
                  border border-opacity-20 md:border-2
                  hover:border-[#40E0D0]
                  hover:bg-[#2A2A2A]/80
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