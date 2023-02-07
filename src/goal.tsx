import { Goal } from "./app";
import "./goal.css";

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
  onMutate,
}: {
  g: Goal;
  onMutate: () => void;
}) {
  return (
    <div class={`goal ${getBufferClass(g)}`}>
      <div className="header">
        <h2>{g.slug}</h2>
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
            class="controls pure-form"
            onSubmit={(e) => {
              e.preventDefault();
              const value = e.currentTarget.value.value;
              createDatapoint(accessToken, g.slug as string, value).then(
                onMutate
              );
            }}
          >
            <input class="value-input" name="value" id="value" type="number" />
            <input class="icon-button" type="submit" value="✅" />
          </form>
        )}
      </div>
      <p>{g.title}</p>
      <p>{g.limsum}</p>
    </div>
  );
}
