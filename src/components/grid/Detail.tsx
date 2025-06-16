import { useRef, useState } from 'react';
import PopUpCreate from '../popUpCreate/PopUpCreate';
import Rename from '../popUpCreate/popUpTypes/Rename';
import type { RenameData, RenameHandles } from '../popUpCreate/types';
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
  const renameRef = useRef<RenameHandles>(null);

  const openPopUp = () => setPopupOpen(true);
  const closePopup = () => setPopupOpen(false);

  const handleEdit = () => {
    if (renameRef.current) {
      const formData: RenameData = renameRef.current.getFormData();
      onEdit({ ...data, value: formData.title });
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
        <Rename ref={renameRef} />
      </PopUpCreate>
    </div>
  );
}

export default Detail;
