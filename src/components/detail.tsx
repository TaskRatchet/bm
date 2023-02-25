import { useEffect } from "preact/hooks";
import { useSearchParams } from "react-router-dom";
import { USERNAME } from "../auth";
import { Goal } from "../bm";
import groupGoals from "../groupGoals";
import useGoals from "../useGoals";
import Controls from "./controls";
import "./detail.css";

function formatValue(v: unknown): string | number {
  if (typeof v === "number") return v.toFixed(2);
  if (typeof v === "string") return v;
  if (v === null) return "null";
  if (v === undefined) return "undefined";
  return JSON.stringify(v);
}

function Values({ g, keys }: { g: Goal; keys: (keyof Goal)[] }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Key</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
        {keys.map((k: keyof Goal) => (
          <tr>
            <td>
              <strong>{k}</strong>
            </td>
            <td>{formatValue(g[k])}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default function Detail({ g }: { g: Goal }) {
  const [, setParams] = useSearchParams();
  const { data = [] } = useGoals();
  const goals = Object.values(groupGoals(data)).flat();
  const i = goals.findIndex((_g: Goal) => _g.slug === g.slug);
  const goPrev = () => setParams("goal=" + goals[i - 1].slug);
  const goNext = () => setParams("goal=" + goals[i + 1].slug);

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
  }, []);

  return (
    <div
      class="detail"
      style={{
        "--border-color": `var(--${g.roadstatuscolor})`,
      }}
    >
      <div class={`detail__limsumdate ${g.roadstatuscolor}`}>
        <button onClick={() => goPrev()} className="icon-button">
          ◀
        </button>
        <span>{g.limsumdate}</span>
        <button onClick={() => goNext()} className="icon-button">
          ▶
        </button>
      </div>
      <div class="detail__header">
        <div>
          <h1>{g.slug}</h1>
        </div>

        <div class="detail__buttons">
          <a
            href={`https://beeminder.com/${USERNAME}/${g.slug}`}
            className="icon-button"
          >
            🔗
          </a>
          <Controls g={g} />
          <button onClick={() => setParams("")} className="icon-button">
            ❌
          </button>
        </div>
      </div>

      <small class="detail__title">{g.title}</small>

      <img src={g.svg_url} />

      <div className="detail_info">
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
              <tr>
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
