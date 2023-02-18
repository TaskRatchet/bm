import "./center.css";

export default function Center({ children }: { children: any }) {
  return (
    <div class="center">
      <div>{children}</div>
    </div>
  );
}
