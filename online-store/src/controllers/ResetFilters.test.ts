import { store } from './../store/store';
import { resetFilters } from './ResetFilters';
describe('method calls when user reset all filters', () => { 
    it('check reset filters method', () => {
        const resetFiltersSpy = jest.spyOn(store, 'resetFilters')
        resetFilters()
        expect(resetFiltersSpy).toBeCalledTimes(1)
    })
 })