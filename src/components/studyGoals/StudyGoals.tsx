import './StudyGoals.css'
import ListItem from './ListItem';
import type { ItemData } from './ListItem';

interface StudyGoalsProps {
    items: ItemData[];
}

const StudyGoals = ({items}: StudyGoalsProps) => {

    return (
        <div className='studyGoals'>
            {items.length > 0 ? (
                items.map((item) => (
                    <ListItem
                        key={item.key}
                        course={item.course}
                        topic={item.topic}
                        deadline={item.deadline}
                    />
                ))
            ) : (
                <span>Lernziele werden geladen, falls sie vorhanden sind.</span>
            )}
        </div>
    )
};

export default StudyGoals;