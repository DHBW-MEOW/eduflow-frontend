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
  };

  const validateData = (username: string, password: string): boolean => {
    // Check that not both are 0
    if (!username || !password) {
      setIsInvalid(true);
      return false;
    }
    if (password.length < 8) { 
      setIsInvalid(true);
      return false;
    }
    setIsInvalid(false);
    return true;
  }

  return (
    <div className="registerPage">
      <div>Hier können Sie sich registrieren.</div>
      <form onSubmit={(e) => {
        // Prevent default form submission reloading the page
        e.preventDefault();
        if (validateData(username, password)) { 
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