'use client'
import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#1A1A1A] no-scrollbar">
      <div className="absolute inset-0 w-full h-full">
        <div className="absolute inset-0 opacity-30">
          <div className="animate-float-slow absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-[#40E0D0] blur-3xl"></div>
          <div className="animate-float-medium absolute top-1/2 right-1/4 w-96 h-96 rounded-full bg-[#FF9E9E] blur-3xl"></div>
          <div className="animate-float-fast absolute bottom-1/4 left-1/3 w-96 h-96 rounded-full bg-[#F3D77D] blur-3xl"></div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#1A1A1A]/50 to-[#1A1A1A]"></div>
      </div>

      <div className="relative z-20 flex flex-col items-center min-h-screen">
        <div className="w-full max-w-md md:max-w-4xl pt-4 md:pt-6 px-4">
          <div className="flex justify-between items-start">
            <div className="w-16 h-16 md:w-24 md:h-24 relative">
              <Image
                src="/assets/bits-logo.png"
                alt="BITS Pilani Dubai Campus"
                width={100}
                height={100}
                className="object-contain"
                priority
              />
            </div>
            <div className="w-16 h-16 md:w-24 md:h-24 relative">
              <Image
                src="/assets/ar-logo.png"
                alt="Alumni Relations"
                width={100}
                height={100}
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center w-full max-w-md md:max-w-4xl text-center space-y-4 md:space-y-6 -mt-48 md:-mt-52">
          <h2 className="text-xl md:text-2xl tracking-wider">ALUMNI RELATIONS DIVISION</h2>
          <p className="text-lg md:text-xl text-gray-400">PRESENTS</p>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-wide">
            <span className="text-[#F3D77D]">En</span>
            <span className="text-[#40E0D0]">gage</span>
            <span className="text-[#FF9E9E]">'24</span>
          </h1>

          <div className="mt-4 md:mt-6">
            <h3 className="text-lg md:text-xl mb-2">BATCHES OF</h3>
            <p className="text-2xl md:text-3xl font-bold text-[#40E0D0]">2006 - 2010</p>
          </div>

          <div className="mt-4 md:mt-6">
            <h3 className="text-lg md:text-xl mb-2">VENUE</h3>
            <p className="text-2xl md:text-3xl font-bold text-[#F3D77D]">BPDC AUDITORIUM</p>
          </div>

          <Link 
            href="/bingo"
            className="inline-block mt-6 md:mt-8 px-8 md:px-12 py-3 md:py-4 bg-[#40E0D0] text-[#1A1A1A] text-lg md:text-xl font-bold rounded-lg hover:bg-[#F3D77D] transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-[#40E0D0]/20"
          >
            Play Bingo
          </Link>
        </div>
      </div>
    </div>
  )
}