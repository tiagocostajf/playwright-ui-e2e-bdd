import { test as base } from "@playwright/test";
import { RegisterPage } from "../pages/RegisterPage";

type PageFixtures = {
  registerPage: RegisterPage;
};

export const test = base.extend<PageFixtures>({
  registerPage: async ({ page }, use) => {
    await use(new RegisterPage(page));
  },
});

export { expect } from "@playwright/test";
