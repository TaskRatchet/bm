import { useState, useMemo, useEffect } from "preact/hooks";
import { Goal } from "../bm";
import groupGoals from "../groupGoals";
import Detail from "./detail";
import G from "./goal";
import "./goals.css";

export function Goals({ goals = [] }: { goals: Goal[] }) {
  const [slug, setSlug] = useState<string>();
  const grouped = useMemo(() => groupGoals(goals), [goals]);
  const all = Object.values(grouped).flat();
  const i = all.findIndex((g) => g.slug === slug);
  const g = all[i];
  const n = all[i + 1];
  const p = all[i - 1];
  const goPrev = useMemo(() => (p ? () => setSlug(p.slug) : undefined), [p]);
  const goNext = useMemo(() => (n ? () => setSlug(n.slug) : undefined), [n]);
  const close = () => setSlug(undefined);

  useEffect(() => {
    const handler = (e: { key: string }) => {
      if (e.key === "ArrowLeft") return goPrev?.();
      if (e.key === "ArrowRight") return goNext?.();
      if (e.key === "Escape") return close();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [goNext, goPrev]);

  return (
    <div class="goals">
      {g && <Detail g={g} goPrev={goPrev} goNext={goNext} close={close} />}
      {all.map((g) => (
        <G key={g.slug} g={g} onClick={() => setSlug(g.slug)} />
      ))}
    </div>
  );
}
