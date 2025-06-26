import { useNavigate } from "react-router-dom";
import { logout } from "../../api/logout";
import { useAuth } from "../../app/AuthContext";
import OptionButton from "../../components/optionButtons/OptionButton";
import './Profile.css'

export default function Profile() {
  const navigate = useNavigate();
  const { fetchFromBackend, setIsAuthenticated, setToken, username, setUsername } = useAuth();

  const logoutHandel = () => {
    logout(fetchFromBackend);
    setToken(null);
    setUsername("");
    setIsAuthenticated(false);
    navigate('/');
  }

  return (
    <div className="profile-component">
      <div className="user-div">
        <span>Benutzername:</span>
        <span>{username}</span>
      </div>
      <hr />
      <div className="profile-button">
        <OptionButton
          label="&#9211; Abmelden"
          buttonType="optionButton"
          onClick={logoutHandel}
        />
      </div>
    </div>
  )
}