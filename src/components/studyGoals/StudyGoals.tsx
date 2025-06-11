import './StudyGoals.css'
import ListItem from './ListItem';
import { useEffect, useState } from "react";
import { fetchFromBackend } from "../../fetchBackend";
import type { ItemData } from './ListItem';

type StudyGoalData = {
    id: number;
    topic_id: number;
    deadline: string;
};

type CourseData = {
    id: number;
    name: string;
};

type TopicData = {
    id: number;
    course_id: number;
    name: string;
};


const StudyGoals = () => {
    const [items, setListItems] = useState<ItemData[]>([]);

    const loadData = async () => {
        try {
            const studyGoals: StudyGoalData[] = await fetchFromBackend<{ id: number; topic_id: number; deadline: string }[]>({
                method: "GET",
                endpoint: "data/study_goal",
            });

            const topics: TopicData[] = await Promise.all(studyGoals.map(async goal => {
                const response = await fetchFromBackend<{id: number; course_id: number; name: string}[]>({
                    method: "GET",
                    endpoint: `data/topic?id=${goal.topic_id}`
                })
                return response[0]
            }));

            const courses: CourseData[] = await Promise.all(topics.map(async topic => {
                const response = await fetchFromBackend<{id: number; name: string}[]>({
                    method: "GET",
                    endpoint: `data/course?id=${topic.course_id}`
                })
                return response[0]
            }));

            const itemList: ItemData[] = [];
            for (let index=0; index < studyGoals.length; index++) {
                itemList.push(
                    {key: studyGoals[index].id,
                        course: courses[index].name,
                        topic: topics[index].name,
                        deadline: studyGoals[index].deadline,
                    })
                
            }
            setListItems(itemList);

            } catch (err) {
                console.error("Error while loading Study-Goals:", err);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    return (
        <div className='studyGoals'>
            <h2>Deine Lernziele</h2>
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
                <p>Keine Lernziele vorhanden.</p>
            )}
        </div>
    )
};

export default StudyGoals;