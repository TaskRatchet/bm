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

function makePoint(time: number, goals: Goal[]): Point {
  const now = new Date().getTime() / 1000;
  const day = 60 * 60 * 24;
  const position = (time - now) / day;
  const slugs = goals.filter((g) => g.losedate === time).map((g) => g.slug);
  return {
    time,
    count: slugs.length,
    position,
    slugs,
  };
}

function makePoints(goals: Goal[]): Record<string, Point> {
  return goals
    .filter((g) => g.safebuf === 0)
    .reduce(
      (acc: Record<string, Point>, g: Goal): Record<string, Point> => ({
        ...acc,
        [g.losedate]: makePoint(g.losedate, goals),
      }),
      {}
    );
}

export default function Time({ goals }: { goals: Goal[] }) {
  const [hhmm, setHhmm] = useState(formatNow());
  const [points, setPoints] = useState(makePoints(goals));

  useEffect(() => {
    const i = setInterval(() => {
      setHhmm(formatNow());
      setPoints(makePoints(goals));
    }, 60000);
    return () => clearInterval(i);
  }, []);

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
