import './Calender.css'
import { useState } from 'react';
import Cell from "./Cell";
import type { CalendarProps, ExamDateData, StudyGoalData } from '../../app/studyplan/types';

const Calendar = ({studygoals, exams}:CalendarProps) => {
    const today = new Date();
    const [month, setMonth] = useState(today.getMonth());
    const [year, setYear] = useState(today.getFullYear());

    const months = [
        "Januar", "Februar", "März", "April", "Mai", "Juni",
        "Juli", "August", "September", "Oktober", "November", "Dezember"
    ];

    const weekdays = [
        "Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"
    ];

    const generateCalendarDays = () => {
        const firstDayOfMonth = new Date(year, month, 1);
        let firstDayWeekday = firstDayOfMonth.getDay();
        if (firstDayWeekday === 0) { firstDayWeekday = 7; }
        const lastDayOfMonth = new Date(year, month + 1, 0); 
        const daysInMonth = lastDayOfMonth.getDate(); 

        const cells = [];
        
        // Fill the first week with empty cells if the month does not start on Monday
        for (let day = 1; day < firstDayWeekday; day++) {
            cells.push(<Cell key={`empty-start-${day}`} />);
        }

        // Fill the calendar with the days of the month
        for (let day = 0; day < daysInMonth; day++) {
            const currentDay = day + 1;
            const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(currentDay).padStart(2, '0')}`;

            // Filter StudyGoals for correct date
            const dailyStudyGoals = studygoals.studygoals.filter((goal: StudyGoalData) => {
                return goal.deadline === dateString;
            });

            // Filter StudyGoals for correct date
            const dailyExams = exams.exams.filter((exam: ExamDateData) => {
                return exam.date === dateString;
            });

            cells.push(
                <Cell
                    key={currentDay}
                    day={currentDay}
                    studygoals={dailyStudyGoals}
                    exams={dailyExams}
                />
            );
        }

        // Fill the remaining cells. Add Logik if one more row is needed
        while (cells.length < 35) {
            cells.push(<Cell key={`empty-end-${cells.length}`} />);
        }
        if (cells.length > 35) {
            while (cells.length < 42) {
                cells.push(<Cell key={`empty-end-${cells.length}`} />);
            }
        }

        return cells;
    };

    const nextMonth = () => {
        if (month === 11) {
            setMonth(0);
            setYear(year + 1);
        } else {
            setMonth(month + 1);
        }
    };

    const previousMonth = () => {
        if (month === 0) {
            setMonth(11);
            setYear(year - 1);
        } else {
            setMonth(month - 1);
        }
    };

    return (
        <div className="calendar-container">
            <div className='calendar-header'>
                {/* Navbar for the Calendar */}
                <div className="calendar-navbar">
                    <button className='navbar-button' onClick={previousMonth}>&lt;&lt;</button>
                    <span>{months[month]} {year}</span>
                    <button className='navbar-button' onClick={nextMonth}>&gt;&gt;</button>
                </div>
                
                {/* Legend */}
                <div className="calendar-legend">
                    <div className="legend-item">
                        <div className="event-dot deadline"></div>
                        <span>Deadline</span>
                    </div>
                    <div className="legend-item">
                        <div className="event-dot exam"></div>
                        <span>Prüfung</span>
                    </div>
                </div>
                
                {/* Weekdays */}
                <div className='calendar-weekdays-container'>
                    <div className="calendar-weekdays">
                        {weekdays.map((day, index) => (
                            <span key={index}>{day}</span>
                        ))}
                    </div>
                </div>
            </div>

            {/* Calendar Grid */}
            <div className="calendar-cell-grid">
                {generateCalendarDays()}
            </div>
        </div>
    )
};

export default Calendar