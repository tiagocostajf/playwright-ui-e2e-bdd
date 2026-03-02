import { type Locator, type Page, expect, test } from "@playwright/test";

export abstract class BasePage {
  constructor(protected readonly page: Page) {}

  protected async screenshot(name: string): Promise<void> {
    await test.info().attach(name, {
      body: await this.page.screenshot({ fullPage: true }),
      contentType: "image/png",
    });
  }

  async assertLoggedIn(): Promise<void> {
    await expect(
      this.page.locator("#header li a").filter({ hasText: /Logged in as/i }),
    ).toBeVisible();
  }

  protected async clickWithAdFallback(
    locator: Locator,
    expectedUrlPattern: RegExp,
    fallbackUrl: string,
  ): Promise<void> {
    await locator.click();
    await this.page.waitForURL(
      (url) =>
        expectedUrlPattern.test(url.href) ||
        url.href.includes("google_vignette"),
      { timeout: 10_000 },
    );
    if (!expectedUrlPattern.test(this.page.url())) {
      await this.page.goto(fallbackUrl);
    }
    await expect(this.page).toHaveURL(expectedUrlPattern);
  }
}
