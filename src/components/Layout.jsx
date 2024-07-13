import Sidebar from "./sidebar"

const Layout = ({ children }) => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-10">{children}</div>
    </div>
  )
}

export default Layout
