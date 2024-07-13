import { createRefreshToken, createToken } from "@/libs/jwt.js";
import { PrismaClient } from "@prisma/client";
import cookie from 'cookie';
import { cookies } from "next/headers";

const prisma = new PrismaClient();

const getAdmin = async (req, res) => {
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

    // Menyimpan token ke cookie
    res.setHeader("Set-Cookie", cookie.serialize("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 15 * 60 * 1000
    }))

    res.status(200).json({ admin: { nama: admin.nama, username: admin.username }, token, refreshToken });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export { getAdmin }