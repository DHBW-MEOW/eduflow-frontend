import './Studyplan.css'

import Calendar from "../../components/calendar/Calendar";
import StudyGoals from "../../components/studyGoals/StudyGoals";
import type { ItemData, StudyGoalData, CourseData, TopicData, ExamDateData } from './types';
import { useEffect, useState } from 'react';
import { fetchFromBackend } from "../../fetchBackend";

function Studyplan() {
    const [items, setListItems] = useState<ItemData[]>([]);
    const [studygoals, setStudyGoals] = useState<StudyGoalData[]>([]);
    const [exams, setExams] = useState<ExamDateData[]>([]);

    const loadData = async () => {
        try {
            const studyGoals: StudyGoalData[] = await fetchFromBackend<{ id: number; topic_id: number; deadline: string }[]>({
                method: "GET",
                endpoint: "data/study_goal",
            });
            setStudyGoals(studyGoals);

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

            const allExams: ExamDateData[] = await fetchFromBackend<{ id: number; date: string }[]>({
                method: "GET",
                endpoint: "data/exam",
            });
            setExams(allExams)

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
        <Calendar studygoals={{ studygoals: studygoals }} exams={{exams: exams}}/>
      </div>
      <h2>Meine Lernziele</h2>
      <div className="studyplan-studygoals">
        <StudyGoals items={items}/>
      </div>
    </div>
  )
}

export default Studyplan;