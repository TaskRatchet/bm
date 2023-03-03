import { Goal } from "../bm";
import "./goal.css";
import Controls from "./controls";
import Countdown from "./countdown";

export default function GoalComponent({
  g,
  onClick,
}: {
  g: Goal;
  onClick: () => void;
}) {
  const section = g.safebuf === 0 ? "today" : !g.todayta ? "next" : "later";
  return (
    <div
      class={`goal ${section}`}
      onClick={() => onClick()}
      style={{
        "--goal-color": `var(--${g.roadstatuscolor})`,
      }}
    >
      <h3>{g.slug}</h3>
      <p class="data">
        <Countdown g={g} />
        <Controls g={g} refreshOnly />
      </p>
    </div>
  );
}
