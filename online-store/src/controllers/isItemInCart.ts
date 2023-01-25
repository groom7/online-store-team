import { store } from "../store/store";
import { Response } from "../types/Response";
export const isItemInCart = (productData: Response) => {
 return store.isItemInCart(productData)
}