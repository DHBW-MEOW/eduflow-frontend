import OptionButton from "../optionButtons/OptionButton";

interface PopUpProps {
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
        <div>
            <p>{content}</p>
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