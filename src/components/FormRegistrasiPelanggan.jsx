import React, { useState } from "react"

const FormRegistrasiPelanggan = () => {
  const [pelanggan, setPelanggan] = useState({
    nama: "",
    email: "",
    telepon: "",
    alamat: "",
  })

  const handleChange = (e) => {
    setPelanggan({
      ...pelanggan,
      [e.target.name]: e.target.value,
    })
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      // Fetching registrasi untuk pelanggan
      const response = await fetch("/api/admin/addpelanggan", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(pelanggan),
      })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Register Pelanggan
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
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-gray-800"
              required
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
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-gray-800"
              required
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
              value={pelanggan.telepon}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-gray-800"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="alamat" className="block text-gray-700">
              Alamat
            </label>
            <textarea
              name="alamat"
              id="alamat"
              rows="3"
              value={pelanggan.alamat}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-gray-800"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-gray-800 text-white py-2 rounded-md hover:bg-gray-950 transition duration-300"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  )
}

export default FormRegistrasiPelanggan
