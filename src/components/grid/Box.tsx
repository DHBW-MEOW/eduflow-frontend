import { useEffect, useRef, useState } from 'react';
import ContextMenu from '../contextMenu/ContextMenu';
import PopUpDelete from '../popUpDelete/PopUpDelete';
import PopUpCreate from '../popUpCreate/PopUpCreate';
import Rename from '../popUpCreate/popUpTypes/Rename';
import type { RenameData, RenameHandles } from '../popUpCreate/types';
import './Box.css'

export type BoxData = {
  id: number;
  name: string;
};

export type BoxProps = {
  data: BoxData;
  onRename: (id: number, newTitle: string) => void;
  onDelete: (id: number) => void;
  onClick: (id: number) => void;
};

export function Box({ data, onDelete, onRename, onClick }: BoxProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [popupDeleteOpen, setPopupDeleteOpen] = useState(false);
  const [popupRenameOpen, setPopupRenameOpen] = useState(false);
  const renameRef = useRef<RenameHandles>(null);

  const handleRename = () => {
    if (renameRef.current) {
      const newTitle: RenameData = renameRef.current.getFormData();
      onRename(data.id, newTitle.title);
      closePopupRename();
    }
  };

  const handleDelete = () => {
    onDelete(data.id);
  };

  const openPopUpDelete = () => {
    setPopupDeleteOpen(true);
    setMenuOpen(false);
  };

  const closePopupDelete = () => {
    setPopupDeleteOpen(false);
  };

  const openPopUpRename = () => {
    setPopupRenameOpen(true);
    setMenuOpen(false);
  };

  const closePopupRename = () => {
    setPopupRenameOpen(false);
  };

  const handleClick = () => {
    onClick(data.id);
  };

  //menu disappears by mouse-click outside of the menu
  const boxRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (boxRef.current && !boxRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    }

    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuOpen]);

  return (
    <div className="box" onClick={handleClick} ref={boxRef}>
      <div>
        <div className="header-container">
            <h3>{data.name}</h3>
        </div>
        <button className="menu-button" onClick={(event) => {
            event.stopPropagation();
            setMenuOpen(!menuOpen);
          }}
        >⋮</button>
      </div>

      {menuOpen && (
        <ContextMenu
          actions={[
            { label: "Umbenennen", onClick: openPopUpRename },
            { label: "Löschen", onClick: openPopUpDelete },
          ]}
        />
      )}

      {
        <PopUpDelete
          isOpen={popupDeleteOpen}
          content={
            <>
              Möchten Sie das Element "{data.name}" wirklich löschen?<br />
              Diese Aktion kann nicht mehr rückgängig gemacht werden.
            </>
          }
          onClickCancel={closePopupDelete}
          onClickConfirm={handleDelete}
        />
      }
      {
        <PopUpCreate 
          isOpen={popupRenameOpen} 
          label={"\"" + data.name + "\" umbenennen"} 
          onClickDiscard={closePopupRename}
          onClickAdd={handleRename}
        >
          <Rename ref={renameRef} />
        </PopUpCreate>
      }
    </div>
  );
}

export default Box;
