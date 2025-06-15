import React, { useState, useRef, useCallback } from 'react';
import PopUpCreate from '../../components/popUpCreate/PopUpCreate.tsx'
import LearningPlan from '../../components/popUpCreate/popUpTypes/LearningPlan.tsx'
import Exam from '../../components/popUpCreate/popUpTypes/Exam.tsx';
import ToDo from '../../components/popUpCreate/popUpTypes/ToDo.tsx';
import Rename from '../../components/popUpCreate/popUpTypes/Rename.tsx';
import type { LearningPlanHandles, LearningPlanData, ExamHandles, ExamData, ToDoHandles, ToDoData, RenameData, RenameHandles, FormDataAndValidity } from '../../components/popUpCreate/types.tsx'
import OptionButton from '../../components/optionButtons/OptionButton.tsx';
import PopUpDelete from '../../components/popUpDelete/PopUpDelete.tsx';

const PopupType = {
  NONE: "NONE",
  LEARNING_PLAN: "LEARNING_PLAN",
  TODO: "TODO",
  EXAM: "EXAM",
  RENAME: "RENAME",
  DELETE: "DELETE",
} as const;

type PopupType = typeof PopupType[keyof typeof PopupType];

const PopUpExample: React.FC = () => {
  const [activePopup, setActivePopup] = useState<PopupType>(PopupType.NONE);
  const [isCurrentFormValid, setIsCurrentFormValid] = useState(false);
  
  const learningPlanRef = useRef<LearningPlanHandles>(null);
  const toDoRef = useRef<ToDoHandles>(null);
  const examRef = useRef<ExamHandles>(null);
  const renameRef = useRef<RenameHandles>(null);

  const closePopup = () => {
    setActivePopup(PopupType.NONE);
    setIsCurrentFormValid(false);
  };

  // Handler for Validity
  const handleValidityChange = useCallback((isValid: boolean) => {
    setIsCurrentFormValid(isValid);
  }, []);

  // Handler for LearningPlan
  const handleAddLearningPlan = () => {
    if (learningPlanRef.current) {
      const formDataAndValidity: FormDataAndValidity<LearningPlanData> = learningPlanRef.current.getFormData();
      if (formDataAndValidity.isValid) {
        console.log('Lernplan Daten:', formDataAndValidity.data);
        closePopup();
      } else {
        console.log('Lernplan Formular ist ungültig. Fehler:', formDataAndValidity.errors);
      }
    }
  };

  // Handler for ToDo
  const handleAddToDo = () => {
    if (toDoRef.current) {
      const formDataAndValidity: FormDataAndValidity<ToDoData> = toDoRef.current.getFormData();
      if (formDataAndValidity.isValid) {
        console.log('ToDo Daten:', formDataAndValidity.data);
        closePopup();
      } else {
        console.log('ToDo Formular ist ungültig. Fehler:', formDataAndValidity.errors);
      }
    }
  };

  // Handler for Exam
  const handleAddExam = () => {
    if (examRef.current) {
      const formDataAndValidity: FormDataAndValidity<ExamData> = examRef.current.getFormData();
      if (formDataAndValidity.isValid) {
        console.log('Prüfungsdaten:', formDataAndValidity.data);
        closePopup();
      } else {
        console.log('Prüfungsformular ist ungültig. Fehler:', formDataAndValidity.errors);
      }
    }
  };

  // Handler for Rename
  const handleAddRename = () => {
    if (renameRef.current) {
      const formDataAndValidity: FormDataAndValidity<RenameData> = renameRef.current.getFormData();
      if (formDataAndValidity.isValid) {
        console.log('Umbenennanter Name:', formDataAndValidity.data);
        closePopup();
      } else {
        console.log('Umbenennen Formular ist ungültig. Fehler:', formDataAndValidity.errors);
      }
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
      popupContent = <LearningPlan ref={learningPlanRef} onValidityChange={handleValidityChange} />;
      onAddAction = handleAddLearningPlan;
      break;
    case PopupType.TODO:
      popupLabel = "Neues ToDo erstellen";
      popupContent = <ToDo ref={toDoRef} />;
      onAddAction = handleAddToDo;
      break;
    case PopupType.EXAM:
      popupLabel = "Neue Prüfung anlegen";
      popupContent = <Exam ref={examRef} onValidityChange={handleValidityChange} />;
      onAddAction = handleAddExam;
      break;
    case PopupType.RENAME:
      popupLabel = "Umbennenen";
      popupContent = <Rename ref={renameRef} onValidityChange={handleValidityChange} />;
      onAddAction = handleAddRename;
      break;
  }

  return (
    <div>
      <h1>Meine App</h1>
      <OptionButton label="Lernplan erstellen" buttonType='optionButton' onClick={() => setActivePopup(PopupType.LEARNING_PLAN)} />
      <OptionButton label="ToDo erstellen" buttonType='optionButton' onClick={() => setActivePopup(PopupType.TODO)}/>
      <OptionButton label="Prüfung anlegen" buttonType='optionButton' onClick={() => setActivePopup(PopupType.EXAM)}/>
      <OptionButton label="Umbennenen" buttonType='optionButton' onClick={() => setActivePopup(PopupType.RENAME)}/>
      <OptionButton label="Löschen" buttonType='optionButton' onClick={() => setActivePopup(PopupType.DELETE)} />

      {/* Creating the different PopUps */}
      {activePopup !== PopupType.NONE && activePopup !== PopupType.DELETE && popupContent && (
        <PopUpCreate
          isOpen={true}
          label={popupLabel}
          onClickDiscard={closePopup}
          onClickAdd={onAddAction}
          isAddButtonDisabled={!isCurrentFormValid}
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
  );
};

export default PopUpExample;