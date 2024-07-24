import React, { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { axiosInstance } from "@/libs/axiosInterceptor"

const Page = () => {
  const [pelanggan, setPelanggan] = useState({
    telepon: 0,
    alamat: "",
  })

  const router = useRouter()
  const { id } = router.query

  useEffect(() => {
    const fetchPelanggan = async () => {
      try {
        const response = await axiosInstance.get(`/api/pelanggan/${id}`, {
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

    fetchPelanggan()
  }, [])
  const handleChange = (e) => {
    setPelanggan({
      ...pelanggan,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      // Konfirmasi update pelanggan
      const confirm = window.confirm(
        "Apakah anda yakin ingin mengupdate pelanggan ini?"
      )
      if (confirm) {
        // Fetch update pelanggan
        await axiosInstance.put(`/api/admin/updatepelanggan/${id}`, pelanggan)
        alert("Data pelanggan berhasil diupdate")
        router.push("/admin/dashboard")
      } else {
        return
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Update Pelanggan
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="nama" className="block text-gray-700">
              Nama
            </label>
            <input
              type="text"
              id="nama"
              name="nama"
              value={pelanggan.nama}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-gray-800"
              readOnly
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={pelanggan.email}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-gray-800"
              readOnly
            />
          </div>
          <div className="mb-4">
            <label htmlFor="telepon" className="block text-gray-700">
              Nomor Telepon
            </label>
            <input
              type="number"
              id="telepon"
              name="telepon"
              onChange={handleChange}
              value={pelanggan.telepon}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-gray-800"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="telepon" className="block text-gray-700">
              Alamat
            </label>
            <textarea
              name="alamat"
              id="alamat"
              rows="3"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-gray-800"
              onChange={handleChange}
              value={pelanggan.alamat}
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-gray-800 text-white py-2 rounded-md hover:bg-gray-950 transition duration-300"
          >
            Update
          </button>
        </form>
      </div>
    </div>
  )
}

export default Page
