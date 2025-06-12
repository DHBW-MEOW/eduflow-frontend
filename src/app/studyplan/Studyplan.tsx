import './Studyplan.css'

import Calendar from "../../components/calendar/Calendar";
import StudyGoals from "../../components/studyGoals/StudyGoals";
import OptionButton from '../../components/optionButtons/OptionButton';

import type { ItemData, StudyGoalData, ExamDateData } from './types';
import { useEffect, useState } from 'react';
import { fetchStudyGoalData } from './api/fetchStudyGoalData';
import { fetchExamData } from './api/fetchExamData';

function Studyplan() {
    const [items, setListItems] = useState<ItemData[]>([]);
    const [studygoals, setStudyGoals] = useState<StudyGoalData[]>([]);
    const [exams, setExams] = useState<ExamDateData[]>([]);

    const loadPageData = async () => {
            try {
                const studyplanData = await fetchStudyGoalData();
                const examData = await fetchExamData();

                if ( studyplanData != undefined && examData != undefined ) {
                    setListItems(studyplanData.itemList);
                    setStudyGoals(studyplanData.studygoals);
                    setExams(examData);
                }
                
            } catch (err) {
                console.error("Error while loading Data:", err);
            }
        };

    useEffect(() => {
        loadPageData();
    }, [])


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