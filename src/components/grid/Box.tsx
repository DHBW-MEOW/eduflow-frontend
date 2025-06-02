import { useEffect, useRef, useState } from 'react';
import './Box.css'

export type BoxData = {
  title: string;
};

export type BoxProps = BoxData & {
  onDelete: () => void;
  onRename: () => void;
};

export function Box({ title, onDelete, onRename }: BoxProps) {
  const [menuOpen, setMenuOpen] = useState(false);
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
        <h3>{title}</h3>
        <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)}>⋮</button>
      </div>

      {menuOpen && (
        <div className="context-menu">
          <button onClick={() => { onRename(); setMenuOpen(false); }}>Umbenennen</button>
          <button onClick={() => { onDelete(); setMenuOpen(false); }}>Löschen</button>
        </div>
      )}
    </div>
  );
}

export default Box;
