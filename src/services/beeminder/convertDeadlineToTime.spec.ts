import { describe, it, expect } from "vitest";
import convertDeadlineToTime from "./convertDeadlineToTime";

// deadline (number): Seconds by which your deadline differs from
// midnight. Negative is before midnight, positive is after midnight.
// Allowed range is -17*3600 to 6*3600 (7am to 6am).

describe("convertDeadlineToTime", () => {
  it('converts 0 to "12:00am"', () => {
    expect(convertDeadlineToTime(0)).toBe("12:00am");
  });

  it('converts 3600 to "1:00am"', () => {
    expect(convertDeadlineToTime(3600)).toBe("1:00am");
  });

  it('converts 7200 to "2:00am"', () => {
    expect(convertDeadlineToTime(7200)).toBe("2:00am");
  });

  it('converts -3600 to "11:00pm"', () => {
    expect(convertDeadlineToTime(-3600)).toBe("11:00pm");
  });

  it('converts -7200 to "10:00pm"', () => {
    expect(convertDeadlineToTime(-7200)).toBe("10:00pm");
  });

  it("handles half hours", () => {
    expect(convertDeadlineToTime(1800)).toBe("12:30am");
  });

  it("handles single digit minute", () => {
    expect(convertDeadlineToTime(300)).toBe("12:05am");
  });

  it("handles negative half hours", () => {
    expect(convertDeadlineToTime(-1800)).toBe("11:30pm");
  });

  it("converts -54000 to 3:00pm", () => {
    expect(convertDeadlineToTime(-54000)).toBe("3:00pm");
  });
});
