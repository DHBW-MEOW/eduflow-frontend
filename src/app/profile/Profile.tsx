import { useNavigate } from "react-router-dom";
import { logout } from "../../api/logout";
import OptionButton from "../../components/optionButtons/OptionButton";
import './Profile.css'

export default function Profile() {
  const navigate = useNavigate();
  const username: string = "Placeholder for Username from Cache"

  const logoutHandel = () => {
    logout;
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