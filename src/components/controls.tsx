import "./goal.css";
import { createDatapoint, refreshGraph, Goal } from "../bm";
import { useMutation } from "@tanstack/react-query";
import queryClient from "../queryClient";
import cnx from "../cnx";

async function q(slug: string, mutate: () => Promise<unknown>) {
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

function getErrorMessage(error: unknown) {
  if (typeof error === "string") return error;
  if (error instanceof Error) return error.message;
  return JSON.stringify(error);
}

export default function Controls({ g }: { g: Goal }) {
  const c = useMutation((v: number) =>
    q(g.slug, () => createDatapoint(g.slug, v))
  );
  const r = useMutation(() => q(g.slug, () => refreshGraph(g.slug)));
  const isLoading = c.isLoading || r.isLoading || g.queued;
  const isError = c.isError || r.isError;
  const icon = isError ? "⚠️" : g.autodata ? "🔃" : "➕";
  const tooltip = isError
    ? getErrorMessage(c.error || r.error)
    : g.autodata
    ? "Refresh"
    : "Add datapoint";

  const onClick = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    if (g.autodata) return r.mutate();
    const value = prompt(`Enter a number for goal "${g.slug}":`);
    if (!value) return;
    c.mutate(Number(value));
  };

  return (
    <button
      class={cnx("icon-button", isLoading && "spin")}
      onClick={onClick}
      title={tooltip}
    >
      {icon}
    </button>
  );
}
