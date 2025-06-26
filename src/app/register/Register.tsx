import InputField from "../../components/popUpCreate/inputOptions/InputField";
import OptionButton from "../../components/optionButtons/OptionButton";
import "./Register.css";
import { useEffect, useState } from "react";
//import { useAuth } from "../../app/AuthContext";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../app/AuthContext";

export default function Register() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [passwordOne, setPasswordOne] = useState("");
  const [passwordTwo, setPasswordTwo] = useState("");
  const [passwordValidity, setPasswordValidity] = useState({ valid: true, message: "" });
  const [usernameValidity, setUsernameValidity] = useState({ valid: true, message: "" });
  const [dataValidity, setDataValidity] = useState(false);
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

  const validateData = (username: string, passwordOne: string, passwordTwo: string): boolean => {
    let valid = true;
    if (!username) {
      setUsernameValidity({ valid: false, message: "Benutzername darf nicht leer sein" });
      valid = false;
    }else{
      setUsernameValidity({ valid: true, message: "" });
    }
    
    const password = passwordOne;
    if (passwordOne !== passwordTwo) {
      setPasswordValidity({ valid: false, message: "Kennwörter müssen übereinstimmen" });
      valid = false;
    }
    else if(!password) {
      setPasswordValidity({ valid: false, message: "Kennwort darf nicht leer sein" });
      valid = false;
    }
    else if (password.length < 8) { 
      setPasswordValidity({ valid: false, message: "Das Kennwort muss mindestens 8 Zeichen lang sein" });
      valid = false;
    }
    else {
      setPasswordValidity({ valid: true, message: "" });
    }
    return valid;
  }

  return (
    <div className="registerPage">
      <h2>Registrierung</h2>
      { !successfullyRegistered &&
        <form onSubmit={(e) => {
          console.log("Form submitted");
          // Prevent default form submission reloading the page
          e.preventDefault();
          if (validateData(username, passwordOne, passwordTwo)) { 
            console.log("Data is valid, proceeding with registration");
            handleRegister(username, passwordOne);
          }
        }
        }>
          <InputField
            label="Benutzername"
            name="username"
            value={username}
            isInvalid={!usernameValidity.valid}
            errorMessage={usernameValidity.message}
            onChange={(e) => setUsername(e.target.value)}
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