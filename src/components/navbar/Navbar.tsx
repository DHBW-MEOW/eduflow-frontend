import LinkButton from "../linkButton/LinkButton.tsx";
import "./Navbar.css"

function Navbar() {
  return (
    <div className="navbar">
      <LinkButton link="/home" text="Home" icon="house-solid.svg"/>
      <LinkButton link="/studyplan" text="Lernplan" icon="graduation-cap-solid.svg"/>
      <LinkButton link="/modules" text="Module" icon="book-open-reader-solid.svg"/>
    </div>
  )
}

export default Navbar