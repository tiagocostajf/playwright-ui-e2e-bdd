import { test } from "../../fixtures/pages.fixture";
import { randomUser } from "../../utils/test-data";
import {
  TC_05_REGISTER_DUPLICATE_EMAIL,
  TC_01_1_REGISTER_NAME_REQUIRED,
  TC_01_2_REGISTER_EMAIL_REQUIRED,
  TC_01_3_REGISTER_PASSWORD_REQUIRED,
  TC_01_4_REGISTER_FIRST_NAME_REQUIRED,
  TC_01_5_REGISTER_LAST_NAME_REQUIRED,
  TC_01_6_REGISTER_ADDRESS_REQUIRED,
  TC_01_7_REGISTER_STATE_REQUIRED,
  TC_01_8_REGISTER_CITY_REQUIRED,
  TC_01_9_REGISTER_ZIPCODE_REQUIRED,
  TC_01_10_REGISTER_MOBILE_REQUIRED,
} from "../../utils/test-case-ids";

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

test.describe("Register - Signup form @regression", () => {
  test.describe.configure({ timeout: 60_000 });
  test(`${TC_05_REGISTER_DUPLICATE_EMAIL}: Duplicate email shows error`, async ({
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

  test(`${TC_01_1_REGISTER_NAME_REQUIRED}: Empty name field is required`, async ({
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

  test(`${TC_01_2_REGISTER_EMAIL_REQUIRED}: Empty email field is required`, async ({
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
  tc: string;
  label: string;
  selector: string;
  omitKey: AccountInfoKey;
}> = [
  {
    tc: TC_01_3_REGISTER_PASSWORD_REQUIRED,
    label: "Password",
    selector: "#password",
    omitKey: "password",
  },
  {
    tc: TC_01_4_REGISTER_FIRST_NAME_REQUIRED,
    label: "First name",
    selector: "#first_name",
    omitKey: "firstName",
  },
  {
    tc: TC_01_5_REGISTER_LAST_NAME_REQUIRED,
    label: "Last name",
    selector: "#last_name",
    omitKey: "lastName",
  },
  {
    tc: TC_01_6_REGISTER_ADDRESS_REQUIRED,
    label: "Address",
    selector: "#address1",
    omitKey: "address",
  },
  {
    tc: TC_01_7_REGISTER_STATE_REQUIRED,
    label: "State",
    selector: "#state",
    omitKey: "state",
  },
  {
    tc: TC_01_8_REGISTER_CITY_REQUIRED,
    label: "City",
    selector: "#city",
    omitKey: "city",
  },
  {
    tc: TC_01_9_REGISTER_ZIPCODE_REQUIRED,
    label: "Zipcode",
    selector: "#zipcode",
    omitKey: "zipcode",
  },
  {
    tc: TC_01_10_REGISTER_MOBILE_REQUIRED,
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

  for (const { tc, label, selector, omitKey } of requiredAccountFields) {
    test(`${tc}: ${label} is required`, async ({ registerPage }) => {
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
