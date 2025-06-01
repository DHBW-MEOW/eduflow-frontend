import "./NavbarButton.css"
import { NavLink } from "react-router-dom";

function NavbarButton({
  text,
  icon,
  to
}: {
  text: string,
  icon: string,
  to: string
}) {
  return (
    <>
      <NavLink to={to} >
        <img src={"/" + icon} alt="" />
        <div className="buttonText">{text}</div>
      </NavLink>
    </>
  )
}

export default NavbarButton;