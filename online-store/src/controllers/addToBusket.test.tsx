import { itemData } from "../store/constants";
import { store } from "../store/store";
import { addToBusket } from "./addToBusket";

describe('method call check when call addToBusket method', () => {
  test('check recalculateCartTotals method call', () => {
    const spyRecalculateCartTotals = jest.spyOn(store, 'recalculateCartTotals');
    addToBusket(itemData);
    expect(spyRecalculateCartTotals).toBeCalledTimes(1);
  });
  
  afterEach(() => {
    jest.clearAllMocks()
  });
})