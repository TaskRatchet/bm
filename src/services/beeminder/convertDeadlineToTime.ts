// deadline (number): Seconds by which your deadline differs from
// midnight. Negative is before midnight, positive is after midnight.
// Allowed range is -17*3600 to 6*3600 (7am to 6am).

// This function converts the deadline to a human-readable time
// between 7:00am and 6:00am.
export default function convertDeadlineToTime(deadline: number) {
  if (deadline < -17 * 3600 || deadline > 6 * 3600) {
    throw new Error("Invalid deadline");
  }

  const hours = Math.floor(deadline / 3600);
  const minute = Math.abs((deadline % 3600) / 60);
  const xm = deadline < 0 ? "pm" : "am";
  const hour = deadline < 0 ? hours + 12 : hours < 12 ? hours : hours - 12;
  const h = hour === 0 ? "12" : Math.abs(hour).toString();
  const mm = minute.toString().padStart(2, "0");

  return `${h}:${mm}${xm}`;
}
