import { render } from "preact";
import { App } from "./components/app";
import "./index.css";
import { RouterProvider, Router, RootRoute } from "@tanstack/react-router";

const rootRoute = new RootRoute({
  component: App,
});
const routeTree = rootRoute.addChildren([]);
const router = new Router({ routeTree });
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

render(
  <RouterProvider router={router} />,
  document.getElementById("app") as HTMLElement
);
