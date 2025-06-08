import Header from "../components/header/Header.tsx"
import Navbar from "../components/navbar/Navbar.tsx"
import "../styles.css"

import {useState} from 'react'

function Layout({
  children
}: {
  children: React.ReactElement
}) {
  const [rightButtonState, setRightButtonState] = useState({on: true, text:"", icon:"user-regular.svg", link:"/profile"});
  const [leftButtonState, setLeftButtonState] = useState({on: true, text: "", icon: "house-solid.svg", link: "/"})
  const [textState, setTextState] = useState("Hello User!")

  return (
    <div className="layout">
      <Header leftButton={leftButtonState} text={textState} rightButton={rightButtonState}/>
      <div className="page">{children}</div>
      <Navbar/>
    </div>
  )
}

export default Layout;