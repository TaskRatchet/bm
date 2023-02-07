import { Goal } from "./app";
import "./goal.css";
import { createDatapoint, refreshGraph } from "./bm";
import { ACCESS_TOKEN, USERNAME } from "./auth";

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
        <h2>
          <a href={`https://beeminder.com/${USERNAME}/${g.slug}`}>{g.slug}</a>
        </h2>
        {g.autodata ? (
          <button
            class="icon-button"
            onClick={() => refreshGraph(ACCESS_TOKEN, g.slug).then(onMutate)}
          >
            🔄
          </button>
        ) : (
          <form
            class="controls pure-form"
            onSubmit={(e) => {
              e.preventDefault();
              const value = e.currentTarget.value.value;
              createDatapoint(ACCESS_TOKEN, g.slug, value).then(onMutate);
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
