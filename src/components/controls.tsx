import "./goal.css";
import { createDatapoint, refreshGraph, Goal } from "../bm";
import { useMutation } from "@tanstack/react-query";
import queryClient from "../queryClient";
import cnx from "../cnx";

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
  const isLoading = create.isLoading || refresh.isLoading || g.queued;

  const onClick = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    if (g.autodata) return refresh.mutate();
    const value = prompt(`Enter a number for goal "${g.slug}":`);
    if (!value) return;
    create.mutate(Number(value));
  };

  return (
    <button
      class={cnx("icon-button", isLoading && "spin")}
      onClick={onClick}
      title={g.autodata ? "Refresh" : "Add datapoint"}
    >
      {g.autodata ? "🔃" : "➕"}
    </button>
  );
}
