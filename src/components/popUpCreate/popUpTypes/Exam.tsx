import React, { useState, useImperativeHandle, forwardRef } from 'react';
import type { ExamData, ExamHandles } from '../types';
import './popUpTypes.css';

import InputField from '../inputOptions/InputField';
import InputDate from '../inputOptions/InputDate';

interface ExamProps {
  initialData?: Partial<ExamData>;
}

const Exam = forwardRef<ExamHandles, ExamProps>((props, ref) => {
  const [formData, setFormData] = useState<ExamData>({
    module: props.initialData?.module || '',
    title: props.initialData?.title || '',
    date: props.initialData?.date || '',
  });

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
      return formData;
    },
  }));

  return (
    <div className="popup-form">
      <InputField
        label="Modul"
        name="module"
        value={formData.module}
        onChange={handleChange}
      />
      <InputField
        label="Art der Prüfung"
        name="title"
        value={formData.title}
        onChange={handleChange}
      />
      <InputDate
        label="Prüfungsdatum"
        name="date"
        value={formData.date}
        onChange={handleChange}
      />
    </div>
  );
});

export default Exam;