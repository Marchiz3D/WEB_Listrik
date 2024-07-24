import { getTagihan } from "@/controllers/tagihanController"

export default (req, res) => {
  if (req.method === 'GET') {
    getTagihan(req, res)
  } else {
    res.setHeders('Allow', ['GET'])
    res.status(405).json({ message: 'Method not allowed' })
  }
}