import { createRefreshToken, createToken } from "@/libs/jwt.js";
import { PrismaClient } from "@prisma/client";
import Cookies from "cookies";

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
    // res.setHeader("Set-Cookie", [
    //   cookie.serialize("refreshToken", refreshToken, {
    //     httpOnly: true,
    //     maxAge: 15 * 60 * 1000,
    //     sameSite: "strict",
    //     path: "/",
    //   })
    // ])
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

