import "./goal.css";
import { createDatapoint, refreshGraph, Goal } from "../bm";
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
  await queryClient.invalidateQueries(["goals"]);
  return result;
}

export default function Controls({ g }: { g: Goal }) {
  const create = useMutation((value: number) =>
    queued(g.slug, () => createDatapoint(g.slug, value))
  );
  const refresh = useMutation(() => queued(g.slug, () => refreshGraph(g.slug)));
  const spinit = create.isLoading || refresh.isLoading || g.queued;
  const icon = g.autodata ? "🔃" : "➕";
  const tooltip = g.autodata ? "Refresh" : "Add datapoint";

  return (
    <button
      class={`icon-button ${(spinit && "spin") || ""}`}
      onClick={(e) => {
        e.stopPropagation();
        if (g.autodata) return refresh.mutate();
        const value = prompt(`Enter a number for goal "${g.slug}":`);
        if (!value) return;
        create.mutate(Number(value));
      }}
      title={tooltip}
    >
      {icon}
    </button>
  );
}
