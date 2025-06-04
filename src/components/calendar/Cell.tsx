import './Cell.css'

type EventType = {
    type: 'deadline' | 'exam';
    title: string;
}

type CellProps = {
    day?: number;
    events?: EventType[];
};

const Cell = ({day, events}: CellProps) => {
    return (
        <div className="calendar-cell">
            {/* INFO: Only if day exists, the span is rendered */}
            {day && <span className="cell-day">{day}</span>}
            
            {/* Render multiple events */}
            {events && events.length > 0 && (
                <div className="events-container">
                    {events.map((event, index) => (
                        <div 
                            key={index}
                            className={`event-dot ${event.type}`} 
                            title={event.title}
                        />
                    ))}
                </div>
            )}
        </div>
    )
};

export default Cell