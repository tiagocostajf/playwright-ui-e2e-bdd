import { test } from "../../fixtures/pages.fixture";
import { TC_08_PRODUCTS_VIEW_LIST_AND_DETAILS } from "../../utils/test-case-ids";

test.describe("Products @smoke", () => {
  test(`${TC_08_PRODUCTS_VIEW_LIST_AND_DETAILS}: View product list and details`, async ({
    productsPage,
  }) => {
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
  });
});
