import { test } from "../../fixtures/pages.fixture";
import { TC_07_TEST_CASES_NAVIGATE } from "../../utils/test-case-ids";

test.describe("Test Cases @smoke", () => {
  test(`${TC_07_TEST_CASES_NAVIGATE}: Navigate to Test Cases page`, async ({
    testCasesPage,
  }) => {
    await test.step("Given I launch the browser and navigate to the Home page", async () => {
      await testCasesPage.openHome();
    });

    await test.step("When I click on the Test Cases button", async () => {
      await testCasesPage.navigateToTestCases();
    });

    await test.step("Then I should be on the Test Cases page", async () => {
      await testCasesPage.assertTestCasesPageVisible();
    });
  });
});
