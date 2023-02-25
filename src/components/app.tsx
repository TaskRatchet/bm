import { QueryClientProvider } from "@tanstack/react-query";
import { Goal } from "../bm";
import "./app.css";
import { Goals } from "./goals";
import { useState } from "preact/hooks";
import { API_KEY } from "../auth";
import useGoals from "../useGoals";
import Login from "./login";
import queryClient from "../queryClient";
import Footer from "./footer";
import Header from "./header";
import Center from "./center";

function getTags(data: Goal[]) {
  const all = data.reduce((acc: string[], g: Goal) => {
    return [...acc, ...g.tags];
  }, []);

  return [...new Set(all)];
}

function _App() {
  const [filter, setFilter] = useState("");
  const { data = [] } = useGoals();

  if (!API_KEY) return <Login />;

  if (data === undefined) return <Center>Loading...</Center>;

  const r = new RegExp(filter, "i");
  const filtered = data.filter((g: Goal) => g.slug.match(r));
  const tags = getTags(data);

  return (
    <>
      <div>
        <Header search={filter} setSearch={setFilter} />
        <ul class="tags">
          {tags.map((t) => (
            <li key={t}>#{t}</li>
          ))}
        </ul>
        <div class="content">
          <Goals goals={filtered} />
        </div>
      </div>
      <Footer />
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
