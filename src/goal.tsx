import { Goal } from "./app";
import "./goal.css";
import { USERNAME } from "./auth";
import Controls from "./controls";

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
        <Controls g={g} onMutate={onMutate} />
      </div>
      <p>{g.title}</p>
      <p>{g.limsum}</p>
    </div>
  );
}
