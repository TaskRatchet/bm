import { App } from "./app";
import { render } from "@testing-library/preact";
import { describe, it, expect } from "vitest";

describe("App", () => {
  it("renders", () => {
    const { getByText } = render(<App />);

    expect(getByText("Vite + Preact")).toBeDefined();
  });
});
