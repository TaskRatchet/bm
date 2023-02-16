import { Goal } from "../bm";
import "./colors.css";

export default function Colors({ goals }: { goals: Goal[] }) {
  const red = goals.filter((g) => g.safebuf === 0);
  const yellow = goals.filter((g) => g.safebuf === 1);
  const blue = goals.filter((g) => g.safebuf === 2);
  const green = goals.filter((g) => g.safebuf > 2);

  return (
    <div
      class="colors"
      style={{
        "--redLen": (red.length / goals.length) * 100 + "%",
        "--yellowLen": (yellow.length / goals.length) * 100 + "%",
        "--blueLen": (blue.length / goals.length) * 100 + "%",
        "--greenLen": (green.length / goals.length) * 100 + "%",
      }}
    >
      <span class="red"></span>
      <span class="yellow"></span>
      <span class="blue"></span>
      <span class="green"></span>
    </div>
  );
}
