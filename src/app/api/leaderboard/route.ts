import { MongoClient } from 'mongodb';
import { NextResponse } from 'next/server';

const uri = process.env.MONGODB_URI!;
let client: MongoClient | null = null;

async function connectToDatabase() {
  if (!client) {
    client = new MongoClient(uri);
    await client.connect();
  }
  return client;
}

export async function GET() {
  try {
    const client = await connectToDatabase();
    const collection = client.db('bingo-game').collection('leaderboard');
    
    const entries = await collection
      .find({})
      .sort({ timestamp: 1 })
      .toArray();
    
    return NextResponse.json(entries);
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { name } = await request.json();
    const client = await connectToDatabase();
    const collection = client.db('bingo-game').collection('leaderboard');
    
    await collection.insertOne({
      name,
      timestamp: new Date(),
    });

    return NextResponse.json({ message: 'Winner recorded' }, { status: 201 });
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}