import { useNavigate } from "react-router-dom";
import { logout } from "../../api/logout";
import { useAuth } from "../../app/AuthContext";
import OptionButton from "../../components/optionButtons/OptionButton";
import './Profile.css'

export default function Profile() {
  const navigate = useNavigate();
  const { unsafeFetchFromBackend, setIsAuthenticated, setToken, username, setUsername } = useAuth();

  const logoutHandel = () => {
    logout(unsafeFetchFromBackend);
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
      <div>
        <OptionButton
          label="Abmelden"
          buttonType="optionButton"
          onClick={logoutHandel}
        />
      </div>
    </div>
  )
}