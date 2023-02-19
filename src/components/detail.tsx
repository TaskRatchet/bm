import { USERNAME } from "../auth";
import { Goal } from "../bm";

const general: (keyof Goal)[] = [
  "title",
  "rate",
  "limsum",
  "safesum",
  "weekends_off",
  "autodata",
  "autodata_config",
  "losedate",
  "deadline",
  "leadtime",
  "alertstart",
  "updated_at",
  "graphsum",
  "frozen",
  "last_datapoint",
  "dueby",
  "lost",
  "won",
  "hhmmformat",
  "todayta",
  "tmin",
  "tmax",
  "recent_data",
  "contract",
  "tags",
  "callback_url",
  "pledge",
  "mathishard",
  "fineprint",
  "curday",
  "curval",
  "lastday",
  "gunits",
  "yaxis",
  "initday",
  "initval",
  "kyoom",
  "odom",
  "integery",
  "noisy",
  "plotall",
  "coasting",
  "yaw",
  "baremin",
  "baremintotal",
  "delta",
  "runits",
  "limsumdate",
  "limsumdays",
];
const endState: (keyof Goal)[] = ["goalval", "goaldate"];
const ommitted: (keyof Goal)[] = [
  ...general,
  ...endState,
  "slug",
  "description",
  "svg_url",
  "graph_url",
  "thumb_url",
  "goal_type",
  "healthkitmetric",
  "use_defaults",
  "id",
  "ephem",
  "queued",
  "panic",
  "burner",
  "road",
  "roadall",
  "fullroad",
  "headsum",
  "lane",
  "dir",
];

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
  return (
    <div class="detail">
      <h1>{g.slug}</h1>

      <div>
        <a
          href={`https://beeminder.com/${USERNAME}/${g.slug}`}
          className="icon-button"
        >
          🔗
        </a>
      </div>

      <img src={g.svg_url} />
      <Values g={g} keys={general} />
      <h2>End State</h2>
      <Values g={g} keys={endState} />
      <h2>Fields</h2>
      <ul>
        {Object.entries(g).map(([k, v]) =>
          ommitted.includes(k as keyof Goal) ? null : (
            <li>
              <strong>{k}</strong>: {JSON.stringify(v)}
            </li>
          )
        )}
      </ul>
      <pre>{JSON.stringify(g, null, 2)}</pre>
    </div>
  );
}
