import { useIsFetching } from "@tanstack/react-query";
import { logout } from "../auth";
import queryClient from "../queryClient";
import "./header.css";

type Item = {
  name: string;
  icon: string;
  getClasses?: (isFetching: number) => string;
};

type ItemLink = Item & {
  url: string;
};

type ItemButton = Item & {
  onClick: () => void;
};

const items: (ItemLink | ItemButton)[] = [
  {
    name: "Add goal",
    icon: "➕",
    url: "https://beeminder.com/new",
    getClasses: () => "invert",
  },
  {
    name: "Add breaks",
    icon: "🏖️",
    onClick: () => {
      const start = window.prompt("Start date (YYYY-MM-DD)") || "";
      const finish = window.prompt("Finish date (YYYY-MM-DD)") || "";
      const url = `https://beeminder.com/breaks?start=${start}&finish=${finish}`;
      window.open(url);
    },
  },
  {
    name: "Account settings",
    icon: "⚙️",
    url: "https://beeminder.com/settings/account",
  },
  {
    name: "Blog",
    icon: "🗞️",
    url: "https://blog.beeminder.com/",
  },
  {
    name: "Docs",
    icon: "❓",
    url: "https://help.beeminder.com/",
  },
  {
    name: "Premium",
    icon: "💎",
    url: "https://www.beeminder.com/premium",
  },
  {
    name: "Logout",
    icon: "🚪",
    onClick: logout,
  },
  {
    name: "Refresh",
    icon: "🔃",
    onClick: () => void queryClient.refetchQueries(),
    getClasses: (isFetching) => (isFetching ? "spin" : ""),
  },
];

export default function Header({
  search,
  setSearch,
}: {
  search: string;
  setSearch: (s: string) => void;
}) {
  const isFetching = useIsFetching();

  return (
    <div class="main-header">
      <div class="global-controls">
        <span class="filter">
          <input
            type="text"
            placeholder="filter"
            value={search}
            onChange={(e) => setSearch(e.currentTarget.value)}
          />
          <button class="icon-button" onClick={() => setSearch("")}>
            ❌
          </button>
        </span>

        <span class="buttons">
          {items.map((item) => {
            const props = {
              key: item.name,
              class: `icon-button ${item.getClasses?.(isFetching) || ""}`,
              title: item.name,
            };
            return "url" in item ? (
              <a href={item.url} {...props}>
                {item.icon}
              </a>
            ) : (
              <button onClick={item.onClick} {...props}>
                {item.icon}
              </button>
            );
          })}
        </span>
      </div>
    </div>
  );
}
