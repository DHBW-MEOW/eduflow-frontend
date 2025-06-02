import "./Header.css"
import NavbarButton from "../navbar/navbarButton/NavbarButton.tsx"

function Header({
  button,
  text
}: {
  button: {
    text: string,
    icon: string,
    to: string
  }, 
  text: string,
}) {
  return (
    <div className="header">
      <NavbarButton to={button.to} text={button.text} icon={button.icon} />
      <div className="headerText">{text}</div>
    </div>
  )
}

export default Header;
