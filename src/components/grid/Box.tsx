import { useEffect, useRef, useState } from 'react';
import ContextMenu from '../contextMenu/ContextMenu';
import PopUpDelete from '../popUpDelete/PopUpDelete';
import './Box.css'

export type BoxData = {
  id: string;
  title: string;
};

export type BoxProps = {
  data: BoxData;
  onRename: (id: string, newTitle: string) => void;
  onDelete: (id: string) => void;
  onClick: (id: string) => void;
};

export function Box({ data, onDelete, onRename, onClick }: BoxProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [popupDeleteOpen, setPopupDeleteOpen] = useState(false);

  const handleRename = () => {
    const newTitle = prompt('Neuer Titel:', data.title);
    if (newTitle && newTitle !== data.title) {
      onRename(data.id, newTitle);
    }
    setMenuOpen(false);
  };

  const handleDelete = () => {
    onDelete(data.id);
    setMenuOpen(false);
  };

  const openPopUp = () => {
    setPopupDeleteOpen(true);
    setMenuOpen(false);
  }

  const closePopup = () => {
    setPopupDeleteOpen(false);
    setMenuOpen(false);
  }

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
            <h3>{data.title}</h3>
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
            { label: "Umbenennen", onClick: handleRename },
            { label: "Löschen", onClick: openPopUp },
          ]}
        />
      )}

      {
        <PopUpDelete
          isOpen={popupDeleteOpen}
          content={
            <>
              Möchten Sie dieses Element wirklich löschen?<br />
              Diese Aktion kann nicht mehr rückgängig gemacht werden.
            </>
          }
          onClickCancel={closePopup}
          onClickConfirm={handleDelete}
        />
      }
    </div>
  );
}

export default Box;
