import { store } from "../store/store";
import { addUserPromoCode } from "./addUserPromoCode";

describe('method call check when call addUserPromoCode method', () => {
  test('check promoCodeIsValid method call', () => {
    const spyPromoCodeIsValid = jest.spyOn(store, 'promoCodeIsValid');
    addUserPromoCode('NEWYEAR10');
    expect(spyPromoCodeIsValid).toBeCalledTimes(1);
  });
  
  afterEach(() => {
    jest.clearAllMocks()
  });
})