import React from "react";
import './InputStyle.css';

type InputFieldProps = {
    label: string;
    name: string;
    value: string;
    isPassword?: boolean;
    isInvalid?: boolean;
    errorMessage?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField: React.FC<InputFieldProps> = ({label, name, value, isPassword, isInvalid, errorMessage, onChange}) => {
    const labelClass = `input-label ${isInvalid ? 'invalid-label' : ''}`;
    const inputClass = `input-field ${isInvalid ? 'input-invalid' : ''}`;

    return (
        <div className="input-group">
            <label htmlFor={name} className={labelClass}>{label}</label>
            <input 
             type={isPassword ? "password" : "text"}
             id={name}
             name={name}
             value={value}
             onChange={onChange}
             className={inputClass}
             maxLength={25}
            />
            <div className="error-message-placeholder">
                {isInvalid && errorMessage && <span className="error-message">{errorMessage}</span>}
            </div>
        </div>
    );
}

export default InputField