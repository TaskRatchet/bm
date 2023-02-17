import { Goal } from "../bm";
import GoalComponent from "./goal";
import "./table.css";

export function Table({
  goals = [],
  onMutate,
}: {
  goals: Goal[];
  onMutate: () => void;
}) {
  goals.sort((a, b) => (a.losedate < b.losedate ? -1 : 1));

  return (
    <div class="goals">
      {goals.map((g: Goal) => (
        <GoalComponent key={g.slug} g={g} onMutate={onMutate} />
      ))}
    </div>
  );
}
