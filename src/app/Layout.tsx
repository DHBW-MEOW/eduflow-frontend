import Header from "../components/header/Header.tsx"
import Navbar from "../components/navbar/Navbar.tsx"

function Layout({
  children
}: {
  children: React.ReactElement
}) {
  return (
    <p>
      <Header/>
      {children}
      <Navbar/>
    </p>
  )
}

export default Layout;