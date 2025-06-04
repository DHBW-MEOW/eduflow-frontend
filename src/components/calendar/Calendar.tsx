import './Calender.css'
import { useState } from 'react';
import Cell from "./Cell";

const Calendar = () => {
    const today = new Date();
    const [month, setMonth] = useState(today.getMonth());
    const [year, setYear] = useState(today.getFullYear());

    type Event = { type: "deadline" | "exam"; title: string };
    const events: { [date: string]: Event[] } = { // Examples and Placeholder for events from backend
        '2025-06-15': [{ type: 'deadline', title: 'Project Due' }],
        '2025-06-20': [
            { type: 'exam', title: 'Math Exam' },
            { type: 'deadline', title: 'Project' }
        ],
        '2025-06-25': [{ type: 'deadline', title: 'Essay Due' }],
    };

    const months = [
        "Januar", "Februar", "März", "April", "Mai", "Juni",
        "Juli", "August", "September", "Oktober", "November", "Dezember"
    ];

    const weekdays = [
        "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag", "Sonntag"
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
            const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(day + 1).padStart(2, '0')}`;
            cells.push(<Cell key={day} day={day + 1} events={events[dateString]} />);
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
        console.log(`Next Month: ${months[month === 11 ? 0 : month + 1]} ${month === 11 ? year + 1 : year}`);
    };

    const previousMonth = () => {
        if (month === 0) {
            setMonth(11);
            setYear(year - 1);
        } else {
            setMonth(month - 1);
        }
        console.log(`Previous Month: ${months[month === 0 ? 11 : month - 1]} ${month === 0 ? year - 1 : year}`);
    };

    return (
        <div className="calendar-container">
            <h2>Kalender</h2>

            {/* Headbar for the Calendar */}
            <div className="calendar-headbar">
                <button onClick={previousMonth}>&lt;&lt;</button>
                <span>{months[month]} {year}</span>
                <button onClick={nextMonth}>&gt;&gt;</button>
            </div>
            
            {/* Weekdays */}
            <div className='calendar-weekdays-container'>
                <div className="calendar-weekdays">
                    {weekdays.map((day, index) => (
                        <span key={index}>{day}</span>
                    ))}
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