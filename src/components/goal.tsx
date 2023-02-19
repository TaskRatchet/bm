import { Goal } from "../bm";
import "./goal.css";
import { USERNAME } from "../auth";
import Controls from "./controls";
import Countdown from "./countdown";

function makeClass({ safebuf: b }: Goal) {
  return `buffer-${b > 3 ? 3 : b < 0 ? 0 : b}`;
}

export default function GoalComponent({ g }: { g: Goal }) {
  return (
    <div
      class={`goal ${makeClass(g)}`}
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
