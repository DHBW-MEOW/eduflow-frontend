import React, { useState, useImperativeHandle, forwardRef } from 'react';
import type { ToDoData, ToDoHandles } from '../types.tsx';

import InputField from '../inputOptions/InputField';
import InputDate from '../inputOptions/InputDate';

interface ToDoProps {
  initialData?: Partial<ToDoData>;
}

const ToDo = forwardRef<ToDoHandles, ToDoProps>((props, ref) => {
  const [formData, setFormData] = useState<ToDoData>({
    title: props.initialData?.title || '',
    date: props.initialData?.date || '',
    details: props.initialData?.details || '',
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
      console.log('Form data from ToDo:', formData);
      return formData;
    },
  }));

  return (
    <div>
      <InputField
        label="Titel des ToDos"
        name="title"
        value={formData.title}
        onChange={handleChange}
      />
      <InputDate
        label="Fälligkeitsdatum"
        name="date"
        value={formData.date}
        onChange={handleChange}
      />
      <InputField
        label="Details"
        name="details"
        value={formData.details}
        onChange={handleChange}
      />
    </div>
  );
});

export default ToDo;