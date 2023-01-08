import { store } from "../store/store";
import { Response } from "../types/Response";
export const setProducts = (array: Response[]) => {
    store.setProducts(array)
}