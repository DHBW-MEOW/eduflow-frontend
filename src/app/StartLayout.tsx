import { Outlet } from "react-router-dom";
import Header from "../components/header/Header.tsx";
import "../styles.css";

import { useState } from "react";

function StartLayout() {
  const [leftButtonState] = useState({
    on: true,
    text: "",
    icon: "Logo.svg",
    link: "/",
  });
  const [textState] = useState("EduFlow");

  return (
    <div className="startLayout">
      <Header
        leftButton={leftButtonState}
        text={textState}
        rightButton={{ on: false, text: "", icon: "", link: "" }}
      />
      <div className="startPage">
        <Outlet />
      </div>
    </div>
  );
}

export default StartLayout;
