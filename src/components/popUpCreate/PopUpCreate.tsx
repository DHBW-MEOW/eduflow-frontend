import './PopUpCreate.css'
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
        return;
    }
    
    return (
        <div>
            <label>{label}</label>
            {children}
            <div>
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
    )
}

export default PopUpCreate;