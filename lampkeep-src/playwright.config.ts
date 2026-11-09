import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "tests/e2e",
  timeout: 90_000,
  expect: { timeout: 15_000 },
  fullyParallel: false,
  retries: 0,
  use: {
    baseURL: "http://127.0.0.1:4173",
    channel: "chrome",
    trace: "off",
    launchOptions: {
      args: ["--use-gl=angle", "--ignore-gpu-blocklist", "--enable-webgl"],
    },
  },
  webServer: {
    command: "python3 -m http.server 4173 --bind 127.0.0.1 --directory ..",
    port: 4173,
    reuseExistingServer: true,
    timeout: 20_000,
  },
});
