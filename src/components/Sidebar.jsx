import { axiosInstance } from "@/libs/axiosInterceptor"
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

const Sidebar = () => {
  const [isLogin, setIsLogin] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem("login")
    if (token) {
      setIsLogin(true)
    } else {
      setIsLogin(false)
    }
  }, [])

  const fetchLogout = async () => {
    try {
      // Konfirmasi logout
      const confirmLogout = confirm("Yakin ingin logout?")
      if (confirmLogout) {
        await axiosInstance.delete("/api/auth/logout", {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        })
        alert("Berhasil Logout")
        localStorage.removeItem("login")
        router.push("/").then(() => router.reload())
      } else {
        return
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="h-screen bg-gray-800 text-white w-64 p-5">
      <div className="text-lg font-bold mb-10">
        <Link href="/">
          <h1>Kesetrum Listrik</h1>
        </Link>
      </div>
      <ul>
        <li className="mb-4">
          <Link href="/" className="hover:text-gray-300">
            <h1>Bayar Listrik</h1>
          </Link>
        </li>
        {isLogin ? (
          <>
            <li className="mb-4">
              <Link
                href="#"
                className="hover:text-gray-300"
                onClick={() =>
                  router.push("/admin/dashboard").then(() => router.reload())
                }
              >
                Dashboard
              </Link>
            </li>
            <li className="mb-4">
              <Link
                href="/admin/pelangganregister"
                className="hover:text-gray-300"
              >
                Registrasi Pelanggan
              </Link>
            </li>
            <li className="mb-4">
              <button className="hover:text-gray-300" onClick={fetchLogout}>
                Logout
              </button>
            </li>
          </>
        ) : (
          <li className="mb-4">
            <Link href="/login" className="hover:text-gray-300">
              Login Admin
            </Link>
          </li>
        )}
      </ul>
    </div>
  )
}

export default Sidebar
