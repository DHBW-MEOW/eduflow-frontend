import './OptionButtons.css'
import './../../colors.css'

interface OptionButtonProps {
    label: string;
    buttonType: 'optionButton' | 'createDataButton'
    onClick: () => void;
}

const OptionButton: React.FC<OptionButtonProps> = ({label, buttonType, onClick}) => {
    return (
        <button className={buttonType} onClick={onClick}>
            {label}
        </button>
    );
}

export default OptionButton;