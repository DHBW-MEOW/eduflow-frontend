import './Studyplan.css'

import Calendar from "../../components/calendar/Calendar";
import StudyGoals from "../../components/studyGoals/StudyGoals";
import type { ItemData } from '../../components/studyGoals/ListItem';
import { useEffect, useState } from 'react';
import { fetchFromBackend } from "../../fetchBackend";

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


function Studyplan() {
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
    <div className="studyplan-container">
      <h2>Kalender</h2>
      <div className="studyplan-calendar">
        <Calendar/>
      </div>
      <h2>Meine Lernziele</h2>
      <div className="studyplan-studygoals">
        <StudyGoals items={items}/>
      </div>
    </div>
  )
}

export default Studyplan;