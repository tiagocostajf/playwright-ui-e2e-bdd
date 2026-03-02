import { defineConfig, devices } from "@playwright/test";
import { AUTH_FILE } from "./utils/auth-state";

export default defineConfig({
  testDir: "./e2e",
  timeout: 30_000,
  expect: { timeout: 10_000 },

  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 2 : 1,

  metadata: {
    project: "Automation Exercise – E2E",
    environment: process.env.BASE_URL || "https://automationexercise.com",
    team: "QA",
  },

  reporter: [["html", { open: "never" }], ["list"]],

  use: {
    baseURL: process.env.BASE_URL || "https://automationexercise.com",
    screenshot: "on",
    video: "retain-on-failure",
    trace: "retain-on-failure",
    actionTimeout: 10_000,
    navigationTimeout: 15_000,
  },

  projects: [
    {
      name: "setup",
      testDir: "./support",
      testMatch: /auth\.setup\.ts/,
    },
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
      testIgnore: /\.logged-in\.spec\.ts/,
    },
    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
      testIgnore: /\.logged-in\.spec\.ts/,
    },
    {
      name: "logged-in-chromium",
      use: { ...devices["Desktop Chrome"], storageState: AUTH_FILE },
      testMatch: /\.logged-in\.spec\.ts/,
      dependencies: ["setup"],
    },
    {
      name: "logged-in-firefox",
      use: { ...devices["Desktop Firefox"], storageState: AUTH_FILE },
      testMatch: /\.logged-in\.spec\.ts/,
      dependencies: ["setup"],
    },
  ],
});
