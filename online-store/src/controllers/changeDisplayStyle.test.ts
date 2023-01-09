import { changeDisplayStyle } from './changeDisplayStyle';
import { store } from './../store/store';
const type = 'list-view'
const type2 = 'squares-view'
describe('method call when user change display view', () => {
    it('change display to list-view', () => {
        const changeDisplaySpy = jest.spyOn(store, 'changeDisplayStyle')
        changeDisplayStyle(type)
        expect(changeDisplaySpy).toBeCalledTimes(1)
    })
    it('change display to squares-view', () => {
        const changeDisplaySpy = jest.spyOn(store, 'changeDisplayStyle')
        changeDisplayStyle(type2)
        expect(changeDisplaySpy).toBeCalledTimes(1)
    })
})