import OptionButton from "../../components/optionButtons/OptionButton";
import InputField from "../../components/popUpCreate/inputOptions/InputField";
import LinkButton from "../../components/linkButton/LinkButton";
import "./Login.css";
import "../../components/popUpCreate/inputOptions/InputStyle.css";
import { useState } from "react";
import { useAuth } from "../../app/AuthContext";


export default function Login() {
  const [localUsername, setLocalUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isInvalid, setIsInvalid] = useState(false);
  const [passwordValidity, setPasswordValidity] = useState({ valid: true, message: "" });
  const [usernameValidity, setUsernameValidity] = useState({ valid: true, message: "" });

  const { setIsAuthenticated, unsafeFetchFromBackend, setToken, setUsername } = useAuth()

  const handleLogin = async (username: string, password: string) => {
    console.log("Login button clicked");
    console.log("Username:", username, "Password:", password);

   const response = await unsafeFetchFromBackend({
      method: "POST",
      endpoint: "auth/login",
      body: {
        username: username,
        password: password
      }
    });
    console.log("Response:", response);
    if (response.status === 200) {
      const data = await response.json();
      const loginToken = data.token;
      localStorage.setItem("token", loginToken);
      localStorage.setItem("username", username);
      setToken(loginToken);
      setUsername(username);
      console.log("New state token" + loginToken);
      setIsAuthenticated(true);
    }else if(response.status === 401){
      setIsInvalid(true);
      console.error("Login failed: Invalid credentials");
      username = "";
      password = "";
    }else {
      throw new Error(`Error when calling (POST auth/login): ${response.status}`);
    }
  };

  return (
    <div className="loginPage">
      <div className="login-linkbutton">
          <LinkButton link={'/'} text={''} icon={'circle-arrow-left-solid.svg'}/>
      </div>
      <h1>Login</h1>
      
      <form className="login-form" onSubmit={(e) => {
        // Prevent default form submission reloading the page
        e.preventDefault();
        if (!(localUsername) && !(password)) {
          setUsernameValidity({ valid: false, message: "Bitte geben Sie einen Benutzernamen ein." });
          setPasswordValidity({ valid: false, message: "Bitte geben Sie ein Kennwort ein." });
          setIsInvalid(false);
        } else if(!(localUsername) && password) {
          setUsernameValidity({ valid: false, message: "Bitte geben Sie einen Benutzernamen ein." });
          setPasswordValidity({ valid: true, message: "" });
          setIsInvalid(false);
        } else if(localUsername && !(password)) {
          setUsernameValidity({ valid: true, message: "" });
          setPasswordValidity({ valid: false, message: "Bitte geben Sie ein Kennwort ein." });
          setIsInvalid(false);
        } else {
          setUsernameValidity({ valid: true, message: "" });
          setPasswordValidity({ valid: true, message: "" });
          setIsInvalid(false);
          handleLogin(localUsername, password);
        }
      }
      }>
        <div className="login-inputfields">
            <InputField
              label="Benutzername"
              name="username"
              value={localUsername}
              isInvalid={(!usernameValidity.valid) || isInvalid}
              errorMessage={usernameValidity.message}
              onChange={(e) => setLocalUsername(e.target.value)}
          />
          <InputField
              label="Kennwort"
              name="password"
              value={password} 
              isPassword={true}
              isInvalid={(!passwordValidity.valid) || isInvalid}
              errorMessage={passwordValidity.message}
              onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        
        <div className="error-message-placeholder">
          {isInvalid && <span className="error-message">Benutzername oder Kennwort ungültig</span>}
        </div>
        
        <div className="login-submit">
          <OptionButton
            label="Anmelden"
            isHighlighted={true}
            onClick={() => {}}
          />
        </div>
      </form>
      <div className="registerLink">
        <span>Sie haben noch keinen Account? </span>
        <a href="/register">Registrieren</a>  
      </div>
    </div>
  )
}