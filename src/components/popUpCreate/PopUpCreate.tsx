import './PopUpCreate.css'
import '../../colors.css'
import OptionButton from '../optionButtons/OptionButton';

type PopUpProps = {
    isOpen: boolean
    label: string;
    children: React.ReactElement;
    onClickDiscard: () => void;
    onClickAdd: () => void;
}

const PopUpCreate: React.FC<PopUpProps> = ({isOpen, label, children, onClickDiscard, onClickAdd}) => {
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
                     onClick={onClickDiscard}
                     />
                     <OptionButton
                     label='Hinzufügen'
                     onClick={onClickAdd}
                     />
                </div>
            </div>
        </div>
    )
}

export default PopUpCreate;