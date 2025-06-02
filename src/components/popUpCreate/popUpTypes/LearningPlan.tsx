import React, { useState, useImperativeHandle, forwardRef } from "react";
import type { LearningPlanData, LearningPlanHandles } from "../types.tsx";
import './popUpTypes.css';
import '../../../colors.css'

import InputField from "../inputOptions/InputField.tsx";
import InputDate from "../inputOptions/InputDate.tsx";
import InputDetails from "../inputOptions/InputDetails.tsx";

interface LearningPlanProps {
    initialData?: Partial<LearningPlanData>;
}

const LearningPlan = forwardRef<LearningPlanHandles, LearningPlanProps>((props, ref) => {
    const [formData, setFormData] = useState<LearningPlanData>({
        title: props.initialData?.title || '',
        date: props.initialData?.date || '',
        topic: props.initialData?.topic || '',
        module: props.initialData?.module || '',
        details: props.initialData?.details || '',
    });

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
            console.log('Form data from LearningPlan:', formData);
            return formData;
        }
    }))

    return (
        <div className="popup-form">
            <InputField
                label="Modul"
                name="module"
                value={formData.module}
                onChange={handleChange}
            />
            <InputField
                label="Thema"
                name="topic"
                value={formData.topic}
                onChange={handleChange}
            />
            <InputDate
                label="Deadline"
                name="date"
                value={formData.date}
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