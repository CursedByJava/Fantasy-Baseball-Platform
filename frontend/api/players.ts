import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getDb } from './db';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const db = await getDb();

    if (req.method === 'GET') {
      const docs = await db.collection('players').find({}).toArray()
      const players = docs.map(({ _id, ...rest }) => ({ id: String(_id), ...rest }))
      return res.status(200).json(players)
    }

    if (req.method === 'POST') {
      const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
      await db.collection('players').insertMany(body.players ?? []);
      return res.status(201).json({ ok: true });
    }

    res.setHeader('Allow', 'GET, POST');
    return res.status(405).end('Method Not Allowed');
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
