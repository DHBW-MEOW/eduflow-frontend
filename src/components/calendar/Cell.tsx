import './Cell.css'
import type { StudyGoalData, ExamDateData } from '../../app/studyplan/types';

type CellProps = {
    day?: number;
    studygoals?: StudyGoalData[];
    exams?: ExamDateData[];
};

const Cell = ({day, studygoals, exams}: CellProps) => {
    const MAX_DOTS_FOR_EXAMS = 3;
    const MAX_DOTS_FOR_STUDYGOALS = 3;

    return (
        <div className="calendar-cell">
            {day && <span className="cell-day">{day}</span>}

            {studygoals && studygoals.length > 0 && (
                <div className="exams-container">
                    {studygoals.map((studygoal, index) => (
                        <div 
                            key={index}
                            className={'event-dot.deadline'} 
                        />
                    ))}
                </div>
            )}

            {studygoals && studygoals.length > 0 && (
                <div className="exams-container">
                    {studygoals.slice(0, MAX_DOTS_FOR_STUDYGOALS).map((studygoal) => (
                        <div
                            key={studygoal.id}
                            className={'event-dot deadline'}
                        />
                    ))}
                </div>
            )}

            {exams && exams.length > 0 && (
                <div className="exams-container">
                    {exams.slice(0, MAX_DOTS_FOR_EXAMS).map((exam) => (
                        <div
                            key={exam.id}
                            className={'event-dot exam'}
                        />
                    ))}
                </div>
            )}
        </div>
    )
};

export default Cell