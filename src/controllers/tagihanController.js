import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getTagihan = async (req, res) => {
  const { noMeteran } = req.query;
  try {
    // Mengambil pelanggan berdasarkan parameter nomor meteran
    const pelanggan = await prisma.pelanggan.findUnique({
      where: {
        nomor_meteran: noMeteran
      }
    })

    if (!pelanggan) return res.status(404).json({ message: "Nomor meteran tidak ditemukan" })

    // Mengambil tagihan berdasarkan id pelanggan
    const tagihan = await prisma.tagihan.findFirst({
      where: {
        id_pelanggan: pelanggan.id
      }
    })

    if (!tagihan) return res.status(404).json({ message: "Tagihan tidak ditemukan" })

    res.status(200).json(tagihan);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export const createTagihan = async (req, res) => {
  const { noMeteran } = req.query;
  try {
    // Mengambil pelanggan berdasarkan parameter nomor meteran
    const pelanggan = await prisma.pelanggan.findUnique({
      where: {
        nomor_meteran: noMeteran
      }
    })

    if (!pelanggan) {
      if (res) res.status(404).json({ message: "Nomor meteran tidak ditemukan" });
      return;
    }

    // Jika pelanggan memiliki tagihan, kirimkan response
    const tagihan = await prisma.tagihan.findFirst({
      where: {
        id_pelanggan: pelanggan.id
      }
    })

    if (tagihan) {
      if (res) res.status(409).json({ message: "Tagihan sudah ada" });
      return;
    }

    // Membuat tagihan baru berdasarkan banyaknya meteran
    const meteran = Math.floor(Math.random() * 199) + 1

    // Menghitung total tagihan berdasarkan meteran
    const totalTagihan = meteran * 20000

    const createTagihan = await prisma.tagihan.create({
      data: {
        id_pelanggan: parseInt(pelanggan.id),
        meteran: meteran,
        jumlah_tagihan: totalTagihan,
        tanggal_tagihan: new Date()
      }
    })

    if (res) return res.status(201).json({ message: "Tagihan berhasil dibuat", createTagihan });
  } catch (error) {
    if (res) return res.status(500).json({ message: error.message });
    console.error(error)
  }
}

export const deleteTagihan = async (req, res) => {
  const { noMeteran } = req.query;
  try {
    // Mengambil pelanggan berdasarkan nomor meteran
    const pelanggan = await prisma.pelanggan.findUnique({
      where: {
        nomor_meteran: noMeteran
      }
    })

    if (!pelanggan) return res.status(404).json({ message: "Nomor meteran tidak ditemukan" });

    // Mengambil tagihan berdasarkan id pelanggan
    const tagihan = await prisma.tagihan.findFirst({
      where: {
        id_pelanggan: pelanggan.id
      }
    })

    if (!tagihan) return res.status(404).json({ message: "Tagihan tidak ditemukan" });

    // Menghapus tagihan berdasarkan id pelanggan
    await prisma.tagihan.delete({
      where: {
        id: parseInt(tagihan.id)
      }
    })

    res.status(200).json({ message: "Tagihan berhasil dihapus" })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}