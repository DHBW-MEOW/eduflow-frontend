import "./Grid.css";
import { Box, type BoxData } from "./Box.tsx";

type GridProps = {
  items: BoxData[];
  setTitleFunction: React.Dispatch<React.SetStateAction<BoxData[]>>;
  onDelete: (item: BoxData) => void;
  onRename: (oldItem: BoxData, newTitle: string) => void;
};

export function Grid({ items, setTitleFunction, onDelete, onRename }: GridProps) {
  const handleDelete = (index: number) => {
    const item = items[index];
    setTitleFunction((prev) => prev.filter((_, i) => i !== index));
    onDelete(item);
  };

  const handleRename = (index: number) => {
    const oldItem = items[index];
    const newTitle = prompt("Neuer Titel:");
    if (newTitle) {
      setTitleFunction((prev) =>
        prev.map((item, i) => (i === index ? { ...item, title: newTitle } : item))
      );
      onRename(oldItem, newTitle);
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
        />
      ))}
    </div>
  );
}
