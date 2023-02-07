import { Goal } from "./app";
import GoalComponent from "./goal";

const headers = ["slug", "limsumdays", "title"];

export function Table({
  goals = [],
  onMutate = () => undefined,
}: {
  goals: Goal[];
  onMutate: () => void;
}) {
  goals.sort((a, b) => {
    const aLose = a.losedate;
    const bLose = b.losedate;

    if (aLose && bLose) {
      return aLose < bLose ? -1 : 1;
    }

    if (aLose) return -1;
    if (bLose) return 1;

    return 0;
  });

  return (
    <table class="pure-table">
      <thead>
        <tr>
          {headers.map((h) => (
            <th>{h}</th>
          ))}
          <th>data</th>
        </tr>
      </thead>
      <tbody>
        {goals.map((g: Goal) => (
          <GoalComponent g={g} onMutate={onMutate} />
        ))}
      </tbody>
    </table>
  );
}
