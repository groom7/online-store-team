import { store } from "../store/store";
export const addUserPromoCode = (code: string) => {
    return store.addUserPromoCode(code);
}