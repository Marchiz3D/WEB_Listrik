import { PrismaClient } from "@prisma/client";
import { createTransaction } from "@/libs/midtransTranscation";

const prisma = new PrismaClient();

export const payTransaction = async (req, res) => {
  try {
    const { id } = req.query;
    // Mengambil id tagihan
    const tagihan = await prisma.tagihan.findUnique({
      where: {
        id: parseInt(id)
      }
    })

    if (!tagihan) return res.status(404).json({ message: "Tagihan tidak ditemukan" })

    // Membuat transaksi
    const transaction = await createTransaction({ jmlTagihan: tagihan.jumlah_tagihan }, res);

    res.status(200).json({ transaction });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}