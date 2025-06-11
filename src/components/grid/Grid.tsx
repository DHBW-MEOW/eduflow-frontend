import React from "react";
import { Box, type BoxData } from "./Box.tsx";
import "./Grid.css";

type GridProps = {
  items: BoxData[];
  setItems: React.Dispatch<React.SetStateAction<BoxData[]>>;
  onRename: (id: number, newTitle: string) => void;
  onDelete: (id: number) => void;
  onClick: (id: number) => void;
};

export function Grid({ items, setItems, onRename, onDelete, onClick }: GridProps) {

  const handleRename = (id: number, newTitle: string) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, name: newTitle } : item))
    );
    onRename(id, newTitle);
  };

  const handleDelete = (id: number) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
    onDelete(id);
  };

  const handleClick = (id: number) => {
    onClick(id);
  };

  return (
    <div className="grid-container">
      {items.map((item) => (
        <Box
          key={item.id}
          data={item}
          onDelete={handleDelete}
          onRename={handleRename} 
          onClick={handleClick}        
        />
      ))}
    </div>
  );
}
