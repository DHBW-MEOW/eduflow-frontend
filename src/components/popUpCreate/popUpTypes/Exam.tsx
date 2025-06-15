import React, { useState, useImperativeHandle, forwardRef, useEffect } from 'react';
import type { ExamData, ExamHandles, FormComponentProps } from '../types';
import './popUpTypes.css';

import InputField from '../inputOptions/InputField';
import InputDate from '../inputOptions/InputDate';

import { validateDate } from '../utils/validateDate';
import { validateModul } from '../utils/validateModul';
import { validateTitle } from '../utils/validateTitle';

interface ExamProps extends FormComponentProps<ExamData> {}

const Exam = forwardRef<ExamHandles, ExamProps>(({ initialData, onValidityChange }, ref) => {
  const [formData, setFormData] = useState<ExamData>({
    module: initialData?.module || '',
    title: initialData?.title || '',
    date: initialData?.date || '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof ExamData, string>>>({});
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false);
  
  const validate = (data: ExamData) => {
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

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;;
  };

  useEffect(() => {
      if (hasAttemptedSubmit) {
          validate(formData);
      }
  }, [formData, hasAttemptedSubmit]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  useImperativeHandle(ref, () => ({
    getFormData: () => {
      setHasAttemptedSubmit(true);
      const isValid = validate(formData);
      onValidityChange(isValid);

      return {
        data: formData,
        errors: errors,
        isValid: isValid,
      };
    },
  }));

  return (
    <div className="popup-form">
      <InputField
        label="Modul"
        name="module"
        value={formData.module}
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