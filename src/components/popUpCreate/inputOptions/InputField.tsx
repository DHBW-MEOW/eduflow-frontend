import React from "react";

type InputFieldProps = {
    label: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField: React.FC<InputFieldProps> = ({label, name, value, onChange}) => {
    return (
        <div>
            <label htmlFor="name">{label}:</label>
            <input 
             type="text" 
             id={name}
             name={name}
             value={value}
             onChange={onChange}
            />
        </div>
    );
}

export default InputField