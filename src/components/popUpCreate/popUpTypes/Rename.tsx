import React, { useState, useImperativeHandle, forwardRef } from "react";
import type { RenameData, RenameHandles } from "../types";
import InputField from '../inputOptions/InputField';
import './popUpTypes.css';

interface RenameProps {
  initialData?: Partial<RenameData>;
}

const Rename = forwardRef<RenameHandles, RenameProps>((props, ref) => {
  const [formData, setFormData] = useState<RenameData>({
    title: props.initialData?.title || '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  useImperativeHandle(ref, () => ({
    getFormData: () => {
      return formData;
    },
  }));

  return (
    <div className="popup-form">
      <InputField
        label="Umbenennen"
        name="title"
        value={formData.title}
        onChange={handleChange}
      />
    </div>
  );
});

export default Rename;