import { Outlet } from "react-router-dom"
import Header from "../components/header/Header.tsx"
import Navbar from "../components/navbar/Navbar.tsx"
import "../styles.css"

import {useState} from 'react'

function Layout({
  children
}: {
  children: React.ReactNode
}) {
  const [rightButtonState, setRightButtonState] = useState({on: true, text:"", icon:"user-regular.svg", link:"/profile"});
  const [leftButtonState, setLeftButtonState] = useState({on: true, text: "", icon: "Logo.svg", link: "/"})
  const [textState, setTextState] = useState("Hello User!")

  return (
    <div className="layout">
      <Header leftButton={leftButtonState} text={textState} rightButton={rightButtonState}/>
      <div className="page"><Outlet /></div>
      <Navbar/>
    </div>
  )
}

export default Layout;