import { Goal } from "./bm";

export default function groupGoals(goals: Goal[]): {
  today: Goal[];
  next: Goal[];
  later: Goal[];
} {
  goals.sort((a, b) => (a.losedate < b.losedate ? -1 : 1));
  return {
    today: goals.filter((g) => g.safebuf === 0),
    next: goals.filter((g) => g.safebuf !== 0 && !g.todayta),
    later: goals.filter((g) => g.safebuf !== 0 && g.todayta),
  };
}
