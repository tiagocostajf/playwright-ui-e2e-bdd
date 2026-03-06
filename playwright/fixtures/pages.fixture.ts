import { test as base } from "@playwright/test";
import { RegisterPage } from "../pages/RegisterPage";
import { ProductsPage } from "../pages/ProductsPage";
import { TestCasesPage } from "../pages/TestCasesPage";
import { ContactUsPage } from "../pages/ContactUsPage";
import { HomePage } from "../pages/HomePage";
import { CartPage } from "../pages/CartPage";

type PageFixtures = {
  registerPage: RegisterPage;
  productsPage: ProductsPage;
  testCasesPage: TestCasesPage;
  contactUsPage: ContactUsPage;
  homePage: HomePage;
  cartPage: CartPage;
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
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },
});

export { expect } from "@playwright/test";
