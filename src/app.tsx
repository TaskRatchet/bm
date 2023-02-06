import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { getGoals, refreshGraph, createDatapoint } from "./bm";
import "./app.css";
import { Table } from "./table";

const clientId = import.meta.env.VITE_BM_CLIENT_ID;
const redirectUri = "http://localhost:5174/";
const authUrl = `https://www.beeminder.com/apps/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=token`;
const queryClient = new QueryClient();
const params = new URLSearchParams(location.search);
const accessToken = params.get("access_token") || "";
const headers = ["slug", "limsumdays", "title"];

export type Goal = Record<string, unknown>;

function _App() {
  const { data } = useQuery(["goals"], () => getGoals(accessToken), {
    enabled: !!accessToken,
  });

  if (!accessToken) return <a href={authUrl}>Login with Beeminder</a>;
  if (!data?.length) return <div>Loading...</div>;

  console.log({ data });

  const today = data.filter((g: Goal) => g.safebuf === 0);
  const next = data.filter((g: Goal) => g.safebuf !== 0 && !g.todayta);
  const later = data.filter((g: Goal) => g.safebuf !== 0 && g.todayta);

  return (
    <>
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
