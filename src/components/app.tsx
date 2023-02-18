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

  return (
    <>
      <div>
        <Colors goals={data} />

        <Time goals={data} />

        <div class="global-controls">
          <span class="filter">
            <input
              type="text"
              placeholder="filter"
              value={search}
              onChange={(e: any) => setSearch(e.target.value)}
            />
            <button class="icon-button" onClick={() => setSearch("")}>
              ❌
            </button>
          </span>

          <span class="buttons">
            <a
              class="icon-button"
              href="https://beeminder.com/new"
              title="Add goal"
            >
              ➕
            </a>
            <button
              class="icon-button"
              onClick={() => {
                const start = window.prompt("Start date (YYYY-MM-DD)");
                const finish = window.prompt("Finish date (YYYY-MM-DD)");
                const url = `https://beeminder.com/breaks?start=${start}&finish=${finish}`;
                window.open(url);
              }}
              title="Add breaks"
            >
              🏖️
            </button>
            <a
              class="icon-button"
              href="https://beeminder.com/settings/account"
              title="Account settings"
            >
              ⚙️
            </a>
            <a
              class="icon-button"
              href="https://help.beeminder.com/"
              title="Docs"
            >
              ❓
            </a>
            <a
              class="icon-button"
              href="https://www.beeminder.com/premium"
              title="Premium"
            >
              💎
            </a>
            <button class="icon-button" onClick={logout} title="Logout">
              🚪
            </button>
            <button
              class={`icon-button ${isFetching && "spin"}`}
              onClick={() => refetch()}
              title="Refresh"
            >
              🔃
            </button>
          </span>
        </div>
        <Goals goals={filtered} />
      </div>

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
