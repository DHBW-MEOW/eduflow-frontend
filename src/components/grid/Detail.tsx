import { useRef, useState } from 'react';
import PopUpCreate from '../popUpCreate/PopUpCreate';
import Edit from '../popUpCreate/popUpTypes/Edit';
import type { EditData, EditHandles } from '../popUpCreate/types';
import './Detail.css'

export interface DetailBaseData<T = any> {
  id: number;
  name: string;
  value: T;
}

export type DetailProps<T extends DetailBaseData> = {
  data: T;
  onEdit: (updated: T) => void;
  editable?: boolean;
};

export function Detail<T extends DetailBaseData>({ data, onEdit, editable = true }: DetailProps<T>) {
  const [popupOpen, setPopupOpen] = useState(false);
  const EditRef = useRef<EditHandles>(null);

  const openPopUp = () => setPopupOpen(true);
  const closePopup = () => setPopupOpen(false);

  const handleEdit = () => {
    if (EditRef.current) {
      const formData: EditData = EditRef.current.getFormData();
      onEdit({ ...data, value: formData.details });
      closePopup();
    }
  };

  return (
    <div className="detail">
      <div className='detail-header'>
        <h2>{data.name}</h2>
        {editable == true &&
          <button className="detail-button" onClick={openPopUp}>Edit</button>
        }
      </div>
      <p>{data.value}</p>

      <PopUpCreate 
        isOpen={popupOpen} 
        label={"\"" + data.name + "\" editieren"} 
        onClickDiscard={closePopup}
        onClickAdd={handleEdit}
      >
        <Edit ref={EditRef} />
      </PopUpCreate>
    </div>
  );
}

export default Detail;
