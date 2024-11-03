import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import LayoutClient from '@/components/LayoutClient';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Engage 2024 - BITS Pilani Dubai Campus',
  description: 'Alumni Relations Division presents Engage 2024',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#1A1A1A] min-h-screen`}>
        <LayoutClient>
          {children}
        </LayoutClient>
      </body>
    </html>
  );
}
