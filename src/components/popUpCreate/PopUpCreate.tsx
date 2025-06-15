import './PopUpCreate.css'
import '../../colors.css'
import OptionButton from '../optionButtons/OptionButton';
import type { PopUpProps } from './types';



const PopUpCreate: React.FC<PopUpProps> = ({isOpen, label, children, isAddButtonDisabled, onClickDiscard, onClickAdd}) => {
    if (!isOpen) {
        return null;
    }
    
    return (
        <div className="popup-overlay" onClick={onClickDiscard}>
            <div className="popup-container" onClick={(e) => e.stopPropagation()}>
                <div className="popup-header">{label}</div>
                {children}
                <div className="popup-buttons">
                    <OptionButton
                     label='Verwerfen'
                     buttonType='optionButton'
                     onClick={onClickDiscard}
                     />
                     <OptionButton
                     label='Hinzufügen'
                     buttonType='optionButton'
                     onClick={onClickAdd}
                     isDisabled={isAddButtonDisabled}
                     />
                </div>
            </div>
        </div>
    )
}

export default PopUpCreate;