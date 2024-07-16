import { createPelanggan } from "@/controllers/pelangganController.js"
import { runMiddleware } from "@/libs/middleware.js";
import { verifyAuth } from "@/middleware/verifyAuth.js";

export default (req, res) => {
  runMiddleware(req, res, verifyAuth);

  if (req.method === 'POST') {
    createPelanggan(req, res);
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).json({ message: 'Method not allowed' });
  }
}