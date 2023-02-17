import { getGoal, Goal } from "../bm";
import "./goal.css";
import { createDatapoint, refreshGraph } from "../bm";
import { API_KEY } from "../auth";
import { useMutation } from "@tanstack/react-query";
import { useState, useRef, useEffect } from "preact/hooks";
import queryClient from "../queryClient";

function updateCache(slug: string) {
  const cached = queryClient.getQueryData<Goal[]>(["goals"]);
  if (!cached) return;
  const index = cached.findIndex((x) => x.slug === slug);
  if (index === -1) return;
  cached[index] = {
    ...cached[index],
    queued: true,
  };
  queryClient.setQueryData(["goals"], cached);
}

export default function Controls({ g }: { g: Goal }) {
  const [value, setValue] = useState("");

  const { mutate, isLoading } = useMutation((value: number) => {
    updateCache(g.slug);
    return createDatapoint(API_KEY, g.slug, value);
  });

  const { mutate: refresh, isLoading: isRefreshing } = useMutation(() => {
    updateCache(g.slug);
    return refreshGraph(API_KEY, g.slug);
  });

  const spinit = isLoading || isRefreshing || g.queued;

  if (g.autodata) {
    return (
      <button
        class={`icon-button ${spinit && "spin"}`}
        onClick={(e: any) => {
          e.stopPropagation();
          refresh();
        }}
      >
        🔃
      </button>
    );
  }

  return (
    <form
      class="controls pure-form"
      onSubmit={(e) => {
        e.preventDefault();
        if (value === "") return;
        mutate(Number(value));
        setValue("");
      }}
      onClick={(e: any) => e.stopPropagation()}
    >
      <input
        class="value-input"
        name="value"
        id="value"
        type="number"
        value={value}
        onChange={(e: any) => setValue(e.target.value)}
      />
      <input
        class={`icon-button ${spinit && "spin"}`}
        type="submit"
        value="✅"
      />
    </form>
  );
}
