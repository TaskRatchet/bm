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
import Tags from "./tags";

function _App() {
  const [filter, setFilter] = useState("");
  const { data } = useGoals();

  if (!API_KEY) return <Login />;
  if (data === undefined) return <Center>Loading...</Center>;

  const r = new RegExp(filter, "i");
  const filtered = data.filter((g: Goal) => g.slug.match(r));

  return (
    <>
      <div>
        <Header search={filter} setSearch={setFilter} />
        <Tags />
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
