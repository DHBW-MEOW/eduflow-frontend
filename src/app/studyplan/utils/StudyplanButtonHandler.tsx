import { useRef } from "react";
import type { LearningPlanHandles, ExamHandles } from "../../../components/popUpCreate/types";
import type { StudyplanButtonProps } from "../types";

import PopUpCreate from "../../../components/popUpCreate/PopUpCreate";
import LearningPlan from "../../../components/popUpCreate/popUpTypes/LearningPlan";
import Exam from "../../../components/popUpCreate/popUpTypes/Exam";

export const StudyplanButtonHandler = ( {popUpType, onClose}: StudyplanButtonProps ) => {
    const learningPlanRef = useRef<LearningPlanHandles>(null);
    const examRef = useRef<ExamHandles>(null);

    const isLearningPlanPopUpOpen = popUpType === "StudyGoal";
    const isExamPopUpOpen = popUpType === "Exam";

    const handleDiscard = () => {
        onClose();
    }

    
    

    return (
        <>
            {/* Create Studygoal */}
            {isLearningPlanPopUpOpen && (
                <PopUpCreate
                    isOpen={true}
                    label="Lernziel erstellen"
                    onClickAdd={() => { console.log("Test create LeraningPlan"); handleDiscard} }
                    onClickDiscard={handleDiscard}
                >
                    <LearningPlan ref={learningPlanRef}/>
                </PopUpCreate>
            )}

            {/* Add Exam */}
            {isExamPopUpOpen && (
                <PopUpCreate
                    isOpen={true}
                    label="Klausur hinzufügen"
                    onClickAdd={() => { console.log("Test add Exam"); handleDiscard} }
                    onClickDiscard={handleDiscard}
                >
                    <Exam ref={examRef}/>
                </PopUpCreate>
            )}
            
        </>
        
    )
}