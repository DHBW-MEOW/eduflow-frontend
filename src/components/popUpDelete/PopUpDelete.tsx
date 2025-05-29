import './PopUpDelete.css'
import OptionButton from "../optionButtons/OptionButton";

type PopUpProps = {
    isOpen: boolean;
    content: string;
    onClickCancel: () => void;
    onClickConfirm: () => void;
}

const PopUpDelete: React.FC<PopUpProps> = ({isOpen, content, onClickCancel, onClickConfirm}) => {
    if(!isOpen) {
        return;
    }

    return (
        <div className='popup-content'>
            <p>{content}</p>
            <button className='popup-close-button'>
                &times;
            </button>
            <OptionButton
             label="Abbrechen"
             onClick={onClickCancel}
            />
            <OptionButton
             label="Bestätigen"
             onClick={onClickConfirm}
            />
        </div>
    )
}

export default PopUpDelete