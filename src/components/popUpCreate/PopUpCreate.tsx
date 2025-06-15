import React from 'react';
import OptionButton from '../optionButtons/OptionButton';
import type { PopUpProps } from './types';
import './PopUpCreate.css'

const PopUpCreate: React.FC<PopUpProps> = ({isOpen, label, children, modulOptions, topicOptions, onClickDiscard, onClickAdd}) => {
    if (!isOpen) {
        return null;
    }

    const childrenWithProps = React.cloneElement(children as React.ReactElement<any>, {
        moduleOptions: modulOptions,
        topicOptions: topicOptions
    });
    
    return (
        <div className="popup-overlay" onClick={onClickDiscard}>
            <div className="popup-container" onClick={(e) => e.stopPropagation()}>
                <div className="popup-header">{label}</div>
                {childrenWithProps}
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
                     />
                </div>
            </div>
        </div>
    )
}

export default PopUpCreate;