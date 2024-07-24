import axios from "axios"
import { useRouter } from "next/router"
import { useState } from "react"
import { FiInfo, FiZap } from "react-icons/fi"

const Page = () => {
  const router = useRouter()
  const [noMeteran, setNoMeteran] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      // Mencocokan nomor meteran dengan database
      const response = await axios.post(
        "/api/pelanggan/checkmeteran",
        { noMeteran },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      console.log(response)

      // Jika nomor meteran cocok arahkan ke halaman bayar

      if (response.data.nomor_meteran === noMeteran) {
        router.push(`/pelanggan/bayar/${noMeteran}`)
      } else {
        alert("Nomor meteran tidak ditemukan")
      }
    } catch (error) {
      if ((error.response.status = 404)) {
        alert("Nomor meteran tidak ditemukan")
      } else {
        console.log(error)
      }
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-5">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md relative">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Pembayaran Listrik
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="no_meteran" className="block text-gray-700">
              Nomor Meteran
            </label>
            <input
              type="text"
              name="no_meteran"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-gray-800"
              value={noMeteran}
              onChange={(e) => setNoMeteran(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gray-700 text-white py-2 rounded-md hover:bg-gray-950 transition duration-300"
          >
            Cek Status
          </button>
        </form>
        <div className="absolute top-0 right-0 mt-4 mr-4">
          <FiZap className="text-yellow-500 text-3xl" />
        </div>
        <div className="absolute bottom-0 left-0 mb-4 ml-4">
          <FiZap className="text-yellow-500 text-3xl" />
        </div>
        <div className="mt-6">
          <div className="flex items-center bg-gray-200 p-4 rounded-md shadow-sm">
            <FiInfo className="text-gray-500 text-xl mr-2" />
            <p className="text-gray-700">
              Pastikan nomor meteran yang Anda masukkan sudah benar.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page
