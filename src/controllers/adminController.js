import { createRefreshToken, createToken } from "@/libs/jwt.js";
import { PrismaClient } from "@prisma/client";
import Cookies from "cookies";
import { v4 as uuidv4 } from "uuid";

const prisma = new PrismaClient();
export const loginAdmin = async (req, res) => {
  const cookies = new Cookies(req, res);
  try {
    const { username, password } = req.body;

    const admin = await prisma.admin.findFirst({
      where: {
        username,
        password
      }
    })

    // Cek apakah admin terdaftar
    if (!admin) return res.status(404).json({ message: "Admin tidak ditemukan" });

    // Membuat token JWT
    const token = createToken(admin);
    const refreshToken = createRefreshToken(admin);

    // Menyimpan token ke database
    await prisma.admin.update({
      where: {
        username
      },
      data: {
        refreshToken: refreshToken
      }
    })

    // Menyimpan refrshtoken ke cookie
    cookies.set("refreshToken", refreshToken, { httpOnly: true, maxAge: 15 * 60 * 1000, sameSite: "strict", path: "/" });

    res.status(200).json({ admin: { nama: admin.nama, username: admin.username }, token });
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: error.message });
  }
}

export const logoutAdmin = async (req, res) => {
  const cookies = new Cookies(req, res);
  try {
    const refreshToken = cookies.get('refreshToken')

    // Cek apakah admin ada atau tidak
    const admin = await prisma.admin.findFirst({
      where: {
        refreshToken: refreshToken
      }
    })

    if (!admin) return res.status(404).json({ message: "Admin tidak ditemukan" });

    // Membuat sistem logout
    // Hapus cookie
    cookies.set('refreshToken')

    // Hapus refreshtoken dari database
    await prisma.admin.update({
      where: {
        username: admin.username
      },
      data: {
        refreshToken: null
      }
    })

    res.status(200).json({ message: "Logout success" });
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: error.message });
  }
}

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
    const pelanggan = await prisma.pelanggan.findMany({
      include: {
        tagihan: true
      }
    });

    if (!pelanggan) return res.status(400).json({ message: "Pelanggan tidak ditemukan" })

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