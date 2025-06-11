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

            const courses: CourseData[] = await fetchFromBackend<{id: number; name: string}[]>({
                method: "GET",
                endpoint: "data/course"
            })

            const topics: TopicData[] = await fetchFromBackend<{id: number; course_id: number; name: string}[]>({
                method: "GET",
                endpoint: "data/topic"
            })

            const mappedItems: ItemData[] = studyGoals.map(goal => {
                // Find Topic by ID
                const topic = topics.find(t => t.id === goal.topic_id);

                if (!topic) {
                    console.warn(`Topic not found for topic_id: ${goal.topic_id}`);
                    return {
                        key: goal.id,
                        course: "Unknown Course",
                        topic: "Unknown Topic",
                        deadline: goal.deadline,
                    };
                }

                // Find Course by Topic ID
                const course = courses.find(c => c.id === topic.course_id);

                if (!course) {
                    console.warn(`Course not found for course_id: ${topic.course_id} (Topic: ${topic.name})`);
                }
                return {
                    key: goal.id,
                    topic: topic.name,
                    course: course ? course.name : "Unknown Course",
                    deadline: goal.deadline,
                };
            });

            setListItems(mappedItems);

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