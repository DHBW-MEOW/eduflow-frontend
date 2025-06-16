import { useState, useRef, useEffect, useCallback } from "react";
import type { LearningPlanHandles, ExamHandles } from "../../../components/popUpCreate/types";
import type { TopicData, CourseData, StudyplanButtonProps } from "../types";

import { createNewExam } from "../api/createNewExam";
import { createNewModul } from "../api/createNewModul";
import { createNewStudyGoal } from "../api/createNewStudyplan";
import { fetchCourses } from "../api/fetchCourses";
import { getCourseNames } from "./getCourseNames";
import { getCourseID } from "./getCourseID";

import PopUpCreate from "../../../components/popUpCreate/PopUpCreate";
import LearningPlan from "../../../components/popUpCreate/popUpTypes/LearningPlan";
import Exam from "../../../components/popUpCreate/popUpTypes/Exam";
import { getTopicID } from "./getTopicID";
import { fetchTopics } from "../api/fetchTopics";
import { createNewTopic } from "../api/createNewTopic";
import { getTopicNames } from "./getTopicNames";

export const StudyplanButtonHandler = ( {popUpType, onClose, onDataAdded}: StudyplanButtonProps ) => {
    const learningPlanRef = useRef<LearningPlanHandles>(null);
    const examRef = useRef<ExamHandles>(null);

    const [courseOptions, setCourseOptions] = useState<string[]>([]);
    const [courses, setCourses] = useState<CourseData[]>([]);
    const [topicOptions, setTopicOptions] = useState<string[]>([]);
    const [topics, setTopics] = useState<TopicData[]>([]);

    const isLearningPlanPopUpOpen = popUpType === "StudyGoal";
    const isExamPopUpOpen = popUpType === "Exam";

    const loadOptions = useCallback(async () => {
        try {
            const allCourses = await fetchCourses();
            setCourses(allCourses);
            const courseNames = getCourseNames(courses);
            setCourseOptions(courseNames);
            const allTopics = await fetchTopics();
            setTopics(allTopics);
            const topicNames = getTopicNames(topics); // TODO: only topics for course_id
            setTopicOptions(topicNames);

        } catch (error) {
            console.error("Error while Loading Course-Names:", error);
        }
    }, []);

    useEffect(() => {
        loadOptions();
    }, [loadOptions]);

    const handleDiscard = () => {
        onClose();
    }

    const handleAddLearningPlan = async () => {
        if (learningPlanRef.current) {
            const data = learningPlanRef.current.getFormData();

            if (data.isValid) {
                let courseID = getCourseID(data.data.module, courses)
                if( courseID === null) {
                    courseID = await createNewModul(data.data.module);
                    await loadOptions();
                }

                if (typeof courseID === 'number') {
                    let topicID = getTopicID(courseID, data.data.topic, topics)
                    if( topicID === null) {
                        topicID = await createNewTopic(courseID, data.data.topic, data.data.details);
                        await loadOptions();
                    }
                    if (typeof topicID === 'number') {
                        await createNewStudyGoal(topicID, data.data.date)
                        onDataAdded();
                    }
                }
            }
        }
    }

    const handleAddExam = async () => {
        if (examRef.current) {
            const data = examRef.current.getFormData();

            if (data.isValid) {
                let courseID = getCourseID(data.data.module, courses)
                if( courseID === null) {
                    courseID = await createNewModul(data.data.module);
                    await loadOptions();
                }
                if (typeof courseID === 'number') {
                    await createNewExam(courseID, data.data.title, data.data.date)
                    onDataAdded();
                }
            }
        }
    }

    return (
        <>
            {/* Create Studygoal */}
            {isLearningPlanPopUpOpen && (
                <PopUpCreate
                    isOpen={true}
                    label="Lernziel erstellen"
                    onClickAdd={handleAddLearningPlan}
                    onClickDiscard={handleDiscard}
                    modulOptions={courseOptions}
                    topicOptions={topicOptions}
                >
                    <LearningPlan 
                        ref={learningPlanRef}
                    />
                </PopUpCreate>
            )}

            {/* Add Exam */}
            {isExamPopUpOpen && (
                <PopUpCreate
                    isOpen={true}
                    label="Klausur hinzufügen"
                    onClickAdd={handleAddExam}
                    onClickDiscard={handleDiscard}
                    modulOptions={courseOptions}
                >
                    <Exam 
                        ref={examRef}
                    />
                </PopUpCreate>
            )}
            
        </>
        
    )
}