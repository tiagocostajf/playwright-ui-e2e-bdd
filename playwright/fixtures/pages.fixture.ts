import { test as base } from "@playwright/test";
import { RegisterPage } from "../pages/RegisterPage";
import { ProductsPage } from "../pages/ProductsPage";
import { TestCasesPage } from "../pages/TestCasesPage";
import { ContactUsPage } from "../pages/ContactUsPage";

type PageFixtures = {
  registerPage: RegisterPage;
  productsPage: ProductsPage;
  testCasesPage: TestCasesPage;
  contactUsPage: ContactUsPage;
};

export const test = base.extend<PageFixtures>({
  registerPage: async ({ page }, use) => {
    await use(new RegisterPage(page));
  },
  productsPage: async ({ page }, use) => {
    await use(new ProductsPage(page));
  },
  testCasesPage: async ({ page }, use) => {
    await use(new TestCasesPage(page));
  },
  contactUsPage: async ({ page }, use) => {
    await use(new ContactUsPage(page));
  },
});

export { expect } from "@playwright/test";
