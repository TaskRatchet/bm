import { Goal } from "./app";
import "./goal.css";
import { createDatapoint, refreshGraph } from "./bm";
import { ACCESS_TOKEN } from "./auth";
import { useMutation } from "@tanstack/react-query";

export default function Controls({
  g,
  onMutate,
}: {
  g: Goal;
  onMutate: () => void;
}) {
  const { mutate, isLoading } = useMutation(
    (value: number) => createDatapoint(ACCESS_TOKEN, g.slug, value),
    {
      onSuccess: onMutate,
    }
  );

  const { mutate: refresh, isLoading: isRefreshing } = useMutation(
    () => refreshGraph(ACCESS_TOKEN, g.slug),
    {
      onSuccess: onMutate,
    }
  );

  if (g.autodata) {
    return (
      <button
        class={`icon-button ${isRefreshing && "spin"}`}
        onClick={() => refresh()}
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
        const value = Number(e.currentTarget.value.value);
        mutate(value);
      }}
    >
      <input class="value-input" name="value" id="value" type="number" />
      <input
        class={`icon-button ${isLoading && "spin"}`}
        type="submit"
        value="✅"
      />
    </form>
  );
}
