import React, { useState, useImperativeHandle, forwardRef, useEffect } from "react";
import type { LearningPlanData, LearningPlanHandles, FormComponentProps } from "../types.tsx";
import './popUpTypes.css';

import InputField from "../inputOptions/InputField.tsx";
import InputDate from "../inputOptions/InputDate.tsx";
import InputDetails from "../inputOptions/InputDetails.tsx";

import { validateDate } from '../utils/validateDate';
import { validateModul } from '../utils/validateModul';
import { validateTopic } from "../utils/validateTopic.tsx";

interface LearningPlanProps extends FormComponentProps<LearningPlanData> {}

const LearningPlan = forwardRef<LearningPlanHandles, LearningPlanProps>(({ initialData, onValidityChange }, ref) => {
    const [formData, setFormData] = useState<LearningPlanData>({
        date: initialData?.date || '',
        topic: initialData?.topic || '',
        module: initialData?.module || '',
        details: initialData?.details || '',
    });

    const [errors, setErrors] = useState<Partial<Record<keyof LearningPlanData, string>>>({});
    const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false);
      
    const validate = (data: LearningPlanData) => {
    let newErrors: Partial<Record<keyof LearningPlanData, string>> = {};

    const moduleError = validateModul(data.module);
    if (moduleError) 
        newErrors.module = moduleError;

    const topicError = validateTopic(data.topic);
    if (topicError) 
        newErrors.topic = topicError;

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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
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
                label="Thema"
                name="topic"
                value={formData.topic}
                isInvalid={!!errors.topic}
                errorMessage={errors.topic}
                onChange={handleChange}
            />
            <InputDate
                label="Deadline"
                name="date"
                value={formData.date}
                isInvalid={!!errors.date}
                errorMessage={errors.date}
                onChange={handleChange}
            />
            <InputDetails
                label="Details"
                name="details"
                value={formData.details}
                onChange={handleTextareaChange}
                placeholder="Füge hier deine Inhalte ein..."
            />
        </div>
    );
});

export default LearningPlan