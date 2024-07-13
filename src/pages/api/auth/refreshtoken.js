import { refreshToken } from "@/controllers/refreshTokenController.js";
import { createRefreshToken, verifyToken, createToken } from "@/libs/jwt.js";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async (req, res) => {
  if (req.method === 'POST') {
    refreshToken(req, res);
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).json({ message: 'Method not allowed' });
  }
}