import './Start.css'
import '../../colors.css'
import { useNavigate } from "react-router-dom";
import OptionButton from '../../components/optionButtons/OptionButton'

export default function Start() {
  const navigate = useNavigate()
  const handleLogin=() => {
    navigate("/login")
  }

  const handleRegister=() => {
    navigate("/register")
  }

  return (
    <div>
      <div className="parent-container">
        <h2 className="heading">Willkommen bei EduFlow!</h2>
        <p className="text">Das ist dein neuer Organisator für dein Lernerfolg. Leg jetzt los!</p>

        <div className="button-container">
          <OptionButton label={"Anmelden"} onClick={handleLogin}></OptionButton>
          <OptionButton label={"Registrieren"} onClick={handleRegister}></OptionButton>
        </div>
      </div>
    </div>
  )
}
