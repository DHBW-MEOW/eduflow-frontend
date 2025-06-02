import "./Grid.css";
import { Box, type BoxData } from "./Box.tsx";

type GridProps = {
  items: BoxData[];
  setTitleFunction: React.Dispatch<React.SetStateAction<BoxData[]>>;
};

export function Grid({ items, setTitleFunction }: GridProps) {
  const handleDelete = (index: number) => {
    setTitleFunction((prev) => prev.filter((_, i) => i !== index));
  };

  const handleRename = (index: number) => {
    const newTitle = prompt("Neuer Titel:");
    if (newTitle) {
      setTitleFunction((prev) =>
        prev.map((item, i) => (i === index ? { ...item, title: newTitle } : item))
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
        />
      ))}
    </div>
  );
}
