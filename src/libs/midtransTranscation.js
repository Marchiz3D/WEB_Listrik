import midtransClient from "midtrans-client";
import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";

const prisma = new PrismaClient();

const snap = new midtransClient.Snap({
  isProduction: false,
  serverKey: process.env.SNAP_SERVER_KEY,
  clientKey: process.env.SNAP_CLIENT_KEY
})

export const createTransaction = async ({ jmlTagihan }, res) => {
  try {
    // Membuat transaksi
    const transaction = await snap.createTransaction({
      transaction_details: {
        order_id: uuidv4(),
        gross_amount: jmlTagihan
      }
    })

    return transaction;
  } catch (error) {
    console.log(error)
  }
}