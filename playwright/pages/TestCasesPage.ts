import { type Page, expect } from "@playwright/test";
import { BasePage } from "./BasePage";

export class TestCasesPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async openHome(): Promise<void> {
    await this.page.goto("/");
    await expect(this.page).toHaveTitle(/Automation Exercise/i);
    await this.screenshot("01 - Home page loaded");
  }

  async navigateToTestCases(): Promise<void> {
    await this.clickWithAdFallback(
      this.page.locator('#header a[href="/test_cases"]'),
      /\/test_cases/,
      "/test_cases",
    );
    await this.screenshot("02 - Test Cases page");
  }

  async assertTestCasesPageVisible(): Promise<void> {
    await expect(
      this.page.locator(".title", { hasText: "Test Cases" }),
    ).toBeVisible();
    await this.screenshot("03 - Test Cases heading visible");
  }
}
