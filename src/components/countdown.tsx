import { Goal } from "../bm";
import { useState, useEffect } from "preact/hooks";
import "./countdown.css";

const Units = {
  Second: {
    seconds: 1,
    symbol: "s",
  },
  Minute: {
    seconds: 60,
    symbol: "m",
  },
  Hour: {
    seconds: 60 * 60,
    symbol: "h",
  },
  Day: {
    seconds: 60 * 60 * 24,
    symbol: "d",
  },
  Week: {
    seconds: 60 * 60 * 24 * 7,
    symbol: "w",
  },
  Month: {
    seconds: 60 * 60 * 24 * 30,
    symbol: "m",
  },
  Year: {
    seconds: 60 * 60 * 24 * 365,
    symbol: "y",
  },
};

function getSeconds(g: Goal): number {
  const now = new Date();
  const then = new Date(g.losedate * 1000);
  const diff = then.getTime() - now.getTime();
  return diff / 1000;
}

function formatTime(n: number): string {
  const abs = Math.abs(n);
  const hours = Math.floor(abs);
  const minutes = Math.floor((abs - hours) * 60);
  return `${hours}:${minutes.toString().padStart(2, "0")}`;
}

function extractNumber(s: string): string {
  return s.match(/^[+-]?(\d+\.?\d?\d?)/)?.[1] || "";
}

function roundNumber(n: number) {
  return Math.ceil(Math.abs(n));
}

function getPrefix(g: Goal): string {
  const v = g.limsum.match(/^[+-]?[\d\.]+/)?.[0];

  if (!v) return "";

  const n = Number(v);
  const s = n < 0 ? "-" : "";
  const r = g.hhmmformat
    ? formatTime(n)
    : g.integery
    ? roundNumber(n)
    : extractNumber(v);

  return `${s}${r} in`;
}

function W({ children }: { children: any }) {
  return <span class="countdown">{children}</span>;
}

export default function Countdown({ g }: { g: Goal }) {
  const [seconds, setSeconds] = useState<Number>(getSeconds(g));

  useEffect(() => {
    const i = setInterval(() => setSeconds(getSeconds(g)), 1000);
    return () => clearInterval(i);
  });

  if (seconds < 0) return <W>💀</W>;

  const prefix = getPrefix(g);
  const unit = Object.values(Units).findLast((u) => seconds > u.seconds);

  if (!unit) return <W>🤷‍♂️</W>;

  return (
    <W>
      {prefix} {Math.floor(Number(seconds) / unit.seconds)}
      {unit.symbol}
    </W>
  );
}
