export interface LearningPlanData {
  date: string;
  topic: string;
  module: string;
  details: string;
}

export interface LearningPlanHandles {
  getFormData: () => FormDataAndValidity<LearningPlanData>;
}

export interface ToDoData {
  title: string;
  date: string;
  details: string;
}

export interface ToDoHandles {
  getFormData: () => FormDataAndValidity<ToDoData>;
}

export interface ExamData {
  module: string;
  title: string;
  date: string;
}

export interface ExamHandles {
  getFormData: () => FormDataAndValidity<ExamData>;
}

export interface RenameData {
  title: string;
}

export interface RenameHandles {
  getFormData: () => FormDataAndValidity<RenameData>;
}

export type PopUpProps = {
    isOpen: boolean
    label: string;
    children: React.ReactElement;
    isAddButtonDisabled?: boolean;
    onClickDiscard: () => void;
    onClickAdd: () => void;
}

export interface FormComponentProps<T> {
    initialData?: Partial<T>;
    onValidityChange: (isValid: boolean) => void;
}

export interface FormDataAndValidity<T> {
    data: T;
    errors: Partial<Record<keyof T, string>>;
    isValid: boolean;
}