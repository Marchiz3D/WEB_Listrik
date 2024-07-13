import { requireAdmin } from '@/pages/admin.js'

export default (async (req, res) => {
  if (req.method === 'POST') {
    // Verfikasi authentifikasi admin
    try {
      await requireAdmin(req, res, async () => {
        res.status(200).json({ message: 'OK' });
      })
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).json({ message: 'Method not allowed' });
  }
})