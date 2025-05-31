import './Box.css'

export type BoxProps = {
  title: string;
  // onDelete?: () => void;
  // onRename?: (newTitle: string) => void;
};

export function Box({title}: BoxProps) {

    return (
      <div>
        <p className='box'>{title}</p>
      </div>
    )
  }
  
  export default Box;