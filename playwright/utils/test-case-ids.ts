/**
 * Centralized Test Case IDs
 *
 * All TC-IDs are defined here to avoid collisions and ensure
 * sequential ordering in the HTML report (sorted by file name).
 *
 * Naming convention:  TC-XXX
 * - IDs are assigned following the alphabetical file order used by the
 *   Playwright HTML reporter, so the report reads sequentially.
 * - When adding new tests, pick the next available number and register
 *   it here BEFORE using it in the spec file.
 *
 * ────────────────────────────────────────────────────────────────────
 * File order in the report (alphabetical):
 *   1. regression/register-validation.spec.ts    → TC-001 … TC-011
 *   2. regression/search-products.spec.ts        → TC-012 … TC-017
 *   3. smoke/contact-us.spec.ts                  → TC-018
 *   4. smoke/products.spec.ts                    → TC-019
 *   5. smoke/register.spec.ts                    → TC-020
 *   6. smoke/test-cases.spec.ts                  → TC-021
 *   7. regression/search-products.logged-in…     → TC-022
 *   8. smoke/contact-us.logged-in…               → TC-023
 *   9. smoke/products.logged-in…                 → TC-024
 *  10. smoke/test-cases.logged-in…               → TC-025
 * ────────────────────────────────────────────────────────────────────
 */

// ─── Register – Signup form (regression) ────────────────────────────────────
export const TC_REGISTER_DUPLICATE_EMAIL = "TC-001";
export const TC_REGISTER_NAME_REQUIRED = "TC-002";
export const TC_REGISTER_EMAIL_REQUIRED = "TC-003";

// ─── Register – Account info required fields (regression) ───────────────────
export const TC_REGISTER_PASSWORD_REQUIRED = "TC-004";
export const TC_REGISTER_FIRST_NAME_REQUIRED = "TC-005";
export const TC_REGISTER_LAST_NAME_REQUIRED = "TC-006";
export const TC_REGISTER_ADDRESS_REQUIRED = "TC-007";
export const TC_REGISTER_STATE_REQUIRED = "TC-008";
export const TC_REGISTER_CITY_REQUIRED = "TC-009";
export const TC_REGISTER_ZIPCODE_REQUIRED = "TC-010";
export const TC_REGISTER_MOBILE_REQUIRED = "TC-011";

// ─── Search Products (regression – guest) ───────────────────────────────────
export const TC_SEARCH_EXISTING_PRODUCT = "TC-012";
export const TC_SEARCH_EMPTY_INPUT = "TC-013";
export const TC_SEARCH_NONEXISTENT = "TC-014";
export const TC_SEARCH_SPECIAL_CHARS = "TC-015";
export const TC_SEARCH_EXCESSIVE_INPUT = "TC-016";
export const TC_SEARCH_SINGLE_CHAR = "TC-017";

// ─── Contact Us (smoke) ─────────────────────────────────────────────────────
export const TC_CONTACT_US_SUBMIT = "TC-018";

// ─── Products (smoke) ───────────────────────────────────────────────────────
export const TC_PRODUCTS_VIEW_LIST_AND_DETAILS = "TC-019";

// ─── Register (smoke) ──────────────────────────────────────────────────────
export const TC_REGISTER_VALID = "TC-020";

// ─── Test Cases (smoke) ─────────────────────────────────────────────────────
export const TC_TEST_CASES_NAVIGATE = "TC-021";

// ─── Logged-in variants ─────────────────────────────────────────────────────
export const TC_SEARCH_EXISTING_LOGGED_IN = "TC-022";
export const TC_CONTACT_US_LOGGED_IN = "TC-023";
export const TC_PRODUCTS_VIEW_LOGGED_IN = "TC-024";
export const TC_TEST_CASES_LOGGED_IN = "TC-025";
