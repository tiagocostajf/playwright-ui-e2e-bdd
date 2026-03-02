import { test as setup } from "@playwright/test";
import { RegisterPage } from "../pages/RegisterPage";
import { randomUser } from "../utils/test-data";
import { AUTH_FILE } from "../utils/auth-state";
import { mkdirSync, existsSync } from "fs";
import { dirname } from "path";

setup("create authenticated user session", async ({ page }) => {
  const registerPage = new RegisterPage(page);
  const user = randomUser();

  await registerPage.openHome();
  await registerPage.navigateToSignup();
  await registerPage.fillSignupAndProceed(user.firstName, user.email);
  await registerPage.fillAccountInfo(user);
  await registerPage.submitCreateAccount();
  await registerPage.assertAccountCreated();
  await registerPage.continueAfterRegistration();

  if (!existsSync(dirname(AUTH_FILE))) {
    mkdirSync(dirname(AUTH_FILE), { recursive: true });
  }
  await page.context().storageState({ path: AUTH_FILE });
});
