import { promoCodeIsValid } from "./promoCodeIsValid";

describe('promocode validation', () => {
  test('"NEWYEAR10" promocode validation - correct value', () => {
    expect(promoCodeIsValid('NEWYEAR10')).toBe(true);
  });
  test('"UNDEFINED" promocode validation - incorrect value', () => {
    expect(promoCodeIsValid('UNDEFINED')).toBe(false);
  });
})