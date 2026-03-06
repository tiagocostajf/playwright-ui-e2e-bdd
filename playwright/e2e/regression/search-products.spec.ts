import { test } from "../../fixtures/pages.fixture";
import {
  TC_09_SEARCH_EXISTING_PRODUCT,
  TC_09_1_SEARCH_EMPTY_INPUT,
  TC_09_2_SEARCH_NONEXISTENT,
  TC_09_3_SEARCH_SPECIAL_CHARS,
  TC_09_4_SEARCH_EXCESSIVE_INPUT,
  TC_09_5_SEARCH_SINGLE_CHAR,
} from "../../utils/test-case-ids";

const NONEXISTENT_TERM = "XXNOTAPRODUCT999ZZ";
const SPECIAL_CHARS_TERM = "@#$%^&*()!";
const EXCESSIVE_TERM = "a".repeat(260);
const SINGLE_CHAR_TERM = "t";

test.describe("Search Products @regression", () => {
  test(`${TC_09_SEARCH_EXISTING_PRODUCT}: Search existing product (positive)`, async ({
    productsPage,
  }) => {
    let productName: string;

    await test.step("Given I launch the browser and navigate to the Home page", async () => {
      await productsPage.openHome();
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

  test(`${TC_09_1_SEARCH_EMPTY_INPUT}: Empty search keeps full product list`, async ({
    productsPage,
  }) => {
    await test.step("Given I navigate to the Products page", async () => {
      await productsPage.openHome();
      await productsPage.navigateToProducts();
    });

    await test.step("When I submit the search form with an empty input", async () => {
      await productsPage.submitEmptySearch();
    });

    await test.step("Then the heading should remain 'All Products'", async () => {
      await productsPage.assertAllProductsHeadingVisible();
    });

    await test.step("And the full product list should still be visible", async () => {
      await productsPage.assertProductsListVisible();
    });
  });

  test(`${TC_09_2_SEARCH_NONEXISTENT}: Non-existent product shows no results`, async ({
    productsPage,
  }) => {
    await test.step("Given I navigate to the Products page", async () => {
      await productsPage.openHome();
      await productsPage.navigateToProducts();
    });

    await test.step(`When I search for a non-existent term "${NONEXISTENT_TERM}"`, async () => {
      await productsPage.searchProducts(NONEXISTENT_TERM);
    });

    await test.step("Then 'Searched Products' heading should be visible", async () => {
      await productsPage.assertSearchedProductsHeadingVisible();
    });

    await test.step("And no product results should be shown", async () => {
      await productsPage.assertNoSearchResults();
    });
  });

  test(`${TC_09_3_SEARCH_SPECIAL_CHARS}: Special characters show no results`, async ({
    productsPage,
  }) => {
    await test.step("Given I navigate to the Products page", async () => {
      await productsPage.openHome();
      await productsPage.navigateToProducts();
    });

    await test.step(`When I search with special characters "${SPECIAL_CHARS_TERM}"`, async () => {
      await productsPage.searchProducts(SPECIAL_CHARS_TERM);
    });

    await test.step("Then 'Searched Products' heading should be visible", async () => {
      await productsPage.assertSearchedProductsHeadingVisible();
    });

    await test.step("And no product results should be shown", async () => {
      await productsPage.assertNoSearchResults();
    });
  });

  test(`${TC_09_4_SEARCH_EXCESSIVE_INPUT}: Excessive input shows no results`, async ({
    productsPage,
  }) => {
    await test.step("Given I navigate to the Products page", async () => {
      await productsPage.openHome();
      await productsPage.navigateToProducts();
    });

    await test.step("When I search with an excessively long string (260 characters)", async () => {
      await productsPage.searchProducts(EXCESSIVE_TERM);
    });

    await test.step("Then 'Searched Products' heading should be visible", async () => {
      await productsPage.assertSearchedProductsHeadingVisible();
    });

    await test.step("And no product results should be shown", async () => {
      await productsPage.assertNoSearchResults();
    });
  });

  test(`${TC_09_5_SEARCH_SINGLE_CHAR}: Single character search`, async ({
    productsPage,
  }) => {
    await test.step("Given I navigate to the Products page", async () => {
      await productsPage.openHome();
      await productsPage.navigateToProducts();
    });

    await test.step(`When I search with a single character "${SINGLE_CHAR_TERM}"`, async () => {
      await productsPage.searchProducts(SINGLE_CHAR_TERM);
    });

    await test.step("Then 'Searched Products' heading should be visible", async () => {
      await productsPage.assertSearchedProductsHeadingVisible();
    });

    await test.step("And the results section should be rendered", async () => {
      await productsPage.assertSearchedProductsHeadingVisible();
    });
  });
});
