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
  popUpType?: "rename" | "datepicker";
};

export function Detail<T extends DetailBaseData>({ data, onEdit, popUpType = "rename" }: DetailProps<T>) {
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
      <h3>{data.name}</h3>
      <p>{data.value}</p>
      <button onClick={openPopUp}>Edit</button>

      {popUpType == "rename" &&
        <PopUpCreate 
          isOpen={popupOpen} 
          label={"\"" + data.name + "\" editieren"} 
          onClickDiscard={closePopup}
          onClickAdd={handleEdit}
        >
          <Rename ref={renameRef} />
        </PopUpCreate>
      }
      {popUpType == "datepicker" && popupOpen && 
        <div>Not available yet</div>
      }
    </div>
  );
}

export default Detail;
