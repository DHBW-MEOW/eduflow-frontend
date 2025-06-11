import './ListItem.css'
import type { ItemData } from '../../app/studyplan/types';


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