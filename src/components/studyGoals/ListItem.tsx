import './ListItem.css'

export type ItemData = {
    key: number;
    course: string;
    topic: string;
    deadline: string;
};

const ListItem = ({course, topic, deadline}: ItemData) => {


    return (
        <div className='listItem'>
            <div className='listItem-topic'>{topic}</div>
            <div className='listItem-course'>{course}</div>
            <div className='listItem-deadline'>{deadline}</div>
        </div>
    )
};

export default ListItem;