import { useEffect, useCallback } from "preact/hooks";
import { useSearchParams } from "react-router-dom";
import { USERNAME } from "../auth";
import { Goal } from "../bm";
import groupGoals from "../groupGoals";
import useGoals from "../useGoals";
import Controls from "./controls";
import "./detail.css";

export default function Detail({ g }: { g: Goal }) {
  const [, setParams] = useSearchParams();
  const { data = [] } = useGoals();
  const goals = Object.values(groupGoals(data)).flat();
  const i = goals.findIndex((_g: Goal) => _g.slug === g.slug);
  const hasPrev = i > 0;
  const hasNext = i < goals.length - 1;
  const goPrev = useCallback(
    () => setParams(`goal=${goals[i - 1].slug}`),
    [setParams, goals, i]
  );
  const goNext = useCallback(
    () => setParams(`goal=${goals[i + 1].slug}`),
    [setParams, goals, i]
  );

  useEffect(() => {
    const handler = (e: { key: string }) => {
      switch (e.key) {
        case "ArrowLeft":
          goPrev();
          break;
        case "ArrowRight":
          goNext();
          break;
        case "Escape":
          setParams("");
          break;
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [goNext, goPrev, setParams]);

  return (
    <div
      class="detail"
      style={{
        "--border-color": `var(--${g.roadstatuscolor})`,
      }}
    >
      <div class={`detail__limsumdate ${g.roadstatuscolor}`}>
        <button
          onClick={() => goPrev()}
          className={`icon-button ${(!hasPrev && "detail__disabled") || ""}`}
        >
          ◀
        </button>
        <span>{g.limsumdate}</span>
        <button
          onClick={() => goNext()}
          className={`icon-button ${(!hasNext && "detail__disabled") || ""}`}
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
          <button onClick={() => setParams("")} className="icon-button">
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
