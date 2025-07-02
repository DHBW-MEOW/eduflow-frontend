import './Studyplan.css'

import Calendar from "../../components/calendar/Calendar";
import StudyGoals from "../../components/studyGoals/StudyGoals";
import OptionButton from '../../components/optionButtons/OptionButton';

import type { ItemData, StudyGoalData, ExamDateData } from './types';
import { useCallback, useEffect, useState } from 'react';
import { fetchStudyGoalData } from '../../api/fetchStudyGoalData';
import { fetchExamData } from '../../api/fetchExamData';
import { StudyplanButtonHandler } from './utils/StudyplanButtonHandler';
import { useAuth } from '../../app/AuthContext';

type ActivePopupType = 'StudyGoal' | 'Exam' | null;

function Studyplan() {
    const {fetchFromBackend} = useAuth();
    const [items, setListItems] = useState<ItemData[]>([]);
    const [studygoals, setStudyGoals] = useState<StudyGoalData[]>([]);
    const [exams, setExams] = useState<ExamDateData[]>([]);
    const [activePopup, setActivePopup] = useState<ActivePopupType>(null);

    const loadPageData = useCallback( async () => {
            try {
                const studyplanData = await fetchStudyGoalData(fetchFromBackend);
                const examData = await fetchExamData(fetchFromBackend);

                if ( studyplanData != undefined && examData != undefined ) {
                    setListItems(studyplanData.itemList);
                    setStudyGoals(studyplanData.studygoals);
                    setExams(examData);
                }
                
            } catch (err) {
                console.error("Error while loading Data:", err);
            }
    }, [fetchFromBackend]);

    useEffect(() => {
        loadPageData();
    }, [loadPageData])

    const handleOpenPopup = (type: ActivePopupType) => {
        setActivePopup(type);
    };

    const handleClosePopup = () => {
        setActivePopup(null);
    };

    const handleDataAdded = () => {
        handleClosePopup();
        loadPageData();
    };

  return (
    <div className="studyplan-container">
        <div className='studyplan-left-items'>
            <div className='studyplan-header'>
                <h2 id='calendar-headline'>Kalender</h2>
                <div className='studyplan-createButtons'>
                    <OptionButton
                        label= '+ Lernziel erstellen'
                        isHighlighted={true}
                        onClick={() => handleOpenPopup("StudyGoal")}
                    />
                    <OptionButton
                        label= '+ Prüfungsleistung hinzufügen'
                        isHighlighted={true}
                        onClick={() => handleOpenPopup("Exam")}
                    />
                </div>
            </div>

            <div className="studyplan-calendar">
                <Calendar studygoals={{ studygoals: studygoals }} exams={{exams: exams}}/>
            </div>
        </div>
        
        <div className='studyplan-right-items'>
            <h2 id='studygoals-headline'>Meine Lernziele</h2>
            <div className="studyplan-studygoals">
                <StudyGoals items={items}/>
            </div>
        </div>
        

        {activePopup && (
            <StudyplanButtonHandler 
                popUpType={activePopup}
                onClose={handleClosePopup}
                onDataAdded={handleDataAdded}
            />
        )}
    </div>
  )
}

export default Studyplan;