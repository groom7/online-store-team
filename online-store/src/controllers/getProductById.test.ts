import { getProductById } from './getProductById';
import { store } from '../store/store';
describe('method calls when user click to details component', () => {
    it('test for getProductById method', () => {
        const getProductByIdSpy = jest.spyOn(store, 'getProductById')
        getProductById(1)
        expect(getProductByIdSpy).toBeCalledTimes(1)
    })
})