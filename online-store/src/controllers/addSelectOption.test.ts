import { selectOption } from './../store/constants';
import { store } from './../store/store';
import { addSelectOption } from './addSelectOption';

describe('method call check when user click select option', () => {
    test('check addSelectOption method call', () => {
        const addSelectOptions = jest.spyOn(store, 'addSelectOption');
        addSelectOption(selectOption);
        expect(addSelectOptions).toBeCalledTimes(1);
    });
    afterEach(() => {
        jest.clearAllMocks()
    })
})