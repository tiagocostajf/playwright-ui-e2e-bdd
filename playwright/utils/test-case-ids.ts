/**
 * Centralized Test Case IDs
 *
 * IDs follow the official Automation Exercise test case numbering:
 *   https://automationexercise.com/test_cases
 *
 * Naming convention:
 *   TC-XX      → official test case (e.g. TC-01, TC-09)
 *   TC-XX.N    → extra / negative / regression sub-case related to TC-XX
 *
 * ────────────────────────────────────────────────────────────────────
 * Official list (✔ = implemented):
 *   TC-01  Register User                                        ✔
 *   TC-02  Login User with correct email and password
 *   TC-03  Login User with incorrect email and password
 *   TC-04  Logout User
 *   TC-05  Register User with existing email                    ✔
 *   TC-06  Contact Us Form                                      ✔
 *   TC-07  Verify Test Cases Page                               ✔
 *   TC-08  Verify All Products and product detail page          ✔
 *   TC-09  Search Product                                       ✔
 *   TC-10  Verify Subscription in home page                     ✔
 *   TC-11  Verify Subscription in Cart page                     ✔
 *   TC-12  Add Products in Cart
 *   TC-13  Verify Product quantity in Cart
 *   TC-14  Place Order: Register while Checkout
 *   TC-15  Place Order: Register before Checkout
 *   TC-16  Place Order: Login before Checkout
 *   TC-17  Remove Products From Cart
 *   TC-18  View Category Products
 *   TC-19  View & Cart Brand Products
 *   TC-20  Search Products and Verify Cart After Login
 *   TC-21  Add review on product
 *   TC-22  Add to cart from Recommended items
 *   TC-23  Verify address details in checkout page
 *   TC-24  Download Invoice after purchase order
 *   TC-25  Verify Scroll Up using 'Arrow' button and Scroll Down
 *   TC-26  Verify Scroll Up without 'Arrow' button and Scroll Down
 * ────────────────────────────────────────────────────────────────────
 */

// ─── TC-01: Register User ───────────────────────────────────────────────────
export const TC_01_REGISTER_VALID = "TC-01";
//   Sub-cases (regression – signup form)
export const TC_01_1_REGISTER_NAME_REQUIRED = "TC-01.1";
export const TC_01_2_REGISTER_EMAIL_REQUIRED = "TC-01.2";
//   Sub-cases (regression – account info required fields)
export const TC_01_3_REGISTER_PASSWORD_REQUIRED = "TC-01.3";
export const TC_01_4_REGISTER_FIRST_NAME_REQUIRED = "TC-01.4";
export const TC_01_5_REGISTER_LAST_NAME_REQUIRED = "TC-01.5";
export const TC_01_6_REGISTER_ADDRESS_REQUIRED = "TC-01.6";
export const TC_01_7_REGISTER_STATE_REQUIRED = "TC-01.7";
export const TC_01_8_REGISTER_CITY_REQUIRED = "TC-01.8";
export const TC_01_9_REGISTER_ZIPCODE_REQUIRED = "TC-01.9";
export const TC_01_10_REGISTER_MOBILE_REQUIRED = "TC-01.10";

// ─── TC-05: Register User with existing email ───────────────────────────────
export const TC_05_REGISTER_DUPLICATE_EMAIL = "TC-05";

// ─── TC-06: Contact Us Form ─────────────────────────────────────────────────
export const TC_06_CONTACT_US_SUBMIT = "TC-06";
export const TC_06_1_CONTACT_US_LOGGED_IN = "TC-06.1";

// ─── TC-07: Verify Test Cases Page ──────────────────────────────────────────
export const TC_07_TEST_CASES_NAVIGATE = "TC-07";
export const TC_07_1_TEST_CASES_LOGGED_IN = "TC-07.1";

// ─── TC-08: Verify All Products and product detail page ─────────────────────
export const TC_08_PRODUCTS_VIEW_LIST_AND_DETAILS = "TC-08";
export const TC_08_1_PRODUCTS_VIEW_LOGGED_IN = "TC-08.1";

// ─── TC-09: Search Product ──────────────────────────────────────────────────
export const TC_09_SEARCH_EXISTING_PRODUCT = "TC-09";
export const TC_09_1_SEARCH_EMPTY_INPUT = "TC-09.1";
export const TC_09_2_SEARCH_NONEXISTENT = "TC-09.2";
export const TC_09_3_SEARCH_SPECIAL_CHARS = "TC-09.3";
export const TC_09_4_SEARCH_EXCESSIVE_INPUT = "TC-09.4";
export const TC_09_5_SEARCH_SINGLE_CHAR = "TC-09.5";
export const TC_09_6_SEARCH_EXISTING_LOGGED_IN = "TC-09.6";

// ─── TC-10: Verify Subscription in home page ────────────────────────────────
export const TC_10_SUBSCRIPTION_HOME = "TC-10";
export const TC_10_1_SUBSCRIPTION_EMPTY_EMAIL = "TC-10.1";
export const TC_10_2_SUBSCRIPTION_INVALID_NO_AT = "TC-10.2";
export const TC_10_3_SUBSCRIPTION_INVALID_NO_DOMAIN = "TC-10.3";
export const TC_10_4_SUBSCRIPTION_FILL_CLEAR_SUBMIT = "TC-10.4";
export const TC_10_5_SUBSCRIPTION_EXCESSIVE_LENGTH = "TC-10.5";
export const TC_10_6_SUBSCRIPTION_XSS_ATTEMPT = "TC-10.6";

// ─── TC-11: Verify Subscription in Cart page ────────────────────────────────
export const TC_11_SUBSCRIPTION_CART = "TC-11";
