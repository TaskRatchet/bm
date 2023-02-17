import { QueryClientProvider } from "@tanstack/react-query";
import { Goal } from "../bm";
import "./app.css";
import { Goals } from "./goals";
import { useIsFetching } from "@tanstack/react-query";
import { useState } from "preact/hooks";
import { API_KEY, logout } from "../auth";
import Colors from "./colors";
import Time from "./time";
import useGoals from "../useGoals";
import Login from "./login";
import queryClient from "../queryClient";

function _App() {
  const isFetching = useIsFetching();
  const [search, setSearch] = useState("");
  const { data = [], refetch } = useGoals();

  if (!API_KEY) return <Login />;

  const r = new RegExp(search, "i");
  const filtered = data.filter((g: Goal) => g.slug.match(r));
  const today = filtered.filter((g: Goal) => g.safebuf === 0);
  const next = filtered.filter((g: Goal) => g.safebuf !== 0 && !g.todayta);
  const later = filtered.filter((g: Goal) => g.safebuf !== 0 && g.todayta);

  return (
    <>
      <Colors goals={data} />

      <Time goals={data} />

      <div class="global-controls">
        <input
          type="text"
          placeholder="filter"
          value={search}
          onChange={(e: any) => setSearch(e.target.value)}
        />

        <button
          class={`icon-button ${isFetching && "spin"}`}
          onClick={() => refetch()}
        >
          🔃
        </button>
      </div>

      <h1>Today</h1>
      <Goals goals={today} />

      <h1>Next</h1>
      <Goals goals={next} />

      <h1>Later</h1>
      <Goals goals={later} />

      <small class="footer">
        <span>
          Made by{" "}
          <a href="https://nathanarthur.com/" target="_blank">
            Narthur
          </a>
          .{" "}
          <a href="https://github.com/TaskRatchet/bm" target="_blank">
            View source
          </a>
          . See also:{" "}
          <a href="https://taskratchet.com" target="_blank">
            TaskRatchet
          </a>
        </span>
        <span>
          <button onClick={logout}>Logout</button>
        </span>
      </small>
    </>
  );
}

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <_App />
    </QueryClientProvider>
  );
}
