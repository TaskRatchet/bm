import { Goal } from "../bm";
import G from "./goal";
import "./goals.css";

export function Goals({ goals = [] }: { goals: Goal[] }) {
  goals.sort((a, b) => (a.losedate < b.losedate ? -1 : 1));
  const t = goals.filter((g: Goal) => g.safebuf === 0);
  const n = goals.filter((g: Goal) => g.safebuf !== 0 && !g.todayta);
  const l = goals.filter((g: Goal) => g.safebuf !== 0 && g.todayta);

  return (
    <div class="goals">
      <h1>Today</h1>
      {t.map((g) => (
        <G key={g.slug} g={g} />
      ))}

      <h1>Next</h1>
      {n.map((g) => (
        <G key={g.slug} g={g} />
      ))}

      <h1>Later</h1>
      {l.map((g) => (
        <G key={g.slug} g={g} />
      ))}
    </div>
  );
}
