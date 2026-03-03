import { test } from "../../fixtures/pages.fixture";
import { TC_TEST_CASES_LOGGED_IN } from "../../utils/test-case-ids";

test.describe("Test Cases (Logged In) @smoke", () => {
  test(`${TC_TEST_CASES_LOGGED_IN}: Navigate to Test Cases page while logged in`, async ({
    testCasesPage,
  }) => {
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
  });
});
