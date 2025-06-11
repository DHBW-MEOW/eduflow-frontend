import Calendar from "../../components/calendar/Calendar";
import StudyGoals from "../../components/studyGoals/StudyGoals";

function Studyplan() {
  return (
    <div className="studyplan-container">
      <h2>Kalender</h2>
      <div className="studyplan-calendar">
        <Calendar/>
      </div>
      <h2>Meine Lernziele</h2>
      <div className="studyplan-studygoals">
        <StudyGoals/>
      </div>
    </div>
  )
}

export default Studyplan;