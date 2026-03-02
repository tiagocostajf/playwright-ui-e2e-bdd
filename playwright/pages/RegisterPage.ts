import { type Locator, type Page, expect, test } from "@playwright/test";

export class RegisterPage {
  private readonly signupLoginLink: Locator;
  private readonly signupHeading: Locator;
  private readonly signupName: Locator;
  private readonly signupEmail: Locator;
  private readonly signupButton: Locator;

  private readonly accountInfoHeading: Locator;
  private readonly titleMr: Locator;
  private readonly titleMrs: Locator;
  private readonly passwordField: Locator;
  private readonly firstName: Locator;
  private readonly lastName: Locator;
  private readonly address: Locator;
  private readonly country: Locator;
  private readonly state: Locator;
  private readonly city: Locator;
  private readonly zipcode: Locator;
  private readonly mobileNumber: Locator;
  private readonly createAccountButton: Locator;

  private readonly accountCreatedHeading: Locator;
  private readonly logoutLink: Locator;

  constructor(private readonly page: Page) {
    this.signupLoginLink = page.locator('a[href="/login"]');
    this.signupHeading = page.locator(".signup-form h2");
    this.signupName = page.locator('[data-qa="signup-name"]');
    this.signupEmail = page.locator('[data-qa="signup-email"]');
    this.signupButton = page.locator('[data-qa="signup-button"]');

    this.accountInfoHeading = page.locator("h2.title b");
    this.titleMr = page.locator("#id_gender1");
    this.titleMrs = page.locator("#id_gender2");
    this.passwordField = page.locator("#password");
    this.firstName = page.locator("#first_name");
    this.lastName = page.locator("#last_name");
    this.address = page.locator("#address1");
    this.country = page.locator("#country");
    this.state = page.locator("#state");
    this.city = page.locator("#city");
    this.zipcode = page.locator("#zipcode");
    this.mobileNumber = page.locator("#mobile_number");
    this.createAccountButton = page.locator('[data-qa="create-account"]');

    this.accountCreatedHeading = page.locator('[data-qa="account-created"]');
    this.logoutLink = page.locator('a[href="/logout"]');
  }
  private async screenshot(name: string): Promise<void> {
    await test.info().attach(name, {
      body: await this.page.screenshot({ fullPage: true }),
      contentType: "image/png",
    });
  }

  async openHome(): Promise<void> {
    await this.page.goto("/");
    await expect(this.page).toHaveTitle(/Automation Exercise/i);
    await this.screenshot("01 - Home page loaded");
  }

  async navigateToSignup(): Promise<void> {
    await this.signupLoginLink.click();
    await expect(this.signupHeading).toHaveText("New User Signup!");
    await this.screenshot("02 - Signup / Login page");
  }

  async fillSignupAndProceed(name: string, email: string): Promise<void> {
    await this.signupName.fill(name);
    await this.signupEmail.fill(email);
    await this.screenshot("03 - Signup form filled");

    await this.signupButton.click();

    // .first() because the page renders two <h2.title b> elements
    await expect(this.accountInfoHeading.first()).toHaveText(
      "Enter Account Information",
    );
    await this.screenshot("04 - Account information form");
  }

  async fillAccountInfo(data: {
    title?: "Mr" | "Mrs";
    password: string;
    firstName: string;
    lastName: string;
    address: string;
    country?: string;
    state: string;
    city: string;
    zipcode: string;
    mobileNumber: string;
  }): Promise<void> {
    if (data.title === "Mrs") {
      await this.titleMrs.check();
    } else {
      await this.titleMr.check();
    }

    await this.passwordField.fill(data.password);
    await this.firstName.fill(data.firstName);
    await this.lastName.fill(data.lastName);
    await this.address.fill(data.address);

    if (data.country) {
      await this.country.selectOption(data.country);
    }

    await this.state.fill(data.state);
    await this.city.fill(data.city);
    await this.zipcode.fill(data.zipcode);
    await this.mobileNumber.fill(data.mobileNumber);

    await this.screenshot("05 - Account info filled");
  }

  async submitCreateAccount(): Promise<void> {
    await this.createAccountButton.click();
  }

  async assertAccountCreated(): Promise<void> {
    await expect(this.accountCreatedHeading).toBeVisible();
    await this.screenshot("06 - Account created (success)");
  }

  // Navega diretamente para home porque [data-qa="continue-button"] não é renderizado de forma consistente no site
  async continueAfterRegistration(): Promise<void> {
    await this.page.goto("/");
    await expect(this.page).toHaveTitle(/Automation Exercise/i);
    await this.screenshot("07 - Redirected to home after registration");
  }

  async logout(): Promise<void> {
    await this.logoutLink.click();
    await expect(this.signupHeading).toBeVisible();
    await this.screenshot("Logged out");
  }

  async attemptSignupForm(name: string, email: string): Promise<void> {
    if (name) await this.signupName.fill(name);
    if (email) await this.signupEmail.fill(email);
    await this.signupButton.click();
    await this.screenshot("Signup attempt");
  }

  async assertSignupError(expectedMessage: string): Promise<void> {
    await expect(this.page.getByText(expectedMessage)).toBeVisible();
    await this.screenshot(`Error - ${expectedMessage}`);
  }

  async fillAccountInfoPartial(data: {
    title?: "Mr" | "Mrs";
    password?: string;
    firstName?: string;
    lastName?: string;
    address?: string;
    country?: string;
    state?: string;
    city?: string;
    zipcode?: string;
    mobileNumber?: string;
  }): Promise<void> {
    if (data.title === "Mrs") await this.titleMrs.check();
    else if (data.title === "Mr") await this.titleMr.check();

    if (data.password !== undefined)
      await this.passwordField.fill(data.password);
    if (data.firstName !== undefined) await this.firstName.fill(data.firstName);
    if (data.lastName !== undefined) await this.lastName.fill(data.lastName);
    if (data.address !== undefined) await this.address.fill(data.address);
    if (data.country !== undefined)
      await this.country.selectOption(data.country);
    if (data.state !== undefined) await this.state.fill(data.state);
    if (data.city !== undefined) await this.city.fill(data.city);
    if (data.zipcode !== undefined) await this.zipcode.fill(data.zipcode);
    if (data.mobileNumber !== undefined)
      await this.mobileNumber.fill(data.mobileNumber);

    await this.screenshot("Account info partial fill");
  }

  async assertFieldIsRequired(cssSelector: string): Promise<void> {
    const valueMissing = await this.page
      .locator(cssSelector)
      .evaluate((el) => (el as HTMLInputElement).validity.valueMissing);
    expect(valueMissing).toBe(true);
  }
}
