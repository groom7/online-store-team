import { store } from './../store/store';
import { busketIsEmpty } from './busketIsEmpty';
describe('method calls when we want to see busket is empty or not', () => {
    it('test for busketIsEmpty method', () => {
        const busketIsEmptySpy = jest.spyOn(store, 'busketIsEmpty')
        busketIsEmpty()
        expect(busketIsEmptySpy).toBeCalledTimes(1)
    })
})