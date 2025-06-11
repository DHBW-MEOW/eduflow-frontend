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
            <div className='listItem-titels'>
                <span>{topic}</span>
                <span id='courseLabel'>{course}</span>
                </div>
            <div className='listItem-deadline'>
                <span>{deadline}</span>
            </div>
        </div>
    )
};

export default ListItem;