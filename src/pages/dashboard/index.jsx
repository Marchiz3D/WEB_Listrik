import { useEffect, useState } from "react"

export default function Page() {
  const [admin, setAdmin] = useState([])

  useEffect(() => {
    const fetchAdmin = async () => {
      const response = await fetch("/api/admin")
      const data = await response.json()
      console.log(data)
    }

    fetchAdmin()
  }, [])

  return (
    <div>
      <p>Hello World</p>
      <button className="bg-blue-500">CLICK ME</button>
    </div>
  )
}
