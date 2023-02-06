import { Goal } from "./app";
import { createDatapoint, refreshGraph } from "./bm";

function formatValue(value: unknown): string {
  if (typeof value === "string") return value;
  if (typeof value === "number") return value.toString();
  if (typeof value === "boolean") return value ? "yes" : "no";
  if (typeof value === "object") return JSON.stringify(value);
  return "";
}

function getRowClass(goal: Goal) {
  const buf = goal.safebuf as number;
  const num = buf > 3 ? 3 : buf < 0 ? 0 : buf;

  return `buffer-${num}`;
}

const headers = ["slug", "limsumdays", "title"];
const params = new URLSearchParams(location.search);
const accessToken = params.get("access_token") || "";

export function Table({ goals = [] }: { goals: Goal[] }) {
  goals.sort((a, b) => {
    const aLose = a.losedate;
    const bLose = b.losedate;

    if (aLose && bLose) {
      return aLose < bLose ? -1 : 1;
    }

    if (aLose) return -1;
    if (bLose) return 1;

    return 0;
  });

  return (
    <table class="pure-table">
      <thead>
        <tr>
          {headers.map((h) => (
            <th>{h}</th>
          ))}
          <th>data</th>
        </tr>
      </thead>
      <tbody>
        {goals.map((g: Goal) => (
          <tr class={getRowClass(g)}>
            {headers.map((h: string) => (
              <td>{formatValue(g[h])}</td>
            ))}
            <td>
              {g.autodata ? (
                <button
                  onClick={() => refreshGraph(accessToken, g.slug as string)}
                >
                  🔄
                </button>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const value = e.currentTarget.value.value;
                    createDatapoint(accessToken, g.slug as string, value);
                  }}
                  style={{
                    "white-space": "nowrap",
                  }}
                >
                  <input
                    name="value"
                    id="value"
                    type="number"
                    style={{
                      width: "50px",
                    }}
                  />
                  <input type="submit" value="✅" />
                </form>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
