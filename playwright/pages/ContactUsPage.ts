import { type Page, expect } from "@playwright/test";
import { BasePage } from "./BasePage";

export class ContactUsPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async openHome(): Promise<void> {
    await this.page.goto("/");
    await expect(this.page).toHaveTitle(/Automation Exercise/i);
    await this.screenshot("01 - Home page loaded");
  }

  async navigateToContactUs(): Promise<void> {
    await this.clickWithAdFallback(
      this.page.locator('#header a[href="/contact_us"]'),
      /\/contact_us/,
      "/contact_us",
    );
    await this.screenshot("02 - Contact Us page");
  }

  async assertGetInTouchVisible(): Promise<void> {
    await expect(
      this.page.locator(".title", { hasText: "Get In Touch" }),
    ).toBeVisible();
    await this.screenshot("03 - GET IN TOUCH heading visible");
  }

  async fillContactForm(data: {
    name: string;
    email: string;
    subject: string;
    message: string;
  }): Promise<void> {
    await this.page.locator('[data-qa="name"]').fill(data.name);
    await this.page.locator('[data-qa="email"]').fill(data.email);
    await this.page.locator('[data-qa="subject"]').fill(data.subject);
    await this.page.locator('[data-qa="message"]').fill(data.message);
    await this.screenshot("04 - Form filled");
  }

  async uploadFile(): Promise<void> {
    await this.page.locator('input[name="upload_file"]').setInputFiles({
      name: "test-upload.txt",
      mimeType: "text/plain",
      buffer: Buffer.from("Playwright test upload file"),
    });
    await this.screenshot("05 - File uploaded");
  }

  async submitForm(): Promise<void> {
    this.page.once("dialog", (dialog) => dialog.accept());
    await this.page.locator('[data-qa="submit-button"]').click();
    await this.screenshot("06 - Form submitted");
  }

  async assertSuccessMessageVisible(): Promise<void> {
    await expect(this.page.locator(".status.alert-success")).toBeVisible();
    await expect(this.page.locator(".status.alert-success")).toContainText(
      "Success! Your details have been submitted successfully.",
    );
    await this.screenshot("07 - Success message visible");
  }

  async goHome(): Promise<void> {
    await this.clickWithAdFallback(
      this.page.locator('a[href="/"]').first(),
      /automationexercise\.com\/?$/,
      "/",
    );
    await expect(this.page).toHaveTitle(/Automation Exercise/i);
    await this.screenshot("08 - Back on Home page");
  }
}
