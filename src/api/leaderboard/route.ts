import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
if (!uri) {
  throw new Error('Please define MONGODB_URI environment variable');
}

let client: MongoClient | null = null;

async function connectToMongoDB() {
  if (!client) {
    client = new MongoClient(uri);
    await client.connect();
  }
  return client;
}

export async function GET() {
  try {
    const client = await connectToMongoDB();
    const db = client.db('bingo-game');
    const collection = db.collection('leaderboard');

    const leaderboard = await collection
      .find({})
      .sort({ timestamp: 1 })
      .toArray();

    return NextResponse.json(leaderboard, { status: 200 });
  } catch (error) {
    console.error('Failed to fetch leaderboard:', error);
    return NextResponse.json(
      { error: 'Failed to fetch leaderboard' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name } = body;

    if (!name || typeof name !== 'string' || name.trim().length === 0) {
      return NextResponse.json(
        { error: 'Valid name is required' },
        { status: 400 }
      );
    }

    const client = await connectToMongoDB();
    const db = client.db('bingo-game');
    const collection = db.collection('leaderboard');

    const newEntry = {
      name: name.trim(),
      timestamp: new Date(),
    };

    const result = await collection.insertOne(newEntry);

    return NextResponse.json(
      {
        message: 'Winner recorded successfully',
        id: result.insertedId,
        entry: newEntry
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Failed to record winner:', error);
    return NextResponse.json(
      { error: 'Failed to record winner' },
      { status: 500 }
    );
  }
}