import { faker } from "@faker-js/faker";

/** Generates a unique e-mail based on a prefix + timestamp. */
export function uniqueEmail(prefix = "qa"): string {
  const ts = Date.now();
  return `${prefix}.${ts}@mailinator.com`;
}

/** Returns random user data for the Automation Exercise registration form. */
export function randomUser() {
  return {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: uniqueEmail("ae"),
    password: "Test@12345",
    address: faker.location.streetAddress(),
    state: faker.location.state(),
    city: faker.location.city(),
    zipcode: faker.location.zipCode(),
    mobileNumber: faker.phone.number({ style: "national" }),
  } as const;
}
