import Header from "../components/header/Header.tsx"
import Navbar from "../components/navbar/Navbar.tsx"
import "../styles.css"

function Layout({
  children
}: {
  children: React.ReactElement
}) {
  return (
    <div className="layout">
      <Header button={{text: "", icon: "house-solid.svg", to: "/"}} text="Hello User!"/>
      <div className="page">{children}</div>
      <Navbar/>
    </div>
  )
}

export default Layout;