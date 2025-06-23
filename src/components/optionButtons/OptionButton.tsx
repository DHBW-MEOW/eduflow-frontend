import './OptionButtons.css'
import './../../colors.css'

interface OptionButtonProps {
    label: string;
    buttonType: 'optionButton' | 'createDataButton'
    isDisabled?: boolean;
    onClick: () => void;
}

const OptionButton: React.FC<OptionButtonProps> = ({label, buttonType, isDisabled, onClick}) => {
    return (
        <button className={buttonType} onClick={onClick} disabled={isDisabled}>
            {label}
        </button>
    );
}

export default OptionButton;