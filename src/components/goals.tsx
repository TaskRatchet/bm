import { Goal } from "../bm";
import groupGoals from "../groupGoals";
import G from "./goal";
import "./goals.css";

export function Goals({ goals = [] }: { goals: Goal[] }) {
  const { today, next, later } = groupGoals(goals);

  return (
    <div class="goals">
      <h1>Today</h1>
      {today.map((g) => (
        <G key={g.slug} g={g} />
      ))}

      <h1>Next</h1>
      {next.map((g) => (
        <G key={g.slug} g={g} />
      ))}

      <h1>Later</h1>
      {later.map((g) => (
        <G key={g.slug} g={g} />
      ))}
    </div>
  );
}
