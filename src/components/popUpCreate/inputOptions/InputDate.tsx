import React from "react";
import './InputStyle.css';
import '../../../colors.css'

type InputDateProps = {
    label: string;
    name: string;
    value: string;
    isInvalid?: boolean;
    errorMessage?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputDate: React.FC<InputDateProps> = ({label, name, value, isInvalid, errorMessage, onChange}) => {
    const labelClass = `input-label ${isInvalid ? 'invalid-label' : ''}`;
    const inputClass = `input-date ${isInvalid ? 'input-invalid' : ''}`;

    return (
        <div className="input-group">
            <label htmlFor={name} className={labelClass}>{label}</label>
            <input 
             type="date" 
             id={name}
             name={name}
             value={value}
             onChange={onChange}
             className={inputClass}
            />
            {isInvalid && errorMessage && <span className="error-message">{errorMessage}</span>}
        </div>
    );
}

export default InputDate