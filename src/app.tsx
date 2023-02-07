import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { getGoals } from "./bm";
import "./app.css";
import { Table } from "./table";
import { useIsFetching } from "@tanstack/react-query";
import { useState } from "preact/hooks";
import { ACCESS_TOKEN, logOut } from "./auth";

const clientId = import.meta.env.VITE_BM_CLIENT_ID;
const redirectUri = import.meta.env.VITE_BM_REDIRECT_URI;
const authUrl = `https://www.beeminder.com/apps/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=token`;
const queryClient = new QueryClient();

export type Goal = {
  slug: string;
  losedate: number;
  autodata?: string;
  safebuf: number;
  todayta: boolean;
  limsum: string;
  title: string;
};

function _App() {
  const isFetching = useIsFetching();
  const [search, setSearch] = useState("");
  const [int, setInt] = useState(1);
  const { data = [] } = useQuery(
    ["goals"],
    () => {
      console.log("refetched after", int, "seconds");
      setInt(Math.min(int * 2, 60));
      return getGoals(ACCESS_TOKEN);
    },
    {
      enabled: !!ACCESS_TOKEN,
      refetchInterval: () => int * 1000,
      refetchIntervalInBackground: false,
    }
  );

  if (!ACCESS_TOKEN)
    return (
      <a class="login" href={authUrl}>
        Login with Beeminder
      </a>
    );

  const filtered = data.filter((g: Goal) => g.slug.includes(search));
  const today = filtered.filter((g: Goal) => g.safebuf === 0);
  const next = filtered.filter((g: Goal) => g.safebuf !== 0 && !g.todayta);
  const later = filtered.filter((g: Goal) => g.safebuf !== 0 && g.todayta);

  return (
    <>
      {isFetching ? <div class="loading">Loading...</div> : ""}

      <input
        class="filter"
        type="text"
        placeholder="filter"
        value={search}
        onChange={(e: any) => setSearch(e.target.value)}
      />

      <h1>Today</h1>
      <Table goals={today} onMutate={() => setInt(1)} />

      <h1>Next</h1>
      <Table goals={next} onMutate={() => setInt(1)} />

      <h1>Later</h1>
      <Table goals={later} onMutate={() => setInt(1)} />

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
          <button onClick={logOut}>Logout</button>
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
