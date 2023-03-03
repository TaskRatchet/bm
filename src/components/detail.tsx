import { USERNAME } from "../auth";
import { Goal } from "../bm";
import groupGoals from "../groupGoals";
import useGoals from "../useGoals";
import Controls from "./controls";
import "./detail.css";

function sigfigs(n: number) {
  const digits = 2;
  const isNegative = n < 0;
  const abs = Math.abs(n);
  const rounded = Math.round(abs * 10 ** digits) / 10 ** digits;
  return isNegative ? -rounded : rounded;
}

export default function Detail({
  g,
  goPrev,
  goNext,
}: {
  g: Goal;
  goNext?: VoidFunction;
  goPrev?: VoidFunction;
}) {
  const { data = [] } = useGoals();
  const grouped = groupGoals(data);
  const goals = Object.values(grouped).flat();
  const i = goals.findIndex((g2) => g2.slug === g.slug);
  const p = i === undefined ? "?" : i + 1;
  const r = sigfigs(g.mathishard[2]);

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
        <span>
          {p} of {goals.length}
        </span>
        <button
          onClick={() => goNext?.()}
          className={`icon-button ${(!goNext && "detail__disabled") || ""}`}
        >
          ▶
        </button>
      </div>

      <div class="detail__header">
        <div>
          <a
            href={`https://beeminder.com/${USERNAME}/${g.slug}`}
            class="detail__headerText"
          >
            <h1>{g.slug}</h1>
          </a>
          <Controls g={g} />
        </div>

        <div class="detail__title">{g.title}</div>
      </div>

      <div className="detail_info">
        <img src={g.svg_url} width={230} height={150} />

        <ul class="pills">
          <li>
            {r} {g.gunits} / {g.runits}
          </li>
        </ul>

        <h2>Recent Data</h2>

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

        <h2>Fineprint</h2>

        <p>{g.fineprint || "[empty]"}</p>
      </div>
    </div>
  );
}
