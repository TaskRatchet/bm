import "./goal.css";
import { createDatapoint, refreshGraph, Goal } from "../bm";
import { useMutation } from "@tanstack/react-query";
import queryClient from "../queryClient";
import cnx from "../cnx";
import { useState } from "preact/hooks";
import "./controls.css";

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

export default function Controls({
  g,
  refreshOnly,
}: {
  g: Goal;
  refreshOnly?: boolean;
}) {
  const [value, setValue] = useState<string>("");
  const c = useMutation(
    (v: number) => q(g.slug, () => createDatapoint(g.slug, v)),
    {
      onSuccess: () => setValue(""),
    }
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
    const v = Number(value);
    if (Number.isFinite(v)) c.mutate(v);
  };

  if (refreshOnly && !g.autodata) return null;

  return (
    <span class="controls">
      {!g.autodata && (
        <input
          value={value}
          onChange={(e) => setValue(e.currentTarget.value)}
        />
      )}
      <button
        class={cnx("icon-button", isLoading && "spin")}
        onClick={onClick}
        title={tooltip}
      >
        {icon}
      </button>
    </span>
  );
}
