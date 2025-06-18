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
    <div className="center-container">
      <div className="parent-container">
        <h2 className="heading">Willkommen bei EduFlow! <br/> Dein Weg zu organisiertem und erfolgreichem Lernen beginnt hier.</h2>
        <p className="text">Dein smarter Begleiter, der dir hilft, dein volles Lernpotenzial zu entfalten. Organisiere deine Lernreise spielend leicht und erreiche deine Ziele mit Freude. Bist du bereit, loszulegen?</p>

        <div className="button-container">
          <OptionButton label={"Anmelden"} onClick={handleLogin}></OptionButton>
          <OptionButton label={"Registrieren"} onClick={handleRegister}></OptionButton>
        </div>
      </div>
    </div>
  )
}
