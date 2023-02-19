import { Goal } from "../bm";
import "./goal.css";
import { USERNAME } from "../auth";
import Controls from "./controls";
import Countdown from "./countdown";

function getBufferClass(g: Goal) {
  const b = g.safebuf;
  const n = b > 3 ? 3 : b < 0 ? 0 : b;

  return `buffer-${n}`;
}

export default function GoalComponent({ g }: { g: Goal }) {
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
        <Controls g={g} />
      </p>
    </div>
  );
}
