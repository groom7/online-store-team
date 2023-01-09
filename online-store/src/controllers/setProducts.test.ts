import { store } from '../store/store';
import { setProducts } from './setProducts';
const mockObj = [{
    brand: 'temp',
  category: 'temp',
  description: 'temp',
  discountPercentage: 1,
  id: 1,
  images: ['temp', 'temp', 'temp'],
  price: 1,
  rating: 1,
  stock: 1,
  thumbnail: 'temp',
  title: 'temp'
}]
describe('add products from api', () => {
    it('add valid product to store/state', () => {
        const setProductsSpy = jest.spyOn(store, 'setProducts')
        setProducts(mockObj)
        expect(setProductsSpy).toBeCalledTimes(1)
    })
})