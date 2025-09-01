import { Goal } from "../services/beeminder";
import { getGroup } from "./getGroup";

export default function groupGoals(goals: Goal[]): {
  pinned: Goal[];
  today: Goal[];
  next: Goal[];
  later: Goal[];
} {
  // Don’t mutate the original `goals`; copy and sort, breaking ties by `slug`
  const sortedGoals = [...goals].sort((a, b) => {
    const diff = a.losedate - b.losedate;
    return diff !== 0 ? diff : a.slug.localeCompare(b.slug);
  });

  const grouped = {
    pinned: [] as Goal[],
    today: [] as Goal[],
    next: [] as Goal[],
    later: [] as Goal[],
  };

  // Use the sorted array when grouping
  for (const goal of sortedGoals) {
    grouped[getGroup(goal)].push(goal);
  }

  // Ensure pinned goals are sorted by slug in a locale-aware way
  grouped.pinned.sort((a, b) => a.slug.localeCompare(b.slug));

  return grouped;
}
