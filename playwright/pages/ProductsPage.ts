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
  }

  async openHome(): Promise<void> {
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
}
