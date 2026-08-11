import { describe, it, expect } from "vitest";
import archiveNotice from "./archiveNotice";

describe("archiveNotice", () => {
  const now = new Date("2026-01-01T00:00:00Z");
  const at = (iso: string) => new Date(iso).getTime() / 1000;

  it("is null when no archive is scheduled", () => {
    expect(archiveNotice(null, now)).toBeNull();
    expect(archiveNotice(undefined, now)).toBeNull();
  });

  it("names the date for a future archive", () => {
    expect(archiveNotice(at("2026-02-03T05:00:00Z"), now)).toMatch(
      /^Archiving .*\d/
    );
  });

  it("says shortly once the date has passed", () => {
    expect(archiveNotice(at("2025-12-30T00:00:00Z"), now)).toBe(
      "Archiving shortly"
    );
    expect(archiveNotice(at("2026-01-01T00:00:00Z"), now)).toBe(
      "Archiving shortly"
    );
    // 0 is a real timestamp, not "unscheduled" — pins the nullish guard.
    expect(archiveNotice(0, now)).toBe("Archiving shortly");
  });
});
