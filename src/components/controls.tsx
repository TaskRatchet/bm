import { Goal } from "../bm";
import "./goal.css";
import { createDatapoint, refreshGraph } from "../bm";
import { API_KEY } from "../auth";
import { useMutation } from "@tanstack/react-query";
import queryClient from "../queryClient";

async function queued(slug: string, mutate: () => Promise<unknown>) {
  const cached = queryClient.getQueryData<Goal[]>(["goals"]);
  if (!cached) return;
  const index = cached.findIndex((x) => x.slug === slug);
  if (index === -1) return;
  cached[index] = {
    ...cached[index],
    queued: true,
  };
  queryClient.setQueryData(["goals"], cached);
  const result = await mutate();
  queryClient.invalidateQueries(["goals"]);
  return result;
}

export default function Controls({ g }: { g: Goal }) {
  const { mutate, isLoading } = useMutation((value: number) =>
    queued(g.slug, () => createDatapoint(API_KEY, g.slug, value))
  );

  const { mutate: refresh, isLoading: isRefreshing } = useMutation(() =>
    queued(g.slug, () => refreshGraph(API_KEY, g.slug))
  );

  const spinit = isLoading || isRefreshing || g.queued;
  const icon = g.autodata ? "🔃" : "➕";

  return (
    <button
      class={`icon-button ${spinit && "spin"}`}
      onClick={(e: any) => {
        e.stopPropagation();
        if (g.autodata) return refresh();
        const value = prompt(`Enter a number for goal "${g.slug}":`);
        if (!value) return;
        mutate(parseInt(value));
      }}
    >
      {icon}
    </button>
  );
}
