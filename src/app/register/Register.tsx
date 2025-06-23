import InputField from "../../components/popUpCreate/inputOptions/InputField";
import OptionButton from "../../components/optionButtons/OptionButton";
import "./Register.css";
import { useState } from "react";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isInvalid, setIsInvalid] = useState(false);

  const handleRegister = () => {
    console.log("Register button clicked");
    // Here you would typically send the username and password to your backend
    // for registration, e.g., using fetch or axios.
  };


  return (
    <div className="registerPage">
      <div>Hier können Sie sich registrieren.</div>
      <form onSubmit={(e) => {
        // Prevent default form submission reloading the page
        e.preventDefault();
        if (username && password) {
          handleRegister();
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
          label="Registrieren"
          buttonType="optionButton"
          onClick={handleRegister}
        />
      </form>
    </div>
  )
}