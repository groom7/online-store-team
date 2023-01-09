import { store } from './../store/store';
import { getAllBrands } from './getAllBrands';
describe('method return all brands filters', () => {
    it('check getAllBrands method', () => {
        const getAllBrandsSpy = jest.spyOn(store, 'getAllBrands')
        getAllBrands()
        expect(getAllBrandsSpy).toBeCalledTimes(1)
    })
})