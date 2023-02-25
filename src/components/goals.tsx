import { useState, useMemo, useEffect } from "preact/hooks";
import { Goal } from "../bm";
import groupGoals from "../groupGoals";
import Detail from "./detail";
import G from "./goal";
import "./goals.css";

export function Goals({ goals = [] }: { goals: Goal[] }) {
  const [slug, setSlug] = useState<string>();
  const all = Object.values(groupGoals(goals)).flat();
  const i = all.findIndex((g) => g.slug === slug);
  const g = all[i];
  const goPrev = useMemo(() => {
    return i > 0 ? () => setSlug(all[i - 1].slug) : undefined;
  }, [all, i]);
  const goNext = useMemo(() => {
    return i < all.length - 1 ? () => setSlug(all[i + 1].slug) : undefined;
  }, [all, i]);
  const close = () => setSlug(undefined);

  useEffect(() => {
    const handler = (e: { key: string }) => {
      switch (e.key) {
        case "ArrowLeft":
          goPrev?.();
          break;
        case "ArrowRight":
          goNext?.();
          break;
        case "Escape":
          close();
          break;
      }
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
