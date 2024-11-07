import { NextResponse } from 'next/server';
import { leaderboardStore, addEntry } from '@/lib/store';

export async function GET() {
  return NextResponse.json(leaderboardStore);
}

export async function POST(request: Request) {
  try {
    const { name } = await request.json();
    
    if (!name || typeof name !== 'string') {
      return NextResponse.json(
        { error: 'Invalid name provided' },
        { status: 400 }
      );
    }

    addEntry(name.trim());
    
    return NextResponse.json({
      success: true,
      message: 'Entry added successfully',
      entries: leaderboardStore
    });
  } catch {
    return NextResponse.json(
      { error: 'Failed to save data' },
      { status: 500 }
    );
  }
}