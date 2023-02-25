import { Goal } from "../bm";
import groupGoals from "../groupGoals";
import G from "./goal";
import "./goals.css";

export function Goals({ goals = [] }: { goals: Goal[] }) {
  const all = Object.values(groupGoals(goals)).flat();

  return (
    <div class="goals">
      {all.map((g) => (
        <G key={g.slug} g={g} />
      ))}
    </div>
  );
}
