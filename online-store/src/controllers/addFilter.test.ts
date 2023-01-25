import { addFilters } from './addFilter';
import { store } from './../store/store';
const type = 'category'
const category = 'laptops'

describe('method call when user add new filter', () => {
    it('add new filter test', () => {
        const addFilter = jest.spyOn(store, 'addFilters')
        addFilters(type, category)
        expect(addFilter).toBeCalledTimes(1)
    })
})