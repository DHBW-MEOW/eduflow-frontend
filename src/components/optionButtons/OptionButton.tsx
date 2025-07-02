import "./OptionButtons.css";
import "./../../colors.css";

interface OptionButtonProps {
  label: string;
  isDisabled?: boolean;
  isHighlighted?: boolean;
  onClick: () => void;
}

const OptionButton: React.FC<OptionButtonProps> = ({
  label,
  isDisabled,
  isHighlighted,
  onClick,
}) => {
  return (
    <button
      className={isHighlighted ? "highlight-button" : "default-button"}
      onClick={onClick}
      disabled={isDisabled}
    >
      {label}
    </button>
  );
};

export default OptionButton;
