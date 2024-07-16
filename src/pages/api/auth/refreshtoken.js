import { refreshToken } from "@/controllers/refreshTokenController.js";

export default async (req, res) => {
  if (req.method === 'GET') {
    refreshToken(req, res);
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).json({ message: 'Method not allowed' });
  }
}