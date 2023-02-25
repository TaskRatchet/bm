import { Goal } from "../bm";
import "./goal.css";
import Controls from "./controls";
import Countdown from "./countdown";
import { useSearchParams } from "react-router-dom";
import Detail from "./detail";

export default function GoalComponent({ g }: { g: Goal }) {
  const [params, setParams] = useSearchParams();

  if (params.get("goal") === g.slug) {
    return <Detail g={g} />;
  }

  const section = g.safebuf === 0 ? "today" : !g.todayta ? "next" : "later";

  return (
    <div
      class={`goal ${section}`}
      onClick={() => {
        const s = new URLSearchParams(window.location.search);
        s.set("goal", g.slug);
        setParams(s);
      }}
      style={{
        "--goal-color": `var(--${g.roadstatuscolor})`,
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
