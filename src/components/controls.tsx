import { Goal } from "../bm";
import "./goal.css";
import { createDatapoint, refreshGraph } from "../bm";
import { API_KEY } from "../auth";
import { useMutation } from "@tanstack/react-query";
import { useState, useRef, useEffect } from "preact/hooks";

export default function Controls({
  g,
  onMutate: onSuccess,
}: {
  g: Goal;
  onMutate: () => void;
}) {
  const [value, setValue] = useState("");

  const { mutate, isLoading } = useMutation(
    (value: number) => createDatapoint(API_KEY, g.slug, value),
    { onSuccess }
  );

  const { mutate: refresh, isLoading: isRefreshing } = useMutation(
    () => refreshGraph(API_KEY, g.slug),
    { onSuccess }
  );

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
