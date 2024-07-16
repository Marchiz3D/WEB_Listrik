import { axiosInstance } from "@/libs/axiosInterceptor"
import React, { useEffect, useState } from "react"
import { useRouter } from "next/router"
import Link from "next/link"

const Page = () => {
  const [pelanggan, setPelanggan] = useState([])
  const router = useRouter()

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

  const deletePelanggan = async (id) => {
    try {
      const confirm = window.confirm(
        "Apakah anda yakin ingin menghapus pelanggan ini?"
      )
      if (confirm) {
        // Delete pelanggan [id]
        await axiosInstance.delete(`/api/admin/deletepelanggan/${id}`, {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        })

        alert("Data pelanggan berhasil di hapus")
        router.reload()
      } else {
        return
      }
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
              <th className="border-b p-2 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {pelanggan.map((item, index) => (
              <tr key={item.id}>
                <td className="border-b p-2 text-center">{index + 1}</td>
                <td className="border-b p-2 text-center">{item.nama}</td>
                <td className="border-b p-2 text-center">{item.email}</td>
                <td className="border-b p-2 text-center">
                  {item.nomor_meteran}
                </td>
                <td className="border-b p-2 text-center">{item.telepon}</td>
                <td className="border-b p-2 text-center max-h-32 overflow-y-auto">
                  {item.alamat}
                </td>
                <td className="border-b p-2 text-center">
                  <Link
                    href={`/admin/updatepelanggan/${item.id}`}
                    className="bg-blue-500 text-white px-4 py-1 rounded mr-2 hover:bg-blue-600 transition"
                  >
                    Update
                  </Link>
                  <button
                    className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 transition"
                    onClick={() => deletePelanggan(item.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Page
