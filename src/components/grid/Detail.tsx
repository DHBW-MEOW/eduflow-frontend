import { useEffect, useRef, useState } from 'react';
import ContextMenu from '../contextMenu/ContextMenu';
import PopUpDelete from '../popUpDelete/PopUpDelete';
import PopUpCreate from '../popUpCreate/PopUpCreate';
import Rename from '../popUpCreate/popUpTypes/Rename';
import type { RenameData, RenameHandles } from '../popUpCreate/types';
import './Detail.css'

export type DetailData = {
    id: number;
    course_id: number;
    name: string;
    date: Date;
};

export type DetailProps = {
  data: DetailData;
  onEdit: (id: number, newContent: string) => void;
};

export function Detail({ data, onEdit }: DetailProps) {
  const [popupOpen, setPopupOpen] = useState(false);
  const renameRef = useRef<RenameHandles>(null);

  const handleEdit = () => {
    if (renameRef.current) {
      const newTitle: RenameData = renameRef.current.getFormData();
      onEdit(data.id, newTitle.title);
      closePopup();
    }
  };

  const openPopUp = () => {
    setPopupOpen(true);
  };

  const closePopup = () => {
    setPopupOpen(false);
  };

  return (
    <div className="detail">
      <div>
        <div className="header-container">
            <h3>{data.name}</h3>
        </div>
        <button className="edit-button" onClick={() => {
            openPopUp();
          }}
        >Edit</button>
      </div>

      {
        <PopUpCreate 
          isOpen={popupOpen} 
          label={"\"" + data.name + "\" editieren"} 
          onClickDiscard={closePopup}
          onClickAdd={handleEdit}
        >
          <Rename ref={renameRef} />
        </PopUpCreate>
      }
    </div>
  );
}

export default Detail;
