import "./Grid.css";
import { Box, type BoxProps } from "./Box.tsx";

type GridProps = {
  items: BoxProps[];
};

export function Grid({ items }: GridProps) {
  return (
    <div className="grid-container">
      {items.map((item, idx) => (
        <Box key={idx} {...item} />
      ))}
    </div>
  );
}