export type StudyGoalData = {
    id: number;
    topic_id: number;
    deadline: string;
};

export interface StudyGoalsProps {
    studygoals: StudyGoalData[];
};

export type CourseData = {
    id: number;
    name: string;
};

export type TopicData = {
    id: number;
    course_id: number;
    name: string;
};

export type ItemData = {
    key: number;
    course: string;
    topic: string;
    deadline: string;
};

export interface ItemProps {
    items: ItemData[];
    limit?: number;
};

export type ExamDateData = {
    id: number;
    date: string;
};

export interface ExamDateProps {
    exams: ExamDateData[];
};

export interface CalendarProps {
    studygoals: StudyGoalsProps;
    exams: ExamDateProps;
}

export interface StudyplanButtonProps {
    popUpType: 'StudyGoal' | 'Exam' | null;
    onClose: () => void;
    onDataAdded: () => void;
}