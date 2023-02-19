import { Goal } from "../bm";
import "./goal.css";
import Controls from "./controls";
import Countdown from "./countdown";
import { useSearchParams } from "react-router-dom";

function makeClass({ safebuf: b }: Goal) {
  return `buffer-${b > 3 ? 3 : b < 0 ? 0 : b}`;
}

export default function GoalComponent({ g }: { g: Goal }) {
  const [, setParams] = useSearchParams();

  return (
    <div
      class={`goal ${makeClass(g)}`}
      onClick={() => {
        const s = new URLSearchParams(window.location.search);
        s.set("goal", g.slug);
        setParams(s);
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
