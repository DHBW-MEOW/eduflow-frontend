import React, { useState, useImperativeHandle, forwardRef, useEffect, useCallback } from 'react';
import type { ExamData, ExamHandles } from '../types';
import './popUpTypes.css';

import InputCombobox from '../inputOptions/InputCombobox';
import InputField from '../inputOptions/InputField';
import InputDate from '../inputOptions/InputDate';

import { validateDate } from '../utils/validateDate';
import { validateModul } from '../utils/validateModul';
import { validateTitle } from '../utils/validateTitle';

interface ExamProps {
  moduleOptions?: string[];
  initialData?: ExamData;
  onValidationChange?: (isValid: boolean) => void;
}

const Exam = forwardRef<ExamHandles, ExamProps>(({ initialData, moduleOptions, onValidationChange }, ref) => {
  const [formData, setFormData] = useState<ExamData>({
    module: initialData?.module || '',
    title: initialData?.title || '',
    date: initialData?.date || '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof ExamData, string>>>({});
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false);
  
  const getErrors = useCallback ((data: ExamData) => {
    let newErrors: Partial<Record<keyof ExamData, string>> = {};

    const moduleError = validateModul(data.module);
    if (moduleError) 
      newErrors.module = moduleError;

    const titleError = validateTitle(data.title);
    if (titleError) 
      newErrors.title = titleError;

    const dateError = validateDate(data.date);
    if (dateError) 
      newErrors.date = dateError;

    return newErrors;
  },[]);

  useEffect(() => {
          if (hasAttemptedSubmit) {
              const currentErrors = getErrors(formData);
              if (JSON.stringify(currentErrors) !== JSON.stringify(errors)) {
                  setErrors(currentErrors);
              }
          }
      }, [formData, hasAttemptedSubmit, getErrors]);

  useEffect(() => {
        if (onValidationChange) {
            const currentErrors = getErrors(formData);
            const isValid = Object.keys(currentErrors).length === 0;
            onValidationChange(isValid);
        }
    }, [formData, getErrors, onValidationChange]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));

    if (hasAttemptedSubmit) {
        const newErrors = getErrors({ ...formData, [name]: value } as ExamData);
        if (newErrors[name as keyof ExamData] !== errors[name as keyof ExamData]) {
            setErrors(prevErrors => ({
                ...prevErrors,
                [name as keyof ExamData]: newErrors[name as keyof ExamData]
            }));
        }
    }
  };

  useImperativeHandle(ref, () => ({
    getFormData: () => {
      setHasAttemptedSubmit(true);
      const currentErrors = getErrors(formData);
      setErrors(currentErrors);
      const isValid = Object.keys(currentErrors).length === 0;

      return {
        data: formData,
        errors: errors,
        isValid: isValid,
      };
    },
  }));

  return (
    <div className="popup-form">
      <InputCombobox
        label="Modul"
        name="module"
        value={formData.module}
        options={moduleOptions || []}
        isInvalid={!!errors.module}
        errorMessage={errors.module}
        onChange={handleChange}
      />
      <InputField
        label="Art der Prüfung"
        name="title"
        value={formData.title}
        isInvalid={!!errors.title}
        errorMessage={errors.title}
        onChange={handleChange}
      />
      <InputDate
        label="Prüfungsdatum"
        name="date"
        value={formData.date}
        isInvalid={!!errors.date}
        errorMessage={errors.date}
        onChange={handleChange}
      />
    </div>
  );
});

export default Exam;