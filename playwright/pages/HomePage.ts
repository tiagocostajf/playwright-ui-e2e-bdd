import { type Page, expect } from "@playwright/test";
import { BasePage } from "./BasePage";

export class HomePage extends BasePage {
  private readonly emailInput = "#susbscribe_email";
  private readonly subscribeBtn = "#subscribe";
  private readonly successBanner = "#success-subscribe";
  private readonly footerSection = "#footer";

  constructor(page: Page) {
    super(page);
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

  async scrollToFooter(): Promise<void> {
    await this.page.locator(this.footerSection).scrollIntoViewIfNeeded();
    await this.screenshot("02 - Scrolled to footer");
  }

  async assertSubscriptionHeadingVisible(): Promise<void> {
    await expect(
      this.page.locator(this.footerSection).getByText("SUBSCRIPTION"),
    ).toBeVisible();
    await this.screenshot("03 - SUBSCRIPTION heading visible");
  }

  async fillSubscriptionEmail(email: string): Promise<void> {
    await this.page.locator(this.emailInput).fill(email);
    await this.screenshot(
      `04 - Email filled: "${email.slice(0, 60)}${email.length > 60 ? "…" : ""}"`,
    );
  }

  async clearSubscriptionEmail(): Promise<void> {
    await this.page.locator(this.emailInput).clear();
    await this.screenshot("04 - Email field cleared");
  }

  async clickSubscribeButton(): Promise<void> {
    await this.page.locator(this.subscribeBtn).click();
    await this.screenshot("05 - Subscribe button clicked");
  }

  async subscribeWithEmail(email: string): Promise<void> {
    await this.fillSubscriptionEmail(email);
    await this.page.locator(this.emailInput).scrollIntoViewIfNeeded();
    await this.page.locator(this.emailInput).press("Enter");
    // Capture the banner the moment it appears — the site hides it within ~1s
    await this.page
      .locator(`${this.successBanner}:not(.hide)`)
      .waitFor({ state: "visible", timeout: 15_000 });
    await this.screenshot("05 - Success banner visible");
  }

  async assertSubscriptionSuccess(): Promise<void> {
    await expect(this.page.locator(this.successBanner)).toContainText(
      "You have been successfully subscribed!",
    );
    await this.screenshot("06 - Success message confirmed");
  }

  async assertNoSuccessMessage(): Promise<void> {
    await expect(this.page.locator(this.successBanner)).not.toBeVisible({
      timeout: 3_000,
    });
    await this.screenshot("06 - Success banner NOT shown (expected)");
  }

  async assertSubscriptionEmailInvalid(): Promise<void> {
    const isValid = await this.page
      .locator(this.emailInput)
      .evaluate((el) => (el as HTMLInputElement).validity.valid);
    expect(isValid).toBe(false);
    await this.screenshot("07 - Email field native validation: INVALID");
  }

  async assertPageStillFunctional(): Promise<void> {
    await expect(this.page).toHaveTitle(/Automation Exercise/i);
    await this.screenshot("07 - Page still functional after boundary test");
  }
}
