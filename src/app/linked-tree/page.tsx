'use client'
import Image from 'next/image'
import Link from 'next/link'
import { FaFacebookF, FaInstagram, FaLinkedinIn } from 'react-icons/fa'

export default function LinkedTree() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#1A1A1A] no-scrollbar">
      {/* Background effects */}
      <div className="absolute inset-0 w-full h-full">
        <div className="absolute inset-0 opacity-30">
          <div className="animate-float-slow absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-[#40E0D0] blur-3xl"></div>
          <div className="animate-float-medium absolute top-1/2 right-1/4 w-96 h-96 rounded-full bg-[#FF9E9E] blur-3xl"></div>
          <div className="animate-float-fast absolute bottom-1/4 left-1/3 w-96 h-96 rounded-full bg-[#F3D77D] blur-3xl"></div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#1A1A1A]/50 to-[#1A1A1A]"></div>
      </div>

      <div className="relative z-20 flex flex-col items-center min-h-screen px-4 py-12">
        {/* Logo */}
        <div className="w-32 h-32 relative mb-8">
          <Image
            src="/assets/ar-logo.png"
            alt="Alumni Relations"
            width={128}
            height={128}
            className="object-contain"
            priority
          />
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center">
          <span className="text-[#F3D77D]">Alumni</span>
          <span className="text-[#40E0D0]"> Relations</span>
          <span className="text-[#FF9E9E]"> Dubai</span>
        </h1>

        {/* Social Links */}
        <div className="flex flex-col space-y-4 w-full max-w-md">
          <a 
            href="https://www.instagram.com/ar_bitsdubai/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center space-x-4 bg-[#40E0D0] text-[#1A1A1A] py-3 px-6 rounded-lg hover:bg-[#F3D77D] transition-all duration-300 transform hover:scale-105"
          >
            <FaInstagram className="text-2xl" />
            <span className="text-xl font-bold">Instagram</span>
          </a>
          <a 
            href="https://www.facebook.com/alumnirelationsbitsdubai/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center space-x-4 bg-[#40E0D0] text-[#1A1A1A] py-3 px-6 rounded-lg hover:bg-[#F3D77D] transition-all duration-300 transform hover:scale-105"
          >
            <FaFacebookF className="text-2xl" />
            <span className="text-xl font-bold">Facebook</span>
          </a>
          <a 
            href="https://www.linkedin.com/company/alumni-relations-division-bits-pilani-dubai-campus/posts/?feedView=all"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center space-x-4 bg-[#40E0D0] text-[#1A1A1A] py-3 px-6 rounded-lg hover:bg-[#F3D77D] transition-all duration-300 transform hover:scale-105"
          >
            <FaLinkedinIn className="text-2xl" />
            <span className="text-xl font-bold">LinkedIn</span>
          </a>
        </div>

        {/* Back to Home Link */}
        <Link 
          href="/"
          className="mt-12 text-[#40E0D0] hover:text-[#F3D77D] transition-colors duration-300"
        >
          Back to Home
        </Link>
      </div>
    </div>
  )
}