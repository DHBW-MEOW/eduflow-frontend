import { useEffect, useRef, useState } from 'react';
import ContextMenu from '../contextMenu/ContextMenu';
import './Box.css'

export type BoxData = {
  id: string;
  title: string;
};

export type BoxProps = {
  data: BoxData;
  onRename: (id: string, newTitle: string) => void;
  onDelete: (id: string) => void;
};

export function Box({ data, onDelete, onRename }: BoxProps) {
  const [menuOpen, setMenuOpen] = useState(false);

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
    <div className="box" ref={boxRef}>
      <div>
        <h3>{data.title}</h3>
        <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)}>⋮</button>
      </div>

      {menuOpen && (
        <ContextMenu
          actions={[
            { label: "Umbenennen", onClick: handleRename },
            { label: "Löschen", onClick: handleDelete },
          ]}
        />
      )}
    </div>
  );
}

export default Box;
