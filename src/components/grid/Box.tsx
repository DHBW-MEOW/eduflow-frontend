import { useState } from 'react';
import './Box.css'

export type BoxData = {
  title: string;
  //content?: string; //INFO: if we need content in the box could this be a optional parameter
};

export type BoxProps = BoxData & {
  onDelete: () => void;
  onRename: () => void;
};

export function Box({title, onDelete, onRename}: BoxProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div className="box">
      <div>
        <h3>{title}</h3>
        <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)}>⋮</button>
      </div>

      {menuOpen && (
        <div className="context-menu">
          <button onClick={onRename}>✏️ Umbenennen</button>
          <button onClick={onDelete}>🗑️ Löschen</button>
        </div>
      )}

    </div>
  )
}
  
  export default Box;