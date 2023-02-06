import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { getGoals } from "./bm";
import "./app.css";
import { Table } from "./table";
import { useIsFetching } from "@tanstack/react-query";
import { useState, useCallback } from "preact/hooks";

const clientId = import.meta.env.VITE_BM_CLIENT_ID;
const redirectUri = import.meta.env.VITE_BM_REDIRECT_URI;
const authUrl = `https://www.beeminder.com/apps/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=token`;
const queryClient = new QueryClient();
const params = new URLSearchParams(location.search);
const accessToken = params.get("access_token") || "";

export type Goal = Record<string, unknown>;

function _App() {
  const isFetching = useIsFetching();
  const [int, setInt] = useState(1);
  const { data = [] } = useQuery(
    ["goals"],
    () => {
      console.log("refetched after", int, "seconds");
      setInt(Math.min(int * 2, 60));
      return getGoals(accessToken);
    },
    {
      enabled: !!accessToken,
      refetchInterval: () => int * 1000,
      refetchIntervalInBackground: false,
    }
  );

  if (!accessToken) return <a href={authUrl}>Login with Beeminder</a>;

  const today = data.filter((g: Goal) => g.safebuf === 0);
  const next = data.filter((g: Goal) => g.safebuf !== 0 && !g.todayta);
  const later = data.filter((g: Goal) => g.safebuf !== 0 && g.todayta);

  return (
    <>
      {isFetching ? <div class="loading">Loading...</div> : ""}

      <h1>Today</h1>
      <Table goals={today} onMutate={() => setInt(1)} />

      <h1>Next</h1>
      <Table goals={next} onMutate={() => setInt(1)} />

      <h1>Later</h1>
      <Table goals={later} onMutate={() => setInt(1)} />

      <br />
      <small>
        Made by <a href="https://nathanarthur.com/">Narthur</a>. See also:{" "}
        <a href="https://taskratchet.com">TaskRatchet</a>
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
