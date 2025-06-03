import { useState } from "react";
import type { BoxData } from "../../components/grid/Box";
import { Grid } from "../../components/grid/Grid";

function SomePage() {
  const [items, setItems] = useState<BoxData[]>([
    { title: "Box 1" },
    { title: "Ein sehr sehr langer Titel" },
  ]);

  const handleDelete = async (box: BoxData) => {
    console.log("Delete box:", box);
  };

  const handleRename = async (oldBox: BoxData, newTitle: string) => {
    console.log("Rename box:", oldBox, "to", newTitle);
  };

   return (
    <div>
      <h1>Meine Boxen</h1>
      <Grid
        items={items}
        setTitleFunction={setItems}
        onDelete={handleDelete}
        onRename={handleRename}
      />
    </div>
  );
}

export default SomePage;