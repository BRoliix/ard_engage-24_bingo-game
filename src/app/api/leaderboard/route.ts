import { promises as fs } from 'fs';
import { NextResponse } from 'next/server';
import path from 'path';

interface LeaderboardEntry {
  name: string;
  timestamp: string;
}

export async function GET() {
  try {
    // Ensure the data directory exists
    const dataDir = path.join(process.cwd(), 'data');
    const filePath = path.join(dataDir, 'leaderboard.json');

    try {
      await fs.access(dataDir);
    } catch {
      await fs.mkdir(dataDir, { recursive: true });
      await fs.writeFile(filePath, '[]');
    }

    const fileData = await fs.readFile(filePath, 'utf8');
    const leaderboard: LeaderboardEntry[] = JSON.parse(fileData);
    
    return NextResponse.json(leaderboard);
  } catch (error) {
    console.error('Leaderboard GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { name, timestamp } = await request.json();
    const dataDir = path.join(process.cwd(), 'data');
    const filePath = path.join(dataDir, 'leaderboard.json');

    // Ensure directory exists
    try {
      await fs.access(dataDir);
    } catch {
      await fs.mkdir(dataDir, { recursive: true });
    }

    // Read existing data or create new array
    let leaderboard: LeaderboardEntry[] = [];
    try {
      const fileData = await fs.readFile(filePath, 'utf8');
      leaderboard = JSON.parse(fileData);
    } catch {
      // If file doesn't exist, start with empty array
    }

    // Add new entry
    leaderboard.push({
      name,
      timestamp: timestamp || new Date().toISOString()
    });

    // Write updated data
    await fs.writeFile(filePath, JSON.stringify(leaderboard, null, 2));
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Leaderboard POST error:', error);
    return NextResponse.json({ error: 'Failed to save data' }, { status: 500 });
  }
}