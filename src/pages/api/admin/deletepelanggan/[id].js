import { deletePelangggan } from "@/controllers/pelangganController";
import { runMiddleware } from "@/libs/middleware"
import { verifyAuth } from "@/middleware/verifyAuth"

export default (req, res) => {
  runMiddleware(req, res, verifyAuth);

  if (req.method === 'DELETE') {
    deletePelangggan(req, res)
  } else {
    res.setHeders('Allow', ['DELETE'])
    res.status(405).json({ message: 'Method not allowed' })
  }
}