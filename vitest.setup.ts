import "vitest-dom/extend-expect";
import * as domMatchers from "vitest-dom/matchers";
import { expect } from "vitest";

expect.extend(domMatchers);
