import type { ItemData, StudyGoalData, CourseData, TopicData } from "../app/studyplan/types";
import { fetchFromBackend } from "../fetchBackend";

export const fetchStudyGoalData = async () => {
    try {
        const studygoals: StudyGoalData[] = await fetchFromBackend<{ id: number; topic_id: number; deadline: string }[]>({
            method: "GET",
            endpoint: "data/study_goal",
        });

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
        
            itemList.sort((a, b) => {
                const dateA = new Date(a.deadline);
                const dateB = new Date(b.deadline);
                return dateA.getTime() - dateB.getTime();
            });
        }

        return { itemList, studygoals };
        
    } catch (err) {
        console.error("Error while loading Data:", err);
    }
};