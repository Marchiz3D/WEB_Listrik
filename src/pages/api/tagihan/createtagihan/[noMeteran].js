import { createTagihan } from "@/controllers/tagihanController"

export default (req, res) => {
  if (req.method === 'POST') {
    createTagihan(req, res);
  } else {
    res.setHeders('Allow', ['POST'])
    res.status(405).json({ message: 'Method not allowed' })
  }
}