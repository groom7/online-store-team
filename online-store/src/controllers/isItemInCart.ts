import { store } from "../store/store";
import { Response } from "../types/Response";
export const isItemInCart = (productData: Response) => {
  store.isItemInCart(productData)
}