import { Goal } from "../services/beeminder";
import "./goal.css";
import Controls from "./controls";
import Countdown from "./countdown";
import { getGroup } from "../lib/getGroup";

export default function GoalComponent({
  g,
  onClick,
}: {
  g: Goal;
  onClick: () => void;
}) {
  return (
    <div
      class={`goal ${getGroup(g)}`}
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
