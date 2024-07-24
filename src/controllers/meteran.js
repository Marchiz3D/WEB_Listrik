import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export const checkMeteran = async (req, res) => {
  try {
    const { noMeteran } = req.body;

    // Cek pelanggan berdasarkan nomor meteran
    const pelanggan = await prisma.pelanggan.findUnique({
      where: {
        nomor_meteran: noMeteran
      }
    })

    if (!pelanggan) return res.status(404).json({ message: "Nomor meteran tidak ditemukan" })

    // Jika ada pelanggan maka kirimkan response
    res.status(200).json(pelanggan);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}