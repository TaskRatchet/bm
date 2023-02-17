import { Goal } from "../bm";
import GoalComponent from "./goal";
import "./goals.css";

export function Goals({ goals = [] }: { goals: Goal[] }) {
  goals.sort((a, b) => (a.losedate < b.losedate ? -1 : 1));
  const today = goals.filter((g: Goal) => g.safebuf === 0);
  const next = goals.filter((g: Goal) => g.safebuf !== 0 && !g.todayta);
  const later = goals.filter((g: Goal) => g.safebuf !== 0 && g.todayta);

  return (
    <>
      <h1>Today</h1>
      <div class="goals">
        {today.map((g: Goal) => (
          <GoalComponent key={g.slug} g={g} />
        ))}
      </div>
      <h1>Next</h1>
      <div class="goals">
        {next.map((g: Goal) => (
          <GoalComponent key={g.slug} g={g} />
        ))}
      </div>
      <h1>Later</h1>
      <div class="goals">
        {later.map((g: Goal) => (
          <GoalComponent key={g.slug} g={g} />
        ))}
      </div>
    </>
  );
}
