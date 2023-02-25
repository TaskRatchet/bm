import { Goal } from "../bm";
import "./time.css";
import { useState, useEffect } from "preact/hooks";

type Point = {
  time: number;
  count: number;
  position: number;
  slugs: string[];
};

function formatNow(): string {
  const d = new Date();
  const hh = d.getHours().toString().padStart(2, "0");
  const mm = d.getMinutes().toString().padStart(2, "0");
  return `${hh}:${mm}`;
}

function Bubble({ p }: { p: Point }) {
  const left = `${p.position * 100}%`;
  const due = new Date(p.time * 1000).toLocaleTimeString();
  const tooltip = `${due}\n${p.slugs.join("\n")}`;
  return (
    <span style={{ left }} title={tooltip}>
      {p.count}
    </span>
  );
}

export default function Time({ goals }: { goals: Goal[] }) {
  const [d, setDate] = useState(new Date());
  const [hhmm, setHhmm] = useState(formatNow());

  useEffect(() => {
    const i = setInterval(() => {
      setDate(new Date());
      setHhmm(formatNow());
    }, 60000);
    return () => clearInterval(i);
  }, []);

  const now = d.getTime() / 1000;
  const day = 60 * 60 * 24;
  const points = goals
    .filter((g) => g.safebuf === 0)
    .reduce(
      (acc: Record<string, Point>, g: Goal): Record<string, Point> => ({
        ...acc,
        [g.losedate]: {
          time: g.losedate,
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
      <span class="bubble">{hhmm}</span>
      <span class="line">
        {times.map((t) => (
          <Bubble p={points[t]} />
        ))}
      </span>
    </div>
  );
}
