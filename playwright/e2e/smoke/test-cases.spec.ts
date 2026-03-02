import { test } from "../../fixtures/pages.fixture";

test.describe("Test Cases - Smoke", () => {
  test(
    "Given I am on the Home page, " +
      "When I click on Test Cases, " +
      "Then I should be navigated to the Test Cases page @smoke",
    async ({ testCasesPage }) => {
      await test.step("Given I launch the browser and navigate to the Home page", async () => {
        await testCasesPage.openHome();
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
