import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getPelanggan = async (req, res) => {
  try {
    const { noMeteran } = req.query;
    // Mengambil pelanggan berdasarkan parameter nomor meteran
    const pelanggan = await prisma.pelanggan.findUnique({
      where: {
        nomor_meteran: noMeteran
      }
    })

    if (!pelanggan) return res.status(404).json({ message: "Nomor meteran tidak ditemukan" })

    res.status(200).json(pelanggan);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

