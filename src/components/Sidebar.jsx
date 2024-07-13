import Link from "next/link"

const Sidebar = () => {
  return (
    <div className="h-screen bg-gray-800 text-white w-64 p-5">
      <div className="text-lg font-bold mb-10">Dashboard</div>
      <ul>
        <li className="mb-4">
          <Link href="/" legacyBehavior>
            <a className="hover:text-gray-300">Home</a>
          </Link>
        </li>
        <li className="mb-4">
          <Link href="/about" legacyBehavior>
            <a className="hover:text-gray-300">About</a>
          </Link>
        </li>
        <li className="mb-4">
          <Link href="/contact" legacyBehavior>
            <a className="hover:text-gray-300">Contact</a>
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default Sidebar
