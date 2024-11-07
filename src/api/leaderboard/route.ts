import { NextResponse } from 'next/server';
import { leaderboardStore, addEntry } from '@/lib/store';

export async function GET() {
  return NextResponse.json(leaderboardStore);
}

export async function POST(request: Request) {
  try {
    const { name } = await request.json();
    if (!name) {
      return NextResponse.json(
        { error: 'Name is required' }, 
        { status: 400 }
      );
    }
    
    addEntry(name.trim());
    return NextResponse.json({ 
      success: true,
      message: 'Entry added successfully'
    });
  } catch {
    // Remove unused error parameter
    return NextResponse.json(
      { error: 'Failed to save data' }, 
      { status: 500 }
    );
  }
}