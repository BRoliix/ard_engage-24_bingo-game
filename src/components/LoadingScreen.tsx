'use client';
import Image from 'next/image';
import { motion } from 'framer-motion';

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 bg-[#1A1A1A] z-50 flex items-center justify-center">
      <div className="relative flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute -inset-6 rounded-full border border-[#40E0D0]/20"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute -inset-12 rounded-full border border-[#F3D77D]/10"
          />
          <motion.div
            animate={{ rotate: 360 }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute -inset-[3.5rem] rounded-full border border-[#FF9E9E]/5"
          />
          
          <motion.div
            animate={{ rotate: 360 }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "linear",
            }}
            className="relative z-10 w-48 h-48 flex items-center justify-center"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#40E0D0]/10 via-transparent to-[#F3D77D]/10 rounded-full blur-md" />
            <Image
              src="/assets/ar-logo.png"
              alt="AR Logo"
              width={100}
              height={100}
              className="drop-shadow-[0_0_10px_rgba(64,224,208,0.3)]"
              priority
            />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default LoadingScreen;