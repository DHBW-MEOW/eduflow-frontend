import { useState, useRef, useEffect, useCallback } from "react";
import type {
  LearningPlanHandles,
  ExamHandles,
} from "../../../components/popUpCreate/types";
import type { TopicData, CourseData, StudyplanButtonProps } from "../types";

import { createNewExam } from "../../../api/createNewExam";
import { createNewModul } from "../../../api/createNewModul";
import { createNewStudyGoal } from "../../../api/createNewStudyplan";
import { fetchCourses } from "../../../api/fetchCourses";
import { getCourseNames } from "./getCourseNames";
import { getCourseID } from "./getCourseID";

import PopUpCreate from "../../../components/popUpCreate/PopUpCreate";
import LearningPlan from "../../../components/popUpCreate/popUpTypes/LearningPlan";
import Exam from "../../../components/popUpCreate/popUpTypes/Exam";
import { getTopicID } from "./getTopicID";
import { fetchTopics } from "../../../api/fetchTopics";
import { createNewTopic } from "../../../api/createNewTopic";
import { getTopicNames } from "./getTopicNames";
import { useAuth } from "../../../app/AuthContext";

export const StudyplanButtonHandler = ({
  popUpType,
  onClose,
  onDataAdded,
}: StudyplanButtonProps) => {
  const learningPlanRef = useRef<LearningPlanHandles>(null);
  const examRef = useRef<ExamHandles>(null);

  const { fetchFromBackend } = useAuth();

  const [courseOptions, setCourseOptions] = useState<string[]>([]);
  const [courses, setCourses] = useState<CourseData[]>([]);
  const [filteredTopicOptions, setFilteredTopicOptions] = useState<string[]>(
    [],
  );
  const [topics, setTopics] = useState<TopicData[]>([]);
  const [selectedModule, setSelectedModule] = useState<string | null>(null);
  const [isFormValid, setIsFormValid] = useState(false);
  const [isDisabled, setIsDisbled] = useState(false);

  const isLearningPlanPopUpOpen = popUpType === "StudyGoal";
  const isExamPopUpOpen = popUpType === "Exam";

  const loadOptions = useCallback(async () => {
    try {
      const fetchedCourses = await fetchCourses(fetchFromBackend);
      setCourses(fetchedCourses);

      const fetchedTopics = await fetchTopics(fetchFromBackend);
      setTopics(fetchedTopics);
    } catch (error) {
      console.error("Error while Loading initial Data:", error);
    }
  }, []);

  useEffect(() => {
    loadOptions();
  }, [loadOptions]);

  useEffect(() => {
    if (courses.length > 0) {
      const courseNames = getCourseNames(courses);
      setCourseOptions(courseNames);
    } else {
      setCourseOptions([]);
    }
  }, [courses]);

  useEffect(() => {
    if (selectedModule) {
      const currentCourseID = getCourseID(selectedModule, courses);
      if (typeof currentCourseID === "number") {
        const topicsForSelectedModule = topics.filter(
          (topic) => topic.course_id === currentCourseID,
        );
        const names = getTopicNames(topicsForSelectedModule);
        setFilteredTopicOptions(names);
      } else {
        setFilteredTopicOptions([]);
      }
    } else {
      setFilteredTopicOptions([]);
    }
  }, [selectedModule, topics, courses]);

  const handleModuleChangeInLearningPlan = useCallback((moduleName: string) => {
    setSelectedModule(moduleName);
  }, []);

  const handleValidationChange = useCallback((isValid: boolean) => {
    setIsFormValid(isValid);
  }, []);

  const handleDiscard = () => {
    onClose();
    setSelectedModule(null);
  };

  const handleAddLearningPlan = async () => {
    setIsDisbled(false);
    if (learningPlanRef.current) {
      const data = learningPlanRef.current.getFormData();

      if (data.isValid) {
        setIsDisbled(true);
        let courseID = getCourseID(data.data.module, courses);
        if (courseID === null) {
          courseID = await createNewModul(data.data.module, fetchFromBackend);
          await loadOptions();
        }

        if (typeof courseID === "number") {
          let topicID = getTopicID(courseID, data.data.topic, topics);
          if (topicID === null) {
            topicID = await createNewTopic(
              courseID,
              data.data.topic,
              data.data.details,
              fetchFromBackend,
            );
            await loadOptions();
          }
          if (typeof topicID === "number") {
            await createNewStudyGoal(topicID, data.data.date, fetchFromBackend);
            onDataAdded();
            setSelectedModule(null);
          }
        }
      }
    }
  };

  const handleAddExam = async () => {
    setIsDisbled(false);
    if (examRef.current) {
      const data = examRef.current.getFormData();

      if (data.isValid) {
        setIsDisbled(true);
        let courseID = getCourseID(data.data.module, courses);
        if (courseID === null) {
          courseID = await createNewModul(data.data.module, fetchFromBackend);
          await loadOptions();
        }
        if (typeof courseID === "number") {
          await createNewExam(
            courseID,
            data.data.title,
            data.data.date,
            fetchFromBackend,
          );
          onDataAdded();
        }
      }
    }
  };

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
          topicOptions={filteredTopicOptions}
          isAddButtonDisabled={isDisabled}
        >
          <LearningPlan
            ref={learningPlanRef}
            onModuleChange={handleModuleChangeInLearningPlan}
            onValidationChange={handleValidationChange}
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
          isAddButtonDisabled={isDisabled}
        >
          <Exam ref={examRef} onValidationChange={handleValidationChange} />
        </PopUpCreate>
      )}
    </>
  );
};
