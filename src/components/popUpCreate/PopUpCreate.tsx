import React from "react";
import OptionButton from "../optionButtons/OptionButton";
import type { PopUpProps } from "./types";
import "./PopUpCreate.css";

const PopUpCreate: React.FC<PopUpProps> = ({
  isOpen,
  label,
  children,
  modulOptions,
  topicOptions,
  isAddButtonDisabled,
  onClickDiscard,
  onClickAdd,
}) => {
  if (!isOpen) {
    return null;
  }

  const childrenWithProps = React.cloneElement(
    children as React.ReactElement<any>,
    {
      moduleOptions: modulOptions,
      topicOptions: topicOptions,
    },
  );

  return (
    <div className="popup-overlay" onClick={onClickDiscard}>
      <div className="popup-container" onClick={(e) => e.stopPropagation()}>
        <button className="popup-close-button" onClick={onClickDiscard}>
          &times;
        </button>

        <div className="popup-header">{label}</div>
        {childrenWithProps}
        <div className="popup-buttons">
          <OptionButton label="Verwerfen" onClick={onClickDiscard} />
          <OptionButton
            label="Hinzufügen"
            isHighlighted={true}
            onClick={onClickAdd}
            isDisabled={isAddButtonDisabled}
          />
        </div>
      </div>
    </div>
  );
};

export default PopUpCreate;
