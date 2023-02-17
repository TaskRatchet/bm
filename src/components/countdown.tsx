import { Goal } from "../bm";
import { useState, useEffect } from "preact/hooks";

const hour = 60 * 60;
const day = hour * 24;
const week = day * 7;
const month = day * 30;
const year = day * 365;

export default function Countdown({ g }: { g: Goal }) {
  const { safebump, losedate } = g;
  const [seconds, setSeconds] = useState<Number>();

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const then = new Date(losedate * 1000);
      const diff = then.getTime() - now.getTime();
      const seconds = Math.floor(diff / 1000);
      setSeconds(seconds);
    }, 1000);
    return () => clearInterval(interval);
  });

  if (!(typeof seconds === "number")) return <span class="countdown">...</span>;

  if (seconds < 0) {
    return <span class="countdown">💀</span>;
  }

  const prefix = `+${safebump.toFixed(1)} in`;

  if (seconds < hour) {
    return (
      <span class="countdown">
        {prefix} {seconds}s
      </span>
    );
  }

  if (seconds < day) {
    return (
      <span class="countdown">
        {prefix} {Math.floor(seconds / hour)}h
      </span>
    );
  }

  if (seconds < week) {
    return (
      <span class="countdown">
        {prefix} {Math.floor(seconds / day)}d
      </span>
    );
  }

  if (seconds < month) {
    return (
      <span class="countdown">
        {prefix} {Math.floor(seconds / week)}w
      </span>
    );
  }

  if (seconds < year) {
    return (
      <span class="countdown">
        {prefix} {Math.floor(seconds / month)}m
      </span>
    );
  }

  return (
    <span class="countdown">
      {prefix} {Math.floor(seconds / year)}y
    </span>
  );
}
