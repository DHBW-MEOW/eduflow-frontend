import React from "react";
import { Box, type BoxData } from "./Box.tsx";
import "./Grid.css";

type GridProps = {
  items: BoxData[];
  setItems: React.Dispatch<React.SetStateAction<BoxData[]>>;
  onRename: (id: string, newTitle: string) => void;
  onDelete: (id: string) => void;
};

export function Grid({ items, setItems, onRename, onDelete  }: GridProps) {

  const handleRename = (id: string, newTitle: string) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, title: newTitle } : item))
    );
    onRename(id, newTitle);
  };

  const handleDelete = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
    onDelete(id);
  };

  return (
    <div className="grid-container">
      {items.map((item) => (
        <Box
          key={item.id}
          data={item}
          onDelete={ handleDelete }
          onRename={ handleRename }
        />
      ))}
    </div>
  );
}
