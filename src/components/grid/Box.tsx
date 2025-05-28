type BoxProps = {
  title: string;
  // onDelete?: () => void;
  // onRename?: (newTitle: string) => void;
};

function Box({title}: BoxProps) {

    return (
      <div>
        <p>{title}</p>
      </div>
    )
  }
  
  export default Box;