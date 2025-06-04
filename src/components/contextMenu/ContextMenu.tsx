import './ContextMenu.css'

type Action = {
  label: string;
  onClick: () => void;
};

type ContextMenuProps = {
  actions: Action[];
};

export default function ContextMenu({ actions }: ContextMenuProps) {
  return (
    <div className="context-menu">
      {actions.map((action, i) => (
        <button key={i} onClick={(event) => {
            event.stopPropagation(); 
            action.onClick();
          }}
        >
          {action.label}
        </button>
      ))}
    </div>
  );
}