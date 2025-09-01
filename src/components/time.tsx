import { Goal } from "../services/beeminder";
import "./time.css";
import { useState, useEffect } from "preact/hooks";

type Point = {
  time: number;
  position: number;
  goals: Goal[];
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
  const slugs = p.goals.map((g) => g.slug);
  const tooltip = `${due}\n${slugs.join("\n")}`;
  return (
    <span style={{ left }} title={tooltip}>
      {p.goals.length}
    </span>
  );
}

const DAY_MS = 1000 * 60 * 60 * 24;

function makePoint(time: number, goals: Goal[]): Point {
  return {
    time,
    position: (time * 1000 - new Date().getTime()) / DAY_MS,
    goals: goals.filter((g) => g.losedate === time),
  };
}

function sortPoints(points: Record<string, Point>): Point[] {
  return Object.values(points).sort((a, b) => a.time - b.time);
}

function makePoints(goals: Goal[]): Point[] {
  const points = goals
    .filter((g) => g.safebuf === 0)
    .reduce(
      (acc: Record<string, Point>, g: Goal): Record<string, Point> => ({
        ...acc,
        [g.losedate]: makePoint(g.losedate, goals),
      }),
      {}
    );

  return sortPoints(points);
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
  }, [goals]);

  return (
    <div class="time">
      <span class="bubble">{hhmm}</span>
      <span class="line">
        {points.map((p) => (
          <Bubble key={p.time} p={p} />
        ))}
      </span>
    </div>
  );
}
