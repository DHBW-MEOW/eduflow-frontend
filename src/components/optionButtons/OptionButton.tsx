import './OptionButtons.css'
import '../../colors.css'

interface OptionButtonProps {
    label: string;
    onClick: () => void;
}

const OptionButton: React.FC<OptionButtonProps> = ({label, onClick}) => {
    return (
        <button onClick={onClick}>
            {label}
        </button>
    );
}

export default OptionButton;