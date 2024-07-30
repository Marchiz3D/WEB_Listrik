import { PrismaClient } from "@prisma/client";
import Cookies from "cookies";
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export const refreshToken = async (req, res) => {
  const cookies = new Cookies(req, res);
  try {
    // Mengambil refreshToken dari cookie
    const refreshToken = cookies.get('refreshToken');

    // Cek apakah ada refreshToken
    if (!refreshToken) return res.status(401).json({ message: "Unauthorized" });

    // Cek apakah data admin ada
    const admin = await prisma.admin.findFirst({
      where: {
        refreshToken
      }
    })

    // Jika tidak ada data admin kirimkan error
    if (!admin) return res.status(401).json({ message: "Data admin tidak ada" });

    // Cek expired token
    jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY, (err, decoded) => {
      if (err) return res.status(401).json({ message: "Token expired" });

      // Membuat token baru
      const token = jwt.sign({ nama: admin.nama, username: admin.username }, process.env.JWT_SECRET_KEY, {
        expiresIn: '1d'
      })

      res.status(200).json({ token });
    })

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
