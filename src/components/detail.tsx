import { USERNAME } from "../auth";
import { Goal } from "../bm";
import Controls from "./controls";
import "./detail.css";

export default function Detail({
  g,
  goPrev,
  goNext,
  close,
}: {
  g: Goal;
  goNext?: () => void;
  goPrev?: () => void;
  close: () => void;
}) {
  return (
    <div
      class="detail"
      style={{
        "--border-color": `var(--${g.roadstatuscolor})`,
      }}
    >
      <div class={`detail__limsumdate ${g.roadstatuscolor}`}>
        <button
          onClick={() => goPrev?.()}
          className={`icon-button ${(!goPrev && "detail__disabled") || ""}`}
        >
          ◀
        </button>
        <span>{g.limsumdate}</span>
        <button
          onClick={() => goNext?.()}
          className={`icon-button ${(!goNext && "detail__disabled") || ""}`}
        >
          ▶
        </button>
      </div>
      <div class="detail__header">
        <a
          href={`https://beeminder.com/${USERNAME}/${g.slug}`}
          class="detail__headerText"
        >
          <img src={g.thumb_url} width={200} height={132} />
          <div>
            <h1>{g.slug}</h1>
            <div class="detail__title">{g.title}</div>
          </div>
        </a>

        <div class="detail__buttons">
          <Controls g={g} />
          <button onClick={() => close()} className="icon-button">
            ❌
          </button>
        </div>
      </div>

      <div className="detail_info">
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Comment</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            {g.recent_data.map((d) => (
              <tr key={d.id}>
                <td>{d.daystamp}</td>
                <td>{d.comment}</td>
                <td>{d.value}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <p>
          <strong>Fineprint:</strong> {g.fineprint || "[empty]"}
        </p>
      </div>
    </div>
  );
}
