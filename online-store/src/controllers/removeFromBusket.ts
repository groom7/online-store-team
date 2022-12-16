import { store } from "../store/store";
import { Response } from "../types/Response";
export const removeFromBusket = (item: Response) => {
    store.removeFromBusket(item)
}