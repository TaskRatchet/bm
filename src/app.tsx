import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { getGoals } from "./bm";
import "./app.css";
import { Table } from "./table";
import { useIsFetching } from "@tanstack/react-query";

const clientId = import.meta.env.VITE_BM_CLIENT_ID;
const redirectUri = import.meta.env.VITE_BM_REDIRECT_URI;
const authUrl = `https://www.beeminder.com/apps/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=token`;
const queryClient = new QueryClient();
const params = new URLSearchParams(location.search);
const accessToken = params.get("access_token") || "";

export type Goal = Record<string, unknown>;

function _App() {
  const isFetching = useIsFetching();
  const { data = [] } = useQuery(["goals"], () => getGoals(accessToken), {
    enabled: !!accessToken,
  });

  if (!accessToken) return <a href={authUrl}>Login with Beeminder</a>;

  const today = data.filter((g: Goal) => g.safebuf === 0);
  const next = data.filter((g: Goal) => g.safebuf !== 0 && !g.todayta);
  const later = data.filter((g: Goal) => g.safebuf !== 0 && g.todayta);

  return (
    <>
      {isFetching ? <div class="loading">Loading...</div> : ""}

      <h1>Today</h1>
      <Table goals={today} />

      <h1>Next</h1>
      <Table goals={next} />

      <h1>Later</h1>
      <Table goals={later} />

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
