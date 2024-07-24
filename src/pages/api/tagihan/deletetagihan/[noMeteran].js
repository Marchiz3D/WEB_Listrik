import { deleteTagihan } from "@/controllers/tagihanController"

export default (req, res) => {
  if (req.method === 'DELETE') {
    deleteTagihan(req, res)
  } else {
    res.setHeders('Allow', ['DELETE'])
    res.status(405).json({ message: 'Method not allowed' })
  }
}