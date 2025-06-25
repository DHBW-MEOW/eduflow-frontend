import OptionButton from "../../components/optionButtons/OptionButton";
import InputField from "../../components/popUpCreate/inputOptions/InputField";
import "./Login.css";
import { useState } from "react";
import { useNavigate } from "react-router"; 
import { useAuth } from "../../app/AuthContext";


export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isInvalid, setIsInvalid] = useState(false);

  const navigate = useNavigate();
  const { unsafeFetchFromBackend, setToken } = useAuth()

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
      console.log("New state token" + loginToken);
      navigate("/home");
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
      <form onSubmit={(e) => {
        // Prevent default form submission reloading the page
        e.preventDefault();
        if (username && password) {
          handleLogin(username, password);
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
          onClick={() => {}}
        />
      </form>
      <div className="registerLink">
        <span>Sie haben noch keinen Account? </span>
        <a href="/register">Registrieren</a>  
      </div>
    </div>
  )
}