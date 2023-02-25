import { ComponentChildren } from "preact";
import "./center.css";

export default function Center({ children }: { children: ComponentChildren }) {
  return (
    <div class="center">
      <div>{children}</div>
    </div>
  );
}
