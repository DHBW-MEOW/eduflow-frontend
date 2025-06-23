import InputField from "../../components/popUpCreate/inputOptions/InputField";
import OptionButton from "../../components/optionButtons/OptionButton";
import "./Register.css";
import { useEffect, useState } from "react";
//import { useAuth } from "../../app/AuthContext";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../app/AuthContext";

export default function Register() {
  const navigate = useNavigate();

  const [localUsername, setLocalUsername] = useState("");
  const [passwordOne, setPasswordOne] = useState("");
  const [passwordTwo, setPasswordTwo] = useState("");
  const [passwordValidity, setPasswordValidity] = useState({ valid: true, message: "" });
  const [usernameValidity, setUsernameValidity] = useState({ valid: true, message: "" });
  const [userTaken, setUserTaken] = useState(false);  
  const [successfullyRegistered, setSuccessfullyRegistered] = useState(false);

  const { token, setToken, setIsAuthenticated, fetchFromBackend, unsafeFetchFromBackend, setUsername} = useAuth();

  //useEffect(() => {
  //  const verifyToken = async () => {
  //      const response = await unsafeFetchFromBackend({
  //        method: "GET",
  //        endpoint: "auth/verify-token",
  //      });
  //      if(response.status === 200) {
  //        console.log("User is authenticated and cant register");
  //        setIsAuthenticated(true);
  //        navigate("/home");
  //      }
  //  }
  //  verifyToken();
  //}, [navigate]);

  const handleNavigation = ()   =>{
    console.log("Navigating to login page");
    navigate("/login"  );
  }

  const handleRegister = async (username: string, password: string) => {
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
        }>
          <InputField
            label="Benutzername"
            name="username"
            value={localUsername}
            isInvalid={!usernameValidity.valid}
            errorMessage={usernameValidity.message}
            onChange={(e) => setLocalUsername(e.target.value)}
          />
          <InputField
            label="Kennwort"
            name="passwordOne"
            value={passwordOne}
            isPassword={true}
            isInvalid={!passwordValidity.valid}
            errorMessage={passwordValidity.message}
            onChange={(e) => setPasswordOne(e.target.value)}
          />
          <InputField
            label="Kennwort wiederholen"
            name="passwordTwo"
            value={passwordTwo}
            isPassword={true}
            isInvalid={!passwordValidity.valid}
            errorMessage={passwordValidity.message}
            onChange={(e) => setPasswordTwo(e.target.value)}
          />
          {
            userTaken && <div className="error-message">Dieser Benutzername ist leider schon vergeben.</div>
          }
          <OptionButton
            label="Registrieren"
            buttonType="optionButton"
            onClick={() => {} /*handleRegister(username, password) */}
          />
        </form>
      }
      {
        successfullyRegistered && 
        <div className="success-message">
          <div> Sie haben sich erfolgreich registriert! Bitte melden Sie sich an. </div>
          <OptionButton
            label="Zum Login"
            buttonType="optionButton"
            onClick={handleNavigation}
          />
        </div>
      }
    </div>
  )
}