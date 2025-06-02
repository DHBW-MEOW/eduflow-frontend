import Header from "../components/header/Header.tsx"
import Navbar from "../components/navbar/Navbar.tsx"

function Layout({
  children
}: {
  children: React.ReactElement
}) {
  return (
    <div>
      <Header button={{text: "", icon: "house-solid.svg", to: "/"}} text="Hello User!"/>
      {children}
      <Navbar/>
    </div>
  )
}

export default Layout;