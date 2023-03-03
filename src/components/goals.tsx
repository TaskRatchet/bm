import { useState, useMemo, useEffect } from "preact/hooks";
import { Goal } from "../bm";
import groupGoals from "../groupGoals";
import Detail from "./detail";
import G from "./goal";
import "./goals.css";
import Modal from "./modal";

export function Goals({ goals }: { goals: Goal[] }) {
  const [slug, setSlug] = useState<string>();
  const g = useMemo(() => groupGoals(goals), [goals]);
  const a = Object.values(g).flat();
  const i = a.findIndex((g) => g.slug === slug);
  const c = a[i];
  const n = a[i + 1];
  const p = a[i - 1];
  const goPrev = useMemo(() => (p ? () => setSlug(p.slug) : undefined), [p]);
  const goNext = useMemo(() => (n ? () => setSlug(n.slug) : undefined), [n]);
  const close = () => setSlug(undefined);

  useEffect(() => {
    const fn = (e: { key: string }) => {
      if (e.key === "ArrowLeft") return goPrev?.();
      if (e.key === "ArrowRight") return goNext?.();
      if (e.key === "Escape") return close();
    };
    document.addEventListener("keydown", fn);
    return () => document.removeEventListener("keydown", fn);
  }, [goNext, goPrev]);

  return (
    <div class="goals">
      <div class="goals__grid goals__limits">
        {g.limits.map((g) => (
          <G key={g.slug} g={g} onClick={() => setSlug(g.slug)} />
        ))}
      </div>
      <div class="goals__grid">
        {[...g.today, ...g.next].map((g) => (
          <G key={g.slug} g={g} onClick={() => setSlug(g.slug)} />
        ))}
      </div>
      <div class="goals__grid">
        {g.later.map((g) => (
          <G key={g.slug} g={g} onClick={() => setSlug(g.slug)} />
        ))}
      </div>
      {
        <Modal open={!!slug} onClose={close}>
          <Detail g={c} goPrev={goPrev} goNext={goNext} close={close} />
        </Modal>
      }
    </div>
  );
}
