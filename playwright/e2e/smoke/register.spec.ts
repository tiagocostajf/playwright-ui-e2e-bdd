import { test } from "../../fixtures/pages.fixture";
import { randomUser } from "../../utils/test-data";

test.describe("Register - Smoke", () => {
  test(
    "Given I access the Signup page, " +
      "When I submit valid account data, " +
      "Then I should see Account Created message @smoke",
    async ({ registerPage }) => {
      const user = randomUser();

      await test.step("Given I open the Home page", async () => {
        await registerPage.openHome();
      });

      await test.step("And I navigate to the Signup page", async () => {
        await registerPage.navigateToSignup();
      });

      await test.step("When I fill the signup form and proceed", async () => {
        await registerPage.fillSignupAndProceed(
          `${user.firstName} ${user.lastName}`,
          user.email,
        );
      });

      await test.step("And I fill the account information", async () => {
        await registerPage.fillAccountInfo({
          title: "Mr",
          password: user.password,
          firstName: user.firstName,
          lastName: user.lastName,
          address: user.address,
          state: user.state,
          city: user.city,
          zipcode: user.zipcode,
          mobileNumber: user.mobileNumber,
        });
      });

      await test.step("And I submit the Create Account form", async () => {
        await registerPage.submitCreateAccount();
      });

      await test.step("Then I should see the Account Created message", async () => {
        await registerPage.assertAccountCreated();
      });
    },
  );
});
