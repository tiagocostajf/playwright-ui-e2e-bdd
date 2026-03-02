import { test } from "../../fixtures/pages.fixture";

test.describe("Contact Us - Smoke", () => {
  test(
    "Given I am on the Home page, " +
      "When I submit the Contact Us form, " +
      "Then I should see a success message and return Home @smoke",
    async ({ contactUsPage }) => {
      await test.step("Given I launch the browser and navigate to the Home page", async () => {
        await contactUsPage.openHome();
      });

      await test.step("When I click on the Contact Us button", async () => {
        await contactUsPage.navigateToContactUs();
      });

      await test.step("Then GET IN TOUCH heading should be visible", async () => {
        await contactUsPage.assertGetInTouchVisible();
      });

      await test.step("When I fill in name, email, subject and message", async () => {
        await contactUsPage.fillContactForm({
          name: "Test User",
          email: "testuser@example.com",
          subject: "Playwright Automation Test",
          message: "This is an automated test message sent by Playwright.",
        });
      });

      await test.step("And I upload a file", async () => {
        await contactUsPage.uploadFile();
      });

      await test.step("And I click Submit and accept the dialog", async () => {
        await contactUsPage.submitForm();
      });

      await test.step("Then I should see the success message", async () => {
        await contactUsPage.assertSuccessMessageVisible();
      });

      await test.step("When I click the Home button", async () => {
        await contactUsPage.goHome();
      });
    },
  );
});
