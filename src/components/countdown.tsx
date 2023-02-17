import { Goal } from "../bm";
import { useState, useEffect } from "preact/hooks";

const hour = 60 * 60;
const day = hour * 24;
const week = day * 7;
const month = day * 30;
const year = day * 365;

function getSeconds(g: Goal): number {
  const now = new Date();
  const then = new Date(g.losedate * 1000);
  const diff = then.getTime() - now.getTime();
  return Math.floor(diff / 1000);
}

function getPrefix(g: Goal): string {
  const { delta, hhmmformat, integery } = g;
  if (hhmmformat) {
    const abs = Math.abs(delta);
    const hours = Math.floor(abs);
    const minutes = Math.floor((abs - hours) * 60);
    return `${hours}:${minutes.toString().padStart(2, "0")} in`;
  }
  console.log({
    slug: g.slug,
    integery,
  });
  if (integery) {
    return `${Math.ceil(Math.abs(delta))} in`;
  }
  return `${Math.abs(delta).toFixed(1)} in`;
}

export default function Countdown({ g }: { g: Goal }) {
  const [seconds, setSeconds] = useState<Number>(getSeconds(g));

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(getSeconds(g));
    }, 1000);
    return () => clearInterval(interval);
  });

  if (seconds < 0) {
    return <span class="countdown">💀</span>;
  }

  const prefix = getPrefix(g);
  const divisor =
    seconds < hour
      ? 1
      : seconds < day
      ? hour
      : seconds < week
      ? day
      : seconds < month
      ? week
      : seconds < year
      ? month
      : year;
  const unit =
    seconds < hour
      ? "s"
      : seconds < day
      ? "h"
      : seconds < week
      ? "d"
      : seconds < month
      ? "w"
      : seconds < year
      ? "m"
      : "y";

  return (
    <span class="countdown">
      {prefix} {Math.floor(Number(seconds) / divisor)}
      {unit}
    </span>
  );
}
