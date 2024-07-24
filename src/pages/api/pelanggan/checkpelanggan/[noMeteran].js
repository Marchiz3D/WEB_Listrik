import { getPelanggan } from "@/controllers/pelangganController"

export default (req, res) => {
  if (req.method === 'GET') {
    getPelanggan(req, res);
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).json({ message: 'Method not allowed' });
  }
}