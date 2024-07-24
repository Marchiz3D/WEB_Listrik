import { useRouter } from "next/router"
import React, { useState } from "react"

const FormLoginAdmin = () => {
  const [admin, setAdmin] = useState({
    username: "",
    password: "",
  })

  const router = useRouter()

  const handleChange = (e) => {
    setAdmin({
      ...admin,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      // Fetching api untuk login admin
      let response = await fetch("/api/auth/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(admin),
      })
      response = await response.json()
      localStorage.setItem("login", true)
      alert("Berhasil Login")
      router.push("/admin/dashboard").then(() => router.reload())
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login Admin</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={admin.username}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-gray-800"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={admin.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-gray-800"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gray-800 text-white py-2 rounded-md hover:bg-gray-950 transition duration-300"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  )
}

export default FormLoginAdmin
