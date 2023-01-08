import { getPaymentSystemIcon } from "./getPaymentSystemIcon";
import visaIcon from '../../../assets/images/visa.png';
import crediCardIcon from '../../../assets/images/credit-card.png';

describe('get payment icon', () => {
  test('the first digit 4 of the card number for a specific payment system', () => {
    expect(getPaymentSystemIcon('4')).toBe(visaIcon);
  });
  test('the first digit 7 of the card number for an undefined payment system', () => {
    expect(getPaymentSystemIcon('7')).toBe(crediCardIcon);
  });
})