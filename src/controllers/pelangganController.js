import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();

export const createPelanggan = async (req, res) => {
  try {
    const { nama, email, telepon, alamat } = req.body;
    // Mengambil data keseluruhan pelanggan
    const pelanggans = await PrismaClient.pelanggan.findMany();

    // Cek apakah pelanggan sudah ada berdasarkan email
    if (pelanggans.some(pelanggan => pelanggan.email === email)) return res.status(409).json({ message: "Pelanggan sudah ada" });

    // Membuat data pelanggan
    const pelanggan = await prisma.pelanggan.create({
      data: {
        nama,
        email,
        nomor_meteran: uuidv4(),
        telepon,
        alamat
      }
    })

    res.status(201).json({ pelanggan });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export const getAllPelanggan = async (req, res) => {
  try {
    const pelanggan = await prisma.pelanggan.findMany();

    res.status(200).json(pelanggan);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}