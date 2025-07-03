import "./StudyGoals.css";
import ListItem from "./ListItem";
import type { ItemProps } from "../../app/studyplan/types";

const StudyGoals = ({ items, limit }: ItemProps) => {
  if (limit === undefined) {
    limit = items.length;
  }

  return (
    <div className="studyGoals">
      {items.length > 0 ? (
        items
          .slice(0, limit)
          .map((item) => (
            <ListItem
              key={item.key}
              course={item.course}
              topic={item.topic}
              deadline={item.deadline}
            />
          ))
      ) : (
        <span>Keine Lernziele vorhanden...</span>
      )}
    </div>
  );
};

export default StudyGoals;
