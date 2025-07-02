import "./Header.css"
import LinkButton from "../linkButton/LinkButton.tsx"

function Header({
  leftButton,
  text,
  rightButton
}: {
  leftButton: {
    on: boolean,
    text: string,
    icon: string,
    link: string
  }, 
  text: string,
  rightButton: {
    on: boolean,
    text: string,
    icon: string,
    link: string
  }
}) {

  return (
    <div className="header">
      <div className="headerLeft">
        {leftButton.on && <LinkButton link={leftButton.link} text={leftButton.text} icon={leftButton.icon}/>}
        <h1 id={text + '-headline'}>{text}</h1>
      </div>
      <div className="headerRight">
        {rightButton.on && <LinkButton link={rightButton.link} text={rightButton.text} icon={rightButton.icon}/>}
      </div>
    </div>
  )
}

export default Header;
