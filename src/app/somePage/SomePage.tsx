import { Grid } from "../../components/grid/Grid";

// just an example
const data = [
  { title: "Box 1"},
  { title: "Box 2"},
  { title: "Box 3"},
];

function SomePage() {
  return (
    <div>
      <Grid items={data} />
    </div>
  )
}

export default SomePage;