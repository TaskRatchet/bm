import { Goal } from "../services/beeminder";
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
      <span class="title">
        <span className="slug">{g.slug}</span>
        <Controls g={g} refreshOnly />
      </span>
      <Countdown g={g} />
      <span className="stakes">${g.pledge}</span>
    </div>
  );
}
