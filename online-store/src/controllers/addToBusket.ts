import { Response } from './../types/Response';
import { store } from "../store/store";
export const addToBusket = (product: Response) => {
    store.addToBusket(product)
}