import { store } from "../store/store";
import { Response } from "../types/Response";
export const setProducts = (array: Response[]) => {
    if(array.length === 0) {
        setProducts(array)
    }else {
        store.setProducts(array)
    }
}