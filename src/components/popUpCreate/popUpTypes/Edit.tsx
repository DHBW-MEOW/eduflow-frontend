import React, { useState, useImperativeHandle, forwardRef } from "react";
import type { EditData, EditHandles } from "../types";
import InputDetails from "../inputOptions/InputDetails";
import './popUpTypes.css';

interface EditProps {
  initialData?: Partial<EditData>;
}

const Edit = forwardRef<EditHandles, EditProps>((props, ref) => {
  const [formData, setFormData] = useState<EditData>({
    details: props.initialData?.details || '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
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
      <InputDetails
        label="Details"
        name="details"
        value={formData.details}
        onChange={handleChange}
      />
    </div>
  );
});

export default Edit;