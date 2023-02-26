import { Goal } from "./bm";

function isLimit(g: Goal): boolean {
  return g.goal_type === "drinker";
}

export default function groupGoals(goals: Goal[]): {
  limits: Goal[];
  today: Goal[];
  next: Goal[];
  later: Goal[];
} {
  goals.sort((a, b) => (a.losedate < b.losedate ? -1 : 1));
  return {
    limits: goals.filter(isLimit).sort((a, b) => (a.slug < b.slug ? -1 : 1)),
    today: goals.filter((g) => !isLimit(g) && g.safebuf === 0),
    next: goals.filter((g) => !isLimit(g) && g.safebuf !== 0 && !g.todayta),
    later: goals.filter((g) => !isLimit(g) && g.safebuf !== 0 && g.todayta),
  };
}
