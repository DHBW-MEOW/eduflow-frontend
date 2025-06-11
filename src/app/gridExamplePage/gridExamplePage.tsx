import { useState } from "react";
import { Grid } from "../../components/grid/Grid";
import type { BoxData } from "../../components/grid/Box";

function GridExamplePage() {
  const newElement: BoxData = { id: 5, name: "Box 3", details: "" };

  const [items, setItems] = useState<BoxData[]>([
    { id: 1, name: "Box 1", details: "" },
    { id: 2, name: "Ein sehr sehr langer Titel", details: "" },
  ]);

  const addItem = () => {
    setItems(oldItems => [...oldItems, newElement]);
  }

  const handleRename = (id: number, newTitle: string) => {
    console.log(`Rename: ID=${id}, Neuer Titel=${newTitle}`);
  };

  const handleDelete = (id: number) => {
    console.log(`Delete: ID=${id}`);
  };

  const handleClick = (id: number) => {
    console.log(`Clicked: ID=${id}`);
  };

  return (
    <div className="app">
      <button onClick={addItem}>Add Item</button>
      <Grid
        items={items}
        setItems={setItems}
        onRename={handleRename}
        onDelete={handleDelete}
        onClick={handleClick}
      />
    </div>
  );
}

export default GridExamplePage;