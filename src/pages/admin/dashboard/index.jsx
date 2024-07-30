import { axiosInstance } from "@/libs/axiosInterceptor"
import Link from "next/link"
import React, { useEffect, useState } from "react"

const Page = () => {
  const [pelanggans, setPelanggans] = useState({
    jumlahPelanggan: 0,
    jumlahSudahBayar: 0,
    jumlahBelumBayar: 0,
  })

  useEffect(() => {
    fetchPelanggans()
  }, [])

  const fetchPelanggans = async () => {
    try {
      const response = await axiosInstance.get("/api/pelanggan")
      const jumlahPelanggan = response.data.length

      // Menghitung pelanggan yang sudah bayar dan belum bayar
      const jumlahBelumBayar = response.data.filter(
        (pelanggan) => pelanggan.tagihan.length > 0
      ).length
      const jumlahSudahBayar = response.data.filter(
        (pelanggan) => pelanggan.tagihan.length === 0
      ).length

      setPelanggans({
        jumlahPelanggan,
        jumlahSudahBayar,
        jumlahBelumBayar,
      })

      console.log(
        { jumlahPelanggan, jumlahSudahBayar, jumlahBelumBayar },
        response
      )
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-5">
      <h1 className="text-3xl font-bold mb-10">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
        <div className="bg-white p-8 rounded-lg shadow-lg text-center">
          <h2 className="text-xl font-bold">Jumlah Pelanggan</h2>
          <p className="text-3xl mt-4">{pelanggans.jumlahPelanggan}</p>
        </div>
        <div className="bg-white p-8 rounded-lg shadow-lg text-center">
          <h2 className="text-xl font-bold">Sudah Bayar</h2>
          <p className="text-3xl mt-4">{pelanggans.jumlahSudahBayar}</p>
        </div>
        <div className="bg-white p-8 rounded-lg shadow-lg text-center">
          <h2 className="text-xl font-bold">Belum Bayar</h2>
          <p className="text-3xl mt-4">{pelanggans.jumlahBelumBayar}</p>
        </div>
      </div>
      <div className="mt-10">
        <Link
          href="/admin/dashboard/pelanggan"
          className="bg-gray-700 hover:bg-gray-950 text-white p-2 rounded-lg shadow-lg text-center transition-all"
        >
          Detail Pelanggan
        </Link>
      </div>
    </div>
  )
}

export default Page
