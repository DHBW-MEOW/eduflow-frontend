import { useState, useRef, useCallback, useEffect } from "react";
import type { LearningPlanHandles, ExamHandles } from "../../../components/popUpCreate/types";
import type { StudyplanButtonProps } from "../types";
import { getCourseNames } from "./getCourseNames";

import PopUpCreate from "../../../components/popUpCreate/PopUpCreate";
import LearningPlan from "../../../components/popUpCreate/popUpTypes/LearningPlan";
import Exam from "../../../components/popUpCreate/popUpTypes/Exam";

export const StudyplanButtonHandler = ( {popUpType, onClose}: StudyplanButtonProps ) => {
    const learningPlanRef = useRef<LearningPlanHandles>(null);
    const examRef = useRef<ExamHandles>(null);

    const [isCurrentFormValid, setIsCurrentFormValid] = useState(false);
    const [courseOptions, setCourseOptions] = useState<string[]>([]);

    const isLearningPlanPopUpOpen = popUpType === "StudyGoal";
    const isExamPopUpOpen = popUpType === "Exam";

    useEffect(() => {
        const loadOptions = async () => {
            try {
                const names = await getCourseNames(); // getCourseNames ist jetzt asynchron
                setCourseOptions(names);
            } catch (error) {
                console.error("Fehler beim Laden der Kursnamen:", error);
                // Optional: Fehlermeldung anzeigen
            }
        };
        loadOptions();
    }, []);

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

    const handleAddExam = () => {
        if (examRef.current) {
            const data = examRef.current.getFormData();

            if (data.isValid) {
                console.log('Prüfungsdaten:', data.data);
                onClose();
                setIsCurrentFormValid(false);
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