import { payTransaction } from "@/controllers/transactionController";

export default async (req, res) => {
  if (req.method === 'GET') {
    payTransaction(req, res);
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).json({ message: 'Method not allowed' });
  }
}