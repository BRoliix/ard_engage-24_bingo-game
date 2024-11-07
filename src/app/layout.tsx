import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import LayoutClient from '@/components/LayoutClient';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Engage 2024 - BITS Pilani Dubai Campus',
  description: 'Alumni Relations Division presents Engage 2024',
  icons: {
    icon: [
      { url: '/icons/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
      { url: '/icons/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icons/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/icons/favicon.svg', type: 'image/svg+xml' },
      { url: '/icons/favicon.ico', sizes: 'any' }
    ],
    apple: [
      { url: '/icons/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }
    ],
    other: [
      { rel: 'manifest', url: '/icons/site.webmanifest' },
      { rel: 'mask-icon', url: '/icons/safari-pinned-tab.svg', color: '#5bbad5' }
    ]
  },
  other: {
    'msapplication-TileColor': '#da532c',
    'theme-color': '#ffffff'
  }
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