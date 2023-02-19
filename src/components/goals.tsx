import { Goal } from "../bm";
import GoalComponent from "./goal";
import "./goals.css";

export function Goals({ goals = [] }: { goals: Goal[] }) {
  goals.sort((a, b) => (a.losedate < b.losedate ? -1 : 1));
  const today = goals.filter((g: Goal) => g.safebuf === 0);
  const next = goals.filter((g: Goal) => g.safebuf !== 0 && !g.todayta);
  const later = goals.filter((g: Goal) => g.safebuf !== 0 && g.todayta);

  return (
    <div class="goals">
      <h1>Today</h1>
      {today.map((g: Goal) => (
        <GoalComponent key={g.slug} g={g} />
      ))}
      <h1>Next</h1>
      {next.map((g: Goal) => (
        <GoalComponent key={g.slug} g={g} />
      ))}
      <h1>Later</h1>
      {later.map((g: Goal) => (
        <GoalComponent key={g.slug} g={g} />
      ))}
    </div>
  );
}
