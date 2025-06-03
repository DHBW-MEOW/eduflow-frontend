import Header from "../components/header/Header.tsx"
import Navbar from "../components/navbar/Navbar.tsx"

function Layout({
  children
}: {
  children: React.ReactElement
}) {
  return (
    <div>
      <Header/>
      {children}
      <Navbar/>
    </div>
  )
}

export default Layout;