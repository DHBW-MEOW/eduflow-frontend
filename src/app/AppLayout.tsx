import { useMatch, useLocation, useNavigate, Outlet, createCookie } from "react-router-dom"
import Header from "../components/header/Header.tsx"
import Navbar from "../components/navbar/Navbar.tsx"
import "../styles.css"

import {use, useEffect, useState} from 'react'

import { useAuth } from "./AuthContext.tsx";


function AppLayout() {
  const navigate = useNavigate();
  const { token, username, isAuthenticated, checkAuthentication, isLoaded} = useAuth();
  const [rightButtonState, setRightButtonState] = useState({on: true, text:"", icon:"user-regular.svg", link:"/profile"});
  const [leftButtonState, setLeftButtonState] = useState({on: true, text: "", icon: "Logo.svg", link: "/home"})
  const [textState, setTextState] = useState("Hello User!")

  const location = useLocation();
  //const match = useMatch();

  //useEffect(() => {
  //  if(isLoaded){
  //    console.log("Checking authentication in AppLayout, Token:", token);
  //    checkAuthentication();
  //    if(!isAuthenticated) {
  //      console.log("User is not authenticated, navigating to login page, is loaded and is not authenticated");
  //      navigate("/");
  //    }
  //  }
  //},[isLoaded, isAuthenticated, navigate]);
  // useEffect(() => { / I think not needed?
  //   if(!isAuthenticated) {
  //     console.log("User is not authenticated, navigating to start page");
  //     navigate("/");
  //   } 
  // }, [isAuthenticated]);
  useEffect(() => {
    console.log("Location changed to: ", location.pathname);
    if(location.pathname === "/home") {
      setLeftButtonState({on: true, text: "", icon: "Logo.svg", link: "/home"});
      setTextState("Hello " + username +  "!");
    }
    if(location.pathname === "/studyplan") {
      setLeftButtonState({on: false, text: "", icon: "Logo.svg", link: "/home"});
      setTextState("Lernplan");
    }
    if(location.pathname === "/modules") {
      setLeftButtonState({on: false, text: "", icon: "Logo.svg", link: "/home"});
      setTextState("Module");
    }
    if(location.pathname === "/profile") {
      setLeftButtonState({on: true, text: "", icon: "Logo.svg", link: "/home"});
      setTextState("Profil");
    }
  }, [location.pathname, username,]);

  return (
    <div className="appLayout">
      <Header leftButton={leftButtonState} text={textState} rightButton={rightButtonState}/>
      <div className="appPage"><Outlet /></div>
      <Navbar/>
    </div>
  )
}

export default AppLayout;