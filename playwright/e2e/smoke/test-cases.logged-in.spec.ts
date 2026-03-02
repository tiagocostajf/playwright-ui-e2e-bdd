import { test } from "../../fixtures/pages.fixture";

test.describe("Test Cases (Logged In) - Smoke", () => {
  test(
    "Given I am logged in, " +
      "When I click on Test Cases, " +
      "Then I should be navigated to the Test Cases page @smoke",
    async ({ testCasesPage }) => {
      await test.step("Given I am logged in and on the Home page", async () => {
        await testCasesPage.openHome();
        await testCasesPage.assertLoggedIn();
      });

      await test.step("When I click on the Test Cases button", async () => {
        await testCasesPage.navigateToTestCases();
      });

      await test.step("Then I should be on the Test Cases page", async () => {
        await testCasesPage.assertTestCasesPageVisible();
      });
    },
  );
});
