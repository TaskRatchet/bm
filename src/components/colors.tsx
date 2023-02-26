import { Goal } from "../bm";
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
        "--redLen": `${(r.length / goals.length) * 100}%`,
        "--orangeLen": `${(o.length / goals.length) * 100}%`,
        "--blueLen": `${(b.length / goals.length) * 100}%`,
        "--greenLen": `${(g.length / goals.length) * 100}%`,
      }}
    >
      <span class="red" />
      <span class="orange" />
      <span class="blue" />
      <span class="green" />
    </div>
  );
}
