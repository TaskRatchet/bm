import { Goal } from "./services/beeminder";

function isPinned(g: Goal): boolean {
  return g.goal_type === "drinker" || g.fineprint?.includes("#bmPin") || false;
}

export default function groupGoals(goals: Goal[]): {
  pinned: Goal[];
  today: Goal[];
  next: Goal[];
  later: Goal[];
} {
  goals.sort((a, b) => (a.losedate < b.losedate ? -1 : 1));
  return {
    pinned: goals.filter(isPinned).sort((a, b) => (a.slug < b.slug ? -1 : 1)),
    today: goals.filter((g) => !isPinned(g) && g.safebuf === 0),
    next: goals.filter((g) => !isPinned(g) && g.safebuf !== 0 && !g.todayta),
    later: goals.filter((g) => !isPinned(g) && g.safebuf !== 0 && g.todayta),
  };
}
