import { NextResponse } from 'next/server';
import { leaderboardStore } from '@/lib/store';

export async function POST() {
  try {
    // Clear the array
    leaderboardStore.length = 0;
    
    return NextResponse.json({ 
      success: true,
      message: 'Leaderboard cleared successfully'
    });
  } catch {
    return NextResponse.json(
      { error: 'Failed to clear leaderboard' },
      { status: 500 }
    );
  }
}