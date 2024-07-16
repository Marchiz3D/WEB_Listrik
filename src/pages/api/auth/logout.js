import { logoutAdmin } from "@/controllers/adminController";
import { runMiddleware } from "@/libs/middleware"
import { verifyAuth } from "@/middleware/verifyAuth"

export default async (req, res) => {
  await runMiddleware(req, res, verifyAuth);

  if (req.method === 'DELETE') {
    logoutAdmin(req, res);
  } else {
    res.setHeader('Allow', ['DELETE']);
    res.status(405).json({ message: 'Method not allowed' });
  }
}