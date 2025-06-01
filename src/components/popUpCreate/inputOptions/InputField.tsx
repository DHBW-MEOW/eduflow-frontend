import React from "react";
import './InputStyle.css';

type InputFieldProps = {
    label: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField: React.FC<InputFieldProps> = ({label, name, value, onChange}) => {
    return (
        <div className="input-group">
            <label htmlFor={name}>{label}</label>
            <input 
             type="text" 
             id={name}
             name={name}
             value={value}
             onChange={onChange}
             className="input-field"
            />
        </div>
    );
}

export default InputField