import { useLocation, Outlet } from "react-router-dom";
import Header from "../components/header/Header.tsx";
import Navbar from "../components/navbar/Navbar.tsx";
import HeaderContext from "../app/HeaderContext.tsx";
import "../styles.css";

import { useEffect, useState } from "react";

import { useAuth } from "./AuthContext.tsx";

function AppLayout() {
  const { token, username, isAuthenticated, checkAuthentication, isLoaded } =
    useAuth();
  const [rightButtonState, setRightButtonState] = useState({
    on: true,
    text: "",
    icon: "user-regular.svg",
    link: "/profile",
  });
  const [leftButtonState, setLeftButtonState] = useState({
    on: true,
    text: "",
    icon: "Logo.svg",
    link: "/home",
  });
  const [textState, setTextState] = useState("Hello User!");

  const location = useLocation();
  useEffect(() => {
    if (location.pathname === "/home") {
      setLeftButtonState({
        on: true,
        text: "",
        icon: "Logo.svg",
        link: "/home",
      });
      setTextState("Hello " + username + "!");
    }
    if (location.pathname === "/studyplan") {
      setLeftButtonState({
        on: true,
        text: "",
        icon: "Logo.svg",
        link: "/home",
      });
      setTextState("Lernplan");
    }
    if (location.pathname === "/modules") {
      setLeftButtonState({
        on: true,
        text: "",
        icon: "Logo.svg",
        link: "/home",
      });
      setTextState("Module");
    }
    if (location.pathname === "/profile") {
      setLeftButtonState({
        on: true,
        text: "",
        icon: "circle-arrow-left-solid.svg",
        link: "/home",
      });
      setTextState("Profil");
    }
  }, [location.pathname, username]);

  return (
    <HeaderContext value={{ setLeftButtonState, setTextState }}>
      <div className="appLayout">
        <Header
          leftButton={leftButtonState}
          text={textState}
          rightButton={rightButtonState}
        />
        <div className="appPage">
          <Outlet />
        </div>
        <Navbar />
      </div>
    </HeaderContext>
  );
}

export default AppLayout;
