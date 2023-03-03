import { ComponentChildren } from "preact";
import "./modal.css";

export default function Modal({
  children,
  open,
  onClose,
}: {
  open: boolean;
  onClose?: () => void;
  children: ComponentChildren;
}) {
  if (!open) return null;

  const c = () => onClose?.();

  return (
    <div class={"modal"} onClick={c}>
      <div
        class="inner"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {children}
      </div>
    </div>
  );
}
