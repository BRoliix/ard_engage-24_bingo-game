import { NextResponse } from 'next/server';
import { leaderboardStore, addEntry } from '@/lib/store';

export async function GET() {
  try {
    return NextResponse.json(leaderboardStore);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { name } = await request.json();
    addEntry(name.trim());
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to save data' }, { status: 500 });
  }
}