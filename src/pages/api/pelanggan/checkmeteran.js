import { checkMeteran } from "@/controllers/meteran"

export default (req, res) => {
  if (req.method === 'POST') {
    checkMeteran(req, res)
  } else {
    res.setHeader('Allow', ['POST'])
    res.status(405).json({ message: 'Method not allowed' })
  }
}