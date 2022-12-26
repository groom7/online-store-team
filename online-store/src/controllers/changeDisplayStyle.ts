import { store } from "../store/store"

export const changeDisplayStyle = (type: string) => {
    store.changeDisplayStyle(type)
}