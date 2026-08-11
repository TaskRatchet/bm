// Beeminder's `archivedate` is the unix time a scheduled archive takes effect,
// or null when no archive is scheduled. It can be in the past — an already-ended
// goal is scheduled for a midnight that has gone by — in which case the archive
// is only waiting on the next processing run.
export default function archiveNotice(
  archivedate: number | null | undefined,
  now: Date = new Date()
): string | null {
  if (archivedate == null) return null;
  const when = new Date(archivedate * 1000);
  if (when.getTime() <= now.getTime()) return "Archiving shortly";
  return `Archiving ${when.toLocaleDateString(undefined, {
    dateStyle: "medium",
  })}`;
}
