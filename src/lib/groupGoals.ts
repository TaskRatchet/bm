import { Goal } from "../services/beeminder";
import { getGroup } from "./getGroup";

export default function groupGoals(goals: Goal[]): {
  pinned: Goal[];
  today: Goal[];
  next: Goal[];
  later: Goal[];
} {
  goals.sort((a, b) => (a.losedate < b.losedate ? -1 : 1));

  const grouped = {
    pinned: [] as Goal[],
    today: [] as Goal[],
    next: [] as Goal[],
    later: [] as Goal[],
  };

  for (const goal of goals) {
    grouped[getGroup(goal)].push(goal);
  }

  grouped.pinned.sort((a, b) => (a.slug < b.slug ? -1 : 1));

  return grouped;
}
