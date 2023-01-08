import { itemData } from "../store/constants";
import { store } from "../store/store";
import { addToBusket } from "./addToBusket";

describe('recalculateCartTotals method call check when call addToBusket method', () => {
  test('x', () => {
    const spyRecalculateCartTotals = jest.spyOn(store, 'recalculateCartTotals');
    addToBusket(itemData);
    expect(spyRecalculateCartTotals).toBeCalledTimes(1);
  });
  
  afterEach(() => {
    jest.clearAllMocks()
  });
})