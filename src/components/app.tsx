import { QueryClientProvider } from "@tanstack/react-query";
import { Goal } from "../services/beeminder";
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
import Tags from "./tags";
import useDarkMode from "../useDarkMode";

function _App() {
  const [filter, setFilter] = useState("");
  const [tag, setTag] = useState("");
  const { data } = useGoals();
  const isDark = useDarkMode();

  if (!API_KEY) return <Login />;
  if (data === undefined) return <Center>Loading...</Center>;

  const r = new RegExp(filter, "i");
  const filtered = data.filter((g: Goal) => {
    if (tag.length && !g.tags.includes(tag)) return false;
    if (filter && !r.test(g.slug)) return false;
    return true;
  });

  return (
    <div class={`app__base ${isDark ? "app__dark" : ""}`}>
      <div>
        <Header search={filter} setSearch={setFilter} />
      </div>
      <div class="app__content">
        <Goals goals={filtered} />
      </div>
      <Footer />
    </div>
  );
}

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <_App />
    </QueryClientProvider>
  );
}
