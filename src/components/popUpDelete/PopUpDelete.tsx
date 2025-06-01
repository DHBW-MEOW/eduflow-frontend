import './PopUpDelete.css'
import OptionButton from "../optionButtons/OptionButton";

type PopUpProps = {
    isOpen: boolean;
    content: string | React.ReactNode;
    onClickCancel: () => void;
    onClickConfirm: () => void;
}

const PopUpDelete: React.FC<PopUpProps> = ({isOpen, content, onClickCancel, onClickConfirm}) => {
    if(!isOpen) {
        return null;
    }

    return (
        <div className="popup-overlay" onClick={onClickCancel}>
            <div className="popup-content" onClick={(e) => e.stopPropagation()}>
                <button className="popup-close-button" onClick={onClickCancel}>
                    &times; {/* Close button - Not sure if needed */}
                </button>
                <div>{content}</div>
                <div className="popup-buttons">
                    <OptionButton
                     label="Abbrechen"
                     onClick={onClickCancel}
                    />
                    <OptionButton
                     label="Bestätigen"
                     onClick={onClickConfirm}
                    />
                </div>
            </div>
        </div>
    )
}

export default PopUpDelete