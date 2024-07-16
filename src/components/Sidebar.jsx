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
      const response = await axiosInstance.delete("/api/auth/logout", {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      })

      if (response) {
        // Konfirmasi logout
        const confirmLogout = confirm("Yakin ingin logout?")
        if (confirmLogout) {
          alert("Berhasil Logout")
          localStorage.removeItem("login")
        } else {
          return
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="h-screen bg-gray-800 text-white w-64 p-5">
      <div className="text-lg font-bold mb-10">Dashboard</div>
      <ul>
        <li className="mb-4">
          <Link href="/admin/pelangganregister" className="hover:text-gray-300">
            Registrasi Pelanggan
          </Link>
        </li>
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
        {isLogin ? (
          <li className="mb-4">
            <button className="hover:text-gray-300" onClick={fetchLogout}>
              Logout
            </button>
          </li>
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
