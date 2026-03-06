# playwright-ui-e2e-bdd

E2E UI automation with **Playwright + TypeScript** for [Automation Exercise](https://automationexercise.com), following the Page Object Pattern, custom fixtures, and BDD-style step naming (Given / When / Then).

## Test Case ID Convention

IDs follow the **official test case list** published on the site itself:
👉 [automationexercise.com/test_cases](https://automationexercise.com/test_cases)

| #     | Official Test Case                                      |
| ----- | ------------------------------------------------------- |
| TC-01 | Register User                                           |
| TC-02 | Login User with correct email and password              |
| TC-03 | Login User with incorrect email and password            |
| TC-04 | Logout User                                             |
| TC-05 | Register User with existing email                       |
| TC-06 | Contact Us Form                                         |
| TC-07 | Verify Test Cases Page                                  |
| TC-08 | Verify All Products and product detail page             |
| TC-09 | Search Product                                          |
| TC-10 | Verify Subscription in home page                        |
| TC-11 | Verify Subscription in Cart page                        |
| TC-12 | Add Products in Cart                                    |
| TC-13 | Verify Product quantity in Cart                         |
| TC-14 | Place Order: Register while Checkout                    |
| TC-15 | Place Order: Register before Checkout                   |
| TC-16 | Place Order: Login before Checkout                      |
| TC-17 | Remove Products From Cart                               |
| TC-18 | View Category Products                                  |
| TC-19 | View & Cart Brand Products                              |
| TC-20 | Search Products and Verify Cart After Login             |
| TC-21 | Add review on product                                   |
| TC-22 | Add to cart from Recommended items                      |
| TC-23 | Verify address details in checkout page                 |
| TC-24 | Download Invoice after purchase order                   |
| TC-25 | Verify Scroll Up using 'Arrow' button and Scroll Down   |
| TC-26 | Verify Scroll Up without 'Arrow' button and Scroll Down |

### Sub-numbering for extra cases

When we create additional tests (negative, regression, logged-in variants) related to an official TC, we use the **TC-XX.N** convention:

- `TC-01` → main case (Register User — happy path)
- `TC-01.1` → sub-case 1 (name is required)
- `TC-01.2` → sub-case 2 (email is required)
- `TC-09.6` → sub-case 6 of Search Product (authenticated search)

This keeps direct traceability to the official list and makes it instantly clear which main scenario each test belongs to.

## Project Structure

```
playwright/
├── playwright.config.ts          # Central config (browsers, timeouts, reporters)
├── e2e/
│   ├── smoke/
│   │   ├── cart-subscription.spec.ts           # TC-11  Cart page subscription
│   │   ├── contact-us.spec.ts                  # TC-06  Contact Us form submission
│   │   ├── contact-us.logged-in.spec.ts        # TC-06.1 Contact Us (authenticated)
│   │   ├── home-subscription.spec.ts           # TC-10 + TC-10.1…10.6
│   │   ├── products.spec.ts                    # TC-08  Product list & details
│   │   ├── products.logged-in.spec.ts          # TC-08.1 Products (authenticated)
│   │   ├── register.spec.ts                    # TC-01  Full registration (happy path)
│   │   ├── test-cases.spec.ts                  # TC-07  Navigate to Test Cases page
│   │   └── test-cases.logged-in.spec.ts        # TC-07.1 Test Cases (authenticated)
│   └── regression/
│       ├── register-validation.spec.ts           # TC-05 + TC-01.1…01.10
│       ├── search-products.spec.ts               # TC-09 + TC-09.1…09.5
│       └── search-products.logged-in.spec.ts     # TC-09.6
├── fixtures/
│   └── pages.fixture.ts          # Custom fixture injecting Page Objects into tests
├── pages/
│   ├── BasePage.ts               # Base class (screenshot, clickWithAdFallback, assertLoggedIn)
│   ├── CartPage.ts               # Page Object – Cart (subscription)
│   ├── ContactUsPage.ts          # Page Object – Contact Us
│   ├── HomePage.ts               # Page Object – Home (footer subscription)
│   ├── ProductsPage.ts           # Page Object – Products & Search
│   ├── RegisterPage.ts           # Page Object – Register / Signup
│   └── TestCasesPage.ts          # Page Object – Test Cases
├── support/
│   └── auth.setup.ts             # Setup project: creates authenticated session (storageState)
└── utils/
    ├── auth-state.ts             # storageState file path
    ├── test-case-ids.ts          # Centralized IDs (TC-01 … TC-11 + sub-cases)
    └── test-data.ts              # Random test data generation with Faker
```

## Implemented Test Catalog

| ID        | Spec                      | Description                                 | Type       |
| --------- | ------------------------- | ------------------------------------------- | ---------- |
| **TC-01** | register                  | Valid registration creates account          | smoke      |
| TC-01.1   | register-validation       | Name is required                            | regression |
| TC-01.2   | register-validation       | Email is required                           | regression |
| TC-01.3   | register-validation       | Password is required                        | regression |
| TC-01.4   | register-validation       | First name is required                      | regression |
| TC-01.5   | register-validation       | Last name is required                       | regression |
| TC-01.6   | register-validation       | Address is required                         | regression |
| TC-01.7   | register-validation       | State is required                           | regression |
| TC-01.8   | register-validation       | City is required                            | regression |
| TC-01.9   | register-validation       | Zipcode is required                         | regression |
| TC-01.10  | register-validation       | Mobile number is required                   | regression |
| **TC-05** | register-validation       | Duplicate email shows error                 | regression |
| **TC-06** | contact-us                | Submit Contact Us form                      | smoke      |
| TC-06.1   | contact-us.logged-in      | Contact Us (authenticated)                  | smoke      |
| **TC-07** | test-cases                | Navigate to Test Cases page                 | smoke      |
| TC-07.1   | test-cases.logged-in      | Test Cases (authenticated)                  | smoke      |
| **TC-08** | products                  | View product list and details               | smoke      |
| TC-08.1   | products.logged-in        | Products (authenticated)                    | smoke      |
| **TC-09** | search-products           | Search existing product (positive)          | regression |
| TC-09.1   | search-products           | Empty search keeps full product list        | regression |
| TC-09.2   | search-products           | Non-existent product shows no results       | regression |
| TC-09.3   | search-products           | Special characters show no results          | regression |
| TC-09.4   | search-products           | Excessive input shows no results            | regression |
| TC-09.5   | search-products           | Single character search                     | regression |
| TC-09.6   | search-products.logged-in | Authenticated search                        | regression |
| **TC-10** | home-subscription         | Valid email subscribes successfully         | smoke      |
| TC-10.1   | home-subscription         | Empty email is blocked (required)           | smoke      |
| TC-10.2   | home-subscription         | Email without `@` is rejected               | smoke      |
| TC-10.3   | home-subscription         | Email with `@` but no domain is rejected    | smoke      |
| TC-10.4   | home-subscription         | Fill → clear → submit prevents subscription | smoke      |
| TC-10.5   | home-subscription         | 250+ char email does not break the page     | smoke      |
| TC-10.6   | home-subscription         | XSS attempt in email field is blocked       | smoke      |
| **TC-11** | cart-subscription         | Subscription on Cart page                   | smoke      |

## Prerequisites

- Node.js >= 18
- npm

## Setup

```bash
npm install
npx playwright install --with-deps
```

## Available Scripts

| Command                   | Description                            |
| ------------------------- | -------------------------------------- |
| `npm test`                | Run all tests                          |
| `npm run test:smoke`      | Run only `@smoke` tests                |
| `npm run test:regression` | Run only `@regression` tests           |
| `npm run report`          | Open the HTML report from the last run |
| `npm run codegen`         | Launch Playwright codegen on the site  |

## Tech Stack

- [Playwright](https://playwright.dev/) — E2E automation framework
- [TypeScript](https://www.typescriptlang.org/) — static typing
- [@faker-js/faker](https://fakerjs.dev/) — dynamic test data generation

## Browsers

Tests run on **Chromium** and **Firefox** (configurable in `playwright.config.ts`).
Tests with the `.logged-in.spec.ts` suffix depend on a setup project that creates an authenticated session via `storageState`.

## Report

After execution, the HTML report is generated in `playwright-report/`. Run `npm run report` to open it in the browser. Each step includes automatically attached screenshot evidence.
