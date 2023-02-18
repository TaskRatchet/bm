import { useIsFetching } from "@tanstack/react-query";
import { logout } from "../auth";
import useGoals from "../useGoals";
import Colors from "./colors";
import Time from "./time";

export default function Header({
  search,
  setSearch,
}: {
  search: string;
  setSearch: (s: string) => void;
}) {
  const { data = [], refetch } = useGoals();
  const isFetching = useIsFetching();

  return (
    <>
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
    </>
  );
}
