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
        <h2 className="errorNumber">404 Error</h2>

        <p>Ups... Sorry, irgendwas stört deinen Flow.</p>

        <div className="homeButton">
          <OptionButton 
            buttonType="optionButton"
            label="Zurück zum Flow" 
            onClick={handleClick} 
          />
        </div>
      </div>
    </div>
  )
}