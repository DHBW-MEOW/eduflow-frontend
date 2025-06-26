import React, { useState, useImperativeHandle, forwardRef, useEffect, useCallback } from "react";
import type { LearningPlanData, LearningPlanHandles } from "../types.tsx";
import './popUpTypes.css';

import InputCombobox from "../inputOptions/InputCombobox.tsx";
import InputDate from "../inputOptions/InputDate.tsx";
import InputDetails from "../inputOptions/InputDetails.tsx";

import { validateDate } from '../utils/validateDate';
import { validateModul } from '../utils/validateModul';
import { validateTopic } from "../utils/validateTopic.tsx";

interface LearningPlanProps {
    moduleOptions?: string[];
    topicOptions?: string[];
    initialData?: LearningPlanData;
    onModuleChange?: (moduleName: string) => void;
    onValidationChange?: (isValid: boolean) => void;
}

const LearningPlan = forwardRef<LearningPlanHandles, LearningPlanProps>(({ initialData, moduleOptions, topicOptions, onModuleChange, onValidationChange }, ref) => {
    const [formData, setFormData] = useState<LearningPlanData>({
        date: initialData?.date || '',
        topic: initialData?.topic || '',
        module: initialData?.module || '',
        details: initialData?.details || '',
    });

    const [errors, setErrors] = useState<Partial<Record<keyof LearningPlanData, string>>>({});
    const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false);
      
    const getErrors = useCallback((data: LearningPlanData) => {
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

        return newErrors;
    },[]);

    useEffect(() => {
        if (onModuleChange) {
            onModuleChange(formData.module);
        }
    }, [formData.module, onModuleChange]);
    
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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prevData => {
            const newData = {
                ...prevData,
                [name]: value,
            };
            return newData;
        });

        if (hasAttemptedSubmit) {
            const newErrors = getErrors({ ...formData, [name]: value } as LearningPlanData);
            if (newErrors[name as keyof LearningPlanData] !== errors[name as keyof LearningPlanData]) {
                setErrors(prevErrors => ({
                    ...prevErrors,
                    [name as keyof LearningPlanData]: newErrors[name as keyof LearningPlanData]
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
                errors: currentErrors,
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
            <InputCombobox
                label="Thema"
                name="topic"
                value={formData.topic}
                options={topicOptions || []}
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
                onChange={handleChange}
                placeholder="Füge hier deine Inhalte ein..."
            />
        </div>
    );
});

export default LearningPlan