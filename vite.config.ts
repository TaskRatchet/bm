import { defineConfig } from "vitest/config";
import preact from "@preact/preset-vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  define: {
    "import.meta.vitest": "undefined",
  },
  plugins: [
    preact(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        // Pinned, not inherited. vite-plugin-pwa 1.x injects a default
        // theme_color of #42b883 (Vue's brand green) when the caller sets no
        // manifest, which landed in the built manifest.webmanifest on the 0.14
        // -> 1.3 upgrade and would tint the status bar of every installed PWA.
        // #333 is --bg from .app__dark in components/app.css, which app.tsx
        // applies unconditionally — bm is always dark.
        theme_color: "#333333",
      },
    }),
  ],
  server: {
    port: 5174,
  },
  test: {
    environment: "happy-dom",
    setupFiles: ["./vitest.setup.ts"],
    includeSource: ["src/**/*.spec.{ts,tsx}"],
    coverage: {
      reporter: ["text-summary", "text"],
    },
    mockReset: true,
    restoreMocks: true,
  },
});
