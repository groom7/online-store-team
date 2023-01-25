import { store } from "../store/store"

export const getProductById = (id: number) => {
    return store.getProductById(id)
}