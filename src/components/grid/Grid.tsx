import "./Grid.css";
import { Box, type BoxData } from "./Box.tsx";
import { useState } from "react";

type GridProps = {
  items: BoxData[];
  setTitleFunction: React.Dispatch<React.SetStateAction<BoxData[]>>;
};


export function Grid({ items, setTitleFunction }: GridProps) {
  const [openMenuIndex, setOpenMenuIndex] = useState<number | null>(null);
  
  const handleDelete = (index: number) => {
    setTitleFunction((prev) => prev.filter((_, i) => i !== index));
  };

  const handleRename = (index: number) => {
    const newTitle = prompt("Neuer Titel:");
    if (newTitle) {
      setTitleFunction((prev) =>
        prev.map((item, i) =>
          i === index ? { ...item, title: newTitle } : item
        )
      );
    }
  };

  return (
    <div className="grid-container">
      {items.map((item, idx) => (
        <Box
          key={idx}
          title={item.title}
          onDelete={() => handleDelete(idx)}
          onRename={() => handleRename(idx)}
          menuOpen={openMenuIndex === idx}
          onToggleMenu={() => setOpenMenuIndex(prev => (prev === idx ? null : idx))}
        />
      ))}
    </div>
  );
}