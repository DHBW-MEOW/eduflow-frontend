import { useEffect, useRef, useState } from "react";
import "./Grid.css";
import { Box, type BoxData } from "./Box.tsx";

type GridProps = {
  items: BoxData[];
  setTitleFunction: React.Dispatch<React.SetStateAction<BoxData[]>>;
};

export function Grid({ items, setTitleFunction }: GridProps) {
  const [openMenuIndex, setOpenMenuIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleDelete = (index: number) => {
    setTitleFunction((prev) => prev.filter((_, i) => i !== index));
    setOpenMenuIndex(null);
  };

  const handleRename = (index: number) => {
    const newTitle = prompt("Neuer Titel:");
    if (newTitle) {
      setTitleFunction((prev) =>
        prev.map((item, i) => (i === index ? { ...item, title: newTitle } : item))
      );
    }
    setOpenMenuIndex(null);
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      // Wenn kein Menü offen, nichts machen
      if (openMenuIndex === null) return;

      // Prüfen, ob der Klick im Grid-Container war
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpenMenuIndex(null);
      }
    }

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [openMenuIndex]);

  return (
    <div className="grid-container" ref={containerRef}>
      {items.map((item, idx) => (
        <Box
          key={idx}
          title={item.title}
          onDelete={() => handleDelete(idx)}
          onRename={() => handleRename(idx)}
          menuOpen={openMenuIndex === idx}
          onToggleMenu={() =>
            setOpenMenuIndex((prev) => (prev === idx ? null : idx))
          }
        />
      ))}
    </div>
  );
}
