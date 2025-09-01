import { Goal } from "../services/beeminder";

const LATER_BUFFER_THRESHOLD = 7;

function isPinned(g: Goal): boolean {
  return g.goal_type === "drinker" || g.fineprint?.includes("#bmPin") || false;
}

function isDue(g: Goal): boolean {
  return g.safebuf === 0;
}

function isTouched(g: Goal): boolean {
  return !!g.todayta;
}

export function getGroup(g: Goal): "pinned" | "today" | "next" | "later" {
  if (isPinned(g)) return "pinned";
  if (isDue(g)) return "today";
  if (!isTouched(g) && g.safebuf < LATER_BUFFER_THRESHOLD) return "next";
  return "later";
}
