export interface LearningPlanData {
  title: string;
  date: string;
  topic: string;
  module: string;
  details: string;
}

export interface LearningPlanHandles {
  getFormData: () => LearningPlanData;
}

export interface ToDoData {
  title: string;
  date: string;
  details: string;
}

export interface ToDoHandles {
  getFormData: () => ToDoData;
}

export interface ExamData {
  module: string;
  title: string;
  date: string;
}

export interface ExamHandles {
  getFormData: () => ExamData;
}

export interface RenameData {
  title: string;
}

export interface RenameHandles {
  getFormData: () => RenameData;
}

export interface EditData {
  details: string;
}

export interface EditHandles {
  getFormData: () => EditData;
}