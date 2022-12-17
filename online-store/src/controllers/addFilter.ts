import { store } from "../store/store"

export const addFilters = (filter: string, payload: string | number) => {
    store.addFilters(filter, payload)
}