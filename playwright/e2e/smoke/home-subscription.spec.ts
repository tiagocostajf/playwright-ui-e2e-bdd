import { test } from "../../fixtures/pages.fixture";
import { uniqueEmail } from "../../utils/test-data";
import {
  TC_SUBSCRIPTION_HOME,
  TC_SUBSCRIPTION_EMPTY_EMAIL,
  TC_SUBSCRIPTION_INVALID_NO_AT,
  TC_SUBSCRIPTION_INVALID_NO_DOMAIN,
  TC_SUBSCRIPTION_FILL_CLEAR_SUBMIT,
  TC_SUBSCRIPTION_EXCESSIVE_LENGTH,
  TC_SUBSCRIPTION_XSS_ATTEMPT,
} from "../../utils/test-case-ids";

test.describe("Home Page – Subscription @smoke", () => {
  test.beforeEach(async ({ homePage }) => {
    await homePage.openHome();
    await homePage.scrollToFooter();
    await homePage.assertSubscriptionHeadingVisible();
  });

  test(`${TC_SUBSCRIPTION_HOME}: Valid random email subscribes successfully`, async ({
    homePage,
  }) => {
    const email = uniqueEmail("sub");

    await test.step("When I enter a valid random email and click the arrow button", async () => {
      await homePage.subscribeWithEmail(email);
    });

    await test.step("Then I should see the success message 'You have been successfully subscribed!'", async () => {
      await homePage.assertSubscriptionSuccess();
    });
  });

  test(`${TC_SUBSCRIPTION_EMPTY_EMAIL}: Submitting empty email is blocked`, async ({
    homePage,
  }) => {
    await test.step("When I click the arrow button without entering an email", async () => {
      await homePage.clickSubscribeButton();
    });

    await test.step("Then the email field should be invalid (required constraint)", async () => {
      await homePage.assertSubscriptionEmailInvalid();
    });

    await test.step("And no success message should appear", async () => {
      await homePage.assertNoSuccessMessage();
    });
  });

  test(`${TC_SUBSCRIPTION_INVALID_NO_AT}: Email without '@' is rejected by browser validation`, async ({
    homePage,
  }) => {
    await test.step("When I enter an email without the '@' character", async () => {
      await homePage.fillSubscriptionEmail("invalidemail");
      await homePage.clickSubscribeButton();
    });

    await test.step("Then the email field should fail native email-type validation", async () => {
      await homePage.assertSubscriptionEmailInvalid();
    });

    await test.step("And no success message should appear", async () => {
      await homePage.assertNoSuccessMessage();
    });
  });

  test(`${TC_SUBSCRIPTION_INVALID_NO_DOMAIN}: Email ending with '@' and no domain is rejected`, async ({
    homePage,
  }) => {
    await test.step("When I enter an email address with no domain part (e.g. 'test@')", async () => {
      await homePage.fillSubscriptionEmail("test@");
      await homePage.clickSubscribeButton();
    });

    await test.step("Then the email field should fail native email-type validation", async () => {
      await homePage.assertSubscriptionEmailInvalid();
    });

    await test.step("And no success message should appear", async () => {
      await homePage.assertNoSuccessMessage();
    });
  });

  test(`${TC_SUBSCRIPTION_FILL_CLEAR_SUBMIT}: Typing then clearing email prevents subscription`, async ({
    homePage,
  }) => {
    test.slow();
    await test.step("When I type a valid email into the field", async () => {
      await homePage.fillSubscriptionEmail(uniqueEmail("tmp"));
    });

    await test.step("And I clear the field before submitting", async () => {
      await homePage.clearSubscriptionEmail();
    });

    await test.step("And I click the arrow button", async () => {
      await homePage.clickSubscribeButton();
    });

    await test.step("Then the email field should be invalid (now empty + required)", async () => {
      await homePage.assertSubscriptionEmailInvalid();
    });

    await test.step("And no success message should appear", async () => {
      await homePage.assertNoSuccessMessage();
    });
  });

  test(`${TC_SUBSCRIPTION_EXCESSIVE_LENGTH}: Excessively long email does not break the page`, async ({
    homePage,
  }) => {
    const longEmail = `${"a".repeat(250)}@automation-test.io`;

    await test.step("When I enter an excessively long email address (250-char local part)", async () => {
      await homePage.fillSubscriptionEmail(longEmail);
      await homePage.clickSubscribeButton();
    });

    await test.step("Then the page should remain functional with no crash or JS error", async () => {
      await homePage.assertPageStillFunctional();
    });

    await test.step("And no success message should appear (server should reject over-length input)", async () => {
      await homePage.assertNoSuccessMessage();
    });
  });

  test(`${TC_SUBSCRIPTION_XSS_ATTEMPT}: XSS injection attempt in email field is blocked`, async ({
    homePage,
  }) => {
    const xssEmail = `<script>alert('xss')</script>@test.com`;

    await test.step("When I enter an XSS payload as the email address", async () => {
      await homePage.fillSubscriptionEmail(xssEmail);
      await homePage.clickSubscribeButton();
    });

    await test.step("Then the email field should fail native email-type validation", async () => {
      await homePage.assertSubscriptionEmailInvalid();
    });

    await test.step("And no success message should appear", async () => {
      await homePage.assertNoSuccessMessage();
    });
  });
});
