import { logout } from "../../api/logout";
import OptionButton from "../../components/optionButtons/OptionButton";
import './Profile.css'

export default function Profile() {
  const username: string = "Placeholder for Username from Cache"

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
          onClick={logout}
        />
      </div>
    </div>
  )
}