'use client';
import { useState, useEffect } from 'react';
import LoadingScreen from './LoadingScreen';

export default function LayoutClient({
  children
}: {
  children: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <>
          <header className="fixed top-0 w-full z-50 bg-[#1A1A1A]/95 backdrop-blur-sm border-b border-[#40E0D0]/20">
            <div className="max-w-7xl mx-auto px-4 py-4">
              <h1 className="text-2xl md:text-3xl font-bold text-center">
                <span className="text-[#F3D77D]">Bingo</span>
                <span className="text-[#40E0D0]">of</span>
                <span className="text-[#FF9E9E]">Engage 24</span>
              </h1>
            </div>
          </header>
          <main className="pt-20 min-h-screen">
            {children}
          </main>
        </>
      )}
    </>
  );
}
