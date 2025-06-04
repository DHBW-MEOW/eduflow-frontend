import LinkButton from "../linkButton/LinkButton.tsx";
//import { LinkButtonProps } from "../linkButton/LinkButton.tsx"
import "./Navbar.css"

function Navbar() {
  return (
    <div className="navbar">
      <LinkButton to="/" text="Home" icon="house-solid.svg"/>
      <LinkButton to="/studyplan" text="Lernplan" icon="graduation-cap-solid.svg"/>
      <LinkButton to="/modules" text="Module" icon="book-open-reader-solid.svg"/>
      <LinkButton to="/todo" text="ToDo" icon="circle-check-regular.svg"/>
    </div>
  )
}

export default Navbar