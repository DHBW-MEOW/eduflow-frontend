import OptionButton from "../../components/optionButtons/OptionButton";
import InputField from "../../components/popUpCreate/inputOptions/InputField";
import "./Login.css";
import { useState } from "react";


export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isInvalid, setIsInvalid] = useState(false);

  const handleLogin = () => {
    console.log("Login button clicked");
  };

  return (
    <div className="loginPage">
      <form onSubmit={(e) => {
        // Prevent default form submission reloading the page
        e.preventDefault();
        if (username && password) {
          handleLogin();
          setIsInvalid(false);
        } else {
          setIsInvalid(true);
        }
      }
      }>
        <InputField
          label="Benutzername"
          name="username"
          value={username}
          isInvalid={isInvalid}
          errorMessage={isInvalid ? "Bitte geben Sie einen Benutzernamen ein." : ""}
          onChange={(e) => setUsername(e.target.value)}
        />
        <InputField
          label="Kennwort"
          name="password"
          value={password}
          isInvalid={isInvalid}
          errorMessage={isInvalid ? "Bitte geben Sie ein Kennwort ein." : ""}
          onChange={(e) => setPassword(e.target.value)}
        />
        <OptionButton
          label="Anmelden"
          buttonType="optionButton"
          onClick={handleLogin}
        />
      </form>
      <div className="registerLink">
        <span>Sie haben noch keinen Account? </span>
        <a href="/register">Registrieren</a>  
      </div>
    </div>
  )
}