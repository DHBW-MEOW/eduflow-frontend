import "./LinkButton.css"
import { NavLink } from "react-router-dom";

export interface LinkButtonProps {
  text: string;
  icon: string;
  link: string;
}

const LinkButton: React.FC<LinkButtonProps> = ({text, icon, link }) => {
  return (
    <NavLink to={link} className={({ isActive }) => 
        isActive ? "linkButton active" : "linkButton"}>
      <img src={"/" + icon} alt={text} />
      <div className="buttonText">{text}</div>
    </NavLink>
  )
}

export default LinkButton;