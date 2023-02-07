import { Goal } from "./app";
import "./goal.css";
import { createDatapoint, refreshGraph } from "./bm";
import { ACCESS_TOKEN } from "./auth";

export default function Controls({
  g,
  onMutate,
}: {
  g: Goal;
  onMutate: () => void;
}) {
  if (g.autodata) {
    return (
      <button
        class="icon-button"
        onClick={() => refreshGraph(ACCESS_TOKEN, g.slug).then(onMutate)}
      >
        🔄
      </button>
    );
  }

  return (
    <form
      class="controls pure-form"
      onSubmit={(e) => {
        e.preventDefault();
        const value = e.currentTarget.value.value;
        createDatapoint(ACCESS_TOKEN, g.slug, value).then(onMutate);
      }}
    >
      <input class="value-input" name="value" id="value" type="number" />
      <input class="icon-button" type="submit" value="✅" />
    </form>
  );
}
