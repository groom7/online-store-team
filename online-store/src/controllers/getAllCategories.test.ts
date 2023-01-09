import { getAllCattegories } from './getAllCategories';
import { store } from './../store/store';
describe('method calls when filters component renders', () => {
    it('test for getAllCategories method', () => {
        const getAllCattegoriesSpy = jest.spyOn(store, 'getAllCattegories')
        getAllCattegories()
        expect(getAllCattegoriesSpy).toBeCalledTimes(1)
    })
})