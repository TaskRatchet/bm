import { describe, it, expect } from "vitest";
import groupGoals from "./groupGoals";

describe("groupGoals", () => {
  it("groups goals with week+ buffer in later", () => {
    const goals = [
      { slug: "goal1", safebuf: 0, todayta: false },
      { slug: "goal2", safebuf: 7, todayta: false },
      { slug: "goal3", safebuf: 14, todayta: true },
    ];

    const grouped = groupGoals(goals as any);

    expect(grouped.later).toHaveLength(2);
  });

  it("does not group goals with week+ buffer in next", () => {
    const goals = [{ slug: "goal", safebuf: 7, todayta: false }];

    const grouped = groupGoals(goals as any);

    expect(grouped.next).toHaveLength(0);
  });
});
