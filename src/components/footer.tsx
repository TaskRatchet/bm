import { ComponentChildren } from "preact";
import "./footer.css";

const LINKS = {
  na: "https://nathanarthur.com/",
  bm: "https://github.com/TaskRatchet/clients/tree/main/apps/bm",
  tr: "https://taskratchet.com",
  pp: "https://pinepeakdigital.com",
};

function Link(p: { href: string; children: ComponentChildren }) {
  return (
    <a href={p.href} target="_blank" rel="noreferrer">
      {p.children}
    </a>
  );
}

export default function Footer() {
  return (
    <small class="footer">
      Made by <Link href={LINKS.na}>Narthur</Link> and{" "}
      <Link href={LINKS.pp}>Pine Peak Digital</Link>.{" "}
      <Link href={LINKS.bm}>View source</Link>. See also:{" "}
      <Link href={LINKS.tr}>TaskRatchet</Link>
    </small>
  );
}
