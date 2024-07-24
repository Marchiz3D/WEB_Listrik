import { getPelanggan } from "@/controllers/adminController";
import { runMiddleware } from "@/libs/middleware"
import { verifyAuth } from "@/middleware/verifyAuth"

export default (req, res) => {
  runMiddleware(req, res, verifyAuth);

  if (req.method === 'GET') {
    getPelanggan(req, res)
  } else {
    res.setHeders('Allow', ['GET'])
    res.status(405).json({ message: 'Method not allowed' })
  }
}