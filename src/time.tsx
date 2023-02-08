import { Goal } from "./bm";
import "./time.css";
import { useState, useEffect } from "preact/hooks";

type Point = {
  count: number;
  position: number;
  slugs: string[];
};

export default function Time({ goals }: { goals: Goal[] }) {
  const [d, setDate] = useState(new Date());

  useEffect(() => {
    const i = setInterval(() => {
      setDate(new Date());
    }, 1000);

    return () => clearInterval(i);
  }, []);

  const now = d.getTime() / 1000;
  const day = 60 * 60 * 24;
  const points = goals
    .filter((g) => g.losedate < now + day)
    .reduce(
      (acc: Record<string, Point>, g: Goal): Record<string, Point> => ({
        ...acc,
        [g.losedate]: {
          count: (acc[g.losedate]?.count || 0) + 1,
          slugs: [...(acc[g.losedate]?.slugs || []), g.slug],
          position: acc[g.losedate]?.position ?? (g.losedate - now) / day,
        },
      }),
      {}
    );
  const times = Object.keys(points).sort((a, b) => +a - +b);

  return (
    <div class="time">
      <span class="bubble">{d.toLocaleTimeString()}</span>
      <span class="line">
        {times.map((t) => (
          <span
            style={{
              left: `${points[t].position * 100}%`,
            }}
            title={`${new Date(+t * 1000).toLocaleTimeString()}\n${points[
              t
            ].slugs.join("\n")}`}
          >
            {points[t].count}
          </span>
        ))}
      </span>
    </div>
  );
}
