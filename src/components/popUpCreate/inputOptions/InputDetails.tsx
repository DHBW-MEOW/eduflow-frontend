import React from "react";
import './InputStyle.css';

type InputDetailsProps = {
    label: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    placeholder?: string;
}

const InputDetails: React.FC<InputDetailsProps> = ({label, name, value, onChange, placeholder}) => {
    return (
        <div className="input-group">
            <label htmlFor={name}>{label}</label>
            <textarea
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                className="input-textarea"
                placeholder={placeholder}
            />
        </div>
    );
}

export default InputDetails