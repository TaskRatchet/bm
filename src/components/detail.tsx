import { useSearchParams } from "react-router-dom";
import { USERNAME } from "../auth";
import { Goal } from "../bm";
import groupGoals from "../groupGoals";
import useGoals from "../useGoals";
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

export default function Detail() {
  const [params, setParams] = useSearchParams();
  const { data = [] } = useGoals();
  const slug = params.get("goal");

  if (!slug) return null;

  const goals = Object.values(groupGoals(data)).flat();

  const i = goals.findIndex((g: Goal) => g.slug === slug);
  const g = goals[i];
  const prev = goals[i - 1];
  const next = goals[i + 1];

  console.log({ g });

  return (
    <div class="detail">
      <div class="detail__header">
        <div>
          <h1>{g.slug}</h1>
          <small>{g.title}</small>
        </div>

        <div>
          <a
            href={`https://beeminder.com/${USERNAME}/${g.slug}`}
            className="icon-button"
          >
            🔗
          </a>
          <button onClick={() => setParams("")} className="icon-button">
            ❌
          </button>
          <button
            onClick={() => setParams("goal=" + prev.slug)}
            className="icon-button"
          >
            ◀
          </button>
          <button
            onClick={() => setParams("goal=" + next.slug)}
            className="icon-button"
          >
            ▶
          </button>
        </div>
      </div>

      <img src={g.svg_url} />
      {g.fineprint && (
        <div>
          <h2>Fineprint</h2>
          <p>{g.fineprint}</p>
        </div>
      )}
    </div>
  );
}
