import "./Cell.css";
import type { StudyGoalData, ExamDateData } from "../../app/studyplan/types";

type CellProps = {
  day?: number;
  studygoals?: StudyGoalData[];
  exams?: ExamDateData[];
};

const Cell = ({ day, studygoals, exams }: CellProps) => {
  const hasStudygoals = studygoals && studygoals.length > 0;
  const hasExams = exams && exams.length > 0;
  const totalEvents = (studygoals?.length || 0) + (exams?.length || 0);

  const showDeadlineDot = hasStudygoals;
  const showExamDot = hasExams;
  const showPlus = totalEvents > 2;

  return (
    <div className="calendar-cell">
      {day && <span className="cell-day">{day}</span>}

      <div className="events-container">
        {showDeadlineDot && (
          <div
            className="event-dot deadline"
            title={`${studygoals?.length} Deadline${studygoals?.length !== 1 ? "s" : ""}`}
          />
        )}

        {showExamDot && (
          <div
            className="event-dot exam"
            title={`${exams?.length} Prüfung${exams?.length !== 1 ? "en" : ""}`}
          />
        )}

        {showPlus && (
          <span className="event-plus" title={`${totalEvents} Events total`}>
            +
          </span>
        )}
      </div>
    </div>
  );
};

export default Cell;
