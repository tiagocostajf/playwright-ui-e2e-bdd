import { test } from "../../fixtures/pages.fixture";

test.describe("Products - Smoke", () => {
  test(
    "Given I am on the Home page, " +
      "When I navigate to Products, " +
      "Then I should see the product list and product details @smoke",
    async ({ productsPage }) => {
      await test.step("Given I launch the browser and navigate to the Home page", async () => {
        await productsPage.openHome();
      });

      await test.step("When I click on the Products button", async () => {
        await productsPage.navigateToProducts();
      });

      await test.step("Then I should be on the ALL PRODUCTS page", async () => {
        await productsPage.assertProductsListVisible();
      });

      await test.step("When I click View Product on the first product", async () => {
        await productsPage.viewFirstProduct();
      });

      await test.step("Then I should see all product detail fields", async () => {
        await productsPage.assertProductDetailVisible();
      });
    },
  );
});
