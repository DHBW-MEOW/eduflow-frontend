import { useState } from 'react';
import './Box.css'

export type BoxData = {
  title: string;
  //content?: string; //INFO: if we need content in the box could this be a optional parameter
};

export type BoxProps = BoxData & {
  onDelete: () => void;
  onRename: () => void;
  menuOpen: boolean;
  onToggleMenu: () => void;
};

export function Box({title, onDelete, onRename, menuOpen, onToggleMenu}: BoxProps) {
  return (
    <div className="box">
      <button className="menu-button" onClick={onToggleMenu}>⋮</button>
      <div className="box-container">
          <h3 className="box-title">{title}</h3>
      </div>

      {menuOpen && (
        <div className="context-menu">
          <button onClick={onRename}>Umbenennen</button>
          <button onClick={onDelete}>Löschen</button>
        </div>
      )}

    </div>
  )
}
  
export default Box;
