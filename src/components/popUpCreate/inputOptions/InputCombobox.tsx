import React from "react";
import './InputStyle.css';

type InputComboboxProps = {
    label: string;
    name: string;
    value: string;
    options: string[];
    isInvalid?: boolean;
    errorMessage?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputCombobox: React.FC<InputComboboxProps> = ({label, name, value, options, isInvalid, errorMessage, onChange}) => {
    const labelClass = `input-label ${isInvalid ? 'invalid-label' : ''}`;
    const inputClass = `input-field ${isInvalid ? 'input-invalid' : ''}`;
    const datalistId = `${name}-options`;

    return (
        <div className="input-group">
            <label htmlFor={name} className={labelClass}>{label}</label>
            <input 
             type="text" 
             id={name}
             name={name}
             value={value}
             list={datalistId}
             onChange={onChange}
             className={inputClass}
            />

            {options && (
                <datalist id={datalistId}>
                    {options.map((option, index) => (
                        <option key={index} value={option} />
                    ))}
                </datalist>
            )}
            
            {isInvalid && errorMessage && <span className="error-message">{errorMessage}</span>}
        </div>
    );
}

export default InputCombobox