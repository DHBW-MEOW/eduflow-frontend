import { useState, useRef, useCallback, useEffect } from "react";
import type { LearningPlanHandles, ExamHandles } from "../../../components/popUpCreate/types";
import type { CourseData, StudyplanButtonProps } from "../types";

import { getCourseNames } from "./getCourseNames";
import { createNewExam } from "../api/createNewExam";
import { createNewModul } from "../api/createNewModul";
import { getCourseID } from "./getCourseID";

import PopUpCreate from "../../../components/popUpCreate/PopUpCreate";
import LearningPlan from "../../../components/popUpCreate/popUpTypes/LearningPlan";
import Exam from "../../../components/popUpCreate/popUpTypes/Exam";
import { fetchCourses } from "../api/fetchCourses";

export const StudyplanButtonHandler = ( {popUpType, onClose}: StudyplanButtonProps ) => {
    const learningPlanRef = useRef<LearningPlanHandles>(null);
    const examRef = useRef<ExamHandles>(null);

    const [isCurrentFormValid, setIsCurrentFormValid] = useState(false);
    const [courseOptions, setCourseOptions] = useState<string[]>([]);
    const [courses, setCourses] = useState<CourseData[]>([]);

    const isLearningPlanPopUpOpen = popUpType === "StudyGoal";
    const isExamPopUpOpen = popUpType === "Exam";

    const loadOptions = async () => {
        try {
            const allCourses = await fetchCourses();
            setCourses(allCourses);
            const names = getCourseNames(courses);
            setCourseOptions(names);
        } catch (error) {
            console.error("Error while Loading Course-Names:", error);
        }
    };

    useEffect(() => {
        loadOptions();
    }, [loadOptions]);

    const handleValidityChange = useCallback((isValid: boolean) => {
        setIsCurrentFormValid(isValid);
    }, []); 

    const handleDiscard = () => {
        onClose();
        setIsCurrentFormValid(false);
    }

    const handleAddLearningPlan = () => {
        if (learningPlanRef.current) {
            const data = learningPlanRef.current.getFormData();

            if (data.isValid) {
                console.log('Lernplan Daten:', data.data);
                onClose();
                setIsCurrentFormValid(false);
            }
        }
    }

    const handleAddExam = async () => {
        if (examRef.current) {
            const data = examRef.current.getFormData();

            if (data.isValid) {
                console.log('Prüfungsdaten:', data.data);

                let courseID = getCourseID(data.data.module, courses)
                if( courseID === null) {
                    courseID = await createNewModul(data.data.module);
                    await loadOptions();
                }
                console.log(courseID, typeof courseID)
                if (typeof courseID === 'number') {
                    await createNewExam(courseID, data.data.title, data.data.date)
                    onClose();
                    setIsCurrentFormValid(false);
                } else {
                    console.error("Fehler: Kurs-ID konnte nicht ermittelt werden, selbst nach Erstellung des Moduls.");
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
                    comboboxOptions={courseOptions}
                >
                    <LearningPlan 
                        ref={learningPlanRef}
                        onValidityChange={handleValidityChange}
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
                    comboboxOptions={courseOptions}
                >
                    <Exam 
                        ref={examRef}
                        onValidityChange={handleValidityChange}
                    />
                </PopUpCreate>
            )}
            
        </>
        
    )
}