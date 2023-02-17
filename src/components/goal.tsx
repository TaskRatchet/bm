import { Goal } from "../bm";
import "./goal.css";
import { USERNAME } from "../auth";
import Controls from "./controls";
import Countdown from "./countdown";

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
    <div
      class={`goal ${getBufferClass(g)}`}
      onClick={() => {
        window.open(`https://beeminder.com/${USERNAME}/${g.slug}`);
      }}
    >
      <h3>{g.slug}</h3>
      <p class="data">
        <Countdown g={g} />
        <Controls g={g} onMutate={onMutate} />
      </p>
    </div>
  );
}
