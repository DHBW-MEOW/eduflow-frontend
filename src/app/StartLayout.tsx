import { Outlet, useNavigate } from "react-router-dom"
import Header from "../components/header/Header.tsx"
import "../styles.css"

import {useState, useEffect, use} from 'react'
import { useAuth } from "./AuthContext.tsx";

function StartLayout() {
  const navigate = useNavigate();
  const {isAuthenticated, checkAuthentication, isLoaded} = useAuth();
  const [leftButtonState, setLeftButtonState] = useState({on: true, text: "", icon: "Logo.svg", link: "/"})
  const [textState, setTextState] = useState("EduFlow")
  //useEffect(() => {
  //  if(isLoaded){
  //    console.log("Checking authentication in AppLayout");
  //    checkAuthentication();
  //  }
  //},[isLoaded, navigate]);
  //useEffect(() => {
  //  if(isAuthenticated) {
  //    console.log("User is authenticated, navigating to home page");
  //    if(location.pathname === "/" || location.pathname === "/login" || location.pathname === "/register") {
  //      navigate("/home");
  //    }
  //  } 
  //}, [isAuthenticated]);

  return (
    <div className="startLayout">
      <Header leftButton={leftButtonState} text={textState} rightButton={{on: false, text: "", icon: "", link:""}}/>
      <div className="startPage"><Outlet /></div>
    </div>
  )
}

export default StartLayout;