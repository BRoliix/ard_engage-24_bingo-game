import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      animation: {
        'float-slow': 'float 8s ease-in-out infinite',
        'float-medium': 'float 6s ease-in-out infinite',
        'float-fast': 'float 4s ease-in-out infinite',
        'pulse-slow': 'pulse 4s ease-in-out infinite',
        'pulse-medium': 'pulse 3s ease-in-out infinite',
        'pulse-fast': 'pulse 2s ease-in-out infinite',
        'glow': 'glow 4s ease-in-out infinite',
        'spin-slow': 'spin 6s linear infinite',
        'progress': 'progress 2s ease-in-out infinite',
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'fade-out': 'fadeOut 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-in-out',
        'slide-down': 'slideDown 0.5s ease-in-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { 
            transform: 'translateY(0) scale(1)',
            filter: 'brightness(1)'
          },
          '50%': { 
            transform: 'translateY(-20px) scale(1.05)',
            filter: 'brightness(1.2)'
          },
        },
        pulse: {
          '0%, 100%': { 
            opacity: '1',
            transform: 'scale(1)'
          },
          '50%': { 
            opacity: '0.7',
            transform: 'scale(1.05)'
          },
        },
        glow: {
          '0%, 100%': {
            boxShadow: '0 0 20px rgba(64, 224, 208, 0.3)',
          },
          '50%': {
            boxShadow: '0 0 40px rgba(64, 224, 208, 0.6)',
          },
        },
        progress: {
          '0%': { 
            transform: 'translateX(-100%)',
            opacity: '0.5'
          },
          '50%': { 
            opacity: '1'
          },
          '100%': { 
            transform: 'translateX(100%)',
            opacity: '0.5'
          }
        },
        fadeIn: {
          '0%': { 
            opacity: '0'
          },
          '100%': { 
            opacity: '1'
          }
        },
        fadeOut: {
          '0%': { 
            opacity: '1'
          },
          '100%': { 
            opacity: '0'
          }
        },
        slideUp: {
          '0%': { 
            transform: 'translateY(20px)',
            opacity: '0'
          },
          '100%': { 
            transform: 'translateY(0)',
            opacity: '1'
          }
        },
        slideDown: {
          '0%': { 
            transform: 'translateY(-20px)',
            opacity: '0'
          },
          '100%': { 
            transform: 'translateY(0)',
            opacity: '1'
          }
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      transitionProperty: {
        'height': 'height',
        'spacing': 'margin, padding',
      },
      transitionDuration: {
        '2000': '2000ms',
      },
      transitionTimingFunction: {
        'bounce-in-out': 'cubic-bezier(0.87, 0, 0.13, 1)',
      },
    },
  },
  plugins: [],
};

export default config;
