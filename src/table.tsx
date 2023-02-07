import { Goal } from "./app";
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
        <GoalComponent g={g} onMutate={onMutate} />
      ))}
    </div>
  );
}
