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

  it("uses stakes to break ties when losedate is equal", () => {
    const goals = [
      { slug: "goal1", safebuf: 0, todayta: false, pledge: 100 },
      { slug: "goal2", safebuf: 0, todayta: false, pledge: 200 },
    ];

    const grouped = groupGoals(goals as any);

    expect(grouped.today).toHaveLength(2);
    expect(grouped.today[0].slug).toBe("goal2");
    expect(grouped.today[1].slug).toBe("goal1");
  });
});
