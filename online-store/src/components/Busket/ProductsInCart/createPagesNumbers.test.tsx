import { createPagesNumbers } from "./createPagesNumbers";

describe('page numbers array values validation', () => {
  test('with 3 elements and current page 1', () => {
    expect(createPagesNumbers(2, 1)).toEqual([1, 2]);
  });
  test('with 12 elements and current page 6', () => {
    expect(createPagesNumbers(12, 6)).toEqual([2, 3, 4, 5, 6, 7, 8, 9, 10]);
  });
})