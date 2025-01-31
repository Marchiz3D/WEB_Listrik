import { loginAdmin } from "@/controllers/adminController.js";

export default (req, res) => {
  if (req.method === 'POST') {
    loginAdmin(req, res)
  } else {
    res.setHeader('Allow', ['POST'])
    res.status(405).json({ message: 'Method not allowed' })
  }
}