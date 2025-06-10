import './StudyGoals.css'
import ListItem from './ListItem';

type Goal = {topic: String, modul: String};
const goals: { [date: string]: Goal[] } = {
        '2025-06-15': [{ topic: 'topic0', modul: 'module0' }],
        '2025-06-20': [
            { topic: 'topic1', modul: 'module1' },
            { topic: 'topic2', modul: 'module2' },
            { topic: 'topic3', modul: 'module3' },
        ],
        '2025-06-25': [{ topic: 'topic4', modul: 'module4' }],
    }; // Examples and Placeholder for events from backend

const StudyGoals = () => {
    const generateListItems = () => {
        // const listItems = [];

        // for (let i=0; i < goals.length; i++) {
        //     listItems.push(<ListItem key={i} topic={goals.topic}/>)
        // }


        // return listItems;
    };

    return (
        <div className='studyGoals'>
            {/*generateListItems()*/}
        </div>
    )
};

export default StudyGoals;