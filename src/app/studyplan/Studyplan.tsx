import Calendar from "../../components/calendar/Calendar";
import StudyGoals from "../../components/studyGoals/StudyGoals";

function Studyplan() {
  return (
    <div className="studyplan-container">
      <div className="studyplan-calendar">
        <Calendar/>
      </div>
      <div className="studyplan-studygoals">
        <StudyGoals/>
      </div>
    </div>
  )
}

export default Studyplan;