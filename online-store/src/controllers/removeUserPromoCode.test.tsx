import { store } from "../store/store";
import { removeUserPromoCode } from "./removeUserPromoCode";

describe('method call check when call removeUserPromoCode method', () => {
  test('check recalculateTotalDiscountAmount method call', () => {
    const spyRecalculateTotalDiscountAmount = jest.spyOn(store, 'recalculateTotalDiscountAmount');
    removeUserPromoCode('NEWYEAR10');
    expect(spyRecalculateTotalDiscountAmount).toBeCalledTimes(1);
  });
  
  afterEach(() => {
    jest.clearAllMocks()
  });
})