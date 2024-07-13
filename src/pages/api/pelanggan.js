import { PrismaClient } from "@prisma/client";
import { verifyAuth } from '@/middleware/verifyAuth.js';
import { runMiddleware } from '@/libs/middleware.js';

const prisma = new PrismaClient();

export default async (req, res) => {
  await runMiddleware(req, res, verifyAuth);

  if (req.method === 'GET') {
    try {
      const pelanggan = await prisma.pelanggan.findMany();

      res.status(200).json(pelanggan);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}