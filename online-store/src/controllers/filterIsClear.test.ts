import { filtersIsClear } from './filterIsClear';
describe('check filter is clear', () => {
    it('filter without any data', () => {
    const value = filtersIsClear()
    expect(value).toBe(true)
    })
})