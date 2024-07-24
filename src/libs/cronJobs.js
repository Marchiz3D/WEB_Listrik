import cron from "node-cron";
import { PrismaClient } from "@prisma/client";
import { createTagihan } from "../controllers/tagihanController.js";

const prisma = new PrismaClient();

// Membuat scheduler cron job setiap 1 bulan
cron.schedule('0 0 1 * *', async () => {
  try {
    // Mengmabil semua pelanggan
    const pelanggans = await prisma.pelanggan.findMany();

    // Membuat tagihan untuk setiap pelanggan
    for (const pelanggan of pelanggans) {
      await createTagihan({ query: { noMeteran: pelanggan.nomor_meteran } })
    }

  } catch (error) {
    console.error('Gagal membuat tagihan', error);
  }
})