import './ListItem.css'
import { formatDate } from '../../app/studyplan/utils/formatDate';
import type { ItemData } from '../../app/studyplan/types';


const ListItem = ({course, topic, deadline}: ItemData) => {


    return (
        <div className='listItem'>
            <div className='listItem-titels'>
                <span>{topic}</span>
                <span id='courseLabel'>{course}</span>
                </div>
            <div className='listItem-deadline'>
                <span>{formatDate(deadline)}</span>
            </div>
        </div>
    )
};

export default ListItem;