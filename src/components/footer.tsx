import "./footer.css";

export default function Footer() {
  return (
    <small class="footer">
      <span>
        Made by{" "}
        <a href="https://nathanarthur.com/" target="_blank" rel="noreferrer">
          Narthur
        </a>
        .{" "}
        <a
          href="https://github.com/TaskRatchet/bm"
          target="_blank"
          rel="noreferrer"
        >
          View source
        </a>
        . See also:{" "}
        <a href="https://taskratchet.com" target="_blank" rel="noreferrer">
          TaskRatchet
        </a>
      </span>
    </small>
  );
}
