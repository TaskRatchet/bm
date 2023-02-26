import { ComponentChildren } from "preact";
import { useEffect } from "preact/hooks";
import "./center.css";

export default function Center({ children }: { children: ComponentChildren }) {
  useEffect(() => {
    document.body.classList.add("center");
    return () => document.body.classList.remove("center");
  }, []);

  return (
    <div class="center">
      <div>{children}</div>
    </div>
  );
}
