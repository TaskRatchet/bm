import { Goal } from "../bm";
import useGoals from "../useGoals";

function getTags(data: Goal[]) {
  const all = data.reduce((acc: string[], g: Goal) => {
    return [...acc, ...g.tags];
  }, []);

  return [...new Set(all)];
}

export default function Tags() {
  const { data = [] } = useGoals();
  const tags = getTags(data);

  return (
    <ul class="tags">
      {tags.map((t) => (
        <li key={t}>#{t}</li>
      ))}
    </ul>
  );
}
