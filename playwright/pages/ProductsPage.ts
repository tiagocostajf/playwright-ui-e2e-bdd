import { type Locator, type Page, expect } from "@playwright/test";
import { BasePage } from "./BasePage";

export class ProductsPage extends BasePage {
  private readonly productsNavLink: Locator;
  private readonly allProductsHeading: Locator;
  private readonly productsList: Locator;
  private readonly firstViewProductLink: Locator;

  private readonly productName: Locator;
  private readonly productCategory: Locator;
  private readonly productPrice: Locator;
  private readonly productAvailability: Locator;
  private readonly productCondition: Locator;
  private readonly productBrand: Locator;

  private readonly searchInput: Locator;
  private readonly searchButton: Locator;
  private readonly searchedProductsHeading: Locator;
  private readonly searchResultItems: Locator;
  private readonly searchResultNames: Locator;

  constructor(page: Page) {
    super(page);
    this.productsNavLink = page.locator('a[href="/products"]');
    this.allProductsHeading = page.locator(".features_items h2.title");
    this.productsList = page.locator(".features_items .product-image-wrapper");
    this.firstViewProductLink = page
      .locator('.features_items a[href*="product_details"]')
      .first();

    this.productName = page.locator(".product-information h2");
    this.productCategory = page.locator(
      '.product-information p:has-text("Category")',
    );
    this.productPrice = page
      .locator('.product-information span:has-text("Rs.")')
      .first();
    this.productAvailability = page.locator(
      '.product-information p:has-text("Availability")',
    );
    this.productCondition = page.locator(
      '.product-information p:has-text("Condition")',
    );
    this.productBrand = page.locator(
      '.product-information p:has-text("Brand")',
    );

    this.searchInput = page.locator("#search_product");
    this.searchButton = page.locator("#submit_search");
    this.searchedProductsHeading = page.locator(".features_items h2.title");
    this.searchResultItems = page.locator(
      ".features_items .product-image-wrapper",
    );
    this.searchResultNames = page.locator(".features_items .productinfo p");
  }

  async openHome(): Promise<void> {
    await this.page.route(
      /doubleclick\.net|googlesyndication|googleadservices|google_vignette|googletagmanager|yandex\.(ru|net)|adservice/i,
      (route) => route.abort(),
    );
    await this.page.goto("/");
    await expect(this.page).toHaveTitle(/Automation Exercise/i);
    await this.screenshot("01 - Home page loaded");
  }

  async navigateToProducts(): Promise<void> {
    await this.clickWithAdFallback(
      this.productsNavLink,
      /\/products/,
      "/products",
    );
    await expect(this.allProductsHeading).toContainText("All Products");
    await this.screenshot("02 - All Products page");
  }

  async assertProductsListVisible(): Promise<void> {
    await expect(this.productsList.first()).toBeVisible();
    await this.screenshot("03 - Products list visible");
  }

  async getFirstProductName(): Promise<string> {
    await expect(this.searchResultNames.first()).toBeVisible();
    const name = await this.searchResultNames.first().textContent();
    if (!name)
      throw new Error("Could not read first product name from the list");
    await this.screenshot(`Captured first product name: "${name.trim()}"`);
    return name.trim();
  }

  async viewFirstProduct(): Promise<void> {
    const href = await this.firstViewProductLink.getAttribute("href");
    await this.clickWithAdFallback(
      this.firstViewProductLink,
      /\/product_details\//,
      href!,
    );
    await this.screenshot("04 - Product detail page");
  }

  async assertProductDetailVisible(): Promise<void> {
    await expect(this.productName).toBeVisible();
    await expect(this.productCategory).toBeVisible();
    await expect(this.productPrice).toBeVisible();
    await expect(this.productAvailability).toBeVisible();
    await expect(this.productCondition).toBeVisible();
    await expect(this.productBrand).toBeVisible();
    await this.screenshot("05 - Product detail fields visible");
  }

  async searchProducts(term: string): Promise<void> {
    await this.searchInput.fill(term);
    await this.searchButton.click();
    // Guard against ad redirects on Firefox: if we land off /products, navigate back
    await this.page
      .waitForURL((url) => url.href.includes("/products"), {
        timeout: 10_000,
      })
      .catch(async () => {
        await this.page.goto("/products");
        await this.searchInput.fill(term);
        await this.searchButton.click();
        await this.page.waitForURL((url) => url.href.includes("/products"), {
          timeout: 10_000,
        });
      });
    await this.screenshot(`Search - term: "${term}"`);
  }

  async clearAndSearchProducts(term: string): Promise<void> {
    await this.searchInput.clear();
    await this.searchInput.fill(term);
    await this.searchButton.click();
    await this.screenshot(`Search - term: "${term}"`);
  }

  async submitEmptySearch(): Promise<void> {
    await this.searchInput.clear();
    await this.searchButton.click();
    await this.screenshot("Search - empty term submitted");
  }

  async assertSearchedProductsHeadingVisible(): Promise<void> {
    await expect(this.searchedProductsHeading).toContainText(
      /Searched Products/i,
    );
    await this.screenshot("Search heading - Searched Products visible");
  }

  async assertAllProductsHeadingVisible(): Promise<void> {
    await expect(this.searchedProductsHeading).toContainText(/All Products/i);
    await this.screenshot(
      "Heading - All Products visible (empty search unchanged)",
    );
  }

  async assertSearchResultsVisible(): Promise<void> {
    await expect(this.searchResultItems.first()).toBeVisible();
    await this.screenshot("Search results - at least one product visible");
  }

  async assertNoSearchResults(): Promise<void> {
    await expect(this.searchResultItems).toHaveCount(0);
    await this.screenshot("Search results - no products found");
  }

  async assertAllSearchResultsContain(term: string): Promise<void> {
    const count = await this.searchResultNames.count();
    for (let i = 0; i < count; i++) {
      const text = await this.searchResultNames.nth(i).textContent();
      expect(text?.toLowerCase()).toContain(term.toLowerCase());
    }
    await this.screenshot(`Search results - all names contain "${term}"`);
  }

  async assertSearchedProductVisible(productName: string): Promise<void> {
    await expect(
      this.searchResultNames.filter({ hasText: productName }),
    ).toBeVisible();
    await this.screenshot(`Search results - "${productName}" found in results`);
  }
}
