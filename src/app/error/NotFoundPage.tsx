import { NavLink, useNavigate } from "react-router-dom";
import "./NotFoundPage.css"
import OptionButton from "../../components/optionButtons/OptionButton";


export default function NotFoundPage() {
  const navigate = useNavigate()
  const handleClick=() => {
    navigate("/home")
  }
  return (
    <div className="notFoundPage">
      <NavLink to="/home">
        <img src="/Logo.svg" alt="Eduflow logo" className="errorImage"/>
      </NavLink>

      <div className="errorText">
        <h1 id="error-headline" className="errorNumber">404 Error</h1>

        <p>Ups... Sorry, irgendwas stört deinen Flow.</p>

        <div className="homeButton">
          <OptionButton 
            label="Zurück zum Flow"
            isHighlighted={true}
            onClick={handleClick} 
          />
        </div>
      </div>
    </div>
  )
}