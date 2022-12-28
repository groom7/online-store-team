import { store } from "../store/store";
export const promoCodeIsValid = (code: string) => {
    return store.promoCodeIsValid(code)
}