import { Goal } from "./app";

const headers = ["slug", "limsumdays", "title"];
const params = new URLSearchParams(location.search);
const accessToken = params.get("access_token") || "";
const user = params.get("username") || "";
import { createDatapoint, refreshGraph } from "./bm";

function formatValue(value: unknown): string {
  if (typeof value === "string") return value;
  if (typeof value === "number") return value.toString();
  if (typeof value === "boolean") return value ? "yes" : "no";
  if (typeof value === "object") return JSON.stringify(value);
  return "";
}

function getBufferClass(goal: Goal) {
  const buf = goal.safebuf as number;
  const num = buf > 3 ? 3 : buf < 0 ? 0 : buf;

  return `buffer-${num}`;
}

export default function GoalComponent({
  g,
  onMutate = () => undefined,
}: {
  g: Goal;
  onMutate: () => void;
}) {
  return (
    <tr class={getBufferClass(g)}>
      {headers.map((h: string) => {
        const v = formatValue(g[h]);
        if (h === "slug")
          return (
            <td>
              <a href={`https://beeminder.com/${user}/${v}`} target="_blank">
                {v}
              </a>
            </td>
          );
        return <td>{v}</td>;
      })}
      <td>
        {g.autodata ? (
          <button
            class="icon-button"
            onClick={() =>
              refreshGraph(accessToken, g.slug as string).then(onMutate)
            }
          >
            🔄
          </button>
        ) : (
          <form
            class="pure-form"
            onSubmit={(e) => {
              e.preventDefault();
              const value = e.currentTarget.value.value;
              createDatapoint(accessToken, g.slug as string, value).then(
                onMutate
              );
            }}
            style={{
              "white-space": "nowrap",
            }}
          >
            <input
              class="pure-input-1-4"
              name="value"
              id="value"
              type="number"
            />
            <input class="icon-button" type="submit" value="✅" />
          </form>
        )}
      </td>
    </tr>
  );
}
