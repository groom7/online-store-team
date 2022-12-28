import { store } from "../store/store";
export const removeUserPromoCode = (code: string) => {
  return store.removeUserPromoCode(code);
}