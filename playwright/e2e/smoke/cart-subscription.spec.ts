import { test } from "../../fixtures/pages.fixture";
import { uniqueEmail } from "../../utils/test-data";
import { TC_11_SUBSCRIPTION_CART } from "../../utils/test-case-ids";

test.describe("Cart Page – Subscription @smoke", () => {
  test(`${TC_11_SUBSCRIPTION_CART}: Verify Subscription in Cart page`, async ({
    cartPage,
  }) => {
    await test.step("Given I navigate to the home page", async () => {
      await cartPage.openHome();
    });

    await test.step("When I click the 'Cart' button", async () => {
      await cartPage.navigateToCart();
    });

    await test.step("And I scroll down to the footer", async () => {
      await cartPage.scrollToFooter();
    });

    await test.step("Then I should see the 'SUBSCRIPTION' heading", async () => {
      await cartPage.assertSubscriptionHeadingVisible();
    });

    await test.step("When I enter a valid email address and click the arrow button", async () => {
      await cartPage.subscribeWithEmail(uniqueEmail("cart-sub"));
    });

    await test.step("Then I should see the success message 'You have been successfully subscribed!'", async () => {
      await cartPage.assertSubscriptionSuccess();
    });
  });
});
