import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email } = req.body;

    try {
      res.status(200).json({ message: 'Subscription successful' });
    } catch (error) {
      console.error('Error adding subscriber:', error);
      res.status(500).json({ error: 'Failed to add subscriber' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
