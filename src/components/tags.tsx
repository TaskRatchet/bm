import { useState, useEffect } from "preact/hooks";
import { Goal } from "../services/beeminder";
import cnx from "../cnx";
import useGoals from "../useGoals";
import "./tags.css";

function getTags(data: Goal[]) {
  const all = data.reduce((acc: string[], g: Goal) => [...acc, ...g.tags], []);
  return [...new Set(all)];
}

export default function Tags({
  onChange,
}: {
  onChange: (tag: string) => void;
}) {
  const { data = [] } = useGoals();
  const [tag, setTag] = useState("");
  const tags = getTags(data);

  useEffect(() => onChange(tag), [onChange, tag]);

  return (
    <ul class="tags">
      {tags.map((t) => (
        <li key={t} class={cnx(t === tag && "tags__active")}>
          <button onClick={() => setTag(t === tag ? "" : t)}>#{t}</button>
        </li>
      ))}
    </ul>
  );
}
