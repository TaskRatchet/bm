import { ComponentChildren } from "preact";
import "./footer.css";

function Link({
  href,
  children,
}: {
  href: string;
  children: ComponentChildren;
}) {
  return (
    <a href={href} target="_blank" rel="noreferrer">
      {children}
    </a>
  );
}

export default function Footer() {
  return (
    <small class="footer">
      Made by <Link href="https://nathanarthur.com/">Narthur</Link>.{" "}
      <Link href="https://github.com/TaskRatchet/bm">View source</Link>. See
      also: <Link href="https://taskratchet.com">TaskRatchet</Link>
    </small>
  );
}
