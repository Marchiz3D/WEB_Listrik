import axios from "axios"
import React, { useEffect, useState } from "react"
import { useRouter } from "next/router"
import useSnap from "../../../hooks/useSnap.js"
import { FiInfo } from "react-icons/fi"

const Page = () => {
  const router = useRouter()
  const [pelanggan, setPelanggan] = useState({
    nama: "",
    email: "",
    nomor_meteran: "",
    telepon: 0,
    alamat: "",
  })
  const [tagihan, setTagihan] = useState({
    meteran: 0,
    jumlah_tagihan: 0,
    tanggal_tagihan: "",
  })
  const [tagihanExist, setTagihanExist] = useState(false)
  const [showPopup, setShowPopup] = useState(false)
  const { embededSnap } = useSnap()
  const { noMeteran } = router.query

  useEffect(() => {
    if (router.isReady) {
      fetchPelanggan()
      fetchGetTagihan()
    }
  }, [router.isReady])

  const fetchPelanggan = async () => {
    try {
      const response = await axios.get(
        `/api/pelanggan/checkpelanggan/${noMeteran}`,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      )

      setPelanggan(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  const fetchGetTagihan = async () => {
    try {
      const response = await axios.get(`/api/tagihan/${noMeteran}`, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      })

      if (response.status === 200) {
        const { tanggal_tagihan, ...tagihan } = response.data

        setTagihanExist(true)
        const date = new Date(response.data.tanggal_tagihan)
        const options = { day: "2-digit", month: "long", year: "numeric" }
        const formatDate = date.toLocaleDateString("id-ID", options)
        setTagihan({
          ...tagihan,
          tanggal_tagihan: formatDate,
        })
      }
    } catch (error) {
      if (error.response.status === 404) {
        setTagihanExist(false)
      } else {
        console.log(error)
      }
    }
  }

  const fetchDeleteTagihan = async () => {
    try {
      await axios.delete(`/api/tagihan/deletetagihan/${noMeteran}`, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      })
    } catch (error) {
      console.log(error)
    }
  }

  const handleChangePelanggan = (e) => {
    setPelanggan({
      ...pelanggan,
      [e.target.name]: e.target.value,
    })
  }

  const handleChangeTagihan = (e) => {
    setTagihan({
      ...tagihan,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      // Mengambil id Tagihan
      const tagihan = await axios.get(`/api/tagihan/${noMeteran}`)
      let idTagihan = tagihan.data.id
      idTagihan = parseInt(idTagihan)

      // Membuat transaksi popup
      const transaction = await axios.get(`/api/transaction/${idTagihan}`)

      const snapToken = transaction.data.transaction.token

      if (transaction) {
        setShowPopup(true)
        embededSnap(snapToken, "snap-midtrans", {
          onSuccess: function (result) {
            /* You may add your own implementation here */
            alert("Payment Succes")
            // Delete tagihan
            fetchDeleteTagihan()
            setTagihanExist(false)
            setShowPopup(false)
          },
          onPending: function (result) {
            /* You may add your own implementation here */
            alert("wating your payment!")
            console.log(result)
            setShowPopup(false)
          },
          onError: function (result) {
            /* You may add your own implementation here */
            alert("payment failed!")
            console.log(result)
            setShowPopup(false)
          },
          onClose: function () {
            /* You may add your own implementation here */
            alert("you closed the popup without finishing the payment")
          },
        })
      }
    } catch (error) {
      console.log(error)
      alert("Tagihan tidak ditemukan")
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-3">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl overflow-hidden">
        {!showPopup && (
          <form onSubmit={handleSubmit}>
            <h1 className="text-2xl font-bold mb-6 text-center">
              Pembayaran Listrik
            </h1>

            <div className="flex justify-between">
              <div className="w-1/2 pr-4">
                <h3 className="text-lg font-semibold mb-4">Data Pelanggan</h3>
                <div className="mb-4">
                  <label htmlFor="nama" className="block text-gray-700">
                    Nama
                  </label>
                  <input
                    type="text"
                    name="nama"
                    id="nama"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-gray-800"
                    onChange={handleChangePelanggan}
                    value={pelanggan.nama}
                    readOnly
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-gray-800"
                    onChange={handleChangePelanggan}
                    value={pelanggan.email}
                    readOnly
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="no_meteran" className="block text-gray-700">
                    Nomor Meteran
                  </label>
                  <input
                    type="text"
                    name="no_meteran"
                    id="no_meteran"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-gray-800"
                    onChange={handleChangePelanggan}
                    value={pelanggan.nomor_meteran}
                    readOnly
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="telepon" className="block text-gray-700">
                    Telepon
                  </label>
                  <input
                    type="number"
                    name="telepon"
                    id="telepon"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-gray-800"
                    onChange={handleChangePelanggan}
                    value={pelanggan.telepon}
                    readOnly
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="alamat" className="block text-gray-700">
                    Alamat
                  </label>
                  <textarea
                    name="alamat"
                    id="alamat"
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-gray-800"
                    onChange={handleChangePelanggan}
                    value={pelanggan.alamat}
                    readOnly
                  ></textarea>
                </div>
              </div>

              <div className="w-1/2 pl-4">
                <h3 className="text-lg font-semibold mb-4">Data Tagihan</h3>
                {tagihanExist ? (
                  <>
                    <div className="mb-4">
                      <label htmlFor="meteran" className="block text-gray-700">
                        Jumlah Meteran
                      </label>
                      <input
                        type="text"
                        name="meteran"
                        id="meteran"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-gray-800"
                        onChange={handleChangeTagihan}
                        value={tagihan.meteran}
                        readOnly
                      />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="tanggal" className="block text-gray-700">
                        Tanggal
                      </label>
                      <input
                        type="text"
                        name="tanggal"
                        id="tanggal"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-gray-800"
                        onChange={handleChangeTagihan}
                        value={tagihan.tanggal_tagihan}
                        readOnly
                      />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="total" className="block text-gray-700">
                        Total Tagihan
                      </label>
                      <input
                        type="number"
                        name="total"
                        id="total"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-gray-800"
                        onChange={handleChangeTagihan}
                        value={tagihan.jumlah_tagihan}
                        readOnly
                      />
                    </div>
                  </>
                ) : (
                  <div className="flex items-center bg-green-200 p-4 rounded-md shadow-sm">
                    <FiInfo className="text-gray-500 text-xl mr-2" />
                    <p className="text-gray-700">Tagihan telah dibayarkan</p>
                  </div>
                )}
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gray-700 text-white py-2 rounded-md hover:bg-gray-900 transition duration-300"
            >
              Bayar
            </button>
          </form>
        )}
        <div id="snap-midtrans"></div>
      </div>
    </div>
  )
}

export default Page
