import { axiosInstance } from "@/libs/axiosInterceptor"
import React, { useEffect, useState } from "react"
import { useRouter } from "next/router"

const Page = () => {
  const [pelanggan, setPelanggan] = useState([])

  useEffect(() => {
    fetchPelanggan()
  }, [])

  const fetchPelanggan = async () => {
    try {
      const response = await axiosInstance.get("/api/pelanggan", {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      })
      setPelanggan(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="h-screen bg-gray-100 p-5">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 shadow-xl">
          <thead>
            <tr>
              <th className="border-b p-2 text-center">No</th>
              <th className="border-b p-2 text-center">Nama</th>
              <th className="border-b p-2 text-center">Email</th>
              <th className="border-b p-2 text-center">Nomor Meteran</th>
              <th className="border-b p-2 text-center">Telepon</th>
              <th className="border-b p-2 text-center">Alamat</th>
            </tr>
          </thead>
          <tbody>
            {pelanggan.map((item, index = 0) => {
              return (
                <tr key={item.id}>
                  <td className="border-b p-2 text-center">{index + 1}</td>
                  <td className="border-b p-2 text-center">{item.nama}</td>
                  <td className="border-b p-2 text-center">{item.email}</td>
                  <td className="border-b p-2 text-center">
                    {item.nomor_meteran}
                  </td>
                  <td className="border-b p-2 text-center">{item.telepon}</td>
                  <td className="border-b p-2 text-center">{item.alamat}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Page
