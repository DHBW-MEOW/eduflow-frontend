import NavbarButton from "./navbarButton/NavbarButton";
import "./Navbar.css"

function Navbar() {
  return (
    <div className="navbar">
      <NavbarButton to="/" text="Home" icon="house-solid.svg"/>
      <NavbarButton to="/studyplan" text="Lernplan" icon="graduation-cap-solid.svg"/>
      <NavbarButton to="/modules" text="Module" icon="book-open-reader-solid.svg"/>
      <NavbarButton to="/todo" text="ToDo" icon="circle-check-regular.svg"/>
    </div>
  )
}

export default Navbar