import { type Locator, type Page, expect } from "@playwright/test";
import { BasePage } from "./BasePage";

export class CartPage extends BasePage {
  private readonly cartNavLink: Locator;
  private readonly emailInput = "#susbscribe_email";
  private readonly successBanner = "#success-subscribe";
  private readonly footerSection = "#footer";

  constructor(page: Page) {
    super(page);
    this.cartNavLink = page.locator('#header a[href="/view_cart"]');
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

  async navigateToCart(): Promise<void> {
    await this.clickWithAdFallback(
      this.cartNavLink,
      /\/view_cart/,
      "/view_cart",
    );
    await this.screenshot("02 - Cart page loaded");
  }

  async scrollToFooter(): Promise<void> {
    await this.page.locator(this.footerSection).scrollIntoViewIfNeeded();
    await this.screenshot("03 - Scrolled to footer");
  }

  async assertSubscriptionHeadingVisible(): Promise<void> {
    await expect(
      this.page.locator(this.footerSection).getByText("SUBSCRIPTION"),
    ).toBeVisible();
    await this.screenshot("04 - SUBSCRIPTION heading visible");
  }

  async subscribeWithEmail(email: string): Promise<void> {
    await this.page.locator(this.emailInput).fill(email);
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
}
