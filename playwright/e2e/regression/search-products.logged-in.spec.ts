import { test } from "../../fixtures/pages.fixture";
import { TC_09_6_SEARCH_EXISTING_LOGGED_IN } from "../../utils/test-case-ids";

test.describe("Search Products (Logged In) @regression", () => {
  test(`${TC_09_6_SEARCH_EXISTING_LOGGED_IN}: Search existing product while logged in`, async ({
    productsPage,
  }) => {
    let productName: string;

    await test.step("Given I am logged in and navigate to the Home page", async () => {
      await productsPage.openHome();
    });

    await test.step("And I verify I am logged in", async () => {
      await productsPage.assertLoggedIn();
    });

    await test.step("When I navigate to the Products page", async () => {
      await productsPage.navigateToProducts();
    });

    await test.step("Then I should be on the ALL PRODUCTS page", async () => {
      await productsPage.assertProductsListVisible();
    });

    await test.step("And I capture the name of the first visible product", async () => {
      productName = await productsPage.getFirstProductName();
    });

    await test.step("When I search for the captured product name", async () => {
      await productsPage.searchProducts(productName!);
    });

    await test.step("Then 'Searched Products' heading should be visible", async () => {
      await productsPage.assertSearchedProductsHeadingVisible();
    });

    await test.step("And the searched product should appear in the results", async () => {
      await productsPage.assertSearchResultsVisible();
      await productsPage.assertSearchedProductVisible(productName!);
    });
  });
});
