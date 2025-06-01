import React from "react";
import './InputStyle.css';

type InputDateProps = {
    label: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputDate: React.FC<InputDateProps> = ({label, name, value, onChange}) => {
    return (
        <div className="input-group">
            <label htmlFor={name}>{label}</label>
            <input 
             type="date" 
             id={name}
             name={name}
             value={value}
             onChange={onChange}
             className="input-date"
            />
        </div>
    );
}

export default InputDate