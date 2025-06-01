import './App.css'

import React, { useState, useRef } from 'react';
import Layout from './Layout.tsx'
import PopUpCreate from '../components/popUpCreate/PopUpCreate.tsx'
import LearningPlan from '../components/popUpCreate/popUpTypes/LearningPlan.tsx'
import Exam from '../components/popUpCreate/popUpTypes/Exam.tsx';
import ToDo from '../components/popUpCreate/popUpTypes/ToDo.tsx';
import type { LearningPlanHandles, LearningPlanData, ExamHandles, ExamData, ToDoHandles, ToDoData } from '../components/popUpCreate/types.tsx'
import OptionButton from '../components/optionButtons/OptionButton.tsx';
import PopUpDelete from '../components/popUpDelete/PopUpDelete.tsx';

const PopupType = {
  NONE: "NONE",
  LEARNING_PLAN: "LEARNING_PLAN",
  TODO: "TODO",
  EXAM: "EXAM",
  DELETE: "DELETE",
} as const;

type PopupType = typeof PopupType[keyof typeof PopupType];

const App: React.FC = () => {
  const [activePopup, setActivePopup] = useState<PopupType>(PopupType.NONE);
  const learningPlanRef = useRef<LearningPlanHandles>(null);
  const toDoRef = useRef<ToDoHandles>(null);
  const examRef = useRef<ExamHandles>(null);

  const closePopup = () => {
    setActivePopup(PopupType.NONE);
  };

  // Handler for LearningPlan
  const handleAddLearningPlan = () => {
    if (learningPlanRef.current) {
      const data: LearningPlanData = learningPlanRef.current.getFormData();
      console.log('Lernplan Daten:', data);
      closePopup();
    }
  };

  // Handler for ToDo
  const handleAddToDo = () => {
    if (toDoRef.current) {
      const data: ToDoData = toDoRef.current.getFormData();
      console.log('ToDo Daten:', data);
      closePopup();
    }
  };

  // Handler for Exam
  const handleAddExam = () => {
    if (examRef.current) {
      const data: ExamData = examRef.current.getFormData();
      console.log('Prüfungsdaten:', data);
      closePopup();
    }
  };

  // Handler for Delete
  const handleDelete = () => {
    console.log('Item wurde gelöscht');
    closePopup();
  };

  // Switch to choose the correct PopUp content and action
  let popupContent: React.ReactNode = null;
  let popupLabel = '';
  let onAddAction = () => {};

  switch (activePopup) {
    case PopupType.LEARNING_PLAN:
      popupLabel = "Neuen Lernplan erstellen";
      popupContent = <LearningPlan ref={learningPlanRef} />;
      onAddAction = handleAddLearningPlan;
      break;
    case PopupType.TODO:
      popupLabel = "Neues ToDo erstellen";
      popupContent = <ToDo ref={toDoRef} />;
      onAddAction = handleAddToDo;
      break;
    case PopupType.EXAM:
      popupLabel = "Neue Prüfung anlegen";
      popupContent = <Exam ref={examRef} />;
      onAddAction = handleAddExam;
      break;
  }

  return (
    <Layout>
    <div>
      <h1>Meine App</h1>
      <OptionButton label="Lernplan erstellen" onClick={() => setActivePopup(PopupType.LEARNING_PLAN)} />
      <OptionButton label="ToDo erstellen" onClick={() => setActivePopup(PopupType.TODO)}/>
      <OptionButton label="Prüfung anlegen" onClick={() => setActivePopup(PopupType.EXAM)}/>
      <OptionButton label="Löschen" onClick={() => setActivePopup(PopupType.DELETE)} />

      {/* Creating the different PopUps */}
      {activePopup !== PopupType.NONE && activePopup !== PopupType.DELETE && popupContent && (
        <PopUpCreate
          isOpen={true}
          label={popupLabel}
          onClickDiscard={closePopup}
          onClickAdd={onAddAction}
        >
          {popupContent}
        </PopUpCreate>
      )}

      {/* Creating the Delete PopUp */}
      <PopUpDelete
        isOpen={activePopup === PopupType.DELETE}
        content={
          <>
            Möchten Sie dieses Element wirklich löschen?<br />
            Diese Aktion kann nicht mehr rückgängig gemacht werden.
          </>
        }
        onClickCancel={closePopup}
        onClickConfirm={handleDelete}
      />
    </div>
    </Layout>
  );
};

export default App
