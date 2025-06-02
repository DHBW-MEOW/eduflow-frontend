import { useState } from "react";
import type { BoxData } from "../../components/grid/Box";
import { Grid } from "../../components/grid/Grid";

function SomePage() {
  const [items, setItems] = useState<BoxData[]>([
    { title: "Box 1" },
    { title: "Ein sehr sehr langer Titel" },
  ]);

  return <Grid items={items} setTitleFunction={setItems} />;
}

export default SomePage;