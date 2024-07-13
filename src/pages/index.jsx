import Link from "next/link"

const Page = () => {
  return (
    <div>
      <div className="bg-white rounded-lg overflow-hidden shadow-md">
        <div className="p-4">
          <h2 className="text-xl font-bold mb-2">Card 1</h2>
          <p className="text-gray-700">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
            consectetur pharetra magna, ac iaculis metus mollis eget.
          </p>
          <Link href="/card1" legacyBehavior>
            <a className="block mt-2 text-blue-600 hover:underline">
              Read more
            </a>
          </Link>
          <button className="bg-blue-500">CLICK ME</button>
        </div>
      </div>
    </div>
  )
}

export default Page
