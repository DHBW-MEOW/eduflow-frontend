import './Studyplan.css'

import Calendar from "../../components/calendar/Calendar";
import StudyGoals from "../../components/studyGoals/StudyGoals";
import OptionButton from '../../components/optionButtons/OptionButton';

import type { ItemData, StudyGoalData, CourseData, TopicData, ExamDateData } from './types';
import { useEffect, useState } from 'react';
import { fetchFromBackend } from "../../fetchBackend";

function Studyplan() {
    const [items, setListItems] = useState<ItemData[]>([]);
    const [studygoals, setStudyGoals] = useState<StudyGoalData[]>([]);
    const [exams, setExams] = useState<ExamDateData[]>([]);

    const loadData = async () => {
    try {
        const studygoals: StudyGoalData[] = await fetchFromBackend<{ id: number; topic_id: number; deadline: string }[]>({
            method: "GET",
            endpoint: "data/study_goal",
        });
        setStudyGoals(studygoals);

        const getTopics = await Promise.all(studygoals.map(async goal => {
            const response = await fetchFromBackend<{id: number; course_id: number; name: string}[]>({
                method: "GET",
                endpoint: `data/topic?id=${goal.topic_id}`
            })
            return response.length > 0 ? response[0] : null;
        }));
        
        const topics: TopicData[] = getTopics.filter((topic): topic is TopicData => topic !== null);
        const topicMap = new Map<number, TopicData>();
        topics.forEach(topic => topicMap.set(topic.id, topic));

        const getCourses = await Promise.all(topics.map(async topic => {
            const response = await fetchFromBackend<{id: number; name: string}[]>({
                method: "GET",
                endpoint: `data/course?id=${topic.course_id}`
            })
            return response.length > 0 ? response[0] : null;
        }));

        const courses: CourseData[] = getCourses.filter((course): course is CourseData => course !== null);
        const courseMap = new Map<number, CourseData>();
        courses.forEach(course => courseMap.set(course.id, course));

        const itemList: ItemData[] = [];
        for (const goal of studygoals) {
            const topic = topicMap.get(goal.topic_id);
            const course = topic ? courseMap.get(topic.course_id) : undefined;


            if (!topic) 
                console.warn(`Topic with ID ${goal.topic_id} not found for Study Goal ${goal.id}`);
            if (topic && !course) 
                console.warn(`Course with ID ${topic.course_id} not found for Topic ${topic.name} (Study Goal ${goal.id})`);

            if (topic && course) {
                itemList.push(
                    {
                        key: goal.id,
                        course: course ? course.name : "Unbekannter Kurs",
                        topic: topic ? topic.name : "Unbekanntes Thema",
                        deadline: goal.deadline,
                    }
                );
            }
        }

        itemList.sort((a, b) => {
            const dateA = new Date(a.deadline);
            const dateB = new Date(b.deadline);
            return dateA.getTime() - dateB.getTime();
        });
        setListItems(itemList);

        const allExams: ExamDateData[] = await fetchFromBackend<{ id: number; date: string }[]>({
            method: "GET",
            endpoint: "data/exam",
        });
        setExams(allExams)

    } catch (err) {
        console.error("Error while loading Data:", err);
    }
};

    useEffect(() => {
        loadData();
    }, []);


  return (
    <div className="studyplan-container">
        <div className='studyplan-createButtons'>
            <OptionButton
                label= '+ Lernziel erstellen'
                buttonType='createDataButton'
                onClick={() => console.log("Lernziel erstellen")}
            />
            <OptionButton
                label= '+ Klausur erstellen'
                buttonType='createDataButton'
                onClick={() => console.log("Klausure erstellen")}
            />
        </div>
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