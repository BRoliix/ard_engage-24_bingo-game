import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '@/lib/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const client = await clientPromise;
      const db = client.db('bingo-game');

      const leaderboard = await db.collection('leaderboard').find({}).toArray();

      res.status(200).json(leaderboard);
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
      res.status(500).json({ message: 'Failed to load leaderboard' });
    }
  } else if (req.method === 'POST') {
    try {
      const { name } = req.body;

      if (!name) {
        return res.status(400).json({ message: 'Name is required' });
      }

      const client = await clientPromise;
      const db = client.db('bingo-game');

      const newEntry = {
        name,
        timestamp: new Date().toISOString(),
      };

      await db.collection('leaderboard').insertOne(newEntry);

      res.status(201).json(newEntry);
    } catch (error) {
      console.error('Error saving leaderboard entry:', error);
      res.status(500).json({ message: 'Failed to save entry' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
