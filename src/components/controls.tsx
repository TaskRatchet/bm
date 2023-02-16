import { Goal } from "../bm";
import "./goal.css";
import { createDatapoint, refreshGraph } from "../bm";
import { API_KEY } from "../auth";
import { useMutation } from "@tanstack/react-query";

export default function Controls({
  g,
  onMutate,
}: {
  g: Goal;
  onMutate: () => void;
}) {
  const { mutate, isLoading } = useMutation(
    (value: number) => createDatapoint(API_KEY, g.slug, value),
    {
      onSuccess: onMutate,
    }
  );

  const { mutate: refresh, isLoading: isRefreshing } = useMutation(
    () => refreshGraph(API_KEY, g.slug),
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
