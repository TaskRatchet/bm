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

function _App() {
  const [search, setSearch] = useState("");
  const { data } = useGoals();

  if (!API_KEY) return <Login />;

  if (data === undefined) return <Center>Loading...</Center>;

  const r = new RegExp(search, "i");
  const filtered = data.filter((g: Goal) => g.slug.match(r));

  console.log({
    data,
    API_KEY,
  });

  return (
    <>
      <div>
        <Header search={search} setSearch={setSearch} />
        <Goals goals={filtered} />
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
