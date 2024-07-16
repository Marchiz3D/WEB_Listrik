import { verifyAuth } from '@/middleware/verifyAuth.js';
import { runMiddleware } from '@/libs/middleware.js';
import { getAllPelanggan } from '@/controllers/pelangganController';

export default async (req, res) => {
  await runMiddleware(req, res, verifyAuth);

  if (req.method === 'GET') {
    getAllPelanggan(req, res);
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).json({ message: 'Method not allowed' });
  }
}