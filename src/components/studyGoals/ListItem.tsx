import './ListItem.css'

type ItemProps = {
    topic: String;
    modul: String;
    date: String;
};

const ListItem = ({topic, modul, date}: ItemProps) => {
    return (
        <div className='listItem'>
            <div className='listItem-topic'>{topic}</div>
            <div className='listItem-modul'>{modul}</div>
            <div className='listItem-data'>{date}</div>
        </div>
    )
};

export default ListItem;