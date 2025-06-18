import React, { useState, useImperativeHandle, forwardRef, useEffect } from "react";
import type { RenameData, RenameHandles } from "../types";
import InputField from '../inputOptions/InputField';
import { validateTitle } from "../utils/validateTitle";
import './popUpTypes.css';

interface RenameProps {
  initialData?: RenameData
}

const Rename = forwardRef<RenameHandles, RenameProps>(({ initialData }, ref) => {
  const [formData, setFormData] = useState<RenameData>({
    title: initialData?.title || '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof RenameData, string>>>({});
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false);
  
  const validate = (data: RenameData) => {
    let newErrors: Partial<Record<keyof RenameData, string>> = {};

    const titleError = validateTitle(data.title);
    if (titleError) 
      newErrors.title = titleError;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;;
  };
  
  useEffect(() => {
      if (hasAttemptedSubmit) {
          validate(formData);
      }
  }, [formData, hasAttemptedSubmit]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
        label="Umbenennen"
        name="title"
        value={formData.title}
        isInvalid={!!errors.title}
        errorMessage={errors.title}
        onChange={handleChange}
      />
    </div>
  );
});

export default Rename;