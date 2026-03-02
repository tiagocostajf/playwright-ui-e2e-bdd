import { test } from "../../fixtures/pages.fixture";
import { randomUser } from "../../utils/test-data";

type AccountInfo = {
  title: "Mr" | "Mrs";
  password: string;
  firstName: string;
  lastName: string;
  address: string;
  state: string;
  city: string;
  zipcode: string;
  mobileNumber: string;
};

type AccountInfoKey = keyof AccountInfo;

function baseAccountInfo(): AccountInfo {
  const user = randomUser();
  return {
    title: "Mr",
    password: user.password,
    firstName: user.firstName,
    lastName: user.lastName,
    address: user.address,
    state: user.state,
    city: user.city,
    zipcode: user.zipcode,
    mobileNumber: user.mobileNumber,
  };
}

function without(
  base: AccountInfo,
  omitKey: AccountInfoKey,
): Partial<AccountInfo> {
  const copy = { ...base } as Record<string, unknown>;
  delete copy[omitKey];
  return copy as Partial<AccountInfo>;
}

// ─── Signup form ────────────────────────────────────────────────────────────

test.describe("Register - Signup form validation @regression", () => {
  test.describe.configure({ timeout: 60_000 });
  test("Given a registered email, When I try to register again, Then I should see duplicate email error", async ({
    registerPage,
  }) => {
    test.setTimeout(90_000);
    const user = randomUser();

    await test.step("Given I complete a full registration", async () => {
      await registerPage.openHome();
      await registerPage.navigateToSignup();
      await registerPage.fillSignupAndProceed(
        `${user.firstName} ${user.lastName}`,
        user.email,
      );
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
      await registerPage.submitCreateAccount();
      await registerPage.assertAccountCreated();
    });

    await test.step("And I navigate to home and logout", async () => {
      await registerPage.continueAfterRegistration();
      await registerPage.logout();
    });

    await test.step("When I try to register with the same email again", async () => {
      await registerPage.attemptSignupForm(
        `${user.firstName} ${user.lastName}`,
        user.email,
      );
    });

    await test.step("Then I should see 'Email Address already exist!' error", async () => {
      await registerPage.assertSignupError("Email Address already exist!");
    });
  });

  test("Given I am on the Signup page, When I submit without a name, Then the name field should be required", async ({
    registerPage,
  }) => {
    await test.step("Given I navigate to the Signup page", async () => {
      await registerPage.openHome();
      await registerPage.navigateToSignup();
    });

    await test.step("When I submit the form without a name", async () => {
      await registerPage.attemptSignupForm(
        "",
        `missing-name-${Date.now()}@test.com`,
      );
    });

    await test.step("Then the name field should be marked as required", async () => {
      await registerPage.assertFieldIsRequired('[data-qa="signup-name"]');
    });
  });

  test("Given I am on the Signup page, When I submit without an email, Then the email field should be required", async ({
    registerPage,
  }) => {
    await test.step("Given I navigate to the Signup page", async () => {
      await registerPage.openHome();
      await registerPage.navigateToSignup();
    });

    await test.step("When I submit the form without an email", async () => {
      await registerPage.attemptSignupForm("Test User", "");
    });

    await test.step("Then the email field should be marked as required", async () => {
      await registerPage.assertFieldIsRequired('[data-qa="signup-email"]');
    });
  });
});

// ─── Account info form – required fields ────────────────────────────────────

const requiredAccountFields: Array<{
  label: string;
  selector: string;
  omitKey: AccountInfoKey;
}> = [
  { label: "Password", selector: "#password", omitKey: "password" },
  { label: "First name", selector: "#first_name", omitKey: "firstName" },
  { label: "Last name", selector: "#last_name", omitKey: "lastName" },
  { label: "Address", selector: "#address1", omitKey: "address" },
  { label: "State", selector: "#state", omitKey: "state" },
  { label: "City", selector: "#city", omitKey: "city" },
  { label: "Zipcode", selector: "#zipcode", omitKey: "zipcode" },
  {
    label: "Mobile Number",
    selector: "#mobile_number",
    omitKey: "mobileNumber",
  },
];

test.describe("Register - Account info required fields @regression", () => {
  test.describe.configure({ timeout: 90_000 });
  test.beforeEach(async ({ registerPage }) => {
    const user = randomUser();
    await registerPage.openHome();
    await registerPage.navigateToSignup();
    await registerPage.fillSignupAndProceed(
      `${user.firstName} ${user.lastName}`,
      user.email,
    );
  });

  for (const { label, selector, omitKey } of requiredAccountFields) {
    test(`Given I am on Account info, When I submit without ${label}, Then ${label} should be required`, async ({
      registerPage,
    }) => {
      await test.step(`When I fill all fields except ${label}`, async () => {
        await registerPage.fillAccountInfoPartial(
          without(baseAccountInfo(), omitKey),
        );
      });

      await test.step("And I click Create Account", async () => {
        await registerPage.submitCreateAccount();
      });

      await test.step(`Then the ${label} field should be marked as required`, async () => {
        await registerPage.assertFieldIsRequired(selector);
      });
    });
  }
});
