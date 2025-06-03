import { useState } from "react";
import { Grid } from "../../components/grid/Grid";
import type { BoxData } from "../../components/grid/Box";

function SomePage() {
  const elements1: BoxData[] = [
    { id: "1", title: "Box 1" },
    { id: "2", title: "Box 2" },
  ];

  const newEleement: BoxData = { id: "5", title: "Box 3" };

  const [items, setItems] = useState<BoxData[]>([
    { id: "1", title: "Box 1" },
    { id: "2", title: "Ein sehr sehr langer Titel" },
  ]);

  const addItem = () => {
    setItems(oldItems => [...oldItems, newEleement]);
  }

  const handleRename = (id: string, newTitle: string) => {
    console.log(`Rename: ID=${id}, Neuer Titel=${newTitle}`);
    // Hier z.B. POST/PUT an Backend
  };

  const handleDelete = (id: string) => {
    console.log(`Delete: ID=${id}`);
    // Hier z.B. DELETE an Backend
  };

  return (
    <div className="app">
      <button onClick={addItem}>Add Item</button>
      <Grid
        items={items}
        setItems={setItems}
        onRename={handleRename}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default SomePage;