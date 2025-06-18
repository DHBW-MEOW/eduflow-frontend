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
        <div>Ups... Sorry, irgendwas stört deinen Flow.</div>
        <div className="homeButton">
          <OptionButton 
            label="Zurück zum Flow" 
            onClick={handleClick} 
          />
        </div>
      </div>
    </div>
  )
}