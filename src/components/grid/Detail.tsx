import { useRef, useState } from 'react';
import PopUpCreate from '../popUpCreate/PopUpCreate';
import Edit from '../popUpCreate/popUpTypes/Edit';
import type { EditData, EditHandles } from '../popUpCreate/types';
import './Detail.css'
import OptionButton from '../optionButtons/OptionButton';

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
  const renameRef = useRef<EditHandles>(null);

  const openPopUp = () => setPopupOpen(true);
  const closePopup = () => setPopupOpen(false);

  const handleEdit = () => {
    if (renameRef.current) {
      const formData: EditData = renameRef.current.getFormData();
      onEdit({ ...data, value: formData.details });
      closePopup();
    }
  };

  return (
    <div className="detail">
      <div className='detail-header'>
        <h2>{data.name}</h2>
        {editable == true &&
          <div className='detail-edit'>
            <OptionButton
              label='Bearbeiten'
              buttonType='optionButton'
              onClick={openPopUp}
            />
          </div>
          
        }
      </div>
      <div className='detail-content'>
        {
          data.value.split('\n').map((line: string, index: string) => (
            <span key={index}>
              {line}
              <br />
            </span>
          ))
        }
      </div>

      <PopUpCreate 
        isOpen={popupOpen} 
        label={"\"" + data.name + "\" editieren"} 
        onClickDiscard={closePopup}
        onClickAdd={handleEdit}
      >
        <Edit ref={renameRef} />
      </PopUpCreate>
    </div>
  );
}

export default Detail;
