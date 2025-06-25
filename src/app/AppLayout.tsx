import { useNavigate, Outlet, createCookie } from "react-router-dom"
import Header from "../components/header/Header.tsx"
import Navbar from "../components/navbar/Navbar.tsx"
import "../styles.css"

import {useEffect, useState} from 'react'

import { useAuth } from "./AuthContext.tsx";


function AppLayout() {
  const navigate = useNavigate();
  const {isAuthenticated, checkAuthentication, isLoaded} = useAuth();
  const [rightButtonState, setRightButtonState] = useState({on: true, text:"", icon:"user-regular.svg", link:"/profile"});
  const [leftButtonState, setLeftButtonState] = useState({on: true, text: "", icon: "Logo.svg", link: "/home"})
  const [textState, setTextState] = useState("Hello User!")

  useEffect(() => {
    if(isLoaded){
      console.log("Checking authentication in AppLayout");
      checkAuthentication();
      if(!isAuthenticated) {
        console.log("User is not authenticated, navigating to login page");
        navigate("/");
      }
    }
  },[isLoaded, navigate]);
  // useEffect(() => { / I think not needed?
  //   if(!isAuthenticated) {
  //     console.log("User is not authenticated, navigating to start page");
  //     navigate("/");
  //   } 
  // }, [isAuthenticated]);

  return (
    <div className="appLayout">
      <Header leftButton={leftButtonState} text={textState} rightButton={rightButtonState}/>
      <div className="appPage"><Outlet /></div>
      <Navbar/>
    </div>
  )
}

export default AppLayout;