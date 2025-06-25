import InputField from "../../components/popUpCreate/inputOptions/InputField";
import OptionButton from "../../components/optionButtons/OptionButton";
import "./Register.css";
import { useEffect, useState } from "react";
//import { fetchFromBackend } from "../../fetchBackend";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../app/AuthContext";

export default function Register() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isInvalid, setIsInvalid] = useState(false);
  const [userTaken, setUserTaken] = useState(false);  
  const [successfullyRegistered, setSuccessfullyRegistered] = useState(false);

  const { token, setToken, setIsAuthenticated, fetchFromBackend, unsafeFetchFromBackend} = useAuth();

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
    console.log("Uesrname:", username, "Password:", password);

    const response = await unsafeFetchFromBackend({
      method: "POST",
      endpoint: "auth/register",
      body: {
        username: username,
        password: password
      }
    })
    console.log("Response:", response); 
    if (response.status === 200){
      const data = await response.json();
      const registerToken = data.token;
      setIsAuthenticated(true);
      localStorage.setItem("token", registerToken);
      localStorage.setItem("username", username);
      setToken(registerToken)
      console.log("New state token" + token);
      navigate("/home");
    }else if (response.status === 409) {
      console.error("Username already taken");
      setUserTaken(true);
    }else {
      throw new Error(`Error when calling (POST auth/register): ${response.status}`);
    }
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
      <h2>Registrierung</h2>
      { !successfullyRegistered &&
        <form onSubmit={(e) => {
          console.log("Form submitted");
          // Prevent default form submission reloading the page
          e.preventDefault();
          if (validateData(username, password)) { 
            handleRegister(username, password);
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