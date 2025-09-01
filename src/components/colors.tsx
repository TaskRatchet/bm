import { Goal } from "../services/beeminder";
import "./colors.css";

export default function Colors({ goals }: { goals: Goal[] }) {
  const r = goals.filter((g) => g.roadstatuscolor === "red");
  const o = goals.filter((g) => g.roadstatuscolor === "orange");
  const b = goals.filter((g) => g.roadstatuscolor === "blue");
  const g = goals.filter((g) => g.roadstatuscolor === "green");

  return (
    <div
      class="colors"
      style={{
        "--r": `${(r.length / goals.length) * 100}%`,
        "--o": `${(o.length / goals.length) * 100}%`,
        "--b": `${(b.length / goals.length) * 100}%`,
        "--g": `${(g.length / goals.length) * 100}%`,
      }}
    >
      <span class="red" />
      <span class="orange" />
      <span class="blue" />
      <span class="green" />
    </div>
  );
}
