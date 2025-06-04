import "./LinkButton.css"
import { NavLink } from "react-router-dom";

export type LinkButtonProps = {
  text: string,
  icon: string,
  to: string
}

const LinkButton: React.FC<LinkButtonProps> = ({text, icon, to }) => {
  return (
    <>
      <NavLink to={to} >
        <img src={"/" + icon} alt="" />
        <div className="buttonText">{text}</div>
      </NavLink>
    </>
  )

}

export default LinkButton;