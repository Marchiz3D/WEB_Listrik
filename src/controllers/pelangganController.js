import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();

export const createPelanggan = async (req, res) => {
  try {
    const { nama, email, telepon, alamat } = req.body;

    // Cek apakah pelanggan sudah ada berdasarkan email
    const checkPelanggan = await prisma.pelanggan.findFirst({
      where: {
        email
      }
    })

    if (checkPelanggan) return res.status(400).json({ message: "Pelanggan sudah ada" })

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

    res.status(201).json({ message: "Data pelanggan berhasil ditambahkan" }, pelanggan);
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

export const getPelanggan = async (req, res) => {
  try {
    let { id } = req.query
    id = parseInt(id)

    const pelanggan = await prisma.pelanggan.findFirst({
      where: {
        id
      }
    })

    if (!pelanggan) return res.status(400).json({ message: "Pelanggan tidak ditemukan" })

    res.status(200).json(pelanggan);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export const updatePelanggan = async (req, res) => {
  try {
    let { id } = req.query
    id = parseInt(id)
    const { telepon, alamat } = req.body

    // Cek pelanggan berdasarkan id
    const pelanggan = await prisma.pelanggan.findFirst({
      where: {
        id
      }
    })

    if (!pelanggan) return res.status(400).json({ message: "Pelanggan tidak ditemukan" })

    // Update pelanggan
    const updatedPelanggan = await prisma.pelanggan.update({
      where: {
        id
      },
      data: {
        telepon,
        alamat
      }
    })

    res.status(200).json({ message: "Data pelanggan berhasil diupdate" }, updatedPelanggan);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export const deletePelangggan = async (req, res) => {
  try {
    let { id } = req.query
    id = parseInt(id)

    // Cek pelanggan berdasarkan id
    const pelanggan = await prisma.pelanggan.findFirst({
      where: {
        id
      }
    })

    if (!pelanggan) return res.status(400).json({ message: "Pelanggan tidak ditemukan" })

    // Delete pelanggan
    await prisma.pelanggan.delete({
      where: {
        id
      }
    })

    res.status(200).json({ message: "Data pelanggan berhasil dihapus" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}